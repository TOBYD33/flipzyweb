import { HeroSection } from "@/landing/components/HeroSection";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[linear-gradient(140deg,#fbf6ff_0%,#ffffff_48%,#effff8_100%)] px-3 py-3 sm:px-5 sm:py-5 md:px-6">
      <div className="mx-auto flex min-h-[calc(100dvh-1.5rem)] w-full max-w-7xl flex-col">
        <HeroSection />
      </div>
    </main>
  );
}
