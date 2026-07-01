import {cn} from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "text-center")}>
      {eyebrow ? (
        <p className="text-brand-coral text-sm font-semibold tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-3">
        <h2 className="font-heading text-brand-ink text-4xl leading-none tracking-tight sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="text-brand-slate max-w-3xl text-base leading-8 sm:text-lg">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
