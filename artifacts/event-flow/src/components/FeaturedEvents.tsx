import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import gsap from 'gsap';
import { useFeaturedEvents } from '@/hooks/use-events';
import { ArrowUpRight } from 'lucide-react';

export function FeaturedEvents() {
  const { data: events } = useFeaturedEvents();
  const containerRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  // Section header and row stagger animations
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo('.fe-heading',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: '.fe-heading', start: 'top 85%' } }
      );

      // Rows stagger in
      gsap.fromTo('.fe-row',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: '.fe-rows', start: 'top 80%' }
        }
      );

      // Divider lines draw in
      gsap.fromTo('.fe-line',
        { scaleX: 0, transformOrigin: 'left' },
        {
          scaleX: 1, duration: 1.2, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.fe-rows', start: 'top 80%' }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [events]);

  // Floating image follows mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!imgWrapRef.current) return;
      gsap.to(imgWrapRef.current, {
        x: e.clientX - 180,
        y: e.clientY - 200,
        duration: 0.55,
        ease: 'power2.out',
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const currentEvent = events?.find(e => e.id === hoveredId);

  if (!events) return null;

  return (
    <section ref={containerRef} className="py-20 sm:py-28 px-5 sm:px-6 md:px-12 bg-background relative overflow-hidden" id="events">
      {/* Floating hover image — follows cursor */}
      <div
        ref={imgWrapRef}
        className="fixed top-0 left-0 z-[60] pointer-events-none transition-opacity duration-300"
        style={{ opacity: hoveredId !== null ? 1 : 0 }}
      >
        <div className="w-[340px] h-[220px] rounded-2xl overflow-hidden shadow-2xl">
          {currentEvent && (
            <img
              ref={imgRef}
              src={currentEvent.image}
              alt={currentEvent.title}
              className="w-full h-full object-cover"
              style={{ transition: 'opacity 0.3s' }}
            />
          )}
          {/* Gold shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/10 via-transparent to-transparent" />
          {/* Category pill */}
          {currentEvent && (
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-full text-[10px] tracking-widest uppercase text-[#c9a84c] border border-[#c9a84c]/30">
                {currentEvent.category}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="fe-heading flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-6">
          <div>
            <p className="text-[#c9a84c] text-[11px] tracking-[0.4em] uppercase mb-4">Our Work</p>
            <h2 className="text-[clamp(2.2rem,9vw,4.2rem)] sm:text-[clamp(3rem,7vw,7rem)] font-display leading-[0.9] uppercase">
              Featured<br />
              <span className="text-[#c9a84c] italic">Events</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-foreground/40 text-sm max-w-xs text-right hidden md:block leading-relaxed">
              Experiences crafted for those who demand nothing less than extraordinary.
            </p>
            <button className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-[#c9a84c] hover:text-white transition-colors pb-px border-b border-[#c9a84c]/40 hover:border-white/30">
              View All Events
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Editorial list rows */}
        <div className="fe-rows">
          {/* Top border */}
          <div className="fe-line h-px bg-white/10 mb-0" />

          {events.map((event, i) => (
            <div key={event.id}>
              <div
                className="fe-row group relative flex flex-col md:flex-row items-start md:items-center md:justify-between py-6 sm:py-7 md:py-9 cursor-pointer gap-3 sm:gap-4 overflow-hidden"
                onClick={() => navigate(`/events/${event.id}`)}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Hover background fill */}
                <div
                  className="absolute inset-0 bg-[#c9a84c]/[0.04] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"
                />

                {/* Index number */}
                <span className="relative text-xs font-mono text-foreground/25 group-hover:text-[#c9a84c]/60 transition-colors duration-300 w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Category */}
                <span className="relative hidden md:block text-[10px] tracking-[0.3em] uppercase text-foreground/30 group-hover:text-[#c9a84c]/70 transition-colors duration-300 w-28 shrink-0">
                  {event.category}
                </span>

                {/* Title — expands */}
                <h3 className="relative flex-1 text-xl sm:text-2xl md:text-[clamp(1.6rem,3.5vw,3.2rem)] font-display uppercase text-foreground group-hover:text-white transition-colors duration-300 leading-none">
                  <span className="inline-block group-hover:translate-x-1.5 transition-transform duration-500">
                    {event.title}
                  </span>
                </h3>

                {/* Location */}
                <span className="relative hidden lg:block text-sm text-foreground/35 group-hover:text-foreground/60 transition-colors duration-300 text-right shrink-0">
                  {event.location}
                </span>

                {/* Date */}
                <span className="relative font-display italic text-lg sm:text-xl md:text-2xl text-foreground/50 group-hover:text-[#c9a84c] transition-colors duration-300 shrink-0">
                  {event.date}
                </span>

                {/* Arrow */}
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/10 group-hover:border-[#c9a84c]/60 flex items-center justify-center transition-all duration-300 group-hover:bg-[#c9a84c]/10 shrink-0">
                  <ArrowUpRight className="w-4 h-4 text-foreground/30 group-hover:text-[#c9a84c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </div>
              {/* Row divider */}
              <div className="fe-line h-px bg-white/8" />
            </div>
          ))}
        </div>

        {/* Stats strip below list */}
        <div className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '500+', label: 'Events Curated' },
            { num: '40+', label: 'Global Cities' },
            { num: '98%', label: 'Client Satisfaction' },
            { num: '12', label: 'Years of Excellence' },
          ].map(({ num, label }) => (
            <div key={label} className="group p-4 sm:p-6 border border-white/[0.06] rounded-xl hover:border-[#c9a84c]/30 transition-colors duration-300 bg-white/[0.02]">
              <p className="text-3xl sm:text-4xl font-display text-foreground group-hover:text-[#c9a84c] transition-colors duration-300 mb-1">{num}</p>
              <p className="text-[11px] tracking-[0.3em] uppercase text-foreground/35">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
