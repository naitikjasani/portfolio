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
  { label: "Services in production", value: "Live", hint: "Quick-commerce & healthcare" },
  { label: "Primary runtime", value: "JVM · Node", hint: "Spring Boot / TypeScript" },
  { label: "Event backbone", value: "Kafka", hint: "Async, decoupled" },
  { label: "DSA problems solved", value: "1000+", hint: "Sustained practice" },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  lead: "I build backend systems that hold up under real traffic.",
  body: [
    "My work sits behind the API line — the services, queues and data stores that keep moving when the load spikes. I care about how systems actually behave in production: where latency hides, how failures propagate, and where a queue is a better answer than another synchronous call.",
    "I lean toward event-driven architectures and clean service boundaries, and I reach for the simplest design that survives the next order of magnitude. I like understanding how things work underneath — the runtime, the broker, the database — because that's usually where the interesting decisions are.",
  ],
  principles: [
    { k: "Bias", v: "Simplicity over cleverness" },
    { k: "Default", v: "Measure before optimizing" },
    { k: "Comfort zone", v: "Distributed systems" },
    { k: "Non-negotiable", v: "Elegant, readable code" },
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
  achievements: { metric: string; label: string; detail: string }[];
};

export const experiences: Experience[] = [
  {
    slug: "svc-ozi",
    company: "OZi",
    role: "Backend Developer",
    period: "Present",
    status: "RUNNING",
    region: "Quick Commerce",
    summary:
      "Building and operating backend services for a quick-commerce platform — order flows, real-time inventory and the event pipelines that keep them consistent.",
    stack: ["Node.js", "TypeScript", "Express", "Kafka", "Redis", "MySQL"],
    achievements: [
      {
        metric: "Event-driven",
        label: "Decoupled core flows with Kafka",
        detail:
          "Moved order and inventory side-effects onto Kafka topics so producers stay fast and consumers scale independently.",
      },
      {
        metric: "Sub-ms reads",
        label: "Redis caching & hot-path tuning",
        detail:
          "Introduced Redis for hot reads and idempotency keys, cutting redundant database round-trips on the critical path.",
      },
      {
        metric: "Typed APIs",
        label: "Reliable service contracts",
        detail:
          "Designed REST APIs in TypeScript with strict typing and validation, reducing whole classes of runtime errors.",
      },
    ],
  },
  {
    slug: "svc-bajaj-finserv-health",
    company: "Bajaj Finserv Health",
    role: "Software Engineer Intern",
    period: "Prior",
    status: "STABLE",
    region: "Healthcare",
    summary:
      "Shipped reactive backend services in a regulated healthcare domain, with an emphasis on non-blocking I/O, observability and automated delivery.",
    stack: ["Spring Boot", "Spring WebFlux", "PostgreSQL", "Redis", "ELK", "ArgoCD"],
    achievements: [
      {
        metric: "Reactive",
        label: "Non-blocking services with WebFlux",
        detail:
          "Built reactive endpoints on Spring WebFlux to handle concurrent load with a small, predictable thread footprint.",
      },
      {
        metric: "Observable",
        label: "End-to-end tracing via ELK",
        detail:
          "Wired structured logging into the ELK stack so issues could be traced across services instead of guessed at.",
      },
      {
        metric: "GitOps",
        label: "Automated delivery with ArgoCD",
        detail:
          "Used ArgoCD for declarative, repeatable deployments — shipping changes without hand-run release steps.",
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
  visual: "ble" | "architecture";
};

export const projects: Project[] = [
  {
    slug: "ble-proximity",
    name: "BLE Proximity Intelligence",
    category: "IoT · Backend",
    year: "2024",
    tagline: "Turning Bluetooth signal noise into structured presence.",
    description:
      "An IoT backend that ingests Bluetooth Low Energy advertisements from nearby devices, ranks them by signal strength, and layers Gemini-powered reasoning on top to make sense of the surrounding environment.",
    highlights: [
      "Streams nearby-device scans and normalizes RSSI into distance bands",
      "Persists device timelines in MongoDB for historical proximity queries",
      "Uses the Gemini API to summarize and classify device context",
      "Express service exposing clean REST endpoints for clients",
    ],
    stack: ["Node.js", "Express", "MongoDB", "Gemini API", "BLE"],
    visual: "ble",
  },
  {
    slug: "study-resource-platform",
    name: "Study Resource Platform",
    category: "Platform · Backend",
    year: "2023",
    tagline: "Access-controlled knowledge, from schema to endpoint.",
    description:
      "A backend platform for organizing and sharing study material, built around a clean authentication and authorization model with role-based access at the API layer.",
    highlights: [
      "Stateless auth with JWT and refresh-token rotation",
      "Role-based access control enforced per route and resource",
      "Normalized relational schema for resources, owners and roles",
      "REST APIs designed for predictable pagination and filtering",
    ],
    stack: ["Node.js", "Express", "JWT", "RBAC", "REST"],
    visual: "architecture",
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
      { name: "Java", note: "Primary JVM language for service work" },
      { name: "TypeScript", note: "Typed backends and tooling" },
      { name: "JavaScript", note: "Node.js runtime & scripting" },
      { name: "SQL", note: "Query design and schema modelling" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    caption: "Frameworks & runtimes",
    items: [
      { name: "Spring Boot", note: "Production JVM services" },
      { name: "Spring WebFlux", note: "Reactive, non-blocking I/O" },
      { name: "Node.js", note: "Event-loop backends at OZi" },
      { name: "Express", note: "Lean REST service layer" },
    ],
  },
  {
    id: "messaging",
    label: "Messaging",
    caption: "How services talk",
    items: [
      { name: "Kafka", note: "Event backbone for async flows" },
      { name: "REST APIs", note: "Versioned, typed contracts" },
      { name: "Event-Driven", note: "Decoupled producers & consumers" },
    ],
  },
  {
    id: "data",
    label: "Data",
    caption: "State & storage",
    items: [
      { name: "PostgreSQL", note: "Relational workloads" },
      { name: "MySQL", note: "Transactional data at OZi" },
      { name: "MongoDB", note: "Document store for IoT timelines" },
      { name: "Redis", note: "Caching, locks & idempotency" },
    ],
  },
  {
    id: "infra",
    label: "Infra & DevOps",
    caption: "Ship & operate",
    items: [
      { name: "Docker", note: "Reproducible service images" },
      { name: "ArgoCD", note: "GitOps continuous delivery" },
      { name: "CI/CD", note: "Automated build & release" },
      { name: "Git", note: "Trunk-based collaboration" },
    ],
  },
  {
    id: "observability",
    label: "Observability",
    caption: "See what's happening",
    items: [
      { name: "ELK", note: "Centralized logs & tracing" },
      { name: "System Design", note: "Capacity & failure modelling" },
      { name: "DSA", note: "1000+ problems solved" },
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
    body: "Networks partition, brokers lag, dependencies time out. I assume it and design around it — timeouts, retries with backoff, idempotency, and clear failure modes.",
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
    value: "1000+",
    label: "DSA problems solved",
    detail: "Sustained problem-solving across data structures & algorithms.",
  },
  {
    value: "2",
    label: "Domains shipped",
    detail: "Quick commerce and regulated healthcare, in production.",
  },
  {
    value: "Kafka",
    label: "Event-driven at scale",
    detail: "Async pipelines decoupling core service flows.",
  },
  {
    value: "Redis",
    label: "Latency on the hot path",
    detail: "Caching, distributed locks and idempotency keys.",
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
    period: "Present",
    title: "Backend Developer",
    org: "OZi",
    description:
      "Building event-driven backend services for quick commerce with Node.js, Kafka and Redis.",
    kind: "work",
  },
  {
    period: "Prior",
    title: "Software Engineer Intern",
    org: "Bajaj Finserv Health",
    description:
      "Shipped reactive Spring WebFlux services with ELK observability and ArgoCD-based delivery.",
    kind: "work",
  },
  {
    period: "B.Tech",
    title: "Computer Science & Engineering",
    org: "LNMIIT, Jaipur",
    description:
      "Computer science foundations — systems, networks, databases and algorithms.",
    kind: "education",
  },
];
