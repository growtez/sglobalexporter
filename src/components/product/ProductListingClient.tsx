"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, ChevronDown, ChevronRight, ArrowDownUp, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/product/ProductGrid";
import { useSearchStore } from "@/lib/store/searchStore";

interface Product {
    id: string;
    name: string;
    slug: string;
    origin: string;
    price_per_kg: number;
    image_url: string;
    category?: string;
}

export default function ProductListingClient({ initialProducts }: { initialProducts: Product[] }) {
    const { query: searchQuery, setQuery: setSearchQuery } = useSearchStore();
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("featured");

    const categories = ["All", "Tea", "Rice"];

    const getCategoryCount = (category: string) => {
        if (category === "All") return initialProducts.length;
        if (category === "Tea") {
            return initialProducts.filter(
                (p) => p.category?.toLowerCase().includes("tea") || p.name.toLowerCase().includes("tea")
            ).length;
        }
        if (category === "Rice") {
            return initialProducts.filter(
                (p) => p.category?.toLowerCase().includes("rice") || p.name.toLowerCase().includes("rice")
            ).length;
        }
        return 0;
    };

    // Filter and Sort Logic
    const filteredProducts = useMemo(() => {
        let result = initialProducts;

        // 1. Filter by category
        if (activeCategory !== "All") {
            result = result.filter(
                (p) => p.category?.toLowerCase().includes(activeCategory.toLowerCase()) || 
                      (activeCategory === "Tea" && p.name.toLowerCase().includes("tea")) ||
                      (activeCategory === "Rice" && p.name.toLowerCase().includes("rice"))
            );
        }

        // 2. Filter by search query
        if (searchQuery.trim() !== "") {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(
                (p) => p.name.toLowerCase().includes(lowerQuery) || p.origin.toLowerCase().includes(lowerQuery)
            );
        }

        return result;
    }, [initialProducts, searchQuery, activeCategory]);

    return (
        <div className="flex flex-col gap-6 pt-4">

            {/* Main Layout Area */}
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Desktop Sidebar (visible on md+) */}
                <div className="hidden md:flex flex-col w-56 shrink-0 gap-6">
                    {/* Desktop Category Menu (Nike style vertical list) */}
                    <div className="flex flex-col gap-3.5 pl-1">
                        <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-1">
                            Categories
                        </h3>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`text-left text-sm font-medium transition-colors hover:text-forest ${
                                    activeCategory === cat 
                                    ? "text-forest font-bold border-l-2 border-forest pl-2 -ml-2" 
                                    : "text-stone-600"
                                }`}
                            >
                                {cat} ({getCategoryCount(cat)})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col gap-4">
                    
                    {/* Mobile-only Toolbar (Category Dropdown, hidden on desktop) */}
                    <div className="flex md:hidden w-full items-center justify-end">
                        {/* Category Dropdown */}
                        <div className="relative w-full max-w-[130px]">
                            <select 
                                value={activeCategory}
                                onChange={(e) => setActiveCategory(e.target.value)}
                                className="w-full h-11 pl-3 pr-7 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest appearance-none cursor-pointer font-bold text-[10px] uppercase tracking-widest text-stone-700 shadow-sm"
                                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '0.9em' }}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat} ({getCategoryCount(cat)})</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <ProductGrid products={filteredProducts} />
                </div>
            </div>
        </div>
    );
}
