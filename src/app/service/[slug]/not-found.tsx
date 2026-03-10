import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div id="service-not-found" className="flex-grow pt-24 pb-16">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <h1 className="font-serif text-3xl font-medium text-primary mb-4">
          Không tìm thấy dịch vụ
        </h1>
        <p className="mb-6">Dịch vụ bạn đang tìm kiếm không tồn tại.</p>
        <Button asChild>
          <Link href="/service">Quay lại</Link>
        </Button>
      </div>
    </div>
  );
}
