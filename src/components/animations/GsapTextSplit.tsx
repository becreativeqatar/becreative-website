"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextSplitProps {
  text: string;
  className?: string;
  animation?: "words" | "chars" | "lines";
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function GsapTextSplit({
  text,
  className,
  animation = "words",
  duration = 0.8,
  stagger = 0.05,
  delay = 0,
  start = "top 80%",
  as: Component = "div",
}: TextSplitProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    // Split text based on animation type
    let items: HTMLSpanElement[] = [];

    if (animation === "chars") {
      const chars = text.split("");
      element.innerHTML = "";
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.className = "inline-block";
        span.textContent = char === " " ? "\u00A0" : char;
        element.appendChild(span);
        items.push(span);
      });
    } else if (animation === "words") {
      const words = text.split(" ");
      element.innerHTML = "";
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "inline-block";
        span.textContent = word + (i < words.length - 1 ? "\u00A0" : "");
        element.appendChild(span);
        items.push(span);
      });
    } else {
      // Lines - just use the element as is
      items = [element as unknown as HTMLSpanElement];
    }

    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 30,
        rotateX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration,
        stagger,
        delay,
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
  }, [text, animation, duration, stagger, delay, start]);

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("overflow-hidden", className)}
      style={{ perspective: "1000px" }}
    >
      {text}
    </Component>
  );
}

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  scrollStart?: string;
}

export function GsapCountUp({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  className,
  scrollStart = "top 80%",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const countRef = useRef({ value: start });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(countRef.current, {
      value: end,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: scrollStart,
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent =
            prefix + Math.round(countRef.current.value).toLocaleString() + suffix;
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [end, start, duration, delay, prefix, suffix, scrollStart]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {start}
      {suffix}
    </span>
  );
}
