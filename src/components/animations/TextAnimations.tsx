"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Letter by letter reveal animation
interface LetterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function LetterReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: LetterRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const letters = text.split("");

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ perspective: 1000 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ transformStyle: "preserve-3d" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Word by word reveal
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function WordReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.1,
  once = true,
}: WordRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span key={index} variants={child} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Line reveal with mask
interface LineRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down";
}

export function LineReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: LineRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: direction === "up" ? "100%" : "-100%" }}
        animate={isInView ? { y: 0 } : { y: direction === "up" ? "100%" : "-100%" }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Gradient text with animation
interface GradientTextProps {
  children: ReactNode;
  className?: string;
  from?: string;
  to?: string;
  animate?: boolean;
}

export function GradientText({
  children,
  className,
  from = "var(--red-spark)",
  to = "var(--purple-dream)",
  animate = false,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "text-transparent bg-clip-text",
        animate && "animate-gradient-x",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${to}, ${from})`,
        backgroundSize: animate ? "200% auto" : "100% auto",
      }}
    >
      {children}
    </span>
  );
}

// Typewriter effect
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export function Typewriter({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!ref.current || !isInView) return;

    const element = ref.current;
    element.textContent = "";

    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          element.textContent += text[index];
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay, isInView]);

  return (
    <span className={cn("inline-block", className)}>
      <span ref={ref} />
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
        />
      )}
    </span>
  );
}

// Glitch text effect
interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 -ml-[2px] text-red-spark opacity-70 animate-glitch-1"
        aria-hidden
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 ml-[2px] text-purple-dream opacity-70 animate-glitch-2"
        aria-hidden
      >
        {text}
      </span>
    </span>
  );
}

// Split text with GSAP
interface GsapSplitTextProps {
  children: string;
  className?: string;
  type?: "chars" | "words" | "lines";
  animation?: "fadeUp" | "fadeIn" | "scale" | "rotate";
  stagger?: number;
  duration?: number;
}

export function GsapSplitText({
  children,
  className,
  type = "chars",
  animation = "fadeUp",
  stagger = 0.02,
  duration = 0.6,
}: GsapSplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const text = children;

    // Split text based on type
    let elements: string[] = [];
    if (type === "chars") {
      elements = text.split("");
    } else if (type === "words") {
      elements = text.split(" ");
    } else {
      elements = text.split("\n");
    }

    // Create spans
    container.innerHTML = elements
      .map(
        (el, i) =>
          `<span class="inline-block overflow-hidden"><span class="split-element inline-block" style="display: inline-block">${
            el === " " ? "&nbsp;" : el
          }</span></span>${type === "words" ? "&nbsp;" : ""}`
      )
      .join("");

    const splitElements = container.querySelectorAll(".split-element");

    // Animation properties based on type
    const animations = {
      fadeUp: { from: { y: "100%", opacity: 0 }, to: { y: "0%", opacity: 1 } },
      fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      scale: { from: { scale: 0, opacity: 0 }, to: { scale: 1, opacity: 1 } },
      rotate: { from: { rotation: 90, opacity: 0 }, to: { rotation: 0, opacity: 1 } },
    };

    const anim = animations[animation];

    gsap.set(splitElements, anim.from);

    gsap.to(splitElements, {
      ...anim.to,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [children, type, animation, stagger, duration]);

  return <div ref={containerRef} className={className} />;
}

// Highlight text on scroll
interface HighlightTextProps {
  children: string;
  className?: string;
  highlightColor?: string;
}

export function HighlightText({
  children,
  className,
  highlightColor = "var(--red-spark)",
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.fromTo(
      element,
      {
        backgroundSize: "0% 100%",
      },
      {
        backgroundSize: "100% 100%",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <span
      ref={ref}
      className={cn("relative", className)}
      style={{
        backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 90%",
        backgroundSize: "0% 30%",
      }}
    >
      {children}
    </span>
  );
}
