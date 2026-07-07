import { Metadata } from "next";
import Image from "next/image";
import { Leaf, Eye, Users, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Sustainability & Ethical Sourcing | Shahinur Global Exporter",
  description: "Discover our commitment to sustainable agriculture, eco-friendly packaging, and community support in the Assam tea region.",
};

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7] dark:bg-[#1C1C1C]">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <span className="uppercase tracking-widest text-sm font-semibold text-gold">Our Commitment</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-forest dark:text-cream leading-tight">
            Sustainability & Ethical Sourcing
          </h1>
          <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We believe that premium Assam tea should not only taste exceptional but should also protect the environment and support the hands that harvest it.
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-md border border-stone-200/50 dark:border-stone-700/50">
          <Image
            src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=2067&auto=format&fit=crop"
            alt="Lush green tea estate in Assam"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-sm uppercase tracking-wider text-gold font-semibold">Assam, India</p>
            <p className="text-lg font-serif">Preserving the soil, empowering the people.</p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200/50 dark:border-stone-700/50 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest dark:text-cream">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-forest dark:text-cream">Eco-Conscious Farming</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              We prioritize sourcing from tea gardens that utilize organic inputs, biological pest control, and rainwater harvesting to ensure soil vitality for generations to come.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200/50 dark:border-stone-700/50 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest dark:text-cream">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-forest dark:text-cream">Ethical Labor Practices</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              We ensure our partner plantations offer fair wages, safe working conditions, access to primary healthcare, and clean drinking water to all tea garden artisans.
            </p>
          </div>

          <div className="bg-white dark:bg-stone-800 p-6 rounded-2xl border border-stone-200/50 dark:border-stone-700/50 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest dark:text-cream">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-forest dark:text-cream">Transparent Sourcing</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
              100% of our teas are traceable back to their origin gardens in Assam. We conduct strict audits to verify chemical compliance, crop freshness, and storage conditions.
            </p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white dark:bg-stone-800 p-8 sm:p-12 shadow-sm rounded-2xl border border-stone-200/60 dark:border-stone-700/60 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-forest dark:text-cream">Towards a Greener Supply Chain</h2>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-light">
              At Shahinur Global Exporter, we recognize that the international shipping and transport of tea leaves a carbon footprint. To offset this and build a greener supply chain, we are proactively transitioning our processes in the following areas:
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">1</span>
              <div>
                <h4 className="font-bold text-stone-800 dark:text-stone-100">Biodegradable & Smart Packaging</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mt-1">
                  We are working with leading manufacturers to supply biodegradable tea bags and compostable inner foils. Our export cartons are made of 100% recycled paperboard.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">2</span>
              <div>
                <h4 className="font-bold text-stone-800 dark:text-stone-100">Preserving Bio-Diversity</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mt-1">
                  Our sourcing network includes tea estates that actively cultivate buffer forest zones around tea gardens. This acts as a natural habitat preserve for northeastern wildlife.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-xs flex-shrink-0 mt-1">3</span>
              <div>
                <h4 className="font-bold text-stone-800 dark:text-stone-100">Supporting Small Growers</h4>
                <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed mt-1">
                  We empower independent, small-holder tea farmers in Assam by providing direct market access, minimizing middleman exploitation, and providing education on sustainable harvest yields.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
