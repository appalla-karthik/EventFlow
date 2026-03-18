import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const stats = [
    { label: "Events Delivered", value: 500, suffix: "+" },
    { label: "Happy Guests", value: 50, suffix: "K+" },
    { label: "Years Experience", value: 12, suffix: "" },
    { label: "Client Satisfaction", value: 98, suffix: "%" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray('.stat-num');
      
      numbers.forEach((num: any, i) => {
        const targetValue = stats[i].value;
        gsap.to(num, {
          textContent: targetValue,
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 bg-background relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-8 divide-x divide-white/5">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center px-4">
              <div className="flex items-center justify-center text-4xl sm:text-6xl md:text-7xl font-display text-primary mb-4 drop-shadow-lg">
                <span className="stat-num">0</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
