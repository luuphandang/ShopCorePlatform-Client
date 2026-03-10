'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';

const favorites = [
  { id: 1, name: 'Custom Business Card', price: 49.99, image: '/placeholder.svg' },
  { id: 2, name: 'Logo Design Package', price: 149.99, image: '/placeholder.svg' },
  { id: 3, name: 'Wedding Invitation Set', price: 99.99, image: '/placeholder.svg' },
];

export default function ProfileFavoriteTab() {
  return (
    <TabsContent value="favorites" className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Sản phẩm và dịch vụ yêu thích</CardTitle>
          <CardDescription>Sản phẩm và dịch vụ bạn đã lưu để sau.</CardDescription>
        </CardHeader>
        <CardContent>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favorites.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    width={4000}
                    height={4000}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-muted-foreground">${item.price.toFixed(2)}</p>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="default" className="h-8">
                        Xem
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        Xóa
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-medium text-lg mb-1">Chưa có yêu thích</h3>
              <p className="text-muted-foreground mb-4">
                Bạn chưa lưu bất kỳ sản phẩm hoặc dịch vụ nào.
              </p>
              <Button asChild>
                <Link href="/service">Xem dịch vụ</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
