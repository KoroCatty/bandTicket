import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";

const Hamburger = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative px-4 py-4 flex justify-between items-center text-slate-950 md:hidden ">
      <Link href="/">
        <div className="text-3xl font-bold leading-none">
          <Image src="/images/logo.png" alt="logo" width={60} height={60} />
        </div>
      </Link>

      <button
        className="navbar-burger flex items-center text-blue-600 p-3"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="block h-4 w-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>

      <div
        className={`${isMenuOpen ? "flex" : "hidden"} absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6`}
      ></div>

      {isMenuOpen && (
        <div className="navbar-menu relative z-50">
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-neutral-950/90 overflow-y-auto">
            {/* Logo & Close button */}
            <div className="flex items-center mb-8">
              <Link href="/">
                <div className="mr-auto text-3xl font-bold leading-none">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </div>
              </Link>
              <button
                className="navbar-close ml-14"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Additional links or content */}
            <div>
              <NavLinks />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Hamburger;
