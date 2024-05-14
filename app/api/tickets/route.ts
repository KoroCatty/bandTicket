import connectDB from "@/config/db";
import Ticket from "@/models/Tickets"; // Model
import cloudinary from "@/config/cloudinary"; // Cloudinary
import sharp from "sharp"; // Image Processing

// ユーザー情報を取得する関数
import { getSessionUser } from "@/utils/getSessionUser";
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

//! =========================================================
//! ADD Ticket
//! POST /api/tickets
//! =========================================================
export const POST = async (req: any) => {
  const bandTicketsJWT = req.cookies?.get("BandTicketsJWT") || "";
  const token = bandTicketsJWT?.value ? bandTicketsJWT.value : "";
  console.log("token:", !!token);
  try {
    await connectDB();
    const sessionUser = ((await getSessionUser()) as { userId?: string }) || {};

    // tokenかsessionUserのどちらかが存在する場合にエラーを出さないように条件式を変更
    if (!token && !sessionUser) {
      console.error("No session user or token found.");
      return new Response("User ID or token is required", { status: 401 });
    }

    const userId = sessionUser.userId || "";
    console.log("nextAuth ID:", !!userId);
    // フォームデータを格納
    const formData = await req.formData();

    // 空の場合は、空の配列を返ってくるのでそのエラーを回避
    const images = formData
      .getAll("images")
      .filter((image: any) => image.name !== "");

    // Create PropertyData for DB (各フォームの attribute から取得)
    const ticketData = {
      userId: userId || formData.get("userId"),
      name: formData.get("name"),
      description: formData.get("description"),
      location: {
        street: formData.get("location.street"),
        city: formData.get("location.city"),
        state: formData.get("location.state"),
        postcode: formData.get("location.postcode"),
      },
      price: formData.get("price"),
      images: [] as string[],
      status: formData.get("status"),
      date: formData.get("date"),
      venue: formData.get("venue"),
      // isFeatured: formData.get("isFeatured"),
    };

    //?-----------------------------------------
    //? Upload images to Cloudinary
    //?-----------------------------------------
    // Cloudinaryにアップロードするための画像のURLを格納する配列を初期化
    const imageUploadPromises = [];

    // ファイル形式をチェック
    const isValidImageType = function (imageName: string) {
      // 受け入れられるファイルの拡張子を定義
      const validExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
      // ファイルの拡張子を取得
      const extension = imageName?.split(".").pop()?.toLowerCase() || "";
      // 拡張子が受け入れられるものかどうかをチェック
      return validExtensions.includes(extension);
    };

    // 送信された画像ファイルをループ処理
    for (const image of images) {
      //* 画像の名前からファイル形式が有効かどうかをチェック
      if (!isValidImageType(image.name)) {
        console.error("Invalid image type:", image.name);
        continue; // 問題なければスキップして次へ
      }

      // 画像データをArrayBufferとして取得 arrayBufferとは、バイナリデータを扱うためのオブジェクト
      const imageBuffer = await image.arrayBuffer();
      // ArrayBufferからUint8Arrayを作成し、その要素を配列に変換 (Uint8Arrayは8ビット符号なし整数値の配列)
      const imageArray = Array.from(new Uint8Array(imageBuffer));

      // 画像データの配列をBufferに変換 (BufferはNode.jsでバイナリデータを扱うためのクラス)
      const imageData = Buffer.from(imageArray);

      // 画像を圧縮
      const resizedImage = await sharp(imageData)
        .resize(1200, 675)
        .jpeg({ quality: 85 })
        .toBuffer();

      // BufferからBase64形式の文字列に変換
      const imageBase64 = resizedImage.toString("base64");

      // CloudinaryにBase64形式の画像データをアップロードし、結果を待つ
      // Web上で直接表示可能な形式（Data URL）に変換 (画像の内容が文字列として表現)
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "BandTicket", // Cloudinaryの特定のフォルダに保存
        },
      );
      // アップロードした画像のURLを配列に追加
      imageUploadPromises.push(result.secure_url);
    }

    // すべての画像がアップロードされるのを待つ
    const uploadedImages = await Promise.all(imageUploadPromises);

    // アップロードされた画像のURLをTicketDataオブジェクトに追加
    ticketData.images = uploadedImages;

    // DBに新しいチケット情報を保存
    const newTicket = new Ticket(ticketData);
    await newTicket.save();

    return new Response(JSON.stringify(ticketData), { status: 201 });
  } catch (error) {
    console.error("Failed to process request:", error);
    return new Response("something went wrong", { status: 500 });
  }
};
