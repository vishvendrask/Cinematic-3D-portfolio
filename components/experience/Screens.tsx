"use client";

import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Folder,
  Github,
  Linkedin,
  Mail,
  Power,
  Search,
  Sparkles,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { EXPERIENCE, PROJECTS, SKILLS, VISION_AREAS } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { SCENES, type AppId } from "@/lib/experience";
import { useActiveScene } from "@/hooks/useActiveScene";

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

const SCREEN_W = 1000;
const SCREEN_H = 620;

function MenuBar({ app }: { app: string }) {
  return (
    <div className="flex h-8 items-center justify-between border-b border-white/10 bg-black/40 px-4 text-[13px] text-white/80 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <span className="text-base"></span>
        <span className="font-semibold">{app}</span>
        <span className="hidden text-white/50 sm:inline">File</span>
        <span className="hidden text-white/50 sm:inline">View</span>
        <span className="hidden text-white/50 sm:inline">Window</span>
      </div>
      <div className="flex items-center gap-3 text-white/70">
        <Wifi className="h-4 w-4" />
        <BatteryFull className="h-4 w-4" />
        <span className="tabular-nums">9:41</span>
      </div>
    </div>
  );
}

function TrafficLights() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
      <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
      <span className="h-3 w-3 rounded-full bg-[#28c840]" />
    </div>
  );
}

