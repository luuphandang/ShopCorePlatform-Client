import { Skeleton } from '@/components/ui/skeleton';

const HandmadeSidebarSkeleton = () => {
  return (
    <section id="service-sidebar" className="lg:col-span-1">
      <div className="sticky top-24 bg-white rounded-lg shadow-sm border border-border/50 overflow-hidden">
        <h3 className="font-serif text-xl font-medium p-4 border-b border-border/50">
          Danh mục sản phẩm
        </h3>
        <ul className="divide-y divide-border/50">
          {Array.from({ length: 6 }).map((_, index) => (
            <li
              key={index}
              className="w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors hover:bg-secondary/50"
            >
              <Skeleton className="h-6 w-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HandmadeSidebarSkeleton;
