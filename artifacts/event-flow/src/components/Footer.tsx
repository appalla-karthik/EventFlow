import { Link } from 'wouter';

const FOOTER_COLUMNS = [
  {
    title: 'Services',
    links: ['Event Design', 'Production', 'Hospitality', 'Creative Direction'],
  },
  {
    title: 'Events',
    links: ['Signature Galas', 'Live Festivals', 'Corporate Summits', 'Brand Launches'],
  },
  {
    title: 'Contact',
    links: ['Book a Call', 'Private Briefing', 'Studio Email', 'Location Map'],
  },
  {
    title: 'Policy',
    links: ['Privacy Policy', 'Terms of Use', 'Accessibility', 'Security'],
  },
];

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4.98 3.5c0 1.38-1.1 2.5-2.48 2.5A2.49 2.49 0 0 1 0 3.5C0 2.12 1.1 1 2.5 1c1.37 0 2.48 1.12 2.48 2.5Zm.02 4.5H0V24h5V8Zm7.5 0H7.5V24h5v-8.6c0-2.36 3-2.55 3 0V24h5v-10c0-6.1-6.93-5.88-8  -2.88V8Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Zm3 13a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v8Zm-7-7a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm0 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm5.25-6.75a1 1 0 1 0 1 1 1 1 0 0 0-1-1Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'X',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M18.9 2H22l-7.1 8.12L23 22h-6.75l-5.3-6.92L4.8 22H1.7l7.6-8.68L1 2h6.92l4.8 6.32L18.9 2Zm-1.2 18h1.86L7.22 4h-2l12.48 16Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="footer-paper pt-14 sm:pt-20 pb-24 sm:pb-28 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 md:gap-x-10 lg:gap-x-8">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="min-w-0">
              <h4 className="text-[#f6f1e4] font-semibold tracking-[0.3em] uppercase mb-4 sm:mb-5 text-[11px] sm:text-xs">
                {col.title}
              </h4>
              <ul className="space-y-2.5 sm:space-y-3 text-[#c9c3b1] text-[12px] sm:text-[13px] md:text-sm font-medium">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="/#" className="hover:text-[#f7d27a] transition-colors cursor-none">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#d7d0be]">
            Studio Connections
          </p>
          <div className="flex items-center gap-3 justify-start">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="footer-social cursor-none"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      <div className="footer-embedded-logo" aria-hidden="true">
        <span className="footer-logo-text">Event</span>
        <span className="footer-logo-emphasis">Flow</span>
      </div>

      <style>{`
        .footer-paper {
          position: relative;
          border-top: none;
          background-color: #0b0c0b;
          overflow: hidden;
          box-shadow: inset 0 18px 48px rgba(0, 0, 0, 0.45);
          background-image:
            radial-gradient(circle at 20% 0%, rgba(70, 120, 90, 0.18), transparent 55%),
            radial-gradient(circle at 80% 120%, rgba(140, 160, 110, 0.16), transparent 60%),
            linear-gradient(180deg, rgba(12, 13, 12, 0.98), rgba(8, 9, 8, 0.98));
          background-blend-mode: normal;
        }
        .footer-paper::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 0);
          background-size: 3px 3px;
          opacity: 0.18;
          mix-blend-mode: soft-light;
          pointer-events: none;
        }
        .footer-paper::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 190px;
          background: linear-gradient(180deg, rgba(12, 13, 12, 0) 0%, rgba(12, 13, 12, 0.65) 60%, rgba(12, 13, 12, 0.98) 100%);
          pointer-events: none;
        }
        .footer-social {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(245, 240, 228, 0.75);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(8px);
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .footer-social svg {
          width: 18px;
          height: 18px;
        }
        .footer-social:hover {
          color: rgba(255, 214, 122, 0.95);
          border-color: rgba(255, 214, 122, 0.6);
          box-shadow: 0 0 18px rgba(255, 214, 122, 0.25);
        }
        .footer-embedded-logo {
          position: absolute;
          left: 50%;
          bottom: 12px;
          transform: translateX(-50%);
          width: min(98vw, 1856px);
          text-align: center;
          font-family: var(--font-display);
          font-weight: 800;
          letter-spacing: 0.015em;
          font-size: clamp(140px, 20vw, 360px);
          line-height: 0.9;
          color: rgba(235, 245, 220, 0.22);
          text-shadow: 0 18px 50px rgba(0, 0, 0, 0.6);
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 0;
          white-space: nowrap;
        }
        .footer-logo-emphasis {
          color: rgba(201, 168, 76, 0.38);
          font-style: italic;
          letter-spacing: 0.008em;
        }
        @media (max-width: 1024px) {
          .footer-embedded-logo {
            font-size: clamp(120px, 22vw, 280px);
            bottom: 10px;
          }
        }
        @media (max-width: 640px) {
          .footer-embedded-logo {
            bottom: 6px;
            font-size: clamp(78px, 22vw, 160px);
            letter-spacing: 0.02em;
            color: rgba(235, 245, 220, 0.18);
          }
        }
      `}</style>
    </footer>
  );
}
