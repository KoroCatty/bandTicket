"use client";

//* To avoid layout.tsx becoming CLIENT File, this file is made and wrap over it

// セッションを受け取る
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
