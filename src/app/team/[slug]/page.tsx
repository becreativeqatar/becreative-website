"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GsapScrollReveal, MagneticButton } from "@/components/animations";

const TEAM_MEMBERS: Record<
  string,
  {
    name: string;
    role: string;
    department: string;
    bio: string;
    fullBio: string;
    experience: { title: string; company: string; years: string }[];
    education: { degree: string; institution: string; year: string }[];
    certifications: string[];
    notableProjects: { name: string; slug: string; role: string }[];
    skills: string[];
    languages: string[];
    linkedin: string;
    email: string;
    quote?: string;
  }
> = {
  "ahmed-al-thani": {
    name: "Ahmed Al-Thani",
    role: "Founder & CEO",
    department: "Executive",
    bio: "With over 15 years of experience in event management, Ahmed founded Be Creative Events with a vision to transform Qatar's event industry.",
    fullBio:
      "Ahmed Al-Thani is the visionary founder and CEO of Be Creative Events, bringing over 15 years of experience in the event management industry. His journey began at Qatar Events Company, where he rose through the ranks to become Director of Major Events, overseeing some of the country's most significant celebrations and corporate gatherings.\n\nIn 2014, Ahmed founded Be Creative Events with a clear mission: to elevate Qatar's event industry to international standards while maintaining the cultural authenticity that makes the region unique. Under his leadership, the company has grown from a small team of five to over 50 professionals, delivering hundreds of successful events ranging from intimate corporate gatherings to national celebrations.\n\nAhmed's approach to event management combines meticulous planning with creative innovation. He believes that every event, regardless of size, should tell a compelling story and create lasting memories for attendees. This philosophy has earned Be Creative Events the trust of government ministries, Fortune 500 companies, and international organizations.\n\nAs an advisor to the Qatar Tourism Authority, Ahmed continues to shape the future of the events industry in Qatar, advocating for sustainable practices and innovative technologies that enhance the attendee experience.",
    experience: [
      {
        title: "Founder & CEO",
        company: "Be Creative Events",
        years: "2014 - Present",
      },
      {
        title: "Director of Major Events",
        company: "Qatar Events Company",
        years: "2010 - 2014",
      },
      {
        title: "Senior Event Manager",
        company: "Qatar Events Company",
        years: "2007 - 2010",
      },
      {
        title: "Event Coordinator",
        company: "Doha Exhibitions",
        years: "2005 - 2007",
      },
    ],
    education: [
      {
        degree: "MBA",
        institution: "London Business School",
        year: "2009",
      },
      {
        degree: "BA in Marketing",
        institution: "Georgetown University Qatar",
        year: "2005",
      },
    ],
    certifications: [
      "Certified Meeting Professional (CMP)",
      "Project Management Professional (PMP)",
      "LEED Green Associate",
    ],
    notableProjects: [
      { name: "Qatar National Day 2024", slug: "qatar-national-day-2024", role: "Executive Producer" },
      { name: "FIFA World Cup Events 2022", slug: "tech-summit-doha", role: "Strategic Advisor" },
      { name: "Diplomatic Reception 2023", slug: "diplomatic-reception", role: "Event Director" },
    ],
    skills: ["Strategic Planning", "Client Relations", "Team Leadership", "Budget Management", "Stakeholder Management"],
    languages: ["Arabic (Native)", "English (Fluent)", "French (Conversational)"],
    linkedin: "https://linkedin.com",
    email: "ahmed@becreative.qa",
    quote: "Every event is an opportunity to create lasting memories and meaningful connections.",
  },
  "sarah-mitchell": {
    name: "Sarah Mitchell",
    role: "Creative Director",
    department: "Creative",
    bio: "Sarah brings 12 years of international experience in creative direction, having worked with leading brands across Europe and the Middle East.",
    fullBio:
      "Sarah Mitchell is the Creative Director at Be Creative Events, where she leads the creative vision for all projects. With 12 years of experience in creative direction and event design, Sarah has established herself as one of the region's most innovative event designers.\n\nBefore joining Be Creative Events, Sarah held creative leadership positions at prominent agencies in London and Dubai, where she worked with global brands including Apple, Mercedes-Benz, and Louis Vuitton. Her portfolio includes award-winning experiential campaigns, product launches, and large-scale brand activations.\n\nSarah's design philosophy centers on creating immersive experiences that engage all senses. She believes that great event design goes beyond aesthetics – it should evoke emotions, tell stories, and create moments that attendees will remember long after the event ends.\n\nAt Be Creative Events, Sarah has been instrumental in developing the company's signature approach to event design, which seamlessly blends traditional Middle Eastern elements with contemporary global trends. Her work has been recognized with multiple industry awards, including the MENA Event Awards for Best Creative Design.",
    experience: [
      {
        title: "Creative Director",
        company: "Be Creative Events",
        years: "2018 - Present",
      },
      {
        title: "Creative Lead",
        company: "Dubai Events Agency",
        years: "2014 - 2018",
      },
      {
        title: "Senior Designer",
        company: "London Creative Studio",
        years: "2011 - 2014",
      },
      {
        title: "Junior Designer",
        company: "Brand Experience Co.",
        years: "2009 - 2011",
      },
    ],
    education: [
      {
        degree: "MA in Design",
        institution: "Central Saint Martins",
        year: "2009",
      },
      {
        degree: "BA in Fine Arts",
        institution: "Rhode Island School of Design",
        year: "2007",
      },
    ],
    certifications: [
      "Adobe Creative Suite Expert",
      "Experience Design Certificate - IDEO",
      "Sustainable Event Design - ISO 20121",
    ],
    notableProjects: [
      { name: "Luxury Auto Launch", slug: "luxury-auto-launch", role: "Creative Director" },
      { name: "Heritage Festival 2024", slug: "cultural-heritage-festival", role: "Lead Designer" },
      { name: "Corporate Excellence Awards", slug: "corporate-gala-night", role: "Creative Director" },
    ],
    skills: ["Event Design", "Brand Experience", "3D Visualization", "Art Direction", "Creative Strategy"],
    languages: ["English (Native)", "Arabic (Conversational)"],
    linkedin: "https://linkedin.com",
    email: "sarah@becreative.qa",
    quote: "Design is not just what it looks like, it's how it makes people feel.",
  },
  "mohammed-hassan": {
    name: "Mohammed Hassan",
    role: "Operations Director",
    department: "Operations",
    bio: "Mohammed oversees all operational aspects of our events, ensuring seamless execution from planning to delivery.",
    fullBio:
      "Mohammed Hassan serves as the Operations Director at Be Creative Events, bringing military precision and logistical expertise to every event. With over 10 years of experience in operations management, Mohammed ensures that every detail of an event runs smoothly, from initial planning through final delivery.\n\nMohammed's career began in the aviation industry, where he managed ground operations for Qatar Airways' corporate events division. This experience gave him an unparalleled understanding of complex logistics, VIP protocols, and the importance of backup planning. He joined Be Creative Events in 2016 and quickly established himself as the backbone of the company's operational excellence.\n\nAs Operations Director, Mohammed oversees a team of 20 operations specialists and manages relationships with over 100 vendors and suppliers. He has developed proprietary systems for event logistics that have become industry benchmarks, allowing Be Creative Events to execute events with unprecedented efficiency and reliability.\n\nMohammed's commitment to zero-defect execution has earned the trust of government clients and international organizations who demand the highest standards of professionalism.",
    experience: [
      {
        title: "Operations Director",
        company: "Be Creative Events",
        years: "2019 - Present",
      },
      {
        title: "Senior Operations Manager",
        company: "Be Creative Events",
        years: "2016 - 2019",
      },
      {
        title: "Operations Manager",
        company: "Qatar Airways Events",
        years: "2012 - 2016",
      },
      {
        title: "Logistics Coordinator",
        company: "Doha Exhibition Center",
        years: "2010 - 2012",
      },
    ],
    education: [
      {
        degree: "MS in Project Management",
        institution: "Qatar University",
        year: "2012",
      },
      {
        degree: "BS in Business Administration",
        institution: "American University of Sharjah",
        year: "2010",
      },
    ],
    certifications: [
      "Project Management Professional (PMP)",
      "PRINCE2 Practitioner",
      "Six Sigma Green Belt",
      "Crisis Management Certificate",
    ],
    notableProjects: [
      { name: "Tech Summit Doha", slug: "tech-summit-doha", role: "Operations Lead" },
      { name: "GCC Sports Championship", slug: "regional-sports-championship", role: "Operations Director" },
      { name: "Qatar National Day 2024", slug: "qatar-national-day-2024", role: "Logistics Director" },
    ],
    skills: ["Logistics Management", "Vendor Relations", "Risk Management", "Budget Control", "Team Leadership"],
    languages: ["Arabic (Native)", "English (Fluent)", "Urdu (Conversational)"],
    linkedin: "https://linkedin.com",
    email: "mohammed@becreative.qa",
    quote: "Success is in the details. Every great event is built on a foundation of meticulous planning.",
  },
  "fatima-al-kuwari": {
    name: "Fatima Al-Kuwari",
    role: "Client Relations Director",
    department: "Client Services",
    bio: "Fatima is dedicated to building lasting relationships with our clients, ensuring every partnership is built on trust and excellence.",
    fullBio:
      "Fatima Al-Kuwari leads the Client Relations team at Be Creative Events, serving as the primary point of contact for the company's most valued clients. With 8 years of experience in client relations and account management, Fatima has developed a reputation for her exceptional ability to understand client needs and translate them into successful events.\n\nFatima's career began in public relations, where she managed accounts for leading corporations and government entities. This experience gave her deep insight into stakeholder management, brand positioning, and the importance of clear communication. She joined Be Creative Events in 2017 and has since grown the company's client retention rate to an impressive 95%.\n\nAs Client Relations Director, Fatima oversees a team of account managers who handle relationships with over 50 active clients. She has implemented a client feedback system that continuously improves service quality and has developed partnership programs that extend relationships beyond individual events.\n\nFatima's multilingual capabilities and cultural sensitivity make her particularly effective in managing relationships with international clients and diplomatic organizations.",
    experience: [
      {
        title: "Client Relations Director",
        company: "Be Creative Events",
        years: "2020 - Present",
      },
      {
        title: "Senior Account Manager",
        company: "Be Creative Events",
        years: "2017 - 2020",
      },
      {
        title: "Account Director",
        company: "Qatar PR Agency",
        years: "2014 - 2017",
      },
      {
        title: "Account Executive",
        company: "Regional Communications",
        years: "2012 - 2014",
      },
    ],
    education: [
      {
        degree: "BA in Communications",
        institution: "Northwestern University in Qatar",
        year: "2012",
      },
      {
        degree: "Executive Education - Client Management",
        institution: "INSEAD",
        year: "2019",
      },
    ],
    certifications: [
      "Certified Customer Experience Professional (CCXP)",
      "Account Management Certification - SAMA",
      "Negotiation Skills - Harvard Online",
    ],
    notableProjects: [
      { name: "Diplomatic Reception", slug: "diplomatic-reception", role: "Client Lead" },
      { name: "Corporate Excellence Awards", slug: "corporate-gala-night", role: "Account Director" },
      { name: "Healthcare Summit", slug: "healthcare-summit", role: "Client Relations Lead" },
    ],
    skills: ["Client Management", "Negotiation", "Communication", "Problem Solving", "Cultural Intelligence"],
    languages: ["Arabic (Native)", "English (Fluent)", "French (Fluent)"],
    linkedin: "https://linkedin.com",
    email: "fatima@becreative.qa",
    quote: "The best events come from truly understanding what matters to our clients.",
  },
  "james-okonkwo": {
    name: "James Okonkwo",
    role: "Technical Director",
    department: "Production",
    bio: "James leads our technical production team, bringing cutting-edge technology and AV expertise to every event.",
    fullBio:
      "James Okonkwo serves as Technical Director at Be Creative Events, overseeing all aspects of technical production including audio-visual systems, lighting design, and emerging technologies. With over 14 years of experience in live event production, James has worked on some of the world's most prestigious events and brings international expertise to the Qatar market.\n\nJames began his career in London's West End theater scene before transitioning to corporate events and live entertainment. He has worked on productions for BBC, Sky, and numerous international tours. His expertise spans traditional AV systems to cutting-edge technologies including LED mapping, augmented reality, and drone shows.\n\nAt Be Creative Events, James has built a world-class technical team and established partnerships with leading technology providers. He has introduced innovative production techniques that have become signature elements of the company's events, including immersive projection mapping and interactive LED installations.\n\nJames is passionate about pushing the boundaries of event technology while ensuring reliability and safety. His technical innovations have won multiple industry awards and attracted clients seeking cutting-edge production values.",
    experience: [
      {
        title: "Technical Director",
        company: "Be Creative Events",
        years: "2019 - Present",
      },
      {
        title: "Head of Production",
        company: "Dubai Entertainment Co.",
        years: "2015 - 2019",
      },
      {
        title: "Technical Manager",
        company: "London Live Events",
        years: "2011 - 2015",
      },
      {
        title: "AV Technician",
        company: "West End Productions",
        years: "2008 - 2011",
      },
    ],
    education: [
      {
        degree: "BSc in Audio Engineering",
        institution: "SAE Institute London",
        year: "2008",
      },
      {
        degree: "Lighting Design Diploma",
        institution: "RADA Technical",
        year: "2010",
      },
    ],
    certifications: [
      "ETCP Certified Entertainment Electrician",
      "Dante Level 3 Certification",
      "AVIXA CTS (Certified Technology Specialist)",
      "FAA Part 107 Drone Pilot",
    ],
    notableProjects: [
      { name: "Qatar National Day 2024", slug: "qatar-national-day-2024", role: "Technical Director" },
      { name: "Desert Beats Festival", slug: "music-festival", role: "Production Director" },
      { name: "Luxury Auto Launch", slug: "luxury-auto-launch", role: "Technical Lead" },
    ],
    skills: ["AV Engineering", "Lighting Design", "Projection Mapping", "Drone Operations", "Technical Planning"],
    languages: ["English (Native)", "Arabic (Basic)"],
    linkedin: "https://linkedin.com",
    email: "james@becreative.qa",
    quote: "Technology should enhance the human experience, not overshadow it.",
  },
  "layla-ahmed": {
    name: "Layla Ahmed",
    role: "Marketing Director",
    department: "Marketing",
    bio: "Layla drives our marketing strategy and brand communications, showcasing our work to clients worldwide.",
    fullBio:
      "Layla Ahmed is the Marketing Director at Be Creative Events, responsible for the company's brand strategy, digital presence, and marketing communications. With a decade of experience in marketing and brand management, Layla has transformed how Be Creative Events presents itself to the market and engages with potential clients.\n\nBefore joining Be Creative Events, Layla held marketing leadership roles at regional luxury brands and international hospitality companies. She brings a sophisticated understanding of premium brand positioning and a data-driven approach to marketing strategy.\n\nAt Be Creative Events, Layla has overseen a complete brand refresh, launched the company's award-winning website, and developed a content strategy that positions Be Creative Events as a thought leader in the event industry. Her social media campaigns regularly achieve viral reach, showcasing the company's portfolio to millions of potential clients.\n\nLayla is also responsible for business development initiatives, working closely with the sales team to convert marketing leads into client relationships. Her integrated approach to marketing has contributed to a 40% increase in inbound inquiries since joining the company.",
    experience: [
      {
        title: "Marketing Director",
        company: "Be Creative Events",
        years: "2020 - Present",
      },
      {
        title: "Head of Marketing",
        company: "Luxury Hotels Qatar",
        years: "2016 - 2020",
      },
      {
        title: "Brand Manager",
        company: "Premium Retail Group",
        years: "2013 - 2016",
      },
      {
        title: "Marketing Executive",
        company: "Dubai Tourism",
        years: "2011 - 2013",
      },
    ],
    education: [
      {
        degree: "MBA in Marketing",
        institution: "HEC Paris Qatar",
        year: "2016",
      },
      {
        degree: "BA in Mass Communication",
        institution: "American University in Dubai",
        year: "2011",
      },
    ],
    certifications: [
      "Google Analytics Certified",
      "HubSpot Inbound Marketing",
      "Meta Blueprint Certified",
      "Content Marketing Institute Certification",
    ],
    notableProjects: [
      { name: "Brand Activation Campaign", slug: "brand-activation-campaign", role: "Campaign Strategist" },
      { name: "Company Rebrand 2021", slug: "tech-summit-doha", role: "Brand Lead" },
      { name: "Digital Transformation Initiative", slug: "fintech-conference", role: "Project Lead" },
    ],
    skills: ["Brand Strategy", "Digital Marketing", "Content Creation", "Analytics", "Public Relations"],
    languages: ["Arabic (Native)", "English (Fluent)", "Spanish (Conversational)"],
    linkedin: "https://linkedin.com",
    email: "layla@becreative.qa",
    quote: "Great marketing tells the story of the experiences we create.",
  },
};

