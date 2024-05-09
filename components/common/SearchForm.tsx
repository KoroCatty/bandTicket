"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchForm = () => {
  const router = useRouter();
  const [location, setLocation] = useState(""); // input
  const [ticketStatus, setTicketStatus] = useState("All"); // select

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // redirecting
    if (location === "" && ticketStatus === "All") {
      router.push("/tickets");
    } else {
      // フォームの内容を入れてリダイレクト
      const query = `?location=${location}&ticketStatus=${ticketStatus}`;
      router.push(`/tickets/search-results${query}`);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
      >
        <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
          <label htmlFor="location" className="sr-only">
            Location
          </label>
          <input
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            type="text"
            id="location"
            placeholder="Enter Location (City, State, postcode, etc"
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="w-full md:w-2/5 md:pl-2">
          <label htmlFor="ticket-type" className="sr-only">
            tickets Type
          </label>

          <select
            onChange={(e) => setTicketStatus(e.target.value)}
            value={ticketStatus}
            id="ticket-type"
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Finished">Finished</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <button
          type="submit"
          className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white
           hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchForm;
