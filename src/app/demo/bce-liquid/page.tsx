'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const letters = ['B', 'C', 'E'];
const letterColors = ['#E0251C', '#8232A7', '#3498DB'];

const chaosPositions = [
  { x: -300, y: -150, rotation: -45, scale: 0.4 },
  { x: 350, y: 100, rotation: 40, scale: 0.45 },
  { x: -200, y: 180, rotation: -30, scale: 0.4 },
];

interface Blob {
  x: number;
  y: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  phase: number;
}

export default function BCELiquidDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobsRef = useRef<Blob[]>([]);
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

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

    // Initialize blobs
    const colors = ['#E0251C', '#8232A7', '#3498DB', '#2ECC71', '#F39C12'];
    blobsRef.current = [];
    for (let i = 0; i < 8; i++) {
      blobsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 150 + Math.random() * 200,
        color: colors[i % colors.length],
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const animate = () => {
      timeRef.current += 0.01;

      // Clear with gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#0a0a15');
      bgGradient.addColorStop(1, '#15101f');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw blobs
      blobsRef.current.forEach((blob, index) => {
        // Move towards mouse gently
        const dx = mousePos.x - blob.x;
        const dy = mousePos.y - blob.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
          blob.vx += (dx / dist) * 0.02;
          blob.vy += (dy / dist) * 0.02;
        }

        // Apply velocity
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Friction
        blob.vx *= 0.99;
        blob.vy *= 0.99;

        // Bounce off edges
        if (blob.x < -blob.radius) blob.x = canvas.width + blob.radius;
        if (blob.x > canvas.width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = canvas.height + blob.radius;
        if (blob.y > canvas.height + blob.radius) blob.y = -blob.radius;

        // Animate radius
        const animatedRadius = blob.radius + Math.sin(timeRef.current * 2 + blob.phase) * 30;

        // Draw blob with gradient
        const gradient = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, animatedRadius
        );
        gradient.addColorStop(0, blob.color + '60');
        gradient.addColorStop(0.5, blob.color + '30');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, animatedRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Apply blur effect via composite
      ctx.globalCompositeOperation = 'lighter';

      // Draw metaball connections
      blobsRef.current.forEach((blob1, i) => {
        blobsRef.current.slice(i + 1).forEach((blob2) => {
          const dx = blob2.x - blob1.x;
          const dy = blob2.y - blob1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = blob1.radius + blob2.radius;

          if (dist < maxDist) {
            const strength = 1 - dist / maxDist;
            const midX = (blob1.x + blob2.x) / 2;
            const midY = (blob1.y + blob2.y) / 2;

            const gradient = ctx.createRadialGradient(
              midX, midY, 0,
              midX, midY, dist / 2
            );
            gradient.addColorStop(0, blob1.color + Math.floor(strength * 40).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.arc(midX, midY, dist / 2, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        });
      });

      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos]);

  return (
    <div ref={containerRef} className="min-h-[250vh] bg-[#0a0a15] relative overflow-hidden">
      {/* Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" style={{ filter: 'blur(40px)' }} />

      {/* Sharper overlay canvas */}
      <div className="fixed inset-0 z-[1] backdrop-blur-sm" />

      {/* Content */}
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* Letters with liquid morph effect */}
        <div className="relative flex items-center justify-center">
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
                className="text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black inline-block"
                style={{
                  color: letterColors[index],
                  textShadow: `0 0 60px ${letterColors[index]}80, 0 0 100px ${letterColors[index]}40`,
                  x: currentX,
                  y: currentY,
                  rotate: currentRotation,
                  scale: currentScale,
                  opacity: currentOpacity,
                  filter: progress < 0.8 ? `blur(${(1 - progress) * 4}px)` : 'none',
                }}
              >
                {letter}
              </motion.span>
            );
          })}
        </div>

        {/* Tagline */}
        <motion.div
          className="absolute bottom-36 left-1/2 -translate-x-1/2 text-center w-full px-6"
          style={{
            opacity: progress > 0.85 ? (progress - 0.85) * 6.67 : 0,
          }}
        >
          <p className="text-2xl md:text-3xl text-white/80 mb-8 font-light">
            Fluid creativity, seamless experiences
          </p>
          <div className="flex gap-4 justify-center pointer-events-auto">
            <button className="px-10 py-4 bg-gradient-to-r from-purple-dream to-blue-500 text-white font-semibold rounded-full hover:scale-105 transition-transform shadow-lg shadow-purple-dream/30">
              Flow With Us
            </button>
            <button className="px-10 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Liquid progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#liquidGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={283}
                strokeDashoffset={283 - 283 * progress}
              />
              <defs>
                <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E0251C" />
                  <stop offset="50%" stopColor="#8232A7" />
                  <stop offset="100%" stopColor="#3498DB" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-white/60 text-xs">
              {Math.round(progress * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 z-50">
        <Link
          href="/demo"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
      </header>

      {/* Extended content */}
      <div className="relative z-20 pt-[200vh]">
        <section className="min-h-screen bg-gradient-to-b from-transparent to-[#0a0a15] flex items-center justify-center px-6">
          <motion.div
            className="max-w-4xl text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Seamlessly <span className="text-purple-dream">Flowing</span>
            </h2>
            <p className="text-white/70 text-xl">
              Like water, we adapt to every challenge and shape extraordinary experiences.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
