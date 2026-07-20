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
  /**
   * The page's primary <h1> text. Baked into the static HTML at build time so
   * crawlers that don't run JavaScript still see exactly one h1 per page; the
   * React app then replaces it on mount with the styled, animated heading.
   */
  h1: string
}

const SITE_DEFAULT_DESCRIPTION =
  'Premium road freight, warehousing and distribution across Australia. 96.2% on-time delivery, 24/7 GPS tracking. Reliable. Trackable. Trusted.'

/** Route path (as registered in App.tsx) → SEO title + meta description. */
export const PAGE_SEO: Record<string, PageSeo> = {
  '/': {
    title: "BIVRY — Australia's Road Freight & Logistics Company",
    h1: 'Road Freight, Warehousing & Distribution Across Australia',
    description: SITE_DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: "About Bivry | Australia's Logistics Experts",
    h1: "Australia's trusted road freight and logistics network — built for reliability, speed and GPS-tracked delivery.",
    description:
      'Learn about Bivry, our logistics expertise, industry experience and commitment to delivering reliable freight solutions across Australia.',
  },
  '/values': {
    title: 'Our Values | Customer-First Logistics | Bivry',
    h1: 'What We Stand For',
    description:
      'Discover the values that drive Bivry, including reliability, transparency, innovation and customer-focused freight solutions.',
  },
  '/networks': {
    title: 'Global Freight Network & Partners | Bivry',
    h1: 'Networks & Partners',
    description:
      "Explore Bivry's trusted logistics network and global freight partnerships that ensure seamless transport across Australia and worldwide.",
  },
  '/faq': {
    title: 'Freight & Logistics FAQs | Bivry Australia',
    h1: 'Frequently Asked Questions',
    description:
      'Find answers to common questions about freight, shipping, customs, warehousing and logistics services provided by Bivry.',
  },
  '/case-studies': {
    title: 'Freight Case Studies & Success Stories | Bivry',
    h1: 'Case Studies',
    description:
      'See how Bivry helps businesses improve logistics efficiency with customized freight solutions and proven client success stories.',
  },
  '/blog': {
    title: 'Logistics Blog | Freight Insights & News | Bivry',
    h1: 'Industry Blog',
    description:
      'Read expert articles covering freight, logistics, supply chain trends, shipping advice and industry updates from Bivry.',
  },
  '/news': {
    title: 'Company News & Logistics Updates | Bivry',
    h1: 'Latest News',
    description:
      'Stay informed with the latest Bivry company announcements, logistics developments and freight industry news across Australia.',
  },
  '/careers': {
    title: 'Logistics Careers Australia | Join Bivry',
    h1: 'Join Our Team',
    description:
      'Explore exciting career opportunities at Bivry and help deliver innovative freight and logistics solutions across Australia.',
  },
  '/contact': {
    title: 'Contact Bivry | Freight & Logistics Experts',
    h1: "Let's Talk Freight",
    description:
      'Contact Bivry for freight, logistics and supply chain solutions. Speak with our team for tailored transport services Australia-wide.',
  },
  '/terms-of-use': {
    title: 'Terms of Use — BIVRY',
    h1: 'Terms of Use',
    description:
      'Read the terms of use governing your access to and use of the Bivry website and our freight and logistics services.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy — BIVRY',
    h1: 'Privacy Policy',
    description:
      'Learn how Bivry collects, uses and protects your personal information across our website and freight and logistics services.',
  },
  '/blog/linehaul-transport-australia': {
    title: 'Linehaul Transport Australia: Complete Guide for Businesses',
    h1: 'Understanding Linehaul Transport: A Guide for Australian Enterprises',
    description:
      'Learn how linehaul transport works in Australia, its benefits, costs, and why businesses rely on interstate freight solutions for efficient logistics.',
  },
  '/blog/same-day-delivery-vs-standard-freight': {
    title:
      'Same Day Delivery vs Standard Freight: Which Freight Solution Is Best for Your Business?',
    h1: 'Same Day Delivery vs Standard Freight: Which One Does Your Business Need?',
    description:
      'Compare Same Day Delivery and Standard Freight services to understand costs, speed, flexibility, and business benefits. Learn which freight solution suits your logistics needs and how businesses can optimise supply chain performance.',
  },
  '/blog/freight-broker-vs-direct-carrier-melbourne': {
    title: 'Freight Broker vs Direct Carrier: Which Is Right?',
    h1: 'Freight Broker vs Direct Carrier: Which Is Right for You?',
    description:
      'Comparing a freight broker in Melbourne vs a direct carrier? See the real differences in cost, tracking and freight management before you choose.',
  },
  '/blog/construction-materials-delivery-freight-company-australia': {
    title:
      'How to Choose a Freight Company for Construction Materials Delivery Australia | Bivry',
    h1: 'How Do You Choose a Freight Company for Construction Materials Delivery in Australia?',
    description:
      'Choosing freight for construction materials delivery in Australia? Compare fleet capability, national coverage, and on-time reliability before you book.',
  },
  '/blog/transport-management-system-australia': {
    title: 'Transport Management System Australia: Why It Matters | Bivry',
    h1: 'Why a Transport Management System Matters for Australian Freight Businesses',
    description:
      'Discover why a transport management system is essential for freight businesses in Australia, and how it improves visibility, cost control and delivery reliability.',
  },
}
