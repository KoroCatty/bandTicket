import Stripe from "stripe";

import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request, response: Response) {
  // Get data from incoming request
  const { name, price, merchId, userId, ticketId, images, description } =
    await request.json();

  try {
    // checkout = 決済メソッド
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // カード払い
      metadata: {
        merchId: merchId || ticketId,
      },
      client_reference_id: userId,
      // user 情報
      line_items: [
        {
          price_data: {
            currency: "AUD",
            product_data: {
              name: name,
              images: [images[0]],
              description: description,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",

      // 成功時のリダイレクト先 (id で動的にする) CHECKOUT_SESSION_IDは stripe が自動で付与
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/merch/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}`,
    });
    // ページ遷移させるための URL を返す (フロントにJSON形式で返す )
    return NextResponse.json({ checkout_url: session.url });
  } catch (err: any) {
    return NextResponse.json(err.message);
  }
}
