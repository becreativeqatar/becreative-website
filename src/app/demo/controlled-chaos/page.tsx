'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Scattered letter positions (chaos state)
const chaosPositions = [
  { x: -300, y: -200, rotation: -45, scale: 0.5 },
  { x: 400, y: -150, rotation: 30, scale: 0.7 },
  { x: -200, y: 100, rotation: -20, scale: 0.6 },
  { x: 350, y: 200, rotation: 50, scale: 0.8 },
  { x: -400, y: -50, rotation: -60, scale: 0.5 },
  { x: 250, y: -250, rotation: 15, scale: 0.6 },
  { x: -150, y: 250, rotation: -35, scale: 0.7 },
  { x: 300, y: 50, rotation: 40, scale: 0.5 },
  { x: -350, y: 150, rotation: -25, scale: 0.6 },
  { x: 150, y: -100, rotation: 55, scale: 0.8 },
  { x: -100, y: -200, rotation: -10, scale: 0.7 },
];

const letters = ['B', 'E', ' ', 'C', 'R', 'E', 'A', 'T', 'I', 'V', 'E'];
const colors = ['#E0251C', '#8232A7', '#FFFFFF', '#E0251C', '#8232A7', '#FFFFFF', '#E0251C', '#8232A7', '#FFFFFF', '#E0251C', '#8232A7'];

// Floating shapes for chaos
const shapes = [
  { type: 'circle', size: 100, x: '10%', y: '20%', color: '#E0251C', delay: 0 },
  { type: 'square', size: 80, x: '80%', y: '30%', color: '#8232A7', delay: 0.2 },
  { type: 'triangle', size: 120, x: '20%', y: '70%', color: '#3498DB', delay: 0.4 },
  { type: 'circle', size: 60, x: '70%', y: '60%', color: '#F39C12', delay: 0.6 },
  { type: 'square', size: 90, x: '40%', y: '15%', color: '#2ECC71', delay: 0.8 },
  { type: 'triangle', size: 70, x: '85%', y: '80%', color: '#E74C3C', delay: 1 },
  { type: 'circle', size: 50, x: '5%', y: '50%', color: '#9B59B6', delay: 1.2 },
  { type: 'square', size: 110, x: '60%', y: '85%', color: '#1ABC9C', delay: 1.4 },
];

export default function ControlledChaosDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  // Map scroll to progress
  const assemblyProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    const unsubscribe = assemblyProgress.on('change', (value) => {
      setProgress(value);
    });
    return () => unsubscribe();
  }, [assemblyProgress]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate shapes to assemble
      gsap.utils.toArray('.chaos-shape').forEach((shape, i) => {
        gsap.to(shape as Element, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '50% top',
            scrub: 1,
          },
          x: 0,
          y: 0,
          rotation: 0,
          scale: 0,
          opacity: 0,
        });
      });

      // Animate letters to form word
      gsap.utils.toArray('.chaos-letter').forEach((letter, i) => {
        gsap.to(letter as Element, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '50% top',
            scrub: 1,
          },
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[300vh] bg-core-black relative">
      {/* Fixed Hero Section */}
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden">
        {/* Floating Chaos Shapes */}
        {shapes.map((shape, index) => (
          <motion.div
            key={index}
            className="chaos-shape absolute pointer-events-none"
            style={{
              left: shape.x,
              top: shape.y,
            }}
            initial={{
              x: (Math.random() - 0.5) * 500,
              y: (Math.random() - 0.5) * 500,
              rotation: Math.random() * 360,
              scale: 1,
              opacity: 0.6,
            }}
            animate={{
              x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
              y: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100],
              rotation: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: shape.delay,
            }}
          >
            {shape.type === 'circle' && (
              <div
                className="rounded-full"
                style={{
                  width: shape.size,
                  height: shape.size,
                  border: `3px solid ${shape.color}`,
                  opacity: 0.4,
                }}
              />
            )}
            {shape.type === 'square' && (
              <div
                style={{
                  width: shape.size,
                  height: shape.size,
                  border: `3px solid ${shape.color}`,
                  opacity: 0.4,
                }}
              />
            )}
            {shape.type === 'triangle' && (
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid ${shape.color}`,
                  opacity: 0.4,
                }}
              />
            )}
          </motion.div>
        ))}

        {/* Letters Container */}
        <div ref={lettersRef} className="relative flex items-center justify-center">
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
                className="chaos-letter text-7xl md:text-9xl lg:text-[12rem] font-bold inline-block"
                style={{
                  color: colors[index],
                  textShadow: progress > 0.8 ? `0 0 40px ${colors[index]}80` : 'none',
                  x: currentX,
                  y: currentY,
                  rotate: currentRotation,
                  scale: currentScale,
                  opacity: currentOpacity,
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            );
          })}
        </div>

        {/* Tagline that appears as text assembles */}
        <motion.div
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 text-center"
          style={{
            opacity: progress > 0.8 ? (progress - 0.8) * 5 : 0,
            y: progress > 0.8 ? 0 : 50,
          }}
        >
          <p className="text-2xl md:text-3xl text-desert-dune/80 mb-8">
            We turn chaos into unforgettable experiences
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-red-spark text-white font-semibold rounded-full hover:scale-105 transition-transform">
              Start Your Journey
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all">
              View Our Work
            </button>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-4">
            <div className="w-1 h-20 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-red-spark to-purple-dream rounded-full"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
            <span className="text-desert-dune/50 text-sm">
              {progress < 0.5 ? 'Scroll to create order' : 'Keep scrolling'}
            </span>
          </div>
        </div>

        {/* Chaos/Order Label */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span
              className={`text-lg font-medium transition-colors ${progress < 0.5 ? 'text-red-spark' : 'text-desert-dune/50'}`}
            >
              CHAOS
            </span>
            <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-spark to-purple-dream"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span
              className={`text-lg font-medium transition-colors ${progress >= 0.5 ? 'text-purple-dream' : 'text-desert-dune/50'}`}
            >
              ORDER
            </span>
          </motion.div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 z-50">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 text-desert-dune hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Concepts
        </Link>
      </header>

      {/* Content after scroll */}
      <div className="relative z-20 pt-[200vh]">
        <section className="min-h-screen bg-gradient-to-b from-core-black to-purple-dream/20 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
                From Concept to{' '}
                <span className="bg-gradient-to-r from-red-spark to-purple-dream bg-clip-text text-transparent">
                  Reality
                </span>
              </h2>
              <p className="text-xl text-desert-dune/80 mb-12 leading-relaxed">
                Every great event starts as an idea — scattered thoughts, wild concepts, and boundless imagination.
                We take that creative chaos and transform it into perfectly orchestrated experiences.
              </p>

              {/* Process Steps */}
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                {[
                  { step: '01', title: 'Ideate', desc: 'Embrace the chaos of creativity' },
                  { step: '02', title: 'Design', desc: 'Shape the vision into form' },
                  { step: '03', title: 'Execute', desc: 'Deliver flawless experiences' },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    className="p-8 rounded-2xl bg-white/5 border border-white/10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <span className="text-5xl font-bold text-red-spark/30">{item.step}</span>
                    <h3 className="text-2xl font-bold text-white mt-4 mb-2">{item.title}</h3>
                    <p className="text-desert-dune/70">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
