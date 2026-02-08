"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis to window for GSAP ScrollTrigger integration
    if (typeof window !== "undefined") {
      (window as Window & { lenis?: Lenis }).lenis = lenis;
    }

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return <>{children}</>;
}

// Hook to access Lenis instance
export function useLenis() {
  if (typeof window !== "undefined") {
    return (window as Window & { lenis?: Lenis }).lenis;
  }
  return null;
}

// Scroll to element utility
export function scrollToElement(target: string | HTMLElement, offset = 0) {
  if (typeof window !== "undefined") {
    const lenis = (window as Window & { lenis?: Lenis }).lenis;
    if (lenis) {
      lenis.scrollTo(target, { offset });
    }
  }
}
