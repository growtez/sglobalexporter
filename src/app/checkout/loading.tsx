import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <Skeleton className="h-10 w-[250px] mb-8" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Skeleton */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-[150px]" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full rounded-lg" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
          
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>

        {/* Order Summary Skeleton */}
        <div className="lg:col-span-5">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
