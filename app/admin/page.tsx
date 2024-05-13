"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// TYPES
import type { Ticket } from "@/types/ticket";
type AllTicketsProps = {
  tickets: Ticket[]; // Array of tickets (mapに使用)
  totalTickets: number;
};

// Context (HttpsOnly user login info)
import { useGlobalContext } from "@/context/GlobalContext";
// next auth
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const [data, setData] = useState<AllTicketsProps>();

  // Contextを発動 (ユーザーデータを取得)
  const { user, userLoading }: any = useGlobalContext();
  // next auth
  const { data: session } = useSession();

  // Fetch API Data
  useEffect(() => {
    const allAdminTickets = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/admin`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setData(data);
      return data;
    };
    allAdminTickets();
  }, []);

  if (userLoading) {
    return <div>Loading...</div>; // ローディング中の表示
  }

  // Next Auth / HttpOnly Cookie　でログイン確認
  return (!userLoading && user) || session ? (
    <section className="w-[100%]  ">
      <div className="w-[90%] mx-auto mt-12 ">
        <Link className="bg-blue-400 py-2 px-4" href="/admin/add">
          Add Ticket
        </Link>
        <h1 className="text-[3rem] font-bold mt-8 max-[480px]:text-[2rem] ">
          All {data && data?.totalTickets} Tickets
        </h1>
      </div>

      <div className="w-[100%] opacity-90  mb-[6rem] max-[1000px]:mt-[1rem] max-[480px]:w-[100%] max-[480px]:mx-auto">
        <div
          className="w-[90%] mx-auto h-[680px] overflow-y-scroll overflow-x-hidden 
            max-[1000px]:pl-0 max-[480px]: "
        >
          <div className="pb-8 border-b-2 border-gray-200 max-[480px]:pb-0 "></div>
          {data?.tickets &&
            data?.tickets.map((ticket: Ticket) => (
              <div
                key={ticket._id}
                className={`flex justify-between items-center py-4 border-b border-gray-200 pr-4
                max-[480px]:justify-evenly max-[480px]:flex-col max-[480px]:border-b-2 max-[480px]:py-4
              hover:bg-slate-800 
              last:border-red-600 last:border-b-4
              `}
              >
                <div className="flex gap-6  max-[768px]:block max-[480px]:flex ">
                  <Image
                    className=""
                    src={ticket.images[0]}
                    alt={ticket.name}
                    width={100}
                    height={100}
                  />
                  <div className="flex gap-4 max-[1000px]:block">
                    <p className="text-lg  max-[480px]:text-[0.8rem] ">
                      {ticket.date.slice(0, 10)}
                    </p>
                    <p className="text-lg font-bold">{ticket.name}</p>
                    <p className="text-lg max-[480px]:text-[0.9rem]">
                      {ticket.venue}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4  max-[480px]:mt-4 ">
                  {/* <p className="text-lg">{ticket.description}</p> */}
                  <Link
                    href={`/admin/edit/${ticket._id}`}
                    className="py-2 px-6 bg-blue-300 
                hover:scale-110 transition-all duration-300 hover:text-red-800"
                  >
                    Edit
                  </Link>
                  {/* DELETE */}
                  <button
                    // onClick={() => deleteTicket(ticket._id)}
                    className="py-2 px-6 bg-red-300 
                hover:scale-110 transition-all duration-300 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  ) : (
    "Please Login "
  );
};

export default AdminPage;
