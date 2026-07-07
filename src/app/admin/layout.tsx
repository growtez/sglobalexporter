import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Admin Panel | SGlobalExporter",
  description: "Manage products, orders, inquiries and customers.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: adminData } = await supabase
    .from("allowed_users")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .eq("is_active", true)
    .single();

  if (!adminData) {
    redirect("/");
  }

  return (
    <AdminLayoutClient adminName={profile?.full_name ?? user.email ?? "Admin"}>
      {children}
    </AdminLayoutClient>
  );
}
