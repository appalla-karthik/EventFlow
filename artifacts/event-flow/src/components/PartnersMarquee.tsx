const LOGOS_ROW_ONE = [
  "APPLE",
  "MICROSOFT",
  "GOOGLE",
  "AMAZON",
  "NETFLIX",
  "ADOBE",
  "SPOTIFY",
  "AIRBNB",
  "SHOPIFY",
];

const LOGOS_ROW_TWO = [
  "NIKE",
  "BMW",
  "SAMSUNG",
  "TESLA",
  "SALESFORCE",
  "ORACLE",
  "IBM",
  "INTEL",
  "PAYPAL",
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

      <div className="mt-10 space-y-6">
        <div className="partners-marquee">
          <div className="partners-sway">
            <div className="partners-track partners-track-one">
              {rowOne.map((logo, idx) => (
                <span
                  key={`row-one-${logo}-${idx}`}
                  className="partners-chip"
                  style={{
                    ['--float' as never]: `${6 + (idx % 4) * 2}px`,
                    ['--tilt' as never]: `${idx % 2 === 0 ? 2 : -2}deg`,
                    ['--tilt-neg' as never]: `${idx % 2 === 0 ? -2 : 2}deg`,
                    ['--delay' as never]: `${(idx % 8) * 0.18}s`,
                  }}
                >
                  {logo}
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
                  key={`row-two-${logo}-${idx}`}
                  className="partners-chip"
                  style={{
                    ['--float' as never]: `${5 + (idx % 4) * 2}px`,
                    ['--tilt' as never]: `${idx % 2 === 0 ? -1.5 : 1.5}deg`,
                    ['--tilt-neg' as never]: `${idx % 2 === 0 ? 1.5 : -1.5}deg`,
                    ['--delay' as never]: `${(idx % 8) * 0.16}s`,
                  }}
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .partners-marquee {
          overflow: hidden;
          padding: 0.75rem 1.5rem;
          position: relative;
        }
        .partners-marquee::before,
        .partners-marquee::after {
          content: '';
          position: absolute;
          top: 0;
          width: 120px;
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
          gap: 1.25rem;
          width: max-content;
          animation: partners-marquee 26s linear infinite;
        }
        .partners-track-two {
          animation-duration: 30s;
        }
        .partners-sway.is-reverse {
          animation-duration: 6.5s;
          animation-delay: 0.4s;
        }
        .partners-marquee.is-reverse .partners-track {
          animation-direction: reverse;
        }
        .partners-chip {
          display: inline-flex;
          align-items: center;
          gap: 0;
          padding: 0.8rem 1.9rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
          box-shadow:
            inset 0 0 0 1px rgba(201, 168, 76, 0.06),
            0 10px 22px rgba(0, 0, 0, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.24em;
          font-size: 0.74rem;
          font-weight: 600;
          color: rgba(246, 242, 234, 0.9);
          white-space: nowrap;
          font-family: inherit;
          animation: chip-float 6s ease-in-out infinite;
          animation-delay: var(--delay, 0s);
          will-change: transform;
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
            gap: 0.9rem;
            animation-duration: 32s;
          }
          .partners-chip {
            padding: 0.65rem 1.35rem;
            letter-spacing: 0.2em;
            font-size: 0.68rem;
          }
          .partners-marquee::before,
          .partners-marquee::after {
            width: 48px;
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
