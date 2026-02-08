"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface CustomCursorProps {
  className?: string;
  size?: number;
  color?: string;
  mixBlendMode?: boolean;
}

export default function CustomCursor({
  className,
  size = 20,
  color = "#E0251C",
  mixBlendMode = true,
}: CustomCursorProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Only show custom cursor on non-touch devices
    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest("[data-cursor]");

      if (cursorType) {
        const type = cursorType.getAttribute("data-cursor");
        const text = cursorType.getAttribute("data-cursor-text") || "";

        setIsHovering(true);
        setCursorText(text);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorText("");
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [mounted, cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={cn(
          "fixed top-0 left-0 pointer-events-none z-[9999] rounded-full",
          mixBlendMode && "mix-blend-difference",
          className
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? size * 3 : size,
          height: isHovering ? size * 3 : size,
          backgroundColor: color,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {cursorText && (
          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white mix-blend-difference">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/30"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: isHovering ? size * 4 : size * 2,
          height: isHovering ? size * 4 : size * 2,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 0.5 : 0,
        }}
      />

      {/* Hide default cursor globally */}
      <style jsx global>{`
        @media (hover: hover) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}

// Wrapper to enable cursor effects on elements
interface CursorHoverProps {
  children: React.ReactNode;
  className?: string;
  text?: string;
}

export function CursorHover({ children, className, text }: CursorHoverProps) {
  return (
    <div
      className={cn(className)}
      data-cursor="hover"
      data-cursor-text={text}
    >
      {children}
    </div>
  );
}
