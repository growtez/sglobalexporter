import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/admin/StatusBadge";
import { toggleProductActive, deleteProduct } from "@/app/admin/actions";
import { Plus, Pencil } from "lucide-react";

export const metadata = { title: "Products | Admin – SGlobalExporter" };

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Products</h1>
          <p className="text-stone-500 mt-1">{products?.length ?? 0} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-forest/90 transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                <th className="text-left px-6 py-3 text-stone-500 font-medium">Name</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Category</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Origin</th>
                <th className="text-right px-4 py-3 text-stone-500 font-medium">Price/kg</th>
                <th className="text-right px-4 py-3 text-stone-500 font-medium">Stock (kg)</th>
                <th className="text-center px-4 py-3 text-stone-500 font-medium">Status</th>
                <th className="text-center px-4 py-3 text-stone-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {products && products.length > 0 ? (
                products.map((p: any) => (
                  <tr key={p.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.image_url && (
                          <img
                            src={p.image_url}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100"
                          />
                        )}
                        <div>
                          <p className="font-medium text-charcoal">{p.name}</p>
                          <p className="text-xs text-stone-400">/{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-stone-600">{p.category ?? "—"}</td>
                    <td className="px-4 py-4 text-stone-600">{p.origin ?? "—"}</td>
                    <td className="px-4 py-4 text-right font-medium text-charcoal">
                      ₹{Number(p.price_per_kg).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-4 text-right text-stone-600">{p.stock_kg}</td>
                    <td className="px-4 py-4 text-center">
                      <StatusBadge status={p.is_active ? "delivered" : "cancelled"} />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-2 rounded-lg text-stone-400 hover:text-forest hover:bg-forest/5 transition-colors"
                        >
                          <Pencil size={15} />
                        </Link>
                        <form
                          action={async () => {
                            "use server";
                            await toggleProductActive(p.id, p.is_active);
                          }}
                        >
                          <button
                            type="submit"
                            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors
                              ${p.is_active
                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                : "bg-green-50 text-green-700 hover:bg-green-100"
                              }`}
                          >
                            {p.is_active ? "Deactivate" : "Activate"}
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-stone-400">
                    No products yet. <Link href="/admin/products/new" className="text-forest underline">Add your first product.</Link>
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
