'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  color: string;
  size: number;
  connections: string[];
  pulseDelay: number;
}

const services: Node[] = [
  { id: 'government', x: 50, y: 20, label: 'Government Events', color: '#E0251C', size: 60, connections: ['conferences', 'festivals'], pulseDelay: 0 },
  { id: 'conferences', x: 25, y: 40, label: 'Conferences', color: '#8232A7', size: 50, connections: ['corporate', 'awards'], pulseDelay: 0.5 },
  { id: 'festivals', x: 75, y: 40, label: 'Festivals', color: '#3498DB', size: 55, connections: ['sports', 'experiential'], pulseDelay: 1 },
  { id: 'corporate', x: 15, y: 65, label: 'Corporate', color: '#2ECC71', size: 45, connections: ['awards'], pulseDelay: 1.5 },
  { id: 'awards', x: 40, y: 70, label: 'Award Ceremonies', color: '#F39C12', size: 48, connections: ['experiential'], pulseDelay: 2 },
  { id: 'sports', x: 60, y: 65, label: 'Sports & Entertainment', color: '#E74C3C', size: 52, connections: ['experiential'], pulseDelay: 2.5 },
  { id: 'experiential', x: 85, y: 70, label: 'Experiential', color: '#9B59B6', size: 50, connections: [], pulseDelay: 3 },
  { id: 'center', x: 50, y: 50, label: 'Be Creative', color: '#FFFFFF', size: 70, connections: ['government', 'conferences', 'festivals', 'corporate', 'awards', 'sports', 'experiential'], pulseDelay: 0 },
];

export default function EventDNADemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getNodePosition = (node: Node) => ({
    x: (node.x / 100) * dimensions.width,
    y: (node.y / 100) * dimensions.height,
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-core-black relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(130,50,167,0.3), transparent 50%)`,
          }}
        />
      </div>

      {/* SVG Canvas for Connections */}
      <svg className="fixed inset-0 z-10 pointer-events-none" width="100%" height="100%">
        <defs>
          {/* Gradient for connections */}
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0251C" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#8232A7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3498DB" stopOpacity="0.5" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Animated dash pattern */}
          <pattern id="flowPattern" patternUnits="userSpaceOnUse" width="20" height="1">
            <rect width="10" height="1" fill="url(#connectionGradient)">
              <animate attributeName="x" from="0" to="20" dur="1s" repeatCount="indefinite" />
            </rect>
          </pattern>
        </defs>

        {/* Draw connections */}
        {services.map((node) =>
          node.connections.map((targetId) => {
            const target = services.find((n) => n.id === targetId);
            if (!target) return null;
            const start = getNodePosition(node);
            const end = getNodePosition(target);
            const isActive = activeNode === node.id || activeNode === targetId;

            return (
              <g key={`${node.id}-${targetId}`}>
                {/* Base line */}
                <motion.line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={isActive ? '#8232A7' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={isActive ? 3 : 1}
                  filter={isActive ? 'url(#glow)' : undefined}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: node.pulseDelay * 0.3 }}
                />

                {/* Animated flow particles */}
                <circle r="3" fill={node.color}>
                  <animateMotion
                    dur={`${2 + Math.random() * 2}s`}
                    repeatCount="indefinite"
                    path={`M${start.x},${start.y} L${end.x},${end.y}`}
                  />
                </circle>
              </g>
            );
          })
        )}
      </svg>

      {/* Nodes */}
      <div className="fixed inset-0 z-20">
        {services.map((node) => {
          const pos = getNodePosition(node);
          const isCenter = node.id === 'center';
          const isActive = activeNode === node.id;

          return (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer"
              style={{
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: node.pulseDelay * 0.2,
                type: 'spring',
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* Outer pulse ring */}
              <motion.div
                className="absolute rounded-full"
                style={{
                  width: node.size + 40,
                  height: node.size + 40,
                  left: -(node.size + 40) / 2 + node.size / 2,
                  top: -(node.size + 40) / 2 + node.size / 2,
                  border: `2px solid ${node.color}`,
                  opacity: 0.3,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: node.pulseDelay,
                }}
              />

              {/* Main node */}
              <motion.div
                className="relative rounded-full flex items-center justify-center"
                style={{
                  width: node.size,
                  height: node.size,
                  background: isCenter
                    ? 'linear-gradient(135deg, #E0251C, #8232A7)'
                    : `radial-gradient(circle at 30% 30%, ${node.color}80, ${node.color}40)`,
                  border: `2px solid ${node.color}`,
                  boxShadow: isActive
                    ? `0 0 40px ${node.color}80, 0 0 80px ${node.color}40`
                    : `0 0 20px ${node.color}40`,
                }}
                whileHover={{ scale: 1.2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Inner glow */}
                <div
                  className="absolute inset-2 rounded-full"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${node.color}20, transparent)`,
                  }}
                />

                {/* Icon/Text for center node */}
                {isCenter && (
                  <span className="text-white font-bold text-xs text-center px-1">
                    BC
                  </span>
                )}
              </motion.div>

              {/* Label */}
              <AnimatePresence>
                {(isActive || isCenter) && (
                  <motion.div
                    className="absolute whitespace-nowrap"
                    style={{
                      left: '50%',
                      top: node.size / 2 + 15,
                      transform: 'translateX(-50%)',
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div
                      className="px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
                      style={{
                        background: `${node.color}30`,
                        border: `1px solid ${node.color}50`,
                        color: node.color === '#FFFFFF' ? '#fff' : node.color,
                      }}
                    >
                      {node.label}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Content Overlay */}
      <div className="relative z-30 min-h-screen flex flex-col pointer-events-none">
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

        {/* Hero Text */}
        <div className="flex-1 flex items-start justify-center pt-12">
          <div className="text-center max-w-3xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block px-4 py-2 bg-red-spark/20 text-red-spark rounded-full text-sm font-medium mb-6">
                Interactive Network
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Event{' '}
                <span className="bg-gradient-to-r from-red-spark via-purple-dream to-blue-500 bg-clip-text text-transparent">
                  DNA
                </span>
              </h1>
              <p className="text-xl text-desert-dune/80">
                Our services are interconnected, flowing together to create seamless experiences.
                Hover over the nodes to explore.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-12 flex justify-center pointer-events-auto">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-red-spark to-purple-dream text-white font-semibold rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Services
          </motion.button>
        </div>
      </div>

      {/* Ambient particles */}
      <div className="fixed inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  );
}
