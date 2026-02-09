"use client";

import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-core-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-spark/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-red-spark/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-spark"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Something Went Wrong
          </h1>
          <p className="text-text-muted text-lg max-w-md mx-auto mb-8">
            We encountered an unexpected error. Please try again.
          </p>

          <button
            onClick={reset}
            className="px-8 py-4 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300 hover:scale-105 glow-red"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    </section>
  );
}
