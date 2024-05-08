"use client";
import { useParams } from "next/navigation";

const TicketDetailsBody = () => {
  const { ticketId }: { ticketId: string } = useParams();
  console.log(ticketId);

  return <div>TicketDetailsBody</div>;
};

export default TicketDetailsBody;
