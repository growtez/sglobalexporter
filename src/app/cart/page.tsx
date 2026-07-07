"use client";

import { useCartStore } from "@/lib/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Trash2, ChevronDown, ChevronRight } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, updateUnit, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 text-center">
        <h1 className="text-3xl font-serif font-bold text-forest mb-4">Your Cart is Empty</h1>
        <p className="text-stone-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link href="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-6 md:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => {
            let multiplier = 1;
            if (item.unit === "Metric Tons (MT)") multiplier = 1000;
            if (item.unit === "Boxes") multiplier = 10;
            const itemTotal = item.price_per_kg * item.quantity_kg * multiplier;

            return (
              <div 
                key={item.id} 
                onClick={() => router.push(`/products/${item.slug || item.name.toLowerCase().replace(/\s+/g, "-")}`)}
                className="flex gap-4 sm:gap-6 p-4 bg-white border border-stone-200 shadow-sm items-start sm:items-center cursor-pointer hover:border-gold/50 transition-colors relative"
              >
                {/* Product Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-[#F9F9F8] block hover:opacity-90 transition-opacity">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between w-full h-full">
                  
                  {/* Info and Controls */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="hover:underline hover:text-gold block transition-colors pr-6 sm:pr-0">
                        <h3 className="font-serif text-base sm:text-lg font-bold text-forest leading-tight mb-1">{item.name}</h3>
                      </div>
                      
                      {/* Mobile Trash Icon */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.id);
                        }}
                        className="sm:hidden text-stone-400 hover:text-red-500 transition-colors absolute top-4 right-4"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="text-stone-600 text-sm mb-3">₹{item.price_per_kg} / kg</p>
                    
                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden h-8 bg-stone-50">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.quantity_kg <= 1) {
                              removeItem(item.id);
                            } else {
                              updateQuantity(item.id, item.quantity_kg - 1);
                            }
                          }}
                          className="w-8 h-full flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors border-r border-stone-200 text-sm font-semibold"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity_kg}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                          className="w-12 text-center text-xs font-bold text-stone-850 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity_kg + 1);
                          }}
                          className="w-8 h-full flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors border-l border-stone-200 text-sm font-semibold"
                        >
                          +
                        </button>
                      </div>

                      {/* Unit Selector */}
                      <div className="relative h-8">
                        <select
                          value={item.unit || "Kilograms (kg)"}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateUnit(item.id, e.target.value)}
                          className="h-full bg-white border border-stone-200 rounded-lg pl-2 pr-7 text-xs text-stone-700 font-semibold focus:outline-none focus:ring-1 focus:ring-forest/20 appearance-none cursor-pointer"
                        >
                          <option>Kilograms (kg)</option>
                          <option>Metric Tons (MT)</option>
                          <option>Boxes</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Price and Desktop Trash */}
                  <div className="text-right flex flex-row sm:flex-col justify-between items-center sm:items-end sm:h-full mt-3 sm:mt-0 pt-3 sm:pt-0 border-t border-stone-100 sm:border-0">
                    <span className="sm:hidden text-sm text-stone-500 font-medium">Total:</span>
                    <p className="font-bold text-lg text-charcoal sm:mt-0">₹{itemTotal}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                      }}
                      className="hidden sm:block text-stone-400 hover:text-red-500 transition-colors mt-4"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="bg-forest/5 border border-forest/20 p-6 sticky top-24">
            <h2 className="text-xl font-serif font-bold text-forest mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>₹{getTotal()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="pt-4 border-t border-stone-200 flex justify-between font-bold text-lg text-charcoal">
                <span>Total</span>
                <span>₹{getTotal()}</span>
              </div>
            </div>
            <button 
              onClick={async () => {
                const { createClient } = await import("@/lib/supabase/client");
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                  router.push("/auth/login?redirect=/cart");
                } else {
                  router.push("/checkout");
                }
              }}
              className="block w-full"
            >
              <Button size="lg" className="w-full">Proceed to Checkout</Button>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
