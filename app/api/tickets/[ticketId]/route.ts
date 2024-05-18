// Model
import Ticket from "@/models/Tickets";
// DB connection
import connectDB from "@/config/db";

type ParamsType = {
  ticketId: string;
};

//* ===========================================================
//* GET /api/tickets/:id
//* ===========================================================
export const GET = async (req: any, { params }: { params: ParamsType }) => {
  try {
    await connectDB();
    // console.log(params.ticketId); // URL から取得した ID (ticketId

    // URL と同じ ID の ticket をDBから取得
    const ticket = await Ticket.findById(params.ticketId);

    if (!ticket) {
      return new Response("Ticket not found", { status: 404 });
    }

    // 取得したデータをフロントに返す
    return new Response(JSON.stringify(ticket), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};
