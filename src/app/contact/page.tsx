// import GoogleMap from '@/components/google-map';
import Contact from '@/components/pages/contact/content';
import ContactHero from '@/components/pages/contact/hero';

export default function ContactPage() {
  return (
    <main className="flex-grow">
      <div className="py-20 pt-32 md:pt-36">
        <div className="container mx-auto px-4 md:px-6">
          <ContactHero />

          {/* <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
            <GoogleMap />
          </div> */}
          <Contact />
        </div>
      </div>
    </main>
  );
}
