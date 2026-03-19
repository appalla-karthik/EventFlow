import type { IconType } from "react-icons";
import * as SiIcons from "react-icons/si";

const LOGOS_ROW_ONE = [
  { name: "Apple", icon: "SiApple" },
  { name: "Google", icon: "SiGoogle" },
  { name: "Microsoft", icon: "SiMicrosoft" },
  { name: "Amazon", icon: "SiAmazon" },
  { name: "Meta", icon: "SiMeta" },
  { name: "Tesla", icon: "SiTesla" },
  { name: "Adidas", icon: "SiAdidas" },
  { name: "Spotify", icon: "SiSpotify" },
  { name: "Airbnb", icon: "SiAirbnb" },
];

const LOGOS_ROW_TWO = [
  { name: "Nike", icon: "SiNike" },
  { name: "Samsung", icon: "SiSamsung" },
  { name: "Salesforce", icon: "SiSalesforce" },
  { name: "Oracle", icon: "SiOracle" },
  { name: "IBM", icon: "SiIbm" },
  { name: "Intel", icon: "SiIntel" },
  { name: "PayPal", icon: "SiPaypal" },
  { name: "Netflix", icon: "SiNetflix" },
  { name: "Shopify", icon: "SiShopify" },
];

const RAIL_TEXT =
  "SPONSORS • COLLABORATORS • PARTNERS • SUPPORTERS • ";
const RAIL_TEXT_LOOP = Array.from({ length: 6 }, () => RAIL_TEXT).join('');

const repeatLogos = <T,>(logos: T[], copies = 2) =>
  Array.from({ length: copies }, () => logos).flat();

