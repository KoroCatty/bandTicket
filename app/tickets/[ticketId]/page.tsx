"use client";
const apiDomain = process.env.NEXT_PUBLIC_DOMAIN || null;

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// components
import type { Ticket } from "@/types/ticket";
import SpinnerClient from "@/components/common/SpinnerClient";
import GoBackBtn from "@/components/common/GoBackBtn";
import HeroTicketDetails from "@/components/features/TicketDetails/HeroTicketDetails";
import TicketDetailsBody from "@/components/features/TicketDetails/TicketDetailsBody";
import TicketDetailsImgs from "@/components/features/TicketDetails/TicketDetailsImgs";

const TicketDetailsPage = () => {
  const { ticketId }: { ticketId: string } = useParams();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  // Ticketの詳細データを取得する関数
  async function fetchTicket(ticketId: string) {
    if (!apiDomain) return null;
    try {
      const response = await fetch(`${apiDomain}/tickets/${ticketId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }

  useEffect(() => {
    const fetchTicketData = async () => {
      if (!ticketId) return;
      const ticketData = await fetchTicket(ticketId.toString());
      setTicket(ticketData);
      setLoading(false);
    };
    fetchTicketData();
  }, [ticketId]);

  if (!ticket && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Ticket Not Found</h1>
    );
  }

  return (
    <>
      {loading ? <SpinnerClient loading={loading} /> : null}
      {!loading && ticket ? (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url('/images/darkBg.webp')`,
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
              opacity: 0.6, // 背景画像の透明度
              zIndex: -1,
            }}
          ></div>
          <HeroTicketDetails image={ticket.images[0]} />
          <GoBackBtn text="Go back " />
          <TicketDetailsBody ticket={ticket} />
          <TicketDetailsImgs images={ticket.images} />
        </div>
      ) : null}
    </>
  );
};

export default TicketDetailsPage;
