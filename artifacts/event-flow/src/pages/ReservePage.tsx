import { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Calendar, MapPin, Clock, ArrowUpRight, ArrowLeft } from "lucide-react";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MagneticButton } from "@/components/MagneticButton";
import { useLenis } from "@/hooks/use-lenis";
import { MOCK_EVENT_DETAILS } from "@/hooks/use-events";

export default function ReservePage() {
  useLenis();
  const [, navigate] = useLocation();

  const initialId = useMemo(() => {
    if (typeof window === "undefined") return MOCK_EVENT_DETAILS[0].id;
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("event"));
    return Number.isFinite(id) ? id : MOCK_EVENT_DETAILS[0].id;
  }, []);

  const [selectedId, setSelectedId] = useState(initialId);
  const selected =
    MOCK_EVENT_DETAILS.find((event) => event.id === selectedId) ??
    MOCK_EVENT_DETAILS[0];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <>
      <Cursor />
      <Navbar />

      <main className="pt-20 sm:pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pt-14 sm:pt-20 pb-14 sm:pb-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,168,76,0.18),transparent_60%)]" />
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs tracking-[0.35em] uppercase group ml-3"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back
            </button>
          </div>
          <div className="max-w-6xl mx-auto relative z-10">
            <p className="text-[11px] tracking-[0.45em] uppercase text-primary mb-6">
              Reserve
            </p>
            <h1 className="text-[clamp(2.4rem,10vw,4.8rem)] sm:text-[clamp(3rem,9vw,8rem)] leading-[0.92] font-display uppercase">
              Secure Your
              <span className="text-primary italic"> Seat</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mt-6 text-base sm:text-lg md:text-xl">
              Choose an event, share your details, and we’ll confirm availability
              within 24 hours.
            </p>
          </div>
        </section>

        {/* Booking layout */}
        <section className="px-6 pb-16 sm:pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] gap-10">
            {/* Event selector */}
            <div className="space-y-5">
              <div className="border border-white/10 rounded-3xl p-5 sm:p-6 bg-white/[0.02]">
                <p className="text-[11px] tracking-[0.35em] uppercase text-primary mb-4">
                  Select Event
                </p>
                <div className="space-y-3">
                  {MOCK_EVENT_DETAILS.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => setSelectedId(event.id)}
                      className={`w-full text-left rounded-2xl border px-4 sm:px-5 py-3 sm:py-4 transition-all ${
                        event.id === selectedId
                          ? "border-primary/60 bg-primary/10"
                          : "border-white/10 hover:border-primary/40"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                        <div>
                          <p className="text-sm tracking-[0.25em] uppercase text-primary/80">
                            {event.category}
                          </p>
                          <p className="text-lg sm:text-xl font-display mt-1">
                            {event.title}
                          </p>
                          <p className="text-xs text-foreground/40 mt-1">
                            {event.location}
                          </p>
                        </div>
                        <span className="text-xs text-foreground/40">
                          {event.date}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 rounded-3xl p-5 sm:p-6 bg-black/20">
                <p className="text-[11px] tracking-[0.35em] uppercase text-primary mb-4">
                  Experience Summary
                </p>
                <div className="space-y-3 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {selected.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {selected.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {selected.schedule.length} day experience
                  </div>
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-display text-foreground">
                    ${selected.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-foreground/40">/person</span>
                </div>
              </div>
            </div>

            {/* Booking form */}
            <form className="border border-white/10 rounded-3xl p-6 sm:p-8 md:p-10 bg-white/[0.02]">
              <p className="text-[11px] tracking-[0.35em] uppercase text-primary mb-6">
                Reservation Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <label className="text-sm text-foreground/70">
                  Full Name
                  <input
                    type="text"
                    placeholder="Your name"
                    className="mt-3 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
                  />
                </label>
                <label className="text-sm text-foreground/70">
                  Email
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="mt-3 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
                  />
                </label>
                <label className="text-sm text-foreground/70">
                  Seats
                  <input
                    type="number"
                    min={1}
                    defaultValue={2}
                    className="mt-3 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
                  />
                </label>
                <label className="text-sm text-foreground/70">
                  Company
                  <input
                    type="text"
                    placeholder="Company / Brand"
                    className="mt-3 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
                  />
                </label>
              </div>
              <label className="text-sm text-foreground/70 block mt-6">
                Notes
                <textarea
                  rows={4}
                  placeholder="VIP requirements, dietary preferences, special requests..."
                  className="mt-3 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/60 transition-colors"
                />
              </label>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <MagneticButton className="px-8 sm:px-12 py-4 sm:py-5">
                  Confirm Reservation
                </MagneticButton>
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 rounded-full border border-white/15 text-foreground hover:border-primary/60 transition-all cursor-none"
                  onClick={() => navigate("/#contact")}
                >
                  Speak With Us
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

