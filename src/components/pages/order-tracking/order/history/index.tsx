'use client';

import { format } from 'date-fns';
import { MapPin } from 'lucide-react';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Loading,
} from '@/components/ui';
import { EOrderStatus, EShippingStatus, TOrderHistoriesQuery, TOrderQuery } from '@/graphql/@types';
import { EOrderStatusMap, EShippingStatusMap } from '@/shared/enums';

interface IOrderTrackingHistoryProps {
  order: TOrderQuery;
}
const getStatus = (history: NonNullable<TOrderHistoriesQuery>[number]) => {
  const { status = '', shipping_status: shippingStatus = '' } = history || {};

  switch (status) {
    case EOrderStatus.Pending:
      return EOrderStatusMap[EOrderStatus.Pending];
    case EOrderStatus.Confirmed:
      return EOrderStatusMap[EOrderStatus.Confirmed];
    case EOrderStatus.Processing:
      return EOrderStatusMap[EOrderStatus.Processing];
    case EOrderStatus.Shipped:
      switch (shippingStatus) {
        case EShippingStatus.Shipped:
          return EShippingStatusMap[EShippingStatus.Shipped];
        case EShippingStatus.InTransit:
          return EShippingStatusMap[EShippingStatus.InTransit];
        case EShippingStatus.Delivered:
          return EShippingStatusMap[EShippingStatus.Delivered];
        default:
          return EShippingStatusMap[EShippingStatus.Pending];
      }
    case EOrderStatus.Completed:
      return EOrderStatusMap[EOrderStatus.Completed];
    default:
      return '';
  }
};

export default function OrderTrackingHistory({ order }: IOrderTrackingHistoryProps) {
  if (!order) return <Loading />;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MapPin className="mr-2" /> Lịch sử theo dõi
        </CardTitle>
        <CardDescription>Cập nhật gần đây cho đơn hàng của bạn</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {Array.isArray(order?.histories) &&
            order.histories.map((history, index) => (
              <div key={index} className="mb-6 relative pl-8">
                {Array.isArray(order.histories) && index < order.histories.length - 1 && (
                  <div className="absolute left-3 top-4 w-0.5 h-full bg-muted"></div>
                )}
                <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="text-sm">
                  <p className="font-medium">{getStatus(history)}</p>
                  <p className="text-muted-foreground">
                    {format(history.created_at || new Date(), 'dd/MM/yyyy')}
                  </p>
                  {/* <p className="text-muted-foreground">{event.location}</p> */}
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
