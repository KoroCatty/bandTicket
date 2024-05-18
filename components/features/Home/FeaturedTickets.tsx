"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Title from "@/components/common/Title";
// TYPES
import type { Ticket } from "@/types/ticket";
type AllTicketsProps = {
  tickets: Ticket[]; // Array of tickets (mapに使用)
  totalTickets: number;
};
// components
import SpinnerClient from "@/components/common/SpinnerClient";

const FeaturedTickets = () => {
  const [data, setData] = useState<AllTicketsProps>();
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  // Fetch API Data
  useEffect(() => {
    const allAdminTickets = async () => {
      setDataLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/featured`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setData(data);
      setDataLoading(false);
      return data;
    };
    allAdminTickets();
  }, []);

  return (
    <section className="mt-section_lg ">
      <Title>FEATURED</Title>

      {dataLoading ? (
        <SpinnerClient />
      ) : (
        <div className="w-[100%] opacity-90  mb-[6rem] max-[1000px]:mt-[1rem] max-[480px]:w-[100%] max-[480px]:mx-auto">
          <div className="w-[100%] mx-auto max-[1080px]:pl-0 max-[480px]: ">
            <div className="pb-8 border-b-2 border-gray-200 max-[480px]:pb-0 "></div>
            {data?.tickets &&
              data?.tickets.map((ticket: Ticket) => (
                <div
                  key={ticket._id}
                  className={`flex justify-between items-center py-4 border-b border-gray-200 pr-4
                    max-[480px]:justify-evenly max-[480px]:flex-col max-[480px]:border-b-2 max-[480px]:py-4
                  hover:bg-slate-800 
                 `}
                >
                  <div className="flex gap-6  max-[768px]:block max-[480px]:flex w-full ">
                    <Image
                      className="max-[480px]:w-[100px] max-[480px]:h-[100px]  object-cover "
                      src={ticket.images[0]}
                      alt={ticket.name}
                      width={100}
                      height={100}
                      loading="lazy"
                    />
                    <div className="flex gap-4 max-[1000px]:block max-[480px]:grow ">
                      <p className="text-lg  max-[480px]:text-[0.8rem] ">
                        {ticket.date.slice(0, 10)}
                      </p>
                      <p className="text-lg font-bold">{ticket.name}</p>
                      <p className="text-lg max-[480px]:text-[0.9rem]">
                        {ticket.venue}
                      </p>
                      <Link
                        href={`/tickets/${ticket._id}`}
                        className="py-2 px-6 mt-1 block bg-slate-950 border-2 border-slate-300 rounded-sm text-center
                       min-[481px]:hidden
                    "
                      >
                        Details
                      </Link>
                    </div>
                  </div>

                  <Link
                    href={`/tickets/${ticket._id}`}
                    className="py-2 px-6 bg-slate-950 border-2 border-slate-300 rounded-sm text-center max-[480px]:mt-4 max-[480px]:hidden
                         hover:scale-110 transition-all duration-300 hover:text-red-800"
                  >
                    Details
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedTickets;
