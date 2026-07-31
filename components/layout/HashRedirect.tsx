"use client";

import { useEffect } from "react";

type HashRedirectProps = {
  /** Section id without the leading hash. */
  hash: string;
};

/**
 * Client redirect for retired multi-page stubs.
 * HTTP redirects cannot carry a fragment, so hash targets need the browser.
 */
export function HashRedirect({ hash }: HashRedirectProps) {
  useEffect(() => {
    const id = hash.replace(/^#/, "");
    window.location.replace(`/#${id}`);
  }, [hash]);

  return <p className="sr-only">Redirecting to homepage section…</p>;
}
