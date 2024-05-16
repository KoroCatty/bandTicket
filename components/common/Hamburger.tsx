"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";
import { FaGoogle } from "react-icons/fa"; // react icons
// Context (HttpsOnly user login info)
import { useGlobalContext } from "@/context/GlobalContext";
import { signOut, useSession } from "next-auth/react";

const Hamburger = () => {
  const { user }: any = useGlobalContext(); // httpOnly
  const { data: session } = useSession(); // Next Auth
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="relative z-10 pr-8 pl-2 py-2 flex justify-between items-center text-slate-950 min-[900px]:hidden ">
      <Link href="/">
        <div className="text-3xl font-bold leading-none">
          {/* <Image src="/images/logo.png" alt="logo" width={60} height={60} /> */}
          <div
            className="textShadow_wt mt-4 text-white font-bold text-nowrap max-[1000px]:text-[2.4rem] 
          max-[768px]:text-[2rem] max-[768px]:mt-2 max-[480px]:text-[1.7rem] max-[480px]:mt-1 "
          >
            NO NAME
          </div>
        </div>
      </Link>

      <button
        className="navbar-burger flex items-center text-white p-3 flex-row-reverse flex-grow mr-4"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="block h-6 w-6 fill-current"
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
            className="navbar-backdrop fixed inset-0 bg-neutral-800 opacity-75"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="fixed top-0 left-0 bottom-0 flex flex-col w-4/6 max-w-sm py-6 px-6 bg-neutral-950/90 overflow-y-auto">
            {/* Logo & Close button */}
            <div className="flex items-center mb-8">
              <Link href="/">
                <div className="mr-auto text-3xl font-bold leading-none">
                  <div className="textShadow_wt text-white text-[2.2rem] font-bold text-nowrap max-[1000px]:text-[1.4rem] ">
                    NO NAME
                  </div>
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
              <NavLinks setIsMenuOpen={setIsMenuOpen} />
            </div>
          </div>
        </div>
      )}

      {/* <-- Profile dropdown button --> */}
      <div className="relative -mr-4  min-[900px]:hidden ">
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
            className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-[480px]:left-20% "
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

            {/* ログインしていなければログインリンク表示 */}
            {!user && !session && (
              <Link
                onClick={() => setProfileMenuOpen(false)}
                href="/login"
                className="px-4 py-2  text-gray-700 flex "
                role="menuitem"
                tabIndex={-1}
                id="user-menu-item-2"
              >
                <FaGoogle className="mr-3 mt-1" />
                LOGIN
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Hamburger;