/** A floating glass macOS window. */
function Window({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-white/12 bg-[#101218]/85 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex h-9 shrink-0 items-center gap-3 border-b border-white/8 bg-white/[0.04] px-4">
        <TrafficLights />
        {title && <span className="text-[12px] font-medium text-white/60">{title}</span>}
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

const screenEnter = {
  initial: { opacity: 0, scale: 1.04 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
};

/* ------------------------------------------------------------------ */
/* Desktop                                                             */
/* ------------------------------------------------------------------ */

const DESKTOP_ICONS = ["About", "Experience", "Projects", "Skills", "Future Vision"];
const DOCK = ["Finder", "Safari", "Code", "Terminal", "Music", "Settings"];

function DesktopApp() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <MenuBar app="Finder" />
      {/* animated wallpaper */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-gradient-pan bg-[length:200%_200%] bg-[linear-gradient(120deg,#0a1230,#1a1146,#091a3a,#10122a)]" />
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent-electric/30 blur-[120px]" />
        <div className="absolute bottom-0 right-10 h-[260px] w-[260px] rounded-full bg-accent-purple/30 blur-[110px]" />
      </div>

      {/* desktop icons */}
      <div className="absolute right-5 top-12 flex flex-col gap-5">
        {DESKTOP_ICONS.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="flex w-20 flex-col items-center gap-1.5 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md">
              <Folder className="h-7 w-7 text-accent-glow" />
            </div>
            <span className="text-[11px] text-white/80 drop-shadow">{label}</span>
          </motion.div>
        ))}
      </div>

      {/* centered headline */}
      <div className="flex h-full flex-col items-center justify-center px-10 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mb-6 inline-block h-24 w-24 overflow-hidden rounded-3xl border border-white/20 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SITE.avatar} alt={SITE.name} className="h-full w-full object-cover" draggable={false} />
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[12px] uppercase tracking-[0.25em] text-white/70"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent-electric" />
          Senior Frontend Engineer
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mt-6 max-w-2xl bg-[linear-gradient(120deg,#fff,#bcd0ff,#9a86ff)] bg-clip-text text-5xl font-semibold leading-[1.02] tracking-tight text-transparent"
        >
          Building Experiences That Feel Alive
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="mt-5 font-mono text-sm tracking-wide text-white/55"
        >
          React • TypeScript • Architecture • AI
        </motion.p>
      </div>

      {/* dock */}
      <div className="absolute inset-x-0 bottom-3 flex justify-center">
        <div className="flex items-end gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-xl">
          {DOCK.map((app) => (
            <div
              key={app}
              className="h-9 w-9 rounded-xl bg-[linear-gradient(135deg,#4d7cff,#7c5cff)] shadow-lg transition-transform hover:-translate-y-1"
              title={app}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Finder (About)                                                      */
/* ------------------------------------------------------------------ */

const FINDER_FOLDERS = [
  { name: "Early Career", count: "2016 — 2018" },
  { name: "Android Journey", count: "Kotlin · Java" },
  { name: "React Evolution", count: "2019 — now" },
  { name: "Frontend Architecture", count: "Design Systems" },
  { name: "Leadership", count: "Teams of 4–5" },
];

function FinderApp() {
  return (
    <div className="h-full w-full">
      <MenuBar app="Finder" />
      <div className="h-[calc(100%-2rem)] p-5">
        <Window title="Vishvendra — Journey" className="h-full">
          <div className="flex h-full">
            <aside className="hidden w-48 shrink-0 flex-col gap-1 border-r border-white/8 bg-white/[0.02] p-3 sm:flex">
              <div className="mb-3 flex items-center gap-2.5 rounded-lg bg-white/[0.04] p-2">
                <span className="h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={SITE.avatar} alt={SITE.name} className="h-full w-full object-cover" draggable={false} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold text-white/90">{SITE.shortName}</p>
                  <p className="truncate text-[10px] text-white/45">{SITE.role}</p>
                </div>
              </div>
              <p className="px-2 pb-1 text-[10px] uppercase tracking-widest text-white/35">
                Favorites
              </p>
              {["Recents", "Documents", "Projects", "Career"].map((f) => (
                <div
                  key={f}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] text-white/70 hover:bg-white/5"
                >
                  <Folder className="h-3.5 w-3.5 text-accent-glow" />
                  {f}
                </div>
              ))}
            </aside>
            <div className="flex-1 overflow-hidden p-5">
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white/40">
                <Search className="h-3.5 w-3.5" />
                <span className="text-[12px]">Search the journey…</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {FINDER_FOLDERS.map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-transparent p-3 text-center hover:border-white/10 hover:bg-white/[0.04]"
                  >
                    <div className="flex h-16 w-20 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#3a5bff,#7c5cff)] shadow-lg transition-transform group-hover:-translate-y-1">
                      <Folder className="h-8 w-8 text-white/90" />
                    </div>
                    <span className="text-[13px] font-medium text-white/85">{f.name}</span>
                    <span className="text-[11px] text-white/40">{f.count}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline (Experience)                                               */
/* ------------------------------------------------------------------ */

function TimelineApp() {
  return (
    <div className="h-full w-full">
      <MenuBar app="Timeline" />
      <div className="h-[calc(100%-2rem)] p-5">
        <Window title="Career Timeline" className="h-full">
          <div className="relative h-full overflow-hidden p-6">
            <div className="absolute bottom-6 left-9 top-6 w-px bg-[linear-gradient(180deg,transparent,#4d7cff,#7c5cff,transparent)]" />
            <div className="flex flex-col gap-4">
              {EXPERIENCE.map((e, i) => (
                <motion.div
                  key={e.company}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-10"
                >
                  <span className="absolute left-[11px] top-2 h-3 w-3 rounded-full border-2 border-accent-electric bg-background shadow-[0_0_12px_3px_rgba(77,124,255,0.6)]" />
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-[15px] font-semibold text-white">
                        {e.company}
                        {e.client && (
                          <span className="ml-2 text-[12px] font-normal text-white/45">
                            · {e.client}
                          </span>
                        )}
                      </h3>
                      <span className="shrink-0 font-mono text-[11px] text-accent-glow">
                        {e.period}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[12px] text-white/55">{e.role}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {e.stack.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/65"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mission Control (Projects)                                          */
/* ------------------------------------------------------------------ */

function MissionApp() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <MenuBar app="Mission Control" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(77,124,255,0.18),transparent_60%)]" />
      <div className="flex h-[calc(100%-2rem)] items-center justify-center p-6">
        <div className="grid w-full grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 16 }}
              className="group relative overflow-hidden rounded-xl border border-white/12 bg-[#0e1018]/90 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]"
              style={{ transform: `translateY(${(i % 2) * 14}px)` }}
            >
              <div className="flex h-7 items-center gap-2 border-b border-white/8 px-3">
                <TrafficLights />
              </div>
              <div className="relative h-24 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ background: `linear-gradient(135deg, ${p.accent}, transparent 70%)` }}
                />
              </div>
              <div className="p-3">
                <h4 className="text-[13px] font-semibold leading-tight text-white">
                  {p.title}
                </h4>
                <p className="mt-0.5 text-[10px] text-white/45">{p.category}</p>
              </div>
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 0 1px ${p.accent}` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard (Skills)                                                  */
/* ------------------------------------------------------------------ */

const SKILL_LEVELS: Record<string, number> = {
  Frontend: 96,
  Architecture: 92,
  Backend: 74,
  Testing: 85,
  Tools: 90,
  AI: 80,
};

function Ring({ value, label }: { value: number; label: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[68px] w-[68px]">
        <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
          <motion.circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke="url(#ringgrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: c - (c * value) / 100 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="ringgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4d7cff" />
              <stop offset="100%" stopColor="#7c5cff" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-white">
          {value}
        </span>
      </div>
      <span className="text-[11px] text-white/60">{label}</span>
    </div>
  );
}

function DashboardApp() {
  return (
    <div className="h-full w-full">
      <MenuBar app="Analytics" />
      <div className="h-[calc(100%-2rem)] p-5">
        <Window title="Capabilities Dashboard" className="h-full">
          <div className="flex h-full flex-col gap-4 p-5">
            <div className="grid grid-cols-6 gap-2">
              {SKILLS.map((g) => (
                <Ring key={g.category} value={SKILL_LEVELS[g.category] ?? 80} label={g.category} />
              ))}
            </div>
            <div className="grid flex-1 grid-cols-3 gap-3">
              {SKILLS.slice(0, 3).map((g, gi) => (
                <div
                  key={g.category}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <p className="mb-2 text-[12px] font-semibold text-white/85">{g.category}</p>
                  <div className="flex flex-col gap-2">
                    {g.skills.slice(0, 4).map((s, i) => (
                      <div key={s}>
                        <p className="mb-1 text-[10px] text-white/50">{s}</p>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                          <motion.div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#4d7cff,#7c5cff)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${72 + ((gi + i) % 4) * 7}%` }}
                            transition={{ duration: 1, delay: i * 0.08 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Window>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Metrics (Achievements)                                              */
/* ------------------------------------------------------------------ */

function MetricsApp() {
  const cards = [
    { big: "10M+", label: "Users served" },
    { big: "30%", label: "Faster responsiveness" },
    { big: "50%", label: "Fewer UI defects" },
    { big: "4–5", label: "Engineers led" },
    { big: "2020", label: "Best Developer of the Year" },
    { big: "Top 10", label: "Intl. industrial training" },
  ];
  return (
    <div className="h-full w-full">
      <MenuBar app="Metrics" />
      <div className="h-[calc(100%-2rem)] p-5">
        <Window title="Impact" className="h-full">
          <div className="grid h-full grid-cols-3 grid-rows-2 gap-3 p-5">
            {cards.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(77,124,255,0.12),transparent_70%)] p-4 text-center"
              >
                <span className="bg-[linear-gradient(120deg,#fff,#9db4ff)] bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                  {c.big}
                </span>
                <span className="mt-1 text-[11px] text-white/55">{c.label}</span>
              </motion.div>
            ))}
          </div>
        </Window>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AI Lab (Future Vision)                                              */
/* ------------------------------------------------------------------ */

const NODES = [
  { x: 50, y: 28 },
  { x: 24, y: 50 },
  { x: 76, y: 50 },
  { x: 34, y: 76 },
  { x: 66, y: 76 },
  { x: 50, y: 54 },
];

function AILabApp() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <MenuBar app="AI Lab" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(124,92,255,0.2),transparent_65%)]" />
      <div className="relative h-[calc(100%-2rem)] p-6">
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {NODES.slice(0, 5).map((n, i) => (
            <motion.line
              key={i}
              x1={`${NODES[5].x}%`}
              y1={`${NODES[5].y}%`}
              x2={`${n.x}%`}
              y2={`${n.y}%`}
              stroke="rgba(124,92,255,0.5)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: i * 0.12, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
            />
          ))}
        </svg>
        {NODES.map((n, i) => (
          <motion.div
            key={i}
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-purple shadow-[0_0_14px_4px_rgba(124,92,255,0.6)]"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2.4, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
        <div className="absolute inset-x-0 top-4 text-center">
          <h3 className="bg-[linear-gradient(120deg,#fff,#b9a6ff)] bg-clip-text text-2xl font-semibold text-transparent">
            The Future I&apos;m Building Towards
          </h3>
        </div>
        <div className="absolute inset-x-6 bottom-5 grid grid-cols-3 gap-2">
          {VISION_AREAS.slice(0, 6).map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-center text-[11px] font-medium text-white/75"
            >
              {v.title}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shutdown (Contact)                                                  */
/* ------------------------------------------------------------------ */

function ShutdownApp() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/[0.04]"
      >
        <span className="bg-[linear-gradient(120deg,#fff,#9db4ff)] bg-clip-text text-3xl font-bold text-transparent">
          VK
        </span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-sm text-white/50"
      >
        Let&apos;s build something extraordinary.
      </motion.p>
      <div className="mt-5 flex items-center gap-4 text-white/40">
        <Github className="h-4 w-4" />
        <Linkedin className="h-4 w-4" />
        <Mail className="h-4 w-4" />
      </div>
      <div className="absolute bottom-5 flex items-center gap-2 text-[11px] text-white/30">
        <Power className="h-3.5 w-3.5" />
        Shutting down…
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Router                                                              */
/* ------------------------------------------------------------------ */

const APPS: Record<AppId, React.ComponentType> = {
  desktop: DesktopApp,
  finder: FinderApp,
  timeline: TimelineApp,
  mission: MissionApp,
  dashboard: DashboardApp,
  metrics: MetricsApp,
  ailab: AILabApp,
  shutdown: ShutdownApp,
};

/**
 * The content rendered onto the laptop screen. Lives inside a drei `<Html>`
 * and crossfades whenever the active scene changes. Purely presentational —
 * all interaction happens in the DOM narrative for accessibility + perf.
 */
export const ScreenStage = memo(function ScreenStage() {
  const scene = useActiveScene();
  const app = SCENES[scene].app;
  const App = APPS[app];

  return (
    <div
      className="relative select-none overflow-hidden bg-[#06070c] font-sans text-white"
      style={{ width: SCREEN_W, height: SCREEN_H }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={app}
          {...screenEnter}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <App />
        </motion.div>
      </AnimatePresence>
      {/* subtle screen reflection / vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
    </div>
  );
});

export { SCREEN_W, SCREEN_H };
