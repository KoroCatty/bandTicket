"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 最初のページロード時ではなく、必要になった時点でロードすることを可能にする
import dynamic from "next/dynamic";

// クライアントサイドでのみレンダリング (Prevent window is not defined error)
const Map = dynamic(() => import("@/components/common/Map"), { ssr: false });

// TYPES
import type { TicketType, Ticket } from "@/types/ticket";
type AllTicketsProps = {
  allTickets: TicketType;
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
    <section className="max-[1000px]:px-8 max-[480px]:px-0  ">
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
      <div className="w-[100%] opacity-90 my-[3rem] min-[1000px]:flex max-[1000px]:mt-[1rem] max-[480px]:w-[88%] max-[480px]:ml-auto ">
        <div
          className="w-[60%] h-[680px] overflow-y-scroll overflow-x-hidden pl-[8rem] 
           max-[1000px]:w-[100%] max-[1000px]:pl-0 max-[480px]:h-[200px] "
        >
          <h1 className="text-[3rem] font-bold max-[480px]:text-[2rem]">
            10 Tickets
          </h1>
          <div className="flex gap-20  border-b-2 border-gray-200 "></div>
          {allTickets?.tickets &&
            allTickets?.tickets.map((ticket, idx) => (
              <div
                key={ticket._id}
                className={`flex justify-between items-center py-4 border-b border-gray-200 pr-4 cursor-pointer pl-4 
                max-[1000px]:pl-6 max-[480px]:pl-2
              hover:scale-105 transition-all duration-300 max-[480px]:py-1 
            ${selectedTicket?._id === ticket?._id ? "bg-blue-300/20 " : "bg-neutral-900/70 "}`}
                onClick={() => handleTicketClick(ticket)}
              >
                <div className="">
                  <div className={`gap-4 min-[1200px]:flex `}>
                    <p className="text-lg  max-[480px]:text-[0.8rem] ">
                      {ticket.date.slice(0, 10)}
                    </p>
                    <p className="text-lg font-bold">{ticket.name}</p>
                  </div>

                  <div className="mt-2 flex items-center gap-12">
                    <Image
                      src={ticket.images[0]}
                      width={100}
                      height={100}
                      alt={ticket.name}
                      priority={idx > 2} // 3番目以降の画像は優先度を下げる
                    />
                    <Link
                      href={`/tickets/${ticket._id}`}
                      className="py-2 px-6 bg-slate-950 border-slate-300 border-2
                        text-[1.1rem] rounded-sm
                        h-[46px] 
                        min-[480px]:hidden"
                    >
                      Details
                    </Link>
                  </div>
                </div>

                <div className="flex gap-4 max-[480px]:hidden ">
                  {/* <p className="text-lg">{ticket.description}</p> */}
                  <Link
                    href={`/tickets/${ticket._id}`}
                    className="py-2 px-6 bg-slate-950 border-slate-300 border-2
                    max-[480px]:px-3 max-[480px]:text-[0.8rem] rounded-sm
                    hover:scale-110 transition-all duration-300 
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
