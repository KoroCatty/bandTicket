import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// GET /api/cookie
export const GET = async (request: any) => {
  // console.log("Headers:", request.headers); // Log all headers
  // console.log("Cookies:", request.cookies._parsed); // Log all cookies
  if (!request.cookies || !request.cookies._parsed) {
    console.log("Cookies or _parsed is undefined");
    return new Response(null, { status: 401 });
  }

  //  ensure that cookies and _parsed are defined
  if (!request.cookies || !request.cookies._parsed) {
    console.log("Cookies or _parsed is undefined");
    return new Response(null, { status: 401 });
  }

  // Map オブジェクトから 'BandTicketsJWT'を取得 (Mapのgetが必要)
  const bandTicketsJWT = request.cookies.get("BandTicketsJWT");

  // クッキーがない場合、401を返す
  if (!bandTicketsJWT) {
    return new Response(null, { status: 401 });
  }

  // クッキーの値を取得
  const token = bandTicketsJWT ? bandTicketsJWT.value : null;

  if (!token) {
    return new Response(null, { status: 401 });
  }

  try {
    // payload はトークン内で実際に情報を保持する部分 (pull out userId from it)
    const payload = jwt.verify(token, JWT_SECRET!) as { userId: string };
    return new Response(JSON.stringify({ username: payload.userId }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return new Response(null, { status: 401 });
  }
};
