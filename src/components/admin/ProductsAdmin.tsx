"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, LayoutGrid, List } from "lucide-react";
import { toggleProductActive } from "@/app/admin/actions";

interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  origin?: string | null;
  category?: string | null;
  price_per_kg: number;
  min_order_kg?: number | null;
  stock_kg: number;
  image_url?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ProductsAdminProps {
  initialProducts: Product[];
}

export default function ProductsAdmin({ initialProducts }: ProductsAdminProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Sync state with server-updated props
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const handleToggle = async (id: string, currentActive: boolean) => {
    if (togglingId) return;
    setTogglingId(id);

    // Optimistically update status
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_active: !currentActive } : p))
    );

    try {
      const res = await toggleProductActive(id, currentActive);
      if (res && "error" in res && res.error) {
        // Revert on error
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, is_active: currentActive } : p))
        );
        alert("Failed to toggle status: " + res.error);
      }
    } catch (err: any) {
      // Revert on error
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, is_active: currentActive } : p))
      );
      alert("An error occurred: " + (err?.message || "Unknown error"));
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-charcoal">Products</h1>
          <p className="text-stone-500 mt-1">{products.length} total products</p>
        </div>
        <div className="flex items-center gap-3">
          {/* View Toggle Buttons */}
          <div className="flex items-center border border-stone-200 bg-stone-50 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setViewMode("table")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white text-forest shadow-xs font-semibold"
                  : "text-stone-400 hover:text-stone-700"
              }`}
              title="Table View"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-forest shadow-xs font-semibold"
                  : "text-stone-400 hover:text-stone-700"
              }`}
              title="Grid View"
            >
              <LayoutGrid size={18} />
            </button>
          </div>

          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 bg-forest text-cream px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-forest/90 transition-colors shadow-xs"
          >
            <Plus size={16} />
            Add Product
          </Link>
        </div>
      </div>

      {viewMode === "table" ? (
        <div className="bg-white rounded-2xl shadow-xs border border-stone-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-100">
                  <th className="text-left px-6 py-3.5 text-stone-500 font-semibold tracking-wide">Name</th>
                  <th className="text-left px-4 py-3.5 text-stone-500 font-semibold tracking-wide">Category</th>
                  <th className="text-left px-4 py-3.5 text-stone-500 font-semibold tracking-wide">Origin</th>
                  <th className="text-right px-4 py-3.5 text-stone-500 font-semibold tracking-wide">Price/kg</th>
                  <th className="text-right px-4 py-3.5 text-stone-500 font-semibold tracking-wide">Stock (kg)</th>
                  <th className="text-center px-6 py-3.5 text-stone-500 font-semibold tracking-wide">In Stock</th>
                  <th className="text-center px-6 py-3.5 text-stone-500 font-semibold tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {products.length > 0 ? (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/30 transition-colors">
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-3.5">
                          {p.image_url && (
                            <img
                              src={p.image_url.split(",")[0]}
                              alt={p.name}
                              className="w-10 h-10 rounded-xl object-cover bg-stone-100 border border-stone-100/50"
                            />
                          )}
                          <span className="font-semibold text-charcoal text-stone-900">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4.5 text-stone-600 font-medium">{p.category ?? "—"}</td>
                      <td className="px-4 py-4.5 text-stone-600 font-medium">{p.origin ?? "—"}</td>
                      <td className="px-4 py-4.5 text-right font-semibold text-charcoal">
                        ₹{Number(p.price_per_kg).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-4.5 text-right text-stone-600 font-medium">{p.stock_kg}</td>
                      <td className="px-6 py-4.5 text-center">
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleToggle(p.id, p.is_active)}
                            disabled={togglingId === p.id}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 ${
                              p.is_active ? "bg-forest" : "bg-stone-200"
                            } ${togglingId === p.id ? "opacity-75 cursor-wait" : ""}`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                                p.is_active ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 text-center">
                        <div className="flex items-center justify-center">
                          <Link
                            href={`/admin/products/${p.id}/edit`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 bg-stone-50 hover:bg-forest/5 hover:text-forest hover:border-forest/10 transition-colors border border-stone-100"
                            title="Edit Product"
                          >
                            <Pencil size={12} />
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-stone-400">
                      No products yet.{" "}
                      <Link href="/admin/products/new" className="text-forest underline font-medium">
                        Add your first product.
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-stone-100 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 group"
                >
                  {/* Product Image & Category Badge */}
                  <div className="relative aspect-video w-full bg-stone-50 overflow-hidden border-b border-stone-50">
                    {p.image_url ? (
                      <img
                        src={p.image_url.split(",")[0]}
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-400 font-medium text-xs">
                        No Image
                      </div>
                    )}
                    {p.category && (
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-stone-850 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-stone-100 shadow-xs uppercase tracking-wider">
                        {p.category}
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-charcoal text-base mb-1 line-clamp-1 group-hover:text-forest transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-medium mb-4">{p.origin || "No origin specified"}</p>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 gap-4 border-t border-stone-50 pt-4 mb-5 text-xs">
                      <div>
                        <span className="text-stone-400 block mb-0.5 font-medium">Price/kg</span>
                        <span className="font-bold text-stone-900 text-sm">
                          ₹{Number(p.price_per_kg).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div>
                        <span className="text-stone-400 block mb-0.5 font-medium">Stock</span>
                        <span className="font-bold text-stone-900 text-sm">{p.stock_kg} kg</span>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-auto pt-4 border-t border-stone-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500 font-semibold">In Stock</span>
                        <button
                          type="button"
                          onClick={() => handleToggle(p.id, p.is_active)}
                          disabled={togglingId === p.id}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 ${
                            p.is_active ? "bg-forest" : "bg-stone-200"
                          } ${togglingId === p.id ? "opacity-75 cursor-wait" : ""}`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              p.is_active ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>

                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-600 bg-stone-50 hover:bg-forest/5 hover:text-forest hover:border-forest/10 transition-colors border border-stone-100"
                      >
                        <Pencil size={12} />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-400 bg-white rounded-2xl border border-stone-100">
              No products yet.{" "}
              <Link href="/admin/products/new" className="text-forest underline font-medium">
                Add your first product.
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
