import { createClient } from "@/lib/supabase/server";
import StatsCard from "@/components/admin/StatsCard";
import { Package, ShoppingCart, MessageSquare, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: orderCount },
    { count: inquiryCount },
    { count: totalProfileCount },
    { count: adminCount },
    { data: recentOrders },
    { data: recentInquiries },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("allowed_users").select("*", { count: "exact", head: true }).eq("role", "admin").eq("is_active", true),
    supabase
      .from("orders")
      .select("id, total_amount, currency, status, created_at, profiles(full_name)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("inquiries")
      .select("id, destination_country, requested_kg, status, created_at, profiles(full_name), products(name)")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const customerCount = (totalProfileCount ?? 0) - (adminCount ?? 0);

  const stats = [
    {
      label: "Total Products",
      value: productCount ?? 0,
      icon: Package,
      color: "bg-forest",
      href: "/admin/products",
    },
    {
      label: "Total Orders",
      value: orderCount ?? 0,
      icon: ShoppingCart,
      color: "bg-amber-700",
      href: "/admin/orders",
    },
    {
      label: "B2B Inquiries",
      value: inquiryCount ?? 0,
      icon: MessageSquare,
      color: "bg-sky-700",
      href: "/admin/inquiries",
    },
    {
      label: "Customers",
      value: customerCount ?? 0,
      icon: Users,
      color: "bg-violet-700",
      href: "/admin/customers",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal">Dashboard</h1>
        <p className="text-stone-500 mt-1">Welcome back, here's what's happening today.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
            <ShoppingCart size={18} className="text-forest" />
            Recent Orders
          </h2>
          <div className="space-y-3">
            {recentOrders && recentOrders.length > 0 ? (
              recentOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      {(order.profiles as any)?.full_name ?? "Guest"}
                    </p>
                    <p className="text-xs text-stone-400">
                      {new Date(order.created_at).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-forest">
                      {order.currency} {Number(order.total_amount).toLocaleString("en-IN")}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                      ${order.status === "delivered" ? "bg-green-100 text-green-700" :
                        order.status === "shipped"   ? "bg-blue-100 text-blue-700" :
                        order.status === "cancelled" ? "bg-red-100 text-red-700" :
                        "bg-amber-100 text-amber-700"}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-400">No orders yet.</p>
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
          <h2 className="text-lg font-semibold text-charcoal mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-sky-600" />
            Recent Inquiries
          </h2>
          <div className="space-y-3">
            {recentInquiries && recentInquiries.length > 0 ? (
              recentInquiries.map((inq: any) => (
                <div
                  key={inq.id}
                  className="flex items-center justify-between py-2 border-b border-stone-50 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-charcoal">
                      {(inq.profiles as any)?.full_name ?? "Unknown"} — {(inq.products as any)?.name ?? "—"}
                    </p>
                    <p className="text-xs text-stone-400">
                      {inq.requested_kg} kg → {inq.destination_country}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                    ${inq.status === "closed"    ? "bg-stone-100 text-stone-600" :
                      inq.status === "quoted"    ? "bg-green-100 text-green-700" :
                      inq.status === "reviewed"  ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"}`}>
                    {inq.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-stone-400">No inquiries yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
