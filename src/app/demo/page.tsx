'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const bceVariants = [
  {
    id: 'creative-fusion',
    title: 'Creative Fusion ⭐',
    description: 'Interactive painting canvas meets chaos-to-order animation. Paint while you scroll!',
    icon: '✨',
    color: 'from-red-spark via-purple-dream to-pink-500',
    tag: 'Recommended',
  },
  {
    id: 'bce-minimal',
    title: 'Minimal',
    description: 'Clean, elegant, and sophisticated. Less is more with subtle animations.',
    icon: '◯',
    color: 'from-gray-400 to-gray-600',
    tag: 'Light Theme',
  },
  {
    id: 'bce-fireworks',
    title: 'Fireworks',
    description: 'Explosive celebration with auto-launching fireworks. Click to launch more!',
    icon: '🎆',
    color: 'from-yellow-400 via-red-spark to-orange-500',
    tag: 'Celebration',
  },
  {
    id: 'bce-neon',
    title: 'Neon Cyberpunk',
    description: 'Electric neon glow with flickering lights and retro-futuristic grid.',
    icon: '⚡',
    color: 'from-pink-500 via-cyan-400 to-yellow-400',
    tag: 'Futuristic',
  },
  {
    id: 'bce-liquid',
    title: 'Liquid',
    description: 'Fluid organic blobs that flow and merge. Smooth and mesmerizing.',
    icon: '💧',
    color: 'from-purple-dream via-blue-500 to-teal-400',
    tag: 'Organic',
  },
  {
    id: 'bce-galaxy',
    title: 'Galaxy',
    description: 'Deep space with twinkling stars, nebulas, and shooting stars.',
    icon: '🌌',
    color: 'from-yellow-400 via-pink-400 to-cyan-400',
    tag: 'Cosmic',
  },
];

const otherConcepts = [
  {
    id: 'stage-reveal',
    title: 'The Stage Reveal',
    description: 'Theatrical curtains part dramatically with sweeping spotlights.',
    icon: '🎭',
    color: 'from-red-spark to-purple-dream',
  },
  {
    id: 'living-canvas',
    title: 'Living Canvas',
    description: 'Interactive particles that respond to your every move.',
    icon: '🎨',
    color: 'from-purple-dream to-pink-500',
  },
  {
    id: 'impossible-gallery',
    title: 'The Impossible Gallery',
    description: 'Escher-inspired 3D space with gravity-defying elements.',
    icon: '🔮',
    color: 'from-blue-500 to-purple-dream',
  },
  {
    id: 'event-dna',
    title: 'Event DNA',
    description: 'Services as an interconnected, pulsing organism.',
    icon: '🧬',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 'controlled-chaos',
    title: 'Controlled Chaos',
    description: 'Scattered fragments elegantly assemble on scroll.',
    icon: '💥',
    color: 'from-orange-500 to-red-spark',
  },
];

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-core-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-core-black/80 backdrop-blur-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-desert-dune hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Main Site
        </Link>
      </header>

      {/* Hero */}
      <section className="min-h-[40vh] flex items-center justify-center pt-24 pb-8 px-6">
        <div className="text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-red-spark/20 text-red-spark rounded-full text-sm font-medium mb-6">
              Creative Concepts
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-red-spark via-purple-dream to-red-spark bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            <p className="text-xl text-desert-dune/80 max-w-2xl mx-auto">
              Multiple creative directions for the BCE homepage.
              Each concept has its own unique style and personality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BCE Variants Section */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-2">BCE Variations</h2>
            <p className="text-desert-dune/60">Same &quot;BCE&quot; text, different visual styles</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bceVariants.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/demo/${demo.id}`}>
                  <div className="group relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-dream/20">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />

                    {/* Tag */}
                    {demo.tag && (
                      <span className={`absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${demo.color} text-white`}>
                        {demo.tag}
                      </span>
                    )}

                    {/* Icon */}
                    <div className="text-4xl mb-4">{demo.icon}</div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-spark transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-desert-dune/70 text-sm mb-4 leading-relaxed">
                      {demo.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-red-spark text-sm font-medium">
                      <span>View Demo</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-2 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-white/10" />
      </div>

      {/* Other Concepts Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-2">Other Concepts</h2>
            <p className="text-desert-dune/60">Alternative homepage designs with different approaches</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {otherConcepts.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/demo/${demo.id}`}>
                  <div className="group relative bg-white/5 rounded-xl p-5 border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.03]">
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`} />

                    {/* Icon */}
                    <div className="text-3xl mb-3">{demo.icon}</div>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-1 group-hover:text-red-spark transition-colors">
                      {demo.title}
                    </h3>
                    <p className="text-desert-dune/60 text-xs leading-relaxed">
                      {demo.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <footer className="text-center pb-12 text-desert-dune/50 text-sm">
        <p>Click any concept to see it in action. All demos are fully interactive.</p>
      </footer>
    </div>
  );
}