export default function TeamMemberPage() {
  const params = useParams();
  const slug = params.slug as string;
  const member = TEAM_MEMBERS[slug];

  if (!member) {
    return (
      <section className="min-h-screen pt-32 pb-20 bg-core-black">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Team Member Not Found</h1>
          <p className="text-text-muted mb-8">
            The team member you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/team" className="text-red-spark hover:text-white transition-colors">
            ← Back to Team
          </Link>
        </div>
      </section>
    );
  }

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
          >
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Team
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Avatar & Contact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-dream/30 to-red-spark/30 rounded-lg flex items-center justify-center mb-6">
                <span className="text-8xl font-bold text-white/20">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>

              {/* Contact & Social */}
              <div className="space-y-4">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 text-red-spark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="text-sm">{member.email}</span>
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg text-text-muted hover:text-white transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red-spark">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="text-sm">LinkedIn Profile</span>
                </a>
              </div>

              {/* Languages */}
              <div className="mt-8">
                <h3 className="text-white font-semibold mb-3">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {member.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-white/5 text-text-muted text-sm rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-red-spark/10 text-red-spark text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Main Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
                {member.department}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-2">
                {member.name}
              </h1>
              <p className="text-text-muted text-xl mb-8">{member.role}</p>

              {member.quote && (
                <div className="p-6 bg-white/5 rounded-lg border-l-4 border-red-spark mb-8">
                  <p className="text-white text-lg italic">
                    &ldquo;{member.quote}&rdquo;
                  </p>
                </div>
              )}

              <div className="prose prose-invert max-w-none">
                {member.fullBio.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-text-muted leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 bg-core-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <GsapScrollReveal animation="fadeUp">
            <h2 className="text-3xl font-bold text-white mb-12">Professional Experience</h2>
          </GsapScrollReveal>
          <div className="max-w-3xl">
            {member.experience.map((exp, index) => (
              <GsapScrollReveal key={index} animation="fadeUp" delay={index * 0.1}>
                <div className="flex gap-6 mb-8">
                  <div className="w-3 h-3 rounded-full bg-red-spark mt-2 shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                    <p className="text-text-muted">{exp.company}</p>
                    <p className="text-text-muted text-sm">{exp.years}</p>
                  </div>
                </div>
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-24 bg-gradient-to-b from-core-black to-core-black/95">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <GsapScrollReveal animation="fadeUp">
                <h2 className="text-2xl font-bold text-white mb-8">Education</h2>
              </GsapScrollReveal>
              {member.education.map((edu, index) => (
                <GsapScrollReveal key={index} animation="fadeUp" delay={index * 0.1}>
                  <div className="p-6 bg-white/5 rounded-lg border border-white/10 mb-4">
                    <h3 className="text-white font-semibold">{edu.degree}</h3>
                    <p className="text-text-muted">{edu.institution}</p>
                    <p className="text-text-muted text-sm">{edu.year}</p>
                  </div>
                </GsapScrollReveal>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <GsapScrollReveal animation="fadeUp">
                <h2 className="text-2xl font-bold text-white mb-8">Certifications</h2>
              </GsapScrollReveal>
              <div className="space-y-3">
                {member.certifications.map((cert, index) => (
                  <GsapScrollReveal key={index} animation="fadeUp" delay={index * 0.1}>
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                      <svg
                        className="w-5 h-5 text-red-spark shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-text-light">{cert}</span>
                    </div>
                  </GsapScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notable Projects */}
      <section className="py-24 bg-core-black">
        <div className="container mx-auto px-6">
          <GsapScrollReveal animation="fadeUp">
            <h2 className="text-3xl font-bold text-white mb-12">Notable Projects</h2>
          </GsapScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {member.notableProjects.map((project, index) => (
              <GsapScrollReveal key={project.slug} animation="fadeUp" delay={index * 0.1}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block p-6 bg-white/5 rounded-lg border border-white/10 hover:border-red-spark/50 transition-colors"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-purple-dream/20 to-red-spark/20 rounded-lg mb-4" />
                  <h3 className="text-lg font-semibold text-white group-hover:text-red-spark transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-text-muted text-sm mt-1">{project.role}</p>
                </Link>
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-core-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <GsapScrollReveal animation="fadeUp">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Want to Work With {member.name.split(" ")[0]}?
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Get in touch to discuss your next event with our team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton strength={0.2}>
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-4 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Link
                    href="/team"
                    className="inline-block px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded transition-all duration-300 hover:bg-white/5"
                  >
                    Meet the Full Team
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
