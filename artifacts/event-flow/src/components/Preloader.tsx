import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let current = 0;
    const updateProgress = () => {
      current += Math.random() * 5;
      if (current > 100) current = 100;
      setProgress(Math.floor(current));
      
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: current / 100 });
      }

      if (current < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        finishAnimation();
      }
    };

    const finishAnimation = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.display = 'none';
          onComplete();
        }
      });

      tl.to(contentRef.current, { opacity: 0, duration: 0.4, ease: "power2.inOut" }, "+=0.2")
        .to([topPanelRef.current, bottomPanelRef.current], {
          height: 0,
          duration: 0.8,
          ease: "expo.inOut",
          stagger: 0
        }, "-=0.1");
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(updateProgress);
    }, 200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col pointer-events-none">
      <div ref={topPanelRef} className="w-full h-[50vh] bg-background origin-top" />
      <div ref={bottomPanelRef} className="w-full h-[50vh] bg-background origin-bottom" />
      
      <div ref={contentRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
        <div className="text-primary text-sm tracking-[0.2em] mb-4 font-medium">EVENTFLOW</div>
        <div className="text-4xl sm:text-6xl md:text-8xl font-display font-light text-foreground mb-6 sm:mb-8 tabular-nums">
          {progress}%
        </div>
        <div className="w-48 sm:w-64 h-[1px] bg-white/10 relative overflow-hidden">
          <div ref={lineRef} className="absolute top-0 left-0 h-full bg-primary origin-left scale-x-0" />
        </div>
      </div>
    </div>
  );
}
