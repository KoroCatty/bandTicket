"use client";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

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
// Icons
import { IoMdTime } from "react-icons/io";
import { MdLocationCity } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { BiMessageDetail } from "react-icons/bi";

import type { Ticket } from "@/types/ticket";

const TicketDetailsBody = ({ ticket }: { ticket: Ticket }) => {
  // Contextを発動 (ユーザーデータを取得)  & Next auth
  const { user, userLoading }: any = useGlobalContext();
  const { data: session }: any = useSession();

  const { ticketId } = useParams();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const videos = [
    "/videos/resized_band_video_hero.mp4",
    "/videos/resized_band_video.mp4",
    "/videos/resized_band_video2.mp4",
    "/videos/resized_band_video4.mp4",
    "/videos/resized_band_video5.mp4",
    "/videos/resized_band_video3.mp4",
  ];

  // HTMLがマウントしてからビデオを読む
  useEffect(() => {
    setMounted(true);
  }, []);

  // ランダムなビデオを選択
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setSelectedVideo(videos[randomIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    mounted && (
      <section className="max-w-[1080px] mx-auto relative">
        <h1 className="text-[5rem] text-center max-[768px]:text-[4rem] max-[480px]:text-[3rem]">
          {ticket.name}
        </h1>

        <div className="flex px-6 mx-auto max-[768px]:block ">
          <div className="w-1/2 max-[768px]:w-full">
            <div className="text-4xl flex items-center max-[768px]:text-[2rem] max-[480px]:text-[1.5rem] ">
              <IoMdTime className="mr-3 text-[2rem]" /> {ticket.date}
            </div>
            <div className="text-4xl flex items-center my-3 max-[768px]:text-[2rem] max-[480px]:text-[1.5rem] ">
              <MdLocationCity className="mr-3 text-[2rem]" /> {ticket.venue}
            </div>
            <div className="text-4xl flex items-center max-[768px]:text-[2rem] max-[480px]:text-[1.5rem] ">
              <SlLocationPin className="mr-3 text-[2rem]" />
              Location
            </div>
            <div className="flex my-2 ml-12">
              <div className="">{ticket.location.street}</div>
              <span className="">{ticket.location.city}</span>
              <span className="mx-2">{ticket.location.state}</span>
              <div className="ml-2">{ticket.location.postcode}</div>
            </div>
            <div className="text-[1rem] mt-6">{ticket.description}</div>
          </div>

          <div className="w-1/2 max-[768px]:w-full">
            <Suspense fallback={<SpinnerClient />}>
              <video
                className="rounded-tl-[20%] rounded-br-[20%] max-[768px]:mt-10"
                playsInline
                autoPlay
                loop
                muted
                preload="metadata"
              >
                <source src={selectedVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Suspense>
          </div>
        </div>

        <div className="max-w-[600px] my-10 mx-auto px-8 py-6 text-center bg-black/70 rounded-lg max-[768px]:py-4 max-[480px]:py-2 ">
          <h2 className="text-[3rem] font-bold max-[768px]:text-[2rem] max-[480px]:text-[2.5rem] ">
            Ticket
          </h2>
          <div className="text-[1.4rem] mb-4 max-[768px]:text-[1.2rem] max-[480px]:text-[1.1rem] ">
            Ticket Status:
            <span className="text-[2rem] ml-4 max-[768px]:text-[1.7rem] max-[480px]:text-[1.5rem] ">
              {ticket.status.toUpperCase()}
            </span>
          </div>

          {ticket.status === "cancelled" ? (
            <button disabled className="disabled:opacity-50">
              Live is Cancelled
            </button>
          ) : (
            <button
              onClick={() => handlePurchaseClick()}
              className="text-[1.2rem] inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 
                  max-[640px]:text-[1.1rem] max-[480px]:text-[1rem] "
            >
              <span className="relative px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0  ">
                Buy Now
              </span>
            </button>
          )}
        </div>

        {isModalOpen && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-950 bg-opacity-60 flex justify-center items-center modal">
            <div className="bg-black p-8 rounded-lg max-[480px]:mt-[20rem] ">
              <h3 className="text-xl mb-4">
                Are you sure to buy this Product?
              </h3>

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
        <TicketDetailsMap ticket={ticket} />
      </section>
    )
  );
};

export default TicketDetailsBody;
