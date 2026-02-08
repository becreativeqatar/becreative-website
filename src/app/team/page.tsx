"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const LEADERSHIP = [
  {
    id: 1,
    slug: "marie-line-halabi",
    name: "Marie Line Halabi",
    role: "Chief Executive Officer",
    bio: "With over 20 years of experience in event conceptualization, production, and delivery in Qatar, Marie Line has successfully led and executed high-profile projects across cultural, corporate, entertainment and sports sectors. Her work reflects a commitment to excellence, creativity, and meticulous attention to detail — qualities she now brings to Be Creative Events. Marie Line has recently acquired Be Creative to elevate it to one of the leading events companies in Qatar.",
    achievements: [
      "Award winner: Best 40 Leaders under 40",
      "Horticultural Expo Doha 2023 - Middle East Management Excellence Awards - Team of the Year",
      "IHF Handball World Championships Qatar 2015 - Best Sport Brand for 2015",
    ],
    experience: [
      "Founding partner and CEO of AND Marketing and Events",
      "CEO of Aljassra Group (2022-2025) - highest yearly revenue and profit for 2 consecutive years",
      "Acting Director of Sports Events at Qatar Olympic Committee",
      "Director of Planning and Operations for IAAF World Championships 2019, IHF World Handball Championships 2015, AIBA Boxing World Championships 2016, IPC World Championships 2016",
      "7 years at Fitch Qatar managing branding and retail design for Qatar Foundation, Doha Asian Games 2006, Qatar Science and Technology Park, Hamad Medical Corporation, Qatar Faculty of Islamic Studies, Qatar Red Crescent, Mada, and more",
      "Casa Qatar at Rio Olympics 2016",
    ],
    highlights: [
      "Delivered Al Samri Night - first concert ever held in Qatar between the dunes (23,000+ guests)",
      "Event Management for Horticultural Expo Doha 2023 (4.2 million visitors over 179 days)",
      "Sealine Season 2025 - month-long desert celebration with up to 14,000 daily visitors",
      "Luminous 2024 - Qatar's first international light festival (60,000+ weekend visitors)",
      "Established first international fan zone in Qatar in 2014",
      "Established first braille signage in Qatar",
      "First AAA accessible website enhancing special needs journey in Qatar",
    ],
    linkedin: "https://linkedin.com",
    featured: true,
  },
];

const TEAM_MEMBERS = [
  {
    id: 2,
    slug: "rawan-lteif",
    name: "Rawan Lteif",
    role: "Client Services Manager",
    email: "rawan@bce.qa",
  },
  {
    id: 3,
    slug: "christine-moradian",
    name: "Christine Moradian",
    role: "Talent & Entertainment Manager",
    email: "christine@bce.qa",
  },
  {
    id: 4,
    slug: "nida-mehaboob",
    name: "Nida Mehaboob",
    role: "Project Coordinator",
    email: "nida@bce.qa",
  },
  {
    id: 5,
    slug: "mohammed-ramees",
    name: "Mohammed Ramees",
    role: "Digital Transformation Lead",
    email: "ramees@bce.qa",
  },
  {
    id: 6,
    slug: "gracia-isabel-villar",
    name: "Gracia Isabel Villar",
    role: "Finance & HR Admin",
    email: "gracia@bce.qa",
  },
  {
    id: 7,
    slug: "roy-tawk",
    name: "Roy Tawk",
    role: "Architect & Environment Design Manager",
    email: "roy@bce.qa",
  },
  {
    id: 8,
    slug: "alfredo-nolasco",
    name: "Alfredo Nolasco",
    role: "2D/3D Designer",
    email: "alfredo@bce.qa",
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-core-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-dream/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-spark/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Our People
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Backed by a leading team with over 20 years of glocal experience
              in events and branding. We craft powerful experiences that connect
              audiences and celebrate identity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-core-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Leadership
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Meet the CEO
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {LEADERSHIP.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  {/* Avatar */}
                  <div className="w-48 h-48 shrink-0 mx-auto lg:mx-0 bg-gradient-to-br from-purple-dream/30 to-red-spark/30 rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-bold text-white/30">
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center lg:text-left">
                    <h3 className="text-2xl font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-red-spark text-lg mb-4">{member.role}</p>
                    <p className="text-text-muted mb-6">
                      {member.bio}
                    </p>

                    {/* Awards */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Awards & Recognition</h4>
                      <ul className="space-y-2">
                        {member.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                            <svg className="w-4 h-4 text-red-spark shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Highlights */}
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Key Highlights</h4>
                      <ul className="space-y-2">
                        {member.highlights.slice(0, 4).map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                            <svg className="w-4 h-4 text-red-spark shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/team/${member.slug}`}
                      className="inline-flex items-center gap-2 text-red-spark hover:text-white transition-colors"
                    >
                      View Full Profile
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-gradient-to-b from-core-black to-core-black/95">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Our Team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
              The Creative Force
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Behind every successful event is a dedicated team of creative professionals,
              project managers, designers, and production specialists.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/team/${member.slug}`}
                  className="group block p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-red-spark/50 transition-all duration-300"
                >
                  {/* Avatar */}
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-dream/30 to-red-spark/30 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white/40 group-hover:text-white/60 transition-colors">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-spark transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-text-muted text-sm mt-1">{member.role}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-text-muted text-sm">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-text-muted text-sm">Nationalities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-text-muted text-sm">Events Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">6+</div>
              <div className="text-text-muted text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24 bg-gradient-to-b from-core-black to-core-black/95 border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Join Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
              Become Part of Our Team
            </h2>
            <p className="text-text-muted text-lg mb-8">
              We&apos;re always looking for talented individuals who share our
              passion for creating extraordinary events.
            </p>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300 hover:scale-105 glow-red hover:glow-red-intense"
            >
              View Open Positions
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
          </motion.div>
        </div>
      </section>
    </>
  );
}
