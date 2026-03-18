import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useHeroSlides } from '@/hooks/use-events';
import { splitTextToChars } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react';

export function Hero() {
  const { data: slides } = useHeroSlides();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [muted, setMuted] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const slidesWrapRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const videosRef = useRef<(HTMLVideoElement | null)[]>([]);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const subtitleRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  // SVG distortion + slide swap
  const goToSlide = useCallback((nextIdx: number) => {
    if (isAnimating || nextIdx === currentIndex || !slides) return;
    setIsAnimating(true);

    const outTitle = titlesRef.current[currentIndex];
    const inTitle = titlesRef.current[nextIdx];
    const outSub = subtitleRefs.current[currentIndex];
    const inSub = subtitleRefs.current[nextIdx];
    const isNext = nextIdx > currentIndex;

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // 1. Exit current text
    if (outTitle) {
      const chars = outTitle.querySelectorAll('.split-char-inner');
      tl.to(chars, { y: isNext ? '-110%' : '110%', opacity: 0, duration: 0.55, stagger: 0.015, ease: 'power3.in' }, 0);
    }
    if (outSub) tl.to(outSub, { opacity: 0, y: -10, duration: 0.3 }, 0);

    // 2. Ramp up SVG distortion
    if (turbulenceRef.current && displacementRef.current) {
      tl.to(turbulenceRef.current, {
        attr: { baseFrequency: '0.045 0.025' },
        duration: 0.45, ease: 'power2.in'
      }, 0.2);
      tl.to(displacementRef.current, {
        attr: { scale: 180 },
        duration: 0.45, ease: 'power2.in'
      }, 0.2);
    }

    // 3. Swap slide midpoint
    tl.add(() => {
      setCurrentIndex(nextIdx);
      const vid = videosRef.current[nextIdx];
      if (vid) { vid.currentTime = 0; vid.play().catch(() => {}); }
    }, 0.55);

    // 4. Release distortion
    if (turbulenceRef.current && displacementRef.current) {
      tl.to(turbulenceRef.current, {
        attr: { baseFrequency: '0 0' },
        duration: 0.7, ease: 'power3.out'
      }, 0.6);
      tl.to(displacementRef.current, {
        attr: { scale: 0 },
        duration: 0.7, ease: 'power3.out'
      }, 0.6);
    }

    // 5. Enter next text
    if (inTitle) {
      const chars = inTitle.querySelectorAll('.split-char-inner');
      gsap.set(chars, { y: isNext ? '110%' : '-110%', opacity: 1 });
      tl.to(chars, { y: '0%', duration: 0.85, stagger: 0.025, ease: 'power4.out' }, 0.65);
    }
    if (inSub) {
      gsap.set(inSub, { opacity: 0, y: 12 });
      tl.to(inSub, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.9);
    }
  }, [isAnimating, currentIndex, slides]);

  const nextSlide = useCallback(() => {
    if (!slides) return;
    goToSlide((currentIndex + 1) % slides.length);
  }, [slides, currentIndex, goToSlide]);

  const prevSlide = useCallback(() => {
    if (!slides) return;
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }, [slides, currentIndex, goToSlide]);

  // Auto-advance
  useEffect(() => {
    if (!slides) return;
    const t = setInterval(nextSlide, 7500);
    return () => clearInterval(t);
  }, [slides, nextSlide]);

  // ── PAGE LOAD: clip-path reveal + staggered text ──
  useEffect(() => {
    if (!containerRef.current) return;
    // Video clip-path cinematic reveal
    const wrap = slidesWrapRef.current;
    if (wrap) {
      gsap.fromTo(wrap,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.4, ease: 'power4.inOut', delay: 1.1 }
      );
    }

    // Subtitle fade in
    const sub = subtitleRefs.current[0];
    if (sub) {
      gsap.fromTo(sub, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, delay: 2.0, ease: 'power2.out' });
    }

    // Split-text staggered reveal
    const title = titlesRef.current[0];
    if (title) {
      const chars = title.querySelectorAll('.split-char-inner');
      gsap.fromTo(chars,
        { y: '110%', opacity: 1 },
        { y: '0%', duration: 1.0, stagger: 0.045, ease: 'power4.out', delay: 1.5 }
      );
    }

    // Init distortion to 0
    if (turbulenceRef.current) {
      gsap.set(turbulenceRef.current, { attr: { baseFrequency: '0 0' } });
    }
    if (displacementRef.current) {
      gsap.set(displacementRef.current, { attr: { scale: 0 } });
    }
  }, []);

  // Parallax scroll on hero
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.hero-bg-inner', {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, [slides]);

  useEffect(() => {
    videosRef.current.forEach(v => { if (v) v.muted = muted; });
  }, [muted]);

  useEffect(() => {
    if (!slides) return;
    const t = setTimeout(() => {
      videosRef.current.forEach(v => {
        if (v) v.play().catch(() => {});
      });
    }, 150);
    return () => clearTimeout(t);
  }, [slides]);

  if (!slides) return null;

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] sm:h-screen mt-[8px] sm:mt-[12px] md:mt-[16px] overflow-hidden bg-background">

      {/* ── SVG Distortion Filter ── */}
      <svg className="absolute w-0 h-0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="hero-distortion" x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence
              ref={turbulenceRef}
              type="turbulence"
              baseFrequency="0 0"
              numOctaves="3"
              seed="8"
              result="turbulence"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="turbulence"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Film grain */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── Slides wrapper — clip-path reveal + distortion applied here ── */}
      <div
        ref={slidesWrapRef}
        className="absolute inset-0"
        style={{
          clipPath: 'inset(0 0 0% 0)',
          WebkitClipPath: 'inset(0 0 0% 0)',
          filter: 'url(#hero-distortion)',
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              opacity: idx === currentIndex ? 1 : 0,
              transition: 'opacity 0.01s',
              zIndex: idx === currentIndex ? 1 : 0,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/12 to-background z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-transparent z-10" />

            <div className="absolute inset-0 overflow-hidden hero-bg-inner z-0">
              <video
                ref={el => videosRef.current[idx] = el}
                className="absolute inset-0 w-full h-full object-cover scale-[1.1]"
                src={slide.video}
                data-fallback={slide.videoFallback}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={e => {
                  const t = e.currentTarget;
                  const fallback = t.dataset.fallback;
                  if (fallback) {
                    t.src = fallback;
                    t.load();
                    t.play().catch(() => {});
                    t.dataset.fallback = '';
                  }
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Vertical slide counter ── */}
      <div
        className="absolute left-3 sm:left-7 top-1/2 z-20 flex flex-col items-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-medium tracking-[0.25em] text-foreground/40"
        style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
      >
        <span className="text-primary font-bold text-xs sm:text-sm">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="w-px h-8 sm:h-10 bg-white/15 mx-auto" />
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* ── Dot nav ── */}
      <div className="absolute right-3 sm:right-7 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 sm:gap-3 scale-90 sm:scale-100 origin-center">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className="w-[2px] sm:w-[3px] rounded-full transition-all duration-500"
            style={{
              height: idx === currentIndex ? 44 : 12,
              backgroundColor: idx === currentIndex ? '#c9a84c' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>

      {/* ── Hero text ── */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex flex-col justify-center">
        <div className="relative w-full">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className="absolute left-0 right-0"
              style={{
                top: '46%',
                transform: 'translateY(-50%)',
                pointerEvents: idx === currentIndex ? 'auto' : 'none',
                visibility: idx === currentIndex ? 'visible' : 'hidden',
              }}
            >
              <p
                ref={el => subtitleRefs.current[idx] = el}
                className="text-primary font-medium tracking-[0.32em] sm:tracking-[0.4em] text-[10px] sm:text-[11px] md:text-xs mb-5 sm:mb-7 uppercase opacity-0"
              >
                {slide.subtitle}
              </p>
              <h1
                ref={el => titlesRef.current[idx] = el}
                className="text-[clamp(2.4rem,9vw,4.8rem)] sm:text-[clamp(3.5rem,10.5vw,138px)] leading-[0.9] sm:leading-[0.88] font-display text-foreground uppercase flex flex-wrap gap-x-2 sm:gap-x-[1.5vw]"
              >
                {slide.title.split(' ').map((word, wIdx) => (
                  <span key={wIdx} className="flex overflow-hidden">
                    {splitTextToChars(word).map((char, cIdx) => (
                      <span key={cIdx} className="split-char">
                        <span
                          className="split-char-inner inline-block"
                          style={{ transform: idx === 0 ? 'translateY(110%)' : undefined }}
                        >
                          {char}
                        </span>
                      </span>
                    ))}
                  </span>
                ))}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="absolute bottom-16 sm:bottom-10 left-5 sm:left-14 right-5 sm:right-14 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-0">
        <div className="flex flex-col gap-1.5">
          <p className="text-lg sm:text-xl font-display italic text-foreground/90">{slides[currentIndex].date}</p>
          <p className="text-[11px] tracking-[0.35em] text-foreground/45 uppercase">{slides[currentIndex].location}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setMuted(m => !m)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/8 hover:border-primary/60 transition-all text-white/50 hover:text-white"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            onClick={prevSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/8 hover:border-primary/60 transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-white/70 group-hover:text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/8 hover:border-primary/60 transition-all group"
          >
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-white/70 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/25">
        <span className="text-[8px] sm:text-[9px] tracking-[0.35em] uppercase">Scroll</span>
        <div className="w-px h-8 sm:h-10 bg-white/15 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full bg-[#c9a84c]" style={{ height: '40%', animation: 'heroPulse 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes heroPulse {
          0%   { transform: translateY(-100%); opacity: 0; }
          35%  { opacity: 1; }
          100% { transform: translateY(260%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
