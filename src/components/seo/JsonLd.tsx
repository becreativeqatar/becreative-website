import { SITE_CONFIG } from "@/lib/constants";

interface OrganizationSchemaProps {
  url?: string;
}

export function OrganizationSchema({ url = `https://${SITE_CONFIG.domain}` }: OrganizationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url,
    logo: `${url}/images/logo.png`,
    description:
      "Qatar's premier creative events agency specializing in immersive event management, destination creation, brand activation, and cultural storytelling.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rafal Tower, 9th Floor",
      addressLocality: "Lusail",
      addressRegion: "Doha",
      addressCountry: "QA",
    },
    telephone: SITE_CONFIG.phone1,
    email: SITE_CONFIG.email,
    foundingDate: "2018",
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.founder,
    },
    sameAs: [
      "https://www.instagram.com/becreative.qa/",
      "https://www.linkedin.com/company/becreativeqa/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface LocalBusinessSchemaProps {
  url?: string;
}

export function LocalBusinessSchema({ url = `https://${SITE_CONFIG.domain}` }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#business`,
    name: SITE_CONFIG.name,
    image: `${url}/images/logo.png`,
    url,
    telephone: SITE_CONFIG.phone1,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rafal Tower, 9th Floor",
      addressLocality: "Lusail",
      addressRegion: "Doha",
      addressCountry: "QA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "$$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  location: string;
  organizer?: string;
  image?: string;
  url?: string;
}

export function EventSchema({
  name,
  description,
  startDate,
  location,
  organizer,
  image,
  url,
}: EventSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    location: {
      "@type": "Place",
      name: location,
      address: {
        "@type": "PostalAddress",
        addressCountry: "QA",
      },
    },
    organizer: organizer
      ? {
          "@type": "Organization",
          name: organizer,
        }
      : undefined,
    image,
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
