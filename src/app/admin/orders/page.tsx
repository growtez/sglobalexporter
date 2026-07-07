import { createClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/admin/StatusBadge";
import { updateOrderStatus } from "@/app/admin/actions";

export const metadata = { title: "Orders | Admin – SGlobalExporter" };

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, profiles(full_name, company_name), order_items(quantity_kg, price_at_time, products(name))")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal">Orders</h1>
        <p className="text-stone-500 mt-1">{orders?.length ?? 0} total orders</p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Order ID</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Customer</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Items</th>
                <th className="text-right px-4 py-3 text-stone-500 font-medium">Amount</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Ship To</th>
                <th className="text-center px-4 py-3 text-stone-500 font-medium">Status</th>
                <th className="text-center px-4 py-3 text-stone-500 font-medium">Date</th>
                <th className="text-center px-4 py-3 text-stone-500 font-medium">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {orders && orders.length > 0 ? (
                orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-stone-400">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-charcoal">{order.profiles?.full_name ?? "Guest"}</p>
                      <p className="text-xs text-stone-400">{order.profiles?.company_name ?? ""}</p>
                    </td>
                    <td className="px-4 py-4">
                      {order.order_items?.map((item: any, i: number) => (
                        <p key={i} className="text-xs text-stone-600">
                          {item.products?.name ?? "—"} × {item.quantity_kg}kg
                        </p>
                      ))}
                    </td>
                    <td className="px-4 py-4 text-right font-semibold text-charcoal">
                      {order.currency} {Number(order.total_amount).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-4 max-w-[140px]">
                      <p className="text-xs text-stone-600 truncate">{order.shipping_address}</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-4 text-center text-xs text-stone-400">
                      {new Date(order.created_at).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <form>
                        <select
                          name="status"
                          defaultValue={order.status}
                          className="border border-stone-200 rounded-lg text-xs px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30"
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          formAction={async (fd: FormData) => {
                            "use server";
                            await updateOrderStatus(order.id, fd.get("status") as string);
                          }}
                          className="ml-1.5 text-xs bg-forest text-cream px-2.5 py-1.5 rounded-lg hover:bg-forest/90 transition-colors"
                        >
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-stone-400">
                    No orders placed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {orders && orders.length > 0 ? (
          orders.map((order: any) => (
            <div key={order.id} className="bg-white p-5 rounded-2xl border border-stone-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-50">
                <div>
                  <p className="text-xs text-stone-400 font-mono">#{order.id.slice(0, 8)}</p>
                  <p className="font-semibold text-charcoal text-sm mt-0.5">{order.profiles?.full_name ?? "Guest"}</p>
                  {order.profiles?.company_name && (
                    <p className="text-[11px] text-stone-500 mt-0.5">{order.profiles.company_name}</p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-stone-400 text-[10px] uppercase tracking-wider">Date</p>
                  <p className="text-xs text-stone-700 font-medium mt-0.5">
                    {new Date(order.created_at).toLocaleDateString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-stone-400 font-medium uppercase tracking-wider text-[10px]">Items</p>
                  <div className="mt-1 space-y-1 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                    {order.order_items?.map((item: any, i: number) => (
                      <p key={i} className="text-stone-700">
                        {item.products?.name ?? "—"} <span className="text-stone-400">×</span> {item.quantity_kg}kg
                      </p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <p className="text-stone-400 font-medium uppercase tracking-wider text-[10px]">Amount</p>
                    <p className="font-bold text-forest mt-0.5">
                      {order.currency} {Number(order.total_amount).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div>
                    <p className="text-stone-400 font-medium uppercase tracking-wider text-[10px]">Ship To</p>
                    <p className="text-stone-700 mt-0.5 truncate" title={order.shipping_address}>
                      {order.shipping_address}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stone-50 items-center">
                  <div>
                    <p className="text-stone-400 font-medium uppercase tracking-wider text-[10px] mb-1">Status</p>
                    <StatusBadge status={order.status} />
                  </div>
                  <div>
                    <p className="text-stone-400 font-medium uppercase tracking-wider text-[10px] mb-1">Update Status</p>
                    <form className="flex items-center gap-1.5">
                      <select
                        name="status"
                        defaultValue={order.status}
                        className="border border-stone-200 rounded-lg text-xs px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-forest/30 flex-1 min-w-0"
                      >
                        {ORDER_STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        formAction={async (fd: FormData) => {
                          "use server";
                          await updateOrderStatus(order.id, fd.get("status") as string);
                        }}
                        className="text-xs bg-forest text-cream px-2.5 py-1.5 rounded-lg hover:bg-forest/90 transition-colors font-semibold shrink-0"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl shadow-xs border border-stone-100 py-12 text-center text-stone-400 text-sm">
            No orders placed yet.
          </div>
        )}
      </div>
    </div>
  );
}
