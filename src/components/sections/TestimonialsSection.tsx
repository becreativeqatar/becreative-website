"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Be Creative Events transformed our vision into an unforgettable experience. Their attention to detail and professionalism exceeded our expectations.",
    author: "Ahmed Al-Thani",
    role: "Director of Events",
    company: "Qatar Tourism Authority",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    id: 2,
    quote:
      "Working with Be Creative was seamless from start to finish. They managed every aspect of our international conference flawlessly.",
    author: "Sarah Mitchell",
    role: "Head of Marketing",
    company: "Tech Summit Doha",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    id: 3,
    quote:
      "Their creativity and execution are unmatched. Be Creative delivered a product launch that generated incredible buzz and media coverage.",
    author: "Mohammed Al-Kuwari",
    role: "Brand Manager",
    company: "Leading Automotive Brand",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  },
  {
    id: 4,
    quote:
      "The team's dedication to excellence made our national day celebration a truly memorable event for all attendees.",
    author: "Fatima Al-Mansouri",
    role: "Event Coordinator",
    company: "Ministry of Culture",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-core-black relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
          alt="Event background"
          fill
          className="object-cover opacity-[0.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-core-black via-core-black/95 to-core-black" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-red-spark/80 text-xs font-medium tracking-[0.2em] uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 tracking-tight">
            What Our Clients Say
          </h2>
        </motion.div>

        {/* Testimonial Container */}
        <div className="max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="flex justify-center mb-10">
            <svg
              className="w-10 h-10 text-red-spark/30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Testimonial Content */}
          <div className="relative min-h-[320px] md:min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light leading-relaxed mb-10">
                  &ldquo;{TESTIMONIALS[current].quote}&rdquo;
                </p>

                {/* Author Info with Photo */}
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 ring-2 ring-white/10">
                    <Image
                      src={TESTIMONIALS[current].image}
                      alt={TESTIMONIALS[current].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-white font-medium text-lg">
                    {TESTIMONIALS[current].author}
                  </div>
                  <div className="text-white/40 text-sm mt-1">
                    {TESTIMONIALS[current].role}, {TESTIMONIALS[current].company}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === index
                    ? "w-8 bg-gradient-to-r from-red-spark to-purple-dream"
                    : "w-1.5 bg-white/20 hover:bg-white/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={() =>
                setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
              }
              className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)}
              className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] flex items-center justify-center text-white/50 hover:text-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