export function PartnersMarquee() {
  const rowOne = repeatLogos(LOGOS_ROW_ONE, 3);
  const rowTwo = repeatLogos(LOGOS_ROW_TWO, 3);

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
        <div className="partners-rail">
          <div className="partners-rail__bg" aria-hidden="true">
            <div className="partners-rail__clip">
              <div className="partners-rail__color">
                <div className="partners-rail__gradients">
                  <span className="partners-rail__gradient -core" />
                  <span className="partners-rail__gradient -pro" />
                </div>
              </div>
            </div>
            <div className="partners-rail__text">
              <span>{RAIL_TEXT_LOOP}</span>
              <span>{RAIL_TEXT_LOOP}</span>
            </div>
          </div>
          <div className="partners-rail__track">
            {rowOne.map((logo, idx) => {
              const Icon =
                (SiIcons as Record<string, IconType>)[logo.icon] ??
                (SiIcons as Record<string, IconType>).SiApple;
              return (
                <span key={`row-one-${logo.name}-${idx}`} className="partners-rail__item">
                  <Icon className="partners-rail__icon" aria-hidden="true" />
                </span>
              );
            })}
          </div>
        </div>
        <div className="partners-rail is-reverse">
          <div className="partners-rail__bg" aria-hidden="true">
            <div className="partners-rail__clip">
              <div className="partners-rail__color">
                <div className="partners-rail__gradients">
                  <span className="partners-rail__gradient -core" />
                  <span className="partners-rail__gradient -pro" />
                </div>
              </div>
            </div>
            <div className="partners-rail__text">
              <span>{RAIL_TEXT_LOOP}</span>
              <span>{RAIL_TEXT_LOOP}</span>
            </div>
          </div>
          <div className="partners-rail__track">
            {rowTwo.map((logo, idx) => {
              const Icon =
                (SiIcons as Record<string, IconType>)[logo.icon] ??
                (SiIcons as Record<string, IconType>).SiApple;
              return (
                <span key={`row-two-${logo.name}-${idx}`} className="partners-rail__item">
                  <Icon className="partners-rail__icon" aria-hidden="true" />
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .partners-rail {
          overflow: hidden;
          padding: 0.25rem 2.4rem;
          position: relative;
          min-height: 70px;
        }
        .partners-rail::before,
        .partners-rail::after {
          content: '';
          position: absolute;
          top: 0;
          width: 160px;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }
        .partners-rail::before {
          left: 0;
          background: linear-gradient(90deg, #060606 0%, rgba(6, 6, 6, 0) 100%);
        }
        .partners-rail::after {
          right: 0;
          background: linear-gradient(270deg, #060606 0%, rgba(6, 6, 6, 0) 100%);
        }
        .partners-rail__bg {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
        }
        .partners-rail__clip {
          width: 420vw;
          height: 70px;
          animation: clip-anim 20s linear infinite;
        }
        .partners-rail__color {
          position: absolute;
          inset: 0;
          background-color: #0c0c0e;
          animation: color-anim 20s linear infinite;
        }
        .partners-rail__gradients {
          position: absolute;
          inset: 0;
        }
        .partners-rail__gradient {
          position: absolute;
          width: 52vw;
          height: 52vw;
          border-radius: 50%;
          filter: blur(12px);
          opacity: 0.5;
        }
        .partners-rail__gradient.-core {
          background: radial-gradient(circle, rgba(201, 168, 76, 0.7) 0%, rgba(201, 168, 76, 0.1) 60%, transparent 70%);
          transform: translate(-7vw, -2.3vw);
          animation: intro-core 3s cubic-bezier(.04,1.15,0.4,.99) 0.5s forwards;
        }
        .partners-rail__gradient.-pro {
          background: radial-gradient(circle, rgba(139, 120, 75, 0.5) 0%, rgba(139, 120, 75, 0.1) 60%, transparent 70%);
          transform: translate(7vw, 5vw);
          animation: intro-pro 2.75s cubic-bezier(.04,1.15,0.4,.99) 0.75s forwards;
        }
        .partners-rail__text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          gap: 4rem;
          font-family: "Times New Roman", "Georgia", serif;
          text-transform: uppercase;
          letter-spacing: 0.35em;
          font-size: clamp(1.2rem, 2.6vw, 2.2rem);
          color: rgba(201, 168, 76, 0.35);
          opacity: 0.4;
          white-space: nowrap;
          mix-blend-mode: screen;
          pointer-events: none;
        }
        .partners-rail__text span {
          display: inline-block;
          animation: partners-rail-text 22s linear infinite;
        }
        .partners-rail.is-reverse .partners-rail__text span {
          animation-direction: reverse;
        }
        .partners-rail__track {
          display: flex;
          align-items: center;
          gap: 3rem;
          width: max-content;
          animation: partners-rail 26s linear infinite;
          position: relative;
          z-index: 1;
          padding: 0.6rem 0;
        }
        .partners-rail.is-reverse .partners-rail__track {
          animation-direction: reverse;
        }
        .partners-rail__item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: auto;
          height: auto;
          background: transparent;
          border: none;
          box-shadow: none;
          padding: 0.2rem 0.4rem;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          will-change: transform;
        }
        .partners-rail__icon {
          width: 38px;
          height: 38px;
          color: rgba(246, 242, 234, 0.9);
          filter:
            drop-shadow(0 0 12px rgba(201, 168, 76, 0.35))
            drop-shadow(0 0 24px rgba(201, 168, 76, 0.2));
        }
        .partners-rail:hover .partners-rail__track {
          animation-play-state: paused;
        }
        .partners-rail__item:hover {
          transform: translateY(-4px) scale(1.12);
          box-shadow:
            0 0 18px rgba(201, 168, 76, 0.2),
            0 10px 24px rgba(0, 0, 0, 0.5);
        }
        @keyframes partners-rail {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes clip-anim {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes color-anim {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(50%);
          }
        }
        @keyframes intro-core {
          from {
            transform: translate(-7vw, calc(-2.3vw + 100vh));
          }
          to {
            transform: translate(-7vw, -2.3vw);
          }
        }
        @keyframes intro-pro {
          from {
            transform: translate(7vw, calc(5vw + 100vh));
          }
          to {
            transform: translate(7vw, 5vw);
          }
        }
        @keyframes partners-rail-text {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (max-width: 640px) {
          .partners-rail {
            padding: 0.2rem 1.2rem;
            min-height: 58px;
          }
          .partners-rail__track {
            gap: 1.6rem;
            animation-duration: 34s;
          }
          .partners-rail__item {
            padding: 0.15rem 0.3rem;
          }
          .partners-rail__icon {
            width: 28px;
            height: 28px;
          }
          .partners-rail::before,
          .partners-rail::after {
            width: 70px;
          }
          .partners-rail__clip {
            height: 56px;
          }
          .partners-rail__text {
            font-size: 1.05rem;
            letter-spacing: 0.3em;
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
