import { useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const upcoming = [
  { date: "APR 12", year: "2025", title: "Monaco Grand Prix Gala", location: "Monte Carlo, Monaco", type: "GALA", seats: "250 seats left" },
  { date: "MAY 03", year: "2025", title: "Coachella Luxury Experience", location: "Palm Springs, CA", type: "FESTIVAL", seats: "Limited Access" },
  { date: "JUN 21", year: "2025", title: "Midsummer Corporate Retreat", location: "Oslo, Norway", type: "CORPORATE", seats: "50 seats left" },
  { date: "SEP 08", year: "2025", title: "Vienna Philharmonic Night", location: "Vienna, Austria", type: "CONCERT", seats: "100 seats left" },
  { date: "DEC 31", year: "2025", title: "New Year's Eve Spectacular", location: "Dubai, UAE", type: "CELEBRATION", seats: "VIP Only" },
];

export function UpcomingEvents() {
  const sectionRef = useRef<HTMLElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('.upcoming-row');
      rows.forEach((row, i) => {
        gsap.fromTo(row,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0 },
          {
            x: 0, opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
            }
          }
        );
      });

      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-background relative overflow-hidden" id="upcoming">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-20">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Coming Soon</p>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display text-foreground uppercase">
              Upcoming<br/><span className="text-[#c9a84c] italic">Events</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-left md:text-right mt-6 md:mt-0 leading-relaxed">
            Secure your place at the world's most exclusive gatherings
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-[1px] bg-white/5 origin-top">
            <div className="timeline-line absolute inset-0 bg-[#c9a84c]/30 origin-top" />
          </div>

          <div className="space-y-0">
            {upcoming.map((event, idx) => (
              <div
                key={idx}
                className="upcoming-row group flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center py-6 sm:py-8 border-b border-white/5 hover:border-[#c9a84c]/20 transition-all duration-300 cursor-none"
              >
                <div className="md:w-[120px] flex-shrink-0 text-center hidden md:block">
                  <p className="text-[#c9a84c] text-2xl font-display font-medium">{event.date}</p>
                  <p className="text-white/30 text-xs tracking-widest">{event.year}</p>
                </div>

                <div className="hidden md:flex w-4 h-4 rounded-full border border-[#c9a84c]/30 group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c]/10 flex-shrink-0 transition-all duration-300 relative z-10 mt-1" />

                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="md:hidden">
                    <p className="text-[#c9a84c] text-sm font-medium">{event.date} {event.year}</p>
                  </div>
                  <div>
                    <span className="text-xs tracking-[0.3em] text-[#c9a84c]/60 uppercase mb-2 block">{event.type}</span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-foreground group-hover:text-white transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">{event.location}</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-3">
                    <span className="text-xs text-white/40 tracking-wider">{event.seats}</span>
                    <button
                      onClick={() => navigate('/reserve')}
                      className="text-xs font-medium tracking-[0.2em] uppercase text-[#c9a84c] border border-[#c9a84c]/30 px-5 py-2 rounded-full group-hover:bg-[#c9a84c] group-hover:text-black transition-all duration-300 cursor-none"
                    >
                      Reserve →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
