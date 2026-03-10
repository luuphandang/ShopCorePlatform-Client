'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Loading } from '@/components/ui';
import { EProductType, TProductsQuery } from '@/graphql/@types';
import { useProductsQuery } from '@/graphql/hooks';
import { DEFAULT_PAGE_SIZE } from '@/shared/constants';

export default function HomeProducts() {
  const [products, setProducts] = useState<TProductsQuery>([]);

  const { data: productsResponse, loading: productsLoading } = useProductsQuery({
    where: {
      type: EProductType.Product,
    },
    pagination: { page: 1, limit: DEFAULT_PAGE_SIZE },
    order: { created_at: 'DESC' },
  });
  useEffect(() => {
    if (productsResponse?.products?.data) {
      setProducts(productsResponse.products.data);
    }
  }, [productsResponse]);

  return (
    <section id="products" className="py-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in-up">
          <h2 className="font-serif text-sm md:text-base uppercase tracking-widest text-primary/80">
            Sản phẩm thủ công bán chạy
          </h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-serif font-medium text-primary">
            Sản phẩm Handmade của chúng tôi
          </h3>
          <p className="mt-4 text-muted-foreground">
            Sản phẩm handmade được làm từ chất liệu cao cấp và chất lượng.
          </p>
        </div>

        {productsLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product, index) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-lg border border-border/40 bg-white transition-all-300 hover:shadow-md animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={product.thumbnail?.url || '#'}
                    alt={product.name || '#'}
                    className="w-full h-full object-cover transition-all-400 group-hover:scale-105"
                    width={4000}
                    height={4000}
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block text-xs font-medium uppercase tracking-wider text-primary/60 mb-2">
                    {product?.categories?.[0]?.name}
                  </span>
                  <h4 className="text-xl font-serif font-medium text-primary mb-2">
                    {product.name}
                  </h4>
                  <p
                    className="text-muted-foreground"
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: product.short_description || '' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
