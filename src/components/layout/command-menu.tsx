"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  FileText,
  Github,
  Home,
  Linkedin,
  Mail,
  PenLine,
  Send,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { navItems } from "@/lib/data";
import { site } from "@/lib/site";

type CommandMenuContextValue = {
  open: () => void;
  toggle: () => void;
};

const CommandMenuContext = createContext<CommandMenuContextValue | null>(null);

export function useCommandMenu() {
  const ctx = useContext(CommandMenuContext);
  if (!ctx) throw new Error("useCommandMenu must be used within CommandMenuProvider");
  return ctx;
}

export function CommandMenuProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const scrollTo = useCallback(
    (id: string) => {
      setOpen(false);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Not on the home page — route to the section anchor instead.
        router.push(id === "top" ? "/" : `/#${id}`);
      }
    },
    [router],
  );

  const goRoute = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const openExternal = useCallback((href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  }, []);

  const value = useMemo<CommandMenuContextValue>(
    () => ({
      open: () => setOpen(true),
      toggle: () => setOpen((prev) => !prev),
    }),
    [],
  );

  return (
    <CommandMenuContext.Provider value={value}>
      {children}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Jump to a section, or open a link…" />
        <CommandList>
          <CommandEmpty>No results.</CommandEmpty>
          <CommandGroup heading="Navigate">
            <CommandItem
              value="top home hero"
              onSelect={() => scrollTo("top")}
            >
              <Home />
              <span>Top of page</span>
            </CommandItem>
            {navItems.map((item) => (
              <CommandItem
                key={item.id}
                value={`${item.label} ${item.id}`}
                onSelect={() => scrollTo(item.id)}
              >
                <span className="font-mono text-2xs text-accent">{item.index}</span>
                <span>{item.label}</span>
              </CommandItem>
            ))}
            <CommandItem value="writing blog notes articles" onSelect={() => goRoute("/writing")}>
              <PenLine />
              <span>Writing</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Links">
            <CommandItem value="resume cv" onSelect={() => openExternal(site.resumeHref)}>
              <FileText />
              <span>Résumé</span>
              <CommandShortcut>
                <ArrowUpRight className="size-3" />
              </CommandShortcut>
            </CommandItem>
            <CommandItem value="github code" onSelect={() => openExternal(site.socials.github)}>
              <Github />
              <span>GitHub</span>
              <CommandShortcut>
                <ArrowUpRight className="size-3" />
              </CommandShortcut>
            </CommandItem>
            <CommandItem
              value="linkedin"
              onSelect={() => openExternal(site.socials.linkedin)}
            >
              <Linkedin />
              <span>LinkedIn</span>
              <CommandShortcut>
                <ArrowUpRight className="size-3" />
              </CommandShortcut>
            </CommandItem>
            <CommandItem
              value="email contact message"
              onSelect={() => {
                setOpen(false);
                window.location.href = site.socials.email;
              }}
            >
              <Mail />
              <span>Email</span>
            </CommandItem>
            <CommandItem value="contact section" onSelect={() => scrollTo("contact")}>
              <Send />
              <span>Get in touch</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </CommandMenuContext.Provider>
  );
}
