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
  // Update this to your deployed domain.
  url: "https://naitikjasani.com",
  locale: "en_US",
  email: "naitik.jasani.cn@ozi.in",
  location: "India",
  // Update these handles to your own profiles.
  socials: {
    github: "https://github.com/naitikjasani",
    linkedin: "https://www.linkedin.com/in/naitikjasani",
    email: "mailto:naitik.jasani.cn@ozi.in",
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
