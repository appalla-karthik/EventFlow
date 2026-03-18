import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Quote } from 'lucide-react';

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      text: "EventFlow transformed our annual gala into a cinematic experience. The attention to detail and flawless execution was unmatched in the industry.",
      author: "Eleanor Vance",
      role: "Director of Philanthropy",
    },
    {
      text: "From sourcing an impossible private villa to orchestrating world-class entertainment, they define luxury event management.",
      author: "Marcus Chen",
      role: "CEO, TechNova",
    },
    {
      text: "Our international summit felt like a beautifully directed film. They anticipated needs we didn't even know we had.",
      author: "Sarah Sterling",
      role: "VP of Marketing",
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.test-card', 
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 sm:py-32 px-6 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-primary text-sm font-medium tracking-[0.3em] uppercase mb-12 sm:mb-20">
          Client Experiences
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {testimonials.map((test, idx) => (
            <div key={idx} className="test-card p-6 sm:p-8 bg-card rounded-2xl border border-white/5 relative group hover:border-primary/30 transition-colors">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/20 absolute top-6 sm:top-8 left-6 sm:left-8" />
              <p className="text-lg sm:text-xl lg:text-2xl font-display italic text-foreground leading-relaxed mt-10 sm:mt-12 mb-6 sm:mb-8 relative z-10">
                "{test.text}"
              </p>
              <div className="border-t border-white/10 pt-6">
                <h4 className="font-medium text-foreground tracking-wide">{test.author}</h4>
                <p className="text-sm text-primary mt-1">{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
