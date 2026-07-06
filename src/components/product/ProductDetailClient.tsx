"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cartStore";
import {
  Star,
  ShoppingCart,
  MessageSquare,
  Shield,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Share2,
  Minus,
  Plus,
  Package,
  Award,
  Leaf,
  Globe2,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price_per_kg: number;
  image_url: string;
  description?: string;
  origin?: string;
  category?: string;
  min_order_kg?: number;
  stock_kg?: number;
  grade?: string;
}

const TRUST_BADGES = [
  { icon: Shield, label: "100% Authentic", sub: "Certified origin" },
  { icon: Truck, label: "Worldwide Shipping", sub: "Export ready" },
  { icon: RotateCcw, label: "Quality Guarantee", sub: "Or full refund" },
  { icon: Award, label: "Premium Grade", sub: "Lab tested" },
];

const SPECS = (product: Product) => {
  const name = product.name.toLowerCase();

  if (name.includes("premium bop")) {
    return [
      { label: "Min. Order (MOQ)", value: "500 Kilogram" },
      { label: "Cultivation Type", value: "Organic" },
      { label: "Feature", value: "Strong Aroma, Nice Fragrance, Health Conscious" },
      { label: "Packaging Size", value: "5-10kg" },
      { label: "Packaging Type", value: "Plastic Packet" },
      { label: "Shelf Life", value: "3 Months" },
      { label: "Part", value: "Leaf" },
      { label: "Country of Origin", value: "India" },
    ];
  }
  if (name.includes("loose tea")) {
    return [
      { label: "Min. Order (MOQ)", value: "500 Kilogram" },
      { label: "Cultivation Type", value: "Organic" },
      { label: "Processing Type", value: "CTC" },
      { label: "Form", value: "Granules" },
      { label: "Usage", value: "For Making Tea" },
      { label: "Packaging Type", value: "Plastic Packet" },
      { label: "Packaging Size", value: "5-10kg" },
      { label: "Shelf Life", value: "12 Months" },
      { label: "Purity", value: "100%" },
      { label: "Country of Origin", value: "India" },
    ];
  }
  if (name.includes("orthodox tea")) {
    return [
      { label: "Min. Order (MOQ)", value: "500 Kilogram" },
      { label: "Cultivation Type", value: "Organic" },
      { label: "Processing Type", value: "Raw" },
      { label: "Usage", value: "For Making Tea" },
      { label: "Grade Standard", value: "Herbal Grade" },
      { label: "Packaging Type", value: "Plastic Packet" },
      { label: "Packaging Size", value: "5-10kg" },
      { label: "Shelf Life", value: "3 Months" },
      { label: "Ingredients", value: "Herbal Ingredients" },
      { label: "Country of Origin", value: "India" },
      { label: "Tea Type", value: "Orthodox" },
    ];
  }
  if (name.includes("black tea")) {
    return [
      { label: "Min. Order (MOQ)", value: "500 Kilogram" },
      { label: "Cultivation Type", value: "Natural" },
      { label: "Processing Type", value: "Blended" },
      { label: "Form", value: "Granules" },
      { label: "Usage", value: "For Making Tea" },
      { label: "Certification", value: "FSSAI Certified" },
      { label: "Grade", value: "All Grades" },
      { label: "Packaging Type", value: "Plastic Packet" },
      { label: "Packaging Size", value: "5-10kg" },
      { label: "Shelf Life", value: "3 Months" },
      { label: "Country of Origin", value: "India" },
      { label: "Speciality", value: "Strong Aroma, Nice Fragrance" },
      { label: "Material", value: "Tea" },
      { label: "Brand Name", value: "SG" },
    ];
  }
  if (name.includes("ctc tea")) {
    return [
      { label: "Min. Order (MOQ)", value: "500 Kilogram" },
      { label: "Cultivation Type", value: "Organic" },
      { label: "Feature", value: "Strong Aroma, Nice Fragrance" },
      { label: "Packaging Type", value: "Plastic Packet" },
      { label: "Packaging Size", value: "5-10kg" },
      { label: "Shelf Life", value: "3 Months" },
      { label: "Country of Origin", value: "India" },
    ];
  }
  if (name.includes("pure assam tea") || name.includes("assam")) {
    return [
      { label: "Min. Order (MOQ)", value: "500 Kilogram" },
      { label: "Processing Type", value: "Raw" },
      { label: "Storage Condition", value: "Loose Tea" },
      { label: "Feature", value: "Strong Aroma, Nice Fragrance, Health Conscious" },
      { label: "Packaging Type", value: "Plastic Packet" },
      { label: "Packaging Size", value: "5-10kg" },
      { label: "Shelf Life", value: "3 Months" },
      { label: "Part", value: "Leaf" },
      { label: "Country of Origin", value: "India" },
    ];
  }
  
  // Default fallback
  return [
    { label: "Min. Order (MOQ)", value: "500 Kilogram" },
    { label: "Cultivation Type", value: "Organic" },
    { label: "Packaging Size", value: "5-10kg" },
    { label: "Packaging Type", value: "Plastic Packet" },
    { label: "Shelf Life", value: "3 Months" },
    { label: "Country of Origin", value: product.origin || "India" },
  ];
};

