import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import AddToCartButton from "@/components/product/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const supabase = await createClient();
  const { slug } = await params;
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F9F9F8] border border-stone-200">
          <Image
            src={product.image_url || "/placeholder-tea.jpg"}
            alt={product.name}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-sm uppercase tracking-widest text-stone-500 font-medium mb-2 block">
              {product.origin} &bull; {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-forest mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-medium text-charcoal mb-6">
              ₹{product.price_per_kg} / kg
            </p>
            <div className="prose prose-stone text-stone-600">
              <p>{product.description || "Premium quality heritage product sourced directly from Assam. Perfect for connoisseurs and bulk buyers alike."}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-stone-200">
            <div>
              <span className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Minimum Order</span>
              <span className="font-medium text-charcoal">{product.min_order_kg} kg</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Availability</span>
              <span className="font-medium text-charcoal">{product.stock_kg > 0 ? 'In Stock' : 'On Demand'}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} />
            <Link href={`/b2b?product=${product.id}`} className="w-full sm:w-auto block">
              <Button size="lg" variant="outline" className="w-full">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
