import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <section className="container page-stub">
      <p className="mono-label">03 / Inbox</p>
      <h1 className="display-heading">Contact</h1>
      <p>
        Contact details stay unpublished until a real email and channels are
        provided.
      </p>
    </section>
  );
}
