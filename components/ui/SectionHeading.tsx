import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/ui/TextReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-electric shadow-[0_0_12px_2px_rgba(91,139,255,0.8)]" />
        {eyebrow}
      </span>
      <TextReveal
        text={title}
        as="h2"
        className={cn(
          "max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tightest text-gradient sm:text-5xl md:text-6xl",
          align === "center" && "justify-center",
        )}
      />
      {description && (
        <p
          className={cn(
           "max-w-2xl text-base leading-relaxed text-white sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
