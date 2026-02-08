"use client";

import { motion } from "framer-motion";
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
};

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
      <section className="py-12 bg-core-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.gallery.map((image, index) => (
              <GsapScrollReveal key={index} animation="fadeUp" delay={index * 0.1}>
                <div
                  className={`relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-dream/20 to-red-spark/20 ${
                    index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white/20">
                    <svg
                      className="w-12 h-12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                </div>
              </GsapScrollReveal>
            ))}
          </div>
        </div>
      </section>

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
