/**
 * Content model for the portfolio.
 * All copy lives here so sections stay presentational and easy to reason about.
 */

export type NavItem = {
  id: string;
  label: string;
  index: string;
};

export const navItems: NavItem[] = [
  { id: "about", label: "About", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "stack", label: "Stack", index: "04" },
  { id: "philosophy", label: "Philosophy", index: "05" },
  { id: "timeline", label: "Timeline", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
];

/* ------------------------------------------------------------------ */
/* Hero telemetry — reads like a status strip, not a gimmick           */
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
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  lead: "I build backend systems that hold up under real traffic.",
  summary:
    "Backend-focused Software Engineer building production order, returns and observability services in Node.js/TypeScript, with prior Java Spring Boot microservices experience in healthcare.",
  body: [
    "My work sits behind the API line — the services, queues and data stores that keep an order moving from checkout to doorstep and back again as a return. I care about how systems actually behave in production: where latency hides, how failures propagate, and how to make a retry safe instead of a second charge.",
    "I lean toward event-driven designs, idempotent workflows and clean service boundaries, and I reach for the simplest design that survives the next order of magnitude. Then I instrument it — error grouping, latency percentiles and SLOs — so the next incident is a dashboard away, not a guessing game.",
  ],
  principles: [
    { k: "Bias", v: "Simplicity over cleverness" },
    { k: "Default", v: "Measure before optimizing" },
    { k: "Comfort zone", v: "Distributed systems" },
    { k: "Non-negotiable", v: "Retries that are safe to retry" },
  ],
};

