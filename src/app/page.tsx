import HomeAbout from '@/components/pages/home/about';
import HomeContact from '@/components/pages/home/contact';
import HomeProducts from '@/components/pages/home/handmade';
import HomeHero from '@/components/pages/home/hero';
import HomeServices from '@/components/pages/home/service';

export default function HomePage() {
  return (
    <main id="home-page" className="flex flex-col">
      <HomeHero />
      <HomeServices />
      <HomeProducts />
      <HomeAbout />
      <HomeContact />
    </main>
  );
}
