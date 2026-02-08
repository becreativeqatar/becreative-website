'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';

export default function StageRevealDemo() {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Auto-open curtains after a brief pause
    const timer = setTimeout(() => {
      setCurtainsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (curtainsOpen) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [curtainsOpen]);

  // Spotlight follows mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Sweeping spotlights animation
  useEffect(() => {
    if (!showContent) return;

    const ctx = gsap.context(() => {
      gsap.to('.spotlight-1', {
        x: '100vw',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
      gsap.to('.spotlight-2', {
        x: '-100vw',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1,
      });
    });

    return () => ctx.revert();
  }, [showContent]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-core-black overflow-hidden relative"
      style={{ cursor: 'none' }}
    >
      {/* Custom Spotlight Cursor */}
      <div
        className="fixed pointer-events-none z-[100] mix-blend-overlay"
        style={{
          left: mousePos.x - 100,
          top: mousePos.y - 100,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Sweeping Spotlights */}
      {showContent && (
        <>
          <div
            className="spotlight-1 fixed top-0 left-0 w-[300px] h-full pointer-events-none z-20 opacity-20"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(224,37,28,0.3) 50%, transparent)',
              transform: 'translateX(-100vw)',
            }}
          />
          <div
            className="spotlight-2 fixed top-0 right-0 w-[300px] h-full pointer-events-none z-20 opacity-20"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(130,50,167,0.3) 50%, transparent)',
              transform: 'translateX(100vw)',
            }}
          />
        </>
      )}

      {/* Stage Lights at Top */}
      <div className="fixed top-0 left-0 right-0 h-20 flex justify-around items-start z-30 pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative"
          >
            <div className="w-8 h-12 bg-gray-800 rounded-b-lg" />
            <div
              className="absolute top-12 left-1/2 -translate-x-1/2 w-[200px] h-[400px] opacity-10"
              style={{
                background: `linear-gradient(to bottom, ${i % 2 === 0 ? '#E0251C' : '#8232A7'}, transparent)`,
                clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Curtains */}
      <AnimatePresence>
        {/* Left Curtain */}
        <motion.div
          className="fixed top-0 left-0 h-full w-1/2 z-40"
          initial={{ x: 0 }}
          animate={{ x: curtainsOpen ? '-100%' : 0 }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Curtain Folds */}
          <div className="h-full w-full relative overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full"
                style={{
                  left: `${i * 12.5}%`,
                  width: '14%',
                  background: `linear-gradient(to right, #6B0F1A ${i % 2 === 0 ? '0%' : '20%'}, #8B1538 50%, #6B0F1A ${i % 2 === 0 ? '100%' : '80%'})`,
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
                }}
              />
            ))}
            {/* Gold trim */}
            <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700" />
          </div>
        </motion.div>

        {/* Right Curtain */}
        <motion.div
          className="fixed top-0 right-0 h-full w-1/2 z-40"
          initial={{ x: 0 }}
          animate={{ x: curtainsOpen ? '100%' : 0 }}
          transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="h-full w-full relative overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 h-full"
                style={{
                  left: `${i * 12.5}%`,
                  width: '14%',
                  background: `linear-gradient(to right, #6B0F1A ${i % 2 === 0 ? '0%' : '20%'}, #8B1538 50%, #6B0F1A ${i % 2 === 0 ? '100%' : '80%'})`,
                  boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)',
                }}
              />
            ))}
            {/* Gold trim */}
            <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-700" />
          </div>
        </motion.div>

        {/* Top Valance */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-24 z-50"
          initial={{ y: 0 }}
          animate={{ y: curtainsOpen ? -20 : 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div
            className="h-full w-full"
            style={{
              background: 'linear-gradient(to bottom, #6B0F1A, #4A0A12)',
              borderBottom: '8px solid #C9A227',
            }}
          />
          {/* Decorative swags */}
          <div className="absolute bottom-0 left-0 right-0 h-16 flex">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex-1"
                style={{
                  background: 'radial-gradient(ellipse at top, #8B1538, transparent)',
                  borderBottom: '4px solid #C9A227',
                  borderRadius: '0 0 50% 50%',
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 min-h-screen flex flex-col"
          >
            {/* Back Button */}
            <header className="p-6 relative z-50">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 text-desert-dune hover:text-white transition-colors"
                style={{ cursor: 'none' }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Concepts
              </Link>
            </header>

            {/* Hero Content */}
            <main className="flex-1 flex items-center justify-center px-6">
              <div className="text-center max-w-5xl">
                {/* Dramatic Title Reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <motion.span
                    className="inline-block text-red-spark text-lg tracking-[0.3em] uppercase mb-8"
                    initial={{ opacity: 0, letterSpacing: '0.5em' }}
                    animate={{ opacity: 1, letterSpacing: '0.3em' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    Welcome to the Show
                  </motion.span>
                </motion.div>

                <div className="overflow-hidden mb-8">
                  <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-bold text-white"
                    initial={{ y: 200, rotateX: -90 }}
                    animate={{ y: 0, rotateX: 0 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Be{' '}
                    <span className="bg-gradient-to-r from-red-spark via-purple-dream to-red-spark bg-clip-text text-transparent">
                      Creative
                    </span>
                  </motion.h1>
                </div>

                <motion.p
                  className="text-xl md:text-2xl text-desert-dune/80 max-w-2xl mx-auto mb-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  Where every event is a grand performance, and every moment is designed to captivate.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-wrap gap-6 justify-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.8 }}
                >
                  <button className="group relative px-8 py-4 bg-red-spark text-white font-semibold rounded-full overflow-hidden transition-transform hover:scale-105">
                    <span className="relative z-10">Enter the Stage</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-dream to-red-spark opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                  <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all hover:border-white/60">
                    View Our Productions
                  </button>
                </motion.div>
              </div>
            </main>

            {/* Scroll Indicator */}
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-2 text-desert-dune/50"
              >
                <span className="text-sm tracking-widest uppercase">Scroll for More</span>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pre-curtain Teaser */}
      <AnimatePresence>
        {!curtainsOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="text-2xl text-white/80 tracking-widest"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              The show is about to begin...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
