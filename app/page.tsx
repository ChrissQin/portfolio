import { siteConfig } from "@/lib/constants";

export default function HomePage() {
  return (
    <section className="container py-16 md:py-24">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted">
        Phase 0 scaffold
      </p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">
        {siteConfig.name}
      </h1>
      <p className="mt-3 text-lg text-ink-muted md:text-xl">{siteConfig.role}</p>
      <p className="mt-6 max-w-2xl text-base text-ink md:text-lg">
        {siteConfig.tagline}
      </p>
      <p className="mt-10 max-w-xl text-sm text-ink-muted">
        Navigation, design tokens, project types, and base layout are in place.
        The homepage hero and project cards arrive in the Phase 1 visual
        checkpoint.
      </p>
    </section>
  );
}
