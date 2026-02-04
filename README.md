# Karthikeyan T - Portfolio

A professional, minimalist portfolio website built with Next.js and Tailwind CSS, showcasing my work as a Senior AI Engineer, LLM Engineer, and SaaS Architect.

## Features

- **Three Theme Options**: Switch between Minimalist, Glassmorphism (dark), and Claymorphism themes
- **Fixed Navigation**: Smooth scrolling navigation with logo and menu links
- **One-Page Layout**: All content on a single scrollable page
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **SEO Ready**: Comprehensive meta tags and semantic HTML
- **Dark Mode Support**: Theme-aware dark mode
- **Contact Form**: Integrated contact form with mailto fallback
- **Modern Card Design**: Project cards with header, image, body, and link sections

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Font**: Inter (Google Fonts)

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Main page composing all sections
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── sections/
│   │   ├── Hero.tsx        # Hero section with CTA
│   │   ├── Experience.tsx  # Work experience timeline
│   │   ├── Skills.tsx      # Technical competencies
│   │   ├── Projects.tsx    # Portfolio projects
│   │   └── Contact.tsx     # Contact form
│   └── Footer.tsx          # Footer with links
├── lib/
│   └── data.ts             # Structured portfolio data
└── public/
    └── kt_logo_github_sized.png  # Logo

```

## Sections

1. **Hero**: Introduction with logo, bio, and call-to-action buttons
2. **Experience**: Timeline of professional work history
3. **Skills**: Core technical competencies organized by category
4. **Projects**: Portfolio of websites, AI applications, tools, and creative projects
5. **Contact**: Contact form and information
6. **Footer**: Social links and copyright

## Customization

All content is centralized in `lib/data.ts` for easy updates. Modify this file to update:
- Personal information
- Skills and competencies
- Work experience
- Projects and portfolio items

## License

© 2026 Karthikeyan T. All rights reserved.
