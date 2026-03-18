import { useLocation } from 'wouter';
import { MagneticButton } from './MagneticButton';

export function ContactCTA() {
  const [, navigate] = useLocation();

  return (
    <section className="relative py-24 sm:py-32 md:py-40 px-6 bg-secondary overflow-hidden" id="contact">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.15),transparent_50%)]" />
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display text-foreground uppercase leading-tight mb-6 sm:mb-8">
          Let's Create Something <br/>
          <span className="text-primary italic">Extraordinary</span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 sm:mb-16 font-light">
          Ready to make your next event truly unforgettable? Our team of experts is waiting to bring your vision to life.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <MagneticButton
            variant="solid"
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg"
            onClick={() => navigate("/reserve")}
          >
            Start Planning
          </MagneticButton>
          <MagneticButton
            variant="outline"
            className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg"
            onClick={() => navigate("/portfolio")}
          >
            View Portfolio
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
