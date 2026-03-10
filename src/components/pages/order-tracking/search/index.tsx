'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Package, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Loading,
} from '@/components/ui';
import { TOrderQuery } from '@/graphql/@types';
import { useOrderQuery } from '@/graphql/hooks';
import { toast } from '@/hooks/index';
import { orderFilterSchema, TOrderFilterSchema } from '@/shared/schema';
import { StringUtil } from '@/shared/utils';

interface IOrderTrackingSearchProps {
  setOrder: (order: TOrderQuery) => void;
}
export default function OrderTrackingSearch({ setOrder }: IOrderTrackingSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [trackingNumber, setTrackingNumber] = useState<string>('');

  const { data: orderData, loading: orderLoading } = useOrderQuery({
    where: { code: trackingNumber },
    skip: !trackingNumber,
  });
  useEffect(() => {
    try {
      if (!trackingNumber) return;
      if (!orderData?.order) throw new Error('Vui lòng kiểm tra lại mã đơn hàng của bạn.');

      setOrder(orderData?.order);
      toast({
        title: 'Đơn hàng đã được tìm thấy!',
        description: 'Đã tìm thấy đơn hàng của bạn.',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Đơn hàng không tồn tại',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    }
  }, [orderData, trackingNumber, setOrder]);

  const form = useForm<TOrderFilterSchema>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: { code: '' },
  });

  useEffect(() => {
    const orderCode = searchParams.get('code');
    if (!orderCode) return;

    setTrackingNumber(orderCode);
    form.setValue('code', orderCode);
  }, [searchParams, form]);

  const onSubmit = async (values: TOrderFilterSchema) => {
    router.push(`/order-tracking?code=${values.code}`);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Package className="mr-2" /> Theo dõi đơn hàng
        </CardTitle>
        <CardDescription>Nhập mã đơn hàng để kiểm tra trạng thái của đơn hàng.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã đơn hàng</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="VD: ORD-MB3UIGPVKS8G"
                        {...field}
                        className="pl-10"
                        disabled={orderLoading}
                      />
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={orderLoading}>
              {orderLoading ? <Loading /> : 'Theo dõi đơn hàng'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
