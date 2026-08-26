import { Hero } from "@/components/home/Hero";
import { SelectClients } from "@/components/home/SelectClients";
import { SelectWork } from "@/components/home/SelectWork";
import { MarqueeCTA } from "@/components/layout/MarqueeCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectClients />
      <SelectWork />
      <MarqueeCTA />
    </>
  );
}
