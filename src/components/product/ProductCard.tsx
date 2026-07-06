"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        slug: string;
        origin: string;
        price_per_kg: number;
        image_url: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.slug}`} className="block">
            <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-stone-100 cursor-pointer h-full relative"
            >

                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-stone-50">
                    <Image
                        src={product.image_url ? product.image_url.split(",")[0] : "/placeholder-tea.jpg"}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Product Details */}
                <div className="flex flex-col p-2.5 flex-1">
                    {product.origin && product.origin !== "Assam, India" && (
                        <span className="text-[9px] font-medium text-stone-500 mb-0.5 uppercase tracking-wider">
                            {product.origin}
                        </span>
                    )}
                    <span className="text-xs font-bold text-stone-900 line-clamp-2 min-h-[32px] leading-tight">
                        {product.name}
                    </span>
                </div>
            </motion.div>
        </Link>
    );
}