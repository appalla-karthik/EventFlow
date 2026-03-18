import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline';
}

export function MagneticButton({ children, className, onClick, variant = 'solid' }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const textEl = textRef.current;
    if (!el || !textEl) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    
    const textXTo = gsap.quickTo(textEl, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const textYTo = gsap.quickTo(textEl, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
      textXTo(x * 0.2);
      textYTo(y * 0.2);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
      textXTo(0);
      textYTo(0);
    };

    el.addEventListener("mousemove", mouseMove);
    el.addEventListener("mouseleave", mouseLeave);

    return () => {
      el.removeEventListener("mousemove", mouseMove);
      el.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center px-8 py-4 rounded-full overflow-hidden group cursor-none",
        variant === 'solid' 
          ? "bg-primary text-primary-foreground hover:bg-primary/90" 
          : "border border-white/20 text-foreground hover:border-primary/50",
        className
      )}
    >
      {variant === 'solid' && (
        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] rounded-full" />
      )}
      <span ref={textRef} className="relative z-10 font-medium tracking-wide">
        {children}
      </span>
    </button>
  );
}
