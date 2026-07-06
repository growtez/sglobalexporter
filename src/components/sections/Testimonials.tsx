"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "James Whitmore",
    title: "Head of Procurement",
    company: "Harrington Tea Co.",
    country: "United Kingdom",
    flag: "🇬🇧",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "SGlobalExporter has been our go-to Assam tea supplier for six years. The consistency is extraordinary — every shipment matches the sample grade. Their documentation team makes customs a breeze.",
    tea: "Orthodox FTGFOP1",
    volume: "5MT/month",
  },
  {
    id: 2,
    name: "Aisha Al-Mansouri",
    title: "Category Manager",
    company: "Al Baraka Premium Foods",
    country: "UAE",
    flag: "🇦🇪",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "The export documentation and certification process was handled without a single query from our end. Quality is impeccable and their Golden Tips range has become our best-selling premium line. Highly recommended.",
    tea: "CTC BOP + Golden Tips",
    volume: "3MT/month",
  },
  {
    id: 3,
    name: "Kenji Tanaka",
    title: "Director of Imports",
    company: "Sakura Tea Imports",
    country: "Japan",
    flag: "🇯🇵",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "In 20 years of importing specialty teas, I've rarely seen an exporter this organised. Sampling, approval, production, and shipping — every step ran perfectly. The white tea is extraordinary.",
    tea: "Assam White Tea",
    volume: "500kg/month",
  },
  {
    id: 4,
    name: "Sophie Laurent",
    title: "Founder",
    company: "Maison du Thé Artisanal",
    country: "France",
    flag: "🇫🇷",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    quote:
      "Their Orthodox Second Flush from Jorhat estates is the finest malty Assam I've ever tasted. Our Parisian customers ask for it by name. SGlobalExporter understands the premium segment perfectly.",
    tea: "Orthodox Second Flush",
    volume: "800kg/quarter",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-8 md:py-10 bg-forest overflow-hidden"
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
            What Our Partners Say
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">
            Testimonials
          </h2>
          <div className="h-px w-24 bg-gold mx-auto opacity-60 mt-6" />
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl bg-cream/5 border border-cream/10 p-8 md:p-14"
            >
              {/* Quote icon */}
              <Quote className="w-12 h-12 text-gold/30 mb-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-gold fill-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-light text-cream/85 leading-relaxed mb-10 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author + meta */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/40">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-cream text-lg">
                      {t.name} {t.flag}
                    </div>
                    <div className="text-cream/60 text-sm">
                      {t.title}, {t.company}
                    </div>
                    <div className="text-cream/40 text-xs mt-0.5">
                      {t.country}
                    </div>
                  </div>
                </div>

                {/* Tea info */}
                <div className="flex gap-4 flex-wrap">
                  {[
                    { label: "Tea", value: t.tea },
                    { label: "Volume", value: t.volume },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="px-4 py-2 rounded-xl bg-cream/5 border border-cream/10 text-center min-w-[120px]"
                    >
                      <div className="text-cream/40 text-xs uppercase tracking-widest">
                        {item.label}
                      </div>
                      <div className="text-cream text-sm font-medium mt-1">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-gold w-8" : "bg-cream/20 w-2"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-cream/20 flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
