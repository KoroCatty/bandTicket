"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 最初のページロード時ではなく、必要になった時点でロードすることを可能にする
import dynamic from "next/dynamic";

// Map コンポーネントはクライアントサイドでのみレンダリングされる (Prevent window is not defined error)
const Map = dynamic(() => import("@/components/common/Map"), { ssr: false });

// Ticket DB
const allTickets = [
  {
    id: 1,
    userId: 1,
    name: "Girl in Red",
    description: "Rock @Yamava Theater ",
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
  {
    id: 4,
    userId: 4,
    name: "Jazz Nights",
    description: "Smooth Jazz at the Eureka Tower",
    location: {
      street: "Riverside Quay",
      city: "Melbourne",
      state: "VIC",
      postcode: "3006",
    },
    price: 150,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966934/propertyFinderNext/eureka1.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966936/propertyFinderNext/eureka2.jpg",
    ],
    status: "active",
    date: "2024-09-20",
    venue: "Eureka Tower",
    isFeatured: true,
  },
  {
    id: 5,
    userId: 5,
    name: "Classical Music Gala",
    description: "Evening of classical music at the Royal Botanic Gardens",
    location: {
      street: "Birdwood Ave",
      city: "Melbourne",
      state: "VIC",
      postcode: "3004",
    },
    price: 200,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966934/propertyFinderNext/botanic1.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966936/propertyFinderNext/botanic2.jpg",
    ],
    status: "active",
    date: "2024-10-05",
    venue: "Royal Botanic Gardens",
    isFeatured: true,
  },
  {
    id: 6,
    userId: 6,
    name: "Indie Film Festival",
    description: "Showcase of indie films at ACMI",
    location: {
      street: "Flinders St",
      city: "Melbourne",
      state: "VIC",
      postcode: "3000",
    },
    price: 80,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966934/propertyFinderNext/acmi1.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966936/propertyFinderNext/acmi2.jpg",
    ],
    status: "active",
    date: "2024-11-15",
    venue: "ACMI",
    isFeatured: false,
  },
  {
    id: 7,
    userId: 7,
    name: "Comedy Night",
    description: "Laugh out loud with top comedians at the Comedy Theatre",
    location: {
      street: "Exhibition St",
      city: "Melbourne",
      state: "VIC",
      postcode: "3000",
    },
    price: 120,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966934/propertyFinderNext/comedy1.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966936/propertyFinderNext/comedy2.jpg",
    ],
    status: "active",
    date: "2024-12-10",
    venue: "Comedy Theatre",
    isFeatured: true,
  },
  {
    id: 8,
    userId: 8,
    name: "Art Exhibition Opening",
    description:
      "Modern art exhibition opening at the National Gallery of Victoria",
    location: {
      street: "St Kilda Rd",
      city: "Melbourne",
      state: "VIC",
      postcode: "3004",
    },
    price: 50,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966934/propertyFinderNext/ngv1.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966936/propertyFinderNext/ngv2.jpg",
    ],
    status: "active",
    date: "2024-09-25",
    venue: "National Gallery of Victoria",
    isFeatured: false,
  },

  {
    id: 9,
    userId: 9,
    name: "Art Exhibition Opening",
    description:
      "Modern art exhibition opening at the National Gallery of Victoria",
    location: {
      street: "St Kilda Rd",
      city: "Melbourne",
      state: "VIC",
      postcode: "3004",
    },
    price: 50,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966934/propertyFinderNext/ngv1.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966936/propertyFinderNext/ngv2.jpg",
    ],
    status: "active",
    date: "2024-09-25",
    venue: "National Gallery of Victoria",
    isFeatured: false,
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
    <section className="max-[1000px]:px-8 max-[480px]:px-4 ">
      <div className="gap-4 mt-4 justify-center absolute top-[0%] left-[3%] z-[-10] opacity-15 mb-4">
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
      <div className="w-[100%] my-[3rem] min-[1000px]:flex max-[1000px]:mt-[1rem] ">
        <div
          className="w-[60%] h-[600px] overflow-y-scroll overflow-x-hidden pl-[4rem] 
        max-[1000px]:w-[100%] max-[1000px]:pl-0 max-[480px]:h-[400px] "
        >
          <h1 className="text-[3rem] font-bold pb-4">All Tickets</h1>
          <div className="flex gap-20 pb-4 border-b-2 border-gray-200 ">
            <p className=" ">Dates</p>
            <p className="">Venues</p>
            <p className="">Name</p>
          </div>
          {allTickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`flex justify-between items-center py-4 border-b border-gray-200 pr-4 cursor-pointer 
              hover:scale-105 transition-all duration-300
            ${selectedTicket.id === ticket.id ? "bg-blue-300/20" : "bg-neutral-900"}`}
              onClick={() => handleTicketClick(ticket)}
            >
              <div className={`gap-4 min-[600px]:flex max-[600px]:pl-6`}>
                <p className="text-lg font-bold">{ticket.date}</p>
                <p className="text-lg">{ticket.venue}</p>
                <p className="text-lg font-bold">{ticket.name}</p>
              </div>
              <div className="flex gap-4">
                {/* <p className="text-lg">{ticket.description}</p> */}
                <Link
                  href={`/tickets/${ticket.id}`}
                  className="py-2 px-6 bg-blue-300 
                hover:scale-110 transition-all duration-300 hover:text-red-800"
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
