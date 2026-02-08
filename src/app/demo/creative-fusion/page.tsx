'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface Trail {
  x: number;
  y: number;
  color: string;
  size: number;
  opacity: number;
}

const colors = ['#E0251C', '#8232A7', '#D7D1CA', '#FF6B6B', '#9B59B6', '#3498DB', '#00FFFF', '#FF00FF'];

// Letter configurations for "BCE"
const letters = ['B', 'C', 'E'];
const letterColors = ['#E0251C', '#8232A7', '#FFFFFF'];

// Chaos positions for each letter (scattered state)
const chaosPositions = [
  { x: -400, y: -200, rotation: -75, scale: 0.3 },
  { x: 450, y: 150, rotation: 60, scale: 0.35 },
  { x: -300, y: 250, rotation: -45, scale: 0.4 },
];

export default function CreativeFusionDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const trailsRef = useRef<Trail[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const animationRef = useRef<number | null>(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const [isInitialized, setIsInitialized] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll();
  const assemblyProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Track scroll progress
  useEffect(() => {
    const unsubscribe = assemblyProgress.on('change', (value) => {
      setProgress(Math.min(1, Math.max(0, value)));
    });
    return () => unsubscribe();
  }, [assemblyProgress]);

  const createParticle = useCallback((x: number, y: number, fromMouse = false): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = fromMouse ? Math.random() * 5 + 2 : Math.random() * 1.5 + 0.5;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: fromMouse ? Math.random() * 8 + 4 : Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: fromMouse ? Math.random() * 100 + 80 : Math.random() * 200 + 150,
    };
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = '#101820';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize background
    ctx.fillStyle = '#101820';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // Initialize ambient particles
    particlesRef.current = [];
    for (let i = 0; i < 80; i++) {
      particlesRef.current.push(
        createParticle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        )
      );
    }

    setIsInitialized(true);

    const addPaintEffect = (x: number, y: number, intensity = 1) => {
      for (let i = 0; i < 3 * intensity; i++) {
        trailsRef.current.push({
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 30,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: (Math.random() * 35 + 20) * intensity,
          opacity: 0.9,
        });
      }

      for (let i = 0; i < 6 * intensity; i++) {
        particlesRef.current.push(createParticle(x, y, true));
      }

      if (trailsRef.current.length > 250) {
        trailsRef.current = trailsRef.current.slice(-250);
      }
      if (particlesRef.current.length > 500) {
        particlesRef.current = particlesRef.current.slice(-500);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseRef.current = { x, y, isDown: mouseRef.current.isDown };

      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 5) {
        addPaintEffect(x, y, mouseRef.current.isDown ? 2 : 1);
        lastPosRef.current = { x, y };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      addPaintEffect(e.clientX, e.clientY, 2);
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      addPaintEffect(touch.clientX, touch.clientY, 1.5);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      lastPosRef.current = { x: touch.clientX, y: touch.clientY };
      addPaintEffect(touch.clientX, touch.clientY, 1.5);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);

    const animate = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(16, 24, 32, 0.04)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw trails
      trailsRef.current.forEach((trail) => {
        const gradient = ctx.createRadialGradient(
          trail.x, trail.y, 0,
          trail.x, trail.y, trail.size
        );
        gradient.addColorStop(0, trail.color + 'DD');
        gradient.addColorStop(0.4, trail.color + '66');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.size * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = trail.color;
        ctx.globalAlpha = trail.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        trail.opacity -= 0.012;
        trail.size *= 0.975;
      });

      trailsRef.current = trailsRef.current.filter(t => t.opacity > 0.05);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180 && dist > 0) {
          particle.vx += (dx / dist) * 0.4;
          particle.vy += (dy / dist) * 0.4;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.97;
        particle.vy *= 0.97;

        if (particle.x < 0) { particle.x = 0; particle.vx *= -0.8; }
        if (particle.x > window.innerWidth) { particle.x = window.innerWidth; particle.vx *= -0.8; }
        if (particle.y < 0) { particle.y = 0; particle.vy *= -0.8; }
        if (particle.y > window.innerHeight) { particle.y = window.innerHeight; particle.vy *= -0.8; }

        particle.life++;
        const lifeRatio = Math.max(0, 1 - particle.life / particle.maxLife);

        if (lifeRatio > 0) {
          // Glow
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * lifeRatio + 3, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + '33';
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * lifeRatio, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = lifeRatio;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Connections
        for (let j = index + 1; j < Math.min(index + 20, particlesRef.current.length); j++) {
          const other = particlesRef.current[j];
          const d = Math.sqrt(
            Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
          );
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - d / 100) * 0.3 * lifeRatio;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);

      while (particlesRef.current.length < 50) {
        particlesRef.current.push(
          createParticle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
          )
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticle]);

  return (
    <div ref={containerRef} className="min-h-[300vh] bg-core-black relative">
      {/* Canvas Background - Fixed */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ touchAction: 'none' }}
      />

      {/* Fixed Content Layer */}
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* Animated Letters */}
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
                className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-black inline-block"
                style={{
                  color: letterColors[index],
                  textShadow: progress > 0.7
                    ? `0 0 60px ${letterColors[index]}80, 0 0 120px ${letterColors[index]}40`
                    : `0 0 20px ${letterColors[index]}40`,
                  x: currentX,
                  y: currentY,
                  rotate: currentRotation,
                  scale: currentScale,
                  opacity: currentOpacity,
                  filter: progress > 0.8 ? 'none' : `blur(${(1 - progress) * 2}px)`,
                }}
                transition={{ type: 'spring', stiffness: 100 }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            );
          })}
        </div>

        {/* Tagline - appears after assembly */}
        <motion.div
          className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center w-full px-6"
          style={{
            opacity: progress > 0.85 ? (progress - 0.85) * 6.67 : 0,
            y: progress > 0.85 ? 0 : 30,
          }}
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 font-light">
            Where chaos becomes unforgettable experiences
          </p>
          <div className="flex gap-4 justify-center pointer-events-auto">
            <button className="group relative px-8 py-4 bg-white text-core-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(255,255,255,0.4)]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-spark to-purple-dream translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              View Our Work
            </button>
          </div>
        </motion.div>

        {/* Chaos/Order Progress Indicator */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className={`text-sm font-medium tracking-wider transition-all duration-300 ${progress < 0.5 ? 'text-red-spark scale-110' : 'text-white/40 scale-100'}`}>
              CHAOS
            </span>
            <div className="w-40 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-spark via-purple-dream to-white rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className={`text-sm font-medium tracking-wider transition-all duration-300 ${progress >= 0.5 ? 'text-purple-dream scale-110' : 'text-white/40 scale-100'}`}>
              ORDER
            </span>
          </motion.div>
        </div>

        {/* Scroll Progress Bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-3">
            <div className="w-1 h-16 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="w-full bg-gradient-to-b from-red-spark via-purple-dream to-white rounded-full"
                style={{ height: `${progress * 100}%` }}
              />
            </div>
            <motion.span
              className="text-white/50 text-xs tracking-widest"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {progress < 0.9 ? 'SCROLL' : 'COMPLETE'}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-6 z-50">
        <div className="flex justify-between items-center">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 text-desert-dune hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Concepts
          </Link>

          <span className="text-white/40 text-sm">
            {isInitialized ? '🎨 Paint while you scroll' : 'Loading...'}
          </span>
        </div>
      </header>

      {/* Extended scroll area content */}
      <div className="relative z-20 pt-[200vh]">
        <section className="min-h-screen bg-gradient-to-b from-transparent via-core-black/90 to-core-black flex items-center justify-center px-6">
          <motion.div
            className="max-w-5xl text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
              From Vision to{' '}
              <span className="bg-gradient-to-r from-red-spark via-purple-dream to-pink-500 bg-clip-text text-transparent">
                Reality
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/70 mb-16 leading-relaxed max-w-3xl mx-auto">
              Every stroke you made on this canvas represents the creative energy we bring to every event.
              We transform scattered ideas into perfectly orchestrated experiences that leave lasting impressions.
            </p>

            {/* Process cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { num: '01', title: 'Ideate', desc: 'We embrace creative chaos', color: '#E0251C' },
                { num: '02', title: 'Design', desc: 'We shape your vision', color: '#8232A7' },
                { num: '03', title: 'Execute', desc: 'We deliver excellence', color: '#3498DB' },
              ].map((item, index) => (
                <motion.div
                  key={item.num}
                  className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ scale: 1.02, borderColor: item.color }}
                >
                  <span
                    className="text-6xl font-black opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{ color: item.color }}
                  >
                    {item.num}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2 mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
