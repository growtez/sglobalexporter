"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sprout,
  FlaskConical,
  Package,
  FileText,
  Ship,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Sprout,
    title: "Tea Sourcing",
    tagline: "Garden-to-Gate Transparency",
    description:
      "We begin at the estate. Our sourcing team evaluates gardens across Assam's premier tea-growing districts — Dibrugarh, Jorhat, Golaghat, and Tinsukia — assessing soil health, cultivation practices, and flush quality before any agreement is made.",
    detail: [
      "Estate inspections by certified tasters",
      "Seasonal flush monitoring (First, Second, Autumn)",
      "Direct estate partnerships — no brokers",
      "Traceability from garden to invoice",
    ],
    color: "bg-forest",
    lightColor: "bg-forest/5",
    textColor: "text-forest",
  },
  {
    id: 2,
    icon: FlaskConical,
    title: "Quality Testing",
    tagline: "Lab-Grade Precision",
    description:
      "Every batch undergoes rigorous physical and chemical testing at accredited laboratories. We check for pesticide residues, heavy metals, moisture content, grade conformity, and cup profile before any consignment is approved.",
    detail: [
      "ISO/IEC 17025 accredited lab testing",
      "Pesticide residue & heavy metal analysis",
      "Organoleptic (sensory) cup evaluation",
      "Moisture, grade & density conformity check",
    ],
    color: "bg-forest",
    lightColor: "bg-forest/5",
    textColor: "text-forest",
  },
  {
    id: 3,
    icon: Package,
    title: "Packaging",
    tagline: "Freshness Sealed In",
    description:
      "Packaging is customised to your requirements — from food-grade multi-wall kraft bags for bulk shipments to premium branded retail packs. All materials are food-safe, moisture-proof, and compliant with destination country regulations.",
    detail: [
      "Bulk: multi-wall foil-lined sacks (5kg–50kg)",
      "Retail: custom branded sachets & caddies",
      "Nitrogen flushing for extended shelf life",
      "Destination-country label compliance",
    ],
    color: "bg-forest",
    lightColor: "bg-forest/5",
    textColor: "text-forest",
  },
  {
    id: 4,
    icon: FileText,
    title: "Documentation",
    tagline: "Zero Compliance Friction",
    description:
      "We manage the complete documentation chain — Phytosanitary Certificates, Certificate of Origin, Tea Board of India Export Permit, Commercial Invoice, and any destination-specific import permits — so your customs clearance is seamless.",
    detail: [
      "Tea Board of India Export Certificate",
      "Phytosanitary Certificate (NPPO)",
      "Certificate of Origin (APEDA / CoC)",
      "FSSAI, EU, FDA & Halal documentation support",
    ],
    color: "bg-forest",
    lightColor: "bg-forest/5",
    textColor: "text-forest",
  },
  {
    id: 5,
    icon: Ship,
    title: "Global Shipping",
    tagline: "On-Time, Every Time",
    description:
      "We work with tier-1 freight forwarders and leading ocean / air carriers to ensure your consignment is tracked, insured, and delivered on schedule. Real-time tracking links are shared with you from booking to delivery.",
    detail: [
      "FCL / LCL ocean freight & air freight",
      "Marine cargo insurance included",
      "Real-time shipment tracking portal",
      "30+ country distribution network",
    ],
    color: "bg-forest",
    lightColor: "bg-forest/5",
    textColor: "text-forest",
  },
];

export default function ExportProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(1);

  const active = steps.find((s) => s.id === activeStep)!;

  return (
    <section
      id="export-process"
      ref={ref}
      className="py-8 md:py-10 bg-cream overflow-hidden"
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
            How It Works
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-forest mb-4">
            Our Export Process
          </h2>
          <div className="h-px w-24 bg-gold mx-auto opacity-60 mt-6" />
          <p className="mt-6 text-stone-500 max-w-xl mx-auto text-lg font-light">
            A seamless five-step journey from Assam's tea gardens to your
            destination — handled with precision at every stage.
          </p>
        </motion.div>

        {/* Step Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === activeStep;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? `${step.color} text-white border-transparent shadow-md`
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{step.title}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Active Step Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left: Visual indicator */}
            <div className="relative">
              {/* Step number */}
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${active.color} mb-8 shadow-lg`}
              >
                {(() => {
                  const Icon = active.icon;
                  return <Icon className="w-10 h-10 text-white" />;
                })()}
              </div>

              {/* Step counter */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-5xl font-serif font-bold ${active.textColor} opacity-30`}>
                  0{active.id}
                </span>
                <div className="flex-1 h-px bg-stone-200" />
                <span className="text-stone-400 text-sm">of 05</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-serif font-bold text-forest mb-2">
                {active.title}
              </h3>
              <p className={`text-sm font-semibold uppercase tracking-widest ${active.textColor} mb-6`}>
                {active.tagline}
              </p>
              <p className="text-stone-600 text-lg font-light leading-relaxed mb-8">
                {active.description}
              </p>

              {/* Navigation arrows */}
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                  disabled={activeStep === 1}
                  className="w-12 h-12 rounded-xl border border-stone-200 flex items-center justify-center hover:border-forest hover:text-forest disabled:opacity-30 transition-all"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={() => setActiveStep((prev) => Math.min(steps.length, prev + 1))}
                  disabled={activeStep === steps.length}
                  className="w-12 h-12 rounded-xl border border-stone-200 flex items-center justify-center hover:border-forest hover:text-forest disabled:opacity-30 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right: Detail list */}
            <div className={`rounded-3xl ${active.lightColor} p-8 md:p-10 border border-stone-100`}>
              <div className="text-sm font-semibold uppercase tracking-widest text-stone-400 mb-6">
                What this step covers
              </div>
              <ul className="flex flex-col gap-4">
                {active.detail.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full ${active.color} flex items-center justify-center`}
                    >
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-stone-700 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Progress dots */}
              <div className="flex gap-2 mt-10">
                {steps.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStep(s.id)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      s.id === activeStep
                        ? `${active.color} w-8`
                        : "w-2 bg-stone-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
