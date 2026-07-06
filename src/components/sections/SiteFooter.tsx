"use client";

import Link from "next/link";
import Image from "next/image";
import { Leaf, Mail, Phone, MapPin, Globe2 } from "lucide-react";

const navLinks = {
  Products: [
    { label: "CTC Tea", href: "/products?category=tea&type=ctc" },
    { label: "Orthodox Tea", href: "/products?category=tea&type=orthodox" },
    { label: "Green Tea", href: "/products?category=tea&type=green" },
    { label: "White Tea", href: "/products?category=tea&type=white" },
    { label: "Golden Tips", href: "/products?category=tea&type=golden" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Heritage", href: "/about#heritage" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Certifications", href: "/about#certifications" },
  ],
  Trade: [
    { label: "Wholesale / B2B", href: "/b2b" },
    { label: "Export Process", href: "/#export-process" },
    { label: "Request a Sample", href: "/b2b#sample" },
    { label: "Contact Us", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Refund Policy", href: "/refunds" },
  ],
};

const certifications = [
  "Tea Board of India Certified",
  "FSSAI Licensed",
  "APEDA Registered",
];

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: "in" },
  { label: "Instagram", href: "#", icon: "ig" },
  { label: "WhatsApp", href: "#", icon: "wa" },
];

export default function SiteFooter() {
  return (
    <footer className="w-full bg-charcoal text-cream">
      {/* Main footer */}
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-6 gap-x-6 gap-y-12">
          {/* Brand column — wider */}
          <div className="col-span-2 xl:col-span-2 flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-0.5 relative overflow-hidden group-hover:scale-105 transition-transform">
                <Image 
                  src="/images/logo.png" 
                  alt="SGlobalExporter Logo" 
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <div className="text-xl font-serif font-bold text-cream leading-none">
                  Shahinur Global Exporter
                </div>
                <div className="text-xs text-cream/40 tracking-widest uppercase mt-1">
                  Premium Tea Exporters
                </div>
              </div>
            </Link>

            <p className="text-cream/55 text-sm leading-relaxed max-w-xs">
              Established in 2023, we are a leading Manufacturer, Exporter, Supplier & Trader of premium teas for the global market.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@sglobalexporter.com"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                info@sglobalexporter.com
              </a>
              <a
                href="tel:+910000000000"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                +91 00000 00000
              </a>
              <div className="flex items-start gap-3 text-sm text-cream/60">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>
                  Dibrugarh, Assam, India — 786001
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-cream/60">
                <Globe2 className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Exporting to 30+ countries worldwide</span>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-cream/8 hover:bg-gold hover:text-charcoal flex items-center justify-center text-xs font-bold text-cream/60 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(navLinks).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold uppercase tracking-widest text-cream/40">
                {category}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-cream/60 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {category === "Legal" && (
                <div className="mt-8">
                  <h4 className="text-sm font-semibold uppercase tracking-widest text-cream/40 mb-3">
                    Certifications & Compliance
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {certifications.map((cert) => (
                      <li key={cert} className="text-xs text-cream/60 flex items-start gap-1.5 leading-snug">
                        <span className="text-gold">✓</span> {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col items-center justify-center gap-2.5 text-xs text-cream/40 text-center">
          <p>
            © {new Date().getFullYear()} Shahinur Global Exporter. All rights reserved.
          </p>
          <p>
            Made by <a href="https://growtez.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white font-medium transition-colors">Growtez</a>
          </p>
        </div>
      </div>
    </footer>
  );
}


