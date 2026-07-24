"use client";

import dynamic from "next/dynamic";

const ConversionStory = dynamic(
  () =>
    import("@/components/home/ConversionStory").then(
      (module) => module.ConversionStory,
    ),
  {
    ssr: false,
    loading: () => (
      <section
        className="min-h-[34rem] border-y border-white/10 bg-[#12161c] lg:min-h-[100svh]"
        aria-label="Mühendislik süreci hazırlanıyor"
      />
    ),
  },
);

export function LazyConversionStory() {
  return <ConversionStory />;
}
