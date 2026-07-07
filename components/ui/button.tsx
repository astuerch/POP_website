import type {ButtonHTMLAttributes} from "react";

import {cn} from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export function buttonClasses({
  variant = "primary",
  size = "md",
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lila focus-visible:ring-offset-2 focus-visible:ring-offset-brand-night";

  const variants: Record<ButtonVariant, string> = {
    // Light lilac fill with dark text; hover deepens the lilac, lifts the
    // button slightly (motion-safe only) and adds a soft lilac glow.
    primary:
      "bg-brand-lila text-brand-ink hover:bg-brand-lila-deep motion-safe:hover:scale-[1.03] hover:shadow-[0_0_32px_-8px_rgba(182,161,210,0.6)]",
    // Dark lilac surface; hover saturates rather than washing out.
    secondary:
      "border border-white/10 bg-brand-lila-dark text-brand-fog hover:bg-brand-plum",
    // Outline for photographic/dark backgrounds; hover deepens the fill.
    ghost:
      "border border-white/25 bg-white/5 text-white hover:border-white/60 hover:bg-black/40",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm sm:text-base",
    lg: "px-5 py-3 text-sm sm:px-6 sm:py-3.5 sm:text-base",
  };

  return cn(base, variants[variant], sizes[size]);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonClasses({variant, size}), className)}
      type={type}
      {...props}
    />
  );
}
