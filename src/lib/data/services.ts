// Shared service detail data for service pages

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  portfolioLink: string;
}

/**
 * Detailed service data keyed by slug.
 */
export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  events: {
    slug: "events",
    title: "Events",
    tagline: "Where Vision Meets Experience",
    description:
      "We design and deliver immersive events that captivate audiences, celebrate culture, and leave lasting impressions. From large-scale festivals drawing tens of thousands to intimate corporate gatherings, our team brings a decade of regional expertise to every project. We handle every detail from concept development and creative direction through production, logistics, and on-site execution.\n\nOur event management philosophy is rooted in storytelling. Every event we produce tells a story -- whether it is a national celebration that honors heritage, a product launch that sparks conversation, or a multi-day festival that transforms a landscape. We combine strategic thinking with creative ambition to craft experiences that connect brands with their audiences in meaningful ways.\n\nWith a proven track record across government ceremonies, cultural festivals, international conferences, sports events, and brand activations in Qatar and the region, we bring the scale, precision, and creative vision needed to make every event extraordinary.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
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
    process: [
      {
        step: 1,
        title: "Discovery & Strategy",
        description:
          "We begin with deep research into your audience, objectives, and brand. Through collaborative workshops and site assessments, we define the event vision, key messages, and strategic framework.",
      },
      {
        step: 2,
        title: "Creative Concept & Design",
        description:
          "Our creative team develops the event concept, spatial design, entertainment programming, and guest journey. We produce detailed 3D renderings, mood boards, and production plans for approval.",
      },
      {
        step: 3,
        title: "Production & Logistics",
        description:
          "We manage all vendor coordination, permitting, technical production, staffing, and rehearsals. Our operations team ensures every element is tested, timed, and ready for flawless execution.",
      },
      {
        step: 4,
        title: "Execution & Post-Event",
        description:
          "On event day, our command team oversees real-time coordination across all departments. After the event, we deliver comprehensive reporting, media coverage analysis, and insights for future planning.",
      },
    ],
    portfolioLink: "/portfolio?category=events",
  },
  branding: {
    slug: "branding",
    title: "Branding",
    tagline: "Identities That Inspire and Endure",
    description:
      "We build brands that resonate. From strategic positioning and naming to complete visual identity systems, our branding team creates cohesive brand experiences that stand out in crowded markets. We believe that great branding goes beyond a logo -- it is the entire ecosystem of visual, verbal, and experiential touchpoints that shape how people perceive and connect with an organization.\n\nOur approach combines rigorous strategic thinking with bold creative execution. We start by understanding your market, your audience, and your competitive landscape. Then we craft a brand platform that articulates your unique value and translates it into visual systems, guidelines, and marketing materials that work across every channel.\n\nWhether you are launching a new brand, repositioning an established one, or creating a visual identity for a government institution, we deliver brand solutions that are culturally relevant, visually distinctive, and built to last.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
    features: [
      "Brand Development",
      "Strategy & Positioning",
      "Brand Guidelines",
      "Visual Identity",
      "Marketing Campaigns",
      "Packaging",
      "Space Design",
    ],
    process: [
      {
        step: 1,
        title: "Brand Audit & Research",
        description:
          "We conduct comprehensive market research, competitor analysis, and stakeholder interviews to understand your brand landscape and uncover opportunities for differentiation.",
      },
      {
        step: 2,
        title: "Strategy & Positioning",
        description:
          "We define your brand platform including purpose, values, personality, and positioning. This strategic foundation guides every creative decision that follows.",
      },
      {
        step: 3,
        title: "Visual Identity Design",
        description:
          "Our designers create the logo, color palette, typography, iconography, and visual language that bring your brand to life. Every element is crafted to work harmoniously across all applications.",
      },
      {
        step: 4,
        title: "Guidelines & Rollout",
        description:
          "We deliver comprehensive brand guidelines, templates, and asset libraries that ensure consistency across all touchpoints. Our team supports the launch and ongoing brand management.",
      },
    ],
    portfolioLink: "/portfolio?category=branding",
  },
  "media-production": {
    slug: "media-production",
    title: "Media Production",
    tagline: "Stories Told Through Every Frame",
    description:
      "Our media production team brings ideas to life through photography, film, animation, and post-production. From event documentation and corporate films to custom animated content and motion graphics, we produce media that captures attention, communicates clearly, and elevates brands.\n\nWe believe compelling visual content is at the heart of modern communication. Our in-house team of photographers, videographers, animators, and editors work collaboratively from concept through final delivery, ensuring every project maintains the highest production standards while staying true to the creative brief.\n\nWhether you need a cinematic brand film, an animated explainer, event photography, or a complete content production pipeline, our team has the technical expertise and creative sensibility to deliver exceptional results across any medium.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>',
    features: [
      "Photography",
      "Film & Video Content Production",
      "Illustration",
      "2D & 3D Animation",
      "Motion Graphics",
      "Voice-overs",
      "Post Production & VFX",
    ],
    process: [
      {
        step: 1,
        title: "Creative Brief & Pre-Production",
        description:
          "We define the project scope, creative direction, and production timeline. This phase includes scripting, storyboarding, location scouting, and talent casting as needed.",
      },
      {
        step: 2,
        title: "Production & Capture",
        description:
          "Our crew executes the shoot or animation production with professional-grade equipment and techniques. We ensure every shot, frame, and take meets the highest quality standards.",
      },
      {
        step: 3,
        title: "Post-Production & Editing",
        description:
          "Our editors and animators assemble the raw material into polished final content. This includes color grading, sound design, motion graphics, VFX, and voice-over integration.",
      },
      {
        step: 4,
        title: "Delivery & Distribution",
        description:
          "We deliver optimized final assets in all required formats and resolutions. We also provide guidance on distribution strategy and platform-specific best practices.",
      },
    ],
    portfolioLink: "/portfolio?category=media-production",
  },
  digital: {
    slug: "digital",
    title: "Digital",
    tagline: "Digital Experiences That Drive Results",
    description:
      "We create digital products and marketing strategies that connect brands with their audiences in the digital space. From responsive websites and mobile applications to comprehensive digital marketing campaigns, our team combines technical excellence with creative thinking to deliver measurable results.\n\nOur digital practice covers the full spectrum of modern digital needs. We design and develop websites that are fast, accessible, and visually compelling. We build native iOS and Android applications that solve real problems. And we run data-driven digital marketing campaigns across social media, search, and programmatic channels that grow brand awareness and drive conversions.\n\nEvery digital solution we create is built with strategy at its core. We start with your business objectives and user needs, then design and build solutions that are optimized for performance, engagement, and growth.",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    features: [
      "Social Media Management",
      "Social Media Advertising",
      "Digital Marketing",
      "Search Engine Optimization",
      "Search Engine Advertising",
      "Website Design & Development",
      "iOS & Android Applications",
    ],
    process: [
      {
        step: 1,
        title: "Discovery & UX Research",
        description:
          "We analyze your business goals, target audience, and competitive landscape. Through user research and data analysis, we define the digital strategy and user experience framework.",
      },
      {
        step: 2,
        title: "Design & Prototyping",
        description:
          "Our designers create wireframes, visual designs, and interactive prototypes. Every screen is crafted for usability, accessibility, and visual impact across all devices.",
      },
      {
        step: 3,
        title: "Development & Testing",
        description:
          "Our engineers build using modern technologies with clean, scalable code. Rigorous QA testing ensures performance, security, and cross-platform compatibility before launch.",
      },
      {
        step: 4,
        title: "Launch & Optimization",
        description:
          "We manage the launch, monitor analytics, and continuously optimize performance. Ongoing support includes A/B testing, SEO refinement, and campaign management to drive sustained growth.",
      },
    ],
    portfolioLink: "/portfolio?category=digital",
  },
};
