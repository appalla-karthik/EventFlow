import { useEffect, useLayoutEffect, useMemo, useRef, type CSSProperties } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Cursor } from "@/components/Cursor";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useLenis } from "@/hooks/use-lenis";
import { MOCK_CATEGORY_DETAILS, MOCK_EVENT_DETAILS } from "@/hooks/use-events";

gsap.registerPlugin(ScrollTrigger);

type ShowcaseProject = {
  id: string;
  background: string;
  images: string[];
  titleTop: string;
  titleBottom: string;
  accentClass: string;
  date: string;
  location: string;
  reserveHref: string;
  detailsHref: string;
};

type LiveEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  format: string;
  price: string;
  image: string;
  tagline: string;
  gallery: string[];
  categoryHeroImage: string;
};

function splitTitle(title: string) {
  const words = title
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  if (words.length <= 1) {
    const onlyWord = words[0] ?? title;
    return {
      titleTop: onlyWord.toUpperCase(),
      titleBottom: onlyWord.toUpperCase(),
    };
  }

  return {
    titleTop: words[0].toUpperCase(),
    titleBottom: words.slice(1).join(" ").toUpperCase(),
  };
}

export default function AllEventsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useLenis();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const liveEvents = useMemo<LiveEvent[]>(
    () =>
      MOCK_CATEGORY_DETAILS.flatMap((category) =>
        category.events.map((event) => ({
          ...event,
          categoryHeroImage: category.heroImage,
          gallery: category.gallery,
        }))
      ).sort((a, b) => Date.parse(a.date) - Date.parse(b.date)),
    []
  );

  const showcaseProjects = useMemo<ShowcaseProject[]>(() => {
    return liveEvents.slice(0, 3).map((event, index) => {
      const { titleTop, titleBottom } = splitTitle(event.title);
      const accentClass = ["color-1", "color-2", "color-3"][index] ?? "color-0";

      return {
        id: event.id,
        background: event.image ?? event.categoryHeroImage,
        images: [event.image, ...event.gallery].filter(Boolean).slice(0, 4),
        titleTop,
        titleBottom,
        accentClass,
        date: event.date,
        location: event.location,
        reserveHref: `/reserve?event=${encodeURIComponent(event.title)}`,
        detailsHref: `mailto:hello@shivoraevents.com?subject=${encodeURIComponent(`Details for ${event.title}`)}`,
      };
    });
  }, [liveEvents]);

  const remainingEvents = useMemo(() => liveEvents.slice(3), [liveEvents]);
  const remainingLeadEvent = remainingEvents[0];
  const remainingFeatureEvents = remainingEvents.slice(1, 3);
  const remainingGridEvents = remainingEvents.slice(3);

  const heroImage = MOCK_EVENT_DETAILS[0]?.image ?? showcaseProjects[0]?.background ?? "";

  useLayoutEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const workSection = root.querySelector<HTMLElement>('[data-work="section"]');
      const workItems = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-work="item"]'));
      const ghostItems = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-work="ghost"]'));

      if (!workSection || !workItems.length || workItems.length !== ghostItems.length) return;

      gsap.set(workItems, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        clipPath: "inset(0 0% 0 100%)",
      });

      const getBaseScrollTrigger = (ghostItem: HTMLElement) => ({
        trigger: ghostItem,
        scrub: true,
        start: "top bottom",
        end: "+=200vh top",
      });

      const getImageInitialPosition = (index: number, imageIndex: number) => {
        const positions = {
          0: {
            scale: 0.8,
            y: index % 2 === 0 ? "175vh" : "-120vh",
            rotateZ: index % 2 === 0 ? "-5deg" : "5deg",
            zIndex: index % 2 === 0 ? "3" : "1",
          },
          1: {
            scale: 0.8,
            y: index % 2 === 0 ? "-225vh" : "300vh",
            zIndex: index % 2 === 0 ? "1" : "3",
            rotateZ: index % 2 === 0 ? "5deg" : "-5deg",
          },
          2: {
            scale: 0.8,
            y: index % 2 === 0 ? "300vh" : "-120vh",
            zIndex: index % 2 === 0 ? "3" : "3",
            rotateZ: index % 2 === 0 ? "5deg" : "5deg",
          },
          3: {
            scale: 0.8,
            y: index % 2 === 0 ? "-100vh" : "175vh",
            zIndex: index % 2 === 0 ? "1" : "1",
            rotateZ: index % 2 === 0 ? "-5deg" : "-5deg",
          },
        };

        return positions[imageIndex as keyof typeof positions];
      };

      const getImageFinalPosition = (index: number, imageIndex: number) => ({
        scale: 1,
        y:
          index % 2 === 0
            ? imageIndex % 2 === 0
              ? "2vh"
              : "-2vh"
            : imageIndex % 2 === 0
              ? "-2vh"
              : "2vh",
        rotateZ:
          index % 2 === 0
            ? imageIndex % 2 === 0
              ? "2.5deg"
              : "-2.5deg"
            : imageIndex % 2 === 0
              ? "-2.5deg"
              : "2.5deg",
      });

      workItems.forEach((element, index) => {
        const lines = element.querySelectorAll<HTMLElement>("[data-line]");
        const itemBackground = element.querySelector<HTMLElement>('[data-work="item-background"]');
        const itemContainer = element.querySelector<HTMLElement>('[data-work="item-container"]');
        const itemOverlay = element.querySelectorAll<HTMLElement>('[data-work="item-overlay"]');
        const itemImages = gsap.utils.toArray<HTMLElement>(
          element.querySelectorAll('[data-work="item-image"]')
        );
        const ghostItem = ghostItems[index];

        if (!itemBackground || !itemContainer || !ghostItem || !itemOverlay.length) return;

        gsap.set(itemBackground, { scale: 1.2 });
        gsap.set(itemContainer, { xPercent: 40 });

        gsap.to(element, {
          clipPath: "inset(0 0 0 0%)",
          scrollTrigger: getBaseScrollTrigger(ghostItem),
        });

        gsap.to(itemContainer, {
          xPercent: 0,
          scrollTrigger: getBaseScrollTrigger(ghostItem),
        });

        gsap.to(itemBackground, {
          scale: 1,
          scrollTrigger: getBaseScrollTrigger(ghostItem),
        });

        [0, 1].forEach((lineIndex) => {
          if (!lines[lineIndex]) return;

          gsap.set(lines[lineIndex], {
            zIndex: 2,
            opacity: 0.9,
          });

          gsap.from(lines[lineIndex], {
            opacity: lineIndex === 0 ? 0.95 : 0.5,
            yPercent: lineIndex === 0 ? 125 : -125,
            ease: "power2.inOut",
            duration: 1.25,
            scrollTrigger: {
              trigger: ghostItem,
              scrub: true,
              start: "-25% top",
              end: "15% top",
              toggleActions: "play reverse restart reverse",
            },
          });
        });

        itemImages.forEach((image, imageIndex) => {
          gsap.set(image, getImageInitialPosition(index, imageIndex));

          gsap.to(image, {
            ...getImageFinalPosition(index, imageIndex),
            scrollTrigger: {
              trigger: ghostItem,
              scrub: true,
              start: "5% top",
              end: "50% top",
            },
          });
        });

        gsap.to(itemBackground, {
          filter: "brightness(0.2) blur(7.5px)",
          scrollTrigger: {
            trigger: ghostItem,
            scrub: true,
            start: "20% top",
            end: "55% top",
          },
        });

        gsap.to(element, {
          xPercent: index === workItems.length - 1 ? 0 : -40,
          yPercent: index === workItems.length - 1 ? -40 : 0,
          scrollTrigger: {
            trigger: ghostItem,
            scrub: true,
            start: "100% bottom",
            toggleActions: "play reverse play reverse",
          },
        });

        gsap.to(itemOverlay, {
          opacity: 0.85,
          scrollTrigger: {
            trigger: ghostItem,
            scrub: true,
            start: "100% bottom",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [showcaseProjects]);

  return (
    <div ref={pageRef} className="events-gently overflow-x-hidden bg-black">
      <Cursor />
      <Navbar />

      <section className="hero_section sticky">
        <div className="hero_container">
          <div className="hero_image-wrapper">
            <img src={heroImage} alt="Shivora events hero" className="hero_image" />
          </div>
          <div className="hero_texts">
                <div className="line-wrapper">
                  <div className="line-wrapper">
                    <div className="line" data-line>
                      Upcoming
                    </div>
                  </div>
                </div>
                <div className="line-wrapper">
                  <div className="line text-center">
                <span className="color-0">EVENT</span>
                  </div>
                </div>
                <div className="line-wrapper">
                  <div className="line text-right" data-line>
                HIGHLIGHTS
                  </div>
                </div>
              </div>
        </div>
      </section>

      <section className="work_section" data-work="section">
        <div className="work_container">
          {showcaseProjects.map((project) => (
            <div
              key={project.id}
              className="work_item"
              data-work="item"
              style={{ "--accent-color": `var(--${project.accentClass})` } as CSSProperties}
            >
              <div className="work_item-container" data-work="item-container">
                <div className="work_item-background" data-work="item-background">
                  <img src={project.background} alt={`${project.titleTop} ${project.titleBottom}`} />
                </div>

                <div className="work_item-wrapper">
                  <div className="work_item-images">
                    {project.images.map((image, imageIndex) => (
                      <div key={`${project.id}-${imageIndex}`} className="work_item-image" data-work="item-image">
                        <div className="image-wrapper">
                          <img src={image} alt={`${project.titleTop} gallery ${imageIndex + 1}`} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="work_text">
                    <div className="work_text-title">
                      <div className="line-wrapper">
                        <div className="line text-left" data-line>
                          {project.titleTop}
                        </div>
                      </div>
                      <div className="line-wrapper">
                        <div className="line text-right" data-line>
                          <span className={project.accentClass}>{project.titleBottom}</span>
                        </div>
                      </div>
                    </div>

                    <div className="work_item-meta">
                      <div className="work_item-copy">
                        <p className="work_item-date">{project.date}</p>
                        <p className="work_item-location">{project.location}</p>
                      </div>
                      <div className="work_item-actions">
                        <Link href={project.reserveHref} className="work_item-button work_item-button--primary">
                          Reserve Seats
                        </Link>
                        <a href={project.detailsHref} className="work_item-button">
                          Request Itinerary
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="work_item-overlay" data-work="item-overlay" />
              </div>
            </div>
          ))}

          <div className="ghost_work-container" aria-hidden="true">
            {showcaseProjects.map((project) => (
              <div key={`${project.id}-ghost`} className="ghost_work-item" data-work="ghost" />
            ))}
          </div>
        </div>
      </section>

      <section className="events_catalog">
        <div className="events_catalog-inner">
          <div className="events_catalog-head">
            <div>
              <p className="events_catalog-kicker">More Events</p>
              <h2 className="events_catalog-title">
                Confirmed events
                <span> currently open for enquiries</span>
              </h2>
            </div>
            <p className="events_catalog-copy">
              A live editorial view of the wider Shivora calendar, from invitation-led gatherings
              and brand launches to destination celebrations and high-touch cultural programs.
            </p>
          </div>

          <div className="events_catalog-layout">
            {remainingLeadEvent && (
              <article className="catalog_lead-card">
                <div className="catalog_lead-media">
                  <img src={remainingLeadEvent.image} alt={remainingLeadEvent.title} />
                </div>
                <div className="catalog_lead-overlay" />
                <div className="catalog_lead-body">
                  <div className="catalog_lead-top">
                    <span className="catalog_pill">Next Featured Event</span>
                    <span className="catalog_meta-text">{remainingLeadEvent.date}</span>
                  </div>
                  <div className="catalog_lead-content">
                    <p className="catalog_meta-text">{remainingLeadEvent.location}</p>
                    <h3>{remainingLeadEvent.title}</h3>
                    <p>{remainingLeadEvent.tagline}</p>
                  </div>
                  <div className="catalog_lead-bottom">
                    <div className="catalog_stat">
                      <span>Format</span>
                      <strong>{remainingLeadEvent.format}</strong>
                    </div>
                    <div className="catalog_stat">
                      <span>From</span>
                      <strong>{remainingLeadEvent.price}</strong>
                    </div>
                    <div className="catalog_action-row">
                      <Link
                        href={`/reserve?event=${encodeURIComponent(remainingLeadEvent.title)}`}
                        className="catalog_button catalog_button--primary"
                      >
                        Reserve Seats
                      </Link>
                      <a
                        href={`mailto:hello@shivoraevents.com?subject=${encodeURIComponent(`Details for ${remainingLeadEvent.title}`)}`}
                        className="catalog_button"
                      >
                        Request Itinerary
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )}

            <div className="catalog_side-stack">
              {remainingFeatureEvents.map((event, index) => (
                <article key={event.id} className={`catalog_side-card catalog_side-card--${index + 1}`}>
                  <div className="catalog_side-copy">
                    <div className="catalog_side-meta">
                      <span>{event.date}</span>
                      <span>{event.location}</span>
                    </div>
                    <h3>{event.title}</h3>
                    <p>{event.tagline}</p>
                  </div>
                  <div className="catalog_side-footer">
                    <span className="catalog_side-format">{event.format}</span>
                    <Link href={`/reserve?event=${encodeURIComponent(event.title)}`} className="catalog_link">
                      Reserve Seats
                    </Link>
                  </div>
                </article>
              ))}

              <div className="catalog_note-card">
                <p className="catalog_note-kicker">Studio Note</p>
                <p className="catalog_note-copy">
                  Each listing shown below is part of the active calendar and can be opened for
                  guest coordination, proposal requests, or private booking conversations.
                </p>
              </div>
            </div>
          </div>

          {remainingGridEvents.length > 0 && (
            <div className="catalog_grid">
              {remainingGridEvents.map((event, index) => (
                <article
                  key={event.id}
                  className={`catalog_grid-card ${index % 5 === 0 ? "catalog_grid-card--wide" : ""}`}
                >
                  <div className="catalog_grid-image">
                    <img src={event.image} alt={event.title} />
                  </div>
                  <div className="catalog_grid-body">
                    <div className="catalog_grid-top">
                      <span>{event.date}</span>
                      <span>{event.location}</span>
                    </div>
                    <h3>{event.title}</h3>
                    <p>{event.tagline}</p>
                    <div className="catalog_grid-bottom">
                      <span className="catalog_grid-format">{event.format}</span>
                      <span className="catalog_grid-price">{event.price}</span>
                    </div>
                    <div className="catalog_grid-actions">
                      <Link href={`/reserve?event=${encodeURIComponent(event.title)}`} className="catalog_link">
                        Reserve Seats
                      </Link>
                      <a
                        href={`mailto:hello@shivoraevents.com?subject=${encodeURIComponent(`Details for ${event.title}`)}`}
                        className="catalog_link catalog_link--muted"
                      >
                        Event Details
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      <style>{`
        .events-gently,
        .events-gently * {
          box-sizing: border-box;
        }
        .events-gently {
          color: #f5f0eb;
          background-color: #080808;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 20px;
        }
        .events-gently img {
          object-fit: cover;
          width: 100%;
          max-width: 100%;
          height: 100%;
          display: inline-block;
          vertical-align: middle;
        }
        .hero_section.sticky {
          background-color: #000;
          top: 0;
        }
        .hero_container {
          justify-content: space-between;
          align-items: flex-end;
          width: 99vw;
          height: 100vh;
          display: flex;
          position: relative;
        }
        .color-0 {
          color: #c9a84c;
        }
        .color-1 {
          color: #e5c97a;
        }
        .color-2 {
          color: #d6c39f;
        }
        .color-3 {
          color: #f1dfb1;
        }
        .work_item {
          background-color: #000;
          align-items: stretch;
          width: 100vw;
          height: 100vh;
          display: flex;
          position: relative;
          overflow: hidden;
        }
        .work_item-background {
          aspect-ratio: 16 / 9;
          width: 100%;
          height: 100%;
          position: absolute;
        }
        .work_item-wrapper {
          grid-column-gap: 16px;
          grid-row-gap: 16px;
          flex-flow: column;
          flex: 1;
          justify-content: space-around;
          align-items: stretch;
          width: 100%;
          padding: 5rem 4vw 2.5rem;
          display: flex;
          position: relative;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.14), rgba(0, 0, 0, 0.28));
        }
        .work_text {
          flex: 1;
          flex-flow: column;
          justify-content: space-between;
          align-items: stretch;
          width: 100%;
          display: flex;
          position: relative;
        }
        .hero_image-wrapper {
          width: 100%;
          height: 100%;
          position: absolute;
        }
        .hero_image {
          filter: brightness(42%) saturate(0.92);
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        .work_text-title {
          color: #fff;
          letter-spacing: 0.22rem;
          text-transform: uppercase;
          flex-flow: column;
          flex: 1;
          justify-content: space-between;
          align-items: stretch;
          height: 100%;
          margin-left: auto;
          margin-right: auto;
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.3rem, 11vw, 9.2rem);
          font-weight: 600;
          line-height: 0.92;
          display: flex;
          position: relative;
          text-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
        }
        .work_item-meta {
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 1rem;
          width: 100%;
          margin-top: 1.5rem;
        }
        .work_item-copy {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .work_item-date,
        .work_item-location {
          margin: 0;
          color: rgba(255, 255, 255, 0.82);
          font-family: 'Inter', sans-serif;
          font-size: 0.86rem;
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: 0.24em;
        }
        .work_item-location {
          color: rgba(255, 255, 255, 0.56);
        }
        .work_item-actions {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .work_item-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0.8rem 1.2rem;
          border: 1px solid rgba(201, 168, 76, 0.22);
          background: rgba(8, 8, 8, 0.5);
          color: #f5f0eb;
          border-radius: 999px;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          backdrop-filter: blur(12px);
          transition: border-color 220ms ease, background-color 220ms ease, color 220ms ease;
        }
        .work_item-button:hover {
          border-color: rgba(201, 168, 76, 0.52);
          color: #fff;
        }
        .work_item-button--primary {
          background: #c9a84c;
          color: #050505;
          border-color: #c9a84c;
        }
        .sticky {
          position: sticky;
        }
        .work_container {
          position: relative;
        }
        .line {
          will-change: transform;
          position: relative;
        }
        .line-wrapper {
          overflow: hidden;
        }
        .work_section {
          position: relative;
        }
        .work_item-overlay {
          z-index: 99;
          opacity: 0;
          pointer-events: none;
          background-color: #000;
          width: 105%;
          height: 105%;
          position: absolute;
          inset: 0%;
        }
        .image-wrapper {
          aspect-ratio: 4 / 5;
          object-fit: fill;
          background-color: rgba(245, 240, 235, 0.86);
          width: 25vw;
          padding: 0.35em;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
        }
        .text-right {
          text-align: right;
        }
        .work_item-images {
          flex-flow: row;
          justify-content: center;
          align-items: center;
          width: 100%;
          display: flex;
          position: absolute;
          inset: 0% auto 0% 0%;
        }
        .text-center {
          text-align: center;
        }
        .text-left {
          text-align: left;
        }
        .hero_texts {
          color: #fff;
          text-transform: uppercase;
          flex-flow: column;
          justify-content: space-between;
          align-items: stretch;
          width: 100%;
          height: 100vh;
          padding: 5rem 3.5vw 2.5rem;
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.8rem, 11vw, 10rem);
          font-weight: 600;
          line-height: 0.92;
          letter-spacing: 0.18rem;
          display: flex;
          position: relative;
          text-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
        }
        .work_item-image {
          width: 21vw;
          height: 100%;
          position: relative;
        }
        .work_item-container {
          width: 100%;
          height: 100%;
          display: flex;
          position: relative;
        }
        .ghost_work-container {
          position: relative;
        }
        .ghost_work-item {
          width: 100%;
          height: 300vh;
        }
        .events_catalog {
          position: relative;
          z-index: 3;
          background:
            radial-gradient(circle at top left, rgba(201, 168, 76, 0.12), transparent 32%),
            linear-gradient(180deg, #030303 0%, #0a0c0d 100%);
          padding: 7rem 0 8rem;
        }
        .events_catalog-inner {
          width: min(92vw, 1440px);
          margin: 0 auto;
        }
        .events_catalog-head {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2rem;
          align-items: end;
          margin-bottom: 2.5rem;
        }
        .events_catalog-kicker {
          margin: 0 0 0.9rem;
          color: #c9a84c;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.32em;
        }
        .events_catalog-title {
          margin: 0;
          color: #fff;
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 7vw, 6rem);
          line-height: 0.96;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .events_catalog-title span {
          display: block;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
        }
        .events_catalog-copy {
          margin: 0;
          max-width: 34rem;
          color: rgba(255, 255, 255, 0.62);
          font-size: 1rem;
          line-height: 1.75;
        }
        .events_catalog-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr);
          gap: 1.4rem;
          align-items: stretch;
        }
        .catalog_lead-card {
          position: relative;
          min-height: 700px;
          overflow: hidden;
          border-radius: 2rem;
          border: 1px solid rgba(201, 168, 76, 0.12);
          background: #050505;
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.3);
        }
        .catalog_lead-media,
        .catalog_lead-media img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .catalog_lead-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.86));
        }
        .catalog_lead-body {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 700px;
          padding: 2rem;
        }
        .catalog_lead-top,
        .catalog_lead-bottom,
        .catalog_grid-top,
        .catalog_grid-bottom,
        .catalog_side-meta,
        .catalog_side-footer {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .catalog_pill,
        .catalog_side-format,
        .catalog_grid-format {
          display: inline-flex;
          align-items: center;
          padding: 0.55rem 0.9rem;
          border-radius: 999px;
          border: 1px solid rgba(201, 168, 76, 0.18);
          background: rgba(0, 0, 0, 0.34);
          color: #c9a84c;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
        }
        .catalog_meta-text,
        .catalog_grid-top span,
        .catalog_grid-price,
        .catalog_side-meta span {
          color: rgba(255, 255, 255, 0.68);
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
        }
        .catalog_lead-content h3,
        .catalog_side-copy h3,
        .catalog_grid-body h3 {
          margin: 0;
          color: #fff;
          font-family: 'Playfair Display', serif;
          text-transform: uppercase;
          line-height: 0.98;
          letter-spacing: 0.08em;
        }
        .catalog_lead-content h3 {
          font-size: clamp(2.7rem, 5vw, 5.6rem);
          margin-top: 0.8rem;
        }
        .catalog_lead-content p,
        .catalog_side-copy p,
        .catalog_grid-body p,
        .catalog_note-copy {
          margin: 1rem 0 0;
          color: rgba(255, 255, 255, 0.68);
          line-height: 1.72;
        }
        .catalog_action-row,
        .catalog_grid-actions {
          display: flex;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .catalog_button,
        .catalog_link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          padding: 0.85rem 1.2rem;
          border-radius: 999px;
          border: 1px solid rgba(201, 168, 76, 0.18);
          background: rgba(255, 255, 255, 0.03);
          color: #f5f0eb;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          transition: border-color 220ms ease, background-color 220ms ease, color 220ms ease;
        }
        .catalog_button:hover,
        .catalog_link:hover {
          border-color: rgba(201, 168, 76, 0.46);
          color: #fff;
        }
        .catalog_button--primary {
          background: #c9a84c;
          color: #080808;
          border-color: #c9a84c;
        }
        .catalog_link--muted {
          color: rgba(255, 255, 255, 0.68);
        }
        .catalog_side-stack {
          display: grid;
          gap: 1.1rem;
        }
        .catalog_side-card,
        .catalog_note-card,
        .catalog_grid-card {
          border-radius: 1.75rem;
          border: 1px solid rgba(201, 168, 76, 0.1);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.015));
          overflow: hidden;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
        }
        .catalog_side-card {
          min-height: 220px;
          padding: 1.45rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .catalog_side-copy h3 {
          font-size: clamp(1.6rem, 3vw, 2.5rem);
          margin-top: 0.8rem;
        }
        .catalog_note-card {
          padding: 1.45rem;
          background: radial-gradient(circle at top left, rgba(201, 168, 76, 0.12), rgba(255, 255, 255, 0.02) 70%);
        }
        .catalog_note-kicker {
          margin: 0 0 0.85rem;
          color: #c9a84c;
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.22em;
        }
        .catalog_grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.1rem;
          margin-top: 1.2rem;
        }
        .catalog_grid-card--wide {
          grid-column: span 2;
        }
        .catalog_grid-image {
          height: 240px;
        }
        .catalog_grid-body {
          padding: 1.3rem;
        }
        .catalog_grid-body h3 {
          font-size: clamp(1.45rem, 2vw, 2.2rem);
          margin-top: 1rem;
        }
        .catalog_grid-bottom {
          margin-top: 1.2rem;
        }
        .catalog_grid-actions {
          margin-top: 1.1rem;
        }
        @media screen and (max-width: 767px) {
          .work_item-image {
            width: 15vw;
          }
          .hero_texts,
          .work_text-title {
            letter-spacing: 0.12rem;
          }
          .events_catalog-head,
          .events_catalog-layout,
          .catalog_grid {
            grid-template-columns: 1fr;
          }
          .catalog_grid-card--wide {
            grid-column: span 1;
          }
          .catalog_lead-card,
          .catalog_lead-body {
            min-height: 560px;
          }
        }
        @media screen and (max-width: 479px) {
          .work_text {
            grid-column-gap: 2rem;
            grid-row-gap: 2rem;
            flex-flow: column;
            justify-content: space-between;
            align-items: stretch;
          }
          .work_text-title {
            font-size: clamp(2.2rem, 12vw, 4.2rem);
          }
          .work_item-meta {
            flex-direction: column;
            align-items: flex-start;
          }
          .work_item-actions {
            width: 100%;
            justify-content: flex-start;
          }
          .hero_texts {
            grid-column-gap: 2rem;
            grid-row-gap: 2rem;
            flex-flow: column;
            justify-content: space-between;
            align-items: flex-start;
            font-size: clamp(2.8rem, 13vw, 5rem);
          }
          .events_catalog {
            padding: 5rem 0 6rem;
          }
          .events_catalog-inner {
            width: min(94vw, 1440px);
          }
          .catalog_lead-body,
          .catalog_side-card,
          .catalog_note-card,
          .catalog_grid-body {
            padding: 1.1rem;
          }
          .catalog_action-row,
          .catalog_grid-actions {
            flex-direction: column;
          }
          .catalog_button,
          .catalog_link {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
