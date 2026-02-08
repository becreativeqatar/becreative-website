"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "default" | "gradient" | "pattern";
  animate?: boolean;
}

const paddingStyles = {
  none: "py-0",
  sm: "py-12",
  md: "py-16",
  lg: "py-24",
  xl: "py-32",
};

const backgroundStyles = {
  default: "bg-core-black",
  gradient: "bg-gradient-to-b from-core-black to-core-black/95",
  pattern: "bg-core-black",
};

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      container = true,
      padding = "lg",
      background = "default",
      animate = true,
      children,
      ...props
    },
    ref
  ) => {
    const content = container ? (
      <div className="container mx-auto px-6">{children}</div>
    ) : (
      children
    );

    if (animate) {
      return (
        <section
          ref={ref}
          className={cn(
            paddingStyles[padding],
            backgroundStyles[background],
            className
          )}
          {...props}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {content}
          </motion.div>
        </section>
      );
    }

    return (
      <section
        ref={ref}
        className={cn(
          paddingStyles[padding],
          backgroundStyles[background],
          className
        )}
        {...props}
      >
        {content}
      </section>
    );
  }
);

Section.displayName = "Section";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, label, title, description, align = "center", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mb-12",
          align === "center" && "text-center",
          className
        )}
        {...props}
      >
        {label && (
          <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
            {label}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "text-text-muted text-lg",
              align === "center" && "max-w-2xl mx-auto"
            )}
          >
            {description}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export { Section, SectionHeader };
export default Section;
