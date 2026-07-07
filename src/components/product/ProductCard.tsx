"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cartStore";
import { ShoppingCart, MessageSquare, CheckCircle2 } from "lucide-react";

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
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price_per_kg: product.price_per_kg,
            quantity_kg: 10, // Assuming 10kg as default MOQ based on PDP
            image_url: product.image_url ? product.image_url.split(",")[0] : "/placeholder-tea.jpg",
            slug: product.slug,
            unit: "Kilograms (kg)",
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <motion.div
            onClick={() => router.push(`/products/${product.slug}`)}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-stone-100 cursor-pointer h-full relative flex-1"
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
            <div className="flex flex-col p-4 flex-1">
                {product.origin && product.origin !== "Assam, India" && (
                    <span className="text-[9px] font-medium text-stone-500 mb-1 uppercase tracking-wider">
                        {product.origin}
                    </span>
                )}
                <span className="text-sm font-bold text-stone-900 line-clamp-2 min-h-[40px] leading-tight mb-2">
                    {product.name}
                </span>

                <span className="text-sm font-bold text-forest mb-4">
                    ₹{product.price_per_kg?.toLocaleString("en-IN")} <span className="text-stone-400 font-medium text-xs">/ kg</span>
                </span>

                {/* CTA Buttons */}
                <div className="flex gap-2 mt-auto">
                    <Button
                        size="sm"
                        className={`flex-1 h-9 font-bold text-xs rounded-lg transition-all duration-300 shadow ${added ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-forest hover:bg-forest/90 text-white"}`}
                        onClick={handleAddToCart}
                    >
                        {added ? (
                            <><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Added</>
                        ) : (
                            <><ShoppingCart className="w-3.5 h-3.5 mr-1.5" /> Cart</>
                        )}
                    </Button>
                    <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                        <Link href={`/contact?product=${encodeURIComponent(product.name)}#inquiry-form`} className="block w-full">
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full h-9 font-bold text-xs rounded-lg border-forest text-forest hover:bg-forest/5 transition-all px-0"
                            >
                                <MessageSquare className="w-3.5 h-3.5 mr-1.5" /> Quote
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}