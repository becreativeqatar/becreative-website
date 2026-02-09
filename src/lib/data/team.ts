// Shared team data for team listing and profile pages

export interface LeadershipMember {
  id: number;
  slug: string;
  name: string;
  role: string;
  bio: string;
  achievements: string[];
  experience: string[];
  highlights: string[];
  linkedin: string;
  featured: boolean;
}

export interface TeamMember {
  id: number;
  slug: string;
  name: string;
  role: string;
  email: string;
}

/**
 * Leadership team members (CEO, etc.)
 */
export const LEADERSHIP: LeadershipMember[] = [
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

/**
 * Core team members.
 */
export const TEAM_MEMBERS: TeamMember[] = [
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
