"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GsapScrollReveal, MagneticButton } from "@/components/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FEATURED_PROJECTS = [
  {
    id: 1,
    slug: "qatar-national-day-2024",
    title: "Qatar National Day 2024",
    category: "Government & Ministry Events",
    categorySlug: "government-ministry-events",
    image: "/images/portfolio/project-1.jpg",
    description: "A spectacular celebration of national pride and heritage.",
  },
  {
    id: 2,
    slug: "tech-summit-doha",
    title: "Tech Summit Doha",
    category: "Conferences & Summits",
    categorySlug: "conferences-summits",
    image: "/images/portfolio/project-2.jpg",
    description: "International technology conference with 5000+ attendees.",
  },
  {
    id: 3,
    slug: "corporate-gala-night",
    title: "Corporate Gala Night",
    category: "Award Ceremonies",
    categorySlug: "award-ceremonies",
    image: "/images/portfolio/project-3.jpg",
    description: "An elegant evening celebrating corporate excellence.",
  },
  {
    id: 4,
    slug: "cultural-heritage-festival",
    title: "Cultural Heritage Festival",
    category: "Festivals & Cultural Events",
    categorySlug: "festivals-cultural-events",
    image: "/images/portfolio/project-4.jpg",
    description: "A vibrant celebration of Qatari culture and traditions.",
  },
  {
    id: 5,
    slug: "product-launch-2024",
    title: "Luxury Brand Launch",
    category: "Corporate Launch Events",
    categorySlug: "corporate-launch-events",
    image: "/images/portfolio/project-5.jpg",
    description: "Exclusive product reveal for a premium automotive brand.",
  },
  {
    id: 6,
    slug: "sports-championship",
    title: "Regional Sports Championship",
    category: "Sports & Entertainment Events",
    categorySlug: "sports-entertainment-events",
    image: "/images/portfolio/project-6.jpg",
    description: "Multi-day sporting event with international participants.",
  },
];

const categories = [
  { slug: "all", label: "All" },
  { slug: "government-ministry-events", label: "Government" },
  { slug: "conferences-summits", label: "Conferences" },
  { slug: "award-ceremonies", label: "Awards" },
  { slug: "festivals-cultural-events", label: "Festivals" },
];

function ProjectCard({ project }: { project: typeof FEATURED_PROJECTS[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !imageRef.current) return;

    const card = cardRef.current;
    const image = imageRef.current;

    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/portfolio/${project.slug}`}
      className="group block relative overflow-hidden rounded-lg aspect-[4/3]"
    >
      {/* Image with GSAP scale */}
      <div
        ref={imageRef}
        className="absolute inset-0 bg-gradient-to-br from-purple-dream/30 to-red-spark/30"
      >
        {/* Placeholder pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-core-black via-core-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="text-red-spark text-xs font-medium tracking-wider uppercase mb-2">
          {project.category}
        </span>
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-spark transition-colors">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          {project.description}
        </p>
      </div>

      {/* Hover Arrow */}
      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-red-spark transform translate-y-2 group-hover:translate-y-0">
        <svg
          className="w-5 h-5 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </div>
    </Link>
  );
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects =
    activeFilter === "all"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.categorySlug === activeFilter);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-core-black to-core-black/95">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <GsapScrollReveal animation="fadeUp">
          <div className="text-center mb-12">
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
              Featured Projects
            </h2>
            <p className="text-text-muted max-w-2xl mx-auto">
              Explore our portfolio of successful events that have left lasting
              impressions on audiences across Qatar and the region.
            </p>
          </div>
        </GsapScrollReveal>

        {/* Filter Tabs */}
        <GsapScrollReveal animation="fadeUp" delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat.slug
                    ? "bg-red-spark text-white"
                    : "bg-white/5 text-text-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </GsapScrollReveal>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <GsapScrollReveal animation="fadeUp" delay={0.3}>
          <div className="text-center mt-12">
            <MagneticButton strength={0.15}>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded transition-all duration-300"
              >
                View Full Portfolio
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
            </MagneticButton>
          </div>
        </GsapScrollReveal>
      </div>
    </section>
  );
}
