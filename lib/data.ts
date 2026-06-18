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
    company: "IBM India",
    client: "Cencora (AmerisourceBergen)",
    role: "Senior Frontend Engineer",
    period: "2022 — Present",
    location: "Bangalore, India",
    summary:
      "Architecting scalable React & TypeScript platforms for one of the world's largest healthcare distributors.",
    highlights: [
      "Scalable React and TypeScript solutions across enterprise products",
      "Designed and maintained reusable component systems",
      "Enterprise-grade frontend architecture and patterns",
      "Cross-functional collaboration with design, product and backend",
    ],
    stack: ["React", "TypeScript", "Design Systems", "Architecture"],
  },
  {
    company: "Google",
    role: "Lead Frontend Engineer",
    period: "2021 — 2022",
    summary:
      "Led a team building an internal Test Data Management platform from the ground up.",
    highlights: [
      "Led a team of 4–5 engineers end-to-end",
      "Built the Test Data Management platform from scratch",
      "Drove the React → Angular migration strategy",
      "BOQ and Piper integration across services",
      "Jenkins and Azure DevOps CI/CD pipelines",
      "Improved responsiveness by 30% and reduced UI defects by 50%",
    ],
    stack: ["React", "Angular", "CI/CD", "Azure DevOps", "Leadership"],
  },
  {
    company: "DBS Bank",
    role: "Senior React Developer",
    period: "2020 — 2021",
    summary:
      "Built microfrontend banking dashboards and a shared component library serving 10M+ users.",
    highlights: [
      "Microfrontend architecture at scale",
      "High-density banking dashboards",
      "Shared TypeScript component library",
      "Applications serving 10M+ users",
    ],
    stack: ["React", "Microfrontends", "TypeScript", "Module Federation"],
  },
  {
    company: "Globals ITES",
    role: "Frontend Engineer",
    period: "2020 — 2022",
    summary:
      "Delivered citizen-scale government, defence and eKYC platforms.",
    highlights: [
      "Government of Karnataka digital platform",
      "Mission-critical defence applications",
      "eKYC platform with biometric verification",
      "Awarded Best Developer of the Year 2020",
    ],
    stack: ["Vue", "Kotlin", "eKYC", "Android"],
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
    year: "2023",
    tagline:
      "A scalable React + TypeScript portal powering pharmaceutical distribution workflows.",
    image: "/images/projects/cencora-connect.svg",
    stack: ["React", "TypeScript", "Design System", "React Query"],
    challenge:
      "Unify fragmented internal tools into a single, accessible portal without sacrificing performance at enterprise scale.",
    solution:
      "Designed a modular component architecture and a typed design system that let multiple teams ship in parallel.",
    results: [
      "Reusable component systems adopted org-wide",
      "Consistent, accessible UX across products",
      "Faster feature delivery via shared primitives",
    ],
    accent: "#4d7cff",
  },
  {
    id: "google-tdm",
    title: "Test Data Management Platform",
    category: "Developer Tooling · Google",
    year: "2022",
    tagline:
      "Led frontend for an internal platform that orchestrates test data across services.",
    image: "/images/projects/google-tdm.svg",
    stack: ["React", "Angular", "Azure DevOps", "Jenkins"],
    challenge:
      "Build a complex orchestration UI from scratch while migrating a legacy React surface to Angular.",
    solution:
      "Created animated workflow visualizations and flow diagrams that made multi-step data pipelines legible.",
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
    year: "2021",
    tagline:
      "Microfrontend payment dashboards and a shared library serving 10M+ users.",
    image: "/images/projects/dbs-bank.svg",
    stack: ["React", "Microfrontends", "TypeScript", "Module Federation"],
    challenge:
      "Enable independent teams to deploy banking surfaces without breaking a shared experience.",
    solution:
      "Implemented module-federation microfrontends with a versioned, typed component library.",
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
    category: "Mobile · Award Winning",
    year: "2020",
    tagline:
      "Award-winning defence application crafted with Kotlin and Vue.",
    image: "/images/projects/gov-defence.svg",
    stack: ["Kotlin", "Vue", "Android", "Security"],
    challenge:
      "Deliver a secure, mission-critical mobile experience under strict compliance requirements.",
    solution:
      "Engineered a hardened native Android experience with a fluid Vue companion surface.",
    results: [
      "Award-winning delivery",
      "Hardened, compliant architecture",
      "Premium native mobile experience",
    ],
    accent: "#5b8bff",
  },
  {
    id: "ekyc",
    title: "eKYC Verification Platform",
    category: "Identity · Biometrics",
    year: "2020",
    tagline:
      "Biometric verification with Aadhaar integration and animated device flows.",
    image: "/images/projects/ekyc.svg",
    stack: ["Vue", "Biometrics", "Aadhaar", "Security"],
    challenge:
      "Make biometric, document and Aadhaar verification feel effortless and trustworthy.",
    solution:
      "Built guided, animated device experiences that reduced drop-off during verification.",
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
    category: "Frontend",
    skills: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "React Query",
      "Next.js",
      "Angular",
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
  {
    category: "AI",
    skills: [
      "LLMs",
      "AI Agents",
      "Workflow Automation",
      "Developer Productivity",
    ],
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
    title: "AI & Agents",
    description:
      "Composing LLMs and autonomous agents into reliable, production-grade workflows.",
  },
  {
    title: "Developer Tools",
    description:
      "Building tooling that compounds engineering velocity and joy.",
  },
  {
    title: "Human–Computer Interaction",
    description:
      "Designing interfaces that feel intuitive, responsive and alive.",
  },
  {
    title: "Intelligent Interfaces",
    description:
      "Surfaces that anticipate intent and adapt to the person using them.",
  },
  {
    title: "Spatial Computing",
    description:
      "Exploring depth, 3D and immersive experiences on the open web.",
  },
  {
    title: "R&D Engineering",
    description:
      "Prototyping the frontier where research becomes shipped product.",
  },
];
