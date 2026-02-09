// Barrel export for all shared data modules

export {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_CATEGORIES,
  PROJECT_DETAILS,
} from "./projects";
export type { PortfolioProject, ProjectDetail } from "./projects";

export { LEADERSHIP, TEAM_MEMBERS } from "./team";
export type { LeadershipMember, TeamMember } from "./team";

export { SERVICE_DETAILS } from "./services";
export type { ServiceDetail } from "./services";

export { TESTIMONIALS } from "./testimonials";
export type { Testimonial } from "./testimonials";

export { CLIENTS, STATS } from "./clients";
export type { Client, Stat } from "./clients";
