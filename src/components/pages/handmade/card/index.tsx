'use client';

import { Heart, ShoppingCart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { TProductQuery } from '@/graphql/@types';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/libs/utils';
import { NumberUtil } from '@/shared/utils/number.util';

interface ProductCardProps {
  product: TProductQuery;
  onAddToCart: () => Promise<void>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);

  if (!product) return <div>Product not found</div>;

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLiked(!isLiked);

    if (!isLiked) {
      toast({
        title: 'Sản phẩm đã được thêm vào danh sách yêu thích',
        description: `${product.name} đã được thêm vào danh sách yêu thích của bạn.`,
        variant: 'success',
      });
    } else {
      toast({
        title: 'Sản phẩm đã được xóa khỏi danh sách yêu thích',
        description: `${product.name} đã được xóa khỏi danh sách yêu thích của bạn.`,
        variant: 'destructive',
      });
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await onAddToCart();
  };

  // Generate star rating display
  const renderRating = () => {
    return (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{(product.average_rating || 0).toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="group overflow-hidden rounded-lg border border-border/40 bg-white transition-all-300 hover:shadow-md">
      <Link href={`/handmade/${product.slug}`} className="block">
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={product.thumbnail?.url || ''}
            alt={product.name || ''}
            className="w-full h-full object-cover transition-all-400 group-hover:scale-105"
            width={4000}
            height={4000}
          />
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={toggleLike}
              className={cn(
                'rounded-full p-2 backdrop-blur-sm transition-all',
                isLiked
                  ? 'bg-white/80 text-red-500'
                  : 'bg-black/20 text-white hover:bg-white/80 hover:text-red-500',
              )}
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <div>
              <div className="inline-block text-xs font-medium uppercase tracking-wider text-primary/60">
                {product.categories?.[0]?.name}
              </div>
            </div>
            {renderRating()}
          </div>
          <h4 className="text-xl font-serif font-medium text-primary mb-2">{product.name}</h4>
          <p
            className="text-muted-foreground text-sm mb-3 line-clamp-2"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: product.description || '' }}
          />
          <div className="flex-col justify-between items-center">
            <div className="mb-4 font-medium text-primary">
              {NumberUtil.formatCurrency(product.base_unit?.price || 0)} VNĐ
            </div>
            <Button variant="outline" size="sm" className="gap-1" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
