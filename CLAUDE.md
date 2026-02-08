# CLAUDE.md - Be Creative Events Website

> This file is automatically read by Claude Code. It contains essential project context, guidelines, and specifications.

## Project Overview

**Client:** Be Creative Events (b.creative events)  
**Domain:** becreative.qa  
**Location:** Lusail, Qatar  
**Industry:** Premium Event Management

Be Creative Events is a premium event management company that has evolved from a marketing agency into a specialized, full-service event management provider. The website must position them as a top-tier event management company serving government ministries, large corporations, and international organizations in Qatar and the region.

---

## Brand Guidelines

### Logo
- Clean, modern lowercase typography: "b.creative events"
- Distinctive visual separator with red and purple bars
- Logo files located in `/assets/logos/`

### Color Palette (Use these exact values)

```css
:root {
  /* Primary Colors */
  --red-spark: #E0251C;      /* Energy, passion, action - Use for CTAs, highlights */
  --core-black: #101820;     /* Strength, focus, elegance - Primary background */
  --purple-dream: #8232A7;   /* Creativity, mystery, vision - Secondary accents */
  --desert-dune: #D7D1CA;    /* Balance, warmth, timelessness - Light backgrounds, text on dark */
  
  /* Extended Palette */
  --white: #FFFFFF;
  --text-light: #F5F5F5;
  --text-muted: #999999;
}
```

```javascript
// Tailwind config colors
const brandColors = {
  'red-spark': '#E0251C',
  'core-black': '#101820',
  'purple-dream': '#8232A7',
  'desert-dune': '#D7D1CA',
}
```

### Typography
- Primary font: Clean, modern sans-serif (recommend: Inter, Outfit, or similar)
- Arabic font: Ensure proper RTL support (recommend: IBM Plex Sans Arabic, Noto Sans Arabic)
- Large, bold headlines
- Generous line-height for readability

### Brand Voice
- **Confident but approachable** — conveys capability without being intimidating
- **Bold but not arrogant** — makes strong statements backed by evidence
- **Professional yet warm** — maintains formality while being personable

---

## Technical Stack

### Required Technologies
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP (ScrollTrigger, TextPlugin)
- **UI Transitions:** Framer Motion
- **Hosting:** Vercel

### Project Structure
```
becreative-website/
├── docs/
│   └── BeCreativeEvents_Website_Specification.docx
├── assets/
│   ├── logos/
│   ├── images/
│   └── videos/
├── public/
│   ├── images/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx              # Home
│   │   │   ├── about/
│   │   │   ├── services/
│   │   │   │   └── [slug]/
│   │   │   ├── portfolio/
│   │   │   │   └── [slug]/
│   │   │   ├── team/
│   │   │   │   └── [slug]/
│   │   │   ├── careers/
│   │   │   └── contact/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   ├── sections/                 # Page sections
│   │   ├── layout/                   # Header, Footer, Navigation
│   │   └── animations/               # Animation wrappers
│   ├── lib/
│   │   ├── utils.ts
│   │   └── constants.ts
│   ├── hooks/
│   ├── types/
│   └── i18n/
│       ├── en.json
│       └── ar.json
├── CLAUDE.md
├── tailwind.config.ts
├── next.config.js
└── package.json
```

### Key Dependencies
```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "framer-motion": "^11.x",
    "gsap": "^3.x",
    "@gsap/react": "^2.x",
    "next-intl": "^3.x",
    "tailwindcss": "^3.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x"
  }
}
```

---

## Design Direction

### Visual Style: Bold & Cinematic

