import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ByTheNumbers } from "@/components/home/ByTheNumbers";
import { Hero } from "@/components/home/Hero";
import { HomeCTA } from "@/components/home/HomeCTA";
import { SelectedWork } from "@/components/home/SelectedWork";
import { WhatIDo } from "@/components/home/WhatIDo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <ByTheNumbers />
      <WhatIDo />
      <AboutTeaser />
      <HomeCTA />
    </>
  );
}
