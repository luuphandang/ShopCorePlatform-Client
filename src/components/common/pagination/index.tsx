'use client';

import React, { ReactElement } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui';
import { MetadataResponse } from '@/graphql/@types';

interface PagePaginationProps<T> {
  path: string;
  params: T;
  metadata: MetadataResponse;
}
export const PagePagination = <T,>({ path, params, metadata }: PagePaginationProps<T>) => {
  const _getPageUrl = (page: number) => {
    const searchParams = Object.entries({
      ...params,
      page: page.toString(),
    }).reduce(
      (acc, [key, value]) => {
        if (value !== null) {
          acc[key] = value.toString();
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    return `${path}?${new URLSearchParams(searchParams).toString()}`;
  };
  const renderPageNumbers = () => {
    const totalPages = metadata.total_pages || 1;
    const currentPage = metadata.current_page || 1;
    const pageNumbers: ReactElement[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              href={_getPageUrl(i)}
              className={
                currentPage === i
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white'
                  : ''
              }
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            href={_getPageUrl(1)}
            className={
              currentPage === 1
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white'
                : ''
            }
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (currentPage > 3) {
        pageNumbers.push(
          <PaginationItem key={2}>
            <PaginationLink href={_getPageUrl(2)}>2</PaginationLink>
          </PaginationItem>,
        );
        pageNumbers.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (i > 1 && i < totalPages) {
          pageNumbers.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={currentPage === i}
                href={_getPageUrl(i)}
                className={
                  currentPage === i
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white'
                    : ''
                }
              >
                {i}
              </PaginationLink>
            </PaginationItem>,
          );
        }
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>,
        );
        pageNumbers.push(
          <PaginationItem key={totalPages - 1}>
            <PaginationLink href={_getPageUrl(totalPages - 1)}>{totalPages - 1}</PaginationLink>
          </PaginationItem>,
        );
      }

      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            href={_getPageUrl(totalPages)}
            className={
              currentPage === totalPages
                ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white'
                : ''
            }
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pageNumbers;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={_getPageUrl(metadata.current_page ? metadata.current_page - 1 : 1)}
            style={{
              pointerEvents: metadata.current_page === 1 ? 'none' : 'auto',
              opacity: metadata.current_page === 1 ? 0.5 : 1,
            }}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            href={_getPageUrl(metadata.current_page ? metadata.current_page + 1 : 1)}
            style={{
              pointerEvents: metadata.current_page === metadata.total_pages ? 'none' : 'auto',
              opacity: metadata.current_page === metadata.total_pages ? 0.5 : 1,
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
