"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-core-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-spark/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-dream/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Large 404 */}
          <div className="relative mb-8">
            <span className="text-[12rem] md:text-[16rem] font-bold leading-none text-white/[0.03] select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-6xl md:text-8xl font-bold">
                <span className="text-red-spark">4</span>
                <span className="text-white">0</span>
                <span className="text-purple-dream">4</span>
              </h1>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-text-muted text-lg max-w-md mx-auto mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-4 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300 hover:scale-105 glow-red"
            >
              Go Home
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded transition-all duration-300 hover:bg-white/5"
            >
              View Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
