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
  return (
    <section className="">
      <TicketDetailsMap ticket={ticket} />
    </section>
  );
};

export default TicketDetailsBody;
