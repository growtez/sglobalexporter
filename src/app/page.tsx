import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroSlider from "@/components/sections/HeroSlider";
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
    ? dbProducts.map(p => ({ name: p.name, img: p.image_url || fallbackProducts[7].img, slug: p.slug }))
    : fallbackProducts.map(p => ({ ...p, slug: p.name.toLowerCase().replace(/\s+/g, "-") }));

  return (
    <main className="flex flex-col min-h-screen bg-white font-sans w-full selection:bg-gold/25">
      {/* Hero Slider (Auto-scrolling) */}
      <HeroSlider products={products} />

      {/* 1. Hero / Intro Section */}
      <section className="w-full pb-16 pt-16 relative bg-cream">
        
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/25 text-gold text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-current" /> Premium Quality Exporter
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-forest mb-6 leading-tight">
            Welcome to Shahinur Global Exporter
          </h1>
          <p className="text-[15px] md:text-base text-gray-600 leading-relaxed mb-6 px-4 md:px-12 font-medium">
            Established in 2023, we are a leading Manufacturer, Exporter, Supplier & Trader of premium teas.
          </p>
          <Link href="/about">
            <Button variant="link" className="text-gold font-semibold group h-auto p-0 text-sm">
              Discover Our Story <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

        </div>
      </section>

      {/* 2. Product Range */}
      <section className="w-full bg-stone-50/50 py-16 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-stone-200/50"></div>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-forest mb-4 tracking-tight">Our Premium Product Range</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Explore our wide variety of meticulously sourced and processed teas and eco-friendly products.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8">
            {products.map((cat, idx) => (
              <div key={idx} className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 aspect-square cursor-pointer">
                <Image src={cat.img} alt={cat.name} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 inset-x-0 p-1.5 sm:p-2.5 text-center transform translate-y-1 group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="font-bold text-white text-[10px] sm:text-[12px] md:text-sm leading-tight drop-shadow-md">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button className="bg-forest hover:bg-forest/90 text-white rounded-full px-8 h-12 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              Explore All Categories
            </Button>
          </div>
        </div>
      </section>
      {/* 3. Ratings & Reviews */}
      <section className="w-full bg-white py-20 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-14">
             <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Trust & Reviews</h2>
             <p className="text-gray-500">See what our global clients say about our products and services.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row overflow-hidden mb-8">
             {/* Overall Rating */}
             <div className="md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/30">
                <div className="flex items-center justify-center gap-2 mb-6 text-amber-700 font-semibold text-sm uppercase tracking-wider">
                  <Star className="w-4 h-4 fill-current" /> Overall Rating
                </div>
                <div className="flex flex-col items-center justify-center">
                   <div className="text-6xl font-black text-gray-900 mb-2 tracking-tighter">5.0<span className="text-3xl text-gray-300 font-medium tracking-normal">/5</span></div>
                   <div className="flex gap-1 mb-4">
                     {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-yellow-400 fill-current drop-shadow-sm" />)}
                   </div>
                   <p className="text-sm text-gray-500 mb-6 font-medium">Based on verified reviews</p>
                   <Button variant="outline" className="border-gray-200 text-gray-700 rounded-full h-10 px-6 font-semibold hover:bg-gray-50 hover:text-amber-700 shadow-sm">Write a Review</Button>
                </div>
             </div>
             
             {/* Rating Breakdown */}
             <div className="md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-gray-100">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-6 text-center">Rating Breakdown</h3>
                <div className="space-y-3.5 px-4">
                  {[5,4,3,2,1].map((star) => (
                    <div key={star} className="flex items-center text-sm text-gray-600 gap-3 group cursor-pointer">
                      <span className="w-3 font-semibold text-gray-700">{star}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current -ml-1 group-hover:scale-110 transition-transform" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                         <div className={`h-full rounded-full transition-all duration-1000 ${star === 5 ? 'bg-gold w-full' : 'w-0'}`}></div>
                      </div>
                      <span className="w-4 text-right font-medium text-gray-500">{star === 5 ? '1' : '0'}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* User Satisfaction */}
             <div className="md:w-1/3 p-8 bg-gray-50/30">
                <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-8 text-center">User Satisfaction</h3>
                <div className="flex justify-around px-2">
                   {['Response', 'Quality', 'Delivery'].map((metric, i) => (
                     <div key={i} className="flex flex-col items-center">
                       <div className="w-16 h-16 rounded-full border-4 border-gray-100 bg-white shadow-sm flex items-center justify-center text-sm font-bold text-gray-400 mb-3 relative">
                         0%
                         {/* Circle progress mockup */}
                         <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="28" cy="28" r="28" className="stroke-current text-gold/20" strokeWidth="4" fill="transparent" />
                         </svg>
                       </div>
                       <span className="text-xs text-gray-600 font-semibold uppercase tracking-wide">{metric}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Individual Review */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
             <div className="w-14 h-14 bg-forest rounded-2xl shadow-inner text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
               R
             </div>
             <div className="flex-1">
               <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                 <div className="flex items-center gap-2">
                   <h4 className="font-bold text-gray-900 text-lg">R.k. Aggarwal</h4>
                   <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md text-xs font-medium">Delhi</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="flex text-yellow-400 gap-0.5">
                       <Star className="w-4 h-4 fill-current drop-shadow-sm" />
                       <Star className="w-4 h-4 fill-current drop-shadow-sm" />
                       <Star className="w-4 h-4 fill-current drop-shadow-sm" />
                       <Star className="w-4 h-4 fill-current drop-shadow-sm" />
                       <Star className="w-4 h-4 fill-current drop-shadow-sm" />
                   </div>
                   <span className="text-xs text-gray-400 font-medium">07 Jan 2025</span>
                 </div>
               </div>
               <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold rounded-lg text-xs font-bold mb-3">
                 <CheckCircle2 className="w-3.5 h-3.5" /> Product: Assam Ctc Tea
               </div>
               <p className="text-gray-700 text-base leading-relaxed italic">"Refreshingly unique features that enhance usability and overall experience. Highly recommended for wholesale buyers."</p>
             </div>
          </div>
        </div>
      </section>

      {/* 4. FAQs */}
      <section className="w-full bg-stone-50/50 py-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] opacity-50 -z-0 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] opacity-50 -z-0 pointer-events-none"></div>
         
         <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-forest mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500">Everything you need to know about Shahinur Global Exporter.</p>
            </div>
            
            <div className="space-y-4">
               {/* Expanded FAQ */}
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                 <div className="p-6 flex justify-between items-start cursor-pointer bg-[#FAF7F0]">
                    <div className="flex gap-4 items-start pr-8">
                       <span className="text-gold font-black text-xl mt-0.5 opacity-40">01</span>
                       <h3 className="font-bold text-forest text-base mt-1">What is the year of establishment of Shahinur Global Exporter (Opc) Private Limited?</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 mt-0.5 shadow-inner">
                       <ChevronUp className="w-5 h-5" />
                    </div>
                 </div>
                 <div className="px-6 pb-6 pl-14 text-sm text-gray-600 leading-relaxed pr-10">
                    The establishment year of Shahinur Global Exporter (Opc) Private Limited is 2023. Since its inception, the company has been engaged in business activities focused on customer satisfaction and premium tea exports globally.
                 </div>
               </div>

               {/* Collapsed FAQs */}
               {[
                 "What are the main products offered by Shahinur Global Exporter?",
                 "Where is Shahinur Global Exporter located?",
                 "Which product categories does the company specialize in?",
                 "How can international buyers contact you for bulk orders?"
               ].map((question, i) => (
                 <div key={i} className="bg-white rounded-2xl border border-gray-100 hover:border-gold/30 shadow-sm hover:shadow-md transition-all duration-300">
                   <div className="p-6 flex justify-between items-center cursor-pointer">
                      <div className="flex gap-4 items-center pr-8">
                         <span className="text-gray-300 font-black text-xl w-6">0{i+2}</span>
                         <h3 className="font-semibold text-stone-850 text-base">{question}</h3>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                   </div>
                 </div>
               ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="link" className="text-gold font-semibold">View all FAQs <ArrowRight className="w-4 h-4 ml-1" /></Button>
            </div>
         </div>
      </section>

      {/* 5. Contact / Form Footer */}
      <section className="w-full bg-white py-24 relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
         
         <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col lg:flex-row relative overflow-hidden">
               
               {/* Left Side: Contact Info (Integrated instead of floating for a cleaner modern look) */}
               <div className="lg:w-[400px] bg-forest text-white p-10 md:p-12 relative overflow-hidden">
                  {/* Decorative circles */}
                  <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gold/15 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    <h3 className="text-3xl font-bold mb-2">Get in Touch</h3>
                    <p className="text-stone-300 text-sm mb-10">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    
                    <div className="space-y-8 mb-auto">
                       <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10">
                            <User className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                             <p className="text-stone-300 text-xs font-semibold uppercase tracking-wider mb-1">Contact Person</p>
                             <p className="font-bold text-lg">Mr. Shahinur Islam</p>
                          </div>
                       </div>
                       
                       <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10">
                            <MapPin className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                             <p className="text-stone-300 text-xs font-semibold uppercase tracking-wider mb-1">Office Address</p>
                             <p className="font-medium text-sm leading-relaxed text-stone-200 pr-4">
                                Pipulbari part 1, Hatsingimari, Mankachar, Dhubri, South Salmara, Assam - 783135
                             </p>
                          </div>
                       </div>
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-white/20">
                       <p className="text-sm font-medium mb-4">Connect with us</p>
                       <div className="flex gap-3">
                          {['Facebook', 'Twitter', 'LinkedIn', 'Pinterest'].map((social, i) => (
                             <div key={i} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer transition-colors backdrop-blur-sm border border-white/10">
                               <span className="text-xs font-bold">{social[0]}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                  </div>
               </div>

               {/* Right Side: Form */}
               <div className="flex-1 p-10 md:p-14 bg-white">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Send an Inquiry</h3>
                  <p className="text-gray-500 mb-8 text-sm">Tell us what you're looking for, and our team will get back to you with the best quote.</p>
                  
                  <div className="space-y-6">
                     <div>
                       <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Product / Service</label>
                       <input type="text" placeholder="e.g., Premium Assam CTC Tea" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold focus:bg-white transition-all shadow-sm placeholder-gray-400" />
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Quantity</label>
                           <input type="number" placeholder="Enter quantity" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold focus:bg-white transition-all shadow-sm placeholder-gray-400" />
                        </div>
                        <div>
                           <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Unit</label>
                           <div className="relative">
                             <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold focus:bg-white transition-all shadow-sm appearance-none cursor-pointer">
                                <option>Kilograms (kg)</option>
                                <option>Metric Tons (MT)</option>
                                <option>Boxes</option>
                             </select>
                             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                           </div>
                        </div>
                     </div>
                     
                     <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">Mobile Number</label>
                        <div className="flex bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-gold/20 focus-within:border-gold focus-within:bg-white transition-all shadow-sm">
                           <div className="bg-gray-100 px-4 py-3.5 border-r border-gray-200 text-sm text-gray-700 font-medium flex items-center gap-2">
                             <div className="w-4 h-3 flex flex-col rounded-[1px] overflow-hidden shadow-sm"><div className="h-1/3 bg-orange-500"></div><div className="h-1/3 bg-white"></div><div className="h-1/3 bg-green-500"></div></div>
                             +91
                           </div>
                           <input type="tel" placeholder="Enter your mobile number" className="flex-1 px-4 py-3.5 text-sm focus:outline-none bg-transparent placeholder-gray-400" />
                        </div>
                     </div>
                     
                     <div className="pt-4">
                        <Button className="w-full md:w-auto bg-forest hover:bg-forest/90 text-white px-10 py-6 h-auto text-base font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                           Submit Inquiry
                        </Button>
                        <p className="text-xs text-gray-500 mt-4 text-center md:text-left">
                           By submitting, you agree to our <span className="text-gold font-medium hover:underline cursor-pointer">Terms</span> and <span className="text-gold font-medium hover:underline cursor-pointer">Privacy Policy</span>.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </main>
  );
}
