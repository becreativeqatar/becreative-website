"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        variants={{
          initialState: {
            opacity: 0,
            y: 20,
          },
          animateState: {
            opacity: 1,
            y: 0,
          },
          exitState: {
            opacity: 0,
            y: -20,
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Overlay transition (slides over content)
export function PageTransitionOverlay({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key={pathname}>
          {/* Page content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {children}
          </motion.div>

          {/* Slide overlay - enters */}
          <motion.div
            className="fixed inset-0 bg-red-spark z-[100] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Slide overlay - exits */}
          <motion.div
            className="fixed inset-0 bg-red-spark z-[100] origin-right"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// Curtain transition (two panels)
export function PageTransitionCurtain({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Page content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {children}
        </motion.div>

        {/* Left curtain */}
        <motion.div
          className="fixed top-0 left-0 w-1/2 h-full bg-core-black z-[100]"
          initial={{ x: "-100%" }}
          animate={{ x: "-100%" }}
          exit={{ x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="fixed top-0 left-0 w-1/2 h-full bg-core-black z-[100]"
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />

        {/* Right curtain */}
        <motion.div
          className="fixed top-0 right-0 w-1/2 h-full bg-core-black z-[100]"
          initial={{ x: "100%" }}
          animate={{ x: "100%" }}
          exit={{ x: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="fixed top-0 right-0 w-1/2 h-full bg-core-black z-[100]"
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
