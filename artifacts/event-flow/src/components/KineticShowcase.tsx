import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MOCK_EVENT_DETAILS } from "@/hooks/use-events";

const TYPE_LINES = [
  "field-notes field-notes field-notes",
  "signal-room signal-room signal-room",
  "storycraft storycraft storycraft",
  "rituals rituals rituals",
  "audience audience audience",
  "field-notes field-notes field-notes",
  "experiments experiments experiments",
  "rituals rituals rituals",
  "storycraft storycraft storycraft",
  "field-notes field-notes field-notes",
  "audience audience audience",
];

const STORY_IMAGES = [
  ...MOCK_EVENT_DETAILS.map((event) => event.image),
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1600&q=80",
];

const STORIES = [
  {
    id: "01",
    previewTitle: "Velvet",
    year: "2025",
    title: "Midnight Scriptorium",
    category: "Immersive Gala",
    location: "Old Mint, San Francisco",
    caption:
      "Whisper guides replaced signage across a candlelit narrative maze for 120 guests.",
    brief:
      "An invitation-only narrative gala where movement, sound, and reveal timing replaced conventional wayfinding.",
    setting:
      "A candlelit narrative labyrinth built for 120 invitees and zero signage.",
    guestFlow:
      "Guests followed live calligraphers through ink-marked thresholds, unlocking rooms in a slow-burn sequence.",
    locationCopy:
      "Old Mint, San Francisco. Ink trails opened hidden rooms while a live quartet paced the crowd in real time.",
    signatureMove:
      "Whisper guides synced room openings with quartet swells so every reveal landed like a private scene change.",
    image: STORY_IMAGES[0],
  },
  {
    id: "02",
    previewTitle: "Signal",
    year: "2024",
    title: "Skyline Signal Room",
    category: "Brand Launch",
    location: "Harbor Rooftop, Seoul",
    caption:
      "Guests controlled the rig, turning the launch into a live broadcast instrument.",
    brief:
      "A rooftop launch reframed as a responsive control room, with audience input shaping the full environment.",
    setting:
      "A broadcast set where the audience controlled the light rig.",
    guestFlow:
      "RF wearables let guests tune brightness and bass in waves, turning passive spectators into the control layer.",
    locationCopy:
      "Harbor Rooftop, Seoul. RF bracelets tuned neon and sound until the whole room hit a sync threshold.",
    signatureMove:
      "The product reveal only fired once the crowd reached a collective sync state across sound, light, and pulse.",
    image: STORY_IMAGES[1] ?? STORY_IMAGES[0],
  },
  {
    id: "03",
    previewTitle: "Atlas",
    year: "2026",
    title: "The Atlas Table",
    category: "Culinary Diplomacy",
    location: "Seaside Foundry, Lisbon",
    caption:
      "A rotating hearth and twelve regional stories turned service into a narrative sequence.",
    brief:
      "A long-form dinner performance where food, music, and scent progressed like an editorial chapter structure.",
    setting:
      "Five chefs, one rotating hearth, twelve regional stories. Brass inlays mapped coastal trade routes beneath the table.",
    guestFlow:
      "Service moved in arcs across a 28-meter table so each course landed as a shared chapter, not a plated routine. Guests could feel the tempo shift as stations lit up.",
    locationCopy:
      "Seaside Foundry, Lisbon. A 28-meter communal table delivered chapters with scent cues and a live string score. Harbor light was pulled across the room in slow sweeps.",
    signatureMove:
      "Story cards triggered perfumers and instrumental transitions, so each flavor shift felt cinematic instead of ceremonial. The finale stitched every region into one last shared chord.",
    image: STORY_IMAGES[2] ?? STORY_IMAGES[0],
  },
  {
    id: "04",
    previewTitle: "Orbit",
    year: "2025",
    title: "Zero-Gravity Workshop",
    category: "Innovation Summit",
    location: "Hangar 12, Dubai",
    caption:
      "Prototype teams docked modular builds on a pneumatic floor before a silent finale.",
    brief:
      "An innovation summit staged like a test facility, with floating prototypes and a high-contrast demo cadence.",
    setting:
      "A day of prototypes floating on a pneumatic stage.",
    guestFlow:
      "Delegates moved through docking bays, prototype islands, and briefing arcs before converging for a silent strobe demo.",
    locationCopy:
      "Hangar 12, Dubai. Teams mapped outcomes across a 360-degree projection before a strobe-lit demo reveal.",
    signatureMove:
      "The final prototype sequence ran without narration, using motion graphics and light alone to frame the concept pitch.",
    image: STORY_IMAGES[3] ?? STORY_IMAGES[0],
  },
  {
    id: "05",
    previewTitle: "Verdant",
    year: "2024",
    title: "Glasshouse Frequency",
    category: "Culture Lab",
    location: "Botanic Conservatory, Singapore",
    caption:
      "Climate, scent, and light shifted as guests steered the greenhouse atmosphere.",
    brief:
      "A living biosphere experience where humidity, spectrum, and scent composition responded to guest interaction.",
    setting:
      "An after-dark biosphere scored by scent and humidity.",
    guestFlow:
      "Touch pylons let visitors bias the climate track, creating alternating warm and cool micro-scenes across the route.",
    locationCopy:
      "Botanic Conservatory, Singapore. Touch pylons remixed the environment until the space closed in a fog-lit vow chorus.",
    signatureMove:
      "As the room warmed, the spectrum drifted into amber fog and a hidden vocal ensemble closed the experience in layers.",
    image: STORY_IMAGES[4] ?? STORY_IMAGES[1],
  },
  {
    id: "06",
    previewTitle: "Harbor",
    year: "2026",
    title: "Port Authority Ritual",
    category: "Open-Air Festival",
    location: "Dockyard 7, Rotterdam",
    caption:
      "Stage towers, crane choreography, and braided crowd routes turned the yard into ritual.",
    brief:
      "A dockyard rave recut as a civic-scale art ritual with industrial movement systems baked into the stage language.",
    setting:
      "A shipping-yard rave turned into a civic art ritual.",
    guestFlow:
      "Crowds moved through silent transit lanes that opened onto stage towers, installation pockets, and ceremony zones.",
    locationCopy:
      "Dockyard 7, Rotterdam. Stacked containers became towers while cranes ran the final light ballet over the crowd.",
    signatureMove:
      "Cranes executed the finale cue stack, transforming the industrial skyline into the closing choreography engine.",
    image: STORY_IMAGES[5] ?? STORY_IMAGES[2],
  },
];

