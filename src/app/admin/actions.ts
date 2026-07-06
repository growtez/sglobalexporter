"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// ─── Auth guard helper ──────────────────────────────────────────────────────
async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: adminData } = await supabase
    .from("allowed_users")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .eq("is_active", true)
    .single();

  if (!adminData) redirect("/");
  return supabase;
}

// ─── Products ───────────────────────────────────────────────────────────────

export async function createProduct(formData: FormData) {
  const supabase = await requireAdmin();
  const payload = {
    name:          formData.get("name") as string,
    slug:          (formData.get("name") as string).toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    description:   formData.get("description") as string,
    origin:        formData.get("origin") as string,
    category:      formData.get("category") as string,
    price_per_kg:  parseFloat(formData.get("price_per_kg") as string),
    min_order_kg:  parseInt(formData.get("min_order_kg") as string, 10),
    stock_kg:      parseInt(formData.get("stock_kg") as string, 10),
    image_url:     formData.get("image_url") as string,
    is_active:     formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("products").insert(payload);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await requireAdmin();
  const payload = {
    name:          formData.get("name") as string,
    description:   formData.get("description") as string,
    origin:        formData.get("origin") as string,
    category:      formData.get("category") as string,
    price_per_kg:  parseFloat(formData.get("price_per_kg") as string),
    min_order_kg:  parseInt(formData.get("min_order_kg") as string, 10),
    stock_kg:      parseInt(formData.get("stock_kg") as string, 10),
    image_url:     formData.get("image_url") as string,
    is_active:     formData.get("is_active") === "true",
  };

  const { error } = await supabase.from("products").update(payload).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

export async function toggleProductActive(id: string, currentValue: boolean) {
  const supabase = await requireAdmin();
  const { error } = await supabase
    .from("products")
    .update({ is_active: !currentValue })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/products");
}

// ─── Orders ─────────────────────────────────────────────────────────────────

export async function updateOrderStatus(id: string, status: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/orders");
}

// ─── Inquiries ───────────────────────────────────────────────────────────────

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/inquiries");
}

// ─── Customers ───────────────────────────────────────────────────────────────

export async function updateCustomerRole(id: string, role: "customer" | "admin") {
  const supabase = await requireAdmin();
  let error;
  if (role === "admin") {
    const res = await supabase
      .from("allowed_users")
      .upsert({ user_id: id, role: "admin", is_active: true });
    error = res.error;
  } else {
    const res = await supabase
      .from("allowed_users")
      .delete()
      .eq("user_id", id);
    error = res.error;
  }
  if (error) return { error: error.message };
  revalidatePath("/admin/customers");
}
