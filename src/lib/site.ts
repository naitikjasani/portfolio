/**
 * Single source of truth for identity, links and SEO metadata.
 * Update social handles here — every component and metadata file reads from this.
 */
export const site = {
  name: "Naitik Jasani",
  role: "Software Engineer",
  company: "OZi",
  tagline: "Building scalable backend systems.",
  description:
    "Naitik Jasani is a software engineer at OZi who builds end to end — Node.js and Java services, React and Next.js front ends, and the AWS, Docker and CI/CD that ship them. Open to full-stack, backend, frontend and DevOps roles.",
  // Deployed domain — drives canonical URLs, sitemap, and OG/Twitter tags.
  url: "https://naitik-jasani.vercel.app",
  locale: "en_US",
  email: "naitik.jasani.work@gmail.com",
  // Résumé-only (kept off the public site to avoid spam); shown on /resume.
  phone: "+91 88520 02717",
  phoneHref: "tel:+918852002717",
  location: "India",
  relocation: "Open to relocation",
  // Hiring signal shown in the hero, contact section and mobile CTA.
  availability: "Open to software engineering roles",
  // Role families to show alongside availability.
  roles: ["Full-stack", "Backend", "Frontend", "DevOps"],
  // Handles — the single source of truth. Display strings are derived from these.
  handles: {
    github: "naitikjasani",
    linkedin: "naitikjasani",
    leetcode: "flicktoss",
    codeforces: "flicktoss",
    codolio: "flicktoss",
    twitter: "flicktoss",
  },
  socials: {
    github: "https://github.com/naitikjasani",
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
  resumePdf: "/Naitik_Jasani_Resume.pdf",
  keywords: [
    "Naitik Jasani",
    "Software Engineer",
    "Full Stack Developer",
    "Backend Engineer",
    "Frontend Developer",
    "DevOps",
    "React",
    "Next.js",
    "Distributed Systems",
    "Microservices",
    "Event-Driven Architecture",
    "SDE",
    "Node.js",
    "TypeScript",
    "Java",
    "Spring Boot",
    "AWS SQS",
    "Kafka",
    "MySQL",
    "PostgreSQL",
    "Redis",
    "Observability",
    "Idempotency",
    "System Design",
    "OZi",
  ],
} as const;

export type SiteConfig = typeof site;
