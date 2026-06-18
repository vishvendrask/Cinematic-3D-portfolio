import { Github, Linkedin, Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

const socials = [
  { label: "GitHub", href: SITE.socials.github, icon: Github },
  { label: "LinkedIn", href: SITE.socials.linkedin, icon: Linkedin },
  { label: "Email", href: SITE.socials.email, icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-gradient text-xs font-bold text-white">
              VK
            </span>
            <span className="text-sm font-semibold">{SITE.name}</span>
          </div>
          <p className="text-xs text-ink-faint">
            {SITE.role} · {SITE.location}
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-cursor="hover"
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              data-cursor="hover"
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-ink-muted transition-all hover:-translate-y-0.5 hover:text-ink"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/[0.05] pt-6 text-center text-xs text-ink-faint">
        © {new Date().getFullYear()} {SITE.name}. Crafted with Next.js, R3F &
        Framer Motion.
      </div>
    </footer>
  );
}
