"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Download, Mail } from "lucide-react";

import { site } from "@/lib/site";
import { useCopyEmail } from "@/hooks/use-copy-email";

/** Phone-only action bar that appears once the hero (and its CTAs) scrolls away. */
export function MobileCta() {
  const [visible, setVisible] = useState(false);
  const { copied, copy } = useCopyEmail();

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "-40% 0px 0px 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-background/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl lg:hidden"
        >
          <div className="mx-auto flex max-w-md gap-2">
            <a
              href={site.resumePdf}
              download
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-accent text-sm font-medium text-accent-foreground"
            >
              <Download className="size-4" />
              Résumé
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-card/70 text-sm font-medium text-foreground"
            >
              {copied ? <Check className="size-4 text-success" /> : <Mail className="size-4" />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
