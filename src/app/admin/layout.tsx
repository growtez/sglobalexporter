import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

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
    <div className="flex min-h-screen bg-[#F0F0EE]">
      <AdminSidebar adminName={profile.full_name ?? user.email ?? "Admin"} />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
