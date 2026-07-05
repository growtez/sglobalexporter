"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const router = useRouter();
  
  const [address, setAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handlePayment = async () => {
    if (!address.trim()) {
      setError("Please provide a shipping address.");
      return;
    }
    setError(null);
    setIsProcessing(true);

    try {
      const totalAmount = getTotal();
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });
      
      const order = await res.json();

      if (order.error) {
        throw new Error(order.error);
      }

      if (order.isMock) {
        // Mock payment flow when keys are missing
        alert(`MOCK MODE: Payment of ₹${totalAmount} successful!`);
        clearCart();
        router.push("/profile");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: order.amount,
        currency: order.currency,
        name: "SGlobalExporter",
        description: "Premium Tea & Rice",
        order_id: order.id,
        handler: async function (response: any) {
          // Normally, verify payment on server here and save to `orders` table.
          alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          clearCart();
          router.push("/profile");
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        theme: {
          color: "#1A3622",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setError(response.error.description);
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message || "Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
      <h1 className="text-4xl font-serif font-bold text-forest mb-8">Checkout</h1>
      
      <div className="bg-white p-8 border border-stone-200 shadow-sm space-y-8">
        <div>
          <h2 className="text-xl font-serif text-charcoal mb-4">Shipping Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Full Shipping Address</Label>
              <textarea
                id="address"
                rows={4}
                className="flex w-full border border-stone-200 bg-transparent px-4 py-2 text-sm shadow-sm transition-colors placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest text-charcoal mt-1"
                placeholder="123 Main St, City, Country, ZIP"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-stone-200 pt-8">
          <h2 className="text-xl font-serif text-charcoal mb-4">Order Summary</h2>
          <div className="space-y-2 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-stone-600">
                <span>{item.name} (x{item.quantity_kg}kg)</span>
                <span>₹{item.price_per_kg * item.quantity_kg}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-lg text-charcoal pt-4 border-t border-stone-200">
            <span>Total to Pay</span>
            <span>₹{getTotal()}</span>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        <Button size="lg" className="w-full" onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? "Processing..." : `Pay ₹${getTotal()}`}
        </Button>
      </div>
    </div>
  );
}
