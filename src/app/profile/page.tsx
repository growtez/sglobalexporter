import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/auth/actions";
import ProfileForm from "./ProfileForm";

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
    <div className="container mx-auto max-w-2xl px-4 py-6 md:py-10">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-forest">My Profile</h1>
        <form action={logout}>
          <Button variant="outline" size="sm" type="submit" className="h-8.5 text-xs">Log Out</Button>
        </form>
      </div>

      <ProfileForm profile={profile} userEmail={user.email || ""} />
    </div>
  );
}
