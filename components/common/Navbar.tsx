"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation"; // 現在のパス名を取得するためのフック
// Images
import profileDefault from "/public/images/profile.png";

// react-icons
import { FaGoogle } from "react-icons/fa";

// Components
import NavLinks from "./NavLinks";



const Navbar = () => {
  const currentPath = usePathname();
  return (
    <header
    // Only Home page has a absolute header
      className={`${currentPath == '/'
        ? "py-1 bg-slate-950/25 absolute w-screen shadow-cyan-500-lg z-10"
        : "relative"
        }`}
    >
      <nav className="max-w-[1080px]  mx-auto flex justify-between items-center ">
        <Link href="/">
          <Image src="/images/logo.png" alt="logo" width={100} height={50} />
        </Link>

        {/* Component */}
        <NavLinks />

        <div>
          <Link href="/login" className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md">
            <FaGoogle className="mr-2" />
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
