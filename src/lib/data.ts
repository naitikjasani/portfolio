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
  { label: "Daily transactions", value: "100K+", hint: "Healthcare provider portal" },
  { label: "Service uptime", value: "99.9%", hint: "Production SLA" },
  { label: "Throughput gain", value: "3–4×", hint: "Reactive vs blocking I/O" },
  { label: "DSA problems", value: "1000+", hint: "LeetCode & Codeforces" },
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
    period: "May 2026 – Present",
    status: "RUNNING",
    region: "Quick Commerce",
    summary:
      "Building the backend behind a quick-commerce platform — the order-management lifecycle and the event pipelines that keep it consistent under time-sensitive load.",
    stack: ["Node.js", "TypeScript", "Express", "Kafka", "Redis", "MySQL", "MongoDB"],
    achievements: [
      {
        metric: "20+ APIs",
        label: "Order-management REST APIs",
        detail:
          "Built 20+ production REST APIs in Node.js, TypeScript and Express powering the end-to-end order lifecycle.",
      },
      {
        metric: "Kafka",
        label: "Async post-order pipelines",
        detail:
          "Moved status transitions, order confirmations and downstream notifications onto Kafka, decoupling services with reliable delivery.",
      },
      {
        metric: "Redis",
        label: "Hot-read caching",
        detail:
          "Designed MySQL and MongoDB schemas for order data and layered Redis over high-frequency reads, cutting redundant queries on critical endpoints.",
      },
      {
        metric: "Garuda",
        label: "Fast-order-placement service",
        detail:
          "Building Garuda, a dedicated service that offloads order processing to asynchronous workflows to cut placement latency for time-sensitive checkouts.",
      },
    ],
  },
  {
    slug: "svc-bajaj-finserv-health",
    company: "Bajaj Finserv Health",
    role: "Software Engineer Intern",
    period: "Jul – Oct 2025",
    status: "STABLE",
    region: "Healthcare",
    summary:
      "Engineered reactive Spring services for the Universal Provider Portal — hospital-payer integrations across 50+ partner hospitals at 100K+ daily transactions.",
    stack: ["Spring Boot", "Spring WebFlux", "PostgreSQL", "Redis", "ELK", "ArgoCD"],
    achievements: [
      {
        metric: "100K+/day",
        label: "Provider portal at 99.9% uptime",
        detail:
          "Spring Boot microservices for the Universal Provider Portal (UPP), supporting 50+ partner hospitals and 100K+ daily transactions at 99.9% uptime.",
      },
      {
        metric: "3–4× tput",
        label: "Reactive WebFlux services",
        detail:
          "Sustained 300+ requests/second under concurrent load with Spring WebFlux — a 3–4× throughput gain over the legacy blocking I/O implementation.",
      },
      {
        metric: "MTTR −40%",
        label: "ELK observability",
        detail:
          "Centralized structured logs and real-time Kibana dashboards on the ELK stack, cutting mean time to resolution for production incidents by 40%.",
      },
      {
        metric: "API −30–35%",
        label: "Latency tuning",
        detail:
          "Paired PostgreSQL persistence with a Redis caching layer to cut critical API response times by 30–35%.",
      },
      {
        metric: "Zero-downtime",
        label: "ArgoCD GitOps delivery",
        detail:
          "ArgoCD-driven CI/CD halved manual deployment effort and enabled zero-downtime releases across services.",
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
  repo: string;
  demo?: string;
  visual: "ble" | "architecture";
};

export const projects: Project[] = [
  {
    slug: "proximity-ad-delivery",
    name: "Proximity Ad Delivery",
    category: "IoT · Backend",
    year: "2024 – 2025",
    tagline: "Serving the right ad to the right device, by proximity.",
    description:
      "An IoT advertising system pairing Raspberry Pi BLE nodes with an Express.js backend: it detects nearby devices, ranks them by signal strength, and serves personalized ads within a 5–10 m range — with the Gemini API generating the ad content.",
    highlights: [
      "Detects 20+ nearby BLE devices per node at <100 ms latency",
      "Serves proximity-targeted ads within 5–10 m for 35–40% higher engagement",
      "Gemini API generates ad content, cutting manual creation effort by 60%",
      "MongoDB persists proximity events and user-interaction analytics",
    ],
    stack: ["Node.js", "Express", "Python", "BLE", "Gemini API", "MongoDB"],
    repo: "https://github.com/flicktoss/CTIOT-Smart-Advertising",
    visual: "ble",
  },
  {
    slug: "study-resource-platform",
    name: "LNMIIT Study Resource Platform",
    category: "Platform · Backend",
    year: "2024",
    tagline: "Access-controlled academic resources, from schema to endpoint.",
    description:
      "A full-stack platform for organizing and sharing academic resources for 100+ users, built around a clean JWT + role-based access model with admin-moderated uploads.",
    highlights: [
      "Full-stack platform for 100+ users with secure file access and bookmarking",
      "JWT-based RBAC enforced per route and resource",
      "Admin-moderated upload workflows keep content trustworthy",
      "Blocked 90% of unauthorized access attempts in testing",
    ],
    stack: ["Node.js", "Express", "MongoDB", "JWT", "RBAC", "REST"],
    repo: "https://github.com/flicktoss/LNMIIT-Study-Resources-Management-System",
    demo: "https://lnmiit-study-resouces-management-system.vercel.app/",
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
      { name: "Python", note: "IoT services, scripting & automation" },
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
      { name: "DSA", note: "1000+ on LeetCode & Codeforces" },
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
    value: "100K+",
    label: "Daily transactions",
    detail: "Healthcare provider portal served at 99.9% uptime.",
  },
  {
    value: "3–4×",
    label: "Throughput gain",
    detail: "Reactive Spring WebFlux over legacy blocking I/O.",
  },
  {
    value: "1000+",
    label: "DSA problems solved",
    detail: "Sustained practice across LeetCode and Codeforces.",
  },
  {
    value: "40%",
    label: "Faster incident resolution",
    detail: "ELK + Kibana observability cut mean time to resolution.",
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
      "Building event-driven order-management services for quick commerce with Node.js, Kafka and Redis.",
    kind: "work",
  },
  {
    period: "Jul – Oct 2025",
    title: "Software Engineer Intern",
    org: "Bajaj Finserv Health",
    description:
      "Reactive Spring WebFlux services for a provider portal at 100K+ daily transactions, with ELK observability and ArgoCD delivery.",
    kind: "work",
  },
  {
    period: "2022 – 2026",
    title: "B.Tech, Computer Science & Engineering",
    org: "LNMIIT, Jaipur",
    description:
      "Computer science foundations — systems, networks, databases and algorithms. CGPA 7.64 / 10.",
    kind: "education",
  },
];
