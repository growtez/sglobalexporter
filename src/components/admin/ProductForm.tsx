"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ImageUpload from "./ImageUpload";

interface ProductFormProps {
  action: (formData: FormData) => Promise<void | { error: string }>;
  defaultValues?: {
    name?: string;
    description?: string;
    origin?: string;
    category?: string;
    price_per_kg?: number;
    min_order_kg?: number;
    stock_kg?: number;
    image_url?: string;
    is_active?: boolean;
  };
  submitLabel?: string;
}

const categories = ["Tea", "Rice", "Spices", "Other"];

export default function ProductForm({
  action,
  defaultValues = {},
  submitLabel = "Save Product",
}: ProductFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [imageUrl, setImageUrl] = useState(defaultValues.image_url ?? "");

  const handleSubmit = async (formData: FormData) => {
    await action(formData);
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Product Name *</label>
          <input
            name="name"
            required
            defaultValue={defaultValues.name}
            placeholder="e.g. Premium Assam CTC Tea"
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Category *</label>
          <select
            name="category"
            required
            defaultValue={defaultValues.category ?? ""}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition bg-white"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Origin */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Origin</label>
          <input
            name="origin"
            defaultValue={defaultValues.origin}
            placeholder="e.g. Assam, India"
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition"
          />
        </div>

        {/* Price / kg */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Price per kg (₹) *</label>
          <input
            name="price_per_kg"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={defaultValues.price_per_kg}
            placeholder="e.g. 450.00"
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition"
          />
        </div>

        {/* Min order */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Min Order (kg)</label>
          <input
            name="min_order_kg"
            type="number"
            min="1"
            defaultValue={defaultValues.min_order_kg ?? 1}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Stock (kg)</label>
          <input
            name="stock_kg"
            type="number"
            min="0"
            defaultValue={defaultValues.stock_kg ?? 0}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition"
          />
        </div>

        {/* Product Image */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Product Image</label>
          <ImageUpload
            value={imageUrl}
            onChange={(url) => setImageUrl(url)}
          />
          <input type="hidden" name="image_url" value={imageUrl} />
        </div>

        {/* Active toggle */}
        <div className="flex items-center gap-3 mt-2">
          <input
            id="is_active"
            name="is_active"
            type="checkbox"
            value="true"
            defaultChecked={defaultValues.is_active ?? true}
            className="w-4 h-4 accent-forest rounded"
          />
          <label htmlFor="is_active" className="text-sm font-medium text-stone-700">
            In Stock (visible on storefront)
          </label>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-stone-700 mb-1.5">Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={defaultValues.description}
            placeholder="Describe the product, flavour notes, quality certifications…"
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest transition resize-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" size="default">
          {submitLabel}
        </Button>
        <a
          href="/admin/products"
          className="px-5 py-2.5 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
