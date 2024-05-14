import connectDB from "@/config/db";
import Ticket from "@/models/Tickets"; // Model

//* Stop Build error
export const dynamic = "force-dynamic";
//! =========================================================
//! GET AllTickets /api/tickets/admin
//! =========================================================
export const GET = async (request: any) => {
  try {
    // connect to the DB
    await connectDB();

    // pagination
    // nextUrl extends the native URL API with additional convenience methods
    const page = request.nextUrl.searchParams.get("page") || 1; // ページの総数
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 5; // 何個の物件を表示するか

    // skip some properties
    const skip = (page - 1) * pageSize;

    // DB から全てのチケットの数を取得
    const totalTickets = await Ticket.countDocuments({}); // ex) 5

    const tickets = await Ticket.find({}).skip(skip).limit(pageSize).sort({
      updatedAt: "desc",
    });

    // 上の２つを結合
    const result = {
      totalTickets,
      tickets,
    };

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 }); // Internal Server Error
  }
};
