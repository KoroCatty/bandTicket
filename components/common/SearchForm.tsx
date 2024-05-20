"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Title from "./Title";

const SearchForm = () => {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [ticketStatus, setTicketStatus] = useState("All");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const query = `?location=${location}&ticketStatus=${ticketStatus}`;
    // redirecting
    router.push(`/tickets/search-results${query}`);
  };

  return (
    <>
      <div className="max-w-[600px] mx-auto max-[480px]:-mt-3 max-[480px]:-mb-4">
        <Title>Search</Title>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-3 mx-auto sm:px-8 px-4 max-w-2xl w-full 
        md:flex flex-col md:flex-row items-center justify-between
        "
      >
        <div className="flex w-full gap-2 justify-center ">
          <div className="w-[100%]">
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              type="text"
              id="location"
              placeholder="Search..."
              className="block w-full
                px-4 py-3 rounded-sm bg-neutral-900 border-lg  border-slate-300 border-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className=" ">
            <label htmlFor="ticket-type" className="sr-only">
              tickets Type
            </label>

            <select
              onChange={(e) => setTicketStatus(e.target.value)}
              value={ticketStatus}
              id="ticket-type"
              className="appearance-none px-4 py-3 rounded-sm bg-neutral-900 border-lg  border-slate-300 border-2 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Finished">Finished</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="max-[768px]:w-[80%] mx-auto block
          md:ml-4 mt-4 md:mt-0 px-6 py-3 rounded-sm  bg-slate-950 border-lg  tracing-wider
          border-slate-500 border-2 tracking-wide
           min-[768px]:hover:scale-110  transition-all duration-300 focus:outline-none focus:ring focus:ring-blue-500 
           max-[480px]:py-2
           "
        >
          Search
        </button>
      </form>
    </>
  );
};

export default SearchForm;
