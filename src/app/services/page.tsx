"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";

const serviceDetails: Record<string, { icon: ReactNode; features: string[] }> = {
  "events": {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
      </svg>
    ),
    features: [
      "Event Planning & Management",
      "Festival & Live Show Production",
      "Sports Event Management",
      "Corporate Events & Fanzones",
      "Seamless Guest Services",
      "Immersive Experience Design",
      "Destination Creation",
      "Brand & Venue Activation",
      "Cultural Integration & Storytelling",
    ],
  },
  "branding": {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    features: [
      "Brand Development",
      "Strategy & Positioning",
      "Brand Guidelines",
      "Visual Identity",
      "Marketing Campaigns",
      "Packaging Design",
      "Space Design",
    ],
  },
  "media-production": {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    features: [
      "Photography",
      "Film & Video Content Production",
      "Illustration",
      "2D & 3D Animation",
      "Motion Graphics",
      "Voice-overs",
      "Post Production & VFX",
    ],
  },
  "digital": {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    features: [
      "Social Media Management",
      "Social Media Advertising",
      "Digital Marketing",
      "Search Engine Optimization",
      "Search Engine Advertising",
      "Website Design & Development",
      "iOS & Android Applications",
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-core-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-spark/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-dream/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Fulfilling the Quest for Creativity
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              What We Can Do For You
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Four pillars of expertise delivering comprehensive creative solutions.
              Operating at the intersection of creativity, innovation, cultural storytelling,
              and flawless execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-core-black">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="text-red-spark mb-6">
                    {serviceDetails[service.slug]?.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-text-muted mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {serviceDetails[service.slug]?.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-text-light">
                        <svg
                          className="w-5 h-5 text-red-spark shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href={`/portfolio?category=${service.slug}`}
                      className="inline-flex items-center gap-2 text-red-spark hover:text-white transition-colors"
                      data-cursor="hover"
                    >
                      View related projects
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Image Placeholder */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="aspect-[4/3] bg-gradient-to-br from-purple-dream/20 to-red-spark/20 rounded-xl relative overflow-hidden group border border-white/10 hover:border-red-spark/30 backdrop-blur-sm transition-all duration-300 hover:glow-purple shine-effect">
                    <div className="absolute inset-0 bg-core-black/50 group-hover:bg-core-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/20 group-hover:text-white/40 transition-colors transform group-hover:scale-110 duration-300">
                        {serviceDetails[service.slug]?.icon}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-core-black to-core-black/95 border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Our Process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Understanding your vision, goals, and requirements" },
              { step: "02", title: "Planning", description: "Crafting a detailed strategy and creative concept" },
              { step: "03", title: "Execution", description: "Bringing your event to life with precision" },
              { step: "04", title: "Delivery", description: "Ensuring a flawless experience for all attendees" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-red-spark/30 transition-all duration-300 group hover:glow-red"
              >
                <div className="text-6xl font-bold text-white/5 absolute top-2 left-2 group-hover:text-red-spark/10 transition-colors">
                  {item.step}
                </div>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-muted text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-core-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Let&apos;s discuss how we can help bring your vision to life.
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
