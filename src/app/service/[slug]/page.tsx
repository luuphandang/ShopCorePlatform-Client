import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Fragment } from 'react';

import { PageBreadcrumb } from '@/components/common';
import ServiceDetail from '@/components/pages/service/detail';
import generateMetadataFactory from '@/components/seo/metadata';
import JSONLDStructuredData from '@/components/seo/structure-data';
import { Button } from '@/components/ui';
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
}: IServerPageProps<IProductPageParams, IProductPageSearchParams>) {
  const { slug } = await params;

  const { product: service } = await GraphQLFetcher.product({
    client: await getApolloServer(),
  }).getOne({
    where: { slug },
  });
  if (!service) notFound();

  return generateMetadataFactory({
    type: EMetadataType.SERVICE,
    data: service,
  });
}

export default async function ServiceDetailPage({
  params,
}: IServerPageProps<IProductPageParams, IProductPageSearchParams>) {
  try {
    const { slug } = await params;

    const { product: service } = await GraphQLFetcher.product({
      client: await getApolloServer(),
    }).getOne({
      where: { slug },
    });
    if (!service) notFound();

    return (
      <Fragment>
        <JSONLDStructuredData type={EJsonldType.SERVICE} data={service} />

        <main id="service-detail-page" className="flex-grow pt-24 pb-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="mb-8">
              <PageBreadcrumb
                elements={[
                  { name: 'Trang chủ', href: '/' },
                  { name: 'Photocopy', href: '/service' },
                  { name: service.name, href: `/service/${slug}` },
                ]}
              />
            </div>

            <Button asChild variant="outline" className="mb-8">
              <Link href="/service">
                <ArrowLeft className="h-4 w-4 mr-2" /> Quay lại
              </Link>
            </Button>

            <ServiceDetail service={service} />
          </div>
        </main>
      </Fragment>
    );
  } catch (error) {
    console.error('Error loading service detail page:', error);
    return notFound();
  }
}
