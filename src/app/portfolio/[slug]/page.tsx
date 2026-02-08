"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { GsapScrollReveal, MagneticButton } from "@/components/animations";

const PROJECTS: Record<
  string,
  {
    title: string;
    category: string;
    categorySlug: string;
    year: string;
    client: string;
    location: string;
    duration: string;
    description: string;
    challenge: string;
    approach: string;
    solution: string;
    results: { value: string; label: string }[];
    highlights: string[];
    testimonial?: { quote: string; author: string; role: string; company: string };
    gallery: string[];
    relatedProjects: string[];
  }
> = {
  "luminous-2024": {
    title: "Luminous 2024 - The Light Festival",
    category: "Festivals & Cultural Events",
    categorySlug: "festivals-cultural-events",
    year: "2024",
    client: "Qatar Tourism",
    location: "Doha, Qatar",
    duration: "Multiple Weekends",
    description:
      "Luminous 2024 was shaped to become Qatar's first and largest international light festival and a landmark cultural celebration. Organized in collaboration with FiveCurrents, the festival drew more than 60,000 visitors on weekends and featured immersive, interactive light installations that blended advanced technology with artistic expression.",
    challenge:
      "Create Qatar's first international light festival that showcases works from international artists alongside locally created pieces while managing the complex logistics of artists and installations arriving from different parts of the world.",
    approach:
      "We brought together diverse ideas under a unified creative vision, carefully coordinating international and local artists to create a cohesive festival experience that celebrated both global artistry and Qatari culture.",
    solution:
      "The festival spread across five zones inspired by the elements of earth, air, water, and fire. The event was animated by roving performers in elaborate, parade-style costumes designed to match each theme, along with a varied program of stage entertainment.",
    results: [
      { value: "60K+", label: "Weekend Visitors" },
      { value: "5", label: "Thematic Zones" },
      { value: "First", label: "International Light Festival" },
      { value: "100%", label: "Audience Satisfaction" },
    ],
    highlights: [
      "Qatar's first and largest international light festival",
      "Immersive, interactive light installations",
      "Five zones inspired by earth, air, water, and fire",
      "International and local artists showcased together",
      "Roving performers in elaborate parade-style costumes",
      "Varied stage entertainment program",
    ],
    gallery: [
      "/images/portfolio/luminous-1.jpg",
      "/images/portfolio/luminous-2.jpg",
      "/images/portfolio/luminous-3.jpg",
      "/images/portfolio/luminous-4.jpg",
    ],
    relatedProjects: ["sealine-season-2025", "al-samri-night"],
  },
  "sealine-season-2025": {
    title: "Sealine Season 2025",
    category: "Festivals & Cultural Events",
    categorySlug: "festivals-cultural-events",
    year: "2025",
    client: "Visit Qatar / Qatar Tourism",
    location: "Sealine Desert, Qatar",
    duration: "1 Month",
    description:
      "Sealine Season 2025 transformed Qatar's desert into a stage of wonder. In partnership with Qatar Tourism / Visit Qatar, the month-long celebration blended adventure, culture, and entertainment into an experience unlike any other.",
    challenge:
      "Create a month-long desert celebration that combines adventure activities, cultural experiences, and world-class entertainment while managing the unique challenges of a remote desert location.",
    approach:
      "We designed a comprehensive desert experience that featured non-stop weekend performances, adventure activities, and culinary competitions, all while ensuring visitor comfort and safety in the desert environment.",
    solution:
      "Visitors embarked on desert safaris, ATV rides, horse treks, boat trips, and sporting challenges. Every weekend, the desert pulsed with non-stop performances featuring international artists who had never before performed in Qatar's desert, spectacular fireworks, and the thrilling Chef on Fire competition.",
    results: [
      { value: "14K", label: "Daily Visitors (Weekends)" },
      { value: "30", label: "Days" },
      { value: "100%", label: "Weekend Capacity" },
      { value: "First", label: "International Desert Concerts" },
    ],
    highlights: [
      "International artists performing in Qatar's desert for the first time",
      "Chef on Fire culinary competition",
      "Spectacular fireworks displays every weekend",
      "Desert safaris and ATV rides",
      "Horse treks and boat trips",
      "Full capacity Friday concerts",
    ],
    gallery: [
      "/images/portfolio/sealine-1.jpg",
      "/images/portfolio/sealine-2.jpg",
      "/images/portfolio/sealine-3.jpg",
      "/images/portfolio/sealine-4.jpg",
    ],
    relatedProjects: ["al-samri-night", "luminous-2024"],
  },
  "al-samri-night": {
    title: "Al Samri Night",
    category: "Festivals & Cultural Events",
    categorySlug: "festivals-cultural-events",
    year: "2025",
    client: "Visit Qatar / Qatar Tourism",
    location: "Desert, Qatar",
    duration: "1 Night",
    description:
      "Al Samri Night was both a cultural triumph and a logistical feat. In partnership with Qatar Tourism and Visit Qatar, the desert was transformed into a festival ground capable of welcoming more than 23,000 guests for a celebration of Arabian heritage.",
    challenge:
      "Design, build, and fully prepare a vast site in the heart of the desert in just 72 hours, coordinating staging, seating, power, lighting, and crowd management for over 23,000 guests.",
    approach:
      "We coordinated with precision to ensure a one-of-a-kind experience, managing every detail from staging and seating to power, lighting, and crowd management under an extremely tight timeline.",
    solution:
      "At the heart of the night, the Samri Band with 400 performers filled the desert air with traditional music and poetry — a spectacle that blended cultural authenticity with the atmosphere of a modern festival, along with a magical drone show and spectacular fireworks display.",
    results: [
      { value: "23K+", label: "Guests" },
      { value: "400", label: "Performers" },
      { value: "72hrs", label: "Setup Time" },
      { value: "First", label: "Desert Concert in Qatar" },
    ],
    highlights: [
      "First concert ever held in Qatar between the dunes",
      "400 performers in the Samri Band",
      "Traditional music and poetry celebration",
      "Magical drone show",
      "Spectacular fireworks display",
      "Site built in just 72 hours",
      "Unforgettable finale to Sealine Season 2025",
    ],
    gallery: [
      "/images/portfolio/samri-1.jpg",
      "/images/portfolio/samri-2.jpg",
      "/images/portfolio/samri-3.jpg",
      "/images/portfolio/samri-4.jpg",
    ],
    relatedProjects: ["sealine-season-2025", "luminous-2024"],
  },
  "horticultural-expo-doha-2023": {
    title: "Horticultural Expo Doha 2023",
    category: "Events",
    categorySlug: "events",
    year: "2023",
    client: "Ashghal",
    location: "Al Bidda Park, Doha",
    duration: "179 Days",
    description:
      "At Expo 2023 Doha, held over 179 days at Al Bidda Park, we were central to the daily management of cultural and entertainment programs across the Family, Cultural, and International Zones, celebrating Qatari heritage, culture, and horticulture.",
    challenge:
      "Manage daily event operations over 179 days while delivering a prestigious closing ceremony in less than two weeks of preparation, all while coordinating thousands of events and millions of visitors.",
    approach:
      "Through careful planning and coordination, we managed an extraordinary scale of programming while maintaining consistent quality and memorable experiences throughout the 179-day event.",
    solution:
      "The Expo featured 1,727 workshops on sustainability, agriculture, and innovation, and over 7,000 events, including 54 national day celebrations, 124 conferences, 198 government events, and 600 stage performances. The closing ceremony brought together 100+ talents in traditional thobes, carrying flags of nations from around the world.",
    results: [
      { value: "4.2M", label: "Visitors" },
      { value: "179", label: "Days" },
      { value: "7000+", label: "Events" },
      { value: "1727", label: "Workshops" },
    ],
    highlights: [
      "4.2 million visitors over 179 days",
      "1,727 workshops on sustainability, agriculture, and innovation",
      "7,000+ events managed",
      "54 national day celebrations",
      "124 conferences and 198 government events",
      "600 stage performances",
      "Closing ceremony with 100+ talents and fireworks",
      "Middle East Management Excellence Awards - Team of the Year",
    ],
    gallery: [
      "/images/portfolio/expo-1.jpg",
      "/images/portfolio/expo-2.jpg",
      "/images/portfolio/expo-3.jpg",
      "/images/portfolio/expo-4.jpg",
    ],
    relatedProjects: ["digital-agenda-2030", "fanar-launch"],
  },
  "digital-agenda-2030": {
    title: "Digital Agenda 2030 Launch",
    category: "Events",
    categorySlug: "events",
    year: "2023",
    client: "Ministry of Communications and Information Technology (MCIT)",
    location: "Doha, Qatar",
    duration: "1 Event",
    description:
      "The launch of Qatar's Digital Agenda 2030, a landmark initiative by MCIT that outlined the national vision and set a significant milestone in the country's digital transformation journey.",
    challenge:
      "Create a powerful launch event that communicates Qatar's technological ambition and cultural identity to 500+ distinguished VIP guests while highlighting the country's commitment to innovation and progress.",
    approach:
      "Through powerful staging and dynamic multimedia storytelling, we designed an experience that showcased Qatar's digital transformation journey and its vision for the future.",
    solution:
      "The event welcomed over 500 distinguished guests, including VIPs and VVIPs, in an atmosphere that reflected both Qatar's technological ambition and its cultural identity. The launch highlighted the country's commitment to innovation and progress.",
    results: [
      { value: "500+", label: "VIP Guests" },
      { value: "100%", label: "Media Coverage" },
      { value: "National", label: "Milestone" },
      { value: "2030", label: "Vision Launch" },
    ],
    highlights: [
      "Over 500 distinguished VIP and VVIP guests",
      "Powerful staging and multimedia storytelling",
      "Reflected Qatar's technological ambition and cultural identity",
      "Defining moment in Qatar's digital transformation journey",
      "National vision launch event",
    ],
    gallery: [
      "/images/portfolio/digital-1.jpg",
      "/images/portfolio/digital-2.jpg",
      "/images/portfolio/digital-3.jpg",
      "/images/portfolio/digital-4.jpg",
    ],
    relatedProjects: ["fanar-launch", "horticultural-expo-doha-2023"],
  },
  "fanar-launch": {
    title: "FANAR Launch Event",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "Ministry of Communications and Information Technology (MCIT)",
    location: "World Summit AI Qatar 2024, Doha",
    duration: "1 Event",
    description:
      "During the World Summit AI Qatar 2024, MCIT unveiled the launch of the FANAR platform, an advanced Arabic AI technology designed to transform the region's digital landscape.",
    challenge:
      "Create a memorable launch for an advanced Arabic AI platform that captures both its innovation and cultural significance, while ensuring the booth stands out among all summit participants.",
    approach:
      "We designed a carefully staged sequence that provided a powerful narrative of heritage meeting innovation, combining custom animated film with live theatrical performance for maximum impact.",
    solution:
      "The unveiling combined a custom-produced animated film with a live theatrical performance featuring a child actor, culminating in a grand reveal led by the Prime Minister. A visually distinctive booth gave attendees first-hand experience of FANAR's capabilities.",
    results: [
      { value: "#1", label: "Booth at Summit" },
      { value: "Most", label: "Visitor Footfall" },
      { value: "PM", label: "Grand Reveal" },
      { value: "First", label: "Arabic AI Platform" },
    ],
    highlights: [
      "Grand reveal led by the Prime Minister",
      "Custom-produced animated film",
      "Live theatrical performance with child actor",
      "Recognized as standout booth at the summit",
      "Highest visitor footfall among all participants",
      "Showcased Arabic language AI capabilities",
      "Heritage meeting innovation narrative",
    ],
    gallery: [
      "/images/portfolio/fanar-1.jpg",
      "/images/portfolio/fanar-2.jpg",
      "/images/portfolio/fanar-3.jpg",
      "/images/portfolio/fanar-4.jpg",
    ],
    relatedProjects: ["digital-agenda-2030", "horticultural-expo-doha-2023"],
  },
  "qatar-national-day-2024": {
    title: "Qatar National Day 2024",
    category: "Government & Ministry Events",
    categorySlug: "government-ministry-events",
    year: "2024",
    client: "Government of Qatar",
    location: "Doha, Qatar",
    duration: "3 Days",
    description:
      "A spectacular celebration of national pride featuring cultural performances, fireworks, and immersive experiences that brought together thousands of attendees across multiple venues in Doha.",
    challenge:
      "Create a large-scale national celebration that honors Qatar's rich heritage while incorporating modern elements to engage diverse audiences. The event needed to accommodate over 50,000 attendees across multiple venues while maintaining the highest security standards and seamless coordination between government entities.",
    approach:
      "We developed a comprehensive event strategy that combined traditional Qatari elements with cutting-edge technology. Our team worked closely with government officials to ensure all protocol requirements were met while creating an engaging experience for all attendees.",
    solution:
      "The celebration featured drone light shows, interactive installations, traditional performances, and a grand finale fireworks display. We implemented a centralized command center for real-time coordination across all venues and used advanced crowd management systems.",
    results: [
      { value: "50K+", label: "Attendees" },
      { value: "12hrs", label: "Programming" },
      { value: "100%", label: "Positive Coverage" },
      { value: "#1", label: "Trending" },
    ],
    highlights: [
      "Drone show featuring 500+ synchronized drones",
      "Traditional Qatari village experience",
      "Live broadcast reaching 2M+ viewers",
      "12 interactive cultural installations",
      "Grand fireworks finale lasting 20 minutes",
    ],
    testimonial: {
      quote:
        "Be Creative Events delivered an unforgettable celebration that truly captured the spirit of our nation. Their attention to detail and flawless execution exceeded all expectations.",
      author: "Ahmed Al-Thani",
      role: "Director of Events",
      company: "Government of Qatar",
    },
    gallery: [
      "/images/portfolio/qnd-1.jpg",
      "/images/portfolio/qnd-2.jpg",
      "/images/portfolio/qnd-3.jpg",
      "/images/portfolio/qnd-4.jpg",
    ],
    relatedProjects: ["diplomatic-reception", "cultural-heritage-festival"],
  },
  "tech-summit-doha": {
    title: "Tech Summit Doha",
    category: "Conferences & Summits",
    categorySlug: "conferences-summits",
    year: "2024",
    client: "Qatar Science & Technology Park",
    location: "QNCC, Doha",
    duration: "3 Days",
    description:
      "International technology conference bringing together industry leaders, innovators, and entrepreneurs from around the world to explore the future of technology and innovation in the region.",
    challenge:
      "Organize a world-class tech conference that positions Qatar as a leading hub for innovation while attracting top international speakers and attendees. The event needed to offer multiple tracks, exhibition space, and networking opportunities for diverse participant profiles.",
    approach:
      "We created an immersive conference experience with multiple tracks catering to different industries and expertise levels. Our team designed interactive exhibition spaces, VIP networking lounges, and implemented a hybrid event model with live streaming capabilities.",
    solution:
      "The summit featured a main stage for keynotes, four breakout rooms for specialized tracks, a 3,000 sqm exhibition hall, and dedicated networking zones. We developed a custom event app for attendee engagement and implemented AI-powered matchmaking for business meetings.",
    results: [
      { value: "5000+", label: "Attendees" },
      { value: "40", label: "Countries" },
      { value: "200+", label: "Speakers" },
      { value: "50M+", label: "Impressions" },
    ],
    highlights: [
      "Keynote from 3 Fortune 500 CEOs",
      "Startup pitch competition with $1M prize",
      "150+ exhibiting companies",
      "1,500 scheduled B2B meetings",
      "Live streaming to 50,000 virtual attendees",
    ],
    testimonial: {
      quote:
        "Working with Be Creative was seamless from start to finish. They managed every aspect of our international conference flawlessly and helped us create an event that will be remembered for years.",
      author: "Sarah Mitchell",
      role: "Head of Marketing",
      company: "Qatar Science & Technology Park",
    },
    gallery: [
      "/images/portfolio/tech-1.jpg",
      "/images/portfolio/tech-2.jpg",
      "/images/portfolio/tech-3.jpg",
      "/images/portfolio/tech-4.jpg",
    ],
    relatedProjects: ["fintech-conference", "healthcare-summit"],
  },
  "corporate-gala-night": {
    title: "Corporate Excellence Awards",
    category: "Award Ceremonies",
    categorySlug: "award-ceremonies",
    year: "2024",
    client: "Qatar Chamber of Commerce",
    location: "Four Seasons Doha",
    duration: "1 Evening",
    description:
      "An elegant evening celebrating business excellence and corporate achievements, bringing together Qatar's top business leaders for a night of recognition and celebration.",
    challenge:
      "Create a prestigious award ceremony that befits Qatar's top corporate leaders while ensuring an entertaining program that keeps 500+ guests engaged throughout the evening.",
    approach:
      "We designed a sophisticated gala experience combining luxury elements with dynamic entertainment. The evening was carefully choreographed to balance formal recognition moments with engaging performances and networking opportunities.",
    solution:
      "The gala featured a red carpet arrival experience, live orchestra, celebrity host, and a meticulously designed stage setup with LED screens. Each award presentation was accompanied by a cinematic video package celebrating the winner's achievements.",
    results: [
      { value: "500+", label: "Guests" },
      { value: "25", label: "Awards" },
      { value: "98%", label: "Satisfaction" },
      { value: "50+", label: "Media Coverage" },
    ],
    highlights: [
      "Red carpet arrival with step-and-repeat",
      "Live 12-piece orchestra",
      "Michelin-star dining experience",
      "Custom award trophies by renowned designer",
      "Celebrity entertainment act",
    ],
    gallery: [
      "/images/portfolio/gala-1.jpg",
      "/images/portfolio/gala-2.jpg",
      "/images/portfolio/gala-3.jpg",
      "/images/portfolio/gala-4.jpg",
    ],
    relatedProjects: ["qatar-national-day-2024", "luxury-auto-launch"],
  },
  "cultural-heritage-festival": {
    title: "Heritage Festival 2024",
    category: "Festivals & Cultural Events",
    categorySlug: "festivals-cultural-events",
    year: "2024",
    client: "Ministry of Culture",
    location: "Katara Cultural Village",
    duration: "7 Days",
    description:
      "A week-long celebration of Qatari culture, traditions, and heritage featuring traditional crafts, performances, cuisine, and interactive experiences for all ages.",
    challenge:
      "Create an authentic cultural experience that educates and entertains diverse audiences while preserving and promoting Qatari heritage in an engaging, family-friendly format.",
    approach:
      "We collaborated with cultural experts, local artisans, and traditional performers to create an immersive heritage village experience. The festival was designed with distinct zones representing different aspects of Qatari culture.",
    solution:
      "The festival featured a traditional souk with artisan workshops, a heritage tent with storytelling sessions, live folk performances, traditional games area, and a culinary village showcasing authentic Qatari cuisine.",
    results: [
      { value: "150K+", label: "Visitors" },
      { value: "7", label: "Days" },
      { value: "50+", label: "Artisans" },
      { value: "30+", label: "Performances" },
    ],
    highlights: [
      "Traditional pearl diving demonstrations",
      "Falcon show and interaction area",
      "Authentic Qatari cooking classes",
      "Traditional music and dance performances",
      "Heritage crafts marketplace",
    ],
    testimonial: {
      quote:
        "The team's dedication to cultural authenticity made our heritage festival a truly memorable event for all attendees.",
      author: "Fatima Al-Mansouri",
      role: "Event Director",
      company: "Ministry of Culture",
    },
    gallery: [
      "/images/portfolio/heritage-1.jpg",
      "/images/portfolio/heritage-2.jpg",
      "/images/portfolio/heritage-3.jpg",
      "/images/portfolio/heritage-4.jpg",
    ],
    relatedProjects: ["music-festival", "qatar-national-day-2024"],
  },
  "luxury-auto-launch": {
    title: "Luxury Auto Launch",
    category: "Corporate Launch Events",
    categorySlug: "corporate-launch-events",
    year: "2023",
    client: "Premium Automotive Brand",
    location: "The Pearl-Qatar",
    duration: "1 Evening",
    description:
      "Exclusive product reveal featuring an immersive brand experience and VIP hospitality for the launch of a new luxury vehicle in the Qatar market.",
    challenge:
      "Create an exclusive, high-impact product reveal that matches the prestige of the luxury automotive brand while generating significant media coverage and social buzz.",
    approach:
      "We designed a theatrical reveal experience that told the brand's story through an immersive journey. The event featured multiple sensory touchpoints leading to a dramatic car unveiling moment.",
    solution:
      "Guests were guided through a journey of brand history and innovation before the grand reveal. The car emerged from a custom-built stage with synchronized lighting, pyrotechnics, and a live orchestra performance.",
    results: [
      { value: "300", label: "VIP Guests" },
      { value: "50+", label: "Media Outlets" },
      { value: "25M", label: "Reach" },
      { value: "15", label: "Pre-orders" },
    ],
    highlights: [
      "Theatrical car reveal with pyrotechnics",
      "Immersive brand journey experience",
      "VIP test drive experience",
      "Michelin-star catering",
      "Live orchestra performance",
    ],
    testimonial: {
      quote:
        "Their creativity and execution are unmatched. Be Creative delivered a product launch that generated incredible buzz and media coverage.",
      author: "Mohammed Al-Kuwari",
      role: "Brand Manager",
      company: "Premium Automotive Brand",
    },
    gallery: [
      "/images/portfolio/auto-1.jpg",
      "/images/portfolio/auto-2.jpg",
      "/images/portfolio/auto-3.jpg",
      "/images/portfolio/auto-4.jpg",
    ],
    relatedProjects: ["real-estate-launch", "corporate-gala-night"],
  },
  "regional-sports-championship": {
    title: "GCC Sports Championship",
    category: "Sports & Entertainment Events",
    categorySlug: "sports-entertainment-events",
    year: "2023",
    client: "Qatar Olympic Committee",
    location: "Aspire Zone, Doha",
    duration: "5 Days",
    description:
      "Multi-day regional sporting event with international participants and broadcast coverage, featuring multiple sports disciplines and entertainment programming.",
    challenge:
      "Coordinate a complex multi-sport championship with participants from 6 GCC countries while delivering broadcast-quality production and engaging fan experiences.",
    approach:
      "We implemented a comprehensive event management system covering athlete services, competition management, media operations, and fan engagement across multiple venues within Aspire Zone.",
    solution:
      "The championship featured state-of-the-art timing systems, professional broadcast production, athlete villages, and interactive fan zones with games, entertainment, and F&B offerings.",
    results: [
      { value: "2000+", label: "Athletes" },
      { value: "6", label: "Countries" },
      { value: "8", label: "Sports" },
      { value: "10M+", label: "TV Viewers" },
    ],
    highlights: [
      "Professional broadcast to 15 countries",
      "Opening ceremony with 1000 performers",
      "Athlete village with full services",
      "Interactive fan zone experiences",
      "Medal ceremonies with VIP protocol",
    ],
    gallery: [
      "/images/portfolio/sports-1.jpg",
      "/images/portfolio/sports-2.jpg",
      "/images/portfolio/sports-3.jpg",
      "/images/portfolio/sports-4.jpg",
    ],
    relatedProjects: ["qatar-national-day-2024", "music-festival"],
  },
  "brand-activation-campaign": {
    title: "Interactive Brand Experience",
    category: "Experiential Events",
    categorySlug: "experiential-events",
    year: "2023",
    client: "Global Beverage Brand",
    location: "Multiple Locations, Qatar",
    duration: "2 Weeks",
    description:
      "Pop-up experiential activation featuring AR technology and social media integration, creating immersive brand moments across multiple high-traffic locations.",
    challenge:
      "Create a memorable brand activation that drives engagement with younger audiences, generates social media content, and increases brand affinity in a competitive market.",
    approach:
      "We designed a multi-touchpoint activation campaign featuring a central pop-up experience and satellite activations in malls and entertainment venues, all connected through a digital engagement platform.",
    solution:
      "The activation featured an AR experience, gamified challenges with instant prizes, social media photo opportunities, and a mobile app for extended engagement beyond the physical experience.",
    results: [
      { value: "75K+", label: "Interactions" },
      { value: "5M+", label: "Social Reach" },
      { value: "15K", label: "App Downloads" },
      { value: "35%", label: "Sales Lift" },
    ],
    highlights: [
      "Custom AR experience with brand mascot",
      "Gamified prize wheel with instant wins",
      "User-generated content campaign",
      "Influencer partnership program",
      "Real-time social wall display",
    ],
    gallery: [
      "/images/portfolio/activation-1.jpg",
      "/images/portfolio/activation-2.jpg",
      "/images/portfolio/activation-3.jpg",
      "/images/portfolio/activation-4.jpg",
    ],
    relatedProjects: ["luxury-auto-launch", "music-festival"],
  },
  "diplomatic-reception": {
    title: "Diplomatic Reception",
    category: "Government & Ministry Events",
    categorySlug: "government-ministry-events",
    year: "2023",
    client: "Ministry of Foreign Affairs",
    location: "Diplomatic Club, Doha",
    duration: "1 Evening",
    description:
      "High-profile diplomatic gathering with international delegates and dignitaries, requiring the highest standards of protocol, security, and hospitality.",
    challenge:
      "Execute a flawless diplomatic reception that adheres to strict protocol requirements while creating a welcoming atmosphere for delegates from 50+ countries.",
    approach:
      "We worked closely with protocol officers to understand the specific requirements for each delegation while designing an elegant event flow that facilitated meaningful interactions between diplomats.",
    solution:
      "The reception featured carefully planned seating arrangements, multilingual staff, dietary-compliant catering from multiple cuisines, and discrete security coordination with multiple agencies.",
    results: [
      { value: "200+", label: "Diplomats" },
      { value: "50+", label: "Countries" },
      { value: "100%", label: "Protocol Compliance" },
      { value: "0", label: "Incidents" },
    ],
    highlights: [
      "Red carpet welcome with national flags",
      "Multilingual event coordination",
      "Multi-cuisine diplomatic dinner",
      "Cultural performance showcase",
      "Secure transportation coordination",
    ],
    gallery: [
      "/images/portfolio/diplomatic-1.jpg",
      "/images/portfolio/diplomatic-2.jpg",
      "/images/portfolio/diplomatic-3.jpg",
      "/images/portfolio/diplomatic-4.jpg",
    ],
    relatedProjects: ["qatar-national-day-2024", "corporate-gala-night"],
  },
  "fintech-conference": {
    title: "FinTech Forward 2023",
    category: "Conferences & Summits",
    categorySlug: "conferences-summits",
    year: "2023",
    client: "Qatar Financial Centre",
    location: "QFC Tower, Doha",
    duration: "2 Days",
    description:
      "Leading financial technology conference exploring the future of banking and finance, bringing together industry leaders, regulators, and innovators.",
    challenge:
      "Create a thought leadership platform that positions QFC as a leading fintech hub while providing valuable content and networking opportunities for financial professionals.",
    approach:
      "We curated a program featuring global fintech leaders, interactive workshops, and a startup showcase, complemented by exclusive networking events for C-suite executives.",
    solution:
      "The conference featured a main stage, workshop rooms, fintech innovation lab, startup pitch arena, and VIP networking lounges with curated matchmaking services.",
    results: [
      { value: "1500+", label: "Attendees" },
      { value: "75", label: "Speakers" },
      { value: "40", label: "Startups" },
      { value: "$5M+", label: "Deals Initiated" },
    ],
    highlights: [
      "Keynote from central bank governor",
      "Fintech startup pitch competition",
      "Regulatory roundtable sessions",
      "Innovation lab demonstrations",
      "Investor networking sessions",
    ],
    gallery: [
      "/images/portfolio/fintech-1.jpg",
      "/images/portfolio/fintech-2.jpg",
      "/images/portfolio/fintech-3.jpg",
      "/images/portfolio/fintech-4.jpg",
    ],
    relatedProjects: ["tech-summit-doha", "healthcare-summit"],
  },
  "music-festival": {
    title: "Desert Beats Festival",
    category: "Festivals & Cultural Events",
    categorySlug: "festivals-cultural-events",
    year: "2023",
    client: "Entertainment Authority",
    location: "Inland Sea, Qatar",
    duration: "3 Days",
    description:
      "Three-day music festival in a unique desert setting featuring international and regional artists, creating an unforgettable fusion of music and natural beauty.",
    challenge:
      "Produce a world-class music festival in a remote desert location while ensuring artist satisfaction, audience safety, and minimal environmental impact.",
    approach:
      "We developed a comprehensive production plan that addressed the unique challenges of desert events, including climate control, power generation, and sustainable waste management.",
    solution:
      "The festival featured two stages, glamping accommodations, gourmet F&B village, wellness area, and a carefully designed site plan that preserved the natural landscape.",
    results: [
      { value: "25K+", label: "Attendees" },
      { value: "30", label: "Artists" },
      { value: "3", label: "Days" },
      { value: "Zero", label: "Incidents" },
    ],
    highlights: [
      "International headline performances",
      "Luxury desert glamping experience",
      "Sunrise yoga and wellness program",
      "Gourmet food village with 20 vendors",
      "Sustainable event certification",
    ],
    gallery: [
      "/images/portfolio/music-1.jpg",
      "/images/portfolio/music-2.jpg",
      "/images/portfolio/music-3.jpg",
      "/images/portfolio/music-4.jpg",
    ],
    relatedProjects: ["cultural-heritage-festival", "regional-sports-championship"],
  },
  "healthcare-summit": {
    title: "Healthcare Innovation Summit",
    category: "Conferences & Summits",
    categorySlug: "conferences-summits",
    year: "2022",
    client: "Ministry of Health",
    location: "Sheraton Grand Doha",
    duration: "2 Days",
    description:
      "Regional healthcare conference focusing on medical innovation, digital health, and patient care excellence, bringing together healthcare leaders from across the GCC.",
    challenge:
      "Create a professional healthcare conference that facilitates knowledge sharing while adhering to medical industry standards and regulations.",
    approach:
      "We partnered with healthcare experts to develop a scientifically rigorous program while creating an engaging conference experience with interactive elements and networking opportunities.",
    solution:
      "The summit featured keynote sessions, panel discussions, medical technology exhibition, workshop tracks, and a dedicated area for medical demonstrations and simulations.",
    results: [
      { value: "1200+", label: "Attendees" },
      { value: "50", label: "Speakers" },
      { value: "30", label: "Exhibitors" },
      { value: "15", label: "CME Credits" },
    ],
    highlights: [
      "Medical simulation demonstrations",
      "Telemedicine workshop series",
      "Healthcare technology showcase",
      "Patient care excellence awards",
      "CME-accredited sessions",
    ],
    gallery: [
      "/images/portfolio/health-1.jpg",
      "/images/portfolio/health-2.jpg",
      "/images/portfolio/health-3.jpg",
      "/images/portfolio/health-4.jpg",
    ],
    relatedProjects: ["tech-summit-doha", "fintech-conference"],
  },
  "real-estate-launch": {
    title: "Landmark Development Launch",
    category: "Corporate Launch Events",
    categorySlug: "corporate-launch-events",
    year: "2022",
    client: "Leading Real Estate Developer",
    location: "Project Site, Lusail",
    duration: "1 Evening",
    description:
      "Grand unveiling of a luxury residential and commercial development project, showcasing the future of urban living in Qatar to investors and prospective buyers.",
    challenge:
      "Create an impressive launch event that communicates the vision and quality of a multi-billion dollar development while generating investor interest and sales leads.",
    approach:
      "We designed an immersive experience that transported guests into the future completed development using projection mapping, VR experiences, and architectural models.",
    solution:
      "The launch featured a cinematic presentation, 360-degree projection room, VR property tours, and a scale model reveal, followed by an exclusive dinner for VIP investors.",
    results: [
      { value: "400", label: "Guests" },
      { value: "$50M+", label: "In Inquiries" },
      { value: "25", label: "Units Reserved" },
      { value: "100%", label: "Media Coverage" },
    ],
    highlights: [
      "360-degree projection mapping experience",
      "VR property walkthrough stations",
      "Architectural scale model reveal",
      "VIP investor dinner",
      "Live architectural presentation",
    ],
    gallery: [
      "/images/portfolio/realestate-1.jpg",
      "/images/portfolio/realestate-2.jpg",
      "/images/portfolio/realestate-3.jpg",
      "/images/portfolio/realestate-4.jpg",
    ],
    relatedProjects: ["luxury-auto-launch", "corporate-gala-night"],
  },
  "qatar-ecommerce-hackathon": {
    title: "Qatar's 1st E-Commerce Hackathon",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "Ministry of Communications and Information Technology (MCIT)",
    location: "Doha, Qatar",
    duration: "3 Days",
    description:
      "Qatar's first-ever e-commerce hackathon, a groundbreaking initiative bringing together innovators, developers, and entrepreneurs to solve digital commerce challenges and drive innovation in the nation's growing digital economy.",
    challenge:
      "Design and execute Qatar's first e-commerce hackathon, creating an environment that inspires innovation while providing participants with the resources and mentorship needed to develop viable digital commerce solutions.",
    approach:
      "We created an immersive hackathon experience with expert mentors, collaborative workspaces, and structured programming that guided participants from ideation to prototype development.",
    solution:
      "The hackathon featured multiple tracks addressing key e-commerce challenges, expert judging panels, networking sessions with industry leaders, and prize awards for the most innovative solutions.",
    results: [
      { value: "First", label: "E-Commerce Hackathon" },
      { value: "3", label: "Days" },
      { value: "Innovation", label: "Focus" },
      { value: "MCIT", label: "Partnership" },
    ],
    highlights: [
      "Qatar's first e-commerce focused hackathon",
      "Expert mentorship from industry leaders",
      "Multiple innovation tracks",
      "Networking with digital commerce pioneers",
      "Prize awards for top solutions",
    ],
    gallery: [
      "/images/portfolio/qatar-ecommerce-hackathon-1.jpg",
      "/images/portfolio/qatar-ecommerce-hackathon-2.jpg",
      "/images/portfolio/qatar-ecommerce-hackathon-3.jpg",
    ],
    relatedProjects: ["digital-agenda-2030", "fanar-launch"],
  },
  "ooredoo-yalla-namshi": {
    title: "Ooredoo x MSDF Yalla Namshi",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "Ooredoo / MSDF",
    location: "Doha, Qatar",
    duration: "1 Day",
    description:
      "A collaborative wellness and community event by Ooredoo and MSDF, promoting active lifestyle and social connection through an engaging walking initiative that brought together participants of all ages.",
    challenge:
      "Create a community-focused wellness event that encourages physical activity while fostering social connections and promoting the collaborative partnership between Ooredoo and MSDF.",
    approach:
      "We designed an inclusive event experience that combined fitness activities with community engagement, featuring interactive stations and activities that appealed to diverse participants.",
    solution:
      "The event featured organized walking routes, wellness activities, interactive brand activations, refreshment stations, and community celebration moments that brought participants together.",
    results: [
      { value: "Community", label: "Focus" },
      { value: "Wellness", label: "Theme" },
      { value: "Partnership", label: "Ooredoo x MSDF" },
      { value: "All Ages", label: "Participants" },
    ],
    highlights: [
      "Community wellness initiative",
      "Active lifestyle promotion",
      "Ooredoo and MSDF partnership",
      "Interactive wellness activities",
      "Inclusive event for all ages",
    ],
    gallery: [
      "/images/portfolio/ooredoo-yalla-namshi-1.jpg",
      "/images/portfolio/ooredoo-yalla-namshi-2.jpg",
      "/images/portfolio/ooredoo-yalla-namshi-3.jpg",
    ],
    relatedProjects: ["msdf-mulhemeen", "regional-sports-championship"],
  },
  "msdf-mulhemeen": {
    title: "MSDF Mulhemeen",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "MSDF",
    location: "Doha, Qatar",
    duration: "1 Evening",
    description:
      "An inspiring celebration honoring achievers and showcasing stories of success, determination, and perseverance. Mulhemeen brought together remarkable individuals whose journeys inspire others to pursue excellence.",
    challenge:
      "Create an emotionally impactful event that authentically celebrates achievement while inspiring the audience through compelling storytelling and meaningful recognition moments.",
    approach:
      "We designed an evening that balanced celebration with inspiration, featuring multimedia storytelling, live testimonials, and carefully choreographed award presentations.",
    solution:
      "The event featured cinematic video tributes, live interviews with honorees, musical performances, and an elegant awards ceremony that celebrated each achiever's unique journey.",
    results: [
      { value: "Inspiring", label: "Stories" },
      { value: "Excellence", label: "Celebrated" },
      { value: "MSDF", label: "Initiative" },
      { value: "Impact", label: "Created" },
    ],
    highlights: [
      "Celebration of remarkable achievers",
      "Compelling multimedia storytelling",
      "Live testimonials and interviews",
      "Elegant awards ceremony",
      "Inspirational evening program",
      "Musical performances",
    ],
    gallery: [
      "/images/portfolio/msdf-mulhemeen-1.jpg",
      "/images/portfolio/msdf-mulhemeen-2.jpg",
      "/images/portfolio/msdf-mulhemeen-3.jpg",
      "/images/portfolio/msdf-mulhemeen-4.jpg",
      "/images/portfolio/msdf-mulhemeen-5.jpg",
      "/images/portfolio/msdf-mulhemeen-6.jpg",
    ],
    relatedProjects: ["ooredoo-yalla-namshi", "corporate-gala-night"],
  },
  "al-jazeera-finance-anniversary": {
    title: "Al Jazeera Finance Anniversary",
    category: "Events",
    categorySlug: "events",
    year: "2024",
    client: "Al Jazeera Finance",
    location: "Doha, Qatar",
    duration: "1 Evening",
    description:
      "An elegant corporate anniversary celebration honoring Al Jazeera Finance's milestones and achievements. The event brought together stakeholders, partners, and team members to celebrate the company's journey and vision for the future.",
    challenge:
      "Design a sophisticated anniversary celebration that honors the company's heritage while looking forward to future growth, creating meaningful moments for all attendees.",
    approach:
      "We created an elegant evening experience that balanced reflection on achievements with celebration of the company's people and vision for continued success.",
    solution:
      "The celebration featured a retrospective journey through company milestones, recognition of key contributors, keynote presentations, and an elegant dinner experience.",
    results: [
      { value: "Milestone", label: "Celebration" },
      { value: "Heritage", label: "Honored" },
      { value: "Vision", label: "Shared" },
      { value: "Team", label: "Celebrated" },
    ],
    highlights: [
      "Corporate milestone celebration",
      "Retrospective journey through achievements",
      "Recognition of key contributors",
      "Vision for future growth",
      "Elegant evening experience",
    ],
    gallery: [
      "/images/portfolio/al-jazeera-finance-anniversary-1.jpg",
      "/images/portfolio/al-jazeera-finance-anniversary-2.jpg",
      "/images/portfolio/al-jazeera-finance-anniversary-3.jpg",
    ],
    relatedProjects: ["corporate-gala-night", "digital-agenda-2030"],
  },
  "coffee-down-under": {
    title: "Coffee Down Under",
    category: "Branding",
    categorySlug: "branding",
    year: "2023",
    client: "Coffee Down Under",
    location: "Qatar",
    duration: "Brand Development",
    description:
      "Complete brand development and visual identity for Coffee Down Under, an Australian-inspired coffee experience in Qatar. The branding captures the warmth, quality, and authentic coffee culture that defines the Australian café experience.",
    challenge:
      "Create a distinctive brand identity that authentically represents Australian coffee culture while appealing to the Qatar market and standing out in a competitive café landscape.",
    approach:
      "We developed a comprehensive brand strategy that balanced Australian authenticity with local market appeal, creating visual elements that evoke warmth, quality, and the relaxed café atmosphere.",
    solution:
      "The brand identity includes a distinctive logo, warm color palette inspired by Australian landscapes, custom typography, packaging design, menu design, and complete visual guidelines for all touchpoints.",
    results: [
      { value: "Complete", label: "Brand Identity" },
      { value: "Australian", label: "Inspiration" },
      { value: "Premium", label: "Positioning" },
      { value: "Distinctive", label: "Visual System" },
    ],
    highlights: [
      "Distinctive logo and visual identity",
      "Australian-inspired color palette",
      "Custom typography and design system",
      "Comprehensive packaging design",
      "Menu and collateral design",
      "Complete brand guidelines",
    ],
    gallery: [
      "/images/portfolio/coffee-down-under-1.jpg",
      "/images/portfolio/coffee-down-under-2.gif",
      "/images/portfolio/coffee-down-under-3.jpg",
      "/images/portfolio/coffee-down-under-5.jpg",
      "/images/portfolio/coffee-down-under-6.jpg",
      "/images/portfolio/coffee-down-under-7.jpg",
      "/images/portfolio/coffee-down-under-9.jpg",
      "/images/portfolio/coffee-down-under-10.jpg",
      "/images/portfolio/coffee-down-under-11.jpg",
      "/images/portfolio/coffee-down-under-12.jpg",
      "/images/portfolio/coffee-down-under-13.jpg",
      "/images/portfolio/coffee-down-under-14.jpg",
      "/images/portfolio/coffee-down-under-15.jpg",
      "/images/portfolio/coffee-down-under-16.jpg",
      "/images/portfolio/coffee-down-under-17.jpg",
      "/images/portfolio/coffee-down-under-18.jpg",
    ],
    relatedProjects: ["halwa-al-saigal", "greens"],
  },
  "investment-trade-court": {
    title: "Investment & Trade Court",
    category: "Branding",
    categorySlug: "branding",
    year: "2023",
    client: "Investment & Trade Court",
    location: "Qatar",
    duration: "Brand Development",
    description:
      "Professional brand identity and visual systems development for Qatar's Investment & Trade Court. The branding reflects authority, trust, and professionalism befitting a judicial institution focused on investment and trade matters.",
    challenge:
      "Develop a brand identity that conveys authority, trust, and accessibility for a judicial institution, while maintaining the gravitas expected of a court while being approachable for business stakeholders.",
    approach:
      "We created a sophisticated visual identity that balances traditional judicial symbolism with modern design principles, reflecting both heritage and forward-thinking approach to investment and trade law.",
    solution:
      "The comprehensive brand identity includes a distinctive emblem, professional color palette, custom typography, stationery design, signage systems, and complete visual guidelines for all institutional communications.",
    results: [
      { value: "Authority", label: "Conveyed" },
      { value: "Trust", label: "Established" },
      { value: "Professional", label: "Identity" },
      { value: "Complete", label: "Visual System" },
    ],
    highlights: [
      "Distinctive institutional emblem",
      "Professional color palette",
      "Custom typography selection",
      "Complete stationery design",
      "Signage and wayfinding system",
      "Comprehensive brand guidelines",
    ],
    gallery: Array.from({ length: 33 }, (_, i) =>
      i === 3
        ? `/images/portfolio/investment-trade-court-${i + 1}.gif`
        : `/images/portfolio/investment-trade-court-${i + 1}.jpg`
    ),
    relatedProjects: ["greens", "halwa-al-saigal"],
  },
  "greens": {
    title: "Green's",
    category: "Branding",
    categorySlug: "branding",
    year: "2023",
    client: "Green's",
    location: "Qatar",
    duration: "Brand Development",
    description:
      "Fresh brand identity development for Green's, focusing on healthy lifestyle and sustainable products. The branding embodies freshness, vitality, and environmental consciousness while appealing to health-conscious consumers.",
    challenge:
      "Create a brand identity that communicates freshness, health, and sustainability while standing out in the competitive healthy lifestyle market and appealing to environmentally conscious consumers.",
    approach:
      "We developed a vibrant visual identity centered on freshness and vitality, using natural colors and organic design elements that reflect the brand's commitment to health and sustainability.",
    solution:
      "The brand identity features a fresh logo, natural color palette, organic typography, sustainable packaging design, and comprehensive visual guidelines that extend across all brand touchpoints.",
    results: [
      { value: "Fresh", label: "Identity" },
      { value: "Sustainable", label: "Focus" },
      { value: "Healthy", label: "Lifestyle" },
      { value: "Complete", label: "Brand System" },
    ],
    highlights: [
      "Fresh and vibrant logo design",
      "Natural, organic color palette",
      "Sustainable packaging design",
      "Health-focused visual language",
      "Environmental messaging integration",
      "Complete brand guidelines",
    ],
    gallery: [
      "/images/portfolio/greens-1.png",
      "/images/portfolio/greens-2.png",
      "/images/portfolio/greens-3.png",
      "/images/portfolio/greens-4.png",
      "/images/portfolio/greens-5.png",
      "/images/portfolio/greens-6.png",
      "/images/portfolio/greens-7.png",
      "/images/portfolio/greens-8.png",
      "/images/portfolio/greens-9.png",
      "/images/portfolio/greens-10.jpg",
      "/images/portfolio/greens-11.png",
      "/images/portfolio/greens-12.png",
      "/images/portfolio/greens-13.png",
      "/images/portfolio/greens-14.png",
      "/images/portfolio/greens-15.png",
      "/images/portfolio/greens-16.png",
      "/images/portfolio/greens-17.png",
      "/images/portfolio/greens-18.png",
      "/images/portfolio/greens-19.png",
      "/images/portfolio/greens-20.png",
      "/images/portfolio/greens-21.png",
      "/images/portfolio/greens-22.png",
      "/images/portfolio/greens-23.png",
      "/images/portfolio/greens-24.png",
      "/images/portfolio/greens-25.png",
      "/images/portfolio/greens-26.png",
      "/images/portfolio/greens-27.png",
      "/images/portfolio/greens-28.png",
      "/images/portfolio/greens-29.png",
      "/images/portfolio/greens-30.png",
      "/images/portfolio/greens-31.png",
      "/images/portfolio/greens-32.png",
      "/images/portfolio/greens-33.png",
    ],
    relatedProjects: ["coffee-down-under", "halwa-al-saigal"],
  },
  "halwa-al-saigal": {
    title: "Halwa Al Saigal",
    category: "Branding",
    categorySlug: "branding",
    year: "2023",
    client: "Halwa Al Saigal",
    location: "Qatar",
    duration: "Brand Development",
    description:
      "Traditional Qatari sweets brand identity that celebrates heritage and authentic flavors. The branding honors the rich tradition of Qatari halwa while creating a contemporary visual identity that appeals to modern consumers.",
    challenge:
      "Develop a brand identity that authentically represents traditional Qatari confectionery heritage while creating contemporary appeal for a new generation of consumers.",
    approach:
      "We blended traditional Qatari design elements with modern branding principles, creating a visual identity that respects heritage while positioning the brand for contemporary market success.",
    solution:
      "The brand identity features traditional Arabic calligraphy, heritage-inspired patterns, warm earthy colors, elegant packaging design, and comprehensive guidelines that honor tradition while embracing modernity.",
    results: [
      { value: "Heritage", label: "Honored" },
      { value: "Traditional", label: "Authenticity" },
      { value: "Modern", label: "Appeal" },
      { value: "Complete", label: "Brand Identity" },
    ],
    highlights: [
      "Traditional Arabic calligraphy",
      "Heritage-inspired design patterns",
      "Warm, earthy color palette",
      "Elegant packaging design",
      "Cultural authenticity",
      "Contemporary market positioning",
    ],
    gallery: Array.from({ length: 28 }, (_, i) => `/images/portfolio/halwa-al-saigal-${i + 1}.jpg`),
    relatedProjects: ["coffee-down-under", "greens"],
  },
  "watad-msdf": {
    title: "WATAD MSDF",
    category: "Branding",
    categorySlug: "branding",
    year: "2023",
    client: "MSDF",
    location: "Qatar",
    duration: "Brand Development",
    description:
      "Complete brand identity development for WATAD, an MSDF initiative. The branding reflects strength, stability, and purpose, creating a visual identity that resonates with the organization's mission and values.",
    challenge:
      "Create a brand identity that communicates strength, stability, and purpose while reflecting MSDF's commitment to social development and community empowerment.",
    approach:
      "We developed a powerful visual identity that embodies the meaning of 'Watad' (pillar/stake), using strong geometric forms and purposeful design elements that convey stability and support.",
    solution:
      "The brand identity features a bold logo symbolizing strength and support, a confident color palette, strong typography, and comprehensive visual guidelines for all MSDF communications and initiatives.",
    results: [
      { value: "Strength", label: "Conveyed" },
      { value: "Purpose", label: "Defined" },
      { value: "MSDF", label: "Initiative" },
      { value: "Complete", label: "Visual Identity" },
    ],
    highlights: [
      "Bold logo symbolizing strength",
      "Strong geometric design language",
      "Confident color palette",
      "Powerful typography selection",
      "Mission-aligned visual identity",
      "Complete brand guidelines",
    ],
    gallery: [
      "/images/portfolio/watad-msdf-1.jpg",
      "/images/portfolio/watad-msdf-2.gif",
      "/images/portfolio/watad-msdf-3.jpg",
      "/images/portfolio/watad-msdf-4.jpg",
      "/images/portfolio/watad-msdf-5.jpg",
      "/images/portfolio/watad-msdf-6.jpg",
      "/images/portfolio/watad-msdf-7.jpg",
      "/images/portfolio/watad-msdf-8.jpg",
      "/images/portfolio/watad-msdf-9.jpg",
      "/images/portfolio/watad-msdf-10.jpg",
      "/images/portfolio/watad-msdf-11.jpg",
      "/images/portfolio/watad-msdf-12.jpg",
      "/images/portfolio/watad-msdf-13.jpg",
      "/images/portfolio/watad-msdf-14.jpg",
      "/images/portfolio/watad-msdf-15.jpg",
      "/images/portfolio/watad-msdf-16.jpg",
      "/images/portfolio/watad-msdf-17.jpg",
      "/images/portfolio/watad-msdf-18.jpg",
      "/images/portfolio/watad-msdf-19.jpg",
      "/images/portfolio/watad-msdf-20.jpg",
      "/images/portfolio/watad-msdf-21.jpg",
      "/images/portfolio/watad-msdf-22.jpg",
      "/images/portfolio/watad-msdf-23.jpg",
      "/images/portfolio/watad-msdf-24.jpg",
      "/images/portfolio/watad-msdf-25.jpg",
      "/images/portfolio/watad-msdf-26.jpg",
      "/images/portfolio/watad-msdf-27.jpg",
      "/images/portfolio/watad-msdf-28.jpg",
    ],
    relatedProjects: ["msdf-mulhemeen", "ooredoo-yalla-namshi"],
  },
};

