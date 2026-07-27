/**
 * Single source of truth for identity, links and SEO metadata.
 * Update social handles here — every component and metadata file reads from this.
 */
export const site = {
  name: "Naitik Jasani",
  role: "Backend Software Engineer",
  company: "OZi",
  tagline: "Building scalable backend systems.",
  description:
    "Naitik Jasani is a backend software engineer building scalable, event-driven systems in production — Java, Spring Boot, Node.js, Kafka and Redis. Currently at OZi.",
  // Deployed domain — drives canonical URLs, sitemap, and OG/Twitter tags.
  url: "https://naitik-jasani.vercel.app",
  locale: "en_US",
  email: "naitik.jasani.work@gmail.com",
  // Résumé-only (kept off the public site to avoid spam); shown on /resume.
  phone: "+91 88520 02717",
  phoneHref: "tel:+918852002717",
  location: "India",
  // Handles — the single source of truth. Display strings are derived from these.
  handles: {
    github: "flicktoss",
    linkedin: "naitikjasani",
    leetcode: "flicktoss",
    codeforces: "flicktoss",
    codolio: "flicktoss",
    twitter: "flicktoss",
  },
  socials: {
    github: "https://github.com/flicktoss",
    linkedin: "https://www.linkedin.com/in/naitikjasani",
    email: "mailto:naitik.jasani.work@gmail.com",
  },
  // Competitive-programming / coding profiles — proof behind "1000+ DSA".
  profiles: {
    leetcode: "https://leetcode.com/u/flicktoss/",
    codeforces: "https://codeforces.com/profile/flicktoss",
    codolio: "https://codolio.com/profile/flicktoss",
  },
  resumeHref: "/resume",
  keywords: [
    "Naitik Jasani",
    "Backend Engineer",
    "Backend Software Engineer",
    "Distributed Systems",
    "Microservices",
    "Event-Driven Architecture",
    "Java",
    "Spring Boot",
    "Spring WebFlux",
    "Node.js",
    "TypeScript",
    "Kafka",
    "Redis",
    "System Design",
    "OZi",
  ],
} as const;

export type SiteConfig = typeof site;
