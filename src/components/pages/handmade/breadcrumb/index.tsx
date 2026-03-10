import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui';
import { TCategoryQuery, TProductQuery } from '@/graphql/@types';
import { cn } from '@/libs/utils';

interface IHandmadeBreadcrumbProps {
  className?: string;
  category?: TCategoryQuery;
  product?: TProductQuery;
}
export default function HandmadeBreadcrumb({
  className,
  category,
  product,
}: IHandmadeBreadcrumbProps) {
  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/handmade">Handmade</BreadcrumbLink>
        </BreadcrumbItem>

        {category && (
          <Fragment>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {product ? (
                <Fragment>
                  <BreadcrumbLink href={`/handmade/category/${category.slug}`}>
                    {category.name}
                  </BreadcrumbLink>
                </Fragment>
              ) : (
                <BreadcrumbPage className="capitalize">{category.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        )}

        {product && (
          <Fragment>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </Fragment>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
