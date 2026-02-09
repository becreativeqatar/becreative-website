// Shared client and stats data

export interface Client {
  name: string;
  logo: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

/**
 * Client list for the logo carousel and trusted-by section.
 */
export const CLIENTS: Client[] = [
  { name: "Qatar Tourism", logo: "QT" },
  { name: "Visit Qatar", logo: "VQ" },
  { name: "MCIT", logo: "MCIT" },
  { name: "Ashghal", logo: "ASH" },
  { name: "Ooredoo", logo: "OO" },
  { name: "MSDF", logo: "MSDF" },
  { name: "Al Jazeera Finance", logo: "AJF" },
  { name: "Qatar Stock Exchange", logo: "QSE" },
  { name: "University of Doha", logo: "UoD" },
  { name: "Printemps Doha", logo: "PD" },
  { name: "Mekdam Holding", logo: "MH" },
  { name: "Qatar Aeronautical Academy", logo: "QAA" },
];

/**
 * Company stats for the animated counters section.
 */
export const STATS: Stat[] = [
  { value: 200, suffix: "+", label: "Events Delivered" },
  { value: 50, suffix: "+", label: "Corporate Clients" },
  { value: 6, suffix: "+", label: "Years of Excellence" },
  { value: 4, suffix: "M+", label: "Attendees Reached" },
];
