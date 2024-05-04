import GoogleProvider from "next-auth/providers/google";

import connectDB from "@/config/db"; // connect to DB
import User from "@/models/User"; // User model

import { Session } from "next-auth";

// カスタムセッション型を定義し、 user.idが追加されたものを作成
interface CustomSession extends Session {
  user: {
    id: string; // この行でidプロパティを追加
    name?: string;
    email?: string;
    image?: string;
  };
}

import { NextAuthOptions } from "next-auth";

//! オプションを定義
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      // This let you choose account every time ⇩⇩
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // Take 2 callbacks ⬇︎⬇︎
  callbacks: {
    //! Sign In (First callback)
    async signIn({ profile }) {
      // 1. connect to DB
      await connectDB();

      // 2. find user in DB
      const userExists = await User.findOne({ email: profile?.email });

      // 3. if user not found, create user to DB
      if (!userExists) {
        // Truncate user name if too long
        const username = profile?.name?.slice(0, 20);

        //* Create User to DB
        await User.create({
          email: profile?.email,
          username: username,
          // profileをany型として扱い、pictureにアクセス
          image: (profile as any)?.picture ?? profile?.image,
        });
      }
      // 4. return true to allow sign in
      return true;
    },
    //! Session (another callback)
    async session({ session, token }) {
      // Exist check
      if (!session.user) {
        session.user = {};
      }
      //* Get user from DB
      const user = await User.findOne({ email: session.user.email });

      // Assign the user's id to the session
      if (user) {
        // TypeScriptに対してsession.userがCustomSession型であることをアサーション (元々は user.idのタイプが存在しなかった)
        (session.user as CustomSession["user"]).id = user._id.toString();
      } else {
        console.error("User not found in the database.");
      }
      // wrap up the session in all frontend
      return session;
    },
  },
};
