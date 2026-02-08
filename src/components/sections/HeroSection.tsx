"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton, LineReveal, GradientText, LetterReveal } from "@/components/animations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroSectionProps {
  videoSrc?: string;
  posterImage?: string;
}

export default function HeroSection({ videoSrc, posterImage }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgElement1Ref = useRef<HTMLDivElement>(null);
  const bgElement2Ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for background elements
      if (bgElement1Ref.current) {
        gsap.to(bgElement1Ref.current, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (bgElement2Ref.current) {
        gsap.to(bgElement2Ref.current, {
          y: 150,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Fade out content on scroll
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "center center",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Parallax for video
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      {videoSrc && (
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={posterImage}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Video overlay */}
          <div className="absolute inset-0 bg-core-black/60" />
        </div>
      )}

      {/* Background */}
      <div className={`absolute inset-0 ${videoSrc ? "" : "bg-core-black"}`}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-core-black/50 via-transparent to-core-black" />

        {/* Decorative Elements with Parallax */}
        <div
          ref={bgElement1Ref}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-dream/20 rounded-full blur-3xl"
        />
        <div
          ref={bgElement2Ref}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-spark/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-2 mb-8 text-sm font-medium tracking-widest text-red-spark uppercase border border-red-spark/30 rounded-full backdrop-blur-sm">
            Be Memorable
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <LineReveal delay={0.3}>
            <span className="block">Celebrating Brands</span>
          </LineReveal>
          <LineReveal delay={0.5}>
            <span className="block">for the</span>
          </LineReveal>
          <LineReveal delay={0.7}>
            <GradientText animate className="block py-2">
              Love of Qatar
            </GradientText>
          </LineReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10"
        >
          Qatar&apos;s premier creative events agency. We specialize in immersive event
          management, destination creation, and brand activation — blending innovation
          with authentic Qatari culture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton strength={0.2}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300"
            >
              View Our Work
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </MagneticButton>
          <MagneticButton strength={0.2}>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
            >
              Get in Touch
            </Link>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-text-muted">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
