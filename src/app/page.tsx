import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import HeroSlider from "@/components/sections/HeroSlider";
import HomeFAQ from "@/components/sections/HomeFAQ";
import ContactSection from "@/components/sections/ContactSection";
import { createClient } from '@/lib/supabase/server';
import {
  User, Building2, Briefcase, PiggyBank,
  ChevronDown, ChevronUp, Star, MapPin,
  Share2, ArrowRight, CheckCircle2, Play
} from "lucide-react";

export default async function Home() {
  let dbProducts = null;

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && supabaseUrl.startsWith('http')) {
      const supabase = await createClient();
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });
      dbProducts = data;
    }
  } catch (err) {
    console.error("Failed to fetch products from Supabase:", err);
  }

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

  const products = dbProducts && dbProducts.length > 0
    ? dbProducts.map(p => ({ id: p.id, name: p.name, img: p.image_url || fallbackProducts[7].img, slug: p.slug }))
    : fallbackProducts.map(p => ({ id: undefined, ...p, slug: p.name.toLowerCase().replace(/\s+/g, "-") }));

  return (
    <main className="flex flex-col min-h-screen bg-white font-sans w-full selection:bg-gold/25">
      {/* Hero Slider (Auto-scrolling) */}
      <HeroSlider products={products} />

      <section className="w-full py-8 md:py-10 relative bg-cream overflow-hidden">
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-forest mb-4 leading-tight tracking-tight">
            Serving the World with Premium Tea.
          </h1>
          <p className="text-sm md:text-base text-stone-600 leading-relaxed mb-6 font-medium">
            Established in 2023, Shahinur Global Exporter is a leading Manufacturer, Exporter, Supplier & Trader of premium teas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/about">
              <Button variant="link" className="text-gold font-bold group h-auto p-0 text-sm hover:text-forest transition-colors">
                Discover Our Story <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact#inquiry-form">
              <Button className="bg-forest hover:bg-forest/90 text-white rounded-full px-6 h-10 text-xs font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                Send Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Product Range */}
      <section className="w-full bg-stone-50/50 py-8 md:py-12 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-stone-200/50"></div>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-forest mb-4 tracking-tight">Our Premium Product Range</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Explore our wide variety of meticulously sourced and processed teas and eco-friendly products.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
            {products.slice(0, 5).map((cat, idx) => (
              <div
                key={idx}
                className={`relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 aspect-square cursor-pointer ${idx >= 4 ? "hidden lg:block" : ""
                  }`}
              >
                <Image src={cat.img} alt={cat.name} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-center transform translate-y-1 group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-bold text-white text-xs sm:text-sm md:text-base leading-tight drop-shadow-md">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/products">
              <Button className="bg-forest hover:bg-forest/90 text-white rounded-full px-8 h-12 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                View All
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* 3. Ratings & Reviews */}
      <section className="w-full bg-white py-8 md:py-12 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Customer Trust & Reviews</h2>
            <p className="text-sm md:text-base text-gray-500">See what our global clients say about our products and services.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 grid grid-cols-2 lg:grid-cols-4 overflow-hidden mb-6">
            {/* Overall Rating */}
            <div className="col-span-1 lg:col-span-1 p-6 md:p-8 border-r border-b lg:border-b-0 border-gray-100 bg-gray-50/30">
              <div className="flex items-center justify-center gap-2 mb-4 md:mb-6 text-amber-700 font-semibold text-xs md:text-sm uppercase tracking-wider">
                <Star className="w-4 h-4 fill-current" /> Overall Rating
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl md:text-6xl font-black text-gray-900 mb-2 tracking-tighter">5.0<span className="text-xl md:text-3xl text-gray-300 font-medium tracking-normal">/5</span></div>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 fill-current drop-shadow-sm" />)}
                </div>
                <p className="text-[10px] md:text-sm text-gray-500 mb-4 md:mb-6 font-medium">Based on verified reviews</p>
                <Button variant="outline" className="border-gray-200 text-gray-700 rounded-full h-8 md:h-10 px-4 md:px-6 text-[10px] md:text-sm font-semibold hover:bg-gray-50 hover:text-amber-700 shadow-sm">Write a Review</Button>
              </div>
            </div>

            {/* User Satisfaction */}
            <div className="col-span-1 lg:col-span-1 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/30 flex flex-col justify-center">
              <h3 className="text-xs md:text-sm font-semibold text-gray-800 uppercase tracking-wider mb-6 text-center">User Satisfaction</h3>
              <div className="flex flex-col gap-5 md:gap-6 items-center justify-center">
                {[
                  { label: 'Response', value: 98 },
                  { label: 'Quality', value: 99 },
                  { label: 'Delivery', value: 97 }
                ].map((metric, i) => {
                  // SVG Circle math: r=24, circumference = 2 * pi * 24 = 150.8
                  const r = 20; // slightly smaller for mobile layout scaling
                  const c = 2 * Math.PI * r;
                  const offset = c - (metric.value / 100) * c;

                  return (
                    <div key={i} className="flex flex-row items-center gap-2.5 md:gap-4 w-full max-w-[150px] md:max-w-[180px] justify-start">
                      <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] md:text-sm font-extrabold text-stone-900 relative flex-shrink-0">
                        {metric.value}%
                        {/* Circle progress SVG */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r={r}
                            className="stroke-stone-100"
                            strokeWidth="3 md:strokeWidth=4"
                            fill="transparent"
                          />
                          <circle
                            cx="50%"
                            cy="50%"
                            r={r}
                            className="stroke-gold transition-all duration-1000 ease-out"
                            strokeWidth="3 md:strokeWidth=4"
                            fill="transparent"
                            strokeDasharray={c}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <span className="text-[10px] md:text-sm text-stone-600 font-bold uppercase tracking-wide">{metric.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Individual Review */}
            <div className="col-span-2 lg:col-span-2 p-6 md:p-8 bg-white flex flex-col justify-center">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-forest rounded-2xl shadow-inner text-white flex items-center justify-center text-xl md:text-2xl font-bold flex-shrink-0">
                  R
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900 text-base md:text-lg">R.k. Aggarwal</h4>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-[10px] md:text-xs font-medium">Delhi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400 gap-0.5">
                        <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current drop-shadow-sm" />
                        <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current drop-shadow-sm" />
                        <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current drop-shadow-sm" />
                        <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current drop-shadow-sm" />
                        <Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current drop-shadow-sm" />
                      </div>
                      <span className="text-[10px] md:text-xs text-gray-400 font-medium">07 Jan 2025</span>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/10 text-gold rounded-lg text-[11px] md:text-xs font-bold mb-3">
                    <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5" /> Product: Assam Ctc Tea
                  </div>
                  <p className="text-gray-700 text-sm md:text-base leading-relaxed italic">"Refreshingly unique features that enhance usability and overall experience. Highly recommended for wholesale buyers."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contact / Form Footer */}
      <section id="inquiry" className="w-full bg-white py-8 md:py-12 relative overflow-hidden scroll-mt-24">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <Suspense fallback={
            <div className="bg-white rounded-2xl p-8 border border-stone-100 text-center text-stone-500">
              Loading form...
            </div>
          }>
            <ContactSection />
          </Suspense>
        </div>
      </section>

      {/* 5. FAQs */}
      <HomeFAQ limit={3} />
    </main>
  );
}
