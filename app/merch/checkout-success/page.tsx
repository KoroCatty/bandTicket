"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaRegCheckCircle } from "react-icons/fa";

const CheckoutSuccessPage = () => {
  const router = useRouter();

  const [currentUrl, setCurrentUrl] = useState<string | null>("");

  useEffect(() => {
    if (router) {
      const urlParams = new URLSearchParams(window.location.search);
      const sessionIdFromUrl = urlParams.get("session_id");
      setCurrentUrl(sessionIdFromUrl);
    }
  }, [router]);
  return (
    <section className="max-w-[720px] mx-auto text-center h-[60vh] flex justify-center flex-col rounded-lg ">
      <div className="bg-gray-900 py-12 ">
        <FaRegCheckCircle className="text-[3rem] mx-auto mb-4" />

        <h1 className="text-[3rem]">Thank you!</h1>
        <p className="text-[2rem] ">Your order has been successfully placed.</p>

        <small>
          <span className="text-[1.5rem]">Order No: </span>
          {currentUrl?.slice(8)}
        </small>
        <Link
          href="/"
          className="block w-[50%] mx-auto border-2 border-slate-300 mt-12 py-4 text-[1.1rem]
        hover:opacity-80 transition duration-300 ease-in-out text-slate-300
        "
        >
          Go Home
        </Link>
      </div>
    </section>
  );
};

export default CheckoutSuccessPage;
