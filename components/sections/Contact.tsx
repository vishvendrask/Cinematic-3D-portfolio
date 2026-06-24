"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { SITE } from "@/lib/constants";

const links = [
  { label: "GitHub", href: SITE.socials.github, icon: Github },
  { label: "LinkedIn", href: SITE.socials.linkedin, icon: Linkedin },
  { label: "Email", href: SITE.socials.email, icon: Mail },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden section-pad">
      {/* animated gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 animate-gradient-pan opacity-60"
          style={{
            background:
              "linear-gradient(120deg, rgba(77,124,255,0.18), rgba(124,92,255,0.16), rgba(47,107,255,0.18))",
            backgroundSize: "200% 200%",
          }}
        />
        <div className="ring-grid absolute inset-0 opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="eyebrow mx-auto mb-8">
          <MapPin className="h-3.5 w-3.5 text-accent-electric" />
          {SITE.location}
        </span>

        <TextReveal
          text="Let's Build Something Reliable"
          as="h2"
          className="justify-center text-balance text-5xl font-semibold leading-[1.02] tracking-tightest text-gradient sm:text-6xl md:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mx-auto mt-8 max-w-xl text-lg text-ink-muted"
        >
          Open to senior frontend, architecture and platform roles — and
          selective collaborations on products that need durable UI systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <a href={SITE.socials.email}>
            <MagneticButton variant="primary">
              <Mail className="h-4 w-4" />
              Start a conversation
            </MagneticButton>
          </a>

          <div className="mt-4 flex items-center gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                data-cursor="hover"
                className="glass flex h-12 w-12 items-center justify-center rounded-full text-ink-muted transition-all duration-300 hover:-translate-y-1 hover:text-ink"
              >
                <l.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
