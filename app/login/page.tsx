'use client';
import { useState } from "react";

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
  console.log(session);

  // 認証情報
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider
  > | null>(null);
  console.log(providers);

  return (
    <>
      {session && (
        
        <div className="">
          {/* //! Google, GitHub などでログインする可能性もあるので map が必要 */}
          {providers && Object.values(providers).map((provider) => (
          <>
            <button
              key={provider.name}
              onClick={() => signIn("google")}
            >
              SIGN IN
            </button>
            <div>aaa</div>
          </>
          ))}
        </div>
      )}
    </>
  )
}

export default LoginPage