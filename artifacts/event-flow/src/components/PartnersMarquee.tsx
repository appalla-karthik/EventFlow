const LOGOS_ROW_ONE = [
  { name: "Aurora", mark: "A", tone: "gold" },
  { name: "Halcyon", mark: "H", tone: "ivory" },
  { name: "Solstice", mark: "S", tone: "gold" },
  { name: "Noble", mark: "N", tone: "ivory" },
  { name: "Echelon", mark: "E", tone: "gold" },
  { name: "Valence", mark: "V", tone: "ivory" },
  { name: "Lumen", mark: "L", tone: "gold" },
  { name: "Opaline", mark: "O", tone: "ivory" },
  { name: "Monarch", mark: "M", tone: "gold" },
];

const LOGOS_ROW_TWO = [
  { name: "Meridian", mark: "M", tone: "ivory" },
  { name: "Atlas", mark: "A", tone: "gold" },
  { name: "Aether", mark: "A", tone: "ivory" },
  { name: "Kestrel", mark: "K", tone: "gold" },
  { name: "Regent", mark: "R", tone: "ivory" },
  { name: "Citrine", mark: "C", tone: "gold" },
  { name: "Orion", mark: "O", tone: "ivory" },
  { name: "Sterling", mark: "S", tone: "gold" },
  { name: "Crown", mark: "C", tone: "ivory" },
];

const repeatLogos = (logos: string[], copies = 2) =>
  Array.from({ length: copies }, () => logos).flat();

