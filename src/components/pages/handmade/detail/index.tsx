'use client';

import { ChevronLeft, ChevronRight, Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/auth.context';
import { EOrderStatus, EPaymentStatus, EShippingStatus, TProductQuery } from '@/graphql/@types';
import {
  cartFilter,
  useAddToCartMutation,
  useCartQuery,
  useCreateCartMutation,
} from '@/graphql/hooks';
import { CartUtil } from '@/graphql/utils';
import { toast } from '@/hooks/index';
import { cn } from '@/libs/utils';
import { NumberUtil, StringUtil } from '@/shared/utils';

interface IProductFeaturesProps {
  features: NonNullable<TProductQuery>['features'];
}
const ProductFeatures = ({ features }: IProductFeaturesProps) => {
  if (!Array.isArray(features))
    return (
      <div className="border-t border-border pt-6">
        <h3 className="text-lg font-medium text-primary mb-2">Chi tiết sản phẩm</h3>
      </div>
    );

  return (
    <div className="border-t border-border pt-6">
      <h3 className="text-lg font-medium text-primary mb-2">Chi tiết sản phẩm</h3>
      <ul className="list-disc pl-5 text-muted-foreground space-y-1">
        {features?.map((feature, index) => (
          <li key={index}>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
ProductFeatures.displayName = 'ProductFeatures';

interface IProductDetailProps {
  product: TProductQuery;
}
const ProductDetail = ({ product }: IProductDetailProps) => {
  const { user: authUser } = useAuth();

  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartCode, setCartCode] = useState<string>('');

  const [addToCart] = useAddToCartMutation();
  const [createCart] = useCreateCartMutation();

  useEffect(() => {
    if (!cartCode) {
      setCartCode(CartUtil.initializeCartCode());
    }
  }, []);

  const { data: cartData } = useCartQuery({
    where: cartFilter({ user: authUser, code: cartCode }),
    skip: !authUser || !cartCode,
  });

  const toggleLike = () => {
    setIsLiked(!isLiked);

    if (!isLiked) {
      toast({
        title: 'Đã thêm vào danh sách yêu thích',
        description: `${product?.name} đã được thêm vào danh sách yêu thích của bạn.`,
        variant: 'success',
      });
    } else {
      toast({
        title: 'Đã xóa khỏi danh sách yêu thích',
        description: `${product?.name} đã được xóa khỏi danh sách yêu thích của bạn.`,
        variant: 'destructive',
      });
    }
  };

  const _addToCart = async () => {
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
        quantity,
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

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const nextImage = () => {
    if (product?.gallery_images && product.gallery_images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.gallery_images!.length);
    }
  };

  const prevImage = () => {
    if (product?.gallery_images && product.gallery_images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.gallery_images!.length) % product.gallery_images!.length,
      );
    }
  };

  const renderRating = (rating: number) => {
    return (
      <div className="flex items-center gap-1.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-5 w-5',
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : i < rating
                  ? 'fill-yellow-400/50 text-yellow-400'
                  : 'fill-gray-200 text-gray-200',
            )}
          />
        ))}
        <span className="text-sm font-medium ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border border-border bg-white relative">
            <Image
              src={
                product?.gallery_images?.[currentImageIndex]?.url || product?.thumbnail?.url || ''
              }
              alt={product?.name || ''}
              className="w-full h-full object-cover aspect-square"
              width={4000}
              height={4000}
            />
            {product?.gallery_images && product.gallery_images.length > 1 && (
              <Fragment>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </Fragment>
            )}
          </div>

          {product?.gallery_images && product.gallery_images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.gallery_images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    'relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors',
                    currentImageIndex === index ? 'border-primary' : 'border-transparent',
                  )}
                >
                  <Image
                    src={image.url}
                    alt={`${product?.name} - Image ${index + 1}`}
                    className="object-cover"
                    fill
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="animate-fade-in">
          <div className="mb-2">
            <span className="inline-block text-sm font-medium uppercase tracking-wider text-primary/60">
              {product?.categories?.[0]?.name || ''}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-medium text-primary mb-3">
            {product?.name}
          </h1>

          <div className="mb-4">{renderRating(product?.average_rating || 0)}</div>

          <div className="text-2xl font-medium text-primary mb-6">
            {NumberUtil.formatCurrency(product?.conversion_units?.[0]?.price || 0)}
          </div>

          <div
            className="text-muted-foreground mb-8"
            dangerouslySetInnerHTML={{ __html: product?.description || '' }}
          />

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-border rounded-md">
              <button
                onClick={decreaseQuantity}
                className="px-3 py-2 text-primary hover:bg-secondary transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-2 text-primary font-medium">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="px-3 py-2 text-primary hover:bg-secondary transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <Button className="flex-1 gap-2" onClick={_addToCart}>
              <ShoppingCart className="h-5 w-5" />
              Thêm vào giỏ hàng
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={cn(isLiked && 'text-red-500 border-red-200 hover:bg-red-50')}
              aria-label={isLiked ? 'Unlike' : 'Like'}
              onClick={toggleLike}
            >
              <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
            </Button>
          </div>

          <ProductFeatures features={product?.features} />
        </div>
      </div>
    </Fragment>
  );
};
ProductDetail.displayName = 'ProductDetail';

export { ProductDetail };
