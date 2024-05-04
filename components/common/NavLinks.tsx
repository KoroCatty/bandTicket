"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 現在のパス名を取得するためのフック

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
    <div className="flex gap-4">
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
    </div>
  );
};

export default NavLinks;
