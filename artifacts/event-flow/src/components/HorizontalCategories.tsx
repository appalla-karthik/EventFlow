import { useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useCategories } from '@/hooks/use-events';

gsap.registerPlugin(ScrollTrigger);

export function HorizontalCategories() {
  const { data: categories } = useCategories();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!categories || !sectionRef.current || !trackRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const panels = gsap.utils.toArray<HTMLElement>('.h-panel');
    const totalWidth = track.scrollWidth;
    const windowWidth = window.innerWidth;
    const scrollDistance = totalWidth - windowWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onLeave: () => {
            ScrollTrigger.refresh();
          }
        }
      });

      // Subtle scale animation on each panel
      panels.forEach((panel) => {
        const img = panel.querySelector('img');
        if (img) {
          gsap.fromTo(img,
            { scale: 1.1 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: gsap.globalTimeline,
                start: 'left right',
                end: 'left left',
                scrub: true,
              }
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [categories]);

  if (!categories) return null;

  return (
    <section ref={sectionRef} className="relative z-10 bg-[#0d0d0d] overflow-hidden">
      <div className="min-h-[100svh] sm:h-screen flex flex-col justify-center">
        <div className="absolute top-6 sm:top-10 left-6 md:left-16 z-20">
          <p className="text-[#c9a84c] text-xs font-medium tracking-[0.4em] uppercase mb-2">
            Explore By Category
          </p>
          <h2 className="text-white font-display text-2xl sm:text-3xl md:text-4xl">
            Event Categories
          </h2>
        </div>

        <div ref={trackRef} className="flex flex-nowrap h-[60vh] sm:h-[68vh] pt-14 sm:pt-16 will-change-transform">
          {/* Left padding panel */}
          <div className="w-6 md:w-16 flex-shrink-0" />
          
          {categories.map((cat, idx) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => navigate(`/categories/${cat.slug}`)}
              className="h-panel w-[85vw] md:w-[520px] flex-shrink-0 pr-3 sm:pr-4 md:pr-6 h-full flex flex-col cursor-none text-left"
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover will-change-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/5 transition-colors duration-500 z-10" />
                <div className="absolute bottom-8 left-6 z-20">
                  <p className="text-[#c9a84c] font-medium tracking-[0.3em] text-xs mb-3 font-mono">
                    0{idx + 1} —
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-display text-white leading-tight">
                    {cat.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-[#c9a84c] text-sm tracking-wider">Explore</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#c9a84c]">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}

          {/* Right padding */}
          <div className="w-6 md:w-16 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
