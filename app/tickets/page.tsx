import SearchForm from "@/components/common/SearchForm";
import AllTickets from "@/components/features/Tickets/AllTickets";

// Data Fetch
const allTickets = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets`, {
    next: { revalidate: 3600 }, // 1 hours
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};

const TicketsPage = async () => {
  const data = await allTickets();
  return (
    <>
      <SearchForm />
      <AllTickets allTickets={data} />
    </>
  );
};

export default TicketsPage;
