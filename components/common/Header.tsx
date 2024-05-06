"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
// Components
import NavLinks from "./NavLinks";
import Hamburger from "./Hamburger";

const Header = () => {
  const currentPath = usePathname();
  return (
    <header
      // Only Home page has a absolute header
      className={`max-[480px]:py4 max-[480px]:px-4 px-10 z-10 
      ${
        currentPath == "/"
          ? "absolute w-[100%] shadow-cyan-500-lg z-10"
          : "relative"
      }`}
    >
      <nav className="max-w-[1080px] mx-auto flex justify-between items-center  max-[767px]:hidden">
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
        <NavLinks />
      </nav>

      <Hamburger />
    </header>
  );
};

export default Header;
