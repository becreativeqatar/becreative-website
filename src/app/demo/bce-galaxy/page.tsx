'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const letters = ['B', 'C', 'E'];
const letterColors = ['#FFD700', '#FF69B4', '#00CED1'];

const chaosPositions = [
  { x: -380, y: -180, rotation: -55, scale: 0.35 },
  { x: 420, y: 140, rotation: 50, scale: 0.4 },
  { x: -280, y: 220, rotation: -35, scale: 0.35 },
];

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  maxLife: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export default function BCEGalaxyDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const nebulasRef = useRef<Nebula[]>([]);
  const [progress, setProgress] = useState(0);
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

    // Initialize stars
    starsRef.current = [];
    for (let i = 0; i < 400; i++) {
      starsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.05 + 0.02,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Initialize nebulas
    const nebulaColors = ['#FF69B4', '#8A2BE2', '#00CED1', '#FFD700'];
    nebulasRef.current = [];
    for (let i = 0; i < 4; i++) {
      nebulasRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 200 + Math.random() * 300,
        color: nebulaColors[i],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.001,
      });
    }

    const animate = () => {
      timeRef.current += 0.016;

      // Deep space background
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      bgGradient.addColorStop(0, '#0a0a18');
      bgGradient.addColorStop(0.5, '#050510');
      bgGradient.addColorStop(1, '#000005');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebulas
      nebulasRef.current.forEach((nebula) => {
        nebula.rotation += nebula.rotationSpeed;

        ctx.save();
        ctx.translate(nebula.x, nebula.y);
        ctx.rotate(nebula.rotation);

        // Multiple layers for depth
        for (let layer = 0; layer < 3; layer++) {
          const layerRadius = nebula.radius * (1 - layer * 0.2);
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, layerRadius);
          gradient.addColorStop(0, nebula.color + '15');
          gradient.addColorStop(0.3, nebula.color + '08');
          gradient.addColorStop(0.6, nebula.color + '03');
          gradient.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.ellipse(0, 0, layerRadius, layerRadius * 0.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.restore();

        // Slowly drift
        nebula.x += Math.sin(timeRef.current * 0.1) * 0.2;
        nebula.y += Math.cos(timeRef.current * 0.1) * 0.1;
      });

      // Draw stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(timeRef.current * star.twinkleSpeed * 60 + star.twinklePhase) * 0.5 + 0.5;
        const currentOpacity = star.opacity * twinkle;

        // Star glow
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(200, 220, 255, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });

      // Spawn shooting stars occasionally
      if (Math.random() > 0.995) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.3,
          vx: 8 + Math.random() * 8,
          vy: 4 + Math.random() * 4,
          length: 80 + Math.random() * 120,
          life: 0,
          maxLife: 60 + Math.random() * 40,
        });
      }

      // Draw shooting stars
      shootingStarsRef.current.forEach((star, index) => {
        const lifeRatio = 1 - star.life / star.maxLife;

        // Trail
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.vx * 10, star.y - star.vy * 10
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${lifeRatio})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * 10, star.y - star.vy * 10);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${lifeRatio})`;
        ctx.fill();

        // Update
        star.x += star.vx;
        star.y += star.vy;
        star.life++;

        if (star.life >= star.maxLife || star.x > canvas.width || star.y > canvas.height) {
          shootingStarsRef.current.splice(index, 1);
        }
      });

      // Central galaxy spiral hint
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(timeRef.current * 0.02);

      const spiralGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 300);
      spiralGradient.addColorStop(0, 'rgba(255, 215, 0, 0.05)');
      spiralGradient.addColorStop(0.5, 'rgba(255, 105, 180, 0.02)');
      spiralGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(0, 0, 300, 0, Math.PI * 2);
      ctx.fillStyle = spiralGradient;
      ctx.fill();
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-[250vh] bg-[#000005] relative overflow-hidden">
      {/* Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Content */}
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* Cosmic Letters */}
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
                  textShadow: progress > 0.6
                    ? `0 0 30px ${letterColors[index]}, 0 0 60px ${letterColors[index]}80, 0 0 100px ${letterColors[index]}40, 0 0 150px ${letterColors[index]}20`
                    : `0 0 20px ${letterColors[index]}60`,
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

        {/* Cosmic tagline */}
        <motion.div
          className="absolute bottom-36 left-1/2 -translate-x-1/2 text-center w-full px-6"
          style={{
            opacity: progress > 0.85 ? (progress - 0.85) * 6.67 : 0,
          }}
        >
          <p className="text-2xl md:text-3xl text-white/80 mb-8 font-light tracking-wide">
            Events Beyond This World
          </p>
          <div className="flex gap-4 justify-center pointer-events-auto">
            <button className="group px-10 py-4 bg-transparent border-2 border-yellow-400/50 text-yellow-400 font-semibold rounded-full hover:bg-yellow-400/10 hover:border-yellow-400 transition-all relative overflow-hidden">
              <span className="relative z-10">Explore Universe</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
            <button className="px-10 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
              Contact Us
            </button>
          </div>
        </motion.div>

        {/* Star constellation progress */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-3">
            {[0, 0.25, 0.5, 0.75, 1].map((threshold, i) => (
              <motion.div
                key={i}
                className="relative"
                animate={{
                  scale: progress >= threshold ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    progress >= threshold
                      ? 'bg-white shadow-[0_0_10px_#fff,0_0_20px_#fff]'
                      : 'bg-white/30'
                  }`}
                />
                {i < 4 && (
                  <div
                    className={`absolute top-1/2 left-full w-6 h-px transition-all duration-300 ${
                      progress >= threshold + 0.25 ? 'bg-white/60' : 'bg-white/20'
                    }`}
                    style={{ transform: 'translateY(-50%)' }}
                  />
                )}
              </motion.div>
            ))}
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
        <section className="min-h-screen bg-gradient-to-b from-transparent to-[#000005] flex items-center justify-center px-6">
          <motion.div
            className="max-w-4xl text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-400">Infinite</span>{' '}
              <span className="text-pink-400">Possibilities</span>
            </h2>
            <p className="text-white/70 text-xl">
              Like the cosmos, our creativity knows no bounds. We create experiences
              that transcend the ordinary.
            </p>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
