"use client";

import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Globe2 } from "lucide-react";

const navLinks = {
  Products: [
    { label: "CTC Assam Tea", href: "/products?category=tea&type=ctc" },
    { label: "Orthodox Assam Tea", href: "/products?category=tea&type=orthodox" },
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
  "Halal Certified (Select Grades)",
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-12">
          {/* Brand column — wider */}
          <div className="xl:col-span-2 flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center">
                <Leaf className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="text-xl font-serif font-bold text-cream leading-none">
                  SGlobalExporter
                </div>
                <div className="text-xs text-cream/40 tracking-widest uppercase">
                  Premium Tea Export
                </div>
              </div>
            </Link>

            <p className="text-cream/55 text-sm leading-relaxed max-w-xs">
              Curating the finest single-origin Assam teas from the
              Brahmaputra Valley for the global market. Heritage in every
              leaf.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:exports@sglobalexporter.com"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                exports@sglobalexporter.com
              </a>
              <a
                href="tel:+911234567890"
                className="flex items-center gap-3 text-sm text-cream/60 hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                +91 98765 43210
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
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 pt-8 border-t border-cream/10">
          <div className="text-xs font-semibold uppercase tracking-widest text-cream/30 mb-4">
            Certifications & Compliance
          </div>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-4 py-1.5 rounded-full border border-cream/15 text-xs text-cream/50 bg-cream/5"
              >
                ✓ {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Admin Panel Access */}
        <div className="mt-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm md:text-base font-semibold text-gold hover:text-white border border-gold/20 hover:border-white/30 rounded-xl px-5 py-2.5 bg-white/5 hover:bg-white/10 transition-all duration-300 shadow-sm"
          >
            Admin Panel &rarr;
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/35">
          <span>
            © {new Date().getFullYear()} SGlobalExporter. All rights reserved.
          </span>
          <span>
            Crafted with ♥ in Assam, India · Exporting Heritage Globally
          </span>
        </div>
      </div>
    </footer>
  );
}


