import { MetadataRoute } from "next";
import { SITE_CONFIG, SERVICES } from "@/lib/constants";

const baseUrl = `https://${SITE_CONFIG.domain}`;

// Project slugs for portfolio pages
const projectSlugs = [
  "luminous-2024",
  "sealine-season-2025",
  "al-samri-night",
  "horticultural-expo-doha-2023",
  "digital-agenda-2030",
  "fanar-launch",
  "qatar-national-day-2024",
  "tech-summit-doha",
  "corporate-gala-night",
  "cultural-heritage-festival",
  "luxury-auto-launch",
  "regional-sports-championship",
  "brand-activation-campaign",
  "diplomatic-reception",
  "fintech-conference",
  "music-festival",
  "healthcare-summit",
  "real-estate-launch",
  "qatar-ecommerce-hackathon",
  "ooredoo-yalla-namshi",
  "msdf-mulhemeen",
  "al-jazeera-finance-anniversary",
  "coffee-down-under",
  "investment-trade-court",
  "greens",
  "halwa-al-saigal",
  "watad-msdf",
];

// Team member slugs
const teamSlugs = [
  "marie-line-halabi",
  "rawan-lteif",
  "christine-moradian",
  "nida-mehaboob",
  "mohammed-ramees",
  "gracia-isabel-villar",
  "roy-tawk",
  "alfredo-nolasco",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const portfolioPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const teamPages: MetadataRoute.Sitemap = teamSlugs.map((slug) => ({
    url: `${baseUrl}/team/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...servicePages, ...portfolioPages, ...teamPages];
}
