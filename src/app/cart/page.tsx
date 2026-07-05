"use client";

import { useCartStore } from "@/lib/store/cartStore";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-serif font-bold text-forest mb-6">Your Cart is Empty</h1>
        <p className="text-stone-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link href="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
      <h1 className="text-4xl font-serif font-bold text-forest mb-12">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 p-4 bg-white border border-stone-200 shadow-sm items-center">
              <div className="relative w-24 h-24 flex-shrink-0 bg-[#F9F9F8]">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-forest">{item.name}</h3>
                <p className="text-stone-600">₹{item.price_per_kg} / kg</p>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity_kg}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="w-20 border border-stone-200 px-2 py-1 text-center text-sm"
                  />
                  <span className="text-sm text-stone-500">kg</span>
                </div>
              </div>
              <div className="text-right flex flex-col justify-between h-full">
                <p className="font-bold text-lg text-charcoal">₹{item.price_per_kg * item.quantity_kg}</p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors self-end mt-4"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
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
            <Link href="/checkout" className="block w-full">
              <Button size="lg" className="w-full">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
