"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 最初のページロード時ではなく、必要になった時点でロードすることを可能にする
import dynamic from "next/dynamic";

// Map コンポーネントはクライアントサイドでのみレンダリングされる (Prevent window is not defined error)
const Map = dynamic(() => import("@/components/common/Map"), { ssr: false });

// TYPES
import type { TicketType, Ticket } from "@/types/ticket";
type AllTicketsProps = {
  allTickets: TicketType; // This is now correctly using TicketType which is an object containing an array of tickets.
};

const AllTickets = ({ allTickets }: AllTicketsProps) => {
  console.log("トータルチケット数", allTickets.totalTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(
    allTickets.tickets[0],
  ); // 一番上のチケットを選択状態にする

  const handleTicketClick = async (ticket: Ticket) => {
    await setSelectedTicket(ticket);
  };

  return (
    <section className="max-[1000px]:px-8 max-[480px]:px-4  ">
      <div className="mt-4 absolute top-[0%] left-[3%] z-[-10] opacity-15 mb-4">
        {selectedTicket?.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={selectedTicket?.name}
            width={800}
            height={420}
            className="rounded-tl-[30%] rounded-br-[30%]"
          />
        ))}
      </div>
      <div className="w-[100%] opacity-90 my-[3rem] min-[1000px]:flex max-[1000px]:mt-[1rem] max-[480px]:w-[80%] max-[480px]:mx-auto">
        <div
          className="w-[60%] h-[600px] overflow-y-scroll overflow-x-hidden pl-[4rem] 
        max-[1000px]:w-[100%] max-[1000px]:pl-0 max-[480px]:h-[400px] "
        >
          <h1 className="text-[3rem] font-bold pb-4">10 Tickets</h1>
          <div className="flex gap-20 pb-4 border-b-2 border-gray-200 ">
            <p className="">Dates</p>
            <p className="">Name</p>
            <p className="">Venues</p>
          </div>
          {allTickets?.tickets &&
            allTickets?.tickets.map((ticket) => (
              <div
                key={ticket._id}
                className={`flex justify-between items-center py-4 border-b border-gray-200 pr-4 cursor-pointer 
              hover:scale-105 transition-all duration-300 max-[480px]:py-1 
            ${selectedTicket?._id === ticket?._id ? "bg-blue-300/20 " : "bg-neutral-900/70 "}`}
                onClick={() => handleTicketClick(ticket)}
              >
                <div className={`gap-4 min-[600px]:flex max-[600px]:pl-6`}>
                  <p className="text-lg  max-[480px]:text-[0.8rem] ">
                    {ticket.date}
                  </p>
                  <p className="text-lg font-bold">{ticket.name}</p>
                  <p className="text-lg max-[480px]:text-[0.9rem]">
                    {ticket.venue}
                  </p>
                </div>
                <div className="flex gap-4 ">
                  {/* <p className="text-lg">{ticket.description}</p> */}
                  <Link
                    href={`/tickets/${ticket._id}`}
                    className="py-2 px-6 bg-blue-300 
                hover:scale-110 transition-all duration-300 hover:text-red-800
                "
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
        </div>

        <Map selectedTicket={selectedTicket} />
      </div>
    </section>
  );
};

export default AllTickets;
