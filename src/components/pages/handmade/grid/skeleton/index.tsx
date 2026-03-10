import { SKELETON_COUNT } from '@/shared/constants/application';

import ProductCardSkeleton from '../../card/skeleton';

const ProductGridSkeleton = () => {
  return (
    <section id="handmade-grid" className="lg:col-span-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};

export default ProductGridSkeleton;
