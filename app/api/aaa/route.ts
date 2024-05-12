import connectDB from "@/config/db";
import Ticket from "@/models/Tickets"; // Model
import cloudinary from "@/config/cloudinary"; // Cloudinary

//! =========================================================
//! GET 10 Tickets /api/tickets
//! =========================================================
export const GET = async () => {
  try {
    // connect to the DB
    await connectDB();

    // pagination
    const page = 1; // ページの総数
    const pageSize = 10; //! 何個の物件を表示するか

    // skip some tickets
    const skip = (page - 1) * pageSize;

    // DB から全てのチケットの数を取得
    const totalTickets = await Ticket.countDocuments({}); // ex) 5

    //! get limited tickets
    // const tickets = await Ticket.find({});
    const tickets = await Ticket.find({}).skip(skip).limit(pageSize);

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
