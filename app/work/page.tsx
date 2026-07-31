import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <section className="container py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Work
      </h1>
      <p className="mt-4 max-w-xl text-ink-muted">
        Curated project archive — coming after the visual checkpoint. No filters
        at launch.
      </p>
    </section>
  );
}
