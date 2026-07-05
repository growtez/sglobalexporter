import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "@/app/admin/actions";

export const metadata = { title: "Edit Product | Admin – SGlobalExporter" };

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  const boundAction = updateProduct.bind(null, id);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-charcoal">Edit Product</h1>
        <p className="text-stone-500 mt-1">Update the details for <span className="font-medium text-charcoal">{product.name}</span>.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8 max-w-3xl">
        <ProductForm
          action={boundAction}
          defaultValues={product}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
