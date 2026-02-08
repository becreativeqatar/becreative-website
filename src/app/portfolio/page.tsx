"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const PROJECTS = [
  // EVENTS
  {
    id: 1,
    slug: "luminous-2024",
    title: "Luminous 2024",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "Qatar Tourism",
    description: "Qatar's first and largest international light festival. Over 60,000 visitors on weekends with immersive, interactive light installations across five zones inspired by earth, air, water, and fire.",
    stats: "60,000+ weekend visitors",
  },
  {
    id: 2,
    slug: "sealine-season-2025",
    title: "Sealine Season 2025",
    category: "Events",
    categorySlug: "events",
    year: "2025",
    client: "Visit Qatar",
    description: "Month-long desert celebration blending adventure, culture, and entertainment. Featuring international artists, Chef on Fire competition, and spectacular fireworks with up to 14,000 visitors per day.",
    stats: "14,000 daily visitors",
  },
  {
    id: 3,
    slug: "al-samri-night",
    title: "Al Samri Night",
    category: "Events",
    categorySlug: "events",
    year: "2025",
    client: "Visit Qatar",
    description: "The first concert ever held in Qatar between the dunes. A cultural triumph featuring 400 performers in the Samri Band, drone show, and fireworks display. Site built in just 72 hours.",
    stats: "23,000+ guests",
  },
  {
    id: 4,
    slug: "horticultural-expo-doha-2023",
    title: "Horticultural Expo Doha 2023",
    category: "Events",
    categorySlug: "events",
    year: "2023",
    client: "Ashghal",
    description: "Daily event management over 179 days at Al Bidda Park. 1,727 workshops, 7,000+ events, 54 national day celebrations, 124 conferences, 198 government events, and 600 stage performances.",
    stats: "4.2 million visitors",
  },
  {
    id: 5,
    slug: "digital-agenda-2030",
    title: "Digital Agenda 2030 Launch",
    category: "Events",
    categorySlug: "events",
    year: "2023",
    client: "Ministry of Communications & IT",
    description: "Landmark launch event for Qatar's national digital transformation vision. Powerful staging and dynamic multimedia storytelling for 500+ distinguished VIP guests.",
    stats: "500+ VIP guests",
  },
  {
    id: 6,
    slug: "fanar-launch",
    title: "FANAR Launch Event",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "Ministry of Communications & IT",
    description: "Launch of advanced Arabic AI platform at World Summit AI Qatar 2024. Custom animated film with live theatrical performance unveiled by the Prime Minister. Recognized as standout booth with highest visitor footfall.",
    stats: "World Summit AI 2024",
  },
  {
    id: 7,
    slug: "al-jazeera-finance-anniversary",
    title: "Al Jazeera Finance Anniversary",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "Al Jazeera Finance",
    description: "Elegant corporate anniversary celebration honoring milestones and achievements.",
  },
  {
    id: 8,
    slug: "qatar-ecommerce-hackathon",
    title: "Qatar's 1st E-Commerce Hackathon",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "MCIT",
    description: "Qatar's first e-commerce hackathon bringing together innovators and developers to solve digital commerce challenges.",
  },
  {
    id: 9,
    slug: "msdf-mulhemeen",
    title: "MSDF Mulhemeen",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "MSDF",
    description: "Inspiring event celebrating achievers and showcasing stories of success and determination.",
  },
  {
    id: 10,
    slug: "ooredoo-yalla-namshi",
    title: "Ooredoo x MSDF Yalla Namshi",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "Ooredoo / MSDF",
    description: "Collaborative wellness and community event promoting active lifestyle and social connection.",
  },
  // BRANDING
  {
    id: 11,
    slug: "watad-msdf",
    title: "WATAD MSDF",
    category: "Branding",
    categorySlug: "branding",
    year: "2024",
    client: "MSDF",
    description: "Complete brand identity development including visual systems, guidelines, and marketing collateral.",
  },
  {
    id: 12,
    slug: "coffee-down-under",
    title: "Coffee Down Under",
    category: "Branding",
    categorySlug: "branding",
    year: "2024",
    client: "Coffee Down Under",
    description: "Brand development and visual identity for Australian-inspired coffee experience in Qatar.",
  },
  {
    id: 13,
    slug: "halwa-al-saigal",
    title: "Halwa Al Saigal",
    category: "Branding",
    categorySlug: "branding",
    year: "2024",
    client: "Halwa Al Saigal",
    description: "Traditional Qatari sweets brand identity celebrating heritage and authentic flavors.",
  },
  {
    id: 14,
    slug: "arab-union-camel-racing",
    title: "Arab Union for Camel Racing",
    category: "Branding",
    categorySlug: "branding",
    year: "2024",
    client: "Arab Union for Camel Racing",
    description: "Brand identity for the regional camel racing federation honoring Arabian heritage.",
  },
  {
    id: 15,
    slug: "investment-trade-court",
    title: "Investment & Trade Court",
    category: "Branding",
    categorySlug: "branding",
    year: "2024",
    client: "Investment & Trade Court",
    description: "Professional brand identity and visual systems for Qatar's investment and trade judicial body.",
  },
  {
    id: 16,
    slug: "greens",
    title: "Green's",
    category: "Branding",
    categorySlug: "branding",
    year: "2024",
    client: "Green's",
    description: "Fresh brand identity development for healthy lifestyle and sustainable products.",
  },
  {
    id: 17,
    slug: "university-of-doha",
    title: "University of Doha",
    category: "Branding",
    categorySlug: "branding",
    year: "2024",
    client: "University of Doha",
    description: "Comprehensive visual identity and brand guidelines for academic institution.",
  },
  // DIGITAL
  {
    id: 18,
    slug: "qatar-stock-exchange",
    title: "Qatar Stock Exchange Website",
    category: "Digital",
    categorySlug: "digital",
    year: "2024",
    client: "Qatar Stock Exchange",
    description: "Modern, responsive website design and development for Qatar's primary stock exchange.",
  },
  {
    id: 19,
    slug: "qatar-aeronautical-academy",
    title: "Qatar Aeronautical Academy Website",
    category: "Digital",
    categorySlug: "digital",
    year: "2024",
    client: "Qatar Aeronautical Academy",
    description: "Educational institution website showcasing programs and aviation training services.",
  },
  {
    id: 20,
    slug: "mekdam-holding",
    title: "Mekdam Holding Website",
    category: "Digital",
    categorySlug: "digital",
    year: "2024",
    client: "Mekdam Holding",
    description: "Corporate website for diversified holding company showcasing business portfolio.",
  },
  {
    id: 21,
    slug: "printemps-doha",
    title: "Printemps Doha Website",
    category: "Digital",
    categorySlug: "digital",
    year: "2024",
    client: "Printemps Doha",
    description: "Luxury retail website for the iconic French department store's Doha location.",
  },
  {
    id: 22,
    slug: "caffeine-app",
    title: "Caffeine Mobile App",
    category: "Digital",
    categorySlug: "digital",
    year: "2024",
    client: "Caffeine",
    description: "iOS and Android mobile application for coffee ordering and rewards program.",
  },
  {
    id: 23,
    slug: "fastpay-app",
    title: "Fastpay Mobile App",
    category: "Digital",
    categorySlug: "digital",
    year: "2024",
    client: "Fastpay",
    description: "Mobile payment application design and development for seamless digital transactions.",
  },
  {
    id: 24,
    slug: "awfaz-global-schools",
    title: "Awfaz Global Schools Website",
    category: "Digital",
    categorySlug: "digital",
    year: "2024",
    client: "Awfaz Global Schools",
    description: "Modern educational institution website showcasing academic programs and school facilities.",
  },
  {
    id: 25,
    slug: "gharafa-stationery",
    title: "Gharafa Stationery Website",
    category: "Digital",
    categorySlug: "digital",
    year: "2024",
    client: "Gharafa Stationery",
    description: "E-commerce website for office supplies and stationery products with seamless shopping experience.",
  },
];

