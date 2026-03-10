import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ServiceCardSkeleton() {
  return (
    <Card className="overflow-hidden border border-border/50 transition-all hover:shadow-md">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <Skeleton className="w-full h-full" />
      </AspectRatio>
      <CardHeader className="pb-3">
        <CardTitle>
          <Skeleton className="h-5 w-3/4 rounded-sm" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
    </Card>
  );
}
