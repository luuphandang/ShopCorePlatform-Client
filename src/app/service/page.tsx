import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fragment, Suspense } from 'react';

import { PageBreadcrumb } from '@/components/common';
import ServiceGrid from '@/components/pages/service/grid';
import ServiceGridSkeleton from '@/components/pages/service/grid/skeleton';
import ServiceHero from '@/components/pages/service/hero';
import ServiceSidebar from '@/components/pages/service/sidebar';
import ServiceSidebarSkeleton from '@/components/pages/service/sidebar/skeleton';
import generateMetadataFactory from '@/components/seo/metadata';
import { ECategoryType, EPaginationType } from '@/graphql/@types/graphql.type';
import { getApolloServer } from '@/graphql/apollo-server';
import { GraphQLFetcher } from '@/graphql/server/fetchers';
import { EMetadataType } from '@/shared/enums/metadata.enum';

export async function generateMetadata(): Promise<Metadata> {
  const { categories } = await GraphQLFetcher.category({
    client: await getApolloServer(),
  }).getPagination({
    where: { type: ECategoryType.Service },
    pagination: { pagination_type: EPaginationType.All },
    order: { created_at: 'DESC' },
  });

  return generateMetadataFactory({
    type: EMetadataType.SERVICE_LANDING,
    data: categories,
  });
}

export default async function ServicePage() {
  try {
    return (
      <Fragment>
        <main id="service-page" className="flex flex-col">
          <ServiceHero />

          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-8">
              <PageBreadcrumb
                elements={[
                  { name: 'Trang chủ', href: '/' },
                  { name: 'Photocopy', href: '/service' },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
              <Suspense fallback={<ServiceSidebarSkeleton />}>
                <ServiceSidebar />
              </Suspense>

              <Suspense fallback={<ServiceGridSkeleton />}>
                <ServiceGrid />
              </Suspense>
            </div>
          </div>
        </main>
      </Fragment>
    );
  } catch (error) {
    console.error('[ServicePage]:', error);
    return notFound();
  }
}
