import { notFound } from 'next/navigation';
import { Fragment, Suspense } from 'react';

import { PageBreadcrumb } from '@/components/common';
import ProductGrid from '@/components/pages/handmade/grid';
import ProductGridSkeleton from '@/components/pages/handmade/grid/skeleton';
import HandmadeHero from '@/components/pages/handmade/hero';
import HandmadeSidebar from '@/components/pages/handmade/sidebar';
import ServiceSidebarSkeleton from '@/components/pages/service/sidebar/skeleton';

export default async function ProductPage() {
  try {
    return (
      <Fragment>
        <main id="handmade-page" className="flex flex-col">
          <HandmadeHero />

          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-8">
              <PageBreadcrumb
                elements={[
                  { name: 'Trang chủ', href: '/' },
                  { name: 'Handmade', href: '/handmade' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
              <Suspense fallback={<ServiceSidebarSkeleton />}>
                <HandmadeSidebar />
              </Suspense>

              <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGrid />
              </Suspense>
            </div>
          </div>
        </main>
      </Fragment>
    );
  } catch (error) {
    console.error('Error loading handmade page:', error);
    return notFound();
  }
}
