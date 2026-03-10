'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ProfileFavoriteTab from './favorite';
import ProfileNotificationTab from './notification';
import ProfileOrderTab from './order';

export default function ProfileTabs() {
  return (
    <div className="w-full md:w-2/3">
      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
          <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
          <TabsTrigger value="notification">Thông báo</TabsTrigger>
        </TabsList>

        <ProfileOrderTab />
        <ProfileFavoriteTab />
        <ProfileNotificationTab />
      </Tabs>
    </div>
  );
}
