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
import JSONLDStructuredData from '@/components/seo/structure-data';
import { getApolloServer } from '@/graphql/apollo-server';
import { GraphQLFetcher } from '@/graphql/server/fetchers';
import { SEO_KEYWORDS } from '@/shared/constants/seo';
import { EJsonldType } from '@/shared/enums/jsonld.enum';
import { EMetadataType } from '@/shared/enums/metadata.enum';
import {
  ICategoryPageParams,
  ICategoryPageSearchParams,
  IServerPageProps,
} from '@/shared/interfaces';

export async function generateMetadata({
  params,
}: IServerPageProps<ICategoryPageParams, ICategoryPageSearchParams>): Promise<Metadata> {
  const { slug } = await params;

  const { category } = await GraphQLFetcher.category({
    client: await getApolloServer(),
  }).getOne({
    where: { slug: slug || '' },
  });
  if (!category) notFound();

  return generateMetadataFactory({
    type: EMetadataType.CATEGORY,
    data: {
      ...category,
      keywords: [...(category.keywords || []), ...SEO_KEYWORDS],
    },
  });
}

export default async function ServiceByCategoryPage({
  params,
}: IServerPageProps<ICategoryPageParams, ICategoryPageSearchParams>) {
  try {
    const { slug } = await params;

    const { category } = await GraphQLFetcher.category({
      client: await getApolloServer(),
    }).getOne({
      where: { slug: slug || '' },
    });
    if (!category) notFound();

    return (
      <Fragment>
        <JSONLDStructuredData type={EJsonldType.COLLECTION_PAGE} data={category} />

        <main id="service-by-category-page" className="flex flex-col">
          <ServiceHero />

          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-8">
              <PageBreadcrumb
                elements={[
                  { name: 'Trang chủ', href: '/' },
                  { name: 'Photocopy', href: '/service' },
                  { name: category.name, href: `/service/category/${slug}` },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
              <Suspense fallback={<ServiceSidebarSkeleton />}>
                <ServiceSidebar selectedCategory={category} />
              </Suspense>

              <Suspense fallback={<ServiceGridSkeleton />}>
                <ServiceGrid category={category} />
              </Suspense>
            </div>
          </div>
        </main>
      </Fragment>
    );
  } catch (error) {
    console.error('[ServiceByCategoryPage]:', error);
    return notFound();
  }
}
