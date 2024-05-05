"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation"; // 現在のパス名を取得するためのフック

// react-icons
import { FaGoogle } from "react-icons/fa";

// next auth
import { signOut, useSession } from "next-auth/react";
import Hamburger from "./Hamburger";

// roleプロパティをオプショナルで受け取る
const NavLinks = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  // next auth
  const { data: session } = useSession();

  const links = [
    { label: "Home", href: "/", providers: false },
    { label: "About", href: "/about", providers: false },
    { label: "Songs", href: "/songs", session: false },
    { label: "Merch", href: "/merch", session: false },
    { label: "Contact", href: "/contact", session: false },
    { label: "Tickets", href: "/tickets", session: false },
    { label: "Admin", href: "/tickets", session: true },
  ];

  // プロフィール画像をセッションから取得
  const profileImage = session?.user?.image || "/images/default_icon.png";

  const currentPath = usePathname();

  return (
    // SP Hamburger Menu 対応
    <div className="flex gap-6 mx-3 max-[767px]:flex-col max-[767px]:text-white max-[767px]:gap-9 max-[767px]:w-[fit-content] max-[767px]:last:w-[70%]">
      {links
        .filter((link) => !link.session || link.session === !!session) // ログインしている場合のみ表示
        .map((link) => (
          <Link
            href={link.href}
            className={` 
              ${link.session && "bg-red-500 text-white"}
              ${currentPath == link.href
                ? "cursor-default shadow-1 text-primary/70 hover:text-primary/60 "
                : ""
              }`}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}

      {!session ? (
        <div className="">
          <Link
            href="/login"
            className="flex items-center bg-slate-900 text-white rounded-md max-[767px]:w-[fit-content]"
          >
            <FaGoogle className="mr-1" />
            Login
          </Link>
        </div>
      ) : (
        ""
      )}

      {/* {session && (
        <button
          onClick={() => {
            signOut();
          }}
          className="flex items-center bg-blue-500 p-1 text-white rounded-md"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-2"
        >
          Sign Out
        </button>
      )} */}

      {/* <-- Profile dropdown button --> */}
      <div className="relative ml-3">
        <div>
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)} //? メニューを開閉
            type="button"
            className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">Open user menu</span>
            <Image
              className="h-8 w-8 rounded-full"
              src={profileImage}
              alt={session?.user?.name || "Profile Picture"}
              width={40}
              height={40}
            />
          </button>
        </div>

        {/* <//! -- Profile dropdown Menu --> */}
        {profileMenuOpen && (
          <div
            id="user-menu"
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabIndex={-1}
          >
            <Link
              onClick={() => setProfileMenuOpen(false)}
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-0"
            >
              Your Profile
            </Link>
            <Link
              onClick={() => setProfileMenuOpen(false)}
              href="/tickets/saved"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-2"
            >
              Saved tickets
            </Link>
            <button
              onClick={() => {
                setProfileMenuOpen(false);
                signOut();
              }}
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="user-menu-item-2"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      

    </div>
  );
};

export default NavLinks;
