"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LineReveal, GradientText, WordReveal, GsapScrollReveal } from "@/components/animations";

const VALUES = [
  {
    title: "Excellence",
    description: "Committed to delivering the highest quality in every project we undertake.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description: "Pushing creative boundaries to create unique and memorable experiences.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    description: "Building trust through transparency and reliability in all our partnerships.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Passion",
    description: "Driven by our love for creating memorable moments that inspire and connect.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

const MILESTONES = [
  { year: "2018", title: "Founded", description: "Be Creative Events established by Mr. Ramzan Al Nuaimi in Doha, Qatar" },
  { year: "2019", title: "Market Presence", description: "Established strong presence in Qatar's event industry" },
  { year: "2021", title: "Digital Expansion", description: "Expanded services to include comprehensive digital solutions" },
  { year: "2023", title: "Expo 2023 Doha", description: "Managed Horticultural Expo Doha (179 days, 4.2M visitors) and Digital Agenda 2030 launch" },
  { year: "2024", title: "New Leadership", description: "Marie Line Halabi acquires and becomes CEO; delivered Luminous Festival (60,000+ visitors) and FANAR AI launch" },
  { year: "2025", title: "Record Events", description: "Delivered Sealine Season 2025 and Al Samri Night (23,000+ guests) - first desert concert in Qatar" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-core-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-dream/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-red-spark/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-red-spark text-sm font-medium tracking-widest uppercase block"
            >
              About Us
            </motion.span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              <LineReveal delay={0.2}>
                <span>Creating Moments That</span>
              </LineReveal>
              <LineReveal delay={0.4}>
                <GradientText animate>Matter</GradientText>
              </LineReveal>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-text-muted max-w-2xl"
            >
              <span className="text-red-spark font-semibold">Be Memorable.</span> Celebrating Brands
              for the Love of Qatar. We craft powerful experiences that connect audiences
              and celebrate identity since 2018.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-core-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
                About Be Creative Events
              </h2>
              <div className="space-y-4 text-text-muted">
                <p>
                  Be Creative Events is a Qatar-based creative events agency founded
                  in 2018, by Mr. Ramzan Al Nuaimi, backed by a leading team with over
                  20 years of global experience in events and branding.
                </p>
                <p>
                  We specialize in immersive event management, destination creation,
                  brand creation and brand activation — with a signature approach that
                  blends innovation with authentic Qatari culture.
                </p>
                <p>
                  From festivals and fanzones to major public events, we craft powerful
                  experiences that connect audiences and celebrate identity.
                </p>
                <p>
                  Be Creative Events is a dynamic company specializing in curating
                  unforgettable events and immersive experiences. Operating at the
                  intersection of creativity, innovation, cultural storytelling, and
                  flawless execution, we deliver tailor-made solutions for clients
                  seeking memorable experiences.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-dream/20 to-red-spark/20 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-white mb-2">Since 2018</div>
                    <div className="text-text-muted">Creating Unforgettable Experiences</div>
                  </div>
                </div>
              </div>
              {/* Vision & Mission Cards */}
              <div className="mt-8 space-y-4">
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <h3 className="text-red-spark font-semibold mb-2">Our Vision</h3>
                  <p className="text-text-muted text-sm">
                    To be the region&apos;s leading experience creators — redefining the boundaries
                    of events by transforming spaces, stories, and cultural identity into
                    unforgettable journeys.
                  </p>
                </div>
                <div className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                  <h3 className="text-red-spark font-semibold mb-2">Our Mission</h3>
                  <p className="text-text-muted text-sm">
                    To create exceptional events and experiences that inspire, connect, and
                    leave a lasting impact — blending creativity, culture, and precision to
                    bring ideas to life.
                  </p>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-red-spark/30 rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-core-black to-core-black/95">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-white/5 rounded-lg border border-white/10 hover:border-red-spark/50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-spark/10 text-red-spark mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-text-muted text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-core-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Our Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Milestones
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />

            <div className="space-y-12">
              {MILESTONES.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                      <div className="text-red-spark font-bold text-2xl mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-text-muted text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-red-spark shrink-0 hidden lg:block" />
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Preview Section */}
      <section className="py-24 bg-gradient-to-b from-core-black/95 to-core-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
              Meet the Experts
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Our diverse team of event professionals brings together decades of
              combined experience in event planning, production, and management.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300 hover:scale-105"
            >
              View Our Team
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-core-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Let&apos;s create something extraordinary. Get in touch to discuss
              your next event.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
