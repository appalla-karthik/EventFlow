import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Robust infinite marquee using RAF + lerped velocity
// – never stops, just changes speed / direction
export function Marquee() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;
    if (!r1 || !r2) return;

    // Each row has 4 copies — single-copy width = scrollWidth / 4
    const getTrack = (el: HTMLDivElement) => el.scrollWidth / 4;

    let pos1 = 0;
    let pos2 = 0;
    let vel1 = 1.4;        // px/frame, positive = left scroll
    let vel2 = -1.0;       // row2 goes opposite by default
    let target1 = 1.4;
    let target2 = -1.0;
    let rafId: number;
    let resetTimer: ReturnType<typeof setTimeout>;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const t1 = getTrack(r1);
      const t2 = getTrack(r2);

      // Lerp toward target velocity (smooth direction changes)
      vel1 = lerp(vel1, target1, 0.06);
      vel2 = lerp(vel2, target2, 0.06);

      pos1 += vel1;
      pos2 += vel2;

      // Seamless wraparound
      pos1 = ((pos1 % t1) + t1) % t1;
      pos2 = ((pos2 % t2) + t2) % t2;

      gsap.set(r1, { x: -pos1 });
      gsap.set(r2, { x: -pos2 });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onWheel = (e: WheelEvent) => {
      // Never let speed drop below minimum in either direction
      const factor = e.deltaY * 0.06;
      const MIN = 0.3;

      // Row 1 accelerates with scroll, min speed preserved
      const raw1 = factor;
      target1 = Math.abs(raw1) < MIN
        ? (raw1 >= 0 ? MIN : -MIN)
        : raw1;

      // Row 2 mirrors (opposite direction)
      target2 = -target1 * 0.7;

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        target1 = 1.4;
        target2 = -1.0;
      }, 200);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('wheel', onWheel);
      clearTimeout(resetTimer);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Build items — 4 copies each for seamless loop at any speed/direction
  const items1 = Array.from({ length: 4 }, () =>
    ["CURATING LUXURY EXPERIENCES", "•", "CINEMATIC EVENTS", "•",
      "CURATING LUXURY EXPERIENCES", "•", "ONCE IN A LIFETIME", "•"]
  ).flat();

  const items2 = Array.from({ length: 4 }, () =>
    ["MUSIC FESTIVALS", "◆", "GRAND OPENINGS", "◆", "CORPORATE GALAS", "◆",
      "PRIVATE PARTIES", "◆", "AWARD CEREMONIES", "◆", "WEDDING CEREMONIES", "◆"]
  ).flat();

  return (
    <div
      ref={sectionRef}
      className="w-full bg-[#070707] py-7 sm:py-9 overflow-hidden border-y border-white/[0.05] select-none"
    >
      {/* ── Row 1 — big display text ── */}
      <div className="overflow-hidden mb-5">
        <div ref={row1Ref} className="flex whitespace-nowrap will-change-transform">
          {items1.map((item, i) =>
            item === '•' ? (
              <span key={i} className="text-[#c9a84c]/50 text-3xl sm:text-4xl mx-3 sm:mx-5 self-center leading-none">•</span>
            ) : (
              <span
                key={i}
                className="text-[clamp(1.6rem,7vw,3rem)] sm:text-[clamp(2.2rem,5.5vw,5rem)] font-display font-bold text-foreground/90 uppercase tracking-[0.08em] sm:tracking-[0.12em] mx-4 sm:mx-8 leading-none"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>

      {/* ── Thin gold accent line ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/25 to-transparent my-3" />

      {/* ── Row 2 — italic reversed ── */}
      <div className="overflow-hidden mt-5">
        <div ref={row2Ref} className="flex whitespace-nowrap will-change-transform">
          {items2.map((item, i) =>
            item === '◆' ? (
              <span key={i} className="text-[#c9a84c]/25 text-sm sm:text-base mx-3 sm:mx-5 self-center leading-none">◆</span>
            ) : i % 6 < 2 ? (
              <span key={i} className="text-lg sm:text-2xl md:text-[2rem] font-display italic text-[#c9a84c]/65 uppercase tracking-widest mx-4 sm:mx-8 leading-none">
                {item}
              </span>
            ) : (
              <span key={i} className="text-lg sm:text-2xl md:text-[2rem] font-sans font-light text-white/18 uppercase tracking-[0.14em] sm:tracking-[0.2em] mx-4 sm:mx-8 leading-none">
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

