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
/* Hero proof strip                                                    */
/* ------------------------------------------------------------------ */

export type Telemetry = {
  label: string;
  value: string;
  hint: string;
};

export const telemetry: Telemetry[] = [
  { label: "Order timeline", value: "26 sources", hint: "Unified observability at OZi" },
  { label: "Daily transactions", value: "100K+", hint: "Healthcare portal, 99.9% uptime" },
  { label: "Throughput gain", value: "3–4×", hint: "300+ req/s over legacy" },
  { label: "DSA problems", value: "1000+", hint: "LeetCode & Codeforces" },
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
  /** Only real numbers — omitted when the bullet has no figure to lead with. */
  metric?: string;
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
  status: "RUNNING" | "STABLE";
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
    status: "RUNNING",
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
        metric: "26 sources",
        label: "Observability platform",
        detail:
          "Built error grouping, latency percentiles, SLOs, error budgets, Slack alerts and a unified order timeline across 26 data sources.",
        primary: true,
      },
      {
        metric: "180+ tests",
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
    status: "STABLE",
    region: "Healthcare",
    summary:
      "Spring Boot microservices for the Universal Provider Portal — hospital-payer integrations across 50+ partner hospitals.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "ELK", "ArgoCD"],
    certificate:
      "https://drive.google.com/file/d/1mw6YdjtR87CbEjollTi1pjNv_WN14vHa/view?usp=sharing",
    achievements: [
      {
        metric: "3–4×",
        label: "Throughput under load",
        detail:
          "Raised backend throughput to 300+ requests/second under concurrent load — a 3–4× improvement over the legacy implementation.",
        primary: true,
      },
      {
        metric: "100K+/day",
        label: "Provider portal at 99.9% uptime",
        detail:
          "Spring Boot microservices for the Universal Provider Portal (UPP), serving 50+ partner hospitals and 100K+ daily transactions at 99.9% uptime.",
        primary: true,
      },
      {
        metric: "−40% MTTR",
        label: "ELK observability",
        detail:
          "Centralized structured logs and real-time Kibana dashboards on the ELK Stack, cutting mean time to resolution for production incidents by 40%.",
        primary: true,
      },
      {
        metric: "−30–35%",
        label: "API latency",
        detail:
          "Paired PostgreSQL with a Redis caching layer for hot data to cut critical API response times by 30–35%.",
      },
      {
        metric: "−50%",
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

export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  /** Headline numbers shown as chips on the case study. */
  stats?: { value: string; label: string }[];
  /** Images under /public; the strip renders only when present. */
  screenshots?: { src: string; alt: string; width: number; height: number }[];
  /** Omitted for private repositories. */
  repo?: string;
  demo?: string;
  /** Shown beside the demo link when it needs context (e.g. sign-in wall). */
  demoNote?: string;
  visual: "ble" | "sync";
};

export const projects: Project[] = [
  {
    slug: "ekayu",
    name: "Ekayu",
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
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Supabase", "Drizzle", "Turborepo", "Vitest"],
    demo: "https://ekayu.vercel.app/",
    demoNote: "sign-in required",
    visual: "sync",
  },
  {
    slug: "proximity-ad-delivery",
    name: "Proximity Ad Delivery",
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
    visual: "ble",
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
    id: "backend",
    label: "Backend & Frameworks",
    items: [
      { name: "Node.js", note: "Production order service at OZi", aliases: ["node", "nodejs"] },
      { name: "Express.js", note: "Lean REST service layer", aliases: ["express", "expressjs"] },
      { name: "NestJS", note: "Structured, modular Node services", aliases: ["nest"] },
      { name: "Spring Boot", note: "Healthcare microservices", aliases: ["spring", "springboot"] },
      { name: "REST APIs", note: "Versioned, typed contracts", aliases: ["rest", "restful", "api design"] },
      { name: "gRPC", note: "Typed service-to-service calls", aliases: ["grpc", "protobuf"] },
      { name: "Microservices", note: "Clear service boundaries", aliases: ["microservice"] },
      { name: "React", note: "Admin UIs; Next.js for Ekayu", aliases: ["reactjs", "react.js", "next.js", "nextjs"] },
    ],
  },
  {
    id: "data",
    label: "Databases",
    items: [
      { name: "MySQL", note: "Transactional order data at OZi" },
      { name: "PostgreSQL", note: "Provider portal and Ekayu's 103 tables", aliases: ["postgres", "psql"] },
      { name: "MongoDB", note: "Document store for IoT events", aliases: ["mongo"] },
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

/** Quick-pick chips for Stack Match — common terms from backend job descriptions. */
export const stackMatchPresets = [
  "Java",
  "Spring Boot",
  "Node.js",
  "TypeScript",
  "Python",
  "Microservices",
  "AWS",
  "Kafka",
  "SQS",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Docker",
  "System Design",
  "React",
];

/**
 * Terms a job description may contain that aren't in the catalogue —
 * scanned so pasted JDs report gaps honestly instead of silently ignoring them.
 */
export const knownGapTerms = [
  "Go",
  "Golang",
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
