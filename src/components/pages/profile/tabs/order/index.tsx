'use client';

import { Package, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Loading,
  TabsContent,
} from '@/components/ui';
import { EOrderStatus, TOrdersQuery } from '@/graphql/@types';
import { useOrdersQuery } from '@/graphql/hooks';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/shared/constants';
import { NumberUtil } from '@/shared/utils';

interface IOrderElementProps {
  order: NonNullable<TOrdersQuery>[number];
}
const OrderElement = ({ order }: IOrderElementProps) => {
  if (!order) return <Loading />;

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between flex-wrap gap-2 mb-2">
        <div>
          <h4 className="font-medium">{order.code}</h4>
          <p className="text-sm text-muted-foreground">
            Đã đặt hàng vào {new Date(order.created_at || '').toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <span
            className={`py-1 px-2 rounded-full text-xs font-medium ${
              order.status === EOrderStatus.Completed
                ? 'bg-green-100 text-green-800'
                : order.status === EOrderStatus.Processing
                  ? 'bg-blue-100 text-blue-800'
                  : order.status === EOrderStatus.Cancelled
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
            }`}
          >
            {order.status}
          </span>
          <p className="font-semibold mt-1">{NumberUtil.formatCurrency(order.final_cost)}</p>
        </div>
      </div>
      <div className="flex justify-between mt-3">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/order-tracking?code=${order.code}`}>
            <Package className="mr-2 h-4 w-4" />
            Theo dõi đơn hàng
          </Link>
        </Button>
        <Button variant="ghost" size="sm">
          Xem chi tiết
        </Button>
      </div>
    </div>
  );
};
OrderElement.displayName = 'OrderElement';

interface IOrderListProps {
  orders: TOrdersQuery;
  loading: boolean;
}
const OrderList = ({ orders, loading }: IOrderListProps) => {
  if (loading) return <Loading />;

  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
        <h3 className="font-medium text-lg mb-1">Chưa có đơn hàng</h3>
        <p className="text-muted-foreground mb-4">Bạn chưa có đơn hàng nào.</p>
        <Button asChild>
          <Link href="/handmade">Xem sản phẩm</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderElement key={order.id} order={order} />
      ))}
    </div>
  );
};
OrderList.displayName = 'OrderList';

export default function ProfileOrderTab() {
  const [orders, setOrders] = useState<TOrdersQuery>([]);

  const { data, loading } = useOrdersQuery({
    where: { status: { $ne: EOrderStatus.Cart } },
    pagination: {
      page: DEFAULT_PAGE,
      limit: DEFAULT_PAGE_SIZE,
    },
  });

  useEffect(() => {
    if (data?.orders?.data) setOrders(data.orders.data);
  }, [data]);

  return (
    <TabsContent value="orders" className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử đơn hàng</CardTitle>
          <CardDescription>Xem chi tiết tất cả đơn hàng của bạn.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderList orders={orders} loading={loading} />
        </CardContent>
      </Card>
    </TabsContent>
  );
}
