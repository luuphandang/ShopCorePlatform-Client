'use client';

import { Check } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';

export default function ProfileNotificationTab() {
  return (
    <TabsContent value="notification" className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Cài đặt thông báo</CardTitle>
          <CardDescription>Quản lý các tùy chọn thông báo của bạn.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cập nhật đơn hàng</p>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo về trạng thái đơn hàng của bạn
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email khuyến mãi</p>
                  <p className="text-sm text-muted-foreground">
                    Nhận các ưu đãi, giảm giá và tin tức
                  </p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" />
          <span>Thông tin cá nhân của bạn được chúng tôi bảo mật.</span>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}
