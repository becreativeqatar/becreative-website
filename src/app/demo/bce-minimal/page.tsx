'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// Letter configurations for "BCE"
const letters = ['B', 'C', 'E'];
const letterColors = ['#E0251C', '#8232A7', '#D7D1CA'];

// Subtle chaos positions
const chaosPositions = [
  { x: -150, y: -80, rotation: -15, scale: 0.7 },
  { x: 180, y: 60, rotation: 12, scale: 0.75 },
  { x: -100, y: 100, rotation: -8, scale: 0.7 },
];

export default function BCEMinimalDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const assemblyProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    const unsubscribe = assemblyProgress.on('change', (value) => {
      setProgress(Math.min(1, Math.max(0, value)));
    });
    return () => unsubscribe();
  }, [assemblyProgress]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="min-h-[250vh] bg-[#FAFAFA] relative">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Subtle mouse follower */}
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-[1] mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle, rgba(224,37,28,0.05) 0%, transparent 70%)',
          left: mousePos.x - 128,
          top: mousePos.y - 128,
        }}
        animate={{
          left: mousePos.x - 128,
          top: mousePos.y - 128,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      {/* Fixed Content */}
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* Letters */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8">
          {letters.map((letter, index) => {
            const chaos = chaosPositions[index];
            const currentX = chaos.x * (1 - progress);
            const currentY = chaos.y * (1 - progress);
            const currentRotation = chaos.rotation * (1 - progress);
            const currentScale = chaos.scale + (1 - chaos.scale) * progress;
            const currentOpacity = 0.3 + 0.7 * progress;

            return (
              <motion.span
                key={index}
                className="text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem] font-extralight inline-block tracking-tighter"
                style={{
                  color: letterColors[index],
                  x: currentX,
                  y: currentY,
                  rotate: currentRotation,
                  scale: currentScale,
                  opacity: currentOpacity,
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>

        {/* Minimal tagline */}
        <motion.div
          className="absolute bottom-40 left-1/2 -translate-x-1/2 text-center"
          style={{
            opacity: progress > 0.85 ? (progress - 0.85) * 6.67 : 0,
          }}
        >
          <p className="text-lg md:text-xl text-gray-500 font-light tracking-wide mb-8">
            Be Creative Events
          </p>
          <div className="flex gap-4 justify-center pointer-events-auto">
            <button className="px-8 py-3 bg-core-black text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors">
              EXPLORE
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 text-sm font-medium tracking-wider hover:border-gray-500 transition-colors">
              CONTACT
            </button>
          </div>
        </motion.div>

        {/* Minimal progress line */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
          <div className="w-32 h-px bg-gray-200 relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-core-black"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 z-50">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
      </header>

      {/* Scroll content */}
      <div className="relative z-20 pt-[200vh]">
        <section className="min-h-screen bg-white flex items-center justify-center px-6">
          <motion.div
            className="max-w-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extralight text-gray-900 mb-6">
              Less is more
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              We believe in the power of simplicity. Clean designs,
              thoughtful experiences, lasting impressions.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
