import { Suspense } from 'react';

import OrderTrackingContainer from '@/components/pages/order-tracking';
import OrderTrackingHero from '@/components/pages/order-tracking/hero';

function LoadingFallback() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-32 bg-gray-200 rounded mb-4"></div>
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <OrderTrackingHero />

      <Suspense fallback={<LoadingFallback />}>
        <OrderTrackingContainer />
      </Suspense>
    </div>
  );
}