1. **Dark Backgrounds**
   - Core Black (#101820) as primary background
   - Creates cinematic, theatrical atmosphere
   - Makes imagery and accent colors pop

2. **High-Contrast Imagery**
   - Large, dramatic event photography
   - Full-bleed images spanning viewport width
   - Video backgrounds where appropriate

3. **Strategic Accent Colors**
   - Red Spark for CTAs, highlights, energy
   - Purple Dream for secondary accents, creative elements
   - Desert Dune for subtle backgrounds, text on dark

4. **Immersive Full-Screen Layouts**
   - Sections that take over full viewport
   - Minimal chrome — content takes center stage
   - Generous whitespace ("blackspace") for breathing room

---

## Animation Guidelines

### Entrance Animations
- Logo reveal animation on initial load
- Text mask reveals (words appear through animated mask)
- Staggered fade-in for content sections

### Scroll-Based Interactions (GSAP ScrollTrigger)
- Parallax layers creating depth
- Scroll-triggered video playback
- Horizontal scroll sections for project showcases
- Elements that scale, rotate, or transform on scroll

### Hover & Interaction States
- Custom cursor that transforms on interactive elements
- Image reveal on project hover (color/grayscale shift)
- Magnetic buttons that follow cursor movement
- Subtle glow effects on accent colors

### Page Transitions (Framer Motion)
- Smooth page-to-page transitions
- Overlay animations with brand colors during navigation
- Shared element transitions (e.g., project image expanding to case study)

### Performance Rules
- Use `will-change` sparingly
- Prefer `transform` and `opacity` for animations
- Lazy load animations below the fold
- Respect `prefers-reduced-motion`

---

## Pages & Sitemap

### Primary Navigation
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, services, featured projects, clients, testimonials |
| About | `/about` | Company story, mission, team preview, certifications |
| Services | `/services` | Overview of 7 event categories |
| Portfolio | `/portfolio` | Filterable gallery of 10-15 case studies |
| Team | `/team` | Team grid with links to individual profiles |
| Careers | `/careers` | Job listings and company culture |
| Contact | `/contact` | Contact form, location, map |

### Dynamic Routes
| Page Type | Route Pattern | Count |
|-----------|---------------|-------|
| Case Study | `/portfolio/[slug]` | 10-15 |
| Team Member | `/team/[slug]` | Up to 10 |
| Service Detail | `/services/[slug]` | 7 (optional) |

---

## Services (7 Categories)

1. **Government & Ministry Events** — Official ceremonies, national celebrations
2. **Festivals & Cultural Events** — Heritage celebrations, public festivals
3. **Conferences & Summits** — International conferences, business forums
4. **Corporate Launch Events** — Product launches, brand reveals
5. **Award Ceremonies** — Gala events, recognition ceremonies
6. **Sports & Entertainment Events** — Sporting events, concerts
7. **Experiential Events** — Immersive experiences, brand activations

---

## Multilingual Support (i18n)

### Requirements
- **Languages:** English (default) & Arabic
- **URL Structure:** `/en/...` and `/ar/...`
- **RTL Support:** Full layout mirroring for Arabic
- **Library:** next-intl (recommended)

### Implementation Notes
- All text content must be externalized to translation files
- Images with text need separate Arabic versions
- Navigation, forms, and UI components must support RTL
- Date and number formatting should respect locale

---

## Key Features

### Must-Have
- [x] Contact form (name, email, phone, message, service type)
- [x] Client logo carousel (animated)
- [x] Testimonials section (rotating quotes)
- [x] Multi-language support (EN/AR with RTL)
- [x] Portfolio filtering by service category
- [x] Video-ready hero section
- [x] Responsive design (desktop, tablet, mobile)

### Content State
- **Initial:** Use high-quality placeholder images and dummy text
- **Final:** Client will provide real assets after design approval

---

## Case Study Page Structure

Each case study should include:
1. **Hero Image/Video** — Full-width dramatic opening visual
2. **Project Overview** — Client, date, location, event type
3. **The Challenge** — What problem needed solving
4. **Our Approach** — Strategy and creative direction
5. **The Results** — Impact, metrics, outcomes
6. **Visual Gallery** — High-quality images and video
7. **Client Testimonial** — Quote from client (if available)
8. **Related Projects** — Links to similar case studies

---

## Team Member Page Structure

Each profile should include:
- Professional photo
- Name & designation
- Bio/background
- Previous organizations/experience
- Notable events/projects worked on (before Be Creative)
- Education & certifications
- LinkedIn link
- Personal quote (optional)

**Note:** No hierarchy in team display — flat, equal presentation.

---

## Performance Targets

- **Lighthouse Score:** 90+ on Performance
- **First Contentful Paint:** < 1.5 seconds
- **Largest Contentful Paint:** < 2.5 seconds
- **Cumulative Layout Shift:** < 0.1

### Optimization Checklist
- [ ] Use Next.js Image component for all images
- [ ] Implement lazy loading for below-fold content
- [ ] Use WebP format with fallbacks
- [ ] Code splitting for optimal bundle size
- [ ] Preload critical fonts
- [ ] Compress and optimize videos

---

## SEO Requirements

- Server-side rendering for all pages
- Proper meta tags and Open Graph data
- Structured data (JSON-LD) for organization and events
- XML sitemap generation
- Canonical URLs for multilingual pages
- Semantic HTML structure

---

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm run start

# Lint code
npm run lint

# Type check
npm run type-check
```

---

## Reference Documents

- **Full Specification:** `/docs/BeCreativeEvents_Website_Specification.docx`
- **Brand Colors:** `/assets/brand-colors.png`
- **Logo:** `/assets/logos/BCE-LOGOS-Horizontal-Color.jpg`

---

## Notes for Claude Code

1. **Start with the foundation** — Set up Next.js, Tailwind, and folder structure first
2. **Build component library** — Create reusable UI components before pages
3. **Mobile-first** — Design for mobile, enhance for desktop
4. **Animations last** — Get layout and functionality working before adding GSAP animations
5. **Use placeholder content** — Don't wait for real assets; use high-quality placeholders
6. **Test RTL early** — Don't leave Arabic support until the end

When in doubt, refer to the full specification document in `/docs/`.