export function KineticShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const typeEl = root.querySelector<HTMLElement>("[data-kinetic-type]");
    const typeLines = Array.from(
      root.querySelectorAll<HTMLElement>(".kinetic-type__line")
    );
    const itemsWrap = root.querySelector<HTMLElement>(".kinetic-item-wrap");
    const frameEl = root.querySelector<HTMLElement>(".kinetic-frame");
    const overlayInner = root.querySelector<HTMLElement>(
      ".kinetic-content__overlay > .kinetic-overlay__inner"
    );
    const backCtrl = root.querySelector<HTMLButtonElement>(".kinetic-back");
    const previewEls = Array.from(
      root.querySelectorAll<HTMLElement>(".kinetic-preview__item")
    );
    const itemEls = Array.from(
      root.querySelectorAll<HTMLElement>(".kinetic-item")
    );

    if (
      !typeEl ||
      !itemsWrap ||
      !backCtrl ||
      !overlayInner ||
      itemEls.length === 0
    ) {
      return;
    }

    let isAnimating = false;
    let currentIndex = -1;

    gsap.set(overlayInner, { xPercent: -100 });

    const typeOpacity =
      Number(
        getComputedStyle(root).getPropertyValue("--kinetic-type-opacity")
      ) || 0.08;

    const typeIn = () =>
      gsap
        .timeline({ paused: true })
        .to(typeEl, {
          duration: 1.4,
          ease: "power2.inOut",
          scale: 2.7,
          rotate: -90,
        })
        .to(
          typeLines,
          {
            keyframes: [
              { x: "20%", duration: 1, ease: "power1.inOut" },
              { x: "-200%", duration: 1.5, ease: "power1.in" },
            ],
            stagger: 0.04,
          },
          0
        )
        .to(
          typeLines,
          {
            keyframes: [
              { opacity: 1, duration: 1, ease: "power1.in" },
              { opacity: 0, duration: 1.5, ease: "power1.in" },
            ],
          },
          0
        );

    const typeOut = () =>
      gsap
        .timeline({ paused: true })
        .to(
          typeEl,
          {
            duration: 1.4,
            ease: "power2.inOut",
            scale: 1,
            rotate: 0,
          },
          1.2
        )
        .to(
          typeLines,
          {
            duration: 2.3,
            ease: "back",
            x: "0%",
            stagger: -0.04,
          },
          0
        )
        .to(
          typeLines,
          {
            keyframes: [
              { opacity: 1, duration: 1, ease: "power1.in" },
              { opacity: typeOpacity, duration: 1.5, ease: "power1.in" },
            ],
          },
          0
        );

    const items = itemEls.map((el) => {
      const previewId = el.getAttribute("data-preview");
      const preview = previewId
        ? root.querySelector<HTMLElement>(`#${previewId}`)
        : null;

      return {
        el,
        imageWrap: el.querySelector<HTMLElement>(".kinetic-item__img-wrap"),
        image: el.querySelector<HTMLElement>(".kinetic-item__img"),
        titleInner: el.querySelector<HTMLElement>(
          ".kinetic-item__title .kinetic-oh__inner"
        ),
        preview,
        previewImgWrap: preview?.querySelector<HTMLElement>(
          ".kinetic-preview__item-img-wrap"
        ),
        previewImg: preview?.querySelector<HTMLElement>(
          ".kinetic-preview__item-img"
        ),
        previewSlideTexts: preview
          ? Array.from(preview.querySelectorAll<HTMLElement>(".kinetic-oh__inner"))
          : [],
        previewDescriptions: preview
          ? Array.from(
              preview.querySelectorAll<HTMLElement>(".kinetic-preview__item-copy")
            )
          : [],
      };
    });

    gsap.set(
      [
        typeEl,
        ...typeLines,
        ...items.map((item) => item.el),
        ...items.map((item) => item.imageWrap).filter(Boolean),
        ...items.map((item) => item.image).filter(Boolean),
      ],
      { force3D: true }
    );

    const setPreviewOpenState = (preview: HTMLElement) => {
      previewEls.forEach((entry) =>
        entry.classList.remove("kinetic-preview__item--current")
      );
      preview.classList.add("kinetic-preview__item--current");
      root.classList.add("kinetic-preview-open");
    };

    const clearPreviewOpenState = () => {
      previewEls.forEach((entry) =>
        entry.classList.remove("kinetic-preview__item--current")
      );
      root.classList.remove("kinetic-preview-open");
    };

    const openItem = (item: (typeof items)[number]) => {
      if (
        isAnimating ||
        !item.preview ||
        !item.previewImgWrap ||
        !item.previewImg
      ) {
        return;
      }

      isAnimating = true;
      currentIndex = items.indexOf(item);

      const typeInTimeline = typeIn();
      const previewDelay = typeInTimeline.totalDuration() * 0.78 + 0.25;

      gsap.set(overlayInner, { xPercent: -100 });
      gsap.set(item.previewImg, { xPercent: 100 });
      gsap.set(item.previewImgWrap, { xPercent: -102, opacity: 0 });
      gsap.set(item.previewSlideTexts, { yPercent: 100 });
      gsap.set(item.previewDescriptions, { yPercent: 15, opacity: 0 });
      gsap.set(backCtrl, { x: "15%", opacity: 0, pointerEvents: "none" });

      const openTimeline = gsap.timeline({
        defaults: { overwrite: "auto" },
        onStart: () => {
          setPreviewOpenState(item.preview as HTMLElement);
          gsap.set(itemsWrap, { pointerEvents: "none" });
        },
        onComplete: () => {
          isAnimating = false;
          gsap.set(backCtrl, { pointerEvents: "auto" });
        },
      });

      openTimeline
        .addLabel("start", 0)
        .to(
          items.map((entry) => entry.el),
          {
            duration: 0.8,
            ease: "power2.inOut",
            opacity: 0,
            y: (index) => (index % 2 ? "25%" : "-25%"),
          },
          "start"
        );

      if (frameEl) {
        openTimeline.to(
          frameEl,
          {
            duration: 0.8,
            ease: "power3",
            opacity: 0,
            onComplete: () => {
              gsap.set(frameEl, { pointerEvents: "none" });
            },
          },
          "start"
        );
      }

      openTimeline
        .add(typeInTimeline.play(), "start+=0.25")
        .addLabel("preview", previewDelay)
        .to(
          overlayInner,
          {
            duration: 1.1,
            ease: "power2",
            startAt: { xPercent: -100 },
            xPercent: 0,
          },
          "preview"
        )
        .to(
          [item.previewImg, item.previewImgWrap],
          {
            duration: 1.1,
            ease: "expo",
            xPercent: 0,
          },
          "preview+=0.3"
        )
        .to(
          item.previewImgWrap,
          {
            duration: 1.1,
            ease: "expo",
            opacity: 1,
          },
          "preview+=0.3"
        )
        .to(
          item.previewSlideTexts,
          {
            duration: 1.1,
            ease: "expo",
            yPercent: 0,
            stagger: 0.05,
          },
          "preview+=0.3"
        )
        .to(
          item.previewDescriptions,
          {
            duration: 1.1,
            ease: "power2",
            opacity: 1,
            stagger: 0.05,
          },
          "preview+=0.3"
        )
        .to(
          item.previewDescriptions,
          {
            duration: 1.1,
            ease: "power2",
            yPercent: 0,
            stagger: 0.05,
          },
          "preview+=0.3"
        )
        .to(
          backCtrl,
          {
            duration: 1.1,
            ease: "power2",
            opacity: 1,
            x: "0%",
          },
          "preview+=0.3"
        );
    };

    const closeItem = () => {
      if (isAnimating || currentIndex < 0) return;

      const item = items[currentIndex];
      if (
        !item?.preview ||
        !item.previewImgWrap ||
        !item.previewImg ||
        item.previewSlideTexts.length === 0
      ) {
        isAnimating = false;
        currentIndex = -1;
        return;
      }

      isAnimating = true;

      const typeOutTimeline = typeOut();
      const showItemsAt = typeOutTimeline.totalDuration() * 0.7 + 0.45;

      const closeTimeline = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          clearPreviewOpenState();
          gsap.set(backCtrl, { pointerEvents: "none" });
          gsap.set(itemsWrap, { pointerEvents: "auto" });
          gsap.set(overlayInner, { xPercent: -100 });
          currentIndex = -1;
          isAnimating = false;
        },
      });

      closeTimeline
        .addLabel("start", 0)
        .to(
          backCtrl,
          {
            duration: 1,
            ease: "power2",
            opacity: 0,
          },
          "start"
        )
        .to(
          item.previewDescriptions,
          {
            duration: 1,
            ease: "power2",
            opacity: 0,
          },
          "start"
        )
        .to(
          item.previewDescriptions,
          {
            duration: 1,
            ease: "power2",
            yPercent: 15,
          },
          "start"
        )
        .to(
          item.previewSlideTexts,
          {
            duration: 1,
            ease: "power4",
            yPercent: 100,
          },
          "start"
        )
        .to(
          item.previewImg,
          {
            duration: 1,
            ease: "power4",
            xPercent: -100,
          },
          "start"
        )
        .to(
          item.previewImgWrap,
          {
            duration: 1,
            ease: "power4",
            xPercent: 100,
            opacity: 1,
          },
          "start"
        )
        .to(
          overlayInner,
          {
            duration: 1,
            ease: "power2",
            xPercent: 100,
          },
          "start+=0.4"
        )
        .add(typeOutTimeline.play(), "start+=0.45")
        .addLabel("showItems", showItemsAt);

      if (frameEl) {
        closeTimeline.to(
          frameEl,
          {
            duration: 0.8,
            ease: "power3",
            opacity: 1,
            onStart: () => {
              gsap.set(frameEl, { pointerEvents: "auto" });
            },
          },
          "showItems"
        );
      }

      closeTimeline.to(
        items.map((entry) => entry.el),
        {
          duration: 1,
          ease: "power3.inOut",
          opacity: 1,
          y: "0%",
        },
        "showItems"
      );
    };

    const handlers = items.map((item) => {
      const onClick = () => openItem(item);
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openItem(item);
      };
      const onEnter = () => {
        if (isAnimating || currentIndex >= 0 || !item.imageWrap || !item.image) {
          return;
        }

        gsap
          .timeline({
            defaults: {
              duration: 0.6,
              ease: "expo",
            },
          })
          .addLabel("start", 0)
          .set(item.titleInner, { transformOrigin: "0% 50%" }, "start")
          .to(
            item.titleInner,
            {
              duration: 0.2,
              ease: "power1.in",
              yPercent: -100,
              rotation: -4,
            },
            "start"
          )
          .to(
            item.titleInner,
            {
              startAt: { yPercent: 100, rotation: 4 },
              yPercent: 0,
              rotation: 0,
            },
            "start+=0.2"
          )
          .to(
            item.imageWrap,
            {
              scale: 0.95,
            },
            "start"
          )
          .to(
            item.image,
            {
              scale: 1.12,
            },
            "start"
          );
      };
      const onLeave = () => {
        if (!item.imageWrap || !item.image) return;

        gsap.timeline({
          defaults: {
            duration: 0.8,
            ease: "power4",
          },
        }).to([item.imageWrap, item.image], { scale: 1 });
      };

      item.el.addEventListener("click", onClick);
      item.el.addEventListener("keydown", onKeyDown);
      item.el.addEventListener("mouseenter", onEnter);
      item.el.addEventListener("mouseleave", onLeave);

      return () => {
        item.el.removeEventListener("click", onClick);
        item.el.removeEventListener("keydown", onKeyDown);
        item.el.removeEventListener("mouseenter", onEnter);
        item.el.removeEventListener("mouseleave", onLeave);
      };
    });

    const onWindowKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeItem();
      }
    };

    backCtrl.addEventListener("click", closeItem);
    window.addEventListener("keydown", onWindowKeyDown);

    const imageEls = Array.from(
      root.querySelectorAll<HTMLImageElement>("img.kinetic-item__img")
    );
    root.classList.add("kinetic-loading");
    Promise.all(
      imageEls.map(
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
    ).then(() => root.classList.remove("kinetic-loading"));

    return () => {
      handlers.forEach((cleanup) => cleanup());
      backCtrl.removeEventListener("click", closeItem);
      window.removeEventListener("keydown", onWindowKeyDown);
      clearPreviewOpenState();
      gsap.set(backCtrl, { clearProps: "all" });
      gsap.set(overlayInner, { clearProps: "all" });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="kinetic-section kinetic-loading"
      id="stories"
    >
      <div className="kinetic-frame max-w-[1400px] mx-auto px-6">
        <p className="text-[11px] tracking-[0.4em] uppercase text-primary mb-4">
          Field Notes
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display uppercase mb-4">
          Experiential Casefiles
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base sm:text-lg md:text-xl">
          Six builds, six hard problems. Each file opens with the kinetic burst
          and lands in a full unreveal-style case preview.
        </p>
      </div>
      <div className="kinetic-stage">
        <div className="kinetic-type" data-kinetic-type aria-hidden="true">
          {TYPE_LINES.map((line, index) => (
            <div key={`${line}-${index}`} className="kinetic-type__line">
              {line}
            </div>
          ))}
        </div>

        <div className="max-w-[1400px] mx-auto px-6 kinetic-shell">
          <div className="kinetic-content__overlay" aria-hidden="true">
            <div className="kinetic-overlay__inner" />
          </div>

          <div className="kinetic-preview">
            {STORIES.map((story) => (
              <article
                key={`preview-${story.id}`}
                className="kinetic-preview__item"
                id={`kinetic-preview-${story.id}`}
              >
                <h2 className="kinetic-preview__item-title kinetic-oh font-display">
                  <span className="kinetic-oh__inner">{story.title}</span>
                </h2>

                <div className="kinetic-preview__item-img-outer">
                  <div className="kinetic-preview__item-img-wrap">
                    <div
                      className="kinetic-preview__item-img"
                      style={{ backgroundImage: `url(${story.image})` }}
                    />
                  </div>
                </div>

                <div className="kinetic-preview__item-box kinetic-preview__item-box--left-top">
                  <h3 className="kinetic-preview__item-box-title kinetic-oh">
                    <span className="kinetic-oh__inner">Setting</span>
                  </h3>
                  <p className="kinetic-preview__item-box-desc kinetic-preview__item-copy">
                    {story.setting}
                  </p>
                </div>

                <div className="kinetic-preview__item-box kinetic-preview__item-box--left-bottom">
                  <h3 className="kinetic-preview__item-box-title kinetic-oh">
                    <span className="kinetic-oh__inner">Guest Flow</span>
                  </h3>
                  <p className="kinetic-preview__item-box-desc kinetic-preview__item-copy">
                    {story.guestFlow}
                  </p>
                </div>

                <div className="kinetic-preview__item-box kinetic-preview__item-box--right-top">
                  <h3 className="kinetic-preview__item-box-title kinetic-oh">
                    <span className="kinetic-oh__inner">Location</span>
                  </h3>
                  <p className="kinetic-preview__item-box-desc kinetic-preview__item-copy">
                    {story.locationCopy}
                  </p>
                </div>

                <div className="kinetic-preview__item-box kinetic-preview__item-box--right-bottom">
                  <h3 className="kinetic-preview__item-box-title kinetic-oh">
                    <span className="kinetic-oh__inner">Signature Move</span>
                  </h3>
                  <p className="kinetic-preview__item-box-desc kinetic-preview__item-copy">
                    {story.signatureMove}
                  </p>
                </div>

                <h3 className="kinetic-preview__item-subtitle kinetic-oh">
                  <span className="kinetic-oh__inner">{story.location}</span>
                </h3>
                <span className="kinetic-preview__item-meta kinetic-oh">
                  <span className="kinetic-oh__inner">
                    {story.category} / {story.year}
                  </span>
                </span>
                <p className="kinetic-preview__item-dek kinetic-preview__item-copy">
                  {story.caption} {story.brief}
                </p>
              </article>
            ))}

            <button
              type="button"
              className="kinetic-back"
              aria-label="Back to casefiles"
            >
              <svg width="200" height="36" viewBox="0 0 50 9">
                <path d="m0 4.5 5-3m-5 3 5 3m45-3h-77" />
              </svg>
            </button>
          </div>

          <section className="kinetic-item-wrap">
            {STORIES.map((story) => (
              <figure
                key={story.id}
                className="kinetic-item"
                data-preview={`kinetic-preview-${story.id}`}
                role="button"
                tabIndex={0}
              >
                <h3 className="kinetic-item__title kinetic-oh font-display">
                  <span className="kinetic-oh__inner">{story.title}</span>
                </h3>

                <div className="kinetic-item__img-wrap">
                  <img
                    className="kinetic-item__img"
                    src={story.image}
                    alt={story.title}
                  />
                </div>

                <figcaption className="kinetic-item__caption">
                  {story.caption}
                </figcaption>
              </figure>
            ))}
          </section>
        </div>
      </div>

      <style>{`
        .kinetic-section {
          position: relative;
          overflow: hidden;
          padding: 6rem 0 8rem;
          background:
            radial-gradient(circle at top, rgba(201, 168, 76, 0.18), transparent 55%),
            #070707;
          color: #f6f2ea;
          --kinetic-accent: #c9a84c;
          --kinetic-type-opacity: 0.08;
          z-index: 1;
        }
        .kinetic-section.kinetic-loading .kinetic-item,
        .kinetic-section.kinetic-loading .kinetic-frame {
          opacity: 0;
        }
        .kinetic-stage {
          position: relative;
          margin-top: 3.5rem;
          padding-bottom: 3rem;
        }
        .kinetic-type {
          position: absolute;
          inset: -30vmax;
          display: grid;
          justify-content: center;
          align-content: center;
          text-align: center;
          pointer-events: none;
          will-change: transform;
        }
        .kinetic-type__line {
          white-space: nowrap;
          font-size: clamp(4rem, 14vw, 12rem);
          line-height: 0.75;
          font-weight: 700;
          text-transform: uppercase;
          font-family: inherit;
          color: var(--kinetic-accent);
          opacity: var(--kinetic-type-opacity);
          letter-spacing: 0.05em;
          user-select: none;
          will-change: transform, opacity;
        }
        .kinetic-shell {
          position: relative;
          min-height: 78vh;
          overflow: hidden;
          border-radius: 0;
          border: 0;
          background: transparent;
          box-shadow: none;
          contain: layout paint;
        }
        .kinetic-oh {
          display: block;
          overflow: hidden;
        }
        .kinetic-oh__inner {
          display: block;
          will-change: transform;
          backface-visibility: hidden;
        }
        .kinetic-item-wrap {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.75rem;
          position: relative;
          z-index: 2;
          padding: clamp(1.15rem, 2vw, 1.8rem);
        }
        .kinetic-item {
          --offset: 0px;
          width: 100%;
          margin: 0;
          padding: 0;
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          transform: translateY(var(--offset));
          will-change: transform, opacity;
        }
        .kinetic-item:focus-visible {
          outline: 1px solid rgba(201, 168, 76, 0.9);
          outline-offset: 10px;
        }
        .kinetic-item__title {
          font-size: clamp(1.7rem, 3.1vw, 2.7rem);
          line-height: 0.92;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin: 0 0 0.85rem;
        }
        .kinetic-item__img-wrap {
          overflow: hidden;
          position: relative;
          width: 100%;
          aspect-ratio: 0.78;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(12, 12, 12, 0.65);
          box-shadow: 0 14px 42px rgba(0, 0, 0, 0.22);
          will-change: transform;
        }
        .kinetic-item__img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
        }
        .kinetic-item__caption {
          margin-top: 0.85rem;
          max-width: 26ch;
          font-size: 0.76rem;
          line-height: 1.65;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(246, 242, 234, 0.62);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .kinetic-content__overlay {
          position: absolute;
          inset: -16%;
          pointer-events: none;
          z-index: 3;
          transform: rotate(45deg) scale(0.84);
          background: transparent;
          visibility: hidden;
          opacity: 0;
        }
        .kinetic-section.kinetic-preview-open .kinetic-content__overlay {
          visibility: hidden;
          opacity: 0;
        }
        .kinetic-overlay__inner {
          width: 100%;
          height: 100%;
          position: relative;
          background: transparent;
          -webkit-mask-image: none;
          mask-image: none;
        }
        .kinetic-preview {
          position: absolute;
          inset: 0;
          display: grid;
          pointer-events: none;
          z-index: 4;
          color: #f6f2ea;
        }
        .kinetic-preview__item {
          grid-area: 1 / 1 / -1 / -1;
          opacity: 0;
          pointer-events: none;
          display: grid;
          row-gap: 0.2rem;
          column-gap: 0.5rem;
          min-height: 100%;
          width: min(92vw, 1100px);
          margin: 0 auto;
          padding: clamp(0.75rem, 1.2vw, 1.1rem) clamp(0.85rem, 1.3vw, 1.2rem)
            clamp(2.4rem, 4vw, 3rem);
          grid-template-columns: 100%;
          grid-template-rows: repeat(10, auto);
          grid-template-areas:
            "title"
            "image"
            "subtitle"
            "meta"
            "dek"
            "box-left-top"
            "box-left-bottom"
            "box-right-top"
            "box-right-bottom"
            ".";
          will-change: clip-path;
          border-radius: 0;
          border: 0;
          background: transparent;
          box-shadow: none;
        }
        .kinetic-preview__item--current {
          opacity: 1;
          pointer-events: auto;
        }
        .kinetic-preview__item-img-outer {
          align-self: start;
          justify-self: center;
          width: min(44vw, 400px);
          max-width: 400px;
          grid-area: image;
          transform: rotate(45deg);
          aspect-ratio: 0.72;
          margin: 0.05rem 0 0.15rem;
          z-index: 2;
        }
        .kinetic-preview__item-img-wrap {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        .kinetic-preview__item-img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: 50% 50%;
          will-change: transform;
        }
        .kinetic-preview__item-title {
          align-self: start;
          justify-self: center;
          grid-area: title;
          font-size: clamp(2.8rem, 15vw, 8.5rem);
          line-height: 0.9;
          text-transform: uppercase;
          letter-spacing: -0.05em;
          margin: 0 0 -0.35rem;
          z-index: 1;
          text-align: center;
          max-width: 9ch;
          text-wrap: balance;
        }
        .kinetic-preview__item-subtitle {
          justify-self: center;
          position: relative;
          grid-area: subtitle;
          margin: -0.45rem 0 0;
          font-size: 0.78rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--kinetic-accent);
          z-index: 1;
          text-align: center;
        }
        .kinetic-preview__item-meta {
          justify-self: center;
          position: relative;
          grid-area: meta;
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(246, 242, 234, 0.72);
          z-index: 1;
          text-align: center;
          margin-top: -0.6rem;
        }
        .kinetic-preview__item-dek {
          grid-area: dek;
          justify-self: center;
          max-width: 46ch;
          margin: 0.15rem 0 0;
          text-align: center;
          font-size: 0.8rem;
          line-height: 1.65;
          color: rgba(246, 242, 234, 0.82);
        }
        .kinetic-preview__item-box {
          padding: 0.4rem 0.5rem;
          position: relative;
          max-width: 24ch;
          justify-self: center;
          text-align: center;
          z-index: 1;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }
        .kinetic-preview__item-box--left-top {
          grid-area: box-left-top;
          margin-left: 8px;
        }
        .kinetic-preview__item-box--left-bottom {
          grid-area: box-left-bottom;
          margin-left: 8px;
        }
        .kinetic-preview__item-box--right-top {
          grid-area: box-right-top;
          margin-right: 8px;
        }
        .kinetic-preview__item-box--right-bottom {
          grid-area: box-right-bottom;
          margin-right: 8px;
        }
        .kinetic-preview__item-box-title {
          margin: 0;
          font-size: 0.72rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: var(--kinetic-accent);
        }
        .kinetic-preview__item-box-desc {
          margin: 0.55rem 0 0;
          font-size: 0.8rem;
          line-height: 1.62;
          color: rgba(246, 242, 234, 0.78);
          will-change: transform, opacity;
        }
        #kinetic-preview-03 .kinetic-preview__item-img-outer {
          margin-top: -6px;
        }
        #kinetic-preview-03 .kinetic-preview__item-title {
          margin-bottom: -0.2rem;
        }
        #kinetic-preview-03 .kinetic-preview__item-box--left-top,
        #kinetic-preview-03 .kinetic-preview__item-box--right-top {
          transform: translateY(10px);
        }
        #kinetic-preview-03 .kinetic-preview__item-box--left-bottom,
        #kinetic-preview-03 .kinetic-preview__item-box--right-bottom {
          transform: translateY(-8px);
        }
        .kinetic-back {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          background: none;
          border: 0;
          padding: 0;
          margin: 0;
          opacity: 0;
          pointer-events: none;
          cursor: pointer;
          width: 72px;
          z-index: 9;
          will-change: transform, opacity;
        }
        .kinetic-back svg {
          display: block;
          width: 100%;
          height: auto;
          stroke: var(--kinetic-accent);
          stroke-width: 1.2px;
          stroke-linecap: round;
          pointer-events: none;
        }
        @media (min-width: 40em) {
          .kinetic-item-wrap {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 2rem;
          }
        }
        @media (min-width: 53em) {
          .kinetic-item-wrap {
            min-height: 78vh;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 2.5rem 2rem;
            align-items: start;
          }
          .kinetic-item:nth-child(2) {
            --offset: 18px;
          }
          .kinetic-item:nth-child(3) {
            --offset: -8px;
          }
          .kinetic-item:nth-child(4) {
            --offset: 26px;
          }
          .kinetic-item:nth-child(5) {
            --offset: -6px;
          }
          .kinetic-item:nth-child(6) {
            --offset: 16px;
          }
          .kinetic-preview__item {
            padding: 0.8rem 0.9rem 2.5rem;
            grid-template-columns: minmax(150px, 0.85fr) minmax(220px, 340px) minmax(150px, 0.85fr);
            grid-template-rows: auto minmax(70px, 1fr) minmax(70px, 1fr) auto auto auto;
            grid-template-areas:
              "title title title"
              "box-left-top image box-right-top"
              "box-left-bottom image box-right-bottom"
              ". subtitle ."
              ". meta ."
              ". dek .";
            align-items: center;
          }
          .kinetic-preview__item-title {
            margin-bottom: -0.1rem;
          }
          .kinetic-preview__item-img-outer {
            width: min(24vw, 330px);
            grid-column: 2;
            grid-row: 2 / span 3;
            align-self: center;
            margin: 0.05rem 0 0;
            max-width: 340px;
          }
          .kinetic-preview__item-box--right-top,
          .kinetic-preview__item-box--right-bottom {
            justify-self: end;
            text-align: right;
          }
          .kinetic-preview__item-box--left-top,
          .kinetic-preview__item-box--left-bottom {
            justify-self: start;
            text-align: left;
          }
        }
        @media (max-width: 640px) {
          .kinetic-section {
            padding-top: 5rem;
          }
          .kinetic-frame,
          .kinetic-shell {
            padding-left: clamp(1rem, 4.5vw, 1.5rem);
            padding-right: clamp(1rem, 4.5vw, 1.5rem);
          }
          .kinetic-frame h2 {
            text-wrap: balance;
          }
          .kinetic-frame p {
            max-width: 34ch;
          }
          .kinetic-stage {
            margin-top: 2.75rem;
          }
          .kinetic-item-wrap {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1.25rem;
          }
          .kinetic-item__caption {
            max-width: none;
          }
          .kinetic-preview__item-img-outer {
            width: min(68vw, 340px);
          }
          .kinetic-preview__item-title {
            font-size: clamp(2.35rem, 13vw, 4.8rem);
          }
          .kinetic-preview__item-dek {
            font-size: 0.82rem;
            line-height: 1.7;
          }
          .kinetic-preview__item-box {
            max-width: none;
          }
        }
      `}</style>
    </section>
  );
}