const categories = [
  { slug: "all", label: "All Projects" },
  { slug: "events", label: "Events" },
  { slug: "branding", label: "Branding" },
  { slug: "media-production", label: "Media" },
  { slug: "digital", label: "Digital" },
];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categorySlug === activeFilter);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-core-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-dream/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Be Enjoyed
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Have a look at events our team enjoyed delivering. Powerful experiences
              that connect audiences and celebrate identity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="py-16 bg-core-black">
        <div className="container mx-auto px-6">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                  activeFilter === cat.slug
                    ? "bg-red-spark text-white glow-red"
                    : "bg-white/5 border border-white/10 text-text-muted hover:bg-white/10 hover:text-white hover:border-red-spark/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group block bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-red-spark/50 transition-all duration-300 hover:glow-red shine-effect"
                  >
                    {/* Image */}
                    <div className="aspect-[16/10] bg-gradient-to-br from-purple-dream/20 to-red-spark/20 relative">
                      <div className="absolute inset-0 bg-core-black/30 group-hover:bg-core-black/10 transition-colors" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-core-black/80 text-red-spark text-xs font-medium rounded-full">
                          {project.year}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-red-spark">
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
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-red-spark text-xs font-medium tracking-wider uppercase">
                        {project.category}
                      </span>
                      <h3 className="text-xl font-semibold text-white mt-2 mb-2 group-hover:text-red-spark transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-muted text-sm line-clamp-2">
                        {project.description}
                      </p>
                      <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                        <span className="text-text-muted text-xs">
                          {project.client}
                        </span>
                        {"stats" in project && project.stats && (
                          <span className="text-red-spark text-xs font-medium">
                            {project.stats}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-text-muted">No projects found in this category.</p>
            </motion.div>
          )}
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
              Ready to Start Your Project?
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Let&apos;s create something extraordinary together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300 hover:scale-105 glow-red hover:glow-red-intense"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
