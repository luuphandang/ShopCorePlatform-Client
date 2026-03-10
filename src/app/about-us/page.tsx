import AboutUsCoreValue from '@/components/pages/about-us/core-value';
import AboutUsHero from '@/components/pages/about-us/hero';
import AboutUsIntroduce from '@/components/pages/about-us/introduce';
import AboutUsOurTeam from '@/components/pages/about-us/our-team';
import AboutUsWorkingHour from '@/components/pages/about-us/working-hour';

export default function AboutUsPage() {
  return (
    <main className="flex-grow">
      <AboutUsHero />
      <AboutUsIntroduce />
      <AboutUsCoreValue />
      <AboutUsOurTeam />
      <AboutUsWorkingHour />
    </main>
  );
}
