import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image Skeleton */}
        <div className="aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden relative">
          <Skeleton className="absolute inset-0 w-full h-full" />
        </div>

        {/* Product Info Skeleton */}
        <div className="flex flex-col">
          <Skeleton className="h-6 w-[120px] mb-4" />
          <Skeleton className="h-12 w-[80%] mb-4" />
          <Skeleton className="h-8 w-[150px] mb-8" />
          
          <div className="space-y-2 mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[85%]" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-2xl" />
          </div>

          <div className="space-y-6 border-t border-stone-200/60 pt-8">
            <Skeleton className="h-10 w-[100px]" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-32 rounded-xl" />
              <Skeleton className="h-14 flex-1 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
