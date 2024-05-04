"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation"; // 現在のパス名を取得するためのフック
// Images
import profileDefault from "/public/images/profile.png";

// next auth
import { useSession } from "next-auth/react";

// Components
import NavLinks from "./NavLinks";

const Header = () => {
  const currentPath = usePathname();

  const { data: session } = useSession();

  return (
    <header
      // Only Home page has a absolute header
      className={`max-[480px]:py4 max-[480px]:px-4 max-[700px]:overflow-x-scroll px-10
      ${
        currentPath == "/"
          ? "bg-slate-950/25 absolute w-[100%] shadow-cyan-500-lg z-10"
          : "relative"
      }`}
    >
      <nav className="max-w-[1080px] mx-auto flex justify-between items-center  ">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={80}
            height={50}
            className="d-block max-[480px]:w-[60px] cursor-pointer"
          />
        </Link>

        {/* Component */}
        <NavLinks session={!!session} />
      </nav>
    </header>
  );
};

export default Header;
