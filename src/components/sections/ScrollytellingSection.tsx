"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollytellingSectionProps {
  challenge: string;
  approach: string;
  solution: string;
}

interface PanelConfig {
  number: string;
  title: string;
  content: string;
  accentClass: string;
  accentGradient?: string;
}

export default function ScrollytellingSection({
  challenge,
  approach,
  solution,
}: ScrollytellingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const panels: PanelConfig[] = [
    {
      number: "01",
      title: "The Challenge",
      content: challenge,
      accentClass: "text-red-spark",
    },
    {
      number: "02",
      title: "Our Approach",
      content: approach,
      accentClass: "text-purple-dream",
    },
    {
      number: "03",
      title: "The Solution",
      content: solution,
      accentClass: "text-red-spark",
      accentGradient:
        "bg-gradient-to-r from-red-spark to-purple-dream bg-clip-text text-transparent",
    },
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Use matchMedia for responsive behavior
      const mm = gsap.matchMedia();

      // Desktop: pinned scrollytelling
      mm.add("(min-width: 768px)", () => {
        setIsMobile(false);

        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;

          const textContainer = textRefs.current[i];
          if (!textContainer) return;

          // Split text content into words for word-by-word reveal
          const words = textContainer.querySelectorAll(".reveal-word");

          // Set initial states
          gsap.set(words, { opacity: 0, y: 20 });
          gsap.set(panel.querySelector(".panel-title"), {
            opacity: 0,
            x: -40,
          });
          gsap.set(panel.querySelector(".panel-number"), {
            opacity: 0,
            scale: 0.8,
          });
          gsap.set(panel.querySelector(".panel-accent-line"), {
            scaleX: 0,
          });

          // Create pinned scroll timeline
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 0.8,
              onEnter: () => setActiveIndex(i),
              onEnterBack: () => setActiveIndex(i),
            },
          });

          // Animate background number
          tl.to(
            panel.querySelector(".panel-number"),
            {
              opacity: 0.06,
              scale: 1,
              duration: 0.15,
              ease: "power2.out",
            },
            0
          );

          // Animate accent line
          tl.to(
            panel.querySelector(".panel-accent-line"),
            {
              scaleX: 1,
              duration: 0.15,
              ease: "power2.out",
            },
            0.05
          );

          // Animate title
          tl.to(
            panel.querySelector(".panel-title"),
            {
              opacity: 1,
              x: 0,
              duration: 0.2,
              ease: "power2.out",
            },
            0.1
          );

          // Animate words staggered
          tl.to(
            words,
            {
              opacity: 1,
              y: 0,
              stagger: 0.02,
              duration: 0.5,
              ease: "power1.out",
            },
            0.2
          );

          // Hold for a moment then fade out (unless last panel)
          if (i < panels.length - 1) {
            tl.to(
              panel.querySelector(".panel-content-wrapper"),
              {
                opacity: 0,
                y: -30,
                duration: 0.15,
                ease: "power2.in",
              },
              0.85
            );
          }
        });
      });

      // Mobile: simple stacked layout with basic fade-in
      mm.add("(max-width: 767px)", () => {
        setIsMobile(true);

        panelRefs.current.forEach((panel, i) => {
          if (!panel) return;

          const textContainer = textRefs.current[i];
          if (!textContainer) return;

          const words = textContainer.querySelectorAll(".reveal-word");

          gsap.set(words, { opacity: 0, y: 12 });
          gsap.set(panel.querySelector(".panel-title"), {
            opacity: 0,
            y: 20,
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              end: "top 30%",
              scrub: 0.5,
              onEnter: () => setActiveIndex(i),
              onEnterBack: () => setActiveIndex(i),
            },
          });

          tl.to(
            panel.querySelector(".panel-title"),
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
            },
            0
          );

          tl.to(
            words,
            {
              opacity: 1,
              y: 0,
              stagger: 0.015,
              duration: 0.5,
            },
            0.1
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [challenge, approach, solution, panels.length]);

  /**
   * Splits a string into word spans for GSAP word-by-word animation.
   */
  const renderWords = (text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="reveal-word inline-block mr-[0.3em]">
        {word}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="relative bg-core-black">
      {/* Progress indicator - desktop only */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3">
        {panels.map((panel, i) => (
          <button
            key={i}
            aria-label={`Go to section: ${panel.title}`}
            className="group flex items-center gap-3"
            onClick={() => {
              const target = panelRefs.current[i];
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {/* Label */}
            <span
              className={`text-xs font-medium tracking-wide uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                activeIndex === i ? "opacity-100 text-white" : "text-text-muted"
              }`}
            >
              {panel.number}
            </span>
            {/* Dot / line indicator */}
            <span
              className={`block rounded-full transition-all duration-500 ${
                activeIndex === i
                  ? "w-1.5 h-8 bg-white"
                  : "w-1.5 h-1.5 bg-text-muted/40 group-hover:bg-text-muted"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Panels */}
      {panels.map((panel, i) => (
        <div
          key={i}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
          className="relative min-h-screen flex items-center bg-core-black overflow-hidden"
        >
          {/* Large background number */}
          <div
            className="panel-number pointer-events-none absolute inset-0 flex items-center justify-center select-none"
            aria-hidden="true"
          >
            <span className="text-[20rem] md:text-[28rem] font-black text-white leading-none">
              {panel.number}
            </span>
          </div>

          {/* Content */}
          <div className="panel-content-wrapper relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-0">
            {/* Accent line */}
            <div
              className={`panel-accent-line h-[3px] w-20 mb-8 origin-left ${
                panel.accentGradient
                  ? "bg-gradient-to-r from-red-spark to-purple-dream"
                  : i === 0
                  ? "bg-red-spark"
                  : "bg-purple-dream"
              }`}
            />

            {/* Title */}
            <h2
              className={`panel-title text-3xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 ${
                panel.accentGradient
                  ? panel.accentGradient
                  : panel.accentClass
              }`}
            >
              {panel.title}
            </h2>

            {/* Body text with word-by-word reveal */}
            <div
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="text-lg md:text-xl lg:text-2xl text-desert-dune/90 leading-relaxed max-w-3xl"
            >
              {renderWords(panel.content)}
            </div>
          </div>

          {/* Decorative corner elements */}
          <div
            className={`absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 opacity-20 ${
              i === 0
                ? "border-red-spark"
                : i === 1
                ? "border-purple-dream"
                : "border-white"
            }`}
            aria-hidden="true"
          />
          <div
            className={`absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 opacity-20 ${
              i === 0
                ? "border-red-spark"
                : i === 1
                ? "border-purple-dream"
                : "border-white"
            }`}
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}
