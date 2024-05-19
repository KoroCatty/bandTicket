"use client";

import { useEffect } from "react";
import HeroMerch from "@/components/features/Merch/HeroMerch";
import Categories from "@/components/features/Merch/Categories";

export default function Merch() {
  useEffect(() => {
    console.log("Merch");
  }, []);

  return (
    <>
      <div className="max-w-[1080px] mx-auto ">
        <HeroMerch />
        <Categories />
      </div>
    </>
  );
}