const FAQS = [
  {
    q: "What is the minimum order quantity?",
    a: "Our minimum order is typically 10 kg for most products. For bulk wholesale orders we offer tiered pricing — please contact us for a custom quote.",
  },
  {
    q: "Do you provide private label packaging?",
    a: "Yes, we offer full private label and OEM packaging services. You can customise the packaging, branding, and bag sizes as per your requirements.",
  },
  {
    q: "How long does shipping take?",
    a: "Domestic orders are dispatched within 2–3 business days. International export shipments take 10–20 days depending on the destination country.",
  },
  {
    q: "Is the product lab tested?",
    a: "All our products undergo multi-stage quality checks including pesticide residue testing, moisture analysis, and grade conformity checks before dispatch.",
  },
];

export default function ProductDetailClient({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [qty, setQty] = useState(product.min_order_kg || 10);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "faq">("description");

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price_per_kg: product.price_per_kg,
      quantity_kg: qty,
      image_url: product.image_url || "/placeholder-tea.jpg",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const totalPrice = (product.price_per_kg * qty).toLocaleString("en-IN");

  return (
    <div className="bg-stone-50 min-h-screen font-sans">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-100">
        <div className="container mx-auto px-4 md:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-stone-500">
            <Link href="/" className="hover:text-forest transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-forest transition-colors">Products</Link>
            <span>/</span>
            <span className="text-forest font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-6 max-w-7xl">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_320px] gap-6">

          {/* ── Left: Image Panel ── */}
          <div className="lg:sticky lg:top-[76px] self-start">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              <div className="relative aspect-square w-full">
                <Image
                  src={product.image_url || "/placeholder-tea.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="bg-forest text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow">
                    Premium Grade
                  </span>
                  {(product.stock_kg || 0) > 0 && (
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow">
                      In Stock
                    </span>
                  )}
                </div>
                {/* Share */}
                <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
                  <Share2 className="w-4 h-4 text-stone-500" />
                </button>
              </div>

              {/* Thumbnail strip (placeholder — same image 3x) */}
              <div className="flex gap-2 p-3 border-t border-stone-100">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${i === 1 ? "border-forest" : "border-stone-200 hover:border-stone-400"}`}
                  >
                    <Image
                      src={product.image_url || "/placeholder-tea.jpg"}
                      alt={`${product.name} view ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mini trust badges below image */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
                <div key={label} className="bg-white rounded-xl border border-stone-100 p-3 flex items-center gap-2.5 shadow-sm">
                  <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-forest leading-none">{label}</p>
                    <p className="text-[10px] text-stone-400 mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Center: Product Info ── */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
              {/* Category + Origin */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                  {product.category || "Premium Tea"}
                </span>
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Globe2 className="w-3 h-3" /> {product.origin || "Assam, India"}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-forest leading-snug mb-3">
                {product.name}
              </h1>

              {/* Rating row */}
              <div className="flex items-center gap-3 pb-4 border-b border-stone-100 mb-4">
                <div className="flex items-center gap-1 bg-forest text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                  <span>4.8</span>
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-xs text-stone-500">124 Ratings · 38 Reviews</span>
                <span className="ml-auto text-xs text-gold font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Exporter
                </span>
              </div>

              {/* Price */}
              <div className="mb-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-forest">₹{product.price_per_kg?.toLocaleString("en-IN")}</span>
                  <span className="text-stone-400 font-medium">/ kg</span>
                  <span className="text-xs text-stone-400 line-through">₹{Math.round((product.price_per_kg || 0) * 1.2).toLocaleString("en-IN")}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">17% off</span>
                </div>
                <p className="text-xs text-stone-400 mt-1">Inclusive of all taxes. Export pricing available for bulk orders.</p>
              </div>

              {/* Key Highlights */}
              <div className="bg-stone-50 rounded-xl p-4 mb-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {[
                    `Grade: ${product.grade || "BOPF / BP"}`,
                    "Single-origin, directly from certified estates",
                    "Available in bulk & private label packaging",
                    `Min. Order: ${product.min_order_kg || 10} kg`,
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                      <Leaf className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Qty Selector */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">Quantity (kg)</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQty(Math.max(product.min_order_kg || 1, qty - 1))}
                      className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-14 text-center text-base font-bold text-forest border-x border-stone-200 h-10 flex items-center justify-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-10 h-10 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-stone-500">
                    Total: <span className="font-bold text-forest">₹{totalPrice}</span>
                  </span>
                </div>
                <p className="text-[10px] text-stone-400 mt-1.5">Minimum order: {product.min_order_kg || 10} kg</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3">
                <Button
                  className={`flex-1 h-12 font-bold text-sm rounded-xl transition-all duration-300 shadow ${added ? "bg-emerald-600 hover:bg-emerald-700" : "bg-forest hover:bg-forest/90"}`}
                  onClick={handleAddToCart}
                >
                  {added ? (
                    <><CheckCircle2 className="w-4 h-4 mr-2" /> Added!</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>
                  )}
                </Button>
                <Link href={`/b2b?product=${product.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full h-12 font-bold text-sm rounded-xl border-forest text-forest hover:bg-forest/5 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" /> Get Quote
                  </Button>
                </Link>
              </div>
            </div>

            {/* Description / Specs / FAQ Tabs */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
              {/* Tab Bar */}
              <div className="flex border-b border-stone-100">
                {(["description", "specs", "faq"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                      activeTab === tab
                        ? "text-forest border-b-2 border-forest"
                        : "text-stone-400 hover:text-stone-600"
                    }`}
                  >
                    {tab === "description" ? "Description" : tab === "specs" ? "Specifications" : "FAQs"}
                  </button>
                ))}
              </div>

              {/* Description Tab */}
              {activeTab === "description" && (
                <div className="p-6">
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {product.description ||
                      "Premium quality heritage tea sourced directly from the finest estates in Assam, India. Each batch is handpicked and processed under strict quality controls to ensure authentic flavour, rich aroma, and full-bodied character. Ideal for connoisseurs, specialty retailers, and bulk B2B buyers worldwide."}
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                      { icon: Leaf, label: "100% Natural", value: "No additives" },
                      { icon: Package, label: "Bulk Ready", value: "Custom packs" },
                      { icon: Globe2, label: "Export Certified", value: "APEDA, FSSAI" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="bg-stone-50 rounded-xl p-3 text-center">
                        <Icon className="w-5 h-5 text-gold mx-auto mb-1.5" />
                        <p className="text-xs font-bold text-forest">{label}</p>
                        <p className="text-[10px] text-stone-400">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs Tab */}
              {activeTab === "specs" && (
                <div className="p-6">
                  <table className="w-full text-sm">
                    <tbody>
                      {SPECS(product).map(({ label, value }, i) => (
                        <tr key={label} className={i % 2 === 0 ? "bg-stone-50/60" : ""}>
                          <td className="py-2.5 px-3 text-stone-500 font-medium w-2/5 text-xs uppercase tracking-wide">{label}</td>
                          <td className="py-2.5 px-3 font-semibold text-forest text-sm">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* FAQ Tab */}
              {activeTab === "faq" && (
                <div className="p-6 space-y-2">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="border border-stone-100 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-stone-50 transition-colors"
                      >
                        <span className="text-sm font-semibold text-forest">{faq.q}</span>
                        {openFaq === i ? (
                          <ChevronUp className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-400 flex-shrink-0" />
                        )}
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-4 text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ratings Summary */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
              <h3 className="text-sm font-bold text-forest mb-4 uppercase tracking-widest">Ratings & Reviews</h3>
              <div className="flex gap-8 items-center mb-6">
                <div className="text-center">
                  <p className="text-5xl font-black text-forest">4.8</p>
                  <div className="flex justify-center gap-0.5 my-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= 4 ? "fill-gold text-gold" : "fill-gold/40 text-gold/40"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-stone-400">124 ratings</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(s => (
                    <div key={s} className="flex items-center gap-2">
                      <span className="text-xs text-stone-500 w-2">{s}</span>
                      <Star className="w-3 h-3 fill-gold text-gold flex-shrink-0" />
                      <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold rounded-full"
                          style={{ width: s === 5 ? "72%" : s === 4 ? "18%" : s === 3 ? "6%" : "4%" }}
                        />
                      </div>
                      <span className="text-xs text-stone-400 w-6">{s === 5 ? "72%" : s === 4 ? "18%" : s === 3 ? "6%" : "4%"}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Sample reviews */}
              {[
                { name: "Ramesh K.", city: "Mumbai", rating: 5, text: "Outstanding CTC tea. Strong, malty and full-bodied. My clients loved it. Shipped on time and well packaged." },
                { name: "Sarah L.", city: "London, UK", rating: 5, text: "Excellent quality orthodox Assam. Very authentic and aromatic. Will definitely order again for our tea brand." },
              ].map((rev, i) => (
                <div key={i} className={`py-4 ${i > 0 ? "border-t border-stone-100" : ""}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {rev.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-forest">{rev.name}</p>
                        <p className="text-[10px] text-stone-400">{rev.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-forest text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {rev.rating} <Star className="w-2.5 h-2.5 fill-current" />
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{rev.text}</p>
                  <p className="text-[10px] text-stone-300 mt-1.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Certified Buyer
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="space-y-4 lg:sticky lg:top-[76px] self-start">
            {/* Delivery & Order Info */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Order & Delivery</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-forest">Minimum Order</p>
                    <p className="text-xs text-stone-500">{product.min_order_kg || 10} kg per order</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-forest">Delivery Time</p>
                    <p className="text-xs text-stone-500">Domestic: 2–5 days</p>
                    <p className="text-xs text-stone-500">International: 10–20 days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-forest">Quality Guarantee</p>
                    <p className="text-xs text-stone-500">100% refund if quality doesn't match</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-4">Sold By</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-forest rounded-xl flex items-center justify-center text-white font-bold text-sm">SG</div>
                <div>
                  <p className="text-sm font-bold text-forest">Shahinur Global Exporter</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-2.5 h-2.5 fill-gold text-gold" />)}
                    </div>
                    <span className="text-[10px] text-stone-400">5.0 Seller Rating</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs text-stone-500 mb-4">
                <div className="flex justify-between">
                  <span>Response Rate</span>
                  <span className="font-semibold text-forest">98%</span>
                </div>
                <div className="flex justify-between">
                  <span>Ships On Time</span>
                  <span className="font-semibold text-forest">99%</span>
                </div>
                <div className="flex justify-between">
                  <span>Since</span>
                  <span className="font-semibold text-forest">2023</span>
                </div>
              </div>
              <Link href="/contact">
                <Button variant="outline" className="w-full h-9 text-xs font-bold border-stone-200 text-stone-700 hover:bg-stone-50 rounded-xl">
                  Contact Seller
                </Button>
              </Link>
            </div>

            {/* Price Summary for selected qty */}
            <div className="bg-forest rounded-2xl p-5 text-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">Order Summary</p>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-white/70">Price per kg</span>
                  <span>₹{product.price_per_kg}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Quantity</span>
                  <span>{qty} kg</span>
                </div>
                <div className="border-t border-white/20 pt-2 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
              <Button
                className="w-full h-10 bg-gold hover:bg-gold/90 text-forest font-bold text-sm rounded-xl transition-all"
                onClick={handleAddToCart}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </Button>
              <Link href={`/b2b?product=${product.id}`} className="block mt-2">
                <Button
                  variant="outline"
                  className="w-full h-10 border-white/30 text-white hover:bg-white/10 font-semibold text-sm rounded-xl transition-all"
                >
                  Request Bulk Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
