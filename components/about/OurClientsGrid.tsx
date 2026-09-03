"use client";

import { useEffect, useState } from "react";
import InteractiveGrid from "@/components/originkit/ui/interactive-grid";

const clientLogos = [
  { src: "/clients/ga-paint.png" },
  { src: "/clients/peer-freight.png" },
  { src: "/clients/twine.png" },
  { src: "/clients/busy-bee.png" },
  { src: "/clients/baba.png", scale: 0.82 },
  { src: "/clients/toppings.png" },
  { src: "/clients/masshole-donuts.png", scale: 0.88 },
  { src: "/clients/coffee-croissant.png", scale: 0.92 },
];

function useClientGridLayout() {
  const [layout, setLayout] = useState({ columns: 4, rows: 2 });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)");
    const update = () => {
      setLayout(
        media.matches ? { columns: 2, rows: 4 } : { columns: 4, rows: 2 },
      );
    };

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return layout;
}

export function OurClientsGrid() {
  const { columns, rows } = useClientGridLayout();

  return (
    <div className="nen-clients__interactive">
      <InteractiveGrid
        images={clientLogos}
        columns={columns}
        rows={rows}
        padding="0.75rem"
        gap={14}
        rounded={12}
        logoScale={4.5}
        cardPadding="0.85rem"
        cardFill="#11110f"
        cardBorder="#292929"
        shadow={false}
        cardShadow="rgba(217, 251, 232, 0.5)"
        glow={false}
        glowStart="rgba(56, 239, 125, 0.5)"
        glowEnd="#38EF7D"
        glowIntensity={50}
        perspective={1600}
      />
    </div>
  );
}
