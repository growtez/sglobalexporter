"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitInquiry(data: {
  productId?: string;
  requestedKg: number;
  destinationCountry: string;
  message?: string;
}) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "You must be logged in to request a quote." };
  }

  const { error } = await supabase.from("inquiries").insert({
    user_id: user.id,
    product_id: data.productId || null,
    requested_kg: data.requestedKg,
    destination_country: data.destinationCountry,
    message: data.message,
    status: 'pending'
  });

  if (error) {
    console.error("Error submitting inquiry:", error);
    return { error: "Failed to submit inquiry. Please try again later." };
  }

  return { success: true };
}
