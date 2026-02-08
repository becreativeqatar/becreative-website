"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "rotate";
  duration?: number;
  delay?: number;
  start?: string;
  markers?: boolean;
}

const animations = {
  fadeUp: { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } },
  fadeDown: { from: { opacity: 0, y: -60 }, to: { opacity: 1, y: 0 } },
  fadeLeft: { from: { opacity: 0, x: 60 }, to: { opacity: 1, x: 0 } },
  fadeRight: { from: { opacity: 0, x: -60 }, to: { opacity: 1, x: 0 } },
  scale: { from: { opacity: 0, scale: 0.8 }, to: { opacity: 1, scale: 1 } },
  rotate: { from: { opacity: 0, rotation: 10 }, to: { opacity: 1, rotation: 0 } },
};

export default function GsapScrollReveal({
  children,
  className,
  animation = "fadeUp",
  duration = 1,
  delay = 0,
  start = "top 80%",
  markers = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const { from, to } = animations[animation];

    gsap.fromTo(element, from, {
      ...to,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions: "play none none none",
        markers,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animation, duration, delay, start, markers]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  start?: string;
}

export function GsapStaggerReveal({
  children,
  className,
  stagger = 0.1,
  duration = 0.8,
  start = "top 80%",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const items = element.children;

    gsap.fromTo(
      items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: "play none none none",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [stagger, duration, start]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
