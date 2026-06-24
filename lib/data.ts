export interface ExperienceItem {
  company: string;
  client?: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "IBM India Pvt. Ltd.",
    client: "Cencora (AmerisourceBergen)",
    role: "Senior Frontend Engineer",
    period: "Oct 2024 — Present",
    location: "Bangalore, India",
    summary:
      "Building the Cencora Connect Portal with reusable React and TypeScript systems for enterprise healthcare workflows.",
    highlights: [
      "Scalable React and TypeScript solutions for Cencora Connect",
      "Reusable component systems and frontend architecture patterns",
      "Cross-functional delivery with backend and product teams",
    ],
    stack: ["React", "TypeScript", "Redux Toolkit", "React Query"],
  },
  {
    company: "IBM India Pvt. Ltd.",
    client: "Google",
    role: "Lead Frontend Engineer",
    period: "Dec 2023 — Oct 2024",
    location: "Bangalore, India",
    summary:
      "Led the frontend build of Google’s Test Data Management platform and guided the React.js to Angular migration.",
    highlights: [
      "Led a cross-functional team of 4–5 engineers",
      "Built the Test Data Management platform from the ground up",
      "Migrated key surfaces from React.js to Angular",
      "Integrated BOQ and Piper into enterprise workflows",
      "Implemented Jenkins and Azure DevOps CI/CD pipelines",
      "Improved responsiveness by 30% and reduced UI defects by 50%",
    ],
    stack: ["React", "Angular", "Jenkins", "Azure DevOps"],
  },
  {
    company: "IBM India Pvt. Ltd.",
    client: "DBS Bank",
    role: "Senior React Developer",
    period: "Feb 2022 — Dec 2023",
    location: "Bangalore, India",
    summary:
      "Delivered microfrontend banking dashboards and a shared component library for high-traffic financial products.",
    highlights: [
      "Microfrontend modules powering payments and account dashboards",
      "Served over 10M users",
      "Reusable TypeScript component library adopted by internal teams",
      "Performance-focused rendering and dashboard improvements",
    ],
    stack: ["React", "TypeScript", "Microfrontends", "Component Library"],
  },
  {
    company: "Globals ITES Pvt. Ltd.",
    role: "Senior Software Developer",
    period: "2020 — 2022",
    location: "Bangalore, India",
    summary:
      "Delivered government, defence and eKYC products across React, Redux and Android ecosystems.",
    highlights: [
      "Labor welfare platform for the Government of Karnataka",
      "Secure Android applications and monitoring dashboards for defence",
      "eKYC verification with Aadhaar and biometric flows",
      "Awarded Best Developer of the Year 2020",
    ],
    stack: ["React", "Redux", "Android", "Kotlin"],
  },
  {
    company: "Adverscribe Ad Solutions Pvt. Ltd.",
    role: "Associate Developer",
    period: "Aug 2019 — Apr 2020",
    location: "Bangalore, India",
    summary:
      "Built dashboards, booking flows and reporting tools across React, Android and PHP ecosystems.",
    highlights: [
      "Delivered 15+ projects across multiple ecosystems",
      "Built dashboards, booking flows and reporting tools",
      "Supported operational and reporting workflows",
    ],
    stack: ["React", "Android", "PHP"],
  },
];

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  tagline: string;
  image: string;
  stack: string[];
  challenge: string;
  solution: string;
  results: string[];
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    id: "cencora-connect",
    title: "Cencora Connect Portal",
    category: "Enterprise Healthcare",
    year: "2024",
    tagline:
      "A scalable React and TypeScript portal powering pharmaceutical distribution workflows.",
    image: "/images/projects/cencora-connect.svg",
    stack: ["React", "TypeScript", "Redux Toolkit", "React Query"],
    challenge:
      "Unify fragmented internal tools into a single accessible portal without sacrificing enterprise performance.",
    solution:
      "Designed a modular component architecture and typed UI patterns that let multiple teams ship in parallel.",
    results: [
      "Reusable systems for enterprise teams",
      "Consistent, accessible UX across products",
      "Faster delivery via shared primitives",
    ],
    accent: "#4d7cff",
  },
  {
    id: "google-tdm",
    title: "Test Data Management Platform",
    category: "Developer Tooling · Google",
    year: "2024",
    tagline:
      "Led frontend for an internal platform that orchestrates test data across services.",
    image: "/images/projects/google-tdm.svg",
    stack: ["React", "Angular", "Jenkins", "Azure DevOps"],
    challenge:
      "Build a complex orchestration UI from scratch while migrating key surfaces from React.js to Angular.",
    solution:
      "Created robust workflow interactions and migration patterns that made multi-step data pipelines legible.",
    results: [
      "30% improvement in responsiveness",
      "50% reduction in UI defects",
      "Led a team of 4–5 engineers to launch",
    ],
    accent: "#7c5cff",
  },
  {
    id: "dbs-bank",
    title: "DBS Bank Dashboards",
    category: "FinTech · Microfrontends",
    year: "2023",
    tagline:
      "Microfrontend payment dashboards and a shared library serving over 10M users.",
    image: "/images/projects/dbs-bank.svg",
    stack: ["React", "TypeScript", "Microfrontends", "Component Library"],
    challenge:
      "Enable independent teams to deploy banking surfaces without breaking a shared experience.",
    solution:
      "Implemented microfrontends with a versioned, typed component library.",
    results: [
      "10M+ users served reliably",
      "Independent team deployments",
      "Unified design language across surfaces",
    ],
    accent: "#2f6bff",
  },
  {
    id: "gov-defence",
    title: "Government Defence Platform",
    category: "Government · Defence",
    year: "2021",
    tagline:
      "Secure Android applications and dashboards built for a defence project.",
    image: "/images/projects/gov-defence.svg",
    stack: ["Android", "Kotlin", "Vue", "Security"],
    challenge:
      "Deliver a secure, mission-critical experience under strict compliance requirements.",
    solution:
      "Engineered a hardened native Android experience with a monitoring dashboard surface.",
    results: [
      "Best Developer of the Year 2020",
      "Hardened, compliant architecture",
      "Secure defence delivery",
    ],
    accent: "#5b8bff",
  },
  {
    id: "ekyc",
    title: "eKYC Verification Platform",
    category: "Identity · Biometrics",
    year: "2021",
    tagline:
      "Identity verification with Aadhaar and biometric flows.",
    image: "/images/projects/ekyc.svg",
    stack: ["React", "Redux", "Aadhaar", "Biometrics"],
    challenge:
      "Make biometric, document and Aadhaar verification feel effortless and trustworthy.",
    solution:
      "Built guided verification experiences that reduced friction during onboarding.",
    results: [
      "Seamless Aadhaar integration",
      "Trustworthy biometric flows",
      "Reduced verification drop-off",
    ],
    accent: "#8a7dff",
  },
];

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript"],
  },
  {
    category: "Frontend",
    skills: [
      "React",
      "Redux Toolkit",
      "React Query",
      "Next.js",
      "Angular",
      "HTML5",
      "CSS3",
      "TailwindCSS",
      "Material UI",
    ],
  },
  {
    category: "Architecture",
    skills: [
      "Microfrontends",
      "Design Systems",
      "Component Architecture",
      "Performance Optimization",
    ],
  },
  {
    category: "Backend",
    skills: ["Node.js"],
  },
  {
    category: "Testing",
    skills: ["Jest", "React Testing Library"],
  },
  {
    category: "Tools",
    skills: ["Docker", "Git", "CI/CD", "Webpack", "Vite", "Postman", "Jira"],
  },
];

