import Link from "next/link";

const allTickets = [
  {
    id: 1,
    userId: 1,
    name: "Rock @Yamava Theater",
    description: "Girl in Red",
    location: {
      street: "Whiteman St & Clarendon St",
      city: "Melbourne",
      state: "VIC",
      postcode: "3006",
    },
    price: 100,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966930/propertyFinderNext/fzlt3vwybbvoan9hjs6e.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966932/propertyFinderNext/qhj5i3gdkykas1p8ve9w.jpg",
    ],
    status: "active",
    date: "2024-08-13",
    venue: "Yamava Theater",
  },
  {
    id: 2,
    userId: 2,
    name: "Rock @Yamava Theater",
    description: "Girl in Red",
    location: {
      street: "ST Kilda Rd & Flinders St",
      city: "Melbourne",
      state: "VIC",
      postcode: "3006",
    },
    price: 100,
    images: [
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966934/propertyFinderNext/auogi7pg2u7tt6up9d17.jpg",
      "https://res.cloudinary.com/duo03b1kn/image/upload/v1711966936/propertyFinderNext/qgm9xv4vtgspkry5hzcd.jpg",
    ],
    status: "active",
    date: "2024-10-13",
    venue: "Yamava Theater",
  },
];

const Tickets = () => {
  return (
    <>
      <section className="my-section-lg max-w-[860px] mx-auto max-[480px]:my-section-sm px-10 max-[480px]:px-1">
        <div className="relative text-[7rem] max-[1000px]:text-[5.5rem]  max-[768px]:text-[5rem] max-[650px]:text-[4rem] max-[480px]:text-[3rem]">
          <h2 className="text-center mb-6  font-bold leading-[1.2]">EVENTS</h2>
          <span className=" absolute top-[-30%] left-[10%] opacity-10 mb-6 font-bold leading-[1.2] max-[1000px]:left-[20%] max-[768px]:left-[10%] max-[480px]:left-[10%]">
            EVENTS
          </span>
        </div>

        <div className="">
          <div className="flex gap-20 pb-4 border-b-2 border-gray-200">
            <p className=" ">Dates</p>
            <p className="">Venues</p>
          </div>

          {/*  */}
          {allTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="py-8 flex gap-10 border-b-2 border-gray-200 max-[480px]:flex-col max-[480px]:gap-4"
            >
              <p className="">{ticket.date}</p>
              <div className="">
                <p className="">{ticket.venue}</p>
                <p className="">
                  {ticket.location.street}, {ticket.location.city},{" "}
                  {ticket.location.state}, {ticket.location.postcode}
                </p>
              </div>
              <Link
                href="/ticket/details"
                className="bg-AccentBg ml-auto px-4 py-2 hover:bg-AccentBg/80 transition-all duration-300 max-[480px]:mr-auto max-[480px]:ml-0"
              >
                Details
              </Link>
            </div>
          ))}

          {/* Button */}
          <Link
            href="/tickets"
            className="bg-AccentBg text-xl text-white py-6 mt-10 block text-center tracking-wide hover:bg-AccentBg/80 hover:scale-105 transition-all duration-300 max-[480px]:w-[70%] max-[480px]:mx-auto max-[480px]:py-4"
          >
            SHOW ALL TICKETS
          </Link>
        </div>
      </section>
    </>
  );
};

export default Tickets;
