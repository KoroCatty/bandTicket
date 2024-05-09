//! Search Results を取得するための API ルートを作成

import connectDB from "@/config/db";
import Ticket from "@/models/Tickets"; // Model

//* Stop Build error
export const dynamic = "force-dynamic";
//! ===============================================
//! GET /api/tickets/search
//! request はフォームからの入力
//! ===============================================
export const GET = async (request: any) => {
  try {
    await connectDB();

    // get search params from query
    const { searchParams } = new URL(request.url); // URL オブジェクトを作成
    const location = searchParams.get("location"); // 入力されたクエリを取得
    const ticketStatus = searchParams.get("ticketStatus"); // 選択された ticketStatus を取得

    //! location 検索
    // locationを基に 部分一致検索 を行うための正規表現パターンを作成（大文字小文字を区別なし）
    const locationPattern = new RegExp(location || "", "i"); // case-insensitive

    // Match location pattern against DB fields
    // データベースの様々なフィールドに対して、作成したパターンで検索を行う
    // $or ticket コレクションの中の全ての filed に対して、locationPattern で検索を行う
    // Form で例えば、"Melbourne" と入力した場合、locationPattern は /Melbourne/i となる
    let query: any = {
      $or: [
        { name: locationPattern },
        { description: locationPattern },
        { "location.city": locationPattern },
        { "location.state": locationPattern },
        { "location.postcode": locationPattern },
        { "location.street": locationPattern },
      ],
    };

    //! Ticket Status 検索
    // ticketStatus が"All"以外の場合は、プロパティタイプに基づいてさらに絞り込みを行う
    if (ticketStatus && ticketStatus !== "All") {
      const statusPattern = new RegExp(ticketStatus, "i"); // case-insensitive
      query.status = statusPattern;
    }

    // 構築したクエリに基づいてデータベースからプロパティを検索し、結果を取得
    const tickets = await Ticket.find(query);

    return new Response(JSON.stringify(tickets), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("Something went wrong"), {
      status: 500,
    }); // 500 Internal Server Error
  }
};
