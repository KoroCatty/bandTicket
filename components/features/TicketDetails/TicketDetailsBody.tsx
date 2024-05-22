"use client";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Context (HttpsOnly user login info) & next auth
import { useGlobalContext } from "@/context/GlobalContext";
import { useSession } from "next-auth/react";
import GoBackBtn from "@/components/common/GoBackBtn";
import SpinnerClient from "@/components/common/SpinnerClient";

// components
// 最初のページロード時ではなく、必要になった時点でロードすることを可能にする
import dynamic from "next/dynamic";

// Map コンポーネントはクライアントサイドでのみレンダリングされる
const TicketDetailsMap = dynamic(
  () => import("@/components/features/TicketDetails/TicketDetailsMap"),
  { ssr: false },
);

import type { Ticket } from "@/types/ticket";

const TicketDetailsBody = ({ ticket }: { ticket: Ticket }) => {
  // Contextを発動 (ユーザーデータを取得)  & Next auth
  const { user, userLoading }: any = useGlobalContext();
  const { data: session }: any = useSession();

  const { ticketId } = useParams();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  console.log(ticketId);

  const handlePurchaseClick = () => {
    setIsModalOpen(true);
  };
  // モーダルを閉じる
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //! PURCHASE Stripe
  const handlePurchaseConfirm = () => {
    startCheckout();
  };

  //! Stripe Checkout
  const startCheckout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: ticket?.name,
            price: ticket?.price,
            userId: user?.userID || session?.user?.id,
            ticketId: ticketId,
            images: ticket?.images,
            description: ticket?.description,
          }),
        },
      );
      const resData = await res.json();

      if (resData) {
        // res データがあれば決済ページに遷移
        router.push(resData.checkout_url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-[1080px] mx-auto text-center relative">
      <h1 className="text-[5rem] ">{ticket.name}</h1>
      <div className="">Ticket ID: {ticket._id}</div>
      <div className="text-2xl">{ticket.date}</div>
      <div className="text-2xl">{ticket.status}</div>
      <br />
      <div className="">{ticket.description}</div>
      <div className="">{ticket.location.city}</div>
      <div className="">{ticket.location.state}</div>
      <div className="">{ticket.location.street}</div>
      <div className="">{ticket.location.postcode}</div>
      <br />

      <div className="text-2xl">{ticket.venue}</div>

      <div className="text-center bg-gray-600 rounded-lg max-w-[800px] mx-auto px-8 py-6 ">
        <h2 className="text-2xl font-bold mb-4">Ticket</h2>

        <div className="text-center mx-auto border-2 border-white">
          <button onClick={() => handlePurchaseClick()} className=" ">
            Buy Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-950 bg-opacity-60 flex justify-center items-center modal">
          <div className="bg-black p-8 rounded-lg max-[480px]:mt-[30rem] ">
            <h3 className="text-xl mb-4">Are you sure to buy this Product?</h3>

            <div className="flex justify-center gap-5">
              <button
                onClick={handlePurchaseConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4 "
              >
                Buy
              </button>

              <button
                onClick={() => handleCancel()}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <TicketDetailsMap ticket={ticket} /> */}
    </section>
  );
};

export default TicketDetailsBody;
