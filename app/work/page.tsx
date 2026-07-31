import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <section className="container page-stub">
      <p className="mono-label">01 / Archive</p>
      <h1 className="display-heading">Work</h1>
      <p>
        Full project archive arrives in a later phase. Featured cuts live on the
        homepage for now.
      </p>
    </section>
  );
}
