"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 現在のパス名を取得するためのフック

// react-icons
import { FaGoogle } from "react-icons/fa";

// next auth
import { signOut } from "next-auth/react";

// roleプロパティをオプショナルで受け取る
const NavLinks = ({ session }: { session?: boolean }) => {
  const links = [
    { label: "Home", href: "/", providers: false },
    { label: "About", href: "/about", providers: false },
    { label: "Songs", href: "/songs", session: false },
    { label: "Contact", href: "/contact", session: false },
    { label: "Tickets", href: "/tickets", session: false },
    { label: "Profile", href: "/profile", session: true },
    { label: "Admin", href: "/tickets", session: true },
  ];

  const currentPath = usePathname();

  return (
    <div className="flex gap-6 mx-3 ">
      {links
        // .filter((link) => !link.adminOnly || role === "ADMIN") // adminOnlyがtrueのリンクはADMINロールのみ表示
        .filter((link) => !link.session || link.session === session) // ログインしている場合のみ表示
        .map((link) => (
          <Link
            href={link.href}
            className={` 
              ${link.session && "bg-red-500 text-white"}
              ${
                currentPath == link.href
                  ? "cursor-default shadow-1 text-primary/70 hover:text-primary/60"
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
            className="flex items-center bg-slate-900 text-white rounded-md"
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
          className="flex items-center bg-blue-500 p-1 text-white rounded-md"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-2"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default NavLinks;
