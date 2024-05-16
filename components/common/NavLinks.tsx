"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
// react-icons
import { FaGoogle } from "react-icons/fa";

// Context (HttpsOnly user login info)
import { useGlobalContext } from "@/context/GlobalContext";
// next auth
import { signOut, useSession } from "next-auth/react";

type PropsType = {
  propClass?: string;
  setIsMenuOpen?: (arg0: boolean) => void;
};

const NavLinks = ({ propClass, setIsMenuOpen }: PropsType) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const currentPath = usePathname();

  // next auth & HttpOnly
  const { user }: any = useGlobalContext();
  const { data: session }: any = useSession();

  // isAdmin の確認
  const sessionIsAdmin = session?.user?.isAdmin;
  const userIsAdmin = user?.isAdmin;

  const links = [
    { label: "HOME", href: "/" },
    { label: "ABOUT", href: "/about" },
    { label: "SONGS", href: "/songs" },
    { label: "MERCH", href: "/merch" },
    { label: "CONTACT", href: "/contact" },
    { label: "TICKETS", href: "/tickets" },
    { label: "ADMIN", href: "/admin", admin: true },
  ];

  // プロフィール画像を Google / user / default image から取得
  const profileImage =
    session?.user?.image ||
    (user && "/images/house.png") ||
    "/images/default_icon.png";

  //! HttpOnly LOGOUT
  const httpOnlySignOut = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", //? httpOnly Cookie を送信
      });
      if (res.ok) {
        window.location.reload();
      } else {
        console.error("ログアウトに失敗しました");
      }
    } catch (error) {
      console.log("Failed to log out", error);
    }
  };

  return (
    <div
      // SP Hamburger Menu 対応
      className={`flex gap-3 mx-3 max-[899px]:flex-col max-[899px]:text-white 
      max-[899px]:gap-9 max-[767px]:w-[fit-content] max-[767px]:last:w-[70%] ${propClass}`}
    >
      {/* ログイン中のみ ADMIN Link を表示 */}
      {links
        .filter((link) => !link.admin || sessionIsAdmin || userIsAdmin)
        .map((link) => (
          <Link
            //? Close hamburger menu
            onClick={() => setIsMenuOpen && setIsMenuOpen(false)}
            href={link.href}
            className={`w-[fit-content] hover:bg-slate-700 hover:text-primary/60 px-3 py-1 rounded-md text-sm font-medium cursor-pointer text-[1.1rem]
            ${link.admin && "bg-red-500 text-white"}
            ${
              currentPath == link.href
                ? "bg-slate-700 cursor-default shadow-1 text-primary/70 hover:text-primary/60 "
                : ""
            }`}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}

      {/* <-- Profile dropdown button --> */}
      <div className="relative ml-3 max-[900px]:hidden ">
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
            {/* ログインしていなければログインリンク表示 */}
            {(user?.userID || session) && (
              <>
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
              </>
            )}

            {/* ログインしていなければログインリンク表示 */}
            {!user && !session && (
              <Link
                onClick={() => setProfileMenuOpen(false)}
                href="/login"
                className="px-4 py-2 text-lg text-gray-700 flex "
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-2"
              >
                <FaGoogle className="mr-3 mt-1" />
                LOGIN
              </Link>
            )}

            {/* Next Auth LOGOUT */}
            {session && (
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
                Sign Out Next Auth
              </button>
            )}
            {/* HttpOnly LOGOUT */}
            {user && (
              <button
                onClick={() => {
                  setProfileMenuOpen(false);
                  httpOnlySignOut();
                }}
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-2"
              >
                Sign Out HttpOnly
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
