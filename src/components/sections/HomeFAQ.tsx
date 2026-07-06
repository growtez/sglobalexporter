"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    id: 1,
    question: "What is the year of establishment of Shahinur Global Exporter (OPC) Private Limited?",
    answer: "The establishment year of Shahinur Global Exporter (OPC) Private Limited is 2023. Since its inception, the company has been engaged in business activities focused on customer satisfaction and premium tea exports globally."
  },
  {
    id: 2,
    question: "What are the main products offered by Shahinur Global Exporter?",
    answer: "We specialize in premium teas including CTC Tea, Orthodox Tea, Green Tea, White Tea, and select Golden Tips blends."
  },
  {
    id: 3,
    question: "Where is Shahinur Global Exporter located?",
    answer: "Our registered office is located in Assam, India. Specifically, our address is HN 27, Hatigarh Chariali, Guwahati, Kamrup Metropolitan, Assam - 781038."
  },
  {
    id: 4,
    question: "Which payment methods do you accept for foreign transactions?",
    answer: "For international payments, we use Razorpay X to ensure safe, secure, and instant global transactions. We also support standard wire transfers (T/T) and Letter of Credit (L/C) for bulk shipments."
  },
  {
    id: 5,
    question: "How can international buyers contact you for bulk orders?",
    answer: "International buyers can fill out the 'Send an Inquiry' form directly on our website or email us at shahinur23287@gmail.com. Our export team will get back to you within 24 hours with a custom quote."
  }
];

import Link from "next/link";

export default function HomeFAQ({ limit }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayedFaqs = limit ? faqData.slice(0, limit) : faqData;

  return (
    <section className="w-full bg-stone-50/50 py-8 md:py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] opacity-50 -z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] opacity-50 -z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-forest mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-500">Everything you need to know about Shahinur Global Exporter.</p>
        </div>
        
        <div className="space-y-4">
          {displayedFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id} 
                className={`bg-white rounded-2xl border border-gray-100 hover:border-gold/30 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden`}
              >
                <div 
                  onClick={() => toggleFaq(index)}
                  className={`p-6 flex justify-between items-start cursor-pointer transition-colors ${
                    isOpen ? "bg-[#FAF7F0]" : "bg-white hover:bg-stone-50/20"
                  }`}
                >
                  <div className="flex gap-4 items-start pr-8">
                    <span className={`font-black text-xl mt-0.5 ${isOpen ? "text-gold opacity-40" : "text-gray-300"}`}>
                      0{faq.id}
                    </span>
                    <h3 className={`font-semibold text-base mt-1 ${isOpen ? "text-forest font-bold" : "text-stone-850"}`}>
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner transition-colors ${
                    isOpen ? "bg-gold/10 text-gold" : "bg-gray-50 text-gray-400"
                  }`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
                {isOpen && (
                  <div className="px-6 pb-6 pl-14 text-sm text-gray-600 leading-relaxed pr-10 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {limit && (
          <div className="mt-8 text-center">
            <Link href="/contact#faq-section">
              <Button variant="link" className="text-gold font-semibold flex items-center justify-center mx-auto gap-1">
                View all FAQs <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
