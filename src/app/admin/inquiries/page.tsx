import { createClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/admin/StatusBadge";
import { updateInquiryStatus } from "@/app/admin/actions";

export const metadata = { title: "Inquiries | Admin – SGlobalExporter" };

const INQUIRY_STATUSES = ["pending", "reviewed", "quoted", "closed"];

export default async function AdminInquiriesPage() {
  const supabase = await createClient();
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*, profiles(full_name, company_name, phone_number), products(name, category)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal">B2B Inquiries</h1>
        <p className="text-stone-500 mt-1">{inquiries?.length ?? 0} inquiries received</p>
      </div>

      <div className="space-y-4">
        {inquiries && inquiries.length > 0 ? (
          inquiries.map((inq: any) => (
            <div
              key={inq.id}
              className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Left: Customer + Product */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center text-forest font-bold text-sm">
                      {(inq.profiles?.full_name ?? "?")[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal">{inq.profiles?.full_name ?? "Unknown"}</p>
                      <p className="text-xs text-stone-400">{inq.profiles?.company_name ?? ""} · {inq.profiles?.phone_number ?? ""}</p>
                    </div>
                    <StatusBadge status={inq.status} />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-stone-400 text-xs mb-0.5">Product</p>
                      <p className="font-medium text-charcoal">{inq.products?.name ?? "—"}</p>
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs mb-0.5">Quantity</p>
                      <p className="font-medium text-charcoal">{inq.requested_kg} kg</p>
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs mb-0.5">Destination</p>
                      <p className="font-medium text-charcoal">{inq.destination_country}</p>
                    </div>
                    <div>
                      <p className="text-stone-400 text-xs mb-0.5">Date</p>
                      <p className="font-medium text-charcoal">
                        {new Date(inq.created_at).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {inq.message && (
                    <div className="mt-3 p-3 bg-stone-50 rounded-xl text-sm text-stone-600 italic border border-stone-100">
                      "{inq.message}"
                    </div>
                  )}
                </div>

                {/* Right: Status updater */}
                <div className="flex items-center gap-2 shrink-0">
                  <form className="flex items-center gap-2">
                    <select
                      name="status"
                      defaultValue={inq.status}
                      className="border border-stone-200 rounded-lg text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30"
                    >
                      {INQUIRY_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      formAction={async (fd: FormData) => {
                        "use server";
                        await updateInquiryStatus(inq.id, fd.get("status") as string);
                      }}
                      className="bg-forest text-cream px-4 py-2 rounded-lg text-sm font-medium hover:bg-forest/90 transition-colors"
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-stone-100 py-16 text-center text-stone-400">
            No inquiries received yet.
          </div>
        )}
      </div>
    </div>
  );
}
