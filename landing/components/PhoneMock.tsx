import Image from "next/image";

export function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[138px] sm:max-w-[220px] lg:max-w-[280px] xl:max-w-[320px]">
      <div className="absolute -inset-4 -z-20 rounded-[1.5rem] bg-[radial-gradient(circle,rgba(94,12,200,0.18),transparent_60%)] blur-2xl sm:-inset-6 sm:rounded-[4rem] sm:blur-3xl" />
      <div className="absolute inset-x-5 bottom-0 -z-10 h-6 rounded-full bg-black/12 blur-xl sm:inset-x-6 sm:h-8 sm:bg-black/15 sm:blur-2xl" />
      <div className="relative rounded-[1.1rem] bg-[linear-gradient(160deg,#3a3444_0%,#17141f_48%,#06070a_100%)] p-[7px] shadow-[0_18px_40px_rgba(15,10,25,0.2),0_6px_14px_rgba(15,10,25,0.14)] sm:rounded-[3rem] sm:p-[8px] sm:shadow-[0_26px_60px_rgba(15,10,25,0.24),0_8px_20px_rgba(15,10,25,0.18)]">
        <div className="absolute inset-[7px] rounded-[0.85rem] border border-white/10 sm:inset-[8px] sm:rounded-[2.6rem]" />
        <div className="relative overflow-hidden rounded-[0.85rem] bg-[#111] sm:rounded-[2.6rem]">
          <div className="pointer-events-none absolute left-1/2 top-1.5 z-30 h-4 w-20 -translate-x-1/2 rounded-full bg-black/90 shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:top-2 sm:h-6 sm:w-28" />

          <div className="relative aspect-[375/812] bg-[#f6f1fb]">
            <Image
              src="/assets/FlipzyScreenPage.png"
              alt="Flipzy onboarding screen"
              fill
              priority
              sizes="(max-width: 640px) 80vw, 390px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
