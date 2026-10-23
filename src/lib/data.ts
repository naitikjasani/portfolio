/**
 * Content model for the portfolio.
 * All copy lives here so sections stay presentational and easy to reason about.
 */

export type NavItem = {
  id: string;
  label: string;
};

export const navItems: NavItem[] = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------------------------------------------ */
/* Hero snapshot — where I am, where I've been, what I'm building       */
/* ------------------------------------------------------------------ */

export type SnapshotItem = {
  tag: "Now" | "Before" | "Building" | "Education";
  title: string;
  role: string;
  /** One concrete outcome — the line a recruiter remembers. */
  highlight: string;
  href: string;
};

export const snapshot: SnapshotItem[] = [
  {
    tag: "Now",
    title: "OZi",
    role: "Backend Developer",
    highlight: "Order, returns and wallet services for quick commerce",
    href: "#experience",
  },
  {
    tag: "Before",
    title: "Bajaj Finserv Health",
    role: "SWE Intern, Backend",
    highlight: "3–4× throughput at 100K+ transactions a day",
    href: "#experience",
  },
  {
    tag: "Building",
    title: "Ekayu",
    role: "Full-stack, solo",
    highlight: "Offline-first Next.js app on a 103-table Postgres",
    href: "#projects",
  },
  {
    tag: "Education",
    title: "LNMIIT",
    role: "B.Tech CSE, 2026",
    highlight: "1000+ problems solved on LeetCode & Codeforces",
    href: "#education",
  },
];

/* ------------------------------------------------------------------ */
/* Summary (résumé page)                                               */
/* ------------------------------------------------------------------ */

export const about = {
  summary:
    "Backend-focused Software Engineer building production order, returns and observability services in Node.js/TypeScript, with prior Java Spring Boot microservices experience in healthcare.",
};

/* ------------------------------------------------------------------ */
/* Experience — modelled as deployed services                          */
/* ------------------------------------------------------------------ */

export type Achievement = {
  label: string;
  detail: string;
  /** Primary bullets show by default; the rest sit behind "Show more". */
  primary?: boolean;
};

export type Experience = {
  slug: string;
  company: string;
  role: string;
  period: string;
  region: string;
  summary: string;
  stack: string[];
  certificate?: string;
  achievements: Achievement[];
};

