'use client';

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';

import { Button, Card, CardFooter, Checkbox, Textarea } from '@/components/ui';
import { TOrderDetailQuery, TOrderQuery } from '@/graphql/@types';
import {
  useAddToCartMutation,
  useCartQuery,
  useClearCartMutation,
  useRemoveFromCartMutation,
} from '@/graphql/hooks';
import { useDebounce } from '@/hooks/use-debounce';
import { toast } from '@/hooks/use-toast';
import { NO_IMAGE_URL } from '@/shared/constants';
import { NumberUtil, StringUtil } from '@/shared/utils';

interface ICartItemsProps {
  cart: TOrderQuery;
  setCart: (cart: TOrderQuery) => void;
}

export default function CartItems({ cart, setCart }: ICartItemsProps) {
  const [showNotes, setShowNotes] = React.useState<Record<string, boolean>>({});

  const { refetch: refetchCart } = useCartQuery({
    where: { code: cart?.code },
    skip: true,
  });

  const [pendingQuantityUpdates, setPendingQuantityUpdates] = React.useState<
    Record<number, number>
  >({});
  const [pendingNoteUpdates, setPendingNoteUpdates] = React.useState<Record<number, string>>({});
  const [isUpdating, setIsUpdating] = React.useState<Record<string, boolean>>({});
  const debouncedQuantityUpdates = useDebounce(pendingQuantityUpdates, 800);
  const debouncedNoteUpdates = useDebounce(pendingNoteUpdates, 800);
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();

  const updateQuantities = useCallback(async () => {
    if (!Array.isArray(cart?.order_details) || !cart.code) return;

    const updates = Object.entries(debouncedQuantityUpdates);
    const noteUpdates = Object.entries(debouncedNoteUpdates);
    if (updates.length === 0 && noteUpdates.length === 0) return;

    try {
      for (const [key, quantity] of updates) {
        const orderDetail = cart.order_details?.find(
          (item: TOrderDetailQuery) => orderDetailKey(item) === key,
        );
        if (!orderDetail) continue;

        setIsUpdating((prev) => ({ ...prev, [key]: true }));

        await addToCart(cart.code, {
          product_id: orderDetail.product_id,
          variant_id: orderDetail.variant_id,
          conversion_unit_id: orderDetail.conversion_unit_id,
          quantity: quantity,
          note: orderDetail.note,
        });
        setIsUpdating((prev) => ({ ...prev, [key]: false }));
      }

      for (const [key, note] of noteUpdates) {
        const orderDetail = cart.order_details?.find(
          (item: TOrderDetailQuery) => orderDetailKey(item) === key,
        );
        if (!orderDetail) continue;

        setIsUpdating((prev) => ({ ...prev, [key]: true }));
        await addToCart(cart.code, {
          product_id: orderDetail.product_id,
          variant_id: orderDetail.variant_id,
          conversion_unit_id: orderDetail.conversion_unit_id,
          quantity: orderDetail.quantity,
          note: note,
        });
        setIsUpdating((prev) => ({ ...prev, [key]: false }));
      }

      const { data: cartData } = await refetchCart();
      if (cartData?.myCart) {
        setCart(cartData.myCart);
      }

      setPendingQuantityUpdates({});
      setPendingNoteUpdates({});
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    }
  }, [debouncedNoteUpdates, debouncedQuantityUpdates]);

  useEffect(() => {
    updateQuantities();
  }, [debouncedNoteUpdates, debouncedQuantityUpdates]);

  const handleQuantityChange = (key: string, newQuantity: number) => {
    if (!cart) return;

    if (newQuantity > 0 && !isUpdating[key]) {
      setCart({
        ...cart,
        order_details: Array.isArray(cart.order_details)
          ? cart.order_details.map((item) =>
              orderDetailKey(item) === key ? { ...item, quantity: newQuantity } : item,
            )
          : cart.order_details,
      });

      setPendingQuantityUpdates((prev) => ({
        ...prev,
        [key]: newQuantity,
      }));
    }
  };

  const handleRemoveItem = async (key: string) => {
    if (!Array.isArray(cart?.order_details) || !cart.code) return;

    const orderDetail = cart.order_details?.find((item) => orderDetailKey(item) === key);
    if (!orderDetail) return;

    // Optimistic: remove item from UI immediately
    const previousCart = { ...cart };
    setCart({
      ...cart,
      order_details: cart.order_details.filter((item) => orderDetailKey(item) !== key),
    });

    try {
      await removeFromCart(cart.code, {
        product_id: orderDetail.product_id,
        variant_id: orderDetail.variant_id,
        conversion_unit_id: orderDetail.conversion_unit_id,
      });

      // Refetch to sync with server (costs, totals, etc.)
      const { data: cartData } = await refetchCart();
      if (cartData?.myCart) {
        setCart(cartData.myCart);
      }

      toast({
        title: 'Sản phẩm đã được xóa',
        description: 'Sản phẩm đã được xóa khỏi giỏ hàng của bạn.',
        variant: 'success',
      });
    } catch (error) {
      // Rollback on error
      setCart(previousCart);
      toast({
        title: 'Xoá sản phẩm thất bại',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    }
  };

  const handleClearCart = async () => {
    if (!cart?.code) return;

    // Optimistic: clear items from UI immediately
    const previousCart = { ...cart };
    setCart({ ...cart, order_details: [] });

    try {
      await clearCart(cart.code);

      const { data: cartData } = await refetchCart();
      if (cartData?.myCart) {
        setCart(cartData.myCart);
      }
    } catch {
      // Rollback on error
      setCart(previousCart);
    }
  };

  const handleNoteChange = (key: string, note: string) => {
    if (!Array.isArray(cart?.order_details) || !cart.code) return;

    setCart({
      ...cart,
      order_details: Array.isArray(cart.order_details)
        ? cart.order_details.map((item) =>
            orderDetailKey(item) === key ? { ...item, note } : item,
          )
        : cart.order_details,
    });

    setPendingNoteUpdates((prev) => ({
      ...prev,
      [key]: note,
    }));
  };

  const orderDetailKey = (item: TOrderDetailQuery) => {
    return `${item.product_id}-${item.variant_id}-${item.conversion_unit_id}`;
  };

  return (
    <div className="lg:col-span-2 space-y-4 text-sm">
      {Array.isArray(cart?.order_details) && cart.order_details.length > 0 ? (
        <>
          <Card className="flex justify-between items-center p-4">
            <div className="w-1/4"></div>
            <div className="w-1/3 font-medium pl-4">Sản phẩm</div>
            <div className="w-1/5 font-medium text-center">Đơn giá</div>
            <div className="w-1/4 font-medium text-center">Số lượng</div>
            <div className="w-1/5 font-medium text-center">Thành tiền</div>
            <div className="w-16 text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleClearCart()}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
              </Button>
            </div>
          </Card>
          {cart.order_details.map((item, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="flex items-center p-4">
                <div className="w-1/4 flex justify-center items-center">
                  <Image
                    src={item.product?.thumbnail?.url || NO_IMAGE_URL}
                    alt={item.product?.thumbnail?.name || 'No Image'}
                    className="w-full object-cover rounded-md"
                    width={4000}
                    height={4000}
                  />
                </div>
                <div className="w-1/3 pl-4">
                  <h3 className="font-medium text-sm">{item.variant?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {/* {item.product?.categories?.[0]?.name} */}
                    {item.product?.name}
                  </p>
                </div>
                <div className="w-1/5 text-center text-muted-foreground">
                  <p className="font-medium text-sm">{NumberUtil.formatCurrency(item.price)}</p>
                </div>
                <div className="w-1/4 flex justify-center items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(orderDetailKey(item), item.quantity - 1)}
                      disabled={isUpdating[orderDetailKey(item)]}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(orderDetailKey(item), item.quantity + 1)}
                      disabled={isUpdating[orderDetailKey(item)]}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="w-1/5 text-center text-muted-foreground">
                  <p className="font-medium">
                    {NumberUtil.formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
                <div className="w-16 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(orderDetailKey(item))}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                  </Button>
                </div>
              </div>

              <CardFooter className="p-4 pt-0 w-full">
                <div className="w-full">
                  <Checkbox
                    id={`note-checkbox-${orderDetailKey(item)}`}
                    checked={showNotes[orderDetailKey(item)] || !!item.note}
                    onCheckedChange={(checked) =>
                      setShowNotes((prev) => ({
                        ...prev,
                        [orderDetailKey(item)]: checked as boolean,
                      }))
                    }
                  />
                  <label
                    htmlFor={`note-checkbox-${orderDetailKey(item)}`}
                    className="text-sm text-muted-foreground ml-3"
                  >
                    Ghi chú cho sản phẩm
                  </label>

                  {(showNotes[orderDetailKey(item)] || !!item.note) && (
                    <Textarea
                      placeholder="Nhập ghi chú cho sản phẩm..."
                      className="w-full mt-3"
                      rows={2}
                      value={item.note || ''}
                      onChange={(e) => handleNoteChange(orderDetailKey(item), e.target.value)}
                    />
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </>
      ) : (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
            <h3 className="text-xl font-medium">Giỏ hàng của bạn trống</h3>
            <p className="text-muted-foreground">
              Duyệt qua các sản phẩm của chúng tôi và thêm chúng vào giỏ hàng của bạn.
            </p>
            <Link href="/handmade">
              <Button className="mt-2">Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
