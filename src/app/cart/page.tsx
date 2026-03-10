import CartContainer from '@/components/pages/cart';
import CartHero from '@/components/pages/cart/hero';

export default function CartPage() {
  return (
    <main className="flex-grow py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <CartHero />

        <CartContainer />
      </div>
    </main>
  );
}
