import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Category, Product } from '@/graphql/@types';
import { cn } from '@/libs/utils';

interface IServiceBreadcrumbProps {
  className?: string;
  category?: Category | undefined;
  service?: Product;
}

export default function ServiceBreadcrumb({
  className,
  category,
  service,
}: IServiceBreadcrumbProps) {
  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/service">Photocopy</BreadcrumbLink>
        </BreadcrumbItem>

        {category && (
          <Fragment>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {service ? (
                <BreadcrumbLink href={`/service/category/${category.slug}`}>
                  {category.name}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage className="capitalize">{category.name}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        )}

        {service && (
          <Fragment>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize">{service.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </Fragment>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
