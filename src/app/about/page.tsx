"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full bg-forest flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-forest/80 z-10" />
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1563889362-ec00b9021c11?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" 
          aria-hidden="true" 
        />
        
        <div className="container mx-auto px-4 md:px-8 relative z-20 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="uppercase tracking-[0.3em] text-sm font-semibold text-gold mb-4">
              Est. Generations Ago
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-cream mb-6 leading-tight">
              Our Heritage & Story
            </h1>
            <div className="h-1 w-24 bg-gold mb-8"></div>
            <p className="text-lg md:text-xl text-cream/90 font-light max-w-2xl leading-relaxed">
              Rooted in the fertile valleys of the Brahmaputra, SGlobalExporter bridges the gap between Assam's ancient agricultural legacy and the global connoisseur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Journey Section */}
      <section className="py-24 bg-cream text-charcoal">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <span className="uppercase tracking-widest text-sm font-semibold text-gold">The Genesis</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-forest">Cultivating a Legacy</h2>
              <p className="text-stone-600 leading-relaxed font-light text-lg">
                For centuries, the state of Assam has been celebrated worldwide for its unparalleled natural bounty. The heavy rainfall, humid climate, and rich alluvial soil deposits of the Brahmaputra River valley create an unmatched terroir, perfect for cultivating the finest teas and unique heritage rice grains.
              </p>
              <p className="text-stone-600 leading-relaxed font-light">
                SGlobalExporter was founded with a singular, passionate mission: to share this rich agricultural heritage directly with the world. We partner with multigenerational tea gardens and traditional local farmers who have guarded these cultivation secrets for generations, ensuring every leaf and grain reflects the true spirit of Assam.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-stone-200"
            >
              <Image 
                src="https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=2067&auto=format&fit=crop" 
                alt="Lush green tea estate in Assam" 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dual Focus: Tea & Rice */}
      <section className="py-24 bg-white border-y border-stone-100">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="uppercase tracking-widest text-sm font-semibold text-gold">Two Pillars of Excellence</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-forest mt-2">Grown by Nature, Perfected by Tradition</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Assam Tea */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1576092762791-dd9e222046d8?q=80&w=2070&auto=format&fit=crop" 
                  alt="Brewing premium Assam tea" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-forest">The Gold Standard of Tea</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Assam tea is globally renowned for its body, briskness, malty flavor, and strong, bright color. Sourced from choice tea estates, our collection includes orthodox whole leaf teas rich in golden tips, and robust CTC blends. Every cup tells a story of meticulous plucking and processing.
              </p>
              <Link href="/products?category=tea" className="text-gold font-medium hover:text-forest transition-colors inline-flex items-center gap-2">
                Explore Tea Collection &rarr;
              </Link>
            </motion.div>

            {/* Premium Rice */}
            <motion.div 
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-md">
                <Image 
                  src="https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=2070&auto=format&fit=crop" 
                  alt="Premium Assamese Heritage Rice grains" 
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold text-forest">The Sacred Heritage Grains</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                From the exquisite Joha rice, known for its delicate aroma and taste, to nutrient-dense varieties cultivated in the wetlands, Assam's heritage rice is unlike any other. We preserve the organic, age-old farming practices to bring you grains that are rich in culture and taste.
              </p>
              <Link href="/products?category=rice" className="text-gold font-medium hover:text-forest transition-colors inline-flex items-center gap-2">
                Explore Rice Collection &rarr;
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-forest text-cream">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="uppercase tracking-widest text-sm font-semibold text-gold">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">What Guides SGlobalExporter</h2>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <motion.div variants={fadeInUp} className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-gold/30 transition-all duration-300">
              <div className="text-gold text-3xl font-serif mb-4">01</div>
              <h4 className="text-xl font-serif font-semibold mb-3">Direct & Fair Sourcing</h4>
              <p className="text-cream/70 font-light text-sm leading-relaxed">
                We work directly with growers and smallholder cooperatives, cutting out middlemen. This ensures fair pricing for farmers and total transparency for our clients.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-gold/30 transition-all duration-300">
              <div className="text-gold text-3xl font-serif mb-4">02</div>
              <h4 className="text-xl font-serif font-semibold mb-3">Authentic Preservation</h4>
              <p className="text-cream/70 font-light text-sm leading-relaxed">
                By supporting heritage crops and traditional processing methods, we ensure that Assam's agricultural diversity and ancestral expertise do not disappear.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-gold/30 transition-all duration-300">
              <div className="text-gold text-3xl font-serif mb-4">03</div>
              <h4 className="text-xl font-serif font-semibold mb-3">Global Quality</h4>
              <p className="text-cream/70 font-light text-sm leading-relaxed">
                We implement rigorous quality checks, from estate sorting to moisture-proof export packaging, meeting international standards without compromising on raw essence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Corporate Registration Details */}
      <section className="py-24 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="uppercase tracking-widest text-sm font-semibold text-gold">Official Registration</span>
            <h2 className="text-3xl font-serif font-bold text-forest mt-2">Corporate Identity & Details</h2>
          </div>

          <div className="bg-cream/40 p-8 md:p-12 rounded-2xl border border-stone-200/80 shadow-sm space-y-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-forest mb-4">SHAHINUR GLOBAL EXPORTER (OPC) PRIVATE LIMITED</h3>
              <p className="text-stone-600 leading-relaxed font-light">
                SHAHINUR GLOBAL EXPORTER (OPC) PRIVATE LIMITED operates as a One Person Company (OPC) limited by shares, registered under the Registrar of Companies (ROC) Guwahati, serving the North Eastern Region.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-6 border-t border-stone-200/60">
              <div className="space-y-4">
                <h4 className="font-serif text-lg text-forest font-semibold border-b border-stone-200/60 pb-2">Basic Information</h4>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">Corporate Identity Number (CIN):</span>
                  <span className="font-mono text-stone-600">U46909AS2025OPC028000</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">Class:</span>
                  <span className="text-stone-600">One Person Company</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">Category:</span>
                  <span className="text-stone-600">Company limited by shares</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">Date of Incorporation:</span>
                  <span className="text-stone-600">12/04/2025</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">Registered Address:</span>
                  <span className="text-stone-600 leading-relaxed">C/O SHAHINUR ISLAM, NANDIA, Kalapani, Dhubri, Fekamari, Assam, India, 783135</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-serif text-lg text-forest font-semibold border-b border-stone-200/60 pb-2">Registration & Financials</h4>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">Registration Number:</span>
                  <span className="text-stone-600">28000</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">ROC Name:</span>
                  <span className="text-stone-600">ROC Guwahati</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">RD Name & Region:</span>
                  <span className="text-stone-600">RD, North Eastern Region</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">Authorized Capital:</span>
                  <span className="text-stone-600">Rs. 1,00,000</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">Paid-up Capital:</span>
                  <span className="text-stone-600">Rs. 10,000</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-1">
                  <span className="font-semibold text-stone-700">Listed Status:</span>
                  <span className="text-stone-600">Unlisted (No)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-forest mb-6">Experience Assam's Finest</h2>
          <p className="text-stone-600 mb-10 font-light max-w-xl mx-auto">
            Bring the exceptional taste and history of Assam to your store, hotel, or table. Explore our catalog or speak to our team for custom wholesale orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto bg-gold text-charcoal hover:bg-gold/90 px-8">
                Browse Products
              </Button>
            </Link>
            <Link href="/b2b">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-forest text-forest hover:bg-forest hover:text-cream px-8">
                Wholesale Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
