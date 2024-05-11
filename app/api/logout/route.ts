// ログアウトのPOSTリクエストが来た時に、BandTicketsJWT のCookieを削除するようにブラウザに指示
export const POST = async (request: any) => {
  try {
    // JWT トークンを無効化するために Cookie を削除
    return new Response("Logged out successfully😊", {
      status: 200,
      headers: {
        // トークンを削除するための Cookie 設定。Max-Age を 0 に設定
        "Set-Cookie": `BandTicketsJWT=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`,
      },
    });
  } catch (error) {
    console.log("Failed to process logout request:", error);
    return new Response("Server error during logout😅", { status: 500 });
  }
};
