'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryItems = [
  { id: 1, title: 'Luminous Gala', category: 'Corporate', color: '#E0251C' },
  { id: 2, title: 'Desert Dreams', category: 'Festival', color: '#8232A7' },
  { id: 3, title: 'Summit 2024', category: 'Conference', color: '#3498DB' },
  { id: 4, title: 'Golden Night', category: 'Awards', color: '#F39C12' },
  { id: 5, title: 'Tech Launch', category: 'Launch', color: '#2ECC71' },
  { id: 6, title: 'Art Basel', category: 'Exhibition', color: '#9B59B6' },
];

export default function ImpossibleGalleryDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const { scrollYProgress } = useScroll();

  // Parallax transforms based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating cards animation
      gsap.utils.toArray('.floating-card').forEach((card, i) => {
        gsap.to(card as Element, {
          y: 'random(-20, 20)',
          rotation: 'random(-5, 5)',
          duration: 'random(3, 5)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });

      // Infinite rotation for geometric shapes
      gsap.to('.rotate-infinite', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });

      gsap.to('.rotate-reverse', {
        rotation: -360,
        duration: 25,
        repeat: -1,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[400vh] bg-core-black relative overflow-hidden">
      {/* Perspective Container */}
      <div
        className="fixed inset-0 z-0"
        style={{
          perspective: '1500px',
          perspectiveOrigin: `${mousePos.x * 100}% ${mousePos.y * 100}%`,
        }}
      >
        {/* 3D Grid Floor */}
        <div
          className="absolute inset-0"
          style={{
            transform: 'rotateX(60deg) translateZ(-500px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            className="w-[200vw] h-[200vh] -ml-[50vw] -mt-[50vh]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(224,37,28,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(224,37,28,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              animation: 'gridMove 20s linear infinite',
            }}
          />
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0">
          {/* Wireframe Cube */}
          <div
            className="rotate-infinite absolute top-1/4 left-1/4 w-32 h-32"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(100px) translateX(${(mousePos.x - 0.5) * 50}px)`,
            }}
          >
            <div className="absolute inset-0 border-2 border-red-spark/30" style={{ transform: 'translateZ(64px)' }} />
            <div className="absolute inset-0 border-2 border-red-spark/30" style={{ transform: 'translateZ(-64px)' }} />
            <div className="absolute inset-0 border-2 border-red-spark/30" style={{ transform: 'rotateY(90deg) translateZ(64px)' }} />
            <div className="absolute inset-0 border-2 border-red-spark/30" style={{ transform: 'rotateY(90deg) translateZ(-64px)' }} />
          </div>

          {/* Wireframe Pyramid */}
          <div
            className="rotate-reverse absolute top-1/3 right-1/4 w-40 h-40"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(200px) translateY(${(mousePos.y - 0.5) * 30}px)`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="#8232A7"
                strokeWidth="1"
                opacity="0.4"
              />
              <line x1="50" y1="10" x2="50" y2="50" stroke="#8232A7" strokeWidth="1" opacity="0.4" />
              <ellipse cx="50" cy="90" rx="40" ry="10" fill="none" stroke="#8232A7" strokeWidth="1" opacity="0.2" />
            </svg>
          </div>

          {/* Floating Rings */}
          <div
            className="absolute bottom-1/4 left-1/3 w-64 h-64"
            style={{
              transform: `rotateX(75deg) translateZ(150px) rotate(${mousePos.x * 30}deg)`,
            }}
          >
            <div className="absolute inset-0 border-4 border-purple-dream/20 rounded-full" />
            <div className="absolute inset-8 border-2 border-red-spark/20 rounded-full" />
            <div className="absolute inset-16 border border-desert-dune/20 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
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

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 relative">
          <motion.div
            className="text-center max-w-5xl"
            style={{ scale }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block px-6 py-2 border border-white/20 rounded-full text-desert-dune text-sm tracking-widest uppercase mb-8 backdrop-blur-sm">
                Defy Expectations
              </span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              style={{
                transform: `perspective(1000px) rotateX(${(mousePos.y - 0.5) * 10}deg) rotateY(${(mousePos.x - 0.5) * 10}deg)`,
              }}
            >
              <span className="text-white">The</span>{' '}
              <span className="bg-gradient-to-r from-red-spark via-purple-dream to-blue-500 bg-clip-text text-transparent">
                Impossible
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-desert-dune/80 max-w-2xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Where perception bends and creativity knows no boundaries.
              Step into spaces that shouldn&apos;t exist.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center gap-4"
            >
              <button className="px-8 py-4 bg-white text-core-black font-semibold rounded-full hover:scale-105 transition-transform">
                Enter the Gallery
              </button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-desert-dune/50 text-sm tracking-widest">SCROLL TO EXPLORE</span>
          </motion.div>
        </section>

        {/* Floating Gallery Cards */}
        <section className="min-h-screen relative py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="floating-card group relative"
                  initial={{ opacity: 0, y: 100, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="relative h-80 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}20, transparent)`,
                      border: `1px solid ${item.color}40`,
                      boxShadow: `0 20px 60px ${item.color}20`,
                    }}
                  >
                    {/* Fake 3D depth layers */}
                    <div
                      className="absolute inset-4 rounded-xl border border-white/10"
                      style={{ transform: 'translateZ(20px)' }}
                    />
                    <div
                      className="absolute inset-8 rounded-lg border border-white/5"
                      style={{ transform: 'translateZ(40px)' }}
                    />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <span
                        className="text-sm font-medium mb-2"
                        style={{ color: item.color }}
                      >
                        {item.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    </div>

                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, ${item.color}30, transparent 70%)`,
                      }}
                    />
                  </div>

                  {/* Shadow/reflection */}
                  <div
                    className="absolute -bottom-4 left-4 right-4 h-8 rounded-full blur-xl opacity-30"
                    style={{ background: item.color }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Optical Illusion Section */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="text-center">
            <motion.div
              className="relative w-80 h-80 mx-auto mb-12"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {/* Impossible triangle */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E0251C" />
                    <stop offset="50%" stopColor="#8232A7" />
                    <stop offset="100%" stopColor="#3498DB" />
                  </linearGradient>
                </defs>
                <polygon
                  points="100,20 180,160 20,160"
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                <polygon
                  points="100,50 150,140 50,140"
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="4"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
                <polygon
                  points="100,80 120,120 80,120"
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  opacity="0.3"
                />
              </svg>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Reality is <span className="text-purple-dream">Optional</span>
            </h2>
            <p className="text-desert-dune/70 text-xl max-w-xl mx-auto">
              We create experiences that challenge what you thought was possible.
            </p>
          </div>
        </section>
      </div>

      {/* CSS for grid animation */}
      <style jsx global>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100px);
          }
        }
      `}</style>
    </div>
  );
}
