"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSlider({ products }: { products: { name: string, img: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // If reached the end (or near the end), scroll back to the start smoothly
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Auto-scroll by the width of one card
          const cardWidth = scrollRef.current.children[0]?.clientWidth || clientWidth;
          scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex h-[250px] md:h-[400px] relative z-10">
      <div 
        ref={scrollRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {products.map((product, idx) => (
          <div 
            key={idx} 
            className="w-[85vw] sm:w-[50vw] md:w-1/4 flex-shrink-0 snap-center relative group cursor-pointer overflow-hidden border-r border-white/10"
          >
            <Image 
              src={product.img} 
              alt={product.name} 
              fill 
              sizes="(max-width: 768px) 85vw, 25vw" 
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-bold text-white text-xl tracking-wide">{product.name}</h3>
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <Button className="bg-white text-black hover:bg-gray-100 text-xs h-9 px-6 rounded-full font-semibold shadow-lg">Get Quote</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
