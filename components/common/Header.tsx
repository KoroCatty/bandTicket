"use client";
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
      className={`py-2 max-[480px]:py4 max-[480px]:px-4 px-6 z-10
      ${
        currentPath == "/"
          ? "absolute w-[100%] shadow-cyan-500-lg z-10"
          : "relative"
      }`}
    >
      <nav className="max-w-[1080px] mx-auto flex justify-between items-center max-[899px]:hidden">
        <Link href="/">
          <div
            className="textShadow_wt mt-2 text-[2.2rem] font-bold text-nowrap max-[1000px]:text-[1.8rem] 
          hover:opacity-70 transition-all duration-300"
          >
            NO NAME
          </div>
        </Link>
        {/* Component */}
        <NavLinks />
      </nav>
      <Hamburger />
    </header>
  );
};

export default Header;
