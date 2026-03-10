'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { PagePagination } from '@/components/common';
import ProductCard from '@/components/pages/handmade/card';
import ProductGridSkeleton from '@/components/pages/handmade/grid/skeleton';
import { useAuth } from '@/contexts/auth.context';
import {
  EOrderStatus,
  EPaymentStatus,
  EProductType,
  EShippingStatus,
  MetadataResponse,
  TCategoryQuery,
  TProductQuery,
  TProductsQuery,
} from '@/graphql/@types';
import {
  cartFilter,
  useAddToCartMutation,
  useCartQuery,
  useCreateCartMutation,
  useProductsQuery,
} from '@/graphql/hooks';
import { CartUtil } from '@/graphql/utils';
import { toast } from '@/hooks/use-toast';
import { StringUtil } from '@/shared/utils';

interface ProductGridProps {
  category?: TCategoryQuery;
}
const ProductGrid: React.FC<ProductGridProps> = ({ category }) => {
  const searchParams = useSearchParams();

  const { user: authUser } = useAuth();

  const [products, setProducts] = useState<TProductsQuery>([]);
  const [metadata, setMetadata] = useState<MetadataResponse>({});
  const [cartCode, setCartCode] = useState<string>('');

  const [addToCart] = useAddToCartMutation();
  const [createCart] = useCreateCartMutation();

  useEffect(() => {
    if (!cartCode) {
      setCartCode(CartUtil.initializeCartCode());
    }
  }, []);

  const { data: productsResponse, loading: productsLoading } = useProductsQuery({
    where: {
      type: EProductType.Product,
      ...(category && { category_ids: { $containsAnyInteger: [category.id] } }),
    },
    pagination: { page: 1, limit: 6 },
    order: { created_at: 'DESC' },
  });

  const { data: cartData } = useCartQuery({
    where: cartFilter({ user: authUser, code: cartCode }),
    skip: !authUser || !cartCode,
  });

  useEffect(() => {
    if (productsResponse?.products?.data) {
      setProducts(productsResponse.products.data);
    }

    if (productsResponse?.products?.metadata) {
      setMetadata(productsResponse.products.metadata);
    }
  }, [productsResponse]);

  const handleAddToCart = async (product: TProductQuery) => {
    if (!product) return;

    try {
      if (!cartData?.myCart) {
        const newCartData = {
          code: cartCode,
          status: EOrderStatus.Cart,
          payment_status: EPaymentStatus.Unpaid,
          shipping_status: EShippingStatus.Pending,
          total_cost: 0,
          service_fee: 0,
          tax: 0,
          discount: 0,
          final_cost: 0,
          ...(authUser && { customer_id: authUser.id }),
        };

        const result = await createCart(newCartData);
        if (!result.data?.createCart?.code) {
          throw new Error('Failed to create cart');
        }
        setCartCode(result.data.createCart.code);
      }

      const { data, errors } = await addToCart(cartCode, {
        product_id: product.id,
        variant_id: product.variants?.[0]?.id || 0,
        conversion_unit_id: product.conversion_units?.[0]?.id || 0,
        quantity: 1,
      });

      if (errors) {
        throw new Error(errors.map((error) => error.message).join(', '));
      }

      if (data?.addToCart) {
        toast({
          title: 'Đã thêm vào giỏ hàng',
          description: `Sản phẩm ${product.name} đã được thêm vào giỏ hàng của bạn.`,
          variant: 'success',
        });
      }
    } catch (error) {
      toast({
        title: 'Thêm sản phẩm vào giỏ hàng thất bại.',
        description: StringUtil.errorMessage({ error }),
        variant: 'destructive',
      });
    }
  };

  if (productsLoading) return <ProductGridSkeleton />;

  return (
    <section id="handmade-grid" className="flex flex-col justify-between lg:col-span-3 gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} onAddToCart={() => handleAddToCart(product)} />
          </div>
        ))}
      </div>

      <PagePagination path="/handmade" params={searchParams} metadata={metadata} />
    </section>
  );
};

export default ProductGrid;
