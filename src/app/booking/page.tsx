import BookingHero from '@/components/pages/booking/hero';
import BookingTabs from '@/components/pages/booking/tabs';

export default function BookingPage() {
  return (
    <main className="flex-grow pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <BookingHero />

        <div className="max-w-4xl mx-auto">
          <BookingTabs />
        </div>
      </div>
    </main>
  );
}
