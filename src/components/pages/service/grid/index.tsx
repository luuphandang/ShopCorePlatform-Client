'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PagePagination } from '@/components/common';
import { EProductType, MetadataResponse, TCategoryQuery, TProductsQuery } from '@/graphql/@types';
import { useProductsQuery } from '@/graphql/hooks';

import ServiceCard from '../card';
import ServiceGridSkeleton from './skeleton';

interface IServiceGridProps {
  category?: TCategoryQuery;
}
export default function ServiceGrid({ category }: IServiceGridProps) {
  const searchParams = useSearchParams();
  const [services, setServices] = useState<TProductsQuery>([]);
  const [metadata, setMetadata] = useState<MetadataResponse>({});

  const { data: servicesResponse, loading: servicesLoading } = useProductsQuery({
    where: {
      type: EProductType.Service,
      ...(category && { category_ids: { $containsAnyInteger: [category.id] } }),
    },
    pagination: { page: 1, limit: 6 },
    order: { created_at: 'DESC' },
  });

  useEffect(() => {
    if (servicesResponse?.products?.data) {
      setServices(servicesResponse.products.data);
    }

    if (servicesResponse?.products?.metadata) {
      setMetadata(servicesResponse.products.metadata);
    }
  }, [servicesResponse]);

  if (servicesLoading) return <ServiceGridSkeleton />;

  return (
    <section id="service-grid" className="flex flex-col justify-between lg:col-span-3 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services?.map((service, index) => (
          <div
            key={service.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>

      <PagePagination path="/service" params={searchParams} metadata={metadata} />
    </section>
  );
}
