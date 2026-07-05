"use client";

import { useCartStore } from "@/lib/store/cartStore";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price_per_kg: number;
    image_url: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price_per_kg: product.price_per_kg,
      quantity_kg: 1, // Default to 1kg, can be enhanced to have a quantity selector
      image_url: product.image_url || "/placeholder-tea.jpg",
    });
    // Optional: show a toast notification here
    alert("Added to cart!");
  };

  return (
    <Button size="lg" className="w-full sm:w-auto" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
}
