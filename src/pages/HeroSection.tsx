"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[80vh] w-full overflow-hidden flex items-center"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=2064&auto=format&fit=crop')",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/30" />

      {/* Floating tea leaf particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gold/30"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 backdrop-blur-sm"
          >
            <Globe className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium uppercase tracking-widest">
              Heritage in Every Leaf · Exported Worldwide
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] text-cream mb-6"
          >
            The Finest of{" "}
            <span className="text-gold italic">Assam</span>,
            <br />
            Exported{" "}
            <span className="relative inline-block">
              Global.
              <motion.span
                className="absolute -bottom-1 left-0 h-1 bg-gold rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.9 }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-cream/75 mb-12 max-w-2xl font-light leading-relaxed"
          >
            Premium Assam teas sourced directly from the world-renowned
            tea gardens of Northeast India — delivering authentic taste,
            quality, and heritage to over 30 countries.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/products?category=tea">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gold text-charcoal hover:bg-gold/90 text-lg px-8 py-4 h-auto font-semibold shadow-lg shadow-gold/20 transition-all duration-300 hover:shadow-gold/40 hover:scale-[1.02]"
              >
                Explore Our Teas
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/b2b">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-cream/50 text-cream hover:bg-cream hover:text-forest text-lg px-8 py-4 h-auto backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]"
              >
                Wholesale Inquiries
              </Button>
            </Link>
          </motion.div>

          {/* Stats Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 flex flex-wrap gap-8 border-t border-cream/20 pt-10"
          >
            {[
              { value: "30+", label: "Countries Served" },
              { value: "15+", label: "Years of Heritage" },
              { value: "500T", label: "Tons Exported" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-serif font-bold text-gold">
                  {stat.value}
                </span>
                <span className="text-sm text-cream/60 uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-cream/40 text-xs uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-cream/40 to-transparent" />
      </motion.div>
    </section>
  );
}
