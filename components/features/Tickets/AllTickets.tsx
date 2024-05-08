"use client";
import { useState } from "react";
import Image from "next/image";
// 最初のページロード時ではなく、必要になった時点でロードすることを可能にする
import dynamic from "next/dynamic";

// Map コンポーネントはクライアントサイドでのみレンダリングされる (Prevent window is not defined error)
const Map = dynamic(() => import("@/components/common/Map"), { ssr: false });

// Ticket DB
const allTickets = [
  {
    id: 1,
    userId: 1,
    name: "Rock @Yamava Theater",
    description: "Girl in Red",
    location: {
      street: "Chapel",
      city: "Melbourne",
      state: "VIC",
      postcode: "3000",
    },
    price: 100,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966930/propertyFinderNext/fzlt3vwybbvoan9hjs6e.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966932/propertyFinderNext/qhj5i3gdkykas1p8ve9w.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966932/propertyFinderNext/qhj5i3gdkykas1p8ve9w.jpg",
    ],
    status: "active",
    date: "2024-08-13",
    venue: "Yamava Theater",
    isFeatured: true,
  },
  {
    id: 2,
    userId: 2,
    name: "Test venue",
    description: "TEST",
    location: {
      street: "ST Kilda Rd ",
      city: "Melbourne",
      state: "VIC",
      postcode: "3106",
    },
    price: 100,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966934/propertyFinderNext/auogi7pg2u7tt6up9d17.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966936/propertyFinderNext/qgm9xv4vtgspkry5hzcd.jpg",
    ],
    status: "active",
    date: "2024-10-13",
    venue: "Yamava Theater",
    isFeatured: true,
  },
  {
    id: 3,
    userId: 3,
    name: "Rock @Yamava Theater",
    description: " TEST",
    location: {
      street: "Chapel",
      city: "Melbourne",
      state: "VIC",
      postcode: "3000",
    },
    price: 100,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966930/propertyFinderNext/fzlt3vwybbvoan9hjs6e.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966932/propertyFinderNext/qhj5i3gdkykas1p8ve9w.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966932/propertyFinderNext/qhj5i3gdkykas1p8ve9w.jpg",
    ],
    status: "active",
    date: "2024-08-13",
    venue: "Yamava Theater",
    isFeatured: true,
  },
];

// TYPES
import type { TicketType } from "@/types/ticket";

const AllTickets = () => {
  // Use an object to store selection state for each ticket
  const [selectedTicket, setSelectedTicket] = useState(allTickets[0]);

  const handleTicketClick = async (ticket: TicketType) => {
    await setSelectedTicket(ticket);
  };

  return (
    <section>
      <div className="gap-4 mt-4 justify-center absolute top-[0%] left-[3%] z-[-10] opacity-5 mb-4">
        {selectedTicket?.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={selectedTicket?.name}
            width={800}
            height={420}
            className="rounded-tl-[30%] rounded-br-[30%] "
          />
        ))}
      </div>
      <div className="w-[100%] my-[10rem] min-[1000px]:flex ">
        <div className="w-[60%] pl-[4rem] max-[1000px]:w-[100%] ">
          <h1 className="text-[3rem] font-bold pb-4">All Tickets</h1>
          <div className="flex gap-20 pb-4 border-b-2 border-gray-200">
            <p className=" ">Dates</p>
            <p className="">Venues</p>
          </div>
          {allTickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`flex justify-between items-center py-4 border-b border-gray-200 pr-4 cursor-pointer 
            onClick={() => handleTicketClick(ticket)}
            ${selectedTicket.id === ticket.id ? "bg-blue-300/20" : "bg-neutral-900"}`}
              onClick={() => handleTicketClick(ticket)}
            >
              <div className={`flex gap-4`}>
                <p className="text-lg font-bold">{ticket.date}</p>
                <p className="text-lg">{ticket.venue}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-lg font-bold">{ticket.name}</p>
                <p className="text-lg">{ticket.description}</p>
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
