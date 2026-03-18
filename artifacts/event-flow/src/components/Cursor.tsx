import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const xToCursor = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yToCursor = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.closest('[data-cursor-hover]') !== null;

      if (isInteractive && !isHovering) {
        isHovering = true;
        gsap.to(ring, {
          scale: 1.6,
          borderColor: "#c9a84c",
          backgroundColor: "rgba(201, 168, 76, 0.08)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursor, { scale: 0, duration: 0.25 });
      } else if (!isInteractive && isHovering) {
        isHovering = false;
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.25)",
          backgroundColor: "rgba(0, 0, 0, 0)",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(cursor, { scale: 1, duration: 0.25 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      {/* Ring — no Tailwind transition-colors, GSAP handles all color changes */}
      <div
        ref={ringRef}
        className="app-cursor fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ border: '1px solid rgba(255, 255, 255, 0.25)' }}
      />
      {/* Dot */}
      <div
        ref={cursorRef}
        className="app-cursor fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
}
