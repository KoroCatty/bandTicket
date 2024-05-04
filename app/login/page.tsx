"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation"; // 現在のパス名を取得するためのフック
// next auth
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

const LoginPage = () => {
  const { data: session } = useSession();
  // 認証情報を取得したらリダイレクト
  if (session) {
    redirect("/");
  }

  // 認証情報
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  console.log(providers);

  // 認証情報を取得
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  return (
    <>
      {!session && (
        <div className="">
          {/* //! Google, GitHub などでログインする可能性もあるので map 使用 */}
          {providers &&
            Object.values(providers).map((provider) => (
              <button key={provider.name} onClick={() => signIn("google")}>
                SIGN IN
              </button>
            ))}
        </div>
      )}
    </>
  );
};

export default LoginPage;
