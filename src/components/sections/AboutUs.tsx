"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, MapPin, Trophy } from "lucide-react";

const pillars = [
  {
    icon: MapPin,
    title: "Born in the Brahmaputra Valley",
    description:
      "Our roots trace back to the lush, misty gardens of Assam — a region where the climate, soil, and altitude conspire to create the world's boldest, most flavourful teas.",
  },
  {
    icon: Leaf,
    title: "Why Assam Tea is Unique",
    description:
      "The Camellia sinensis var. assamica thrives in Assam's unique alluvial soil and monsoon climate. Its large leaves produce a robust, malty cup with natural amber colour — unlike any other tea in the world.",
  },
  {
    icon: Trophy,
    title: "From Garden to Global Market",
    description:
      "We work directly with estate owners, eliminating middlemen to guarantee freshness, fair pricing, and transparent sourcing — every single batch certified and traceable.",
  },
];

export default function AboutUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-8 md:py-10 bg-cream overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest/10 text-forest text-sm font-medium uppercase tracking-widest">
            <Leaf className="w-4 h-4 text-gold" />
            Our Story
          </span>
        </motion.div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-forest mb-4">
            A Heritage Rooted
            <br />
            <span className="text-gold italic">in the Soil of Assam</span>
          </h2>
          <div className="h-px w-24 bg-gold mx-auto opacity-60 mt-6" />
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=1974&auto=format&fit=crop"
                alt="Assam tea garden"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-8 -right-4 md:-right-12 bg-white rounded-2xl p-6 shadow-xl border border-stone-100 max-w-[220px]"
            >
              <div className="text-4xl font-serif font-bold text-forest mb-1">
                15+
              </div>
              <div className="text-sm text-stone-600 font-medium">
                Years of premium export heritage
              </div>
              <div className="mt-3 h-1 w-12 bg-gold rounded-full" />
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <p className="text-xl text-stone-600 font-light leading-relaxed">
              SGlobalExporter was founded with one conviction:{" "}
              <strong className="text-forest font-semibold">
                the world deserves to taste Assam's finest.
              </strong>{" "}
              For over 15 years we have partnered with generational tea estates
              in the Brahmaputra Valley to bring single-origin, estate-grade
              teas to importers, hospitality groups, and premium retailers
              across 30+ countries.
            </p>
            <p className="text-lg text-stone-500 font-light leading-relaxed">
              Every consignment is processed through rigorous quality
              protocols, documented for compliance, and shipped with the
              care that a true heritage product deserves. We don't just export
              tea — we export an experience.
            </p>

            {/* Pillars */}
            <div className="mt-4 flex flex-col gap-6">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                    className="flex gap-4 group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center group-hover:bg-forest group-hover:text-gold transition-all duration-300">
                      <Icon className="w-5 h-5 text-forest group-hover:text-gold transition-colors" />
                    </div>
                    <div>
                      <div className="font-semibold text-forest mb-1">
                        {pillar.title}
                      </div>
                      <div className="text-stone-500 text-sm leading-relaxed">
                        {pillar.description}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
