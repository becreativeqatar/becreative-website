"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  speed?: number;
}

export default function HorizontalScroll({
  children,
  className,
  containerClassName,
  speed = 1,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const scroll = scrollRef.current;

    // Calculate the scroll distance
    const totalWidth = scroll.scrollWidth;
    const viewportWidth = container.offsetWidth;
    const distance = totalWidth - viewportWidth;

    setScrollWidth(distance);

    // Create the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${distance * speed}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(scroll, {
      x: -distance,
      ease: "none",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [speed, children]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div
        ref={scrollRef}
        className={cn("flex", className)}
      >
        {children}
      </div>
    </div>
  );
}

interface HorizontalScrollItemProps {
  children: React.ReactNode;
  className?: string;
  width?: string;
}

export function HorizontalScrollItem({
  children,
  className,
  width = "80vw",
}: HorizontalScrollItemProps) {
  return (
    <div
      className={cn("flex-shrink-0 px-4", className)}
      style={{ width }}
    >
      {children}
    </div>
  );
}
