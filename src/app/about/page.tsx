"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { User, Building2, Briefcase } from "lucide-react";

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
              <span className="uppercase tracking-widest text-sm font-semibold text-gold">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-forest">Shahinur Global Exporter (OPC) Private Limited</h2>
              <p className="text-stone-600 leading-relaxed font-light text-lg">
                Established in the year 2023, we Manufacturer, Exporter, Supplier & Trader of premium teas.
              </p>
              <p className="text-stone-600 leading-relaxed font-light">
                Under the supervision of Mr. Shahinur Islam, our firm is achieving heights of achievement. We also provide various amenities to the patrons to put their demands forward and get them solve timely and as per their requirements.
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

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 text-amber-700 group-hover:scale-110 group-hover:bg-amber-700 group-hover:text-white transition-all duration-300 shadow-sm relative z-10">
                <User className="w-7 h-7" />
              </div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1.5 relative z-10">Founder</p>
              <p className="font-bold text-gray-800 text-sm relative z-10">Mr. Shahinur Islam</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-4 text-amber-700 group-hover:scale-110 group-hover:bg-amber-700 group-hover:text-white transition-all duration-300 shadow-sm relative z-10">
                <Building2 className="w-7 h-7" />
              </div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1.5 relative z-10">Established</p>
              <p className="font-bold text-gray-800 text-sm relative z-10">2023</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center mb-4 text-orange-700 group-hover:scale-110 group-hover:bg-orange-700 group-hover:text-white transition-all duration-300 shadow-sm relative z-10">
                <Briefcase className="w-7 h-7" />
              </div>
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1.5 relative z-10">Business Type</p>
              <p className="font-bold text-gray-800 text-sm relative z-10">Manufacturer</p>
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

      {/* Factsheet Section */}
      <section className="py-24 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="uppercase tracking-widest text-sm font-semibold text-gold">Factsheet</span>
            <h2 className="text-3xl font-serif font-bold text-forest mt-2">Company Information & Offices</h2>
          </div>

          <div className="bg-cream/40 p-8 md:p-12 rounded-2xl border border-stone-200/80 shadow-sm space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-4">
                <h4 className="font-serif text-xl text-forest font-bold border-b border-stone-200/60 pb-2">Basic Information</h4>
                <div className="grid grid-cols-2 text-sm py-2 border-b border-stone-100/50 last:border-0 gap-4">
                  <span className="font-semibold text-stone-700">Nature of Business:</span>
                  <span className="text-stone-600 font-medium">Manufacturer / Exporter / Supplier</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-2 border-b border-stone-100/50 last:border-0 gap-4">
                  <span className="font-semibold text-stone-700">Contact Person:</span>
                  <span className="text-stone-600 font-medium">Mr. Shahinur Islam</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-2 border-b border-stone-100/50 last:border-0 gap-4">
                  <span className="font-semibold text-stone-700">Total Number of Employees:</span>
                  <span className="text-stone-600 font-medium">6 - 20</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-2 border-b border-stone-100/50 last:border-0 gap-4">
                  <span className="font-semibold text-stone-700">Year of Establishment:</span>
                  <span className="text-stone-600 font-medium">2023</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-2 border-b border-stone-100/50 last:border-0 gap-4">
                  <span className="font-semibold text-stone-700">Legal Status of Firm:</span>
                  <span className="text-stone-600 font-medium">Individual (Sole proprietorship)</span>
                </div>
                <div className="grid grid-cols-2 text-sm py-2 border-b border-stone-100/50 last:border-0 gap-4">
                  <span className="font-semibold text-stone-700">Registered Address:</span>
                  <span className="text-stone-600 font-medium leading-relaxed">HN 27, Hatigarh Chariali, Guwahati, Kamrup Metropolitan, Assam - 781038</span>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <h4 className="font-serif text-lg text-forest font-semibold border-b border-stone-200/60 pb-1">Head Office</h4>
                  <p className="text-sm font-medium text-stone-600 leading-relaxed">HN 27, Hatigarh Chariali, Guwahati, Kamrup Metropolitan, Assam - 781038</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-serif text-lg text-forest font-semibold border-b border-stone-200/60 pb-1">Corporate Office</h4>
                  <p className="text-sm font-medium text-stone-600 leading-relaxed">HN 27, Hatigarh Chariali, Guwahati, Kamrup Metropolitan, Assam - 781038</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-lg text-forest font-semibold border-b border-stone-200/60 pb-1">Warehouse</h4>
                  <p className="text-sm font-medium text-stone-600 leading-relaxed">HN 27, Hatigarh Chariali, Guwahati, Kamrup Metropolitan, Assam - 781038</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-lg text-forest font-semibold border-b border-stone-200/60 pb-1">Technical Support</h4>
                  <p className="text-sm font-medium text-stone-600 leading-relaxed">HN 27, Hatigarh Chariali, Guwahati, Kamrup Metropolitan, Assam - 781038</p>
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
