"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";

export default function CallToAction() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="relative py-8 md:py-10 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-forest/96 via-forest/88 to-charcoal/90" />

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/8 blur-2xl z-10" />

      <div className="relative z-20 container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-gold/40 bg-gold/10">
            <span className="text-gold text-sm font-medium uppercase tracking-widest">
              Start Your Partnership Today
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-cream leading-tight mb-6">
            Ready to Source
            <br />
            <span className="text-gold italic">Premium Assam Tea</span>?
          </h2>

          {/* Sub */}
          <p className="text-xl text-cream/70 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
            Join 200+ global importers, retailers, and hospitality brands
            who trust SGlobalExporter for their premium Assam tea supply.
            Let's build something remarkable together.
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/b2b">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gold text-charcoal hover:bg-gold/90 text-lg px-10 py-4 h-auto font-semibold shadow-xl shadow-gold/20 hover:shadow-gold/40 hover:scale-[1.02] transition-all duration-300"
              >
                Request a Wholesale Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/products?category=tea">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-cream/40 text-cream hover:bg-cream hover:text-forest text-lg px-10 py-4 h-auto backdrop-blur-sm hover:scale-[1.02] transition-all duration-300"
              >
                Browse Our Catalogue
              </Button>
            </Link>
          </motion.div>

          {/* Contact strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 border-t border-cream/15 pt-10"
          >
            <a
              href="mailto:exports@sglobalexporter.com"
              className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">
                exports@sglobalexporter.com
              </span>
            </a>
            <div className="hidden sm:block w-px h-8 bg-cream/20" />
            <a
              href="tel:+911234567890"
              className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">+91 98765 43210</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
