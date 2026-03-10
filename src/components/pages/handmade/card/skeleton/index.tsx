import { Skeleton } from '@/components/ui/skeleton';

const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg border border-border/40 bg-white">
      <div className="relative overflow-hidden aspect-[4/3]">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
