"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems } from "@/lib/data";
import { site } from "@/lib/site";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { Button } from "@/components/ui/button";

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds, 96);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "border-b transition-colors duration-300",
          scrolled
            ? "border-border/70 bg-background/70 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <nav className="container flex h-16 items-center justify-between gap-4" aria-label="Primary">
          {/* Identity */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("top");
            }}
            className="group flex items-center gap-3"
          >
            <span className="grid size-9 place-items-center rounded-lg border border-border bg-card text-sm font-semibold tracking-tight text-foreground">
              NJ
            </span>
            <span className="hidden text-sm font-medium text-foreground sm:inline">{site.name}</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-md bg-secondary/70"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="accent" className="hidden sm:inline-flex">
              <a href={site.resumePdf} download>
                <Download />
                Résumé
              </a>
            </Button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="grid size-9 place-items-center rounded-lg border border-border bg-card/60 text-foreground lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container grid gap-1 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition-colors",
                    activeId === item.id
                      ? "bg-secondary/70 text-foreground"
                      : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
                  )}
                >
                  <span>{item.label}</span>
                </button>
              ))}
              <Button asChild variant="accent" className="mt-2">
                <a href={site.resumePdf} download>
                  <Download />
                  Download résumé
                </a>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
