"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { SCENES } from "@/lib/experience";
import { PROJECTS, ACHIEVEMENTS, VISION_AREAS } from "@/lib/data";
import { SITE } from "@/lib/constants";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { useActiveScene } from "@/hooks/useActiveScene";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

/**
 * The scrolling DOM narrative that lives in front of the fixed 3D stage.
 * Each section maps 1:1 to a scene; scrolling through them drives the laptop.
 */
export function Narrative() {
  const activeScene = useActiveScene();

  return (
    <div className="pointer-events-none relative z-10">
      {SCENES.map((scene, index) => (
        <section
          key={scene.id}
          id={scene.id}
          className={cn(
            "relative flex min-h-[100svh] w-full px-6 pb-24 pt-32 sm:px-12 lg:px-20",
            index === 7 ? "items-end justify-center sm:items-center" : "items-end justify-center sm:items-center lg:justify-start",
          )}
        >
          <motion.div
            variants={reveal}
            initial="hidden"
            animate={activeScene === index ? "show" : "hidden"}
            viewport={{ once: true, amount: 0.35 }}
            className={cn(
              "glass-strong pointer-events-auto w-full rounded-[1.75rem] p-8 sm:p-10",
              index === 7 ? "max-w-2xl text-center" : "max-w-xl",
            )}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-xs text-accent-glow">
                {String(index + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-white/10" />
            </div>
            <p className="eyebrow mb-6">{scene.eyebrow}</p>
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-gradient sm:text-5xl lg:text-6xl">
              {scene.title}
            </h2>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-white sm:text-lg">
              {scene.description}
            </p>
            {index === 0 && (
              <>
                <div className="mt-7 flex items-center gap-4">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/15">
                    <img
                      src={SITE.avatar}
                      alt={SITE.name}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </span>
                  <div>
                     <p className="text-base font-semibold text-white">{SITE.name}</p>
                     <p className="text-sm text-white">
                       {SITE.role} · {SITE.location}
                     </p>
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href="#projects">
                    <MagneticButton variant="primary">
                      View Projects
                      <ArrowDown className="h-4 w-4" />
                    </MagneticButton>
                  </a>
                  <a href="#contact">
                    <MagneticButton variant="ghost">Contact</MagneticButton>
                  </a>
                </div>
              </>
            )}
            {index === 3 && (
              <div className="mt-7 flex flex-col gap-3">
                {PROJECTS.map((p) => (
                  <motion.article
                    key={p.id}
                    className="group glass-strong overflow-hidden rounded-2xl"
                    whileHover={{ y: -3 }}
                    data-cursor="hover"
                  >
                    <div className="flex items-stretch gap-4 p-4">
                      <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10">
                        <img
                          src={p.image}
                          alt={`${p.title} preview`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="truncate text-base font-semibold text-ink">{p.title}</h3>
                           <span className="shrink-0 font-mono text-[11px] text-white">{p.year}</span>
                        </div>
                         <p className="mt-0.5 truncate text-xs text-white">{p.category}</p>
                         <p className="mt-1 line-clamp-1 text-xs text-white">{p.tagline}</p>
                      </div>
                    </div>
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <div className="border-t border-white/8 p-4 pt-4">
                          <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
                            <img
                              src={p.image}
                              alt={`${p.title} screenshot`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              draggable={false}
                            />
                          </div>
                          <div className="mb-3 flex flex-wrap gap-1.5">
                            {p.stack.map((s) => (
                              <span
                                key={s}
                                 className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                          <dl className="space-y-2 text-xs">
                            <div>
                              <dt className="font-semibold text-accent-glow">Challenge</dt>
                               <dd className="text-white">{p.challenge}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-accent-glow">Solution</dt>
                               <dd className="text-white">{p.solution}</dd>
                            </div>
                            <div>
                              <dt className="mb-1 font-semibold text-accent-glow">Impact</dt>
                              <dd className="flex flex-wrap gap-1.5">
                                {p.results.map((r) => (
                                  <span
                                    key={r}
                                    className="rounded-md bg-accent-electric/10 px-2 py-0.5 text-[10px] text-ink"
                                  >
                                    {r}
                                  </span>
                                ))}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
            {index === 5 && (
              <div className="mt-6 grid grid-cols-3 gap-3">
                {ACHIEVEMENTS.slice(0, 3).map((a) => (
                  <div key={a.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center">
                    <span className="accent-gradient-text text-xl font-bold">
                      {a.prefix ?? ""}
                      {a.value}
                      {a.suffix}
                    </span>
                     <p className="mt-1 text-[10px] leading-tight text-white">{a.label}</p>
                  </div>
                ))}
              </div>
            )}
            {index === 6 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {VISION_AREAS.map((v) => (
                  <span
                    key={v.title}
                     className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white"
                  >
                    {v.title}
                  </span>
                ))}
              </div>
            )}
            {index === 7 && (
              <>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <a href={SITE.socials.github} target="_blank" rel="noreferrer">
                    <MagneticButton variant="ghost">
                      <Github className="h-4 w-4" /> GitHub
                    </MagneticButton>
                  </a>
                  <a href={SITE.socials.linkedin} target="_blank" rel="noreferrer">
                    <MagneticButton variant="ghost">
                      <Linkedin className="h-4 w-4" /> LinkedIn
                    </MagneticButton>
                  </a>
                  <a href={SITE.socials.email}>
                    <MagneticButton variant="primary">
                      <Mail className="h-4 w-4" /> Email
                    </MagneticButton>
                  </a>
                </div>
                 <p className="mt-6 inline-flex items-center justify-center gap-2 text-sm text-white">
                  <MapPin className="h-4 w-4 text-accent-electric" />
                  {SITE.location}
                </p>
              </>
            )}
          </motion.div>
        </section>
      ))}
    </div>
  );
}
