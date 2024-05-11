"use client";
//! HttpOnly Cookie を使ったログイン状態をグローバル化するコンポーネント

import { createContext, useContext, useState, useEffect } from "react";
// Create context
const GlobalContext = createContext({});

// Create a provider
export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const response = await fetch("/api/cookie/check", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    };
    checkSession();
  }, []);

  return (
    // user はグローバルステートとして提供される
    <GlobalContext.Provider value={{ user }}>{children}</GlobalContext.Provider>
  );
}

// Create a custom hook for accessing context from anywhere (この関数名を使い回す)
export function useGlobalContext() {
  return useContext(GlobalContext);
}

// 使いたいコンポーネントで下記のように使う (この例では useState のように使用)
// import { useGlobalContext } from "@/context/GlobalContext";
// const { unreadCount, setUnreadCount } = useGlobalContext();
