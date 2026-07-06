"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactInquiry(data: {
  productName: string;
  quantity: number;
  unit: string;
  mobile: string;
  message?: string;
}) {
  const supabase = await createClient();
  
  // 1. Get logged-in user (optional)
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Try to find a matching product UUID by name
  let productId: string | null = null;
  if (data.productName) {
    const { data: products } = await supabase
      .from("products")
      .select("id")
      .ilike("name", `%${data.productName.trim()}%`)
      .limit(1);
    if (products && products.length > 0) {
      productId = products[0].id;
    }
  }

  // 3. Convert quantity to kg if needed (e.g. MT = kg * 1000)
  let qtyInKg = data.quantity;
  if (data.unit.includes("Metric Tons")) {
    qtyInKg = data.quantity * 1000;
  }

  // 4. Construct a descriptive message containing contact info
  const formattedMessage = `
[Product/Service: ${data.productName}]
[Mobile: ${data.mobile}]
[Unit Selected: ${data.unit}]
[Quantity: ${data.quantity}]
${data.message ? `[Message: ${data.message}]` : ""}
`.trim();

  // 5. Insert into inquiries table
  const { error } = await supabase.from("inquiries").insert({
    user_id: user?.id || null,
    product_id: productId,
    requested_kg: qtyInKg,
    destination_country: "India", // Default or parsed from message
    message: formattedMessage,
    status: "pending"
  });

  if (error) {
    console.error("Error submitting contact inquiry:", error);
    return { error: "Failed to submit. Please try again." };
  }

  return { success: true };
}
