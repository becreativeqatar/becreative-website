"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CLIENTS = [
  { name: "Qatar Tourism", logo: "QT" },
  { name: "Visit Qatar", logo: "VQ" },
  { name: "MCIT", logo: "MCIT" },
  { name: "Ashghal", logo: "ASH" },
  { name: "Ooredoo", logo: "OO" },
  { name: "MSDF", logo: "MSDF" },
  { name: "Al Jazeera Finance", logo: "AJF" },
  { name: "Qatar Stock Exchange", logo: "QSE" },
  { name: "University of Doha", logo: "UoD" },
  { name: "Printemps Doha", logo: "PD" },
  { name: "Mekdam Holding", logo: "MH" },
  { name: "Qatar Aeronautical Academy", logo: "QAA" },
];

const STATS = [
  { value: 200, suffix: "+", label: "Events Delivered" },
  { value: 50, suffix: "+", label: "Corporate Clients" },
  { value: 6, suffix: "+", label: "Years of Excellence" },
  { value: 4, suffix: "M+", label: "Attendees Reached" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.floor(eased * value) + suffix;
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function ClientsSection() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!row1Ref.current || !row2Ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(row1Ref.current, {
        x: "-50%",
        ease: "none",
        duration: 40,
        repeat: -1,
      });

      gsap.set(row2Ref.current, { x: "-50%" });
      gsap.to(row2Ref.current, {
        x: "0%",
        ease: "none",
        duration: 40,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-16 md:py-32 bg-core-black relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-red-spark/80 text-xs font-medium tracking-[0.2em] uppercase">
            Trusted By
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tight">
            Our Clients
          </h2>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div className="relative overflow-hidden mb-20">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-core-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-core-black to-transparent z-10" />

          {/* Row 1 */}
          <div ref={row1Ref} className="flex gap-6 mb-6" style={{ width: "fit-content" }}>
            {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 w-36 h-16 bg-white/[0.02] rounded-xl border border-white/[0.05] flex items-center justify-center transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]"
              >
                <span className="text-lg font-semibold text-white/30 tracking-tight">
                  {client.logo}
                </span>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div ref={row2Ref} className="flex gap-6" style={{ width: "fit-content" }}>
            {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].reverse().map((client, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 w-36 h-16 bg-white/[0.02] rounded-xl border border-white/[0.05] flex items-center justify-center transition-all duration-300 hover:bg-white/[0.04] hover:border-white/[0.1]"
              >
                <span className="text-lg font-semibold text-white/30 tracking-tight">
                  {client.logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 border-t border-white/[0.06]">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/40 text-sm font-light">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
