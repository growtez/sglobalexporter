import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "@/app/admin/actions";

export const metadata = { title: "Add Product | Admin – SGlobalExporter" };

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal">Add Product</h1>
        <p className="text-stone-500 mt-1">Fill in the details to list a new product on the storefront.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 max-w-3xl">
        <ProductForm action={createProduct} submitLabel="Create Product" />
      </div>
    </div>
  );
}
