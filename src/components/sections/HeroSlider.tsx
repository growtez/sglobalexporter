"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroProduct {
  name: string;
  img: string;
  slug: string;
}

export default function HeroSlider({ products }: { products: HeroProduct[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
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
    <div className="w-full flex relative z-10">
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
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            {/* Lightweight image overlay for default brightness */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/45 transition-colors duration-300"></div>
            
            {/* Slim, bottom-aligned gradient and text */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-3 pt-10 text-center">
              <h3 className="font-bold text-white text-xs md:text-sm tracking-wide drop-shadow-lg">{product.name}</h3>
              <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2 transition-all duration-300">
                <Button className="bg-white text-black hover:bg-gray-100 text-[10px] h-7 px-4 rounded-full font-bold shadow-lg">Get Quote</Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
