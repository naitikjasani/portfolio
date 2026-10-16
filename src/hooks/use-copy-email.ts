"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { site } from "@/lib/site";

/** Copies the contact address; falls back to opening the mail client. */
export function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = site.socials.email;
    }
  }, []);

  return { copied, copy };
}
