'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { TCategoriesQuery, TCategoryQuery } from '@/graphql/@types';
import { ECategoryType, EPaginationType } from '@/graphql/@types/graphql.type';
import { useCategoriesQuery } from '@/graphql/hooks';

import HandmadeSidebarSkeleton from './skeleton';

interface IHandmadeSidebarProps {
  selectedCategory?: TCategoryQuery;
}
export default function HandmadeSidebar({ selectedCategory }: IHandmadeSidebarProps) {
  const [categories, setCategories] = useState<TCategoriesQuery>([]);

  const { data: categoriesResponse, loading: categoriesLoading } = useCategoriesQuery({
    where: { type: ECategoryType.Product },
    pagination: { pagination_type: EPaginationType.All },
    order: { created_at: 'DESC' },
  });

  useEffect(() => {
    if (categoriesResponse?.categories?.data) {
      setCategories(categoriesResponse.categories.data);
    }
  }, [categoriesResponse]);

  if (categoriesLoading) return <HandmadeSidebarSkeleton />;

  return (
    <section id="service-sidebar" className="lg:col-span-1">
      <div className="sticky top-24 bg-white rounded-lg shadow-sm border border-border/50 overflow-hidden">
        <h3 className="font-serif text-xl font-medium p-4 border-b border-border/50">
          Danh mục sản phẩm
        </h3>
        <ul className="divide-y divide-border/50">
          <li key={0}>
            <Link
              href={`/handmade`}
              className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors hover:bg-secondary/50 ${
                !selectedCategory
                  ? 'bg-secondary text-primary font-medium'
                  : 'text-muted-foreground'
              }`}
            >
              <span>Tất cả</span>
            </Link>
          </li>
          {categories?.map((category) => (
            <li key={category.id}>
              <Link
                href={`/handmade/category/${category.slug}`}
                className={`w-full px-4 py-3 text-left flex items-center space-x-3 transition-colors hover:bg-secondary/50 ${
                  selectedCategory?.slug === category.slug
                    ? 'bg-secondary text-primary font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                <span>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
