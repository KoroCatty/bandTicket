"use client";
//! HttpOnly Cookie を使ったログイン状態をグローバル化するコンポーネント

import { createContext, useContext, useState, useEffect } from "react";
const GlobalContext = createContext({}); // Create context

// Create a provider
export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  //! HttpOnly を送信してログイン状態を取得
  useEffect(() => {
    setUserLoading(true);
    try {
      const checkSession = async () => {
        const response = await fetch("/api/cookie/check", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          // Only attempt to parse the JSON if the status indicates that content should be present
          if (response.status === 200) {
            const data = await response.json(); // assuming 200 means data(httpOnly cookie) is present
            setUser(data);
            console.log("User data:", data);
          } else if (response.status === 201) {
            setUser(null); // No user data to parse, set user to null or handle accordingly
          }
        } else {
          setUser(null);
        }
      };
      checkSession();
    } catch (error) {
      console.log("Failed to check session", error);
    } finally {
      setUserLoading(false);
    }
  }, []);

  return (
    // user はグローバルステートとして提供される
    <GlobalContext.Provider value={{ user, userLoading }}>
      {children}
    </GlobalContext.Provider>
  );
}

// Create a custom hook for accessing context from anywhere (この関数名を使い回す)
export function useGlobalContext() {
  return useContext(GlobalContext);
}
