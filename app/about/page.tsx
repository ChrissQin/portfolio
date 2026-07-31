import type { Metadata } from "next";

import { HashRedirect } from "@/components/layout/HashRedirect";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AboutRedirectPage() {
  return <HashRedirect hash="about" />;
}
