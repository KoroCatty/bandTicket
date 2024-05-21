import connectDB from "@/config/db";
import Product from "@/models/Products";
import { NextRequest } from "next/server";

//! =========================================================
//! GET 1 Product (Merch) /api/products/:id
//! =========================================================
export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } },
) => {
  try {
    await connectDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error: any) {
    console.log("Error fetching product:", error?.message, error?.stack);
    return new Response("something went wrong", { status: 500 });
  }
};
