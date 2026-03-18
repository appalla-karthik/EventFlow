import { Link } from "wouter";
import { MagneticButton } from "@/components/MagneticButton";
import { Cursor } from "@/components/Cursor";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <Cursor />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1),transparent_50%)]" />
      <div className="relative z-10">
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-display text-primary mb-4 drop-shadow-lg">404</h1>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-display text-foreground mb-6 sm:mb-8">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-10 sm:mb-12">
          The event you are looking for has concluded or the page doesn't exist.
        </p>
        <Link href="/">
          <MagneticButton variant="solid">
            Return to Home
          </MagneticButton>
        </Link>
      </div>
    </div>
  );
}