export function PartnersMarquee() {
  const rowOne = repeatLogos(LOGOS_ROW_ONE, 2);
  const rowTwo = repeatLogos(LOGOS_ROW_TWO, 2);

  return (
    <section className="w-full overflow-hidden bg-[#060606] border-y border-white/5 py-12 sm:py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 text-center">
        <p className="text-[11px] tracking-[0.45em] uppercase text-primary mb-4">
          Partners & Supporters
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display uppercase">
          The Teams That Build With Us
        </h2>
        <p className="text-muted-foreground mt-4 text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase">
          A trusted circle of collaborators, sponsors, and production allies who
          elevate every experience.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        <div className="partners-marquee">
          <div className="partners-sway">
            <div className="partners-track partners-track-one">
              {rowOne.map((logo, idx) => (
                <span
                  key={`row-one-${logo.name}-${idx}`}
                  className={`partners-chip partners-chip--${logo.tone}`}
                  style={{
                    ['--float' as never]: `${6 + (idx % 4) * 2}px`,
                    ['--tilt' as never]: `${idx % 2 === 0 ? 2 : -2}deg`,
                    ['--tilt-neg' as never]: `${idx % 2 === 0 ? -2 : 2}deg`,
                    ['--delay' as never]: `${(idx % 8) * 0.18}s`,
                  }}
                >
                  <span className="partners-logo">
                    <span className="partners-emblem" aria-hidden="true">
                      {logo.mark}
                    </span>
                    <span className="partners-wordmark">{logo.name}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="partners-marquee is-reverse">
          <div className="partners-sway is-reverse">
            <div className="partners-track partners-track-two">
              {rowTwo.map((logo, idx) => (
                <span
                  key={`row-two-${logo.name}-${idx}`}
                  className={`partners-chip partners-chip--${logo.tone}`}
                  style={{
                    ['--float' as never]: `${5 + (idx % 4) * 2}px`,
                    ['--tilt' as never]: `${idx % 2 === 0 ? -1.5 : 1.5}deg`,
                    ['--tilt-neg' as never]: `${idx % 2 === 0 ? 1.5 : -1.5}deg`,
                    ['--delay' as never]: `${(idx % 8) * 0.16}s`,
                  }}
                >
                  <span className="partners-logo">
                    <span className="partners-emblem" aria-hidden="true">
                      {logo.mark}
                    </span>
                    <span className="partners-wordmark">{logo.name}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .partners-marquee {
          overflow: hidden;
          padding: 1.2rem 3.1rem;
          position: relative;
        }
        .partners-marquee::before,
        .partners-marquee::after {
          content: '';
          position: absolute;
          top: 0;
          width: 170px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }
        .partners-marquee::before {
          left: 0;
          background: linear-gradient(90deg, #060606 0%, rgba(6, 6, 6, 0) 100%);
        }
        .partners-marquee::after {
          right: 0;
          background: linear-gradient(270deg, #060606 0%, rgba(6, 6, 6, 0) 100%);
        }
        .partners-sway {
          display: block;
          animation: marquee-sway 5.5s ease-in-out infinite;
        }
        .partners-track {
          display: flex;
          align-items: center;
          gap: 1.9rem;
          width: max-content;
          animation: partners-marquee 32s linear infinite;
        }
        .partners-track-two {
          animation-duration: 36s;
        }
        .partners-sway.is-reverse {
          animation-duration: 7s;
          animation-delay: 0.4s;
        }
        .partners-marquee.is-reverse .partners-track {
          animation-direction: reverse;
        }
        .partners-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.9rem;
          padding: 1.05rem 2.9rem;
          min-height: 64px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background:
            radial-gradient(circle at 20% 20%, rgba(201, 168, 76, 0.2), transparent 55%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
          box-shadow:
            inset 0 0 0 1px rgba(201, 168, 76, 0.08),
            0 12px 28px rgba(0, 0, 0, 0.35);
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(246, 242, 234, 0.92);
          white-space: nowrap;
          font-family: inherit;
          animation: chip-float 6s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          will-change: transform;
        }
        .partners-chip--gold {
          border-color: rgba(201, 168, 76, 0.4);
          background:
            radial-gradient(circle at 20% 20%, rgba(201, 168, 76, 0.24), transparent 55%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02));
        }
        .partners-chip--ivory {
          border-color: rgba(255, 255, 255, 0.22);
          background:
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.14), transparent 55%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
        }
        .partners-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.95rem;
        }
        .partners-emblem {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 1px solid rgba(201, 168, 76, 0.55);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: "Georgia", "Times New Roman", serif;
          font-size: 1rem;
          letter-spacing: 0.08em;
          color: rgba(246, 242, 234, 0.95);
          background: radial-gradient(circle at 30% 30%, rgba(201, 168, 76, 0.35), rgba(0, 0, 0, 0.2));
          box-shadow: inset 0 0 12px rgba(201, 168, 76, 0.35);
        }
        .partners-wordmark {
          font-family: "Times New Roman", "Georgia", serif;
          font-size: 0.9rem;
          letter-spacing: 0.28em;
        }
        .partners-chip:hover {
          border-color: rgba(201, 168, 76, 0.6);
          box-shadow: 0 0 18px rgba(201, 168, 76, 0.25);
        }
        @keyframes partners-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-sway {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
          100% {
            transform: translateY(0);
          }
        }
        @keyframes chip-float {
          0%,
          100% {
            transform: translateY(0) rotate(var(--tilt, 0deg));
          }
          50% {
            transform: translateY(calc(var(--float, 6px) * -1))
              rotate(var(--tilt-neg, 0deg));
          }
        }
        @media (max-width: 640px) {
          .partners-track {
            gap: 1.2rem;
            animation-duration: 38s;
          }
          .partners-chip {
            padding: 0.85rem 1.8rem;
            min-height: 56px;
            letter-spacing: 0.14em;
            font-size: 0.72rem;
          }
          .partners-emblem {
            width: 30px;
            height: 30px;
          }
          .partners-wordmark {
            font-size: 0.78rem;
          }
          .partners-marquee::before,
          .partners-marquee::after {
            width: 90px;
          }
          .partners-marquee {
            padding: 1.05rem 2.2rem;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .partners-track,
          .partners-sway,
          .partners-chip {
            animation: none;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
