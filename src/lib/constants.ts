export const BRAND_COLORS = {
  redSpark: "#E0251C",
  coreBlack: "#101820",
  purpleDream: "#8232A7",
  desertDune: "#D7D1CA",
  white: "#FFFFFF",
  textLight: "#F5F5F5",
  textMuted: "#999999",
} as const;

export const SITE_CONFIG = {
  name: "Be Creative Events",
  tagline: "Be Memorable",
  slogan: "Celebrating Brands for the Love of Qatar",
  domain: "bce.qa",
  location: "Doha, Qatar",
  address: "Rafal Tower, Lusail, 9th Floor",
  phone1: "+974 40085557",
  phone2: "+974 60000401",
  email: "info@bce.qa",
  website: "www.bce.qa",
  founded: 2018,
  founder: "Mr. Ramzan Al Nuaimi",
  ceo: "Marie Line Halabi",
  defaultLocale: "en",
  locales: ["en", "ar"] as const,
} as const;

export const SERVICES = [
  {
    slug: "events",
    title: "Events",
    description: "Immersive event management, destination creation, and cultural storytelling",
    subServices: [
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
  },
  {
    slug: "branding",
    title: "Branding",
    description: "Brand development, visual identity, and space design",
    subServices: [
      "Brand Development",
      "Strategy & Positioning",
      "Brand Guidelines",
      "Visual Identity",
      "Marketing Campaigns",
      "Packaging",
      "Space Design",
    ],
  },
  {
    slug: "media-production",
    title: "Media Production",
    description: "Photography, film, animation, and post-production services",
    subServices: [
      "Photography",
      "Film & Video Content Production",
      "Illustration",
      "2D & 3D Animation",
      "Motion Graphics",
      "Voice-overs",
      "Post Production & VFX",
    ],
  },
  {
    slug: "digital",
    title: "Digital",
    description: "Digital marketing, web development, and mobile applications",
    subServices: [
      "Social Media Management",
      "Social Media Advertising",
      "Digital Marketing",
      "Search Engine Optimization",
      "Search Engine Advertising",
      "Website Design & Development",
      "iOS & Android Applications",
    ],
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;
