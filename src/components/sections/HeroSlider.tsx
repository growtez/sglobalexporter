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
    <div className="w-full flex relative z-10">
      <div 
        ref={scrollRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {products.map((product, idx) => (
          <div 
            key={idx} 
            className="aspect-square w-[70vw] sm:w-[40vw] md:w-[20%] lg:w-1/6 flex-shrink-0 snap-center relative group cursor-pointer overflow-hidden border-r border-white/10"
          >
            <Image 
              src={product.img} 
              alt={product.name} 
              fill 
              sizes="(max-width: 768px) 70vw, 20vw" 
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
            
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-4 pt-16 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="font-bold text-white text-sm md:text-base tracking-wide">{product.name}</h3>
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                <Button className="bg-white text-black hover:bg-gray-100 text-xs h-8 px-5 rounded-full font-semibold shadow-lg">Get Quote</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
