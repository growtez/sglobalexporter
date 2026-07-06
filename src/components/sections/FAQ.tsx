"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "What is the minimum order quantity (MOQ) for export?",
    answer:
      "Our minimum order for export is 50kg per variety. For bulk ocean freight, we typically recommend 500kg+ for cost-effectiveness. We accommodate smaller quantities for samples and new clients via air freight.",
  },
  {
    id: 2,
    question: "Which countries do you currently export to?",
    answer:
      "We currently export to 30+ countries across Europe (UK, Germany, France, Netherlands), North America (USA, Canada), Middle East (UAE, Saudi Arabia, Kuwait), Asia (Japan, Singapore, Malaysia, South Korea), Australia, and select African markets. Contact us for specific country eligibility.",
  },
  {
    id: 3,
    question: "What certifications do your teas carry?",
    answer:
      "Our teas are certified by the Tea Board of India and carry FSSAI compliance. We support USDA Organic, EU Organic, Rainforest Alliance, and Fairtrade certifications — specific certification availability depends on the estate and variety. Please enquire for your requirement.",
  },
  {
    id: 4,
    question: "Do you offer private label / custom packaging?",
    answer:
      "Yes! We offer complete private label services including custom blending, packaging design, and branded packaging at MOQs of 200kg+. We handle food-grade packaging with your branding from concept to final product.",
  },
  {
    id: 5,
    question: "What are your standard payment terms?",
    answer:
      "Standard terms are 30% advance with order confirmation and 70% against Bill of Lading for new clients. Established clients with good order history may qualify for Net-30 or Letter of Credit terms. We accept T/T, L/C, and select trade finance instruments.",
  },
  {
    id: 6,
    question: "How long does shipping typically take?",
    answer:
      "Ocean freight: 10–30 days depending on destination (UK, EU ~18-25 days; UAE ~10-15 days; USA ~25-30 days). Air freight: 3–7 days for urgent orders. We share real-time tracking from shipment booking to delivery.",
  },
  {
    id: 7,
    question: "Can I request samples before placing a bulk order?",
    answer:
      "Absolutely. We offer 50-100g cupping samples of any available tea grade. Sample charges apply (typically ₹500-1500 per sample + courier) and are fully deductible against your first order above 100kg.",
  },
  {
    id: 8,
    question: "How do you ensure quality consistency across batches?",
    answer:
      "We maintain reference samples (counter-samples) of every approved batch. Each new production lot is compared against your approved reference before dispatch. Any grade deviation is reported and resolved before shipment — guaranteed.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => setOpenId((curr) => (curr === id ? null : id));

  return (
    <section
      id="faq"
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
            Got Questions?
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-forest mb-4">
            Frequently Asked
            <br />
            Questions
          </h2>
          <div className="h-px w-24 bg-gold mx-auto opacity-60 mt-6" />
          <p className="mt-6 text-stone-500 max-w-xl mx-auto text-lg font-light">
            Everything you need to know about our export process, quality
            standards, and partnership model.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="rounded-2xl bg-white border border-stone-100 hover:border-gold/30 overflow-hidden transition-colors duration-300 shadow-sm"
            >
              {/* Question */}
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span className="font-semibold text-forest text-base leading-snug">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-forest/5 flex items-center justify-center transition-colors group-hover:bg-forest/10">
                  {openId === faq.id ? (
                    <Minus className="w-4 h-4 text-forest" />
                  ) : (
                    <Plus className="w-4 h-4 text-forest" />
                  )}
                </span>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="h-px bg-stone-100 mb-4" />
                      <p className="text-stone-600 text-base leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-stone-500 mb-4">Still have questions?</p>
          <a
            href="mailto:shahinur23287@gmail.com"
            className="inline-flex items-center gap-2 text-forest font-semibold hover:text-gold transition-colors text-lg"
          >
            shahinur23287@gmail.com →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
