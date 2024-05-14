// Model
import Ticket from "@/models/Tickets";

// DB connection
import connectDB from "@/config/db";

// import { getSessionUser } from "@/utils/getSessionUser";

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

    // URL と同じ ID の property をDBから取得
    const ticket = await Ticket.findById(params.adminTicketId);

    if (!ticket) {
      return new Response("Property not found", { status: 404 });
    }

    // 取得したデータをフロントに返す
    return new Response(JSON.stringify(ticket), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong", { status: 500 });
  }
};

//! ===========================================================
//! DELETE /api/properties/:id
//! ===========================================================
// export const DELETE = async (req: any, { params }: { params: ParamsType }) => {
//   try {
//     await connectDB();

//     const propertyId = params.id;

//     // ログイン中のユーザー情報をsessionから取得
//     const sessionUser = await getSessionUser();

//     // check for session
//     if (!sessionUser || !sessionUser.userId) {
//       return new Response("User Id is required", { status: 401 }); // 401: Unauthorized
//     }

//     const { userId } = sessionUser; // destructure userId

//     // URL と同じ ID の property をDBから取得
//     const property = await Property.findById(propertyId);

//     if (!property) {
//       return new Response("Property not found", { status: 404 });
//     }

//     // verify ownership of the property (DBのownerとsessionのuserIdを比較)
//     if (property.owner.toString() !== userId) {
//       return new Response("Unauthorized", { status: 401 }); // 401: Unauthorized
//     }

//     await property.deleteOne(); //! delete property

//     // 取得したデータをフロントに返す
//     return new Response("Property deleted", { status: 200 }); // 200: OK
//   } catch (error) {
//     console.log(error);
//     return new Response("something went wrong", { status: 500 });
//   }
// };

//* ===========================================================
//* UPDATE /api/tickets/admin/:id
//* ===========================================================
export const PUT = async (
  req: any,
  { params }: { params: { adminTicketId: string } },
) => {
  try {
    await connectDB();

    // セッションからユーザー情報を取得 (userオブジェクトとuserIdを取得)
    // const sessionUser = await getSessionUser();

    // セッションが存在しない場合は、エラーを返す (userIdはgetSessionUser.tsで追加したもの)
    // if (!sessionUser || !sessionUser.userId) {
    //   return new Response("User ID is required", { status: 401 });
    // }

    // Params ID
    const { adminTicketId } = params;
    console.log("id:", adminTicketId);

    // ユーザーIDを destructure して取得し、プロパティを add する時に owner として紐付ける
    // const userId = sessionUser.userId;

    // フォームデータを格納
    const formData = await req.formData();

    // GET property from DB thorough model to update
    const existingTicket = await Ticket.findById(adminTicketId);

    if (!existingTicket) {
      return new Response("Property not found", { status: 404 });
    }

    // Verify ownership
    // DB内の owner と sessionUser の userId を比較
    // if (existingTicket.owner.toString() !== userId) {
    //   return new Response("Unauthorised", { status: 401 }); // 401: Unauthorized
    // }

    // Create TicketData for DB (各フォームの attribute から取得)
    const ticketData = {
      // userId,
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

    // UPDATE (DBに保存された property のデータを更新)
    const updatedProperty = await Ticket.findByIdAndUpdate(
      adminTicketId,
      ticketData,
    );

    // フロントに成功メッセージを返す
    return new Response(JSON.stringify(updatedProperty), { status: 200 }); // 200: OK
  } catch (error) {
    return new Response("something went wrong", { status: 500 }); // Internal Server Error
  }
};
