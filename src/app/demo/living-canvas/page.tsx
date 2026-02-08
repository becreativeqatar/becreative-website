'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
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

export default function LivingCanvasDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const trailsRef = useRef<Trail[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const animationRef = useRef<number | null>(null);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const [showText, setShowText] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const createParticle = useCallback((x: number, y: number, fromMouse = false): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const speed = fromMouse ? Math.random() * 4 + 2 : Math.random() * 1 + 0.3;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: fromMouse ? Math.random() * 6 + 3 : Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: fromMouse ? Math.random() * 80 + 60 : Math.random() * 150 + 100,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Fill with background color on resize
      ctx.fillStyle = '#101820';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize with background
    ctx.fillStyle = '#101820';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // Initialize ambient particles
    particlesRef.current = [];
    for (let i = 0; i < 60; i++) {
      particlesRef.current.push(
        createParticle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        )
      );
    }

    setIsInitialized(true);

    // Mouse/touch handlers
    const addPaintEffect = (x: number, y: number) => {
      // Add colorful trails
      for (let i = 0; i < 3; i++) {
        trailsRef.current.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 30 + 15,
          opacity: 0.8,
        });
      }

      // Add burst particles
      for (let i = 0; i < 5; i++) {
        particlesRef.current.push(createParticle(x, y, true));
      }

      // Limit arrays
      if (trailsRef.current.length > 200) {
        trailsRef.current = trailsRef.current.slice(-200);
      }
      if (particlesRef.current.length > 400) {
        particlesRef.current = particlesRef.current.slice(-400);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseRef.current = { x, y, isDown: mouseRef.current.isDown };

      // Calculate distance from last position
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Always create some effect on move, more when mouse is down
      if (dist > 5) {
        addPaintEffect(x, y);
        lastPosRef.current = { x, y };
      }

      // Extra particles when mouse button is held
      if (mouseRef.current.isDown) {
        for (let i = 0; i < 3; i++) {
          addPaintEffect(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      addPaintEffect(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      addPaintEffect(touch.clientX, touch.clientY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      lastPosRef.current = { x: touch.clientX, y: touch.clientY };
      addPaintEffect(touch.clientX, touch.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);

    // Animation loop
    const animate = () => {
      // Semi-transparent overlay for trail effect
      ctx.fillStyle = 'rgba(16, 24, 32, 0.03)';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw trails with glow effect
      trailsRef.current.forEach((trail) => {
        // Outer glow
        const gradient = ctx.createRadialGradient(
          trail.x, trail.y, 0,
          trail.x, trail.y, trail.size
        );
        gradient.addColorStop(0, trail.color + 'CC');
        gradient.addColorStop(0.5, trail.color + '44');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(trail.x, trail.y, trail.size * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = trail.color;
        ctx.globalAlpha = trail.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Fade out
        trail.opacity -= 0.015;
        trail.size *= 0.97;
      });

      // Remove faded trails
      trailsRef.current = trailsRef.current.filter(t => t.opacity > 0.05);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Slight attraction to mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 && dist > 0) {
          particle.vx += (dx / dist) * 0.3;
          particle.vy += (dy / dist) * 0.3;
        }

        // Apply velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Friction
        particle.vx *= 0.97;
        particle.vy *= 0.97;

        // Bounce off edges
        if (particle.x < 0) { particle.x = 0; particle.vx *= -0.8; }
        if (particle.x > window.innerWidth) { particle.x = window.innerWidth; particle.vx *= -0.8; }
        if (particle.y < 0) { particle.y = 0; particle.vy *= -0.8; }
        if (particle.y > window.innerHeight) { particle.y = window.innerHeight; particle.vy *= -0.8; }

        // Update life
        particle.life++;
        const lifeRatio = Math.max(0, 1 - particle.life / particle.maxLife);

        // Draw particle with glow
        if (lifeRatio > 0) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * lifeRatio + 2, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + '44';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * lifeRatio, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = lifeRatio;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Draw connections
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const d = Math.sqrt(
            Math.pow(particle.x - other.x, 2) + Math.pow(particle.y - other.y, 2)
          );
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = (1 - d / 80) * 0.4 * lifeRatio;
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      });

      // Remove dead particles
      particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);

      // Maintain minimum ambient particles
      while (particlesRef.current.length < 40) {
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

    // Show text after delay
    const textTimer = setTimeout(() => setShowText(true), 1000);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      clearTimeout(textTimer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticle]);

  return (
    <div className="min-h-screen bg-core-black relative overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ touchAction: 'none' }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col pointer-events-none">
        {/* Header */}
        <header className="p-6 pointer-events-auto">
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

        {/* Hero */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-5xl">
            {showText && (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <span className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm tracking-widest uppercase mb-8 border border-white/20">
                    Move your mouse or touch to paint
                  </span>
                </motion.div>

                <motion.h1
                  className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                >
                  <motion.span
                    className="inline-block text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Be
                  </motion.span>{' '}
                  <motion.span
                    className="inline-block"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    <span
                      className="bg-gradient-to-r from-red-spark via-purple-dream to-pink-500 bg-clip-text text-transparent"
                      style={{
                        backgroundSize: '200% 200%',
                        animation: 'gradient-x 3s ease infinite',
                        filter: 'drop-shadow(0 0 30px rgba(224,37,28,0.5))',
                      }}
                    >
                      Creative
                    </span>
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  Every interaction creates art. Every event is a masterpiece waiting to unfold.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-6 justify-center pointer-events-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                >
                  <button className="group relative px-8 py-4 bg-white text-core-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    <span className="relative z-10 group-hover:text-white transition-colors">Start Creating</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-spark to-purple-dream translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                  <button className="px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full backdrop-blur-sm hover:bg-white/10 transition-all hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    View Gallery
                  </button>
                </motion.div>
              </>
            )}
          </div>
        </main>

        {/* Instructions */}
        <motion.footer
          className="p-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-white/60 text-sm">
            {isInitialized ? '🎨 Click and drag for more intense painting • Touch supported' : 'Loading...'}
          </p>
        </motion.footer>
      </div>

      {/* Style for gradient animation */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}
