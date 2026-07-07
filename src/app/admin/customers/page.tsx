import { createClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/admin/StatusBadge";
import RoleToggleButton from "@/components/admin/RoleToggleButton";

export const metadata = { title: "Customers | Admin – SGlobalExporter" };

export default async function AdminCustomersPage() {
  const supabase = await createClient();
  const [profilesResult, allowedUsersResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("allowed_users")
      .select("user_id")
      .eq("role", "admin")
      .eq("is_active", true)
  ]);

  if (profilesResult.error) {
    console.error("Error fetching profiles:", profilesResult.error.message);
  }
  if (allowedUsersResult.error) {
    console.error("Error fetching allowed users:", allowedUsersResult.error.message);
  }

  const allowedUserIds = new Set((allowedUsersResult.data || []).map((u: any) => u.user_id));
  const profiles = (profilesResult.data || []).map((p: any) => ({
    ...p,
    role: allowedUserIds.has(p.id) ? "admin" : "customer"
  }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal">Customers</h1>
        <p className="text-stone-500 mt-1">{profiles?.length ?? 0} registered users</p>
      </div>      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                <th className="text-left px-6 py-3 text-stone-600 font-bold">User</th>
                <th className="text-left px-4 py-3 text-stone-600 font-bold">Company</th>
                <th className="text-left px-4 py-3 text-stone-600 font-bold">Phone</th>
                <th className="text-left px-4 py-3 text-stone-600 font-bold">Billing Address</th>
                <th className="text-center px-4 py-3 text-stone-600 font-bold">Role</th>
                <th className="text-center px-4 py-3 text-stone-600 font-bold">Joined</th>
                <th className="text-center px-4 py-3 text-stone-500 font-bold">Promote</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {profiles && profiles.length > 0 ? (
                profiles.map((profile: any) => (
                  <tr key={profile.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-sm shrink-0">
                          {(profile.full_name ?? "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">{profile.full_name ?? "—"}</p>
                          {profile.email && (
                            <p className="text-xs text-stone-550 font-normal">{profile.email}</p>
                          )}
                          <p className="text-xs text-stone-400 font-mono mt-0.5">{profile.id.slice(0, 8)}…</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-stone-600">{profile.company_name ?? "—"}</td>
                    <td className="px-4 py-4 text-stone-600">{profile.phone_number ?? "—"}</td>
                    <td className="px-4 py-4 max-w-[180px]">
                      <p className="text-xs text-stone-600 truncate">{profile.billing_address ?? "—"}</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={profile.role ?? "customer"} />
                    </td>
                    <td className="px-4 py-4 text-center text-xs text-stone-400">
                      {new Date(profile.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <RoleToggleButton
                        profileId={profile.id}
                        fullName={profile.full_name}
                        currentRole={profile.role}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-stone-400">
                    No customers registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {profiles && profiles.length > 0 ? (
          profiles.map((profile: any) => (
            <div key={profile.id} className="bg-white p-5 rounded-2xl border border-stone-100 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-50">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-sm shrink-0">
                  {(profile.full_name ?? "?")[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-charcoal truncate">{profile.full_name ?? "—"}</p>
                  {profile.email && (
                    <p className="text-xs text-stone-500 truncate">{profile.email}</p>
                  )}
                  <p className="text-[10px] text-stone-400 font-mono mt-0.5">{profile.id.slice(0, 8)}…</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                <div>
                  <p className="text-charcoal font-bold uppercase tracking-wider text-[10px]">Company</p>
                  <p className="text-stone-700 font-normal mt-0.5 truncate">{profile.company_name ?? "—"}</p>
                </div>
                <div>
                  <p className="text-charcoal font-bold uppercase tracking-wider text-[10px]">Phone</p>
                  <p className="text-stone-700 font-normal mt-0.5">{profile.phone_number ?? "—"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-charcoal font-bold uppercase tracking-wider text-[10px]">Billing Address</p>
                  <p className="text-stone-700 font-normal mt-0.5 whitespace-pre-wrap">{profile.billing_address ?? "—"}</p>
                </div>
                <div>
                  <p className="text-charcoal font-bold uppercase tracking-wider text-[10px]">Role</p>
                  <div className="mt-1">
                    <StatusBadge status={profile.role ?? "customer"} />
                  </div>
                </div>
                <div>
                  <p className="text-charcoal font-bold uppercase tracking-wider text-[10px]">Joined</p>
                  <p className="text-stone-700 font-normal mt-1">{new Date(profile.created_at).toLocaleDateString("en-IN")}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-50 flex justify-end">
                <RoleToggleButton
                  profileId={profile.id}
                  fullName={profile.full_name}
                  currentRole={profile.role}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-xs border border-stone-100 py-12 text-center text-stone-400 text-sm">
            No customers registered yet.
          </div>
        )}
      </div>
    </div>
  );
}
