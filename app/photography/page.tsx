import type { Metadata } from "next";

import { PhotoMasonry } from "@/components/photography/PhotoMasonry";
import { placeholderPhotos } from "@/data/placeholders";

export const metadata: Metadata = {
  title: "Photography",
  description: "Selected photography — still frames, studies, and personal work.",
};

export default function PhotographyPage() {
  return (
    <section className="nen-photo" aria-label="Photography">
      <div className="nen-container">
        <h1 className="sr-only">Photography</h1>
        <PhotoMasonry photos={placeholderPhotos} />

        <div className="nen-photo__signature">
          <p className="nen-photo__signature-meta">
            Brand · Event · Portrait · Street · Nature
          </p>
          <a
            href="mailto:cqvisualscontact@gmail.com"
            className="nen-photo__signature-email"
          >
            cqvisualscontact@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
