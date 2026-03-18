import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useLocation, useRoute } from "wouter";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLenis } from "@/hooks/use-lenis";
import { MOCK_CATEGORY_DETAILS } from "@/hooks/use-events";
import { ArrowUpRight, Calendar, MapPin, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CategoryDetail() {
  const lenisRef = useLenis();
  const [, params] = useRoute("/categories/:slug");
  const [, navigate] = useLocation();
  const pageRef = useRef<HTMLElement>(null);

  const slug = params?.slug ?? "";
  const category = useMemo(
    () => MOCK_CATEGORY_DETAILS.find((item) => item.slug === slug),
    [slug]
  );

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [slug]);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [lenisRef, slug]);

  const gridImages = useMemo(() => {
    if (!category) return [];
    const images = category.gallery.length
      ? category.gallery
      : [category.heroImage];
    return Array.from({ length: 12 }, (_, index) => images[index % images.length]);
  }, [category]);

  useEffect(() => {
    if (!pageRef.current || !category) return;
    const root = pageRef.current;
    let ctx: gsap.Context | null = null;

    const initStickyGrid = () => {
      ctx = gsap.context(() => {
        const block = root.querySelector<HTMLElement>(".sticky-grid__block");
        if (!block) return;

        const wrapper = block.querySelector<HTMLElement>(".block__wrapper");
        const content = block.querySelector<HTMLElement>(".content");
        const eyebrow = block.querySelector<HTMLElement>(".content__eyebrow");
        const title = block.querySelector<HTMLElement>(".content__title");
        const callout = block.querySelector<HTMLElement>(".content__callout");
        const description = block.querySelector<HTMLElement>(".content__description");
        const button = block.querySelector<HTMLElement>(".content__button");
        const grid = block.querySelector<HTMLElement>(".gallery__grid");
        const items = Array.from(
          block.querySelectorAll<HTMLElement>(".gallery__item")
        );

        if (!wrapper || !content || !title || !grid || !items.length) return;

        const revealElements = [
          eyebrow,
          title,
          callout,
          description,
        ].filter(Boolean) as HTMLElement[];

        gsap.set(content, { autoAlpha: 0 });
        gsap.set(revealElements, { opacity: 0, y: 26 });
        if (button) {
          gsap.set(button, {
            opacity: 0,
            y: 26,
            pointerEvents: "none",
          });
        }

        const numColumns = 3;
        const columns: HTMLElement[][] = Array.from({ length: numColumns }, () => []);
        items.forEach((item, index) => {
          columns[index % numColumns].push(item);
        });

        gsap.from(wrapper, {
          yPercent: -100,
          ease: "none",
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });

        const gridRevealTimeline = () => {
          const timeline = gsap.timeline();
          const wh = window.innerHeight;
          const dyLocal = wh - (wh - grid.offsetHeight) / 2;

          columns.forEach((column, colIndex) => {
            const fromTop = colIndex % 2 === 0;
            timeline.from(
              column,
              {
                y: dyLocal * (fromTop ? -1 : 1),
                stagger: {
                  each: 0.06,
                  from: fromTop ? "end" : "start",
                },
                ease: "power1.inOut",
              },
              "grid-reveal"
            );
          });

          return timeline;
        };

        const gridZoomTimeline = () => {
          const gridScale = 1.34;
          const edgeShift = 18;
          const centerSplit = 34;
          const timeline = gsap.timeline({
            defaults: { duration: 1, ease: "power3.inOut" },
          });
          timeline.to(grid, { scale: gridScale });
          timeline.to(columns[0], { xPercent: -edgeShift }, "<");
          timeline.to(columns[2], { xPercent: edgeShift }, "<");
          timeline.to(
            columns[1],
            {
              yPercent: (index) =>
                (index < Math.floor(columns[1].length / 2) ? -1 : 1) *
                centerSplit,
              duration: 0.5,
              ease: "power1.inOut",
            },
            "-=0.5"
          );
          return timeline;
        };

        const contentRevealTimeline = () => {
          const timeline = gsap.timeline({
            defaults: { overwrite: true },
            onStart: () => {
              gsap.set(content, { autoAlpha: 1 });
            },
            onReverseComplete: () => {
              gsap.set(content, { autoAlpha: 0 });
              if (button) {
                gsap.set(button, { pointerEvents: "none" });
              }
            },
          });

          timeline.to(revealElements, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.06,
          });

          if (button) {
            timeline.to(
              button,
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: "power2.out",
                onComplete: () => {
                  gsap.set(button, { pointerEvents: "all" });
                },
                onReverseComplete: () => {
                  gsap.set(button, { pointerEvents: "none" });
                },
              },
              "-=0.18"
            );
          }

          return timeline;
        };

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 25%",
            end: "bottom bottom",
            scrub: true,
          },
        });

        timeline
          .add(gridRevealTimeline())
          .add(gridZoomTimeline(), "-=0.6")
          .to(
            {},
            { duration: 0.12 },
            "+=0.02"
          )
          .add(contentRevealTimeline());

        const cardSelector = gsap.utils.selector(root);
        const cards = cardSelector(".category-card") as HTMLElement[];
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              delay: index * 0.05,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              },
            }
          );
        });
      }, root);
    };

    const images = Array.from(
      root.querySelectorAll<HTMLImageElement>("img.sticky-grid__preload")
    );
    root.classList.add("sticky-grid-loading");
    Promise.all(
      images.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) {
              resolve();
              return;
            }
            img.onload = () => resolve();
            img.onerror = () => resolve();
          })
      )
    ).then(() => {
      root.classList.remove("sticky-grid-loading");
      initStickyGrid();
      ScrollTrigger.refresh();
    });

    return () => {
      ctx?.revert();
    };
  }, [category]);

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground/50 mb-6">Category not found.</p>
          <button
            onClick={() => navigate("/")}
            className="text-primary border-b border-primary/30 text-sm tracking-widest uppercase"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Cursor />
      <Navbar />

      <main ref={pageRef} className="pt-20 sm:pt-24">
        <section className="relative px-6 pt-12 sm:pt-16 pb-16 sm:pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
          <div className="absolute inset-0">
            <img
              src={category.heroImage}
              alt={category.title}
              className="sticky-grid__preload w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-xs tracking-[0.35em] uppercase group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          </div>
          <div className="relative z-10 max-w-6xl mx-auto">
            <p className="text-[11px] tracking-[0.45em] uppercase text-primary mb-6">
              Event Category
            </p>
            <h1 className="text-[clamp(2.4rem,10vw,4.6rem)] sm:text-[clamp(3rem,9vw,8rem)] leading-[0.95] font-display uppercase">
              {category.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl mt-6 text-base sm:text-lg md:text-xl">
              {category.subtitle}
            </p>
          </div>
        </section>

        <section className="px-0 pb-16 sm:pb-24">
          <div className="sticky-grid__frame w-full">
            <section className="block block--main sticky-grid__block">
              <div className="block__wrapper">
                <div className="content">
                  <p className="content__eyebrow">Experience Archive</p>
                  <h2 className="content__title">{category.title} Immersion</h2>
                  <p className="content__callout font-display">
                    Reserve This Category
                  </p>
                  <p className="content__description">
                    A living storyboard of scale, texture, and guest flow.
                    Scroll to reveal the signature moves inside this category.
                  </p>
                  <button
                    className="content__button"
                    onClick={() => navigate("/reserve")}
                  >
                    Reserve This Category
                  </button>
                </div>
                <div className="gallery">
                  <ul className="gallery__grid">
                    {gridImages.map((image, index) => (
                      <li key={`${image}-${index}`} className="gallery__item">
                        <img
                          className="gallery__image sticky-grid__preload"
                          src={image}
                          alt={`${category.title} ${index + 1}`}
                          loading="eager"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="px-6 pb-20 sm:pb-28">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-3">
                  Featured Programs
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-display uppercase">
                  {category.title} Lineup
                </h2>
              </div>
              <button
                className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-primary"
                onClick={() => navigate("/reserve")}
              >
                Start a booking
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {category.events.map((event) => (
                <article
                  key={event.id}
                  className="category-card group border border-white/10 rounded-3xl overflow-hidden bg-white/[0.02] hover:border-primary/60 transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute left-5 top-5 px-3 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] tracking-[0.25em] uppercase">
                      {event.format}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 space-y-4">
                    <div>
                      <p className="text-primary text-xs tracking-[0.3em] uppercase">
                        {event.price}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-display mt-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-foreground/60 mt-2">
                        {event.tagline}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/50 uppercase tracking-widest">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {event.location}
                      </span>
                    </div>
                    <button
                      className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-primary"
                      onClick={() => navigate("/reserve")}
                    >
                      Reserve now
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .sticky-grid-loading .sticky-grid__block {
          opacity: 0;
        }
        .sticky-grid__frame {
          border: 1px solid rgba(201, 168, 76, 0.18);
          border-radius: 0;
          background: #050505;
          box-shadow: 0 30px 90px rgba(0,0,0,0.45);
          border-left: 0;
          border-right: 0;
        }
        .sticky-grid__block {
          height: 380vh;
          position: relative;
        }
        .sticky-grid__block .block__wrapper {
          position: sticky;
          top: 0;
          padding: 0;
          --sticky-pad: clamp(2rem, 6vw, 5rem);
          height: 100vh;
          overflow: hidden;
        }
        .sticky-grid__block .content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -56%, 0);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: min(68vw, 720px);
          height: auto;
          text-align: center;
          z-index: 3;
          padding: 0;
          margin: 0;
          gap: 0.7rem;
          text-shadow: 0 14px 32px rgba(0,0,0,0.72);
        }
        .sticky-grid__block .content__eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.45em;
          font-size: 11px;
          color: #c9a84c;
          margin-bottom: 0.35rem;
        }
        .sticky-grid__block .content__title {
          font-family: inherit;
          font-size: clamp(3.35rem, 7.8vw, 6.6rem);
          line-height: 0.88;
          letter-spacing: -0.045em;
          text-transform: uppercase;
          max-width: 10ch;
        }
        .sticky-grid__block .content__callout {
          font-size: clamp(1.2rem, 2vw, 1.9rem);
          line-height: 1;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #f6f2ea;
          margin-top: 0.1rem;
        }
        .sticky-grid__block .content__description {
          margin-top: 0.35rem;
          max-width: 600px;
          text-transform: uppercase;
          font-size: clamp(0.78rem, 0.95vw, 0.95rem);
          letter-spacing: 0.24em;
          line-height: 1.95;
          color: rgba(246, 242, 234, 0.82);
        }
        .sticky-grid__block .content__button {
          margin-top: 1rem;
          font-size: 12px;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: #c9a84c;
          border-bottom: 1px solid rgba(201, 168, 76, 0.4);
          padding-bottom: 6px;
        }
        .sticky-grid__block .gallery {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          width: min(92vw, 1200px);
          max-width: none;
          z-index: 1;
        }
        .sticky-grid__block .gallery__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2vw, 32px);
          will-change: transform;
        }
        .sticky-grid__block .gallery__item {
          width: 100%;
          aspect-ratio: 1;
          will-change: transform;
        }
        .sticky-grid__block .gallery__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background-color: #111;
        }
      `}</style>
    </>
  );
}

