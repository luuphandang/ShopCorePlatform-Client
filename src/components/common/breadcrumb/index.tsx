'use client';

import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui';

interface IPageBreadcrumbElement {
  name: string;
  href: string;
}
interface IPageBreadcrumbProps {
  elements: IPageBreadcrumbElement[];
}
const PageBreadcrumb = ({ elements }: IPageBreadcrumbProps) => {
  const breadcrumbLength = elements.length;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {elements.map((element, index) =>
          index === breadcrumbLength - 1 ? (
            <BreadcrumbItem key={index}>
              <BreadcrumbPage className="capitalize">{element.name}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={index}>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink className="capitalize" href={element.href}>
                  {element.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
PageBreadcrumb.displayName = 'PageBreadcrumb';

export { PageBreadcrumb };
