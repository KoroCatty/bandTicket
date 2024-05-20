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

// Context (HttpsOnly user login info)
import { useGlobalContext } from "@/context/GlobalContext";
// next auth
import { useSession } from "next-auth/react";

// components
import SpinnerClient from "@/components/common/SpinnerClient";
// react-toastify
import { toast } from "react-toastify";

const AdminPage = () => {
  const [data, setData] = useState<AllTicketsProps>();
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  // Contextを発動 (ユーザーデータを取得)
  const { user, userLoading }: any = useGlobalContext();
  // next auth
  const { data: session }: any = useSession();

  //! Delete Ticket
  const deleteTicket = async (ticketId: string) => {
    const confirmed = window.confirm("Are you sure to delete this ticket?");
    if (!confirmed) return;
    try {
      // make DELETE request to server
      const res = await fetch(`/api/tickets/admin/${ticketId}`, {
        method: "DELETE", //! explicitly set
      });

      if (res.status === 200) {
        const updatedTickets = data?.tickets.filter(
          (ticket) => ticket._id !== ticketId,
        );
        if (updatedTickets) {
          // data.totalTickets が undefined である場合に安全に減算する
          setData({
            tickets: updatedTickets,
            totalTickets: (data?.totalTickets || 0) - 1,
          });
        }

        toast.success("Ticket deleted successfully");
      } else {
        toast.error("Failed to delete ticket");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete ticket");
    }
  };

  // Fetch API Data
  useEffect(() => {
    const allAdminTickets = async () => {
      setDataLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/admin`,
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

  if (userLoading) {
    return <SpinnerClient />; // ローディング中の表示
  }

  // Next Auth / HttpOnly Cookie　でログイン確認 (Admin)
  return (!userLoading && user?.isAdmin) || session?.user?.isAdmin ? (
    <section className="mt-8 ">
      <Title>ADMIN</Title>
      <div className="w-[90%] mx-auto mt-4 ">
        <Link className="bg-blue-400 py-2 px-4" href="/admin/add">
          Add Ticket
        </Link>
        <h2 className="text-[3rem] font-bold mt-8 max-[480px]:text-[2rem] ">
          All {data && data?.totalTickets} Tickets
        </h2>
      </div>

      {dataLoading ? (
        <SpinnerClient />
      ) : (
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
                  hover:bg-slate-800 last:border-red-600 last:border-b-4
                  `}
                >
                  <div className="flex gap-6  max-[768px]:block max-[480px]:flex ">
                    <Link
                      href={`/tickets/${ticket._id}`}
                      className="md:hover:translate-y-[5%] transform transition-all duration-400 "
                    >
                      <Image
                        className="md:hover:opacity-70"
                        src={ticket.images[0]}
                        alt={ticket.name}
                        width={100}
                        height={100}
                      />
                    </Link>
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
                    <Link
                      href={`/admin/edit/${ticket._id}`}
                      className="py-2 px-6 bg-blue-300 
                         hover:scale-110 transition-all duration-300 hover:text-red-800"
                    >
                      Edit
                    </Link>
                    {/* DELETE */}
                    <button
                      onClick={() => deleteTicket(ticket._id)}
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
      )}
    </section>
  ) : (
    <section className="max-w-[860px] mx-auto px-10 py-[3rem] max-[480px]:pt-0  ">
      <div className="text-center">
        <h1 className="text-3xl my-12 ">Please Login as Admin</h1>
        <Link
          className="py-2 px-4 bg-slate-800 block w-[50%] mx-auto text-white
      hover:scale-105 transition-all duration-300 hover:opacity-75
      "
          href="/login"
        >
          Login
        </Link>
      </div>
    </section>
  );
};

export default AdminPage;
