import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Discovery & Vision',
    desc: 'We deep-dive into your brand, audience, and goals to craft a unique event concept that resonates deeply.',
    icon: '◈'
  },
  {
    num: '02',
    title: 'Strategic Planning',
    desc: 'Every detail planned meticulously — venues, talent, logistics, and timelines all perfectly orchestrated.',
    icon: '◉'
  },
  {
    num: '03',
    title: 'Creative Production',
    desc: 'Our award-winning design team transforms spaces into immersive worlds that leave guests breathless.',
    icon: '◎'
  },
  {
    num: '04',
    title: 'Flawless Execution',
    desc: 'On the day, our dedicated team ensures every moment unfolds exactly as envisioned — and beyond.',
    icon: '◍'
  }
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          }
        }
      );

      gsap.fromTo('.process-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="process-header text-center mb-14 sm:mb-24">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Methodology</p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display text-foreground uppercase">
            Our <span className="text-[#c9a84c] italic">Process</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-6 leading-relaxed text-sm sm:text-base">
            From first conversation to final curtain call, we orchestrate every element with precision and artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="process-card group p-6 sm:p-8 bg-[#161616] rounded-2xl border border-white/5 hover:border-[#c9a84c]/20 transition-all duration-500 cursor-none relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9a84c]/3 rounded-full -translate-y-16 translate-x-16 group-hover:bg-[#c9a84c]/8 transition-colors duration-500" />
              <div className="text-3xl sm:text-4xl mb-6 text-[#c9a84c]/40 group-hover:text-[#c9a84c]/70 transition-colors duration-300">
                {step.icon}
              </div>
              <p className="text-xs tracking-[0.3em] text-[#c9a84c] font-medium mb-4 font-mono">{step.num}</p>
              <h3 className="text-lg sm:text-xl font-display text-foreground mb-4 group-hover:text-white transition-colors leading-snug">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.desc}
              </p>
              <div className="mt-6 h-[1px] bg-gradient-to-r from-[#c9a84c]/0 via-[#c9a84c]/30 to-[#c9a84c]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
