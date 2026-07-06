import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <main className="flex flex-col min-h-screen bg-white w-full">
      {/* Hero Skeleton */}
      <div className="w-full h-[60vh] md:h-[80vh] relative">
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <Skeleton className="h-12 md:h-20 w-[80%] max-w-3xl mb-6 bg-white/20" />
          <Skeleton className="h-6 md:h-8 w-[60%] max-w-xl bg-white/20" />
        </div>
      </div>

      {/* Intro Section Skeleton */}
      <section className="w-full py-12 md:py-20 relative bg-cream">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-6 flex flex-col items-center">
          <Skeleton className="h-10 md:h-12 w-[90%]" />
          <Skeleton className="h-6 w-[80%]" />
          <div className="flex gap-4 mt-4">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
      </section>

      {/* Product Range Skeleton */}
      <section className="w-full bg-stone-50/50 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl space-y-12">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-10 w-[300px]" />
            <Skeleton className="h-6 w-[400px]" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className={`aspect-square w-full rounded-2xl ${i >= 4 ? "hidden lg:block" : ""}`} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
