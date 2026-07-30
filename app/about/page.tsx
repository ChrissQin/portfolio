import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="container py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        About
      </h1>
      <p className="mt-4 max-w-xl text-ink-muted">
        Full about page arrives in Phase 4.
      </p>
    </section>
  );
}
