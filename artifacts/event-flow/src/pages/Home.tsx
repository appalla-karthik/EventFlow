import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      setLoading(false);
    }, 3500);
    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (loading) return;
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace('#', '');
    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    const t1 = window.setTimeout(scrollToTarget, 120);
    const t2 = window.setTimeout(scrollToTarget, 420);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [loading]);

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
          <section id="events" className="scroll-mt-28">
            <FeaturedEvents />
          </section>
          <section id="upcoming" className="scroll-mt-28">
            <UpcomingEvents />
          </section>
          <HorizontalCategories />
          <Stats />
          <Process />
          <KineticShowcase />
          <section id="services" className="scroll-mt-28">
            <Services />
          </section>
          <Testimonials />
          <PartnersMarquee />
          <section id="contact" className="scroll-mt-28">
            <ContactCTA />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
