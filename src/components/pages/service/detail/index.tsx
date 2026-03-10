import { CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TProductQuery } from '@/graphql/@types';
import { NumberUtil } from '@/shared/utils/number.util';

interface IServiceDetailProps {
  service: TProductQuery;
}

export default function ServiceDetail({ service }: IServiceDetailProps) {
  if (!service) return null;

  return (
    <section id="service-detail" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border border-border/50 shadow-sm overflow-hidden animate-fade-in-up">
          <div className="p-6 md:p-8 border-b border-border/50">
            <div className="flex items-start">
              <div className="w-16 h-16 rounded-lg bg-primary/5 flex items-center justify-center text-primary mr-6 flex-shrink-0">
                <Image
                  className="h-12 w-12"
                  src={service.thumbnail?.url || ''}
                  alt={service.name || ''}
                  width={4000}
                  height={4000}
                />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-medium text-primary mb-2">
                  {service.name}
                </h1>
                <div
                  className="text-muted-foreground"
                  suppressHydrationWarning
                  dangerouslySetInnerHTML={{ __html: service.short_description || '' }}
                />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="font-serif text-2xl font-medium text-primary mb-4">Tổng quan</h2>
            <div
              className="mb-6 text-muted-foreground"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{ __html: service.description || '' }}
            />

            <h2 className="font-serif text-2xl font-medium text-primary mb-4">Tính năng</h2>
            <ul className="space-y-3 mb-8">
              {service.features &&
                service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
            </ul>

            <h2 className="font-serif text-2xl font-medium text-primary mb-4">
              Thời gian hoàn thành
            </h2>
            <div className="flex items-center mb-8 text-muted-foreground">
              <Clock className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
              <span>{service.turnaround}</span>
            </div>

            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="#contact">Yêu cầu báo giá</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24 shadow-sm animate-fade-in">
          <CardContent className="p-6">
            <h3 className="font-serif text-xl font-medium text-primary mb-4">Báo giá</h3>
            <div className="space-y-4">
              {service.variants &&
                service.variants.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between pb-2 border-b border-border/50 last:border-0"
                  >
                    <span>{item.name}</span>
                    <span className="font-medium">
                      {NumberUtil.formatCurrency(item.base_unit?.price)}/
                      {item.base_unit?.unit?.name}
                    </span>
                  </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-secondary/50 rounded-md">
              <p className="text-sm text-muted-foreground">
                Bạn cần báo giá tùy chỉnh? Hãy liên hệ với chúng tôi với các yêu cầu cụ thể của bạn
                để được báo giá theo yêu cầu cá nhân.
              </p>
            </div>

            <div className="mt-6">
              <Button className="w-full" asChild>
                <Link href="/contact">Liên hệ chúng tôi</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
