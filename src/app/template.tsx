"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Branded color overlay transition */}
      <motion.div
        className="fixed inset-0 z-[9990] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
        style={{ originY: 0, background: "linear-gradient(135deg, #E0251C, #8232A7)" }}
      />
      <motion.div
        className="fixed inset-0 z-[9989] pointer-events-none bg-core-black"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2,
        }}
        style={{ originY: 0 }}
      />
      {children}
    </motion.div>
  );
}
