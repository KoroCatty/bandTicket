"use client";
import { useParams } from "next/navigation";

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
  // const { ticketId }: { ticketId: string } = useParams();
  // console.log(ticketId);

  console.log(ticket);

  return (
    <section className="bg-blue-50">
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <TicketDetailsMap ticket={ticket} />
      </div>
    </section>
  );
};

export default TicketDetailsBody;
