"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface HeroProduct {
  id?: string;
  name: string;
  img: string;
  slug: string;
}

export default function HeroSlider({ products }: { products: HeroProduct[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const cardWidth = scrollRef.current.children[0]?.clientWidth || clientWidth;
        const halfWidth = scrollWidth / 2;

        // If we are at the end of the doubled list, instantly jump back to the first half
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollRef.current.scrollLeft = scrollLeft - halfWidth;
        }

        // Scroll forward smoothly by one card width
        scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, [products]);

  return (
    <div 
      className="w-full flex relative z-10"
      onMouseEnter={() => { isPausedRef.current = true; }}
      onMouseLeave={() => { isPausedRef.current = false; }}
      onTouchStart={() => { isPausedRef.current = true; }}
      onTouchEnd={() => { isPausedRef.current = false; }}
      onTouchCancel={() => { isPausedRef.current = false; }}
    >
      <div 
        ref={scrollRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {[...products, ...products].map((product, idx) => (
          <Link 
            key={idx} 
            href={`/products/${product.slug}`}
            className="aspect-square w-[70vw] sm:w-[40vw] md:w-[20%] lg:w-1/6 flex-shrink-0 snap-center relative group cursor-pointer overflow-hidden border-r border-white/10"
          >
            <Image 
              src={product.img} 
              alt={product.name} 
              fill 
              sizes="(max-width: 768px) 70vw, 20vw" 
              unoptimized
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            {/* Lightweight image overlay for default brightness */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/45 transition-colors duration-300"></div>
            
            {/* Slim, bottom-aligned gradient and text */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-3 pt-10 text-center">
              <h3 className="font-bold text-white text-xs md:text-sm tracking-wide drop-shadow-lg">{product.name}</h3>
              <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
                <Button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const input = document.getElementById("homepage-product-input") as HTMLInputElement | null;
                    const inquirySection = document.getElementById("inquiry");
                    if (input && inquirySection) {
                      input.value = product.name;
                      inquirySection.scrollIntoView({ behavior: "smooth" });
                      setTimeout(() => input.focus(), 600);
                    } else {
                      router.push(`/contact?product=${encodeURIComponent(product.name)}#inquiry-form`);
                    }
                  }}
                  className="bg-white text-black hover:bg-gray-100 text-[10px] h-7 px-4 rounded-full font-bold shadow-lg"
                >
                  Get Quote
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All — fixed button on the right edge */}
      <Link
        href="/products"
        className="absolute right-0 top-0 h-full flex flex-col items-center justify-center gap-2 w-16 md:w-20 bg-gradient-to-l from-black/70 via-black/40 to-transparent z-10 group"
      >
        <div className="flex flex-col items-center gap-2 text-white group-hover:scale-110 transition-transform duration-300">
          <div className="w-9 h-9 rounded-full border-2 border-white/60 group-hover:border-gold group-hover:bg-gold/20 flex items-center justify-center transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:text-gold transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-white/80 group-hover:text-gold transition-colors text-center leading-tight">
            View<br />All
          </span>
        </div>
      </Link>
    </div>
  );
}
