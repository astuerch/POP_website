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
    "inline-flex items-center justify-center rounded-full font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-lila focus-visible:ring-offset-2 focus-visible:ring-offset-brand-paper";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-brand-lilaDark text-white hover:bg-brand-ink",
    secondary: "bg-brand-lila text-brand-ink hover:bg-brand-mint",
    ghost:
      "border border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/15",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm sm:text-base",
    lg: "px-6 py-3.5 text-base",
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
