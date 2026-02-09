"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface VideoHeroProps {
  videoSrc?: string;
  posterSrc?: string;
  title?: string;
  subtitle?: string;
  tagline?: string;
}

export default function VideoHero({
  videoSrc,
  posterSrc,
  title = "Be Memorable",
  subtitle = "Celebrating Brands for the Love of Qatar",
  tagline = "b.creative events",
}: VideoHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !overlayRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax on scroll
      gsap.to(contentRef.current, {
        y: 100,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Darken overlay on scroll
      gsap.to(overlayRef.current, {
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Lazy load video
  useEffect(() => {
    if (!videoRef.current || !videoSrc) return;
    const video = videoRef.current;
    video.src = videoSrc;
    video.load();
  }, [videoSrc]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-core-black"
    >
      {/* Video / Poster Background */}
      {videoSrc ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          onLoadedData={() => setVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-60" : "opacity-0"
          }`}
        />
      ) : posterSrc ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${posterSrc})` }}
        />
      ) : (
        /* Gradient fallback */
        <div className="absolute inset-0 bg-gradient-to-br from-red-spark/20 via-core-black to-purple-dream/20" />
      )}

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-core-black/50"
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span className="text-red-spark/80 text-xs font-medium tracking-[0.3em] uppercase">
            {tagline}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl text-desert-dune/80 max-w-2xl mx-auto mb-10"
        >
          {subtitle}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-text-muted text-xs tracking-widest uppercase">Scroll</span>
            <svg
              className="w-5 h-5 text-text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-core-black to-transparent" />
    </section>
  );
}