/* ------------------------------------------------------------------ */
/* Experience — modelled as deployed services                          */
/* ------------------------------------------------------------------ */

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
  achievements: { metric: string; label: string; detail: string }[];
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
      "Building the order service behind a quick-commerce platform — order placement, live tracking, returns and admin operations — plus the queues and observability that keep it consistent under time-sensitive load.",
    stack: ["Node.js", "TypeScript", "Express", "AWS SQS FIFO", "MySQL", "Redis", "Jest"],
    achievements: [
      {
        metric: "Order APIs",
        label: "Production order service",
        detail:
          "Built multiple production REST APIs for a Node.js/TypeScript order service powering order placement, live tracking, returns and admin operations.",
      },
      {
        metric: "SQS FIFO",
        label: "Ordered async workflows",
        detail:
          "Built AWS SQS FIFO workflows for inventory, logistics, wallet settlement and notifications, plus claim-based redrive that prevented duplicate wallet deductions.",
      },
      {
        metric: "26 sources",
        label: "Observability platform",
        detail:
          "Built an observability platform with error grouping, latency percentiles, SLOs, error budgets, Slack alerts and a unified order timeline across 26 data sources.",
      },
      {
        metric: "180+ tests",
        label: "Return pickup capacity",
        detail:
          "Designed return and exchange pickup capacity management end to end — MySQL schema, IST-aware engine, CX overrides and admin UI — verified with 180+ tests.",
      },
      {
        metric: "Rescheduling",
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
      "Engineered Spring Boot microservices for the Universal Provider Portal — hospital-payer integrations across 50+ partner hospitals at 100K+ daily transactions.",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "ELK", "ArgoCD"],
    certificate:
      "https://drive.google.com/file/d/1mw6YdjtR87CbEjollTi1pjNv_WN14vHa/view?usp=sharing",
    achievements: [
      {
        metric: "100K+/day",
        label: "Provider portal at 99.9% uptime",
        detail:
          "Spring Boot microservices for the Universal Provider Portal (UPP), supporting hospital-payer integrations across 50+ partner hospitals and 100K+ daily transactions at 99.9% uptime.",
      },
      {
        metric: "3–4× tput",
        label: "Throughput under load",
        detail:
          "Improved backend throughput to 300+ requests/second under concurrent load — a 3–4× improvement over the legacy implementation.",
      },
      {
        metric: "MTTR −40%",
        label: "ELK observability",
        detail:
          "Centralized structured logs and real-time Kibana dashboards on the ELK Stack, cutting mean time to resolution for production incidents by 40%.",
      },
      {
        metric: "API −30–35%",
        label: "Latency tuning",
        detail:
          "Paired PostgreSQL with a Redis caching layer for hot data to cut critical API response times by 30–35%.",
      },
      {
        metric: "Zero-downtime",
        label: "ArgoCD delivery",
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
  /** Omitted for private repositories. */
  repo?: string;
  demo?: string;
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
      "A personal health and life-record app, built solo as a 7-package TypeScript monorepo on PostgreSQL and Supabase — 115 pages and 103 tables behind strict CI checks. Designed so history is never overwritten and a logged dose or workout is never counted twice.",
    highlights: [
      "Append-only data model — edits add corrections instead of overwriting, so any past state stays queryable",
      "Offline sync built from scratch: a device-side queue, logical clocks to order cross-device edits",
      "Idempotency keys so retries never log the same dose or workout twice",
      "Closed by default — row-level security forced with zero policies, so the public API key reaches nothing, verified by a dedicated test suite",
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Supabase", "Drizzle", "Turborepo", "Vitest"],
    demo: "https://ekayu.vercel.app/",
    visual: "sync",
  },
  {
    slug: "proximity-ad-delivery",
    name: "Proximity Ad Delivery",
    category: "IoT · Backend",
    year: "Oct 2024 – Feb 2025",
    tagline: "Serving the right ad to the right device, by proximity.",
    description:
      "An IoT advertising system pairing Raspberry Pi BLE nodes with an Express.js backend: it detects nearby devices, ranks them by signal strength, and serves personalized, AI-generated ads within a 5–10 m range.",
    highlights: [
      "Detects 20+ nearby BLE devices per node in under 100 ms",
      "Serves proximity-targeted ads within 5–10 m for 35–40% higher engagement",
      "Gemini API generates personalized ad content per audience",
      "MongoDB persists proximity events and interaction analytics",
    ],
    stack: ["Node.js", "Express", "Python", "Raspberry Pi", "BLE", "Gemini API", "MongoDB"],
    repo: "https://github.com/flicktoss/CTIOT-Smart-Advertising",
    visual: "ble",
  },
];

/* ------------------------------------------------------------------ */
/* Tech stack — grouped, hover reveals context                         */
/* ------------------------------------------------------------------ */

export type TechItem = {
  name: string;
  note: string;
};

export type TechGroup = {
  id: string;
  label: string;
  caption: string;
  items: TechItem[];
};

export const techGroups: TechGroup[] = [
  {
    id: "languages",
    label: "Languages",
    caption: "Where the logic lives",
    items: [
      { name: "Java", note: "Spring Boot microservices at Bajaj Finserv Health" },
      { name: "TypeScript", note: "Order service at OZi, Ekayu monorepo" },
      { name: "JavaScript", note: "Node.js runtime & scripting" },
      { name: "Python", note: "IoT nodes, scripting & automation" },
      { name: "SQL", note: "Query design and schema modelling" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Frameworks",
    caption: "Services & runtimes",
    items: [
      { name: "Node.js", note: "Production order service at OZi" },
      { name: "Express.js", note: "Lean REST service layer" },
      { name: "NestJS", note: "Structured, modular Node services" },
      { name: "Spring Boot", note: "Healthcare microservices" },
      { name: "REST APIs", note: "Versioned, typed contracts" },
      { name: "gRPC", note: "Typed service-to-service calls" },
      { name: "Microservices", note: "Clear service boundaries" },
      { name: "React", note: "Admin UIs and front ends" },
    ],
  },
  {
    id: "data",
    label: "Databases",
    caption: "State & storage",
    items: [
      { name: "MySQL", note: "Transactional order data at OZi" },
      { name: "PostgreSQL", note: "Provider portal & Ekayu's 103 tables" },
      { name: "MongoDB", note: "Document store for IoT events" },
      { name: "Redis", note: "Caching hot reads, locks" },
      { name: "Supabase", note: "Postgres with forced row-level security" },
    ],
  },
  {
    id: "messaging",
    label: "Messaging & Architecture",
    caption: "How services talk",
    items: [
      { name: "AWS SQS (FIFO)", note: "Ordered workflows with claim-based redrive" },
      { name: "Apache Kafka", note: "Event streaming backbone" },
      { name: "Event-Driven", note: "Decoupled producers & consumers" },
      { name: "Distributed Systems", note: "Consistency, ordering, failure modes" },
      { name: "Idempotency", note: "Retries that never double-charge" },
    ],
  },
  {
    id: "infra",
    label: "Cloud & DevOps",
    caption: "Ship & operate",
    items: [
      { name: "AWS", note: "EC2, S3 and SQS" },
      { name: "Docker", note: "Reproducible service images" },
      { name: "GitHub Actions", note: "CI checks on every push" },
      { name: "ArgoCD", note: "GitOps, zero-downtime releases" },
      { name: "Sentry", note: "Error tracking & alerting" },
      { name: "ELK", note: "Centralized logs & Kibana dashboards" },
    ],
  },
  {
    id: "quality",
    label: "Testing & Core CS",
    caption: "Proving it works",
    items: [
      { name: "Jest", note: "Unit & integration suites — 180+ tests on one feature" },
      { name: "Puppeteer", note: "End-to-end browser testing" },
      { name: "System Design", note: "Capacity & failure modelling" },
      { name: "OOP", note: "Clean, testable domain models" },
      { name: "DSA", note: "1000+ problems on LeetCode & Codeforces" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Engineering philosophy                                              */
/* ------------------------------------------------------------------ */

export type Principle = {
  index: string;
  title: string;
  body: string;
};

export const philosophy: Principle[] = [
  {
    index: "01",
    title: "Build simple",
    body: "The best system is the one a teammate can reason about at 3 a.m. I reach for the plainest design that solves the problem, and add complexity only when the load demands it.",
  },
  {
    index: "02",
    title: "Measure first",
    body: "Intuition is a hypothesis, not a plan. I profile the hot path and read the metrics before touching a line — optimization without measurement is just guessing with extra steps.",
  },
  {
    index: "03",
    title: "Design for failure",
    body: "Networks partition, queues redeliver, dependencies time out. I assume it and design around it — timeouts, retries with backoff, idempotency, and clear failure modes.",
  },
  {
    index: "04",
    title: "Automate the boring",
    body: "If a task is manual and repeated, it's a future outage. CI/CD, GitOps and scripts turn release-day rituals into something that just happens.",
  },
  {
    index: "05",
    title: "Scale on evidence",
    body: "Premature scaling is its own kind of debt. I build to the next order of magnitude, watch the signals, and grow the architecture when the numbers ask for it.",
  },
];

/* ------------------------------------------------------------------ */
/* Achievements                                                        */
/* ------------------------------------------------------------------ */

export type Achievement = {
  value: string;
  label: string;
  detail: string;
};

export const achievements: Achievement[] = [
  {
    value: "180+",
    label: "Tests on one feature",
    detail: "Return pickup capacity, verified end to end at OZi.",
  },
  {
    value: "40%",
    label: "Faster incident resolution",
    detail: "ELK + Kibana observability cut mean time to resolution.",
  },
  {
    value: "30–35%",
    label: "Lower API latency",
    detail: "Redis caching over PostgreSQL for hot data.",
  },
  {
    value: "50+",
    label: "Partner hospitals",
    detail: "Hospital-payer integrations on the provider portal.",
  },
];

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  description: string;
  kind: "work" | "education";
};

export const timeline: TimelineEntry[] = [
  {
    period: "May 2026 – Present",
    title: "Backend Developer",
    org: "OZi",
    description:
      "Order, returns and observability services for quick commerce with Node.js, TypeScript, AWS SQS FIFO and MySQL.",
    kind: "work",
  },
  {
    period: "Jul – Oct 2025",
    title: "Software Engineer Intern – Backend",
    org: "Bajaj Finserv Health",
    description:
      "Spring Boot microservices for a provider portal at 100K+ daily transactions, with ELK observability and ArgoCD delivery.",
    kind: "work",
  },
  {
    period: "Oct 2022 – May 2026",
    title: "B.Tech, Computer Science & Engineering",
    org: "The LNM Institute of Information Technology, Jaipur",
    description:
      "Computer science foundations — systems, networks, databases and algorithms. CGPA 7.64 / 10.",
    kind: "education",
  },
];

/* ------------------------------------------------------------------ */
/* Leadership & activities                                             */
/* ------------------------------------------------------------------ */

export const leadership: { role: string; org: string }[] = [
  { role: "Coordinator", org: "Table Tennis Club" },
  { role: "Executive Member", org: "Training & Placement Cell" },
  { role: "Member", org: "Entrepreneurship Club" },
];
