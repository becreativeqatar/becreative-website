"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export default function Skeleton({
  className,
  variant = "rectangular",
  width,
  height,
  lines = 1,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const style = {
    width: width,
    height: height,
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "animate-pulse bg-white/10",
              variantStyles.text,
              i === lines - 1 && "w-3/4"
            )}
            style={{ height: height || "1rem" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "animate-pulse bg-white/10",
        variantStyles[variant],
        className
      )}
      style={style}
      {...props}
    />
  );
}

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  lines?: number;
}

export function SkeletonCard({
  className,
  showImage = true,
  showTitle = true,
  showDescription = true,
  lines = 2,
}: SkeletonCardProps) {
  return (
    <div className={cn("bg-white/5 rounded-lg p-6", className)}>
      {showImage && (
        <Skeleton
          variant="rectangular"
          className="w-full aspect-video mb-4"
        />
      )}
      {showTitle && <Skeleton variant="text" className="w-3/4 mb-3" />}
      {showDescription && <Skeleton variant="text" lines={lines} />}
    </div>
  );
}
