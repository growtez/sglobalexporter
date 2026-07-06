import { Skeleton } from "@/components/ui/skeleton";

export default function AdminTableLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-[200px]" />
      
      <div className="border border-stone-200 rounded-xl bg-white p-4 space-y-4">
        <div className="flex gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-[100px]" />
        </div>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
