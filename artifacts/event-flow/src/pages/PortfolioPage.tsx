import { useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MagneticButton } from "@/components/MagneticButton";
import { useLenis } from "@/hooks/use-lenis";

const highlights = [
  { label: "Global Projects", value: "120+" },
  { label: "Cities Activated", value: "38" },
  { label: "Live Attendance", value: "480K" },
  { label: "Years of Delivery", value: "12" },
];

const cases = [
  {
    id: "01",
    title: "Azure Horizon Summit",
    location: "Lisbon, PT",
    year: "2025",
    vibe: "Leadership Congress",
    summary:
      "A multi-stage executive summit designed for momentum, clarity, and connection.",
  },
  {
    id: "02",
    title: "Velocity Grand Prix Club",
    location: "Monte Carlo, MC",
    year: "2025",
    vibe: "VIP Hospitality",
    summary:
      "Trackside luxury experiences with private lounges, brand activations, and concierge service.",
  },
  {
    id: "03",
    title: "Pulse City Festival",
    location: "Barcelona, ES",
    year: "2024",
    vibe: "Festival Experience",
    summary:
      "An outdoor music festival with immersive scenography and night-light choreography.",
  },
  {
    id: "04",
    title: "Orion Product Reveal",
    location: "Dubai, UAE",
    year: "2024",
    vibe: "Brand Launch",
    summary:
      "A cinematic unveil with synchronized lighting, projection mapping, and live performance.",
  },
];

const specialties = [
  "Brand summits",
  "Exhibitions & expos",
  "Corporate retreats",
  "Sports hospitality",
  "Launch events",
  "Awards nights",
];

export default function PortfolioPage() {
  useLenis();
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />

      <main className="pt-20 sm:pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-14 sm:pt-20 pb-14 sm:pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.2),transparent_55%)]" />
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs tracking-[0.35em] uppercase group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          </div>
          <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-end">
            <div>
              <p className="text-[11px] tracking-[0.45em] uppercase text-primary mb-6">
                Portfolio
              </p>
              <h1 className="text-[clamp(2.4rem,9vw,4.8rem)] sm:text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.92] font-display uppercase">
                Experiences
                <span className="text-primary italic"> That</span>
                <br />
                Command Attention
              </h1>
              <p className="text-muted-foreground max-w-xl mt-6 text-base sm:text-lg md:text-xl">
                A curated selection of moments crafted with intention, pace, and
                presence.
              </p>
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4">
                <MagneticButton
                  className="px-8 sm:px-10 py-3 sm:py-4"
                  onClick={() => navigate("/reserve")}
                >
                  Reserve With Us
                </MagneticButton>
                <button
                  className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-4 rounded-full border border-white/15 text-foreground hover:border-primary/60 transition-all cursor-none"
                  onClick={() => navigate("/#contact")}
                >
                  Request Deck
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="border border-white/10 rounded-2xl p-4 sm:p-6 bg-white/[0.03]"
                >
                  <p className="text-2xl sm:text-3xl font-display text-primary">{item.value}</p>
                  <p className="text-xs tracking-[0.3em] uppercase text-foreground/50 mt-2">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case list */}
        <section className="px-6 pb-16 sm:pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.35fr_0.65fr] gap-12">
            <div className="lg:sticky lg:top-32 h-fit space-y-6">
              <div className="border border-white/10 rounded-2xl p-6 bg-black/30">
                <p className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">
                  Specialties
                </p>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-full border border-white/10 text-[10px] tracking-[0.25em] uppercase text-foreground/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border border-white/10 rounded-2xl p-6 bg-white/[0.02]">
                <p className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">
                  Studio Note
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Each project is custom-built. We never repeat a room, a run of
                  show, or a guest experience.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {cases.map((item) => (
                <div
                  key={item.id}
                  className="group border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 bg-white/[0.02] hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4 text-[11px] tracking-[0.35em] uppercase text-foreground/40">
                    <span>{item.vibe}</span>
                    <span>{item.year}</span>
                  </div>
                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <p className="text-2xl sm:text-3xl md:text-4xl font-display uppercase">
                        {item.title}
                      </p>
                      <p className="text-sm text-foreground/50 mt-2">
                        {item.location}
                      </p>
                    </div>
                    <div className="text-2xl sm:text-3xl font-display text-foreground/10">
                      {item.id}
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4 max-w-2xl">
                    {item.summary}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-primary">
                    View Case
                    <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
