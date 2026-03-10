'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Loading } from '@/components/ui';
import { TProductsQuery } from '@/graphql/@types';

interface IProductRelatedGridProps {
  products?: TProductsQuery;
}
const ProductRelatedGrid = ({ products }: IProductRelatedGridProps) => {
  if (!Array.isArray(products)) {
    return (
      <section className="mt-16 pt-12 border-t border-border">
        <h2 className="text-2xl font-serif font-medium text-primary mb-8">Bạn có thể thích</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Loading />
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <h2 className="text-2xl font-serif font-medium text-primary mb-8">Bạn có thể thích</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((relatedProduct, index) => (
          <div
            key={relatedProduct.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link href={`/handmade/${relatedProduct.slug}`} className="block group">
              <div className="rounded-lg overflow-hidden border border-border/40 bg-white transition-all-300 group-hover:shadow-md">
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={relatedProduct.thumbnail?.url || ''}
                    alt={relatedProduct.name || ''}
                    className="w-full h-full object-cover transition-all-400 group-hover:scale-105"
                    width={4000}
                    height={4000}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-primary group-hover:text-primary/80 transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium">
                      {Number(relatedProduct.base_unit?.price).toLocaleString('de-DE')} VNĐ
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">
                        {(relatedProduct.average_rating || 0).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
ProductRelatedGrid.displayName = 'ProductRelatedGrid';

export { ProductRelatedGrid };
