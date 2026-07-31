import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="container page-stub">
      <p className="mono-label">02 / Notes</p>
      <h1 className="display-heading">About</h1>
      <p>
        Full about page arrives later. The homepage spread has the short version
        for now.
      </p>
    </section>
  );
}
