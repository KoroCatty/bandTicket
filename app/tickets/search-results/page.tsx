"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// react-icons
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

// components
import SpinnerClient from "@/components/common/SpinnerClient";
import SearchForm from "@/components/common/SearchForm";

// next 14~
import { useSearchParams } from "next/navigation";

// TYPES
import type { TicketType, Ticket } from "@/types/ticket";
type MapProps = {
  selectedTicket: Ticket | null;
};

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  // console.log(searchParams.get('location'));// Melbourne

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // 前ページのフォームからの入力内容を取得
  const location = searchParams.get("location");
  const ticketStatus = searchParams.get("ticketStatus");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        // endpoint + formで設定したURL に location と ticketStatus を渡す
        const res = await fetch(
          `/api/tickets/search?location=${location}&ticketStatus=${ticketStatus}`,
        );
        if (res.status === 200) {
          const data = await res.json();
          setTickets(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, ticketStatus]);

  console.log(tickets);

  return (
    <>
      <SearchForm />

      {loading ? (
        <SpinnerClient loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl lg:container m-auto px-4 py-6">
            <Link
              href="/tickets"
              className="flex items-center w-fit text-blue-500 hover:underline mb-3"
            >
              <FaArrowAltCircleLeft className="mr-2 mb-1" />
              Go Back to tickets
            </Link>
            <h1 className="text-3xl mb-4">
              Search Results
              <span className="ml-4 text-[4rem] d-block">{tickets.length}</span>
            </h1>
            {tickets.length === 0 ? (
              <p>No search results found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tickets.map((ticket: Ticket) => (
                  <div
                    key={ticket._id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <Image
                      src={ticket.images[0] || "/images/default_icon.png"}
                      alt={ticket.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover object-center"
                    />
                    <div className="p-4">
                      <h2 className="text-2xl font-semibold text-gray-800">
                        {ticket.name}
                      </h2>
                      <p className="text-gray-600 mt-2">{ticket.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xl text-blue-500 font-semibold">
                          ${ticket.price}
                        </span>
                        <Link href={`/tickets/${ticket._id}`}>
                          <div className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
                            View ticket
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultsPage;