export interface Achievement {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { value: 30, suffix: "%", label: "Responsiveness improvement" },
  { value: 50, suffix: "%", label: "Reduction in UI defects" },
  { value: 10, suffix: "M+", label: "Users served" },
  { value: 5, suffix: "", prefix: "4–", label: "Engineers led" },
  { value: 2020, suffix: "", label: "Best Developer of the Year" },
  { value: 10, suffix: "", prefix: "Top ", label: "Selected for UAE industrial training" },
];

export interface VisionArea {
  title: string;
  description: string;
}

export const VISION_AREAS: VisionArea[] = [
  {
    title: "Frontend Architecture",
    description:
      "Designing maintainable React and TypeScript systems that stay coherent as products grow.",
  },
  {
    title: "Design Systems",
    description:
      "Building reusable component systems that keep teams aligned and shipping in parallel.",
  },
  {
    title: "Performance Optimization",
    description:
      "Tuning rendering, state flow and interaction patterns for fast enterprise interfaces.",
  },
  {
    title: "Enterprise Scale",
    description:
      "Delivering products that serve banking, healthcare and government workflows at scale.",
  },
  {
    title: "Developer Experience",
    description:
      "Reducing friction in APIs, tooling and workflows so teams can ship with confidence.",
  },
  {
    title: "Cross-functional Leadership",
    description:
      "Leading engineers and collaborating across product, design and backend partners.",
  },
];
