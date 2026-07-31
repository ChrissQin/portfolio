import { AboutTeaser } from "@/components/home/AboutTeaser";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Hero } from "@/components/home/Hero";
import { HomeCTA } from "@/components/home/HomeCTA";
import { Services } from "@/components/home/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Services />
      <AboutTeaser />
      <HomeCTA />
    </>
  );
}
