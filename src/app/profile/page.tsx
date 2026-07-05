import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/auth/actions";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/auth/login");
  }

  // Fetch full profile details
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-serif font-bold text-forest">My Profile</h1>
        <form action={logout}>
          <Button variant="outline" type="submit">Log Out</Button>
        </form>
      </div>

      <div className="bg-white border border-stone-200 p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm uppercase tracking-widest text-stone-500 font-medium mb-1">Full Name</h3>
            <p className="text-lg text-charcoal">{profile?.full_name || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest text-stone-500 font-medium mb-1">Email Address</h3>
            <p className="text-lg text-charcoal">{user.email}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest text-stone-500 font-medium mb-1">Company</h3>
            <p className="text-lg text-charcoal">{profile?.company_name || "N/A"}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest text-stone-500 font-medium mb-1">Role</h3>
            <p className="text-lg text-charcoal capitalize">{profile?.role || "Customer"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
