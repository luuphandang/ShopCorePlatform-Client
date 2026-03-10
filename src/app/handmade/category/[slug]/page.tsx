import { notFound } from 'next/navigation';
import { Fragment, Suspense } from 'react';

import { PageBreadcrumb } from '@/components/common';
import ProductGrid from '@/components/pages/handmade/grid';
import ProductGridSkeleton from '@/components/pages/handmade/grid/skeleton';
import HandmadeHero from '@/components/pages/handmade/hero';
import HandmadeSidebar from '@/components/pages/handmade/sidebar';
import HandmadeSidebarSkeleton from '@/components/pages/handmade/sidebar/skeleton';
import generateMetadataFactory from '@/components/seo/metadata';
import JSONLDStructuredData from '@/components/seo/structure-data';
import { Category } from '@/graphql/@types';
import { getApolloServer } from '@/graphql/apollo-server';
import { GraphQLFetcher } from '@/graphql/server/fetchers';
import { EJsonldType } from '@/shared/enums/jsonld.enum';
import { EMetadataType } from '@/shared/enums/metadata.enum';
import { IServerPageProps } from '@/shared/interfaces';
import { ICategoryPageParams, ICategoryPageSearchParams } from '@/shared/interfaces/pages';

export async function generateMetadata({
  params,
}: IServerPageProps<ICategoryPageParams, ICategoryPageSearchParams>) {
  const { slug } = await params;

  const { category } = await GraphQLFetcher.category({
    client: await getApolloServer(),
  }).getOne({
    where: { slug: slug || '' },
  });
  if (!category) notFound();

  return generateMetadataFactory({
    type: EMetadataType.CATEGORY,
    data: category as Category,
  });
}

export default async function ProductByCategoryPage({
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

        <main id="handmade-page" className="flex flex-col">
          <HandmadeHero />

          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-8">
              <PageBreadcrumb
                elements={[
                  { name: 'Trang chủ', href: '/' },
                  { name: 'Handmade', href: '/handmade' },
                  { name: category.name, href: `/handmade/category/${slug}` },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
              <Suspense fallback={<HandmadeSidebarSkeleton />}>
                <HandmadeSidebar selectedCategory={category} />
              </Suspense>

              <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGrid category={category} />
              </Suspense>
            </div>
          </div>
        </main>
      </Fragment>
    );
  } catch (error) {
    console.error('Error loading handmade by category page:', error);
    return notFound();
  }
}
