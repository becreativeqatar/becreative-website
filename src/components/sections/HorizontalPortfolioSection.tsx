"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SHOWCASE_PROJECTS = [
  {
    id: 1,
    slug: "luminous-2024",
    title: "Luminous 2024",
    category: "Festival",
    year: "2024",
    stats: "60,000+ visitors",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80",
  },
  {
    id: 2,
    slug: "sealine-season-2025",
    title: "Sealine Season 2025",
    category: "Events",
    year: "2025",
    stats: "14,000 daily visitors",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
  },
  {
    id: 3,
    slug: "al-samri-night",
    title: "Al Samri Night",
    category: "Cultural",
    year: "2025",
    stats: "23,000+ guests",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80",
  },
  {
    id: 4,
    slug: "horticultural-expo-doha-2023",
    title: "Horticultural Expo",
    category: "Exhibition",
    year: "2023",
    stats: "4.2M visitors",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&q=80",
  },
  {
    id: 5,
    slug: "fanar-launch",
    title: "FANAR Launch",
    category: "Corporate",
    year: "2024",
    stats: "World Summit AI",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80",
  },
];

export default function HorizontalPortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const scroll = scrollRef.current;

    const totalWidth = scroll.scrollWidth;
    const viewportWidth = window.innerWidth;
    const distance = totalWidth - viewportWidth;

    const ctx = gsap.context(() => {
      gsap.to(scroll, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(".portfolio-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-core-black">
      {/* Header */}
      <div className="py-20 container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="text-red-spark/80 text-xs font-medium tracking-[0.2em] uppercase">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 tracking-tight">
              Featured Work
            </h2>
          </div>
          <p className="text-white/40 max-w-md text-base font-light leading-relaxed">
            Scroll to explore powerful experiences that connect audiences
            and celebrate identity across Qatar.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10 z-20">
          <div
            className="portfolio-progress h-full bg-gradient-to-r from-red-spark to-purple-dream origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Scroll Content */}
        <div
          ref={scrollRef}
          className="flex h-full items-center gap-6 pl-6 md:pl-12"
          style={{ width: "fit-content" }}
        >
          {SHOWCASE_PROJECTS.map((project, index) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group relative flex-shrink-0 w-[85vw] md:w-[55vw] lg:w-[40vw] h-[65vh] rounded-2xl overflow-hidden"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 55vw, 40vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-core-black via-core-black/60 to-core-black/20 group-hover:via-core-black/70 transition-all duration-500" />
              </div>

              {/* Index Number */}
              <div className="absolute top-8 left-8 text-white/[0.08] text-[100px] font-bold leading-none z-10">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/[0.15] backdrop-blur-sm text-white/80 text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                  <span className="text-white/40 text-sm">{project.year}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                {project.stats && (
                  <p className="text-white/50 text-sm mb-4">{project.stats}</p>
                )}
                <div className="flex items-center gap-2 text-white/50 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span>View Project</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>

              {/* Hover Border */}
              <div className="absolute inset-0 border border-white/[0.08] group-hover:border-white/[0.2] rounded-2xl transition-colors duration-500 z-10" />
            </Link>
          ))}

          {/* View All Card */}
          <Link
            href="/portfolio"
            className="group relative flex-shrink-0 w-[35vw] md:w-[25vw] h-[65vh] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex items-center justify-center"
          >
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto mb-6 group-hover:bg-white/[0.08] transition-colors duration-300">
                <svg className="w-6 h-6 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">View All</h3>
              <p className="text-white/30 text-sm">Explore full portfolio</p>
            </div>
          </Link>

          {/* End padding */}
          <div className="w-12 flex-shrink-0" />
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-white/30 text-sm">
          <motion.svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </motion.svg>
          <span className="tracking-wide">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
