"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const teas = [
  {
    id: "ctc",
    name: "CTC Assam Tea",
    subtitle: "Bold · Robust · Everyday Classic",
    description:
      "The most widely consumed Assam variety. Crush-Tear-Curl processed for maximum strength and a rich, malty flavour perfect for chai and milk teas.",
    origin: "Upper Assam, Dibrugarh",
    grade: "BOPF / BP",
    export: "Bulk · Private Label",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop",
    badge: "Best Seller",
    color: "from-amber-900 to-stone-800",
  },
  {
    id: "orthodox",
    name: "Orthodox Assam Tea",
    subtitle: "Whole Leaf · Malty · Artisan",
    description:
      "Hand-rolled whole-leaf tea with a full, complex flavour profile. Prized by specialty importers and high-end hospitality brands for its amber cup and muscatel notes.",
    origin: "Jorhat · Golaghat Estates",
    grade: "FTGFOP1 / TGFOP",
    export: "Speciality · Retail Packs",
    image:
      "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=800&auto=format&fit=crop",
    badge: "Export Premium",
    color: "from-green-900 to-forest",
  },
  // {
  //   id: "green",
  //   name: "Assam Green Tea",
  //   subtitle: "Grassy · Fresh · Antioxidant-Rich",
  //   description:
  //     "Un-oxidised Assam green tea with a bright, grassy flavour and light golden liquor. Packed with antioxidants, increasingly sought-after in wellness markets.",
  //   origin: "Doomdooma, Upper Assam",
  //   grade: "Young Flush",
  //   export: "Wellness Brands · Retail",
  //   image:
  //     "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=800&auto=format&fit=crop",
  //   badge: "Trending",
  //   color: "from-emerald-800 to-green-900",
  // },
  // {
  //   id: "white",
  //   name: "Assam White Tea",
  //   subtitle: "Delicate · Rare · Luxurious",
  //   description:
  //     "Made exclusively from young buds and first leaves. Light, nuanced, and rare — our white tea is one of the most coveted luxury offerings from the Assam valleys.",
  //   origin: "First Flush, Select Estates",
  //   grade: "Silver Needle / White Peony",
  //   export: "Luxury Segment · Hotels",
  //   image:
  //     "https://images.unsplash.com/photo-1576092762791-dd9e222046d8?q=80&w=800&auto=format&fit=crop",
  //   badge: "Rare & Limited",
  //   color: "from-stone-600 to-stone-800",
  // },
  // {
  //   id: "golden",
  //   name: "Golden Tips Assam",
  //   subtitle: "Floral · Prized · Connoisseur's Choice",
  //   description:
  //     "The crown jewel of Assam teas. Hand-picked golden buds from the first flush, producing a cup of extraordinary delicacy with honey-sweet notes and a floral finish.",
  //   origin: "Manohari Estate, Dibrugarh",
  //   grade: "Golden Tips / Imperial",
  //   export: "Connoisseur · Gift Segment",
  //   image:
  //     "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800&auto=format&fit=crop",
  //   badge: "Ultra Premium",
  //   color: "from-yellow-800 to-amber-900",
  // },
];

export default function TeaCollection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="collection"
      ref={ref}
      className="py-8 md:py-10 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="text-gold text-sm uppercase tracking-[0.3em] font-medium mb-4 block">
            Curated Selection
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-forest mb-4">
            Our Tea Collection
          </h2>
          <div className="h-px w-24 bg-gold mx-auto opacity-60 mt-6" />
          <p className="mt-6 text-stone-500 max-w-2xl mx-auto text-lg font-light">
            Five exceptional varieties, each sourced from distinct micro-regions
            of Assam, each with its own character, story, and world-class export
            quality.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {teas.map((tea, index) => (
            <motion.div
              key={tea.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(tea.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 hover:border-gold/40 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={tea.image}
                  alt={tea.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${tea.color} opacity-60`}
                />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold text-charcoal text-xs font-bold uppercase tracking-wide shadow-md">
                    <Star className="w-3 h-3" />
                    {tea.badge}
                  </span>
                </div>

                {/* Origin on hover */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4"
                  animate={hoveredId === tea.id ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-cream/90 text-xs uppercase tracking-widest">
                    📍 {tea.origin}
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="mb-1">
                  <span className="text-gold text-xs font-medium uppercase tracking-widest">
                    {tea.subtitle}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-forest mb-3 group-hover:text-forest transition-colors">
                  {tea.name}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed flex-1 mb-5">
                  {tea.description}
                </p>

                {/* Meta tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[tea.grade, tea.export].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-forest/5 text-forest/70 text-xs font-medium border border-forest/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link href={`/products?category=tea&type=${tea.id}`}>
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-forest group-hover:text-cream group-hover:border-forest transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}

          {/* View All card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: teas.length * 0.1 }}
            className="flex items-center justify-center rounded-2xl border-2 border-dashed border-forest/20 hover:border-gold/60 bg-forest/2 transition-all duration-300 min-h-[300px] group cursor-pointer"
          >
            <Link href="/products?category=tea" className="flex flex-col items-center gap-4 text-center p-8">
              <div className="w-16 h-16 rounded-full bg-forest/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                <ArrowRight className="w-8 h-8 text-forest group-hover:text-gold transition-colors" />
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-forest mb-2">
                  View Full Catalogue
                </div>
                <div className="text-sm text-stone-500">
                  Browse all varieties & bulk options
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
