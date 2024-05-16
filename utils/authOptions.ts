import GoogleProvider from "next-auth/providers/google";

import connectDB from "@/config/db"; // connect to DB
import User from "@/models/User"; // User model

import { Session } from "next-auth";

// カスタムセッション型を定義し、 任意のプロパティを追加できる
interface CustomSession extends Session {
  user: {
    id: string; // idをsessionに追加
    name?: string;
    email?: string;
    image?: string;
    isAdmin?: boolean; // isAdminを追加
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
    //! 1. Sign In (First callback)
    async signIn({ profile }) {
      try {
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
            isAdmin: false,
          });
        }
        // 4. return true to allow sign in
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // エラーが発生した場合、falseを返してサインインを拒否
      }
    },

    //! 2. Session (another callback)
    async session({ session, token }) {
      try {
        // Exist check
        if (!session.user) {
          session.user = {};
        }
        //* Get user from DB
        const user = await User.findOne({ email: session.user.email });

        //  user's id & isAdmin をセッションに追加
        if (user) {
          const customUser = session.user as CustomSession["user"];
          customUser.id = user._id.toString();
          customUser.isAdmin = user.isAdmin;
        } else {
          console.error("User not found in the database.");
        }

        // session の内容がフロントで利用可能
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
};
