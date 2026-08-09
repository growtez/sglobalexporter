"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectPath = formData.get("redirect") as string;
  console.log("[SERVER_ACTION_LOGIN] Received redirectPath from form:", redirectPath);

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  if (authData.user) {
    const { data: adminData } = await supabase
      .from("allowed_users")
      .select("role")
      .eq("user_id", authData.user.id)
      .eq("role", "admin")
      .eq("is_active", true)
      .single();

    if (adminData) {
      revalidatePath("/", "layout");
      redirect("/admin");
    }
  }

  revalidatePath("/", "layout");
  if (redirectPath && redirectPath.trim() !== "") {
    redirect(redirectPath);
  } else {
    redirect("/profile");
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const companyName = formData.get("companyName") as string;
  const redirectPath = formData.get("redirect") as string;
  console.log("[SERVER_ACTION_SIGNUP] Received redirectPath from form:", redirectPath);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Insert into profiles if not using a db trigger
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").upsert({
      id: data.user.id,
      full_name: fullName,
      company_name: companyName,
      email: email,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError.message);
    }
  }

  revalidatePath("/", "layout");
  if (redirectPath && redirectPath.trim() !== "") {
    redirect(redirectPath);
  } else {
    redirect("/profile");
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/auth/login");
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not logged in" };
  }

  const fullName = formData.get("fullName") as string;
  const companyName = formData.get("companyName") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  const { error } = await supabase.from("profiles").update({
    full_name: fullName,
    company_name: companyName,
    phone_number: phone,
    billing_address: address,
  }).eq("id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/profile");
  return { success: true };
}
