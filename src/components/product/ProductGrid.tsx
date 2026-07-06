import ProductCard from "./ProductCard";

interface Product {
    id: string;
    name: string;
    slug: string;
    origin: string;
    price_per_kg: number;
    image_url: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
    if (products.length === 0) {
        return (
            <div className="py-20 text-center text-stone-500">
                <p>No products found at this time.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
