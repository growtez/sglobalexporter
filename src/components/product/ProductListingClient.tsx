"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown, ArrowDownUp, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductGrid from "@/components/product/ProductGrid";

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
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("featured");

    const categories = ["All", "Tea", "Rice"];

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
        <div className="flex flex-col gap-6">
            
            {/* Desktop Header (Left-aligned, visible on desktop, hidden on mobile) */}
            <div className="hidden md:flex justify-between items-center border-b border-stone-200 pb-4">
                <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
                    Our Products ({filteredProducts.length})
                </h1>
            </div>

            {/* Mobile Header (Centered, hidden on desktop) */}
            <div className="md:hidden text-center">
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                    Our Products ({filteredProducts.length})
                </h1>
            </div>

            {/* Main Layout Area */}
            <div className="flex flex-col md:flex-row gap-8">
                
                {/* Desktop Sidebar (visible on md+) */}
                <div className="hidden md:flex flex-col w-56 shrink-0 gap-6">
                    {/* Desktop Search */}
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <Input 
                            placeholder="Search..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 bg-white border-stone-200 focus-visible:ring-forest rounded-xl h-10 shadow-sm w-full text-sm"
                        />
                    </div>

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
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col gap-4">
                    
                    {/* Mobile-only Toolbar (Search & Category Dropdown, hidden on desktop) */}
                    <div className="flex md:hidden gap-2 w-full items-center">
                        {/* Search Input */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <Input 
                                placeholder="Search products..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 bg-white border-stone-200 focus-visible:ring-forest rounded-xl h-11 shadow-sm w-full text-xs"
                            />
                        </div>

                        {/* Category Dropdown */}
                        <div className="relative shrink-0 max-w-[110px] w-full">
                            <select 
                                value={activeCategory}
                                onChange={(e) => setActiveCategory(e.target.value)}
                                className="w-full h-11 pl-3 pr-7 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-forest appearance-none cursor-pointer font-bold text-[10px] uppercase tracking-widest text-stone-700 shadow-sm"
                                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '0.9em' }}
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
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
