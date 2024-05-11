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

// Context (HttpsOnly user login info)
import { useGlobalContext } from "@/context/GlobalContext";

import { BuiltInProviderType } from "next-auth/providers/index";

// components
import LoginForm from "@/components/features/Login/LoginForm";

const LoginPage = () => {
  // Contextを発動 (ユーザーデータを取得)
  const { user }: any = useGlobalContext();
  const { data: session } = useSession();
  // 認証情報を取得したらリダイレクト
  if (session || user) {
    redirect("/");
  }

  // Next Auth 認証情報
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  // 認証情報を取得
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  // 自作 HttpOnly クッキーをチェック
  // useEffect(() => {
  //   const checkSession = async () => {
  //     const response = await fetch('/api/cookie/check', {
  //       method: 'GET',
  //       credentials: 'include', // クッキーを含めるために必要
  //     });

  //     if (!response.ok) {
  //       console.log('Not logged in');
  //     } else {
  //       // 認証成功の場合、追加のアクションをここに記述（例えば状態の更新など）
  //       const data = await response.json();
  //       console.log('🔥Logged in as:', data.username, "✅");
  //       // alert(`You logged in as ${data.username}さん`);
  //       console.log('🔥', data);
  //       // router.push('/');
  //       // ここでユーザーデータをグローバルステートやローカルステートに保存するなど
  //       // localStorage.setItem('BandTicketLoggedIn', JSON.stringify(data));
  //     }
  //   };
  //   checkSession();
  // }, [router]);

  return (
    <section className="h-[70vh] ">
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
      <br />
      <br />
      <br />

      <LoginForm />
    </section>
  );
};

export default LoginPage;
