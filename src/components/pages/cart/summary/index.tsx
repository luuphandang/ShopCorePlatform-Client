'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Check, ChevronDown, Info, MapPin, Phone, User } from 'lucide-react';
import moment from 'moment-timezone';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Loading,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { useAuth } from '@/contexts/auth.context';
import { TOrderQuery } from '@/graphql/@types';
import { useCheckoutCartMutation } from '@/graphql/hooks';
import { toast } from '@/hooks/index';
import { checkoutCartSchema, TCheckoutCartSchema } from '@/shared/schema';
import { NumberUtil, StringUtil } from '@/shared/utils/';

export interface ICartSummaryProps {
  cart: TOrderQuery;
}
export default function CartSummary({ cart }: ICartSummaryProps) {
  const { user: authUser, isLoading: isAuthLoading } = useAuth();
  const [checkoutCart] = useCheckoutCartMutation();

  const router = useRouter();
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<TCheckoutCartSchema>({
    resolver: zodResolver(checkoutCartSchema),
    defaultValues: {
      vouchers: [],
      address_id: 0,
      to_name: StringUtil.getFullName(authUser),
      to_phone: authUser?.phone || '',
      to_address: authUser?.address || '',
      to_ward: null,
      to_district: null,
      to_province: null,
      to_country: null,
      to_postal_code: null,
      to_latitude: null,
      to_longitude: null,
      estimated_delivery_at: moment().add(1, 'day').format('DD-MM-YYYY'),
      payment_method: 'cod',
      note: null,
    },
  });

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'discount') {
      setDiscountApplied(true);
      toast({
        title: 'Mã giảm giá đã được áp dụng',
        description: 'Giảm giá đã được áp dụng cho đơn hàng của bạn.',
        variant: 'success',
      });
    } else {
      toast({
        title: 'Mã giảm giá không hợp lệ',
        description: 'Mã giảm giá bạn nhập không hợp lệ.',
        variant: 'destructive',
      });
    }
  };

  const handleCheckout = async (formData: TCheckoutCartSchema) => {
    try {
      if (!cart) {
        throw new Error('Giỏ hàng không tồn tại.');
      }

      if (Array.isArray(cart?.order_details) && cart?.order_details.length === 0) {
        throw new Error('Vui lòng thêm sản phẩm vào giỏ hàng trước khi gửi đơn hàng.');
      }

      setIsProcessing(true);

      const { data: response } = await checkoutCart(cart?.code || '', formData);

      if (response?.checkoutCart) {
        setIsProcessing(false);
        toast({
          title: 'Đặt hàng thành công!',
          description: `Đơn hàng của bạn đã được đặt. Cảm ơn bạn đã mua hàng!`,
          variant: 'success',
        });

        const searchParams = new URLSearchParams();
        if (response?.checkoutCart.code) {
          searchParams.append('code', response?.checkoutCart.code);
          router.push(`/order-tracking?${searchParams.toString()}`);
        } else {
          router.push(`/`);
        }
      }
    } catch (error) {
      setIsProcessing(false);
      toast({
        title: 'Đặt hàng thất bại!',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (isAuthLoading) return;

    const subscription = form.watch((formData) => {
      console.log('Form values changed:', formData);
    });

    return () => subscription.unsubscribe();
  }, [form, isAuthLoading]);

  if (!cart)
    return (
      <div>
        <Card className="shadow-lg border-primary/10 sticky top-24">
          <CardContent>
            <Loading />
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div>
      <Card className="shadow-lg border-primary/10 sticky top-24">
        <CardHeader>
          <CardTitle>Tóm tắt đơn hàng</CardTitle>
          <CardDescription>Hoàn tất việc mua hàng an toàn</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCheckout)}>
            <CardContent className="space-y-6">
              <div className="flex space-x-2">
                <Input
                  placeholder="Mã giảm giá"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={discountApplied}
                />

                <Button
                  onClick={handleApplyCoupon}
                  variant="outline"
                  disabled={discountApplied || !couponCode}
                  type="button"
                >
                  Áp dụng
                </Button>
              </div>

              {discountApplied && (
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-500" />
                  <AlertTitle>Mã giảm giá đã được áp dụng!</AlertTitle>
                  <AlertDescription>
                    10% giảm giá đã được áp dụng cho đơn hàng của bạn.
                  </AlertDescription>
                </Alert>
              )}

              <div className="pt-4 border-t border-border/60">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tổng tiền</span>
                    <span>{NumberUtil.formatCurrency(cart?.total_cost)}</span>
                  </div>

                  {discountApplied && (
                    <div className="flex justify-between text-green-600">
                      <div className="flex items-center gap-2">
                        <div>Giảm giá</div>
                        <Tooltip>
                          <TooltipTrigger type="button">
                            <Info className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex justify-between gap-4">
                              <div>Phí vận chuyển:</div>
                              <div>20.000đ</div>
                            </div>
                            <div className="flex justify-between gap-4">
                              <div>Phí đóng gói:</div>
                              <div>20.000đ</div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div>-{NumberUtil.formatCurrency(cart?.discount)}</div>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div>Phí dịch vụ</div>
                      <Tooltip>
                        <TooltipTrigger type="button">
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent className="w-64">
                          <div className="flex justify-between gap-4">
                            <div>Phí vận chuyển:</div>
                            <div>20.000đ</div>
                          </div>
                          <div className="flex justify-between gap-4">
                            <div>Phí đóng gói:</div>
                            <div>20.000đ</div>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between gap-4">
                            <div>Tổng cộng</div>
                            <div>{NumberUtil.formatCurrency(cart?.service_fee)}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>{NumberUtil.formatCurrency(cart?.service_fee)}</div>
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div>Thuế</div>
                      <Tooltip>
                        <TooltipTrigger type="button">
                          <Info className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent className="w-64">
                          <div className="flex justify-between gap-4">
                            <div>Phí vận chuyển:</div>
                            <div>20.000đ</div>
                          </div>
                          <div className="flex justify-between gap-4">
                            <div>Phí đóng gói:</div>
                            <div>20.000đ</div>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between gap-4">
                            <div>Tổng cộng</div>
                            <div>{NumberUtil.formatCurrency(cart?.tax)}</div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div>{NumberUtil.formatCurrency(cart?.tax)}</div>
                  </div>

                  <div className="flex justify-between font-medium text-lg pt-2 border-t border-border/60">
                    <span>Tổng cộng</span>
                    <span>{NumberUtil.formatCurrency(cart?.final_cost)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Collapsible defaultOpen={true}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    <h3 className="font-medium">Thông tin vận chuyển</h3>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="to_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Người nhận hàng</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                placeholder="Nhập tên người nhận"
                                autoComplete="name"
                                className="pl-10"
                                disabled={isProcessing}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="to_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số điện thoại</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                placeholder="Nhập số điện thoại người nhận"
                                autoComplete="phone"
                                className="pl-10"
                                disabled={isProcessing}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="to_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Địa chỉ</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                placeholder="Nhập địa chỉ người nhận"
                                autoComplete="address"
                                className="pl-10"
                                disabled={isProcessing}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="estimated_delivery_at"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ngày giao hàng</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                placeholder="Nhập ngày giao hàng"
                                autoComplete="off"
                                className="pl-10"
                                value={field.value || ''}
                                disabled={isProcessing}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="note"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ghi chú</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Nhập ghi chú cho đơn hàng..."
                              autoComplete="off"
                              value={field.value || ''}
                              disabled={isProcessing}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CollapsibleContent>
                </Collapsible>
              </div>

              <div className="space-y-4">
                <Collapsible defaultOpen={true}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between">
                    <h3 className="font-medium">Thông tin thanh toán</h3>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="payment_method"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phương thức thanh toán</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue="cod"
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="cod" id="cod" />
                                <Label htmlFor="cod">COD</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                                <Label htmlFor="bank_transfer">Chuyển khoản</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="momo" id="momo" />
                                <Label htmlFor="momo">Momo</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                className="w-full"
                size="lg"
                type="submit"
                disabled={
                  isProcessing ||
                  !Array.isArray(cart?.order_details) ||
                  cart?.order_details.length === 0
                }
              >
                {isProcessing ? 'Đang xử lý...' : 'Đặt hàng'}
              </Button>
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" />
                <span>Đảm bảo hài lòng 100%</span>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
