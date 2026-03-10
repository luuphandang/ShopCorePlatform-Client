'use client';

import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TProductQuery } from '@/graphql/@types';

interface IServiceCardProps {
  service: TProductQuery;
}

export default function ServiceCard({ service }: IServiceCardProps) {
  if (!service) return null;

  return (
    <Card className="overflow-hidden border border-border/50 transition-all hover:shadow-md flex flex-col h-full">
      <div className="flex flex-col flex-1">
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={service.thumbnail?.url || ''}
            alt={service.name}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            width={4000}
            height={4000}
          />
        </AspectRatio>
        <CardHeader>
          <div className="inline-block text-sm font-medium uppercase tracking-wider text-primary/60 mb-1">
            {service.categories?.[0]?.name}
          </div>
          <CardTitle className="font-serif">{service.name}</CardTitle>
          <CardDescription
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: service.short_description || '' }}
          />
        </CardHeader>
      </div>

      <CardFooter className="flex items-center justify-between mt-auto">
        <p className="font-medium text-primary font-semibold">
          {service.base_unit?.price.toLocaleString('vi-VN')} đ/
          {service.base_unit?.unit?.name.toLowerCase()}
        </p>
        <Link href={`/service/${service.slug}`}>
          <Button variant="outline" className="w-full justify-between">
            Xem thêm <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
