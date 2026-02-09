"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GsapScrollReveal, MagneticButton } from "@/components/animations";

const SERVICE_DETAILS = {
  "government-ministry-events": {
    title: "Government & Ministry Events",
    subtitle: "Official Ceremonies & National Celebrations",
    description:
      "We specialize in orchestrating high-profile government events that reflect the prestige and significance of national occasions. From state ceremonies to diplomatic gatherings, we deliver flawless execution with the utmost attention to protocol and security requirements.",
    heroImage: "/images/services/government.jpg",
    features: [
      {
        title: "Protocol Management",
        description:
          "Expert handling of VIP protocols, diplomatic etiquette, and official ceremonies with precision and dignity.",
      },
      {
        title: "National Celebrations",
        description:
          "Large-scale national day events, independence celebrations, and patriotic commemorations.",
      },
      {
        title: "Diplomatic Events",
        description:
          "International summits, embassy functions, and cross-cultural diplomatic gatherings.",
      },
      {
        title: "Security Coordination",
        description:
          "Seamless coordination with security agencies to ensure safe and secure events.",
      },
    ],
    stats: [
      { value: "50+", label: "Government Events" },
      { value: "10+", label: "Ministries Served" },
      { value: "100K+", label: "Attendees" },
    ],
    process: [
      "Initial consultation with government stakeholders",
      "Protocol and security planning",
      "Venue selection and logistics coordination",
      "VIP management and hospitality",
      "Full event execution and post-event reporting",
    ],
    relatedProjects: ["qatar-national-day-2024", "diplomatic-reception"],
  },
  "festivals-cultural-events": {
    title: "Festivals & Cultural Events",
    subtitle: "Celebrating Heritage & Traditions",
    description:
      "We bring cultural celebrations to life with authentic experiences that honor traditions while creating memorable moments. Our festivals blend heritage with contemporary creativity to engage diverse audiences.",
    heroImage: "/images/services/festivals.jpg",
    features: [
      {
        title: "Heritage Celebrations",
        description:
          "Authentic cultural showcases that preserve and promote traditional arts, crafts, and performances.",
      },
      {
        title: "Public Festivals",
        description:
          "Large-scale community events that bring people together through shared cultural experiences.",
      },
      {
        title: "Cultural Exhibitions",
        description:
          "Immersive exhibitions showcasing art, history, and cultural artifacts.",
      },
      {
        title: "Traditional Performances",
        description:
          "Coordination of traditional music, dance, and theatrical performances.",
      },
    ],
    stats: [
      { value: "30+", label: "Festivals Organized" },
      { value: "500K+", label: "Festival Attendees" },
      { value: "100+", label: "Cultural Partners" },
    ],
    process: [
      "Cultural research and concept development",
      "Artist and performer coordination",
      "Venue design and traditional theming",
      "Community engagement and promotion",
      "Event execution and cultural preservation",
    ],
    relatedProjects: ["cultural-heritage-festival", "music-festival"],
  },
  "conferences-summits": {
    title: "Conferences & Summits",
    subtitle: "Knowledge Exchange & Networking",
    description:
      "We create impactful conferences and summits that facilitate knowledge sharing, networking, and industry advancement. From intimate roundtables to international conventions, we handle every detail.",
    heroImage: "/images/services/conferences.jpg",
    features: [
      {
        title: "International Conferences",
        description:
          "Multi-day international events with complex logistics, simultaneous translation, and global audiences.",
      },
      {
        title: "Business Forums",
        description:
          "Executive forums and business summits that drive industry conversations and partnerships.",
      },
      {
        title: "Panel Discussions",
        description:
          "Expert-led discussions, keynote sessions, and thought leadership platforms.",
      },
      {
        title: "Networking Events",
        description:
          "Structured networking opportunities that create meaningful business connections.",
      },
    ],
    stats: [
      { value: "100+", label: "Conferences Delivered" },
      { value: "5000+", label: "Speakers Hosted" },
      { value: "50+", label: "Countries Represented" },
    ],
    process: [
      "Conference strategy and agenda development",
      "Speaker recruitment and management",
      "Registration and attendee management",
      "Technical production and AV coordination",
      "Post-event analytics and reporting",
    ],
    relatedProjects: ["tech-summit-doha", "fintech-conference", "healthcare-summit"],
  },
  "corporate-launch-events": {
    title: "Corporate Launch Events",
    subtitle: "Unveiling Innovation & Excellence",
    description:
      "We create spectacular launch events that generate buzz, capture media attention, and leave lasting impressions. From product reveals to brand activations, we turn launches into unforgettable experiences.",
    heroImage: "/images/services/launches.jpg",
    features: [
      {
        title: "Product Launches",
        description:
          "Dramatic product reveals with immersive storytelling and memorable unveiling moments.",
      },
      {
        title: "Brand Reveals",
        description:
          "Strategic brand launches that communicate values, vision, and market positioning.",
      },
      {
        title: "Press Conferences",
        description:
          "Media events designed to maximize coverage and deliver key messages effectively.",
      },
      {
        title: "VIP Experiences",
        description:
          "Exclusive experiences for key stakeholders, influencers, and decision-makers.",
      },
    ],
    stats: [
      { value: "75+", label: "Launches Executed" },
      { value: "200+", label: "Brands Served" },
      { value: "1M+", label: "Media Impressions" },
    ],
    process: [
      "Brand and product analysis",
      "Creative concept and reveal strategy",
      "Media planning and influencer coordination",
      "Venue transformation and production",
      "Launch execution and media management",
    ],
    relatedProjects: ["luxury-auto-launch", "real-estate-launch"],
  },
  "award-ceremonies": {
    title: "Award Ceremonies",
    subtitle: "Celebrating Achievement & Excellence",
    description:
      "We produce prestigious award ceremonies that honor achievement and inspire excellence. Our galas combine elegance, entertainment, and emotional moments to create truly memorable celebrations.",
    heroImage: "/images/services/awards.jpg",
    features: [
      {
        title: "Gala Events",
        description:
          "Black-tie galas with sophisticated ambiance, fine dining, and world-class entertainment.",
      },
      {
        title: "Recognition Ceremonies",
        description:
          "Meaningful ceremonies that celebrate individual and organizational achievements.",
      },
      {
        title: "Achievement Awards",
        description:
          "Custom award programs with branded trophies, certificates, and presentation moments.",
      },
      {
        title: "Entertainment Programs",
        description:
          "Live entertainment, celebrity hosts, and memorable performance acts.",
      },
    ],
    stats: [
      { value: "40+", label: "Award Shows Produced" },
      { value: "1000+", label: "Awards Presented" },
      { value: "50+", label: "Celebrity Hosts" },
    ],
    process: [
      "Award category and criteria development",
      "Nomination and judging coordination",
      "Show scripting and run-of-show planning",
      "Production design and staging",
      "Live show direction and execution",
    ],
    relatedProjects: ["corporate-gala-night"],
  },
  "sports-entertainment-events": {
    title: "Sports & Entertainment Events",
    subtitle: "Thrilling Experiences & Live Action",
    description:
      "We deliver high-energy sports and entertainment events that captivate audiences and create unforgettable experiences. From championship tournaments to concert productions, we bring excitement to life.",
    heroImage: "/images/services/sports.jpg",
    features: [
      {
        title: "Sporting Events",
        description:
          "Tournament management, championship events, and multi-sport competitions.",
      },
      {
        title: "Concerts & Shows",
        description:
          "Live music events, theatrical productions, and entertainment spectacles.",
      },
      {
        title: "Fan Experiences",
        description:
          "Interactive fan zones, meet-and-greets, and immersive spectator experiences.",
      },
      {
        title: "Live Entertainment",
        description:
          "Halftime shows, opening ceremonies, and live broadcast productions.",
      },
    ],
    stats: [
      { value: "60+", label: "Sports Events" },
      { value: "25+", label: "Concerts Produced" },
      { value: "2M+", label: "Spectators Entertained" },
    ],
    process: [
      "Event concept and format planning",
      "Athlete/artist coordination and hospitality",
      "Venue setup and technical production",
      "Fan experience design",
      "Live event management and broadcast coordination",
    ],
    relatedProjects: ["regional-sports-championship"],
  },
  "experiential-events": {
    title: "Experiential Events",
    subtitle: "Immersive Brand Activations",
    description:
      "We create immersive experiences that forge emotional connections between brands and audiences. Our experiential events leverage technology, creativity, and storytelling to deliver unforgettable moments.",
    heroImage: "/images/services/experiential.jpg",
    features: [
      {
        title: "Immersive Experiences",
        description:
          "Multi-sensory environments that transport audiences into brand worlds.",
      },
      {
        title: "Brand Activations",
        description:
          "Interactive installations that drive engagement and brand recall.",
      },
      {
        title: "Interactive Installations",
        description:
          "Technology-driven experiences including AR, VR, and digital interactives.",
      },
      {
        title: "Pop-up Events",
        description:
          "Temporary experiential spaces that create buzz and social media moments.",
      },
    ],
    stats: [
      { value: "80+", label: "Activations Delivered" },
      { value: "5M+", label: "Social Impressions" },
      { value: "95%", label: "Client Satisfaction" },
    ],
    process: [
      "Brand immersion and audience analysis",
      "Experience concept and journey mapping",
      "Technology and interactivity planning",
      "Installation design and build",
      "Activation execution and engagement tracking",
    ],
    relatedProjects: ["brand-activation-campaign"],
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const service = SERVICE_DETAILS[slug as keyof typeof SERVICE_DETAILS];

  if (!service) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-core-black overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-dream/20 to-red-spark/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-core-black via-core-black/80 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors mb-6"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Services
            </Link>
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase block mb-4">
              {service.subtitle}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-text-muted max-w-2xl">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-core-black border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {service.stats.map((stat, index) => (
              <GsapScrollReveal key={stat.label} animation="fadeUp" delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-spark mb-2">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm">{stat.label}</div>
                </div>
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-core-black">
        <div className="container mx-auto px-6">
          <GsapScrollReveal animation="fadeUp">
            <div className="text-center mb-16">
              <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
                Our Capabilities
              </h2>
            </div>
          </GsapScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.features.map((feature, index) => (
              <GsapScrollReveal key={feature.title} animation="fadeUp" delay={index * 0.1}>
                <div className="p-8 bg-white/5 rounded-lg border border-white/10 hover:border-red-spark/50 transition-colors h-full">
                  <div className="w-12 h-12 rounded-lg bg-red-spark/10 flex items-center justify-center mb-6">
                    <svg
                      className="w-6 h-6 text-red-spark"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-muted">{feature.description}</p>
                </div>
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-core-black to-core-black/95">
        <div className="container mx-auto px-6">
          <GsapScrollReveal animation="fadeUp">
            <div className="text-center mb-16">
              <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
                How We Work
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
                Our Process
              </h2>
            </div>
          </GsapScrollReveal>

          <div className="max-w-3xl mx-auto">
            {service.process.map((step, index) => (
              <GsapScrollReveal key={index} animation="fadeUp" delay={index * 0.1}>
                <div className="flex items-start gap-6 mb-8">
                  <div className="w-12 h-12 rounded-full bg-red-spark flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-white text-lg">{step}</p>
                  </div>
                </div>
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-core-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <GsapScrollReveal animation="fadeUp">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Let&apos;s discuss how we can bring your {service.title.toLowerCase()} vision to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton strength={0.2}>
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-4 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300"
                  >
                    Start Your Project
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Link
                    href="/portfolio"
                    className="inline-block px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded transition-all duration-300 hover:bg-white/5"
                  >
                    View Related Work
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </GsapScrollReveal>
        </div>
      </section>
    </>
  );
}
