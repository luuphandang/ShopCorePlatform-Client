'use client';

import { Info } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Loading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { TOrderQuery } from '@/graphql/@types';
import { NumberUtil } from '@/shared/utils';

interface IOrderTrackingDetailProps {
  order: TOrderQuery;
}

export default function OrderTrackingDetail({ order }: IOrderTrackingDetailProps) {
  if (!order) return <Loading />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chi tiết đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sản phẩm</TableHead>
              <TableHead className="text-right">Số lượng</TableHead>
              <TableHead className="text-right">Giá</TableHead>
              <TableHead className="text-right">Tổng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(order.order_details) &&
              order.order_details?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>{item.product?.name}</div>
                      {item?.note && (
                        <Tooltip>
                          <TooltipTrigger type="button">
                            <Info className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-[500px]">{item?.note}</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {NumberUtil.formatCurrency(item.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {NumberUtil.formatCurrency(item.final_cost)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        {order?.note && (
          <div className="flex justify-end w-full">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Ghi chú đơn hàng</p>
              <p className="text-sm">{order?.note}</p>
            </div>
          </div>
        )}
        <div className="flex justify-between w-full items-start">
          <Link href={'/cart'}>
            <Button variant="outline">Quay lại giỏ hàng</Button>
          </Link>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Tổng đơn hàng</p>
            <p className="text-xl font-bold">{NumberUtil.formatCurrency(order.final_cost)}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
