import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { HomeCTA } from "@/components/home/HomeCTA";
import { WhatIDo } from "@/components/home/WhatIDo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <WhatIDo />
      <AboutTeaser />
      <HomeCTA />
    </>
  );
}
