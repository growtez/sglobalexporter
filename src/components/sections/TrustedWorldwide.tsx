"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe2, Award, Package, Users } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

const stats = [
  {
    icon: Globe2,
    value: 30,
    suffix: "+",
    label: "Countries Served",
    description: "Shipping premium Assam tea across 6 continents",
    color: "from-amber-500/20 to-yellow-600/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Years of Experience",
    description: "A decade and a half of export excellence",
    color: "from-gold/20 to-yellow-600/10",
    iconColor: "text-gold",
  },
  {
    icon: Package,
    value: 500,
    suffix: "T",
    label: "Tons Exported",
    description: "Half a million kilograms of finest Assam tea",
    color: "from-amber-500/20 to-orange-600/10",
    iconColor: "text-amber-400",
  },
  {
    icon: Users,
    value: 200,
    suffix: "+",
    label: "Happy Clients",
    description: "Trusted by importers, brands & retailers worldwide",
    color: "from-yellow-500/20 to-amber-600/10",
    iconColor: "text-yellow-400",
  },
];

export default function TrustedWorldwide() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="trusted-worldwide"
      ref={sectionRef}
      className="relative py-8 md:py-10 bg-forest overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 20%, #D4AF37 0%, transparent 40%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <span className="text-gold text-sm uppercase tracking-[0.3em] font-medium mb-4 block">
            Our Global Reach
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4">
            Trusted Worldwide
          </h2>
          <div className="h-px w-24 bg-gold mx-auto opacity-60" />
          <p className="mt-6 text-cream/60 max-w-xl mx-auto text-lg font-light">
            Decades of experience connecting Assam's finest gardens with
            connoisseurs and businesses across the globe.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group relative rounded-2xl border border-cream/10 bg-cream/5 backdrop-blur-sm p-8 hover:border-gold/40 hover:bg-cream/10 transition-all duration-500 overflow-hidden"
              >
                {/* Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cream/10 group-hover:bg-cream/20 transition-colors">
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>

                  {/* Value */}
                  <div className="text-5xl md:text-6xl font-serif font-bold text-cream mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <div className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <p className="text-cream/50 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
