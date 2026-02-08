"use client";

import { ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  hoverGlow?: boolean;
  tiltEffect?: boolean;
  borderGlow?: boolean;
}

export default function GlassCard({
  children,
  className,
  glowColor = "rgba(224, 37, 28, 0.3)",
  hoverGlow = true,
  tiltEffect = false,
  borderGlow = false,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position for glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Tilt values
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    if (tiltEffect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;

      rotateX.set(tiltX);
      rotateY.set(tiltY);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  const glowBackground = useMotionTemplate`radial-gradient(400px circle at ${smoothMouseX}px ${smoothMouseY}px, ${glowColor}, transparent 80%)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tiltEffect ? rotateX : 0,
        rotateY: tiltEffect ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-white/5 backdrop-blur-md",
        "border border-white/10",
        "transition-all duration-300",
        borderGlow && "hover:border-red-spark/50",
        className
      )}
    >
      {/* Glow effect on hover */}
      {hoverGlow && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBackground }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Glowing border card
interface GlowBorderCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  animated?: boolean;
}

export function GlowBorderCard({
  children,
  className,
  glowColor = "var(--red-spark)",
  animated = true,
}: GlowBorderCardProps) {
  return (
    <div className={cn("relative group", className)}>
      {/* Animated glow border */}
      <div
        className={cn(
          "absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm",
          animated && "animate-pulse"
        )}
        style={{
          background: `linear-gradient(90deg, ${glowColor}, var(--purple-dream), ${glowColor})`,
          backgroundSize: "200% 100%",
        }}
      />

      {/* Card content */}
      <div className="relative bg-core-black rounded-xl border border-white/10 group-hover:border-transparent transition-colors">
        {children}
      </div>
    </div>
  );
}

// Spotlight card with mouse tracking
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(224, 37, 28, 0.15)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 40%)`;

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white/5 border border-white/10",
        "hover:border-white/20 transition-colors duration-300",
        className
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: spotlight }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Neon glow button/card
interface NeonGlowProps {
  children: ReactNode;
  className?: string;
  color?: "red" | "purple" | "blue";
  intensity?: "low" | "medium" | "high";
}

export function NeonGlow({
  children,
  className,
  color = "red",
  intensity = "medium",
}: NeonGlowProps) {
  const colors = {
    red: "var(--red-spark)",
    purple: "var(--purple-dream)",
    blue: "#3B82F6",
  };

  const intensities = {
    low: "0 0 10px",
    medium: "0 0 20px",
    high: "0 0 30px, 0 0 60px",
  };

  const glowColor = colors[color];
  const glowIntensity = intensities[intensity];

  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        "hover:scale-[1.02]",
        className
      )}
      style={{
        boxShadow: `${glowIntensity} ${glowColor}`,
      }}
    >
      {children}
    </div>
  );
}

// Frosted glass panel
interface FrostedPanelProps {
  children: ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
}

export function FrostedPanel({
  children,
  className,
  blur = "md",
  opacity = 0.1,
}: FrostedPanelProps) {
  const blurValues = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10",
        blurValues[blur],
        className
      )}
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
    >
      {children}
    </div>
  );
}
