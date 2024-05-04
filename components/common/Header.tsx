"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation"; // 現在のパス名を取得するためのフック
// Images
import profileDefault from "/public/images/profile.png";

// react-icons
import { FaGoogle } from "react-icons/fa";

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

// Components
import NavLinks from "./NavLinks";

const Header = () => {
  const currentPath = usePathname();

  const { data: session } = useSession();
  // console.log(session);

  // 認証情報
  // const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider
  // > | null>(null);
  // console.log(providers);

  // プロフィール画像をセッションから取得
  //  const profileImage = session?.user?.image || profileDefault;

  // 認証情報を取得
  // useEffect(() => {
  //   const setAuthProviders = async () => {
  //     const res = await getProviders();
  //     setProviders(res);
  //   };
  //   setAuthProviders();
  // }, []);

  return (
    <header
      // Only Home page has a absolute header
      className={`max-[480px]:py-4 
      ${
        currentPath == "/"
          ? "bg-slate-950/25 absolute w-screen shadow-cyan-500-lg z-10"
          : "relative"
      }`}
    >
      <nav className="max-w-[1080px]  mx-auto flex justify-between items-center overflow-x-scroll ">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={100}
            height={50}
            className="d-block max-[480px]:w-[80px] max-[768px]:w-16 cursor-pointer"
          />
        </Link>

        {/* Component */}
        <NavLinks session={!!session} />

        {!session ? (
          <div>
            <Link
              href="/login"
              className="flex items-center px-2 py-1 bg-slate-900 text-white rounded-md"
            >
              <FaGoogle className="mr-1" />
              Login
            </Link>
          </div>
        ) : (
          <div></div>
        )}

        {session && (
          <button
            onClick={() => {
              signOut();
            }}
            className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md"
            role="menuitem"
            tabIndex={-1}
            id="user-menu-item-2"
          >
            Sign Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