// Gallery Section Component with Lightbox
function GallerySection({ gallery, title }: { gallery: string[]; title: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  }, [gallery.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goPrev, goNext]);

  // Show max 8 images in grid, with "view all" if more
  const displayImages = gallery.slice(0, 8);
  const hasMore = gallery.length > 8;

  return (
    <>
      <section className="py-12 bg-core-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayImages.map((image, index) => (
              <GsapScrollReveal key={index} animation="fadeUp" delay={Math.min(index * 0.05, 0.3)}>
                <button
                  onClick={() => openLightbox(index)}
                  className={`relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-dream/20 to-red-spark/20 group cursor-pointer w-full ${
                    index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  />
                  <div className="absolute inset-0 bg-core-black/0 group-hover:bg-core-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                  {/* Show count on last visible image if there are more */}
                  {hasMore && index === 7 && (
                    <div className="absolute inset-0 bg-core-black/60 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">+{gallery.length - 8}</span>
                    </div>
                  )}
                </button>
              </GsapScrollReveal>
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={() => openLightbox(0)}
                className="px-6 py-3 border border-white/20 hover:border-red-spark/50 text-white rounded-lg transition-colors hover:bg-white/5"
              >
                View All {gallery.length} Images
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-core-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-4 right-4 z-[60] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-all"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-[80vw] h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={gallery[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="80vw"
                priority
              />
            </motion.div>

            {/* Navigation buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-all"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-all"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[60] px-4 py-2 bg-white/10 rounded-full text-white/70 text-sm">
              {currentIndex + 1} / {gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = PROJECTS[slug];

  if (!project) {
    return (
      <section className="min-h-screen pt-32 pb-20 bg-core-black">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-text-muted mb-8">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/portfolio" className="text-red-spark hover:text-white transition-colors">
            ← Back to Portfolio
          </Link>
        </div>
      </section>
    );
  }

  const relatedProjectsData = project.relatedProjects
    .map((slug) => ({ slug, ...PROJECTS[slug] }))
    .filter((p) => p.title);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-core-black overflow-hidden min-h-[70vh] flex items-end">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-dream/30 to-red-spark/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-core-black via-core-black/70 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-text-muted hover:text-white mb-8 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="px-4 py-1 bg-red-spark/20 text-red-spark text-sm font-medium rounded-full">
                {project.category}
              </span>
              <span className="text-text-muted">{project.year}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {project.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              <div>
                <div className="text-text-muted text-sm mb-1">Client</div>
                <div className="text-white font-medium">{project.client}</div>
              </div>
              <div>
                <div className="text-text-muted text-sm mb-1">Location</div>
                <div className="text-white font-medium">{project.location}</div>
              </div>
              <div>
                <div className="text-text-muted text-sm mb-1">Duration</div>
                <div className="text-white font-medium">{project.duration}</div>
              </div>
              <div>
                <div className="text-text-muted text-sm mb-1">Category</div>
                <div className="text-white font-medium">{project.category}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Stats */}
      <section className="py-16 bg-core-black border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.results.map((result, index) => (
              <GsapScrollReveal key={result.label} animation="fadeUp" delay={index * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-red-spark mb-2">
                    {result.value}
                  </div>
                  <div className="text-text-muted text-sm">{result.label}</div>
                </div>
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 bg-core-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <GsapScrollReveal animation="fadeUp">
              <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-text-muted text-lg leading-relaxed">{project.description}</p>
            </GsapScrollReveal>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <GallerySection gallery={project.gallery} title={project.title} />

      {/* Challenge, Approach, Solution */}
      <section className="py-24 bg-gradient-to-b from-core-black to-core-black/95">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            <GsapScrollReveal animation="fadeUp">
              <div>
                <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
                  The Challenge
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-4">What We Faced</h3>
                <p className="text-text-muted leading-relaxed">{project.challenge}</p>
              </div>
            </GsapScrollReveal>

            <GsapScrollReveal animation="fadeUp">
              <div>
                <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
                  Our Approach
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-4">How We Tackled It</h3>
                <p className="text-text-muted leading-relaxed">{project.approach}</p>
              </div>
            </GsapScrollReveal>

            <GsapScrollReveal animation="fadeUp">
              <div>
                <span className="text-red-spark text-sm font-medium tracking-widest uppercase">
                  The Solution
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-4">What We Delivered</h3>
                <p className="text-text-muted leading-relaxed">{project.solution}</p>
              </div>
            </GsapScrollReveal>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-24 bg-core-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <GsapScrollReveal animation="fadeUp">
              <h2 className="text-3xl font-bold text-white mb-8">Project Highlights</h2>
            </GsapScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.highlights.map((highlight, index) => (
                <GsapScrollReveal key={index} animation="fadeUp" delay={index * 0.1}>
                  <div className="p-6 bg-white/5 rounded-lg border border-white/10 flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-spark/20 flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-red-spark"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <span className="text-text-light">{highlight}</span>
                  </div>
                </GsapScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {project.testimonial && (
        <section className="py-24 bg-gradient-to-b from-core-black/95 to-core-black">
          <div className="container mx-auto px-6">
            <GsapScrollReveal animation="fadeUp">
              <div className="max-w-3xl mx-auto text-center">
                <svg
                  className="w-16 h-16 text-red-spark/30 mx-auto mb-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-8">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div>
                  <div className="text-white font-semibold text-lg">
                    {project.testimonial.author}
                  </div>
                  <div className="text-text-muted">
                    {project.testimonial.role}, {project.testimonial.company}
                  </div>
                </div>
              </div>
            </GsapScrollReveal>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjectsData.length > 0 && (
        <section className="py-24 bg-core-black border-t border-white/10">
          <div className="container mx-auto px-6">
            <GsapScrollReveal animation="fadeUp">
              <h2 className="text-3xl font-bold text-white mb-12">Related Projects</h2>
            </GsapScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjectsData.map((related, index) => (
                <GsapScrollReveal key={related.slug} animation="fadeUp" delay={index * 0.1}>
                  <Link
                    href={`/portfolio/${related.slug}`}
                    className="group block bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-red-spark/50 transition-colors"
                  >
                    <div className="aspect-[16/9] bg-gradient-to-br from-purple-dream/20 to-red-spark/20 relative">
                      <div className="absolute inset-0 bg-core-black/30 group-hover:bg-core-black/10 transition-colors" />
                    </div>
                    <div className="p-6">
                      <span className="text-red-spark text-xs font-medium tracking-wider uppercase">
                        {related.category}
                      </span>
                      <h3 className="text-xl font-semibold text-white mt-2 group-hover:text-red-spark transition-colors">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                </GsapScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-core-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <GsapScrollReveal animation="fadeUp">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-text-muted text-lg mb-8">
                Let&apos;s create something extraordinary together.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton strength={0.2}>
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-4 bg-red-spark hover:bg-red-spark/90 text-white font-medium rounded transition-all duration-300"
                  >
                    Get in Touch
                  </Link>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Link
                    href="/portfolio"
                    className="inline-block px-8 py-4 border border-white/20 hover:border-white/40 text-white font-medium rounded transition-all duration-300 hover:bg-white/5"
                  >
                    View More Projects
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
