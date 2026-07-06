"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Leaf,
  Globe2,
  ShieldCheck,
  DollarSign,
  Clock,
} from "lucide-react";

const reasons = [
  {
    icon: Leaf,
    title: "Direct Sourcing",
    description:
      "We partner exclusively with certified estate owners in Assam, bypassing middlemen for maximum freshness, authentic provenance, and fair pricing.",
    accent: "bg-amber-50 text-amber-700 border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    number: "01",
  },
  {
    icon: Globe2,
    title: "Export Expertise",
    description:
      "15+ years navigating international trade — including FSSAI, FDA, and EU compliance. We handle all regulatory documentation seamlessly.",
    accent: "bg-yellow-50 text-yellow-800 border-yellow-200",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-700",
    number: "02",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "Multi-stage quality checks: garden inspection, batch sampling, lab testing for pesticide residues, moisture, and grade conformity before every shipment.",
    accent: "bg-gold/10 text-amber-700 border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    number: "03",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description:
      "Our direct-estate model means lower overheads and better margins for you. Volume-based tiered pricing and long-term partnership rates available.",
    accent: "bg-orange-50 text-orange-700 border-orange-200",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    number: "04",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description:
      "We commit to delivery timelines and honour them. With robust freight partnerships and pre-shipment planning, your consignment arrives on schedule.",
    accent: "bg-red-50 text-red-700 border-red-200",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    number: "05",
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-choose-us"
      ref={ref}
      className="py-8 md:py-10 relative overflow-hidden bg-forest"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(60deg, transparent, transparent 60px, rgba(212,175,55,0.4) 60px, rgba(212,175,55,0.4) 61px)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-8"
        >
          <span className="text-gold text-sm uppercase tracking-[0.3em] font-medium mb-4 block">
            Our Difference
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-cream mb-6">
            Why Choose
            <br />
            <span className="text-gold italic">SGlobalExporter?</span>
          </h2>
          <div className="h-px w-24 bg-gold opacity-60" />
          <p className="mt-6 text-cream/60 text-lg font-light leading-relaxed">
            We're not just another tea exporter. We are a heritage-driven
            company committed to delivering excellence at every step.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-2xl bg-cream/5 border border-cream/10 p-8 hover:bg-cream/10 hover:border-gold/40 transition-all duration-500 overflow-hidden"
              >
                {/* Large number in background */}
                <div className="absolute -top-4 -right-2 text-[7rem] font-serif font-bold text-cream/5 leading-none select-none">
                  {reason.number}
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cream/10 group-hover:bg-gold/20 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-cream mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>

                {/* Bottom hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: reasons.length * 0.1 }}
            className="rounded-2xl bg-gold p-8 flex flex-col justify-between"
          >
            <div>
              <div className="text-charcoal/60 text-sm uppercase tracking-widest mb-3">
                Ready to Partner?
              </div>
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
                Let's Build a Lasting Trade Relationship
              </h3>
              <p className="text-charcoal/70 text-sm leading-relaxed">
                Minimum order from 50kg. Custom blends, private labels, and
                dedicated account management available.
              </p>
            </div>
            <a
              href="/contact#inquiry-form"
              className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-charcoal text-cream rounded-xl font-semibold text-sm hover:bg-forest transition-colors duration-300"
            >
              Request a Quote →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
