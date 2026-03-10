'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { Loading } from '@/components/ui';
import { useAuth } from '@/contexts/auth.context';
import { TOrderQuery } from '@/graphql/@types';
import { useCreateCartMutation } from '@/graphql/hooks/mutations';
import { cartFilter, useCartQuery } from '@/graphql/hooks/queries';
import { CartUtil } from '@/graphql/utils';
import { toast } from '@/hooks/use-toast';
import { StringUtil } from '@/shared/utils';

import CartItems from './items';
import CartSummary from './summary';

export default function CartContainer() {
  const { user: authUser, isLoading: isAuthLoading } = useAuth();

  const [cartCode, setCartCode] = useState<string>('');
  const [cart, setCart] = useState<TOrderQuery | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const [createCart] = useCreateCartMutation();

  useEffect(() => {
    if (!cartCode) {
      setCartCode(CartUtil.initializeCartCode());
    }
  }, []);

  const { data: cartData, loading: cartLoading } = useCartQuery({
    where: cartFilter({ user: authUser, code: cartCode }),
    skip: !authUser && !cartCode,
  });

  useEffect(() => {
    if (!cartData?.myCart) return;

    setCart(cartData.myCart);
    setCartCode(cartData.myCart.code);
  }, [cartData]);

  const initializeCart = useCallback(async () => {
    if (isInitializing) return;

    setIsInitializing(true);
    try {
      const createCartInput = {};

      if (authUser) {
        Object.assign(createCartInput, { customer_id: authUser.id });
      } else if (cartCode) {
        Object.assign(createCartInput, { code: cartCode });
      }

      const { data: newCart, errors } = await createCart(createCartInput);
      if (errors) throw new Error(errors.map((error) => error.message).join(', '));
      if (!newCart?.createCart) throw new Error('Dữ liệu giỏ hàng không chính xác');

      setCart(newCart.createCart);
      setCartCode(newCart.createCart.code);
    } catch (error) {
      toast({
        title: 'Khởi tạo giỏ hàng thất bại',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    } finally {
      setIsInitializing(false);
    }
  }, [isInitializing, authUser, cartCode, createCart]);

  useEffect(() => {
    if (isAuthLoading || cartLoading || cartData?.myCart || isInitializing) return;
    if (!authUser && !cartCode) return;

    initializeCart();
  }, [isAuthLoading, cartLoading, cartData, isInitializing, authUser, cartCode, initializeCart]);

  if (!cart) return <Loading />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <CartItems cart={cart} setCart={setCart} />
      <CartSummary cart={cart} />
    </div>
  );
}
