//! ログイン中のユーザー情報をセッションから取得する関数
// next-auth
import { getServerSession } from "next-auth/next";

// カスタム関数 (APIの処理)
import { authOptions } from "@/utils/authOptions";

// Types
// Define a custom type for the user object in the session
interface User {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  bookmarks?: string[] | null | undefined;
  isAdmin?: boolean | null | undefined;
}

export const getSessionUser = async () => {
  try {
    // NextAuth.jsのサーバーサイドでセッション情報を取得
    const session = (await getServerSession(authOptions)) as { user: User };

    if (!session || !session.user) {
      return null;
    }

    // return whole user object & id
    return {
      user: session.user,
      userId: session.user.id,
      bookmarks: session.user.bookmarks,
      isAdmin: session.user.isAdmin,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
