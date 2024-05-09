"use client";

// APIのドメインを環境変数から取得またはnullを設定
const apiDomain = process.env.NEXT_PUBLIC_DOMAIN || null;

// components
import TicketDetailsBody from "@/components/features/TicketDetails/TicketDetailsBody";

// コンポーネント内のインポートと定義
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import type { Ticket } from "@/types/ticket";
import SpinnerClient from "@/components/common/SpinnerClient";
import GoBackBtn from "@/components/common/GoBackBtn";
// 省略されたインポートのコメントアウトもここに含む

const TicketDetailsPage = () => {
  const { ticketId }: { ticketId: string } = useParams();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(ticket);

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
      const ticketData = await fetchTicket(ticketId);
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
        <>
          <GoBackBtn href="/tickets" text="Back to Tickets" />
          {/* その他のチケット詳細表示 */}
          <TicketDetailsBody />
        </>
      ) : null}
    </>
  );
};

export default TicketDetailsPage;
