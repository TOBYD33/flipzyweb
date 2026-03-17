import Image from "next/image";
import { LandingFooter } from "@/landing/components/LandingFooter";
import { RotatingHeroWord } from "@/landing/components/RotatingHeroWord";
import { StatsRow } from "@/landing/components/StatsRow";
import { DownloadButtons, WaitlistForm } from "@/landing/components/WaitlistForm";
import { PhoneMock } from "@/landing/components/PhoneMock";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-[radial-gradient(circle_at_15%_15%,rgba(94,12,200,0.24),transparent_38%),radial-gradient(circle_at_85%_18%,rgba(3,251,137,0.26),transparent_34%),linear-gradient(130deg,#fff7ff_0%,#ffffff_45%,#f4fff9_100%)] px-4 py-4 shadow-[0_28px_70px_rgba(19,7,39,0.1)] sm:px-7 sm:py-6 lg:px-8 lg:py-7">
      <span className="float-icon absolute left-[6%] top-[16%] hidden sm:block">✨</span>
      <span className="float-icon absolute left-[42%] top-[22%] hidden md:block [animation-delay:0.35s]">💬</span>
      <span className="float-icon absolute bottom-[26%] left-[9%] hidden sm:block [animation-delay:0.55s]">🏷️</span>
      <span className="float-icon absolute bottom-[20%] right-[8%] hidden sm:block [animation-delay:0.2s]">💸</span>

      <div className="grid flex-1 items-center gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <div className="relative z-10 flex flex-col justify-center">
          <header className="mb-4 sm:mb-5">
            <Image
              src="/assets/Flipzy-Final-Logo-07.png"
              alt="Flipzy"
              width={464}
              height={116}
              className="h-12 max-w-full w-auto sm:h-14 lg:h-16"
              priority
            />
          </header>

          <p className="inline-flex w-fit rounded-full border border-flipzy-purple/20 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-flipzy-purple sm:px-4 sm:py-1.5 sm:text-xs">
            Early access beta waitlist
          </p>

          <h1 className="mt-3 text-[clamp(2rem,4.6vw,4.1rem)] font-extrabold leading-[0.94] tracking-tight text-flipzy-ink">
            <span className="block">Bumble meets</span>
            <span className="block min-h-[1.1em]">
              <RotatingHeroWord />
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-flipzy-ink/75 sm:text-base lg:text-[1.02rem]">
            Discover your next business opportunity. Swipe, network, and make deals happen in seconds.
          </p>

          <WaitlistForm />
          <div className="hidden lg:block">
            <DownloadButtons />
            <StatsRow />
          </div>

          <div className="mt-4 lg:hidden">
            <PhoneMock />
            <DownloadButtons />
            <StatsRow />
          </div>
        </div>

        <div className="relative z-10 hidden items-center justify-center lg:flex">
          <PhoneMock />
        </div>
      </div>

      <LandingFooter />
    </section>
  );
}
