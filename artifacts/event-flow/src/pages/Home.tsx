import { useState } from 'react';
import { useLenis } from '@/hooks/use-lenis';
import { Preloader } from '@/components/Preloader';
import { Cursor } from '@/components/Cursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { FeaturedEvents } from '@/components/FeaturedEvents';
import { UpcomingEvents } from '@/components/UpcomingEvents';
import { HorizontalCategories } from '@/components/HorizontalCategories';
import { Stats } from '@/components/Stats';
import { Process } from '@/components/Process';
import { Services } from '@/components/Services';
import { Testimonials } from '@/components/Testimonials';
import { KineticShowcase } from '@/components/KineticShowcase';
import { PartnersMarquee } from '@/components/PartnersMarquee';
import { ContactCTA } from '@/components/ContactCTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useLenis();

  return (
    <>
      <Cursor />

      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div
        className={`transition-opacity duration-700 delay-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <FeaturedEvents />
          <UpcomingEvents />
          <HorizontalCategories />
          <Stats />
          <Process />
          <KineticShowcase />
          <Services />
          <Testimonials />
          <PartnersMarquee />
          <ContactCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
