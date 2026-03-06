import Image from "next/image";

export function PhoneMock() {
  return (
    <div className="relative mx-auto w-full max-w-[170px] sm:max-w-[220px] lg:max-w-[280px] xl:max-w-[320px]">
      <div className="absolute -inset-6 -z-20 rounded-[4rem] bg-[radial-gradient(circle,rgba(94,12,200,0.22),transparent_60%)] blur-3xl" />
      <div className="absolute inset-x-6 bottom-0 -z-10 h-8 rounded-full bg-black/15 blur-2xl" />
      <div className="relative rounded-[2.6rem] bg-[linear-gradient(160deg,#3a3444_0%,#17141f_48%,#06070a_100%)] p-[8px] shadow-[0_26px_60px_rgba(15,10,25,0.24),0_8px_20px_rgba(15,10,25,0.18)] sm:rounded-[3rem]">
        <div className="absolute inset-[8px] rounded-[2.2rem] border border-white/10 sm:rounded-[2.6rem]" />
        <div className="relative overflow-hidden rounded-[2.2rem] bg-[#111] sm:rounded-[2.6rem]">
          <div className="pointer-events-none absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black/90 shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:h-6 sm:w-28" />

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
