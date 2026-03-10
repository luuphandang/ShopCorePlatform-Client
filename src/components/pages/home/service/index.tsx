'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { AspectRatio, Button, Loading } from '@/components/ui';
import { EProductType, TProductsQuery } from '@/graphql/@types';
import { useProductsQuery } from '@/graphql/hooks';
import { DEFAULT_PAGE_SIZE, NO_IMAGE_URL } from '@/shared/constants';
import { StringUtil } from '@/shared/utils';

export default function HomeServices() {
  const [services, setServices] = useState<TProductsQuery>([]);

  const { data: servicesResponse, loading: servicesLoading } = useProductsQuery({
    where: { type: EProductType.Service },
    pagination: { page: 1, limit: DEFAULT_PAGE_SIZE },
    order: { created_at: 'DESC' },
  });

  useEffect(() => {
    if (servicesResponse?.products?.data) {
      setServices(servicesResponse.products.data);
    }
  }, [servicesResponse]);

  return (
    <section id="services" className="py-20 bg-secondary/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="font-serif text-sm md:text-base uppercase tracking-widest text-primary/80">
            Chuyên môn của chúng tôi
          </h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-serif font-medium text-primary">
            Dịch vụ chuyên nghiệp
          </h3>
          <p className="mt-4 text-muted-foreground">
            Dịch vụ photocopy và tài liệu chất lượng cao đáp ứng mọi nhu cầu chuyên môn và cá nhân
            của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesLoading ? (
            <Loading />
          ) : (
            services?.map((service, index) => (
              <div
                key={service.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all-300 border border-border/50 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <Image
                    src={service.thumbnail?.url || NO_IMAGE_URL}
                    alt={service.name || '#'}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    width={4000}
                    height={4000}
                  />
                </AspectRatio>
                <div className="p-4">
                  <div className="inline-block text-sm font-medium uppercase tracking-wider text-primary/60 mb-1">
                    {service.categories?.[0]?.name}
                  </div>
                  <h4 className="text-xl font-medium text-primary mb-3 font-serif">
                    {service.name}
                  </h4>
                  <p
                    className="text-muted-foreground mb-4"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{
                      __html: StringUtil.getPlainHtml(service.short_description || ''),
                    }}
                  />
                  <Link href={`/service/${service.slug}`}>
                    <Button variant="outline" size="sm">
                      Tìm hiểu thêm
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
