import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="flex-grow pt-24 pb-16">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-medium text-primary mb-4">Sản phẩm không tồn tại</h1>
        <p className="text-muted-foreground mb-6">
          Xin lỗi, sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Button asChild>
          <Link href="/handmade">Xem sản phẩm khác</Link>
        </Button>
      </div>
    </main>
  );
}
