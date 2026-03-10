import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { PageBreadcrumb } from '@/components/common';
import { ProductDetail } from '@/components/pages/handmade/detail';
import { ProductRelatedGrid } from '@/components/pages/handmade/related';
import generateMetadataFactory from '@/components/seo/metadata';
import JSONLDStructuredData from '@/components/seo/structure-data';
import { Button } from '@/components/ui/button';
import { EProductType, Product } from '@/graphql/@types/graphql.type';
import { getApolloServer } from '@/graphql/apollo-server';
import { GraphQLFetcher } from '@/graphql/server/fetchers';
import { EJsonldType } from '@/shared/enums/jsonld.enum';
import { EMetadataType } from '@/shared/enums/metadata.enum';
import {
  IProductPageParams,
  IProductPageSearchParams,
  IServerPageProps,
} from '@/shared/interfaces';

export async function generateMetadata({
  params,
}: IServerPageProps<IProductPageParams, IProductPageSearchParams>): Promise<Metadata> {
  const { slug } = await params;

  const { product } = await GraphQLFetcher.product({
    client: await getApolloServer(),
  }).getOne({
    where: { slug },
  });
  if (!product) notFound();

  return generateMetadataFactory({
    type: EMetadataType.PRODUCT,
    data: product as Product,
  });
}

export default async function ProductDetailPage({
  params,
}: IServerPageProps<IProductPageParams, IProductPageSearchParams>) {
  try {
    const { slug } = await params;

    const { product } = await GraphQLFetcher.product({
      client: await getApolloServer(),
    }).getOne({
      where: { slug },
    });
    if (!product) notFound();

    const { products: productRelated } = await GraphQLFetcher.product({
      client: await getApolloServer(),
    }).getPagination({
      where: {
        id: { $ne: product.id },
        type: EProductType.Product,
        category_ids: [],
      },
      pagination: {
        page: Number(1),
        limit: Number(4),
      },
    });

    return (
      <Fragment>
        <JSONLDStructuredData type={EJsonldType.PRODUCT} data={product} />

        <main id="handmade-detail-page" className="flex-grow pt-24 pb-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-8">
              <PageBreadcrumb
                elements={[
                  { name: 'Trang chủ', href: '/' },
                  { name: 'Handmade', href: '/handmade' },
                  { name: product.name, href: `/handmade/${slug}` },
                ]}
              />
            </div>

            <Button asChild variant="outline" className="mb-8">
              <Link href="/handmade">
                <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại
              </Link>
            </Button>

            <ProductDetail product={product} />

            <ProductRelatedGrid products={productRelated} />
          </div>
        </main>
      </Fragment>
    );
  } catch (error) {
    console.error('Error loading handmade detail page:', error);
    return notFound();
  }
}
