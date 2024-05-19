import connectDB from "@/config/db";
import Product from "@/models/Products";

//! =========================================================
//! GET all Products (Merch) /api/products
//! =========================================================
export const GET = async () => {
  try {
    await connectDB();

    const products = await Product.find({});

    if (!products) {
      return new Response("No products found", { status: 404 }); // Not Found
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error: any) {
    console.error("Error fetching products:", error?.message, error?.stack);
    return new Response("something went wrong", { status: 500 }); // Internal Server Error
  }
};
