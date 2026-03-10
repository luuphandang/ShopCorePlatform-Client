import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div id="service-category-not-found" className="text-center py-20 md:py-28 animate-fade-in-up">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <h1 className="font-serif text-3xl font-medium text-primary mb-4">
          Không tìm thấy nhóm sản phẩm
        </h1>
        <p className="mb-6">Nhóm sản phẩm bạn đang tìm kiếm không tồn tại.</p>
        <Button asChild>
          <Link href="/handmade">Quay lại</Link>
        </Button>
      </div>
    </div>
  );
}
