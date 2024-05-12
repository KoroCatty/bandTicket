import connectDB from "@/config/db";
import Ticket from "@/models/Tickets"; // Model
import cloudinary from "@/config/cloudinary"; // Cloudinary

//! =========================================================
//! GET AllTickets /api/tickets
//! =========================================================
export const GET = async () => {
  try {
    // connect to the DB
    await connectDB();

    // DB から全てのチケットの数を取得
    const totalTickets = await Ticket.countDocuments({}); // ex) 5

    const tickets = await Ticket.find({});

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
