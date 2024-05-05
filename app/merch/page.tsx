"use client";

import { useEffect } from "react";

export default function Merch() {
  useEffect(() => {
    console.log("Merch");
  }, []);

  return <div>Merch</div>;
}
