"use client";

import { useEffect, useState } from "react";

/**
 * Reactive `prefers-reduced-motion` hook.
 * Returns true when the user has requested reduced motion so animations
 * can be skipped or simplified.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
