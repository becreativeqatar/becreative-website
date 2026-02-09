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
  opacity: number;
}

interface Trail {
  x: number;
  y: number;
  color: string;
  size: number;
  opacity: number;
}

// Refined brand colors
const brandColors = [
  '#E0251C',
  '#8232A7',
  '#B8405E',
  '#A855F7',
  '#6366F1',
];

// Letter configurations for "BCE"
const letters = ['B', 'C', 'E'];
const letterColors = ['#E0251C', '#8232A7', '#FFFFFF'];

// Controlled chaos positions
const chaosPositions = [
  { x: -200, y: -100, rotation: -25, scale: 0.6 },
  { x: 240, y: 80, rotation: 20, scale: 0.65 },
  { x: -150, y: 120, rotation: -15, scale: 0.6 },
];

export default function CreativeFusionHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const trailsRef = useRef<Trail[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, isActive: false });
  const animationRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const [isInitialized, setIsInitialized] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const assemblyProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  useEffect(() => {
    const unsubscribe = assemblyProgress.on('change', (value) => {
      setProgress(Math.min(1, Math.max(0, value)));
    });
    return () => unsubscribe();
  }, [assemblyProgress]);

  const createParticle = useCallback((x: number, y: number, fromMouse = false): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = fromMouse ? Math.random() * 2 + 1 : Math.random() * 0.5 + 0.2;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: fromMouse ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
      color: brandColors[Math.floor(Math.random() * brandColors.length)],
      life: 0,
      maxLife: fromMouse ? Math.random() * 120 + 80 : Math.random() * 300 + 200,
      opacity: fromMouse ? 0.8 : 0.4,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = '#101820';
      ctx.fillRect(0, 0, rect.width, rect.height);
    };
    resize();
    window.addEventListener('resize', resize);

    ctx.fillStyle = '#101820';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initialize ambient particles — fewer on mobile for performance
    const rect = canvas.getBoundingClientRect();
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const initialParticleCount = prefersReducedMotion ? 10 : isMobile ? 20 : 50;
    particlesRef.current = [];
    for (let i = 0; i < initialParticleCount; i++) {
      particlesRef.current.push(
        createParticle(
          Math.random() * rect.width,
          Math.random() * rect.height
        )
      );
    }

    setIsInitialized(true);

    const addPaintEffect = (x: number, y: number, intensity = 1) => {
      const canvasRect = canvas.getBoundingClientRect();
      const canvasX = x - canvasRect.left;
      const canvasY = y - canvasRect.top;

      if (canvasX < 0 || canvasX > canvasRect.width || canvasY < 0 || canvasY > canvasRect.height) {
        return;
      }

      trailsRef.current.push({
        x: canvasX,
        y: canvasY,
        color: brandColors[Math.floor(Math.random() * brandColors.length)],
        size: (Math.random() * 20 + 15) * intensity,
        opacity: 0.6 * intensity,
      });

      const particleCount = Math.floor(2 * intensity);
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(canvasX, canvasY, true));
      }

      if (trailsRef.current.length > 100) {
        trailsRef.current = trailsRef.current.slice(-100);
      }
      if (particlesRef.current.length > 200) {
        particlesRef.current = particlesRef.current.slice(-200);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseRef.current = { x, y, isDown: mouseRef.current.isDown, isActive: true };

      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8) {
        addPaintEffect(x, y, mouseRef.current.isDown ? 1.5 : 0.8);
        lastPosRef.current = { x, y };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      addPaintEffect(e.clientX, e.clientY, 1.2);
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const dx = touch.clientX - lastPosRef.current.x;
      const dy = touch.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8) {
        addPaintEffect(touch.clientX, touch.clientY, 1);
        lastPosRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      lastPosRef.current = { x: touch.clientX, y: touch.clientY };
      mouseRef.current = { x: touch.clientX, y: touch.clientY, isDown: true, isActive: true };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);

    // Pause animation when hero is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animationRef.current) {
          animationRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const minParticles = isMobile ? 15 : 30;

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = null;
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.fillStyle = 'rgba(16, 24, 32, 0.08)';
      ctx.fillRect(0, 0, width, height);

      // Draw trails
      trailsRef.current.forEach((trail) => {
        if (trail.opacity <= 0) return;

        const gradient = ctx.createRadialGradient(
          trail.x, trail.y, 0,
          trail.x, trail.y, trail.size
        );
        gradient.addColorStop(0, trail.color + Math.floor(trail.opacity * 180).toString(16).padStart(2, '0'));
        gradient.addColorStop(0.4, trail.color + Math.floor(trail.opacity * 80).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        trail.opacity *= 0.96;
        trail.size *= 0.98;
      });

      trailsRef.current = trailsRef.current.filter(t => t.opacity > 0.02);

      // Update and draw particles
      const canvasRect = canvas.getBoundingClientRect();
      const mouseCanvasX = mouseRef.current.x - canvasRect.left;
      const mouseCanvasY = mouseRef.current.y - canvasRect.top;

      particlesRef.current.forEach((particle, index) => {
        if (mouseRef.current.isActive) {
          const dx = mouseCanvasX - particle.x;
          const dy = mouseCanvasY - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150 && dist > 0) {
            particle.vx += (dx / dist) * 0.15;
            particle.vy += (dy / dist) * 0.15;
          }
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.x < -50) particle.x = width + 50;
        if (particle.x > width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = height + 50;
        if (particle.y > height + 50) particle.y = -50;

        particle.life++;
        const lifeRatio = Math.max(0, 1 - particle.life / particle.maxLife);
        const currentOpacity = particle.opacity * lifeRatio;

        if (currentOpacity > 0.01) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + Math.floor(currentOpacity * 40).toString(16).padStart(2, '0');
          ctx.fill();

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + Math.floor(currentOpacity * 200).toString(16).padStart(2, '0');
          ctx.fill();
        }

        if (index % 3 === 0) {
          for (let j = index + 1; j < Math.min(index + 10, particlesRef.current.length); j++) {
            const other = particlesRef.current[j];
            const d = Math.sqrt(
              Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
            );
            if (d < 120) {
              const connectionOpacity = (1 - d / 120) * 0.15 * lifeRatio;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = particle.color + Math.floor(connectionOpacity * 255).toString(16).padStart(2, '0');
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      });

      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);

      while (particlesRef.current.length < minParticles) {
        particlesRef.current.push(
          createParticle(
            Math.random() * width,
            Math.random() * height
          )
        );
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      observer.disconnect();
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

  // Eased progress for smoother animation
  const easedProgress = progress < 0.5
    ? 2 * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

  return (
    <section ref={containerRef} className="relative bg-core-black" style={{ height: '200vh' }}>
      {/* Sticky container that holds the hero content */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: 'none' }}
        />

        {/* Content Layer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Animated Letters */}
          <div className="relative flex items-center justify-center">
            {letters.map((letter, index) => {
              const chaos = chaosPositions[index];
              const currentX = chaos.x * (1 - easedProgress);
              const currentY = chaos.y * (1 - easedProgress);
              const currentRotation = chaos.rotation * (1 - easedProgress);
              const currentScale = chaos.scale + (1 - chaos.scale) * easedProgress;
              const currentOpacity = 0.4 + 0.6 * easedProgress;
              const currentBlur = (1 - easedProgress) * 4;

              return (
                <motion.span
                  key={index}
                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] font-black inline-block select-none"
                  style={{
                    color: letterColors[index],
                    textShadow: easedProgress > 0.8
                      ? `0 0 80px ${letterColors[index]}50, 0 0 120px ${letterColors[index]}30`
                      : `0 0 40px ${letterColors[index]}20`,
                    x: currentX,
                    y: currentY,
                    rotate: currentRotation,
                    scale: currentScale,
                    opacity: currentOpacity,
                    filter: currentBlur > 0.5 ? `blur(${currentBlur}px)` : 'none',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </div>

          {/* Tagline */}
          {easedProgress > 0.9 && (
            <motion.div
              className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center w-full px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-white/70 mb-10 font-light tracking-wide">
                Premium Event Management in Qatar
              </p>
              <div className="flex gap-5 justify-center pointer-events-auto">
                <Link
                  href="/portfolio"
                  className="group relative px-8 py-4 bg-white text-core-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    View Our Work
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-spark to-purple-dream translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/50"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>
          )}

          {/* Progress Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-px h-12 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="w-full bg-gradient-to-b from-red-spark to-purple-dream rounded-full origin-top"
                  style={{ height: `${easedProgress * 100}%` }}
                />
              </div>

              {easedProgress < 0.9 && (
                <motion.div
                  className="flex flex-col items-center gap-2"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">
                    Scroll
                  </span>
                  <svg
                    className="w-4 h-4 text-white/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Paint hint */}
          <motion.div
            className="absolute top-8 right-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInitialized ? 0.4 : 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <span className="text-white/40 text-xs tracking-wide">
              Move to interact
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
