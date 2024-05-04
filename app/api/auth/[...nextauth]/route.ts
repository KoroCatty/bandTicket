// make separate file for Options
import { authOptions } from "@/utils/authOptions"; 

import NextAuth from "next-auth/next";

// NextAuth にオプションを渡す
const handler = NextAuth(authOptions as any);

// getとpostの両方で同じ関数を使用する
export { handler as GET, handler as POST };
