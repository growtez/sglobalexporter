import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { amount, currency = "INR" } = await req.json();

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || !key_secret) {
      // Mock mode for when keys are not provided
      console.warn("Razorpay keys missing. Simulating order creation for MVP.");
      return NextResponse.json({
        id: `mock_order_${Math.random().toString(36).substr(2, 9)}`,
        currency,
        amount,
        isMock: true,
      });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: amount * 100, // Razorpay works in smallest currency unit (paise)
      currency,
      receipt: `rcpt_${Math.random().toString(36).substr(2, 9)}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
