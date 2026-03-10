'use client';

import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import BookingProductTab from './product';
import BookingServiceTab from './service';

export default function BookingTabs() {
  const [activeTab, setActiveTab] = useState('service');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-8">
        <TabsTrigger value="service">Đặt lịch hẹn lấy tài liệu</TabsTrigger>
        <TabsTrigger value="product">Đặt sản phẩm tùy chỉnh</TabsTrigger>
      </TabsList>

      <BookingServiceTab />
      <BookingProductTab />
    </Tabs>
  );
}
