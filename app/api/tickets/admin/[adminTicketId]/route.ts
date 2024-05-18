// Model
import Ticket from "@/models/Tickets";
// DB connection
import connectDB from "@/config/db";
type ParamsType = {
  adminTicketId: string;
};
//* ===========================================================
//* GET /api/tickets/admin/:id
//* ===========================================================
export const GET = async (req: any, { params }: { params: ParamsType }) => {
  try {
    await connectDB();
    // console.log(params.adminTicketId); // フォルダ名に ID が含まれている

    // URL と同じ ID の ticket をDBから取得
    const ticket = await Ticket.findById(params.adminTicketId);

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

//! ===========================================================
//! DELETE /api/tickets/admin/:id
//! ===========================================================
export const DELETE = async (req: any, { params }: { params: ParamsType }) => {
  try {
    await connectDB();

    const ticketId = params.adminTicketId;

    // URL と同じ ID の ticket をDBから取得
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return new Response("Ticket not found", { status: 404 });
    }

    await ticket.deleteOne(); //! delete Ticket

    // 取得したデータをフロントに返す
    return new Response("Ticket deleted", { status: 200 }); // 200: OK
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

//* ===========================================================
//* UPDATE /api/tickets/admin/:id
//* ===========================================================
export const PUT = async (
  req: any,
  { params }: { params: { adminTicketId: string } },
) => {
  try {
    await connectDB();
    // Params ID
    const { adminTicketId } = params;
    console.log("id:", adminTicketId);

    // フォームデータを格納
    const formData = await req.formData();

    // GET ticket from DB thorough model to update
    const existingTicket = await Ticket.findById(adminTicketId);

    if (!existingTicket) {
      return new Response("Ticket not found", { status: 404 });
    }

    // Create TicketData for DB (各フォームの attribute から取得)
    const ticketData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      status: formData.get("status"),
      date: formData.get("date"),
      venue: formData.get("venue"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        postcode: formData.get("location.postcode"),
      },
    };

    // UPDATE (DBに保存された ticket のデータを更新)
    const updatedTicket = await Ticket.findByIdAndUpdate(
      adminTicketId,
      ticketData,
    );

    // フロントに成功メッセージを返す
    return new Response(JSON.stringify(updatedTicket), { status: 200 });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return new Response("Something went wrong", { status: 500 }); // Internal Server Error
  }
};
