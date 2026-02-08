'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const letters = ['B', 'C', 'E'];
const letterColors = ['#FF0080', '#00FFFF', '#FFFF00'];
const glowColors = ['#FF0080', '#00FFFF', '#FFFF00'];

const chaosPositions = [
  { x: -350, y: -180, rotation: -60, scale: 0.35 },
  { x: 400, y: 120, rotation: 50, scale: 0.4 },
  { x: -280, y: 200, rotation: -40, scale: 0.35 },
];

export default function BCENeonDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [flickerStates, setFlickerStates] = useState([1, 1, 1]);

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

  // Neon flicker effect
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      setFlickerStates(prev => prev.map(() =>
        Math.random() > 0.95 ? 0.7 + Math.random() * 0.3 : 1
      ));
    }, 100);
    return () => clearInterval(flickerInterval);
  }, []);

  // Grid animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let offset = 0;
    const animate = () => {
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated grid
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      const gridSize = 60;
      offset = (offset + 0.5) % gridSize;

      // Horizontal lines
      for (let y = -gridSize + offset; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let x = -gridSize + offset; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Glow at mouse position
      const gradient = ctx.createRadialGradient(
        mousePos.x, mousePos.y, 0,
        mousePos.x, mousePos.y, 200
      );
      gradient.addColorStop(0, 'rgba(255, 0, 128, 0.15)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.05)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [mousePos]);

  return (
    <div ref={containerRef} className="min-h-[250vh] bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated Grid Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Scan lines overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-20"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />

      {/* Content */}
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* Neon Letters */}
        <div className="relative flex items-center justify-center">
          {letters.map((letter, index) => {
            const chaos = chaosPositions[index];
            const currentX = chaos.x * (1 - progress);
            const currentY = chaos.y * (1 - progress);
            const currentRotation = chaos.rotation * (1 - progress);
            const currentScale = chaos.scale + (1 - chaos.scale) * progress;
            const currentOpacity = (0.3 + 0.7 * progress) * flickerStates[index];
            const color = letterColors[index];
            const glow = glowColors[index];

            return (
              <motion.span
                key={index}
                className="text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black inline-block"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: `3px ${color}`,
                  textShadow: progress > 0.5
                    ? `0 0 10px ${glow}, 0 0 20px ${glow}, 0 0 40px ${glow}, 0 0 80px ${glow}, 0 0 120px ${glow}80`
                    : `0 0 10px ${glow}60`,
                  x: currentX,
                  y: currentY,
                  rotate: currentRotation,
                  scale: currentScale,
                  opacity: currentOpacity,
                  filter: `brightness(${flickerStates[index]})`,
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>

        {/* Subtitle with neon effect */}
        <motion.div
          className="absolute bottom-36 left-1/2 -translate-x-1/2 text-center w-full px-6"
          style={{
            opacity: progress > 0.85 ? (progress - 0.85) * 6.67 : 0,
          }}
        >
          <p
            className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase mb-10"
            style={{
              color: '#00FFFF',
              textShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 40px #00FFFF',
            }}
          >
            Be Creative Events
          </p>
          <div className="flex gap-6 justify-center pointer-events-auto">
            <button
              className="px-10 py-4 font-bold tracking-wider uppercase transition-all hover:scale-105"
              style={{
                background: 'transparent',
                border: '2px solid #FF0080',
                color: '#FF0080',
                textShadow: '0 0 10px #FF0080',
                boxShadow: '0 0 20px #FF008040, inset 0 0 20px #FF008020',
              }}
            >
              Enter
            </button>
            <button
              className="px-10 py-4 font-bold tracking-wider uppercase transition-all hover:scale-105"
              style={{
                background: 'transparent',
                border: '2px solid #00FFFF',
                color: '#00FFFF',
                textShadow: '0 0 10px #00FFFF',
                boxShadow: '0 0 20px #00FFFF40, inset 0 0 20px #00FFFF20',
              }}
            >
              Explore
            </button>
          </div>
        </motion.div>

        {/* Neon progress bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div
            className="w-40 h-1 rounded-full overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.1)',
              boxShadow: '0 0 10px rgba(0,255,255,0.3)',
            }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #FF0080, #00FFFF, #FFFF00)',
                boxShadow: '0 0 20px #00FFFF',
              }}
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 z-50">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 transition-colors"
          style={{ color: '#00FFFF', textShadow: '0 0 10px #00FFFF' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
      </header>

      {/* Extended content */}
      <div className="relative z-20 pt-[200vh]">
        <section className="min-h-screen bg-gradient-to-b from-transparent to-[#0a0a0f] flex items-center justify-center px-6">
          <motion.div
            className="max-w-4xl text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-5xl md:text-6xl font-bold mb-6"
              style={{
                color: '#FF0080',
                textShadow: '0 0 20px #FF0080, 0 0 40px #FF008080',
              }}
            >
              Electric Dreams
            </h2>
            <p
              className="text-xl"
              style={{ color: '#00FFFF', textShadow: '0 0 10px #00FFFF60' }}
            >
              Events that pulse with energy and glow with possibility.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
