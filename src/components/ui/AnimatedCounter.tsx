"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const ctx = gsap.context(() => {
      const counter = { val: 0 };

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once,
        onEnter: () => {
          if (hasAnimated && once) return;

          gsap.to(counter, {
            val: value,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              if (el) {
                const current = Math.round(counter.val);
                el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
              }
            },
            onComplete: () => {
              setHasAnimated(true);
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix, prefix, duration, once, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
