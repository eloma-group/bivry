/* ──────────────────────────────────────────────────────────────
   Single source of truth for per-route SEO metadata.

   Consumed at runtime by the page components (via usePageTitle /
   useMetaDescription) AND at build time by the prerender plugin in
   vite.config.ts, which bakes these values into the static HTML head
   so crawlers that don't run JavaScript still see the right meta.

   Industry (/industries/:slug) and city (/freight-company-:city) meta
   live alongside their content in industryData.ts and cityData.ts.
   ────────────────────────────────────────────────────────────── */

export interface PageSeo {
  title: string
  description: string
}

const SITE_DEFAULT_DESCRIPTION =
  'Premium road freight, warehousing and distribution across Australia. 96.2% on-time delivery, 24/7 GPS tracking. Reliable. Trackable. Trusted.'

/** Route path (as registered in App.tsx) → SEO title + meta description. */
export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: "BIVRY — Australia's Road Freight & Logistics Company",
    description: SITE_DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: "About Bivry | Australia's Logistics Experts",
    description:
      'Learn about Bivry, our logistics expertise, industry experience and commitment to delivering reliable freight solutions across Australia.',
  },
  '/values': {
    title: 'Our Values | Customer-First Logistics | Bivry',
    description:
      'Discover the values that drive Bivry, including reliability, transparency, innovation and customer-focused freight solutions.',
  },
  '/networks': {
    title: 'Global Freight Network & Partners | Bivry',
    description:
      "Explore Bivry's trusted logistics network and global freight partnerships that ensure seamless transport across Australia and worldwide.",
  },
  '/faq': {
    title: 'Freight & Logistics FAQs | Bivry Australia',
    description:
      'Find answers to common questions about freight, shipping, customs, warehousing and logistics services provided by Bivry.',
  },
  '/case-studies': {
    title: 'Freight Case Studies & Success Stories | Bivry',
    description:
      'See how Bivry helps businesses improve logistics efficiency with customized freight solutions and proven client success stories.',
  },
  '/blog': {
    title: 'Logistics Blog | Freight Insights & News | Bivry',
    description:
      'Read expert articles covering freight, logistics, supply chain trends, shipping advice and industry updates from Bivry.',
  },
  '/news': {
    title: 'Company News & Logistics Updates | Bivry',
    description:
      'Stay informed with the latest Bivry company announcements, logistics developments and freight industry news across Australia.',
  },
  '/careers': {
    title: 'Logistics Careers Australia | Join Bivry',
    description:
      'Explore exciting career opportunities at Bivry and help deliver innovative freight and logistics solutions across Australia.',
  },
  '/contact': {
    title: 'Contact Bivry | Freight & Logistics Experts',
    description:
      'Contact Bivry for freight, logistics and supply chain solutions. Speak with our team for tailored transport services Australia-wide.',
  },
  '/terms-of-use': {
    title: 'Terms of Use — BIVRY',
    description:
      'Read the terms of use governing your access to and use of the Bivry website and our freight and logistics services.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — BIVRY',
    description:
      'Learn how Bivry collects, uses and protects your personal information across our website and freight and logistics services.',
  },
  '/blog/linehaul-transport-australia': {
    title: 'Linehaul Transport Australia: Complete Guide for Businesses',
    description:
      'Learn how linehaul transport works in Australia, its benefits, costs, and why businesses rely on interstate freight solutions for efficient logistics.',
  },
  '/blog/same-day-delivery-vs-standard-freight': {
    title:
      'Same Day Delivery vs Standard Freight: Which Freight Solution Is Best for Your Business?',
    description:
      'Compare Same Day Delivery and Standard Freight services to understand costs, speed, flexibility, and business benefits. Learn which freight solution suits your logistics needs and how businesses can optimise supply chain performance.',
  },
}
