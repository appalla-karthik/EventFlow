import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    { id: '01', title: 'Event Planning & Strategy', desc: 'Comprehensive conceptualization and meticulous end-to-end planning.' },
    { id: '02', title: 'Luxury Venue Sourcing', desc: 'Access to exclusive, unlisted venues around the globe.' },
    { id: '03', title: 'Live Entertainment', desc: 'Booking A-list artists, speakers, and immersive performances.' },
    { id: '04', title: 'Technical Production', desc: 'State-of-the-art AV, lighting, and stage design.' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.service-item');
      
      items.forEach((item: any) => {
        gsap.fromTo(item, 
          { opacity: 0.2 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: "top center",
              end: "bottom center",
              scrub: true,
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 md:py-40 bg-secondary relative overflow-hidden" id="services">
      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
        <h2 className="text-[20vw] leading-none font-display text-white whitespace-nowrap">SERVICES</h2>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="space-y-16">
          {services.map((srv) => (
            <div key={srv.id} className="service-item flex flex-col md:flex-row gap-6 md:gap-12 items-baseline group border-b border-white/10 pb-8 cursor-none">
              <span className="text-lg sm:text-xl md:text-2xl font-medium text-primary mb-2 md:mb-0">
                {srv.id}
              </span>
              <div className="flex-1">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-display text-foreground group-hover:text-primary transition-colors duration-300">
                  {srv.title}
                </h3>
                <p className="text-muted-foreground mt-4 text-base sm:text-lg md:text-xl max-w-lg transition-colors duration-300 group-hover:text-foreground/80">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
