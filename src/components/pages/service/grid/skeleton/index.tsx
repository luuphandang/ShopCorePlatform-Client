import { SKELETON_COUNT } from '@/shared/constants/application';

import ServiceCardSkeleton from '../../card/skeleton';

export default function ServiceGridSkeleton() {
  return (
    <section id="service-list" className="lg:col-span-3" aria-hidden="true">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <ServiceCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
