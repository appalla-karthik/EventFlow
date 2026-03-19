import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { MagneticButton } from './MagneticButton';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'wouter';

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const overlayPathRef = useRef<SVGPathElement | null>(null);
  const menuWrapRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const lastScrollY = useRef(0);
  const [location, navigate] = useLocation();

  const navItems = [
    { label: 'Events', href: '#events' },
    { label: 'Upcoming', href: '#upcoming' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  const menuImages = [
    "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?w=1200&q=80",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200&q=80",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80",
    "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=1200&q=80",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&q=80",
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const openMenu = useCallback(() => {
    const overlayPath = overlayPathRef.current;
    const menuWrap = menuWrapRef.current;
    if (!menuWrap || isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setMenuOpen(true);
    setMenuVisible(false);

    if (!overlayPath) {
      isAnimatingRef.current = false;
      return;
    }

    const items = menuWrap.querySelectorAll<HTMLButtonElement>('.mobile-menu__item');

    gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      }
    })
      .set(overlayPath, { attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' } })
      .to(overlayPath, {
        duration: 0.8,
        ease: 'power4.in',
        attr: { d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' }
      }, 0)
      .to(overlayPath, {
        duration: 0.3,
        ease: 'power2',
        attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' }
      })
      .add(() => {
        setMenuVisible(true);
      })
      .set(items, { opacity: 0 })
      .set(overlayPath, { attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' } })
      .to(overlayPath, {
        duration: 0.3,
        ease: 'power2.in',
        attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
      })
      .to(overlayPath, {
        duration: 0.8,
        ease: 'power4',
        attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
      })
      .to(items, {
        duration: 1.1,
        ease: 'power4',
        startAt: { y: 150 },
        y: 0,
        opacity: 1,
        stagger: 0.05
      }, '>-=1.1');
  }, []);

  const closeMenu = useCallback(() => {
    const overlayPath = overlayPathRef.current;
    const menuWrap = menuWrapRef.current;
    if (!menuWrap || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    if (!overlayPath) {
      isAnimatingRef.current = false;
      setMenuOpen(false);
      setMenuVisible(false);
      return;
    }

    const items = menuWrap.querySelectorAll<HTMLButtonElement>('.mobile-menu__item');

    gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        setMenuOpen(false);
        setMenuVisible(false);
      }
    })
      .set(overlayPath, { attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' } })
      .to(overlayPath, {
        duration: 0.8,
        ease: 'power4.in',
        attr: { d: 'M 0 0 V 50 Q 50 100 100 50 V 0 z' }
      }, 0)
      .to(overlayPath, {
        duration: 0.3,
        ease: 'power2',
        attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
      })
      .add(() => {
        setMenuVisible(false);
      })
      .set(overlayPath, { attr: { d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' } })
      .to(overlayPath, {
        duration: 0.3,
        ease: 'power2.in',
        attr: { d: 'M 0 100 V 50 Q 50 100 100 50 V 100 z' }
      })
      .to(overlayPath, {
        duration: 0.8,
        ease: 'power4',
        attr: { d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z' }
      })
      .to(items, {
        duration: 0.8,
        ease: 'power2.in',
        y: 100,
        opacity: 0,
        stagger: -0.05
      }, 0);
  }, []);

  const handleMenuItem = (href: string) => {
    if (href.startsWith('#')) {
      closeMenu();
      if (window.location.pathname !== '/') {
        navigate(`/${href}`);
        return;
      }
      const target = document.getElementById(href.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    closeMenu();
    navigate(href);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-60 transition-all duration-500",
          isScrolled ? "py-3 md:py-4 glass-nav" : "py-4 md:py-6 bg-transparent",
          !isVisible && "-translate-y-full"
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between">
          <Link href="/" className="text-xl sm:text-2xl font-display font-semibold tracking-wide text-foreground cursor-none">
            Event<span className="text-primary italic">Flow</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isAnchor = item.href.startsWith('#');
              const target = isAnchor ? `/${item.href}` : item.href;
              const isActive = !isAnchor && location === item.href;
              return (
                <Link
                  key={item.href}
                  href={target}
                  className={cn(
                    "text-sm font-medium transition-colors cursor-none relative group",
                    isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <MagneticButton
            variant="solid"
            className="hidden md:flex px-6 py-2.5 text-sm"
            onClick={() => navigate("/reserve")}
          >
            Plan Your Event
          </MagneticButton>

          {/* Mobile Menu Button - simplified for showcase */}
        <button
          type="button"
          className="md:hidden text-foreground mobile-menu-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={menuOpen ? closeMenu : openMenu}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div ref={menuWrapRef} className={cn("mobile-menu-wrap md:hidden", menuVisible && "mobile-menu-wrap--open")} aria-hidden={!menuVisible}>
        <div className="mobile-menu-tiles" aria-hidden="true">
          {[0, 1, 2].map((row) => (
            <div key={`row-${row}`} className="mobile-menu-tiles__line">
              {[0, 1, 2, 0, 1, 2].map((col, colIdx) => {
                const imgIdx = row * 3 + col;
                const url = menuImages[imgIdx % menuImages.length];
                const isLarge = colIdx === 0 || colIdx === 3;
                return (
                  <div
                    key={`tile-${row}-${col}`}
                    className={cn(
                      "mobile-menu-tiles__img",
                      isLarge && "mobile-menu-tiles__img--large"
                    )}
                    style={{ backgroundImage: `url(${url})` }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <nav className="mobile-menu">
          {navItems.map((item, idx) => (
            <button
              key={item.href}
              onClick={() => handleMenuItem(item.href)}
              className="mobile-menu__item"
            >
              <span className="mobile-menu__item-tiny">{String(idx + 1).padStart(2, '0')}</span>
              <span className="mobile-menu__item-text">{item.label}</span>
            </button>
          ))}
        </nav>

        <button type="button" className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
          <svg width="25" height="16" viewBox="0 0 25 16">
            <path d="M2.238 7.079h2.727M2.482 9.496l-.666-2.7" />
            <path d="M23.753 5.403s-1.87 16.88-22.03 1.785" />
          </svg>
        </button>
      </div>

      <svg className={cn("mobile-menu-overlay md:hidden", menuOpen && "mobile-menu-overlay--open")} width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path
          ref={overlayPathRef}
          className="mobile-menu-overlay__path"
          vectorEffect="non-scaling-stroke"
          d="M 0 100 V 100 Q 50 100 100 100 V 100 z"
        />
      </svg>

      <style>{`
      .mobile-menu-wrap {
        position: fixed;
        inset: 0;
        z-index: 70;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: 100vh;
        background: #050505;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      .mobile-menu-wrap.mobile-menu-wrap--open {
        opacity: 1;
        pointer-events: auto;
      }
      .mobile-menu-overlay {
        position: fixed;
        inset: 0;
        z-index: 40;
        pointer-events: none;
      }
      .mobile-menu-overlay.mobile-menu-overlay--open {
        z-index: 85;
      }
      .mobile-menu-overlay__path {
        fill: #050505;
      }
      .mobile-menu {
        grid-area: 1 / 1 / 2 / 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.4rem;
        position: relative;
        z-index: 2;
      }
      .mobile-menu__item {
        background: none;
        border: 0;
        padding: 0;
        margin: 0;
        color: #f6f2ea;
        font-family: inherit;
        font-weight: 300;
        font-size: clamp(2.4rem, 11vw, 4.5rem);
        line-height: 0.95;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        will-change: transform, opacity;
      }
      .mobile-menu__item-tiny {
        font-size: 0.75rem;
        letter-spacing: 0.4em;
        color: rgba(246, 242, 234, 0.45);
      }
      .mobile-menu__item-text {
        color: #c9a84c;
      }
      .mobile-menu__item:hover .mobile-menu__item-text {
        color: #f2d783;
      }
      .mobile-menu__item:hover .mobile-menu__item-tiny {
        color: #fff;
      }
      .mobile-menu-tiles {
        position: absolute;
        left: 50%;
        top: 50%;
        height: 140vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        transform: translate3d(-50%, -50%, 0) rotate(22.5deg);
        opacity: 0.35;
        z-index: 1;
      }
      .mobile-menu-tiles__line {
        display: flex;
        transform: translateX(25%);
        animation: mobileMenuRunner 10s linear infinite;
      }
      .mobile-menu-tiles__line:nth-child(2) { animation-duration: 16s; }
      .mobile-menu-tiles__line:nth-child(3) { animation-duration: 22s; }
      .mobile-menu-tiles__img {
        --tile-margin: 3vw;
        flex: none;
        width: 26vh;
        height: 26vh;
        margin: var(--tile-margin);
        background-size: cover;
        background-position: 50% 50%;
        border-radius: 999px;
        filter: saturate(0.85) brightness(0.85);
      }
      .mobile-menu-tiles__img--large {
        width: 80vh;
        border-radius: 18vh;
      }
      .mobile-menu-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: none;
        border: 0;
        padding: 0;
        margin: 0;
        stroke: #f6f2ea;
        fill: none;
        z-index: 3;
      }
      .mobile-menu-close:hover {
        stroke: #c9a84c;
      }
      .mobile-menu-button {
        width: 44px;
        height: 44px;
        border-radius: 999px;
        border: 1px solid rgba(246, 242, 234, 0.35);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
        touch-action: manipulation;
        position: relative;
      }
      @media (min-width: 768px) {
        .mobile-menu-button,
        .mobile-menu-wrap,
        .mobile-menu-overlay {
          display: none;
        }
      }
      @keyframes mobileMenuRunner {
        to {
          transform: translateX(-25%);
        }
      }
      `}</style>
    </>
  );
}
