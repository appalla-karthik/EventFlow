import { useEffect, useRef, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEventDetail, MOCK_EVENT_DETAILS } from '@/hooks/use-events';
import { ArrowLeft, MapPin, Calendar, Clock, ChevronRight, Star, Users, Award } from 'lucide-react';
import { Cursor } from '@/components/Cursor';

gsap.registerPlugin(ScrollTrigger);

export default function EventDetail() {
  const [, params] = useRoute('/events/:id');
  const [, navigate] = useLocation();
  const id = Number(params?.id ?? 1);
  const { data: event } = useEventDetail(id);
  const [activeDay, setActiveDay] = useState(0);
  const [bookingVisible, setBookingVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Parallax hero image + title fade
  useEffect(() => {
    if (!heroRef.current || !heroImgRef.current || !heroTitleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(heroImgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(heroTitleRef.current, {
        yPercent: -20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '50% top', scrub: true },
      });
    }, heroRef);
    return () => ctx.revert();
  }, [event]);

  // Booking card reveal after hero
  useEffect(() => {
    if (!heroRef.current) return;
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'bottom 80%',
      onEnter: () => setBookingVisible(true),
      onLeaveBack: () => setBookingVisible(false),
    });
    return () => st.kill();
  }, [event]);

  // Active day tracking via IntersectionObserver
  useEffect(() => {
    if (!event) return;
    const observers: IntersectionObserver[] = [];
    dayRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveDay(i); },
        { rootMargin: '-30% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [event]);

  // Animate schedule items
  useEffect(() => {
    if (!event || !scheduleRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.schedule-item');
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.7, delay: i * 0.05, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', once: true } }
        );
      });
    }, scheduleRef);
    return () => ctx.revert();
  }, [event]);


  if (!event) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="text-foreground/50 mb-6">Event not found.</p>
        <button onClick={() => navigate('/')} className="text-primary border-b border-primary/30 text-sm tracking-widest uppercase">
          Return Home
        </button>
      </div>
    </div>
  );

  return (
    <>
    <Cursor />
    <div className="bg-background min-h-screen text-foreground">

      {/* ── PARALLAX HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[100svh] sm:h-screen overflow-hidden">
        {/* Background image with parallax */}
        <div ref={heroImgRef} className="absolute inset-0 will-change-transform">
          <img src={event.image} alt={event.title} className="w-full h-[130%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Back button */}
        <div className="absolute top-4 left-6 sm:top-8 sm:left-10 z-30">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm tracking-widest uppercase group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
        </div>

        {/* Hero content — fades out on scroll */}
        <div ref={heroTitleRef} className="relative z-20 h-full flex flex-col justify-end pb-16 sm:pb-24 px-5 sm:px-8 md:px-16 max-w-7xl mx-auto will-change-transform">
          <p className="text-primary font-medium tracking-[0.35em] text-xs uppercase mb-4">{event.category}</p>
          <h1 className="text-[clamp(2.2rem,9vw,4.2rem)] sm:text-[clamp(3rem,8vw,100px)] font-display leading-[0.9] uppercase mb-6">{event.title}</h1>
          <p className="text-lg sm:text-xl font-display italic text-foreground/70 mb-8 max-w-xl">{event.subtitle}</p>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-foreground/50 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" />{event.date}</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" />{event.location}</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 md:px-16 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-xs tracking-[0.35em] uppercase mb-4">About This Event</p>
            <p className="text-xl sm:text-2xl font-display italic text-foreground/80 leading-relaxed">{event.description}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-3 p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground/70 leading-snug">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ───────────────────────────────────────────── */}
      <section className="py-10 sm:py-12 px-5 sm:px-8 md:px-16 border-b border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {[
            { icon: Users, label: 'Curated Guests', value: '300+' },
            { icon: Star, label: 'Experience Rating', value: '5.0 ★' },
            { icon: Award, label: 'Years Excellence', value: '12' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="px-4 sm:px-8 flex flex-col items-center gap-1 text-center">
              <Icon className="w-5 h-5 text-primary mb-2" />
              <p className="text-2xl sm:text-3xl font-display text-foreground">{value}</p>
              <p className="text-xs text-foreground/40 tracking-widest uppercase">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STICKY SCHEDULE ───────────────────────────────────────── */}
      <section ref={scheduleRef} className="py-16 sm:py-24 px-5 sm:px-8 md:px-16 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-16">
            <p className="text-primary text-xs tracking-[0.35em] uppercase mb-3">Full Itinerary</p>
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-display uppercase">Schedule</h2>
          </div>

          <div className="flex gap-8 md:gap-16">
            {/* LEFT — sticky day labels */}
            <div className="hidden md:block w-48 shrink-0">
              <div className="sticky top-28 flex flex-col gap-6">
                {event.schedule.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => dayRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="text-left transition-all duration-300 group"
                  >
                    <p
                      className={`text-xs tracking-[0.3em] uppercase mb-1 transition-colors duration-300 ${activeDay === i ? 'text-primary' : 'text-foreground/30'}`}
                    >
                      {day.date}
                    </p>
                    <p
                      className={`font-display text-sm leading-tight transition-all duration-300 ${activeDay === i ? 'text-foreground text-base' : 'text-foreground/30'}`}
                    >
                      {day.day.split('—')[0]}
                    </p>
                    <p
                      className={`text-xs font-display italic transition-colors duration-300 ${activeDay === i ? 'text-primary' : 'text-foreground/20'}`}
                    >
                      {day.day.split('—')[1]?.trim()}
                    </p>
                    <div
                      className="mt-2 h-px transition-all duration-500"
                      style={{ width: activeDay === i ? '48px' : '16px', backgroundColor: activeDay === i ? '#c9a84c' : 'rgba(255,255,255,0.1)' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — scrolling timeline */}
            <div className="flex-1 flex flex-col gap-12 sm:gap-20">
              {event.schedule.map((day, di) => (
                <div
                  key={di}
                  ref={(el) => {
                    dayRefs.current[di] = el;
                  }}
                >
                  {/* Day heading (mobile) */}
                  <div className="md:hidden mb-8">
                    <p className="text-primary text-xs tracking-widest uppercase mb-1">{day.date}</p>
                    <h3 className="text-xl sm:text-2xl font-display">{day.day}</h3>
                  </div>

                  {/* Timeline items */}
                  <div className="relative pl-6 sm:pl-8 border-l border-white/[0.08] flex flex-col gap-10">
                    {day.items.map((item, ii) => (
                      <div key={ii} className="schedule-item relative opacity-0">
                        {/* Dot on timeline */}
                        <div className="absolute -left-[29px] sm:-left-[37px] top-1 w-3 h-3 rounded-full border-2 border-primary bg-background" />

                        <div className="flex items-start gap-6">
                          <p className="text-primary font-mono text-sm shrink-0 w-12 sm:w-14">{item.time}</p>
                          <div>
                            <h4 className="text-base sm:text-lg font-display text-foreground mb-1">{item.title}</h4>
                            <p className="text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER EVENTS ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-primary text-xs tracking-[0.35em] uppercase mb-3">Explore More</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display uppercase mb-12">Similar Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_EVENT_DETAILS.filter(e => e.id !== id).slice(0, 3).map(e => (
              <button
                key={e.id}
                onClick={() => navigate(`/events/${e.id}`)}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden text-left"
              >
                <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <p className="text-primary text-xs tracking-widest uppercase mb-1">{e.category}</p>
                  <p className="text-lg sm:text-xl font-display text-white">{e.title}</p>
                  <p className="text-xs text-white/50 mt-1">{e.date} · {e.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOATING BOOKING CARD ─────────────────────────────────── */}
      <div
        className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-auto sm:right-6 z-50 transition-all duration-700"
        style={{
          transform: bookingVisible ? 'translateY(0) scale(1)' : 'translateY(120%) scale(0.95)',
          opacity: bookingVisible ? 1 : 0,
          pointerEvents: bookingVisible ? 'auto' : 'none',
        }}
      >
        <div
          className="relative rounded-2xl overflow-hidden p-5 sm:p-6 w-full sm:w-[300px] border border-white/10 shadow-2xl"
          style={{
            background: 'rgba(12, 12, 12, 0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Gold accent line */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent" />

          <p className="text-primary text-[10px] tracking-[0.35em] uppercase mb-3">Reserve Your Seat</p>
          <h3 className="font-display text-xl text-foreground mb-1">{event.title}</h3>
          <p className="text-xs text-foreground/40 uppercase tracking-widest mb-5">{event.date}</p>

          <div className="flex items-baseline gap-1 mb-5">
            <span className="text-2xl sm:text-3xl font-display text-foreground">${event.price.toLocaleString()}</span>
            <span className="text-xs text-foreground/40">/person</span>
          </div>

          <div className="flex flex-col gap-2 mb-5 text-xs text-foreground/50">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>{event.schedule.length} Day{event.schedule.length > 1 ? 's' : ''} Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{event.location}</span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/reserve?event=${event.id}`)}
            className="w-full py-3.5 bg-[#c9a84c] hover:bg-[#b8973b] text-background font-medium text-sm tracking-widest uppercase rounded-xl transition-colors duration-300"
          >
            Book Now
          </button>
          <button
            onClick={() => navigate("/#contact")}
            className="w-full py-2 mt-2 text-foreground/40 hover:text-foreground/70 text-xs tracking-widest uppercase transition-colors"
          >
            Enquire Instead
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

