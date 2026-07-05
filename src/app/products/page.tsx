import { createClient } from "@/lib/supabase/server";
import ProductGrid from "@/components/product/ProductGrid";

export const metadata = {
  title: "Products | SGlobalExporter",
  description: "Browse our premium selection of Assamese tea and rice.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const supabase = await createClient();
  const { category } = await searchParams;

  let query = supabase.from("products").select("*").eq("is_active", true);

  if (category) {
    query = query.ilike("category", category);
  }

  const { data: products, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
  }

  const title = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection`
    : "All Products";

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">
          {title}
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl">
          Discover our curated selection of heritage products, sourced directly
          from the finest estates and farms in Assam.
        </p>
      </div>

      <ProductGrid products={products || []} />
    </div>
  );
}
