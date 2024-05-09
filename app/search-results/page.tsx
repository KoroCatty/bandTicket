"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// react-icons
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

// components
import SpinnerClient from "@/components/common/SpinnerClient";
import SearchForm from "@/components/common/SearchForm";

// next 14~
import { useSearchParams } from "next/navigation";

// types

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
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </section>

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
            <h1 className="text-3xl mb-4">Search Results</h1>
            {tickets.length === 0 ? (
              <p>No search results found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* {tickets.map((ticket) => (
                  <div className=""> 
                  {tickt.name}
                  </div>
                ))} */}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default SearchResultsPage;
