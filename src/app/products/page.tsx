import { createClient } from "@/lib/supabase/server";
import ProductListingClient from "@/components/product/ProductListingClient";

export const metadata = {
  title: "Products | SGlobalExporter",
  description: "Browse our premium selection of Assamese tea and rice.",
};

const fallbackProducts = [
  { id: "ashwagandha-tea", name: "Ashwagandha Tea", slug: "ashwagandha-tea", origin: "Assam, India", price_per_kg: 500, category: "Tea", image_url: "/images/products/ashwagandha-tea.webp" },
  { id: "black-tea", name: "Black Tea", slug: "black-tea", origin: "Assam, India", price_per_kg: 450, category: "Tea", image_url: "/images/products/black-tea.webp" },
  { id: "chamomile-tea", name: "Chamomile Tea", slug: "chamomile-tea", origin: "Assam, India", price_per_kg: 600, category: "Herbs", image_url: "/images/products/chamomile-tea.webp" },
  { id: "ctc-tea", name: "CTC Tea", slug: "ctc-tea", origin: "Assam, India", price_per_kg: 350, category: "Tea", image_url: "/images/products/ctc-tea.webp" },
  { id: "darjeeling-tea", name: "Darjeeling Tea", slug: "darjeeling-tea", origin: "Darjeeling, India", price_per_kg: 800, category: "Tea", image_url: "/images/products/darjeeling-tea.webp" },
  { id: "green-tea", name: "Green Tea", slug: "green-tea", origin: "Assam, India", price_per_kg: 400, category: "Tea", image_url: "/images/products/green-tea.webp" },
  { id: "jasmine-tea", name: "Jasmine Tea", slug: "jasmine-tea", origin: "Assam, India", price_per_kg: 550, category: "Tea", image_url: "/images/products/jasmine-tea.webp" },
  { id: "loose-tea", name: "Loose Tea", slug: "loose-tea", origin: "Assam, India", price_per_kg: 300, category: "Tea", image_url: "/images/products/loose-tea.webp" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; type?: string }>;
}) {
  const { category, type } = await searchParams;
  let products = null;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && supabaseUrl.startsWith('http')) {
      const supabase = await createClient();
      let query = supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .order("name", { ascending: true });

      if (category) {
        query = query.ilike("category", category);
      }

      if (type) {
        query = query.ilike("name", `%${type}%`);
      }

      const { data, error } = await query;
      
      if (!error && data) {
        products = data.map((p: any) => ({
          ...p,
          price_per_kg: Number(p.price_per_kg),
        }));
      } else {
        console.error("Error fetching products:", error);
      }
    }
  } catch (err) {
    console.error("Failed to fetch products from Supabase:", err);
  }

  // Fallback if not found in DB or DB not configured
  if (!products) {
    products = fallbackProducts;
    if (category) {
        products = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }
    if (type) {
        products = products.filter(p => p.name?.toLowerCase().includes(type.toLowerCase()));
    }
  }

  return (
    <div className="container mx-auto px-4 py-3 md:py-6 bg-stone-50/50">
      <ProductListingClient initialProducts={products} />
    </div>
  );
}
