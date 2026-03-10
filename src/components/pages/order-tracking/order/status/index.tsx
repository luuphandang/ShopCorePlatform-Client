'use client';

import { Truck } from 'lucide-react';
import moment from 'moment-timezone';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Loading,
  Progress,
} from '@/components/ui';
import { EOrderStatus, EShippingStatus, TOrderQuery } from '@/graphql/@types';
import { EOrderStatusMap, EShippingStatusMap } from '@/shared/enums';

const getProgressPercentage = (order: TOrderQuery) => {
  const { status = '', shipping_status: shippingStatus = '' } = order || {};

  switch (status) {
    case EOrderStatus.Pending:
      return 10;
    case EOrderStatus.Confirmed:
      return 20;
    case EOrderStatus.Processing:
      return 40;
    case EOrderStatus.Shipped:
      switch (shippingStatus) {
        case EShippingStatus.Shipped:
          return 50;
        case EShippingStatus.InTransit:
          return 70;
        case EShippingStatus.Delivered:
          return 80;
        default:
          return 30;
      }
    case EOrderStatus.Completed:
      return 100;
    default:
      return 0;
  }
};

const getProgressStatus = (order: TOrderQuery) => {
  const { status = '', shipping_status: shippingStatus = '' } = order || {};

  if (status !== EOrderStatus.Shipped) {
    return EOrderStatusMap[status as keyof typeof EOrderStatusMap];
  }

  if (status === EOrderStatus.Shipped) {
    return EShippingStatusMap[shippingStatus as keyof typeof EShippingStatusMap];
  }
};

interface IOrderTrackingStatusProps {
  order: TOrderQuery;
}
export default function OrderTrackingStatus({ order }: IOrderTrackingStatusProps) {
  if (!order) return <Loading />;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="mr-2" /> Trạng thái đơn hàng
        </CardTitle>
        <CardDescription>
          Đơn hàng #{order.code} • Đặt lúc {moment(order.created_at).format('HH:mm DD/MM/YYYY')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Đã đặt</span>
            <span>Đã giao</span>
          </div>
          <Progress value={getProgressPercentage(order)} className="h-2" />
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Khách hàng</p>
            <p>
              {[order.customer?.first_name, order.customer?.last_name].filter(Boolean).join(' ') ||
                order?.order_details?.[0]?.shipping?.to_name}
            </p>
          </div>
          <div>
            <p className="font-medium">Dự kiến giao hàng</p>
            <p>
              {moment(order?.order_details?.[0]?.shipping?.estimated_delivery_at).format(
                'DD/MM/YYYY',
              )}
            </p>
          </div>
          <div>
            <p className="font-medium">Trạng thái hiện tại</p>
            <p className="capitalize">{getProgressStatus(order)}</p>
          </div>
          <div>
            <p className="font-medium">Sản phẩm</p>
            <p>
              {Array.isArray(order.order_details)
                ? order.order_details.reduce((sum, item) => sum + item.quantity, 0)
                : 0}{' '}
              sản phẩm
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
