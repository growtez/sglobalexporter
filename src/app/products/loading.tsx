import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters Skeleton */}
        <div className="w-full md:w-64 space-y-6 flex-shrink-0">
          <Skeleton className="h-8 w-[150px]" />
          <div className="space-y-4 mt-6">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[80%]" />
            <Skeleton className="h-6 w-[90%]" />
            <Skeleton className="h-6 w-[70%]" />
          </div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="flex-1 space-y-8">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-10 w-[150px]" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] w-full rounded-2xl" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[80%]" />
                  <Skeleton className="h-4 w-[60%]" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-6 w-[40%]" />
                    <Skeleton className="h-8 w-[80px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
