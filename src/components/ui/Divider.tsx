"use client";

import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "gradient";
  label?: string;
}

export default function Divider({
  className,
  orientation = "horizontal",
  variant = "default",
  label,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "w-px h-full",
          variant === "default" && "bg-white/10",
          variant === "gradient" && "bg-gradient-to-b from-transparent via-white/20 to-transparent",
          className
        )}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <div
          className={cn(
            "flex-1 h-px",
            variant === "default" && "bg-white/10",
            variant === "gradient" && "bg-gradient-to-r from-transparent to-white/20"
          )}
        />
        <span className="text-text-muted text-sm">{label}</span>
        <div
          className={cn(
            "flex-1 h-px",
            variant === "default" && "bg-white/10",
            variant === "gradient" && "bg-gradient-to-r from-white/20 to-transparent"
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full h-px",
        variant === "default" && "bg-white/10",
        variant === "gradient" && "bg-gradient-to-r from-transparent via-white/20 to-transparent",
        className
      )}
    />
  );
}
