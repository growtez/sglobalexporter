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
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group flex flex-col gap-4 cursor-pointer"
        >
            {/* Image Container with subtle zoom on hover */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F9F9F8]">
                <Image
                    src={product.image_url || "/placeholder-tea.jpg"}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Product Details - Minimalist Typography */}
            <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
                    {product.origin}
                </span>
                <div className="flex justify-between items-center">
                    <Link href={`/products/${product.slug}`} className="text-lg font-serif text-stone-900">
                        {product.name}
                    </Link>
                    <span className="text-sm text-stone-900 font-medium">
                        ₹{product.price_per_kg}/kg
                    </span>
                </div>
            </div>
        </motion.div>
    );
}