import { createClient } from "@/lib/supabase/server";
import ProductsAdmin from "@/components/admin/ProductsAdmin";

export const metadata = { title: "Products | Admin – SGlobalExporter" };

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .order("name", { ascending: true });

  return <ProductsAdmin initialProducts={products || []} />;
}

