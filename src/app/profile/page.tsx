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
    <div className="container mx-auto max-w-4xl px-4 py-12 md:py-20">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-serif font-bold text-forest">My Profile</h1>
        <form action={logout}>
          <Button variant="outline" type="submit">Log Out</Button>
        </form>
      </div>

      <ProfileForm profile={profile} userEmail={user.email || ""} />
    </div>
  );
}
