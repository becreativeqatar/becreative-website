"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  direction?: "left" | "right" | "top" | "bottom";
  duration?: number;
  delay?: number;
  overlayColor?: string;
}

export default function ImageReveal({
  src,
  alt,
  className,
  width,
  height,
  fill = false,
  direction = "left",
  duration = 1.2,
  delay = 0,
  overlayColor = "#E0251C",
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !overlayRef.current || !imageRef.current) return;

    const container = containerRef.current;
    const overlay = overlayRef.current;
    const image = imageRef.current;

    // Initial states based on direction
    const initialOverlay: gsap.TweenVars = {};
    const finalOverlay: gsap.TweenVars = {};
    const initialImage = { scale: 1.2 };
    const finalImage = { scale: 1 };

    switch (direction) {
      case "left":
        initialOverlay.scaleX = 1;
        initialOverlay.transformOrigin = "left";
        finalOverlay.scaleX = 0;
        finalOverlay.transformOrigin = "right";
        break;
      case "right":
        initialOverlay.scaleX = 1;
        initialOverlay.transformOrigin = "right";
        finalOverlay.scaleX = 0;
        finalOverlay.transformOrigin = "left";
        break;
      case "top":
        initialOverlay.scaleY = 1;
        initialOverlay.transformOrigin = "top";
        finalOverlay.scaleY = 0;
        finalOverlay.transformOrigin = "bottom";
        break;
      case "bottom":
        initialOverlay.scaleY = 1;
        initialOverlay.transformOrigin = "bottom";
        finalOverlay.scaleY = 0;
        finalOverlay.transformOrigin = "top";
        break;
    }

    // Set initial states
    gsap.set(overlay, initialOverlay);
    gsap.set(image, initialImage);

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(overlay, {
      ...finalOverlay,
      duration,
      delay,
      ease: "power3.inOut",
    }).to(
      image,
      {
        ...finalImage,
        duration: duration * 0.8,
        ease: "power3.out",
      },
      `-=${duration * 0.4}`
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [direction, duration, delay]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Image container */}
      <div ref={imageRef} className="w-full h-full">
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 800}
            height={height || 600}
            className="w-full h-auto"
          />
        )}
      </div>
    </div>
  );
}

interface ImageHoverProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  hoverEffect?: "zoom" | "grayscale" | "blur" | "brightness";
}

export function ImageHover({
  src,
  alt,
  className,
  width,
  height,
  fill = false,
  hoverEffect = "zoom",
}: ImageHoverProps) {
  const effects = {
    zoom: "group-hover:scale-110",
    grayscale: "grayscale group-hover:grayscale-0",
    blur: "blur-sm group-hover:blur-0",
    brightness: "brightness-75 group-hover:brightness-100",
  };

  return (
    <div className={cn("group overflow-hidden", className)}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            effects[hoverEffect]
          )}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 600}
          className={cn(
            "w-full h-auto transition-all duration-500",
            effects[hoverEffect]
          )}
        />
      )}
    </div>
  );
}
