import Image from "next/image";
import Link from "next/link";

// TYPES
import type { Ticket } from "@/types/ticket";
// type AllTicketsProps = {
//   allTickets: TicketType; // This is now correctly using TicketType which is an object containing an array of tickets.
// };

// Context (HttpsOnly user login info)
import { useGlobalContext } from "@/context/GlobalContext";

// Data Fetch
const allTickets = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/tickets/admin`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const AdminPage = async () => {
  // Contextを発動 (ユーザーデータを取得)
  //  const { user }: any = useGlobalContext();
  const data = await allTickets();
  
  return (
<h1>
  test
</h1>
  );
};

export default AdminPage;
