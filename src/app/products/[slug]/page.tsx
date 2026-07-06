import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductDetailClient from "@/components/product/ProductDetailClient";

// Dummy data for when Supabase is not configured
const fallbackProducts = [
  { name: "Ashwagandha Tea", img: "/images/products/ashwagandha-tea.webp" },
  { name: "Black Tea", img: "/images/products/black-tea.webp" },
  { name: "Chamomile Tea", img: "/images/products/chamomile-tea.webp" },
  { name: "CTC Tea", img: "/images/products/ctc-tea.webp" },
  { name: "Darjeeling Tea", img: "/images/products/darjeeling-tea.webp" },
  { name: "Green Tea", img: "/images/products/green-tea.webp" },
  { name: "Jasmine Tea", img: "/images/products/jasmine-tea.webp" },
  { name: "Loose Tea", img: "/images/products/loose-tea.webp" },
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let product = null;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && supabaseUrl.startsWith('http')) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .single();
      
      if (!error && data) {
        product = data;
      }
    }
  } catch (err) {
    console.error("Failed to fetch product from Supabase:", err);
  }

  // Fallback if not found in DB or DB not configured
  if (!product) {
    const fallbackMatch = fallbackProducts.find(
      (p) => p.name.toLowerCase().replace(/\s+/g, "-") === slug
    );
    
    if (fallbackMatch) {
      product = {
        id: slug,
        slug: slug,
        name: fallbackMatch.name,
        price_per_kg: 500,
        image_url: fallbackMatch.img,
        description: "Premium quality heritage product sourced directly from Assam. Perfect for connoisseurs and bulk buyers alike.",
        min_order_kg: 10,
        stock_kg: 100,
        origin: "Assam, India",
        category: "Premium Tea",
        grade: "BOPF / BP"
      };
    }
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
