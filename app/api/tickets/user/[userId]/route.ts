// Model
import Ticket from "@/models/Tickets";

// DB connection
import connectDB from "@/config/db";

type Params = {
  userId: string;
};

//! =========================================================
//! GET All tickets data that connected to the specific user
//! /api/tickets/user/:userId
//! =========================================================
export const GET = async (request: any, { params }: { params: Params }) => {
  try {
    // console.log("Headers:", request.headers); // Log all headers
    // console.log("Cookies:", request.cookies._parsed); // Log all cookies

    // Map オブジェクトから 'BandTicketsJWT'を取得 (Mapのgetが必要)
    const bandTicketsJWT = request.cookies.get("BandTicketsJWT") || "";

    // connect to the DB
    await connectDB();

    // フォルダ名と同じ名前の params を取得
    const userId = params.userId || bandTicketsJWT;

    if (!userId) {
      return new Response("User ID is required", { status: 400 }); // Bad Request
    }

    //! Params URL(UserのID) と一致する全ての tickets の情報をDBから取得(Relationship)
    const tickets = await Ticket.find({ userId: userId });

    return new Response(JSON.stringify(tickets), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 }); // Internal Server Error
  }
};
