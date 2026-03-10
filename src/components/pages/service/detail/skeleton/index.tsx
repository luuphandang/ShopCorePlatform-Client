import { CheckCircle, Clock } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServiceDetailSkeleton() {
  return (
    <section id="service-detail" className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border border-border/50 shadow-sm overflow-hidden animate-pulse">
          <div className="p-6 md:p-8 border-b border-border/50">
            <div className="flex items-start">
              <div className="w-16 h-16 rounded-lg bg-primary/5 flex items-center justify-center text-primary mr-6 flex-shrink-0">
                <Skeleton className="w-8 h-8 rounded-md" />
              </div>
              <div className="flex-1 space-y-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
            <div>
              <Skeleton className="h-6 w-1/3 mb-3" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <div>
              <Skeleton className="h-6 w-1/3 mb-3" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-muted mr-3 mt-0.5" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Skeleton className="h-6 w-1/3 mb-3" />
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-5 w-5 mr-3 text-muted flex-shrink-0" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>

            <div className="mt-8">
              <Skeleton className="h-10 w-48 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-24 shadow-sm animate-pulse">
          <CardContent className="p-6">
            <Skeleton className="h-6 w-1/4 mb-4" />
            <div className="space-y-4 mb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex justify-between pb-2 border-b border-border/50 last:border-0"
                >
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-secondary/50 rounded-md">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <div className="mt-6">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
