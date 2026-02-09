// Shared testimonial data

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
}

/**
 * Client testimonials displayed on the homepage and other sections.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Be Creative Events transformed our vision into an unforgettable experience. Their attention to detail and professionalism exceeded our expectations.",
    author: "Ahmed Al-Thani",
    role: "Director of Events",
    company: "Qatar Tourism Authority",
  },
  {
    id: 2,
    quote:
      "Working with Be Creative was seamless from start to finish. They managed every aspect of our international conference flawlessly.",
    author: "Sarah Mitchell",
    role: "Head of Marketing",
    company: "Tech Summit Doha",
  },
  {
    id: 3,
    quote:
      "Their creativity and execution are unmatched. Be Creative delivered a product launch that generated incredible buzz and media coverage.",
    author: "Mohammed Al-Kuwari",
    role: "Brand Manager",
    company: "Leading Automotive Brand",
  },
  {
    id: 4,
    quote:
      "The team's dedication to excellence made our national day celebration a truly memorable event for all attendees.",
    author: "Fatima Al-Mansouri",
    role: "Event Coordinator",
    company: "Ministry of Culture",
  },
];
