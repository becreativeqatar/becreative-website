"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const JOB_LISTINGS = [
  {
    id: 1,
    title: "Senior Event Manager",
    department: "Operations",
    type: "Full-time",
    location: "Lusail, Qatar",
    description: "Lead and manage large-scale events from conception to completion, ensuring exceptional client experiences.",
    requirements: [
      "7+ years of event management experience",
      "Proven track record with high-profile events",
      "Strong leadership and communication skills",
      "Fluent in English; Arabic is a plus",
    ],
  },
  {
    id: 2,
    title: "Creative Designer",
    department: "Creative",
    type: "Full-time",
    location: "Lusail, Qatar",
    description: "Create compelling visual designs for events, marketing materials, and digital platforms.",
    requirements: [
      "5+ years of design experience",
      "Proficiency in Adobe Creative Suite",
      "Strong portfolio showcasing event design",
      "Understanding of print and digital production",
    ],
  },
  {
    id: 3,
    title: "Technical Production Specialist",
    department: "Production",
    type: "Full-time",
    location: "Lusail, Qatar",
    description: "Manage audiovisual equipment, lighting, and technical aspects of event production.",
    requirements: [
      "5+ years in technical production",
      "Experience with AV equipment and software",
      "Problem-solving abilities under pressure",
      "Willingness to work flexible hours",
    ],
  },
  {
    id: 4,
    title: "Client Relations Executive",
    department: "Client Services",
    type: "Full-time",
    location: "Lusail, Qatar",
    description: "Build and maintain relationships with clients, understanding their needs and ensuring satisfaction.",
    requirements: [
      "3+ years in client-facing roles",
      "Excellent communication skills",
      "Strong organizational abilities",
      "Fluent in English and Arabic",
    ],
  },
  {
    id: 5,
    title: "Marketing Coordinator",
    department: "Marketing",
    type: "Full-time",
    location: "Lusail, Qatar",
    description: "Support marketing initiatives, manage social media, and coordinate promotional activities.",
    requirements: [
      "2+ years in marketing",
      "Social media management experience",
      "Content creation skills",
      "Knowledge of digital marketing tools",
    ],
  },
];

const BENEFITS = [
  {
    title: "Competitive Salary",
    description: "Industry-leading compensation packages",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Health Insurance",
    description: "Comprehensive medical coverage",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Professional Growth",
    description: "Training and development opportunities",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
  },
  {
    title: "Work-Life Balance",
    description: "Flexible working arrangements",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Team Events",
    description: "Regular team building activities",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Annual Leave",
    description: "Generous vacation policy",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
];

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-core-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-red-spark/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-dream/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Build Your Career With Us
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Join a passionate team dedicated to creating extraordinary events
              and unforgettable experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-core-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
                Our Culture
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-6">
                Why Work With Us?
              </h2>
              <div className="space-y-4 text-text-muted">
                <p>
                  At Be Creative Events, we believe that great events are created
                  by great people. Our team is our greatest asset, and we invest
                  in creating an environment where creativity thrives and talent
                  is nurtured.
                </p>
                <p>
                  We foster a culture of collaboration, innovation, and
                  excellence. Every team member plays a vital role in our success,
                  and we celebrate achievements together.
                </p>
                <p>
                  Join us and be part of a dynamic team that&apos;s shaping the
                  future of event management in Qatar and beyond.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {BENEFITS.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="p-6 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="text-red-spark mb-3">{benefit.icon}</div>
                  <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-text-muted text-sm">{benefit.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
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
              Open Positions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
              Current Opportunities
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {JOB_LISTINGS.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 rounded-lg border border-white/10 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="text-text-muted text-sm">{job.department}</span>
                      <span className="text-text-muted text-sm">•</span>
                      <span className="text-text-muted text-sm">{job.type}</span>
                      <span className="text-text-muted text-sm">•</span>
                      <span className="text-text-muted text-sm">{job.location}</span>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 text-text-muted transition-transform ${
                      expandedJob === job.id ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {expandedJob === job.id && (
                  <div className="px-6 pb-6 border-t border-white/10">
                    <div className="pt-6">
                      <p className="text-text-muted mb-4">{job.description}</p>
                      <h4 className="text-white font-semibold mb-3">Requirements:</h4>
                      <ul className="space-y-2 mb-6">
                        {job.requirements.map((req) => (
                          <li key={req} className="flex items-start gap-2 text-text-muted text-sm">
                            <svg
                              className="w-5 h-5 text-red-spark shrink-0 mt-0.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            {req}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={`mailto:careers@bce.qa?subject=Application for ${job.title}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300"
                      >
                        Apply Now
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
              Don&apos;t See Your Role?
            </h2>
            <p className="text-text-muted text-lg mb-8">
              We&apos;re always interested in meeting talented individuals. Send us
              your resume and let us know how you can contribute to our team.
            </p>
            <a
              href="mailto:careers@bce.qa"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded transition-all duration-300 hover:bg-white/5"
            >
              Send Your Resume
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
