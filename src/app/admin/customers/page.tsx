import { createClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/admin/StatusBadge";
import { updateCustomerRole } from "@/app/admin/actions";

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
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                <th className="text-left px-6 py-3 text-stone-500 font-medium">User</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Company</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Phone</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Billing Address</th>
                <th className="text-center px-4 py-3 text-stone-500 font-medium">Role</th>
                <th className="text-center px-4 py-3 text-stone-500 font-medium">Joined</th>
                <th className="text-center px-4 py-3 text-stone-500 font-medium">Promote</th>
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
                          <p className="text-xs text-stone-400 font-mono">{profile.id.slice(0, 8)}…</p>
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
                      {profile.role !== "admin" ? (
                        <form>
                          <button
                            type="submit"
                            formAction={async () => {
                              "use server";
                              await updateCustomerRole(profile.id, "admin");
                            }}
                            className="text-xs bg-[#1A3622]/10 text-forest px-3 py-1.5 rounded-lg hover:bg-[#1A3622]/20 transition-colors font-medium"
                          >
                            Make Admin
                          </button>
                        </form>
                      ) : (
                        <form>
                          <button
                            type="submit"
                            formAction={async () => {
                              "use server";
                              await updateCustomerRole(profile.id, "customer");
                            }}
                            className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors font-medium"
                          >
                            Revoke Admin
                          </button>
                        </form>
                      )}
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
    </div>
  );
}
