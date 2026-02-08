'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  trail: { x: number; y: number; opacity: number }[];
  exploded: boolean;
  particles: Particle[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
  maxLife: number;
  gravity: number;
  sparkle: boolean;
}

const colors = ['#E0251C', '#8232A7', '#FFD700', '#00FFFF', '#FF69B4', '#00FF00', '#FF4500', '#FFFFFF'];
const letters = ['B', 'C', 'E'];
const letterColors = ['#E0251C', '#8232A7', '#FFD700'];

const chaosPositions = [
  { x: -400, y: -200, rotation: -75, scale: 0.3 },
  { x: 450, y: 150, rotation: 60, scale: 0.35 },
  { x: -300, y: 250, rotation: -45, scale: 0.4 },
];

export default function BCEFireworksDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const sparklesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll();
  const assemblyProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  useEffect(() => {
    const unsubscribe = assemblyProgress.on('change', (value) => {
      setProgress(Math.min(1, Math.max(0, value)));
    });
    return () => unsubscribe();
  }, [assemblyProgress]);

  const createFirework = useCallback((x?: number) => {
    const startX = x ?? Math.random() * window.innerWidth;
    return {
      x: startX,
      y: window.innerHeight,
      targetY: Math.random() * (window.innerHeight * 0.5) + 100,
      vx: (Math.random() - 0.5) * 2,
      vy: -12 - Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: [],
      exploded: false,
      particles: [],
    };
  }, []);

  const explodeFirework = useCallback((firework: Firework) => {
    const particleCount = 80 + Math.floor(Math.random() * 40);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      const isSparkle = Math.random() > 0.7;

      particles.push({
        x: firework.x,
        y: firework.y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 2,
        color: isSparkle ? '#FFFFFF' : firework.color,
        size: isSparkle ? 2 : 3 + Math.random() * 2,
        life: 0,
        maxLife: 60 + Math.random() * 40,
        gravity: 0.05 + Math.random() * 0.05,
        sparkle: isSparkle,
      });
    }

    firework.particles = particles;
    firework.exploded = true;
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

    // Auto-launch fireworks
    const launchInterval = setInterval(() => {
      if (fireworksRef.current.length < 5) {
        fireworksRef.current.push(createFirework());
      }
    }, 800);

    // Click to launch
    const handleClick = (e: MouseEvent) => {
      fireworksRef.current.push(createFirework(e.clientX));
    };
    window.addEventListener('click', handleClick);

    const animate = () => {
      ctx.fillStyle = 'rgba(16, 24, 32, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw fireworks
      fireworksRef.current.forEach((firework, index) => {
        if (!firework.exploded) {
          // Draw trail
          firework.trail.push({ x: firework.x, y: firework.y, opacity: 1 });
          if (firework.trail.length > 15) firework.trail.shift();

          firework.trail.forEach((point, i) => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = firework.color + Math.floor((i / firework.trail.length) * 100).toString(16).padStart(2, '0');
            ctx.fill();
          });

          // Draw firework head
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();

          // Glow
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = firework.color + '44';
          ctx.fill();

          // Update position
          firework.x += firework.vx;
          firework.y += firework.vy;
          firework.vy += 0.15; // Gravity

          // Check if should explode
          if (firework.vy >= 0 || firework.y <= firework.targetY) {
            explodeFirework(firework);
          }
        } else {
          // Update and draw particles
          let allDead = true;

          firework.particles.forEach((particle) => {
            if (particle.life < particle.maxLife) {
              allDead = false;
              const lifeRatio = 1 - particle.life / particle.maxLife;

              // Sparkle effect
              if (particle.sparkle && Math.random() > 0.5) {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = '#FFFFFF' + Math.floor(lifeRatio * 255).toString(16).padStart(2, '0');
                ctx.fill();
              }

              // Main particle
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size * lifeRatio, 0, Math.PI * 2);
              ctx.fillStyle = particle.color + Math.floor(lifeRatio * 255).toString(16).padStart(2, '0');
              ctx.fill();

              // Glow
              ctx.beginPath();
              ctx.arc(particle.x, particle.y, particle.size * lifeRatio * 2, 0, Math.PI * 2);
              ctx.fillStyle = particle.color + '22';
              ctx.fill();

              // Update
              particle.x += particle.vx;
              particle.y += particle.vy;
              particle.vy += particle.gravity;
              particle.vx *= 0.98;
              particle.life++;
            }
          });

          if (allDead) {
            fireworksRef.current.splice(index, 1);
          }
        }
      });

      // Draw ambient sparkles
      if (Math.random() > 0.9) {
        sparklesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.7,
          vx: 0,
          vy: 0,
          color: '#FFFFFF',
          size: Math.random() * 2 + 1,
          life: 0,
          maxLife: 30 + Math.random() * 30,
          gravity: 0,
          sparkle: true,
        });
      }

      sparklesRef.current.forEach((sparkle, index) => {
        const lifeRatio = 1 - sparkle.life / sparkle.maxLife;
        const twinkle = Math.sin(sparkle.life * 0.5) * 0.5 + 0.5;

        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkle.size * twinkle, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${lifeRatio * twinkle})`;
        ctx.fill();

        sparkle.life++;
        if (sparkle.life >= sparkle.maxLife) {
          sparklesRef.current.splice(index, 1);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      clearInterval(launchInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createFirework, explodeFirework]);

  return (
    <div ref={containerRef} className="min-h-[250vh] bg-core-black relative overflow-hidden">
      {/* Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Letters */}
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="relative flex items-center justify-center">
          {letters.map((letter, index) => {
            const chaos = chaosPositions[index];
            const currentX = chaos.x * (1 - progress);
            const currentY = chaos.y * (1 - progress);
            const currentRotation = chaos.rotation * (1 - progress);
            const currentScale = chaos.scale + (1 - chaos.scale) * progress;
            const currentOpacity = 0.2 + 0.8 * progress;

            return (
              <motion.span
                key={index}
                className="text-[8rem] sm:text-[10rem] md:text-[14rem] lg:text-[18rem] font-black inline-block"
                style={{
                  color: letterColors[index],
                  textShadow: progress > 0.7
                    ? `0 0 80px ${letterColors[index]}, 0 0 120px ${letterColors[index]}80, 0 0 160px ${letterColors[index]}40`
                    : `0 0 30px ${letterColors[index]}60`,
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

        {/* Tagline */}
        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center w-full px-6"
          style={{
            opacity: progress > 0.85 ? (progress - 0.85) * 6.67 : 0,
          }}
        >
          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
            Celebrate Every Moment
          </p>
          <p className="text-white/50 text-sm mb-8">Click anywhere to launch fireworks!</p>
          <div className="flex gap-4 justify-center pointer-events-auto">
            <button className="px-8 py-4 bg-gradient-to-r from-red-spark to-yellow-500 text-white font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-red-spark/30">
              Let&apos;s Celebrate
            </button>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <div className="w-1 h-16 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-yellow-400 via-red-spark to-purple-dream rounded-full"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
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
        <section className="min-h-screen bg-gradient-to-b from-transparent to-core-black flex items-center justify-center px-6">
          <motion.div
            className="max-w-4xl text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Make It <span className="text-yellow-400">Spectacular</span>
            </h2>
            <p className="text-white/70 text-xl">
              Every event deserves a grand finale. We create moments that light up the sky.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
