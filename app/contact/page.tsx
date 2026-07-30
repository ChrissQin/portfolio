import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="container py-16 md:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
        Contact
      </h1>
      <p className="mt-4 max-w-xl text-ink-muted">
        Email CTA and copy-email interaction arrive in Phase 4. Contact details
        remain placeholders until provided.
      </p>
    </section>
  );
}
