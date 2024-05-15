import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// GET /api/cookie
export const GET = async (request: any) => {
  // console.log("Headers:", request.headers); // Log all headers
  // console.log("Cookies:", request.cookies._parsed); // Log all cookies

  // Map オブジェクトから 'BandTicketsJWT'を取得 (Mapのgetが必要)
  const bandTicketsJWT = request.cookies.get("BandTicketsJWT");

  // No content to send back
  if (!bandTicketsJWT) {
    return new Response(null, { status: 201 });
  }

  // httpOnly Cookie から トークン を取得
  const token = bandTicketsJWT.value;
  if (!token) {
    return new Response(null, { status: 401 });
  }

  try {
    // payload はトークン内で実際に情報を保持する部分 (pull out userId from it)
    const payload = jwt.verify(token, JWT_SECRET!) as {
      userId: string;
      username: string;
      email: string;
    };
    return new Response(
      JSON.stringify({
        userID: payload.userId,
        username: payload.username,
        email: payload.email,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return new Response(null, { status: 401 });
  }
};