export const experiences: Experience[] = [
  {
    slug: "svc-ozi",
    company: "OZi",
    role: "Backend Developer",
    period: "May 2026 – Present",
    region: "Quick Commerce",
    summary:
      "The order service behind a quick-commerce platform — placement, live tracking, returns and admin operations.",
    stack: ["Node.js", "TypeScript", "Express.js", "AWS SQS (FIFO)", "MySQL", "Redis", "Jest"],
    achievements: [
      {
        label: "Duplicate-safe money movement",
        detail:
          "Built AWS SQS FIFO workflows for inventory, logistics, wallet settlement and notifications, plus claim-based redrive that prevented duplicate wallet deductions.",
        primary: true,
      },
      {
        label: "Observability platform",
        detail:
          "Built error grouping, latency percentiles, SLOs, error budgets, Slack alerts and a unified order timeline across 26 data sources.",
        primary: true,
      },
      {
        label: "Return pickup capacity",
        detail:
          "Designed return and exchange pickup capacity end to end — MySQL schema, IST-aware engine, CX overrides and admin UI — verified with 180+ tests.",
        primary: true,
      },
      {
        label: "Production order APIs",
        detail:
          "Built multiple production REST APIs for the Node.js/TypeScript order service: order placement, live tracking, returns and admin operations.",
      },
      {
        label: "Failed-return recovery",
        detail:
          "Shipped failed-return rescheduling with eligibility checks, WhatsApp notifications, deep-link CTAs and quiet-hours-aware reminders.",
      },
    ],
  },
  {
    slug: "svc-bajaj-finserv-health",
    company: "Bajaj Finserv Health",
    role: "Software Engineer Intern – Backend",
    period: "Jul – Oct 2025",
    region: "Healthcare",
    summary:
      "Spring Boot microservices for the Universal Provider Portal — hospital-payer integrations across 50+ partner hospitals.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "ELK", "ArgoCD"],
    certificate:
      "https://drive.google.com/file/d/1mw6YdjtR87CbEjollTi1pjNv_WN14vHa/view?usp=sharing",
    achievements: [
      {
        label: "Throughput under load",
        detail:
          "Raised backend throughput to 300+ requests/second under concurrent load — a 3–4× improvement over the legacy implementation.",
        primary: true,
      },
      {
        label: "Provider portal at 99.9% uptime",
        detail:
          "Spring Boot microservices for the Universal Provider Portal (UPP), serving 50+ partner hospitals and 100K+ daily transactions at 99.9% uptime.",
        primary: true,
      },
      {
        label: "ELK observability",
        detail:
          "Centralized structured logs and real-time Kibana dashboards on the ELK Stack, cutting mean time to resolution for production incidents by 40%.",
        primary: true,
      },
      {
        label: "API latency",
        detail:
          "Paired PostgreSQL with a Redis caching layer for hot data to cut critical API response times by 30–35%.",
      },
      {
        label: "Manual deployment effort",
        detail:
          "Automated ArgoCD-driven CI/CD deployments, halving manual deployment effort and enabling zero-downtime releases.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectKind = "Full-stack" | "Backend" | "Frontend";

export type Project = {
  slug: string;
  name: string;
  /** Drives the project filter. */
  kind: ProjectKind;
  category: string;
  year: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  /** Headline numbers shown as chips on the case study. */
  stats?: { value: string; label: string }[];
  /** Omitted for private repositories. */
  repo?: string;
  demo?: string;
  /** Shown beside the demo link when it needs context (e.g. sign-in wall). */
  demoNote?: string;
};

export const projects: Project[] = [
  {
    slug: "ekayu",
    name: "Ekayu",
    kind: "Full-stack",
    category: "Full-stack · Data",
    year: "Aug 2026 – Present",
    tagline: "A private health & life record that works offline and never loses a write.",
    description:
      "A personal health and life-record app, built solo as a 7-package TypeScript monorepo on PostgreSQL and Supabase — 115 pages and 103 tables behind strict CI checks.",
    highlights: [
      "Append-only data model — edits add corrections instead of overwriting, so any past state stays queryable",
      "Offline sync built from scratch: a device-side queue and logical clocks to order cross-device edits",
      "Idempotency keys so retries never log the same dose or workout twice",
      "Closed by default — row-level security forced with zero policies, so the public API key reaches nothing, verified by a dedicated test suite",
    ],
    stats: [
      { value: "7", label: "packages" },
      { value: "115", label: "pages" },
      { value: "103", label: "tables" },
      { value: "0", label: "RLS policies" },
    ],
    stack: ["TypeScript", "Next.js", "React", "PostgreSQL", "Supabase", "Drizzle", "Turborepo", "Vitest"],
    demo: "https://ekayu.vercel.app/",
    demoNote: "sign-in required",
  },
  {
    slug: "live-polling",
    name: "Live Polling System",
    kind: "Full-stack",
    category: "Full-stack · Real-time",
    year: "Feb 2026",
    tagline: "Teachers ask, students answer, results update live.",
    description:
      "A real-time classroom polling app: teachers create timed polls, students vote from their own devices, and results, chat and the participant list update instantly over WebSockets.",
    highlights: [
      "Atomic vote writes in MongoDB, so a student can never vote twice on the same poll",
      "Sessions survive a page refresh; teachers can see and remove participants live",
    ],
    stack: ["React", "TypeScript", "Socket.io", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    repo: "https://github.com/naitikjasani/Live-Polling-System-Intervue",
  },
  {
    slug: "order-management-system",
    name: "Order Management System",
    kind: "Full-stack",
    category: "Full-stack · E-commerce",
    year: "Nov 2025 – Feb 2026",
    tagline: "Catalogue, cart and order lifecycle, with an admin side.",
    description:
      "An e-commerce order platform with a Spring Boot API and a React storefront: product catalogue, cart, checkout with stock checks, order tracking and admin order management.",
    highlights: [
      "JWT auth with role-based access for customers and admins",
      "Redis caching over PostgreSQL, the whole stack started with Docker Compose",
    ],
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "Redis", "JWT", "Docker"],
    repo: "https://github.com/naitikjasani/order-management-system",
  },
  {
    slug: "github-access-report",
    name: "GitHub Access Report",
    kind: "Backend",
    category: "Backend · API",
    year: "Mar 2026",
    tagline: "Who can access which repository, across a whole GitHub org.",
    description:
      "A Spring Boot service that walks the GitHub API and returns, for an organization, every user and the repositories they can reach.",
    highlights: [
      "Reactive WebClient fetches collaborators for all repositories in parallel, across paginated results",
      "Per-organization caching, explicit rate-limit errors and OpenAPI docs, with unit tests for each layer",
    ],
    stack: ["Java", "Spring Boot", "Spring WebFlux", "REST APIs", "OpenAPI"],
    repo: "https://github.com/naitikjasani/github-access-report-service",
  },
  {
    slug: "mailgenie",
    name: "MailGenie",
    kind: "Full-stack",
    category: "Full-stack · AI",
    year: "Jun 2025",
    tagline: "One-click AI replies, right inside Gmail.",
    description:
      "A Chrome extension that adds an AI Reply button to Gmail's compose window, backed by a Spring Boot API that drafts context-aware replies with Gemini in the tone you pick.",
    highlights: [
      "Manifest V3 extension that reads the open email and injects the drafted reply",
      "Professional, friendly or casual tone, remembered with the Chrome Storage API",
    ],
    stack: ["JavaScript", "Chrome Extension", "Java", "Spring Boot", "Gemini API", "React"],
    repo: "https://github.com/naitikjasani/email-reply-generator",
  },
  {
    slug: "portfolio",
    name: "This portfolio",
    kind: "Frontend",
    category: "Frontend",
    year: "2026",
    tagline: "The site you're reading — designed and built from scratch.",
    description:
      "A statically rendered Next.js site with two hand-built interactive pieces: Stack Match, which scans a pasted job description client-side, and the Ekayu write-path simulator above.",
    highlights: [
      "Fully static — about 170 kB of first-load JavaScript, MDX blog compiled at build time",
      "Keyboard-accessible controls and a reduced-motion mode throughout",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "MDX", "Vercel"],
    repo: "https://github.com/naitikjasani/portfolio",
  },
  {
    slug: "proximity-ad-delivery",
    name: "Proximity Ad Delivery",
    kind: "Backend",
    category: "IoT · Backend",
    year: "Oct 2024 – Feb 2025",
    tagline: "Serving the right ad to the right device, by proximity.",
    description:
      "Raspberry Pi BLE nodes and an Express.js backend that detect nearby devices and serve personalized, AI-generated ads within a 5–10 m range.",
    highlights: [
      "Detects 20+ nearby BLE devices per node in under 100 ms",
      "Proximity-targeted, Gemini-generated ads drove 35–40% higher engagement",
    ],
    stack: ["Node.js", "Express.js", "Python", "Raspberry Pi", "BLE", "Gemini API", "MongoDB"],
    repo: "https://github.com/naitikjasani/CTIOT-Smart-Advertising",
  },
];

/* ------------------------------------------------------------------ */
/* Skills — also the catalogue Stack Match resolves against            */
/* ------------------------------------------------------------------ */

export type TechItem = {
  name: string;
  note: string;
  /** Lower-case spellings a recruiter might type or a JD might contain. */
  aliases?: string[];
};

export type TechGroup = {
  id: string;
  label: string;
  items: TechItem[];
};

export const techGroups: TechGroup[] = [
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "Java", note: "Spring Boot microservices at Bajaj Finserv Health" },
      { name: "TypeScript", note: "OZi order service and the Ekayu monorepo", aliases: ["ts"] },
      { name: "JavaScript", note: "Node.js runtime & scripting", aliases: ["js", "es6"] },
      { name: "Python", note: "IoT nodes, scripting & automation" },
      { name: "SQL", note: "Schema design and query tuning" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", note: "Ekayu, admin UIs and this site", aliases: ["reactjs", "react.js"] },
      { name: "Next.js", note: "App Router — Ekayu's 115 pages and this site", aliases: ["nextjs", "next"] },
      { name: "Tailwind CSS", note: "Design systems and responsive layouts", aliases: ["tailwind", "tailwindcss"] },
      { name: "HTML & CSS", note: "Semantic, accessible markup", aliases: ["html", "css", "html5", "css3"] },
      { name: "Framer Motion", note: "Interaction and motion on this site", aliases: ["framer", "animations"] },
      {
        name: "Chrome Extensions",
        note: "MailGenie, a Manifest V3 Gmail extension",
        aliases: ["chrome extension", "browser extension", "browser extensions"],
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & Frameworks",
    items: [
      { name: "Node.js", note: "Production order service at OZi", aliases: ["node", "nodejs"] },
      { name: "Express.js", note: "Lean REST service layer", aliases: ["express", "expressjs"] },
      { name: "NestJS", note: "Structured, modular Node services", aliases: ["nest"] },
      {
        name: "Spring Boot",
        note: "Healthcare microservices, Order Management, GitHub Access Report",
        aliases: ["spring", "springboot", "spring webflux", "webflux"],
      },
      {
        name: "REST APIs",
        note: "Versioned, typed contracts",
        aliases: ["rest", "restful", "api design", "openapi", "swagger"],
      },
      {
        name: "WebSockets",
        note: "Live results and chat in Live Polling",
        aliases: ["socket.io", "socketio", "websocket", "real-time", "realtime"],
      },
      {
        name: "JWT & RBAC",
        note: "Role-based auth in Order Management",
        aliases: ["jwt", "rbac", "spring security", "authentication"],
      },
      { name: "gRPC", note: "Typed service-to-service calls", aliases: ["grpc", "protobuf"] },
      { name: "Microservices", note: "Clear service boundaries", aliases: ["microservice"] },
    ],
  },
  {
    id: "data",
    label: "Databases",
    items: [
      { name: "MySQL", note: "Transactional order data at OZi" },
      { name: "PostgreSQL", note: "Provider portal and Ekayu's 103 tables", aliases: ["postgres", "psql"] },
      { name: "MongoDB", note: "Live Polling and IoT event storage", aliases: ["mongo"] },
      { name: "Redis", note: "Hot-read caching, −30–35% latency", aliases: ["caching"] },
      { name: "Supabase", note: "Postgres with forced row-level security" },
    ],
  },
  {
    id: "messaging",
    label: "Messaging & Architecture",
    items: [
      {
        name: "AWS SQS (FIFO)",
        note: "Ordered workflows with claim-based redrive",
        aliases: ["sqs", "aws sqs", "sqs fifo", "aws sqs fifo", "message queue", "queues"],
      },
      { name: "Apache Kafka", note: "Event streaming", aliases: ["kafka"] },
      {
        name: "Event-Driven",
        note: "Decoupled producers & consumers",
        aliases: ["event driven", "event-driven architecture", "eda"],
      },
      { name: "Distributed Systems", note: "Consistency, ordering, failure modes", aliases: ["distributed"] },
      { name: "Idempotency", note: "Retries that never double-charge", aliases: ["idempotent"] },
    ],
  },
  {
    id: "infra",
    label: "Cloud & DevOps",
    items: [
      { name: "AWS", note: "EC2, S3 and SQS", aliases: ["amazon web services", "ec2", "s3"] },
      { name: "Docker", note: "Reproducible service images", aliases: ["containers"] },
      { name: "GitHub Actions", note: "CI checks on every push", aliases: ["ci", "ci/cd", "cicd"] },
      { name: "ArgoCD", note: "GitOps, zero-downtime releases", aliases: ["argo", "gitops", "argo cd"] },
      { name: "Vercel", note: "Ships Ekayu and this site" },
      { name: "Sentry", note: "Error tracking & alerting" },
      { name: "ELK", note: "Centralized logs & Kibana dashboards", aliases: ["elasticsearch", "kibana", "logstash", "elk stack"] },
    ],
  },
  {
    id: "quality",
    label: "Testing & Core CS",
    items: [
      { name: "Jest", note: "Unit & integration suites — 180+ tests on one feature", aliases: ["unit testing", "testing"] },
      { name: "Puppeteer", note: "End-to-end browser testing", aliases: ["e2e", "end-to-end testing"] },
      { name: "System Design", note: "Capacity & failure modelling", aliases: ["hld", "lld"] },
      { name: "OOP", note: "Clean, testable domain models", aliases: ["object oriented", "object-oriented"] },
      { name: "DSA", note: "1000+ problems on LeetCode & Codeforces", aliases: ["data structures", "algorithms"] },
    ],
  },
];

/**
 * Terms a job description may contain that aren't in the catalogue —
 * scanned so pasted JDs report gaps honestly instead of silently ignoring them.
 */
export const knownGapTerms = [
  "Go",
  "Golang",
  "Angular",
  "Vue",
  "Svelte",
  "Redux",
  "React Native",
  "Flutter",
  "Jenkins",
  "Ansible",
  "Kubernetes",
  "Terraform",
  "GraphQL",
  "Rust",
  "C++",
  "C#",
  ".NET",
  "Django",
  "Flask",
  "FastAPI",
  "GCP",
  "Azure",
  "Cassandra",
  "DynamoDB",
  "RabbitMQ",
  "Elixir",
  "Scala",
  "Kotlin",
];

/* ------------------------------------------------------------------ */
/* Education & leadership                                              */
/* ------------------------------------------------------------------ */

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "The LNM Institute of Information Technology, Jaipur",
  period: "Oct 2022 – May 2026",
  grade: "CGPA 7.64 / 10",
};

export const leadership: { role: string; org: string }[] = [
  { role: "Coordinator", org: "Table Tennis Club" },
  { role: "Executive Member", org: "Training & Placement Cell" },
  { role: "Member", org: "Entrepreneurship Club" },
];
