import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'
import { usePageTitle } from '../hooks/usePageTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { useCanonical } from '../hooks/useCanonical'
import { PAGE_SEO } from '../data/seo'

/* SEO settings — title/description shared with the prerender via PAGE_SEO */
const SEO_TITLE = PAGE_SEO['/blog/transport-management-system-australia'].title
const META_DESCRIPTION = PAGE_SEO['/blog/transport-management-system-australia'].description
const KEYWORDS =
  'transport management system Australia, freight management software, logistics visibility, road freight Australia'

const CATEGORY = 'Technology'
const DATE = '21 July 2026'
const READ_TIME = '5 min'
const TAGS = ['Transport Management', 'Freight Software', 'Logistics Visibility']

/* Shared inline-link style for internal route links */
function InlineLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      style={{ color: GREEN, fontWeight: 700, textDecoration: 'none', borderBottom: `1px solid ${GREEN}55` }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = GREEN }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = `${GREEN}55` }}
    >{children}</Link>
  )
}

/* External link — opens in a new tab (e.g. the NHVR) */
function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: GREEN, fontWeight: 700, textDecoration: 'none', borderBottom: `1px solid ${GREEN}55` }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = GREEN }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = `${GREEN}55` }}
    >{children}</a>
  )
}

const SECTION_TITLE: React.CSSProperties = {
  fontSize: 'clamp(26px,3vw,40px)', fontWeight: 900, color: NAVY,
  letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 20px',
  textTransform: 'uppercase',
}
const BODY: React.CSSProperties = {
  fontSize: 'clamp(15px,1.15vw,18px)', color: 'rgba(8,33,60,0.66)',
  lineHeight: 1.9, margin: '0 0 22px',
}

const KEY_FACTS = [
  'A transport management system (TMS) brings route planning, carrier selection, tracking, and freight documentation into a single platform.',
  "Australia's vast distances and limited route redundancy make small transport inefficiencies unusually costly.",
  'The National Heavy Vehicle Regulator sets the compliance standards Australian freight operators must meet — a well-implemented TMS makes staying on top of them far easier.',
  'Smaller businesses often see the biggest relative improvement, since a TMS removes manual coordination that eats up staff time.',
  'Full shipment visibility reduces "where is my delivery" queries for both the business and its customers.',
]

const WHAT_IT_DOES = [
  'Route optimisation across long-haul and regional networks.',
  'Real-time GPS tracking for full shipment visibility.',
  'Automated compliance and documentation checks.',
  'Consolidated reporting that flags cost blowouts before they happen.',
]

const BENEFITS = [
  'Lower transport costs through better route planning and fewer empty or inefficient runs.',
  'Fewer missed deliveries, since delays are flagged early instead of discovered after the fact.',
  'Full shipment visibility for both the business and its customers, reducing "where is my delivery" queries.',
  'Simplified compliance and documentation, cutting down on manual admin and error risk.',
  'Data businesses can actually use — identifying which routes, carriers, or time slots are underperforming.',
]

const FAQS = [
  {
    q: 'What is a transport management system?',
    a: 'A transport management system is software that helps businesses plan, execute, and track the movement of freight — covering route planning, carrier selection, real-time tracking, and documentation, all in one place.',
  },
  {
    q: 'Do small and medium businesses need a TMS, or is it only for large freight operators?',
    a: 'Any business that regularly ships goods across Australia can benefit. Smaller businesses often see the biggest relative improvement, since a TMS removes the need for manual coordination that eats up staff time.',
  },
  {
    q: 'How does a TMS help with compliance in Australia?',
    a: 'It helps track mass and dimension limits, fatigue management requirements, and route restrictions automatically, reducing the risk of non-compliance with national heavy vehicle regulations.',
  },
  {
    q: 'What should businesses look for in a freight partner with strong transport management?',
    a: 'Real-time tracking, a proven on-time delivery record, transparent reporting, and the ability to scale across regional and metro routes without losing visibility.',
  },
]

/* Reusable check-list */
function CheckList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px' }}>
      {items.map(item => (
        <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
          <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: `${GREEN}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
            <Check size={13} strokeWidth={3} color={GREEN} />
          </span>
          <span style={{ fontSize: 'clamp(14px,1.05vw,16px)', color: 'rgba(8,33,60,0.7)', lineHeight: 1.6, fontWeight: 500 }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function TmsArticlePage() {
  usePageTitle(SEO_TITLE)
  useMetaDescription(META_DESCRIPTION)
  useCanonical('/blog/transport-management-system-australia')

  // Apply the meta keywords setting from the brief
  useEffect(() => {
    let tag = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null
    let created = false
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'keywords')
      document.head.appendChild(tag)
      created = true
    }
    const prev = tag.getAttribute('content')
    tag.setAttribute('content', KEYWORDS)
    return () => {
      if (created) tag?.remove()
      else if (prev !== null) tag?.setAttribute('content', prev)
    }
  }, [])

  // Start at the top when the article opens
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />
      <main>
        {/* ── ARTICLE HERO ─────────────────────────────────────────── */}
        <section className="sd-pad" style={{ background: NAVY, padding: 'clamp(96px,12vw,160px) clamp(24px,5vw,80px) clamp(48px,6vw,80px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}0D 0%, transparent 60%)`, pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Back link */}
            <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 13, fontWeight: 700, marginBottom: 32, letterSpacing: '0.5px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)' }}
            >
              <ArrowLeft size={14} strokeWidth={2.5} /> Back to Blog
            </a>

            {/* Meta row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#fff', background: GREEN, borderRadius: 100, padding: '5px 14px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>{CATEGORY}</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{DATE}</span>
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{READ_TIME} read</span>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}
              style={{ fontSize: 'clamp(32px,4.6vw,60px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.04, margin: '0 0 24px', textTransform: 'uppercase' }}
            >
              Why a Transport Management System Matters for <span style={{ color: GREEN }}>Australian Freight Businesses</span>
            </motion.h1>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {TAGS.map(tag => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.06)', borderRadius: 100, padding: '6px 14px', border: '1px solid rgba(255,255,255,0.1)' }}>{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── HERO IMAGE ───────────────────────────────────────────── */}
        <div className="sd-pad-x" style={{ background: NAVY, padding: '0 clamp(24px,5vw,80px)' }}>
          <div className="sd-img-inner" style={{ maxWidth: 980, margin: '0 auto', transform: 'translateY(40px)' }}>
            <motion.img
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease }}
              src="/images/tms-transport-management.jpg"
              alt="Aerial view of a container freight terminal, illustrating the shipment visibility a transport management system provides"
              style={{ width: '100%', height: 'clamp(240px,38vw,460px)', objectFit: 'cover', borderRadius: 20, boxShadow: '0 30px 80px rgba(0,0,0,0.35)', display: 'block' }}
            />
          </div>
        </div>

        {/* ── ARTICLE BODY ─────────────────────────────────────────── */}
        <article className="sd-pad" style={{ background: CREAM, padding: 'clamp(80px,9vw,130px) clamp(24px,5vw,80px) clamp(56px,7vw,90px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }}>
            {/* Lead */}
            <p style={{ ...BODY, fontSize: 'clamp(17px,1.4vw,21px)', color: 'rgba(8,33,60,0.78)', fontWeight: 500 }}>
              Australia's freight task is enormous, and its geography doesn't make things easy. Goods often travel thousands of kilometres between capital cities, regional centres, and remote areas, which means even small inefficiencies in transport planning can quickly turn into real cost and time losses. This is exactly the problem a transport management system (TMS) is built to solve.
            </p>
            <p style={BODY}>
              For businesses that rely on freight to keep operations running, understanding how a TMS works — and why it's become essential rather than optional — can make the difference between a supply chain that scales smoothly and one that constantly firefights delays.
            </p>

            {/* TL;DR key facts */}
            <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(8,33,60,0.07)', padding: 'clamp(24px,3vw,36px)', margin: '8px 0 44px' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: GREEN, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '1px' }}>Key Facts</h2>
              <CheckList items={KEY_FACTS} />
            </div>

            {/* What a TMS does */}
            <h2 style={SECTION_TITLE}>What Does a Transport Management System Actually Do?</h2>
            <p style={BODY}>
              At its core, a transport management system brings route planning, carrier selection, tracking, and freight documentation into a single platform. Instead of coordinating shipments through scattered phone calls, spreadsheets, and emails, businesses get one view of where every shipment is, what it's costing, and whether it's on schedule.
            </p>
            <p style={BODY}>In practice, this means:</p>
            <CheckList items={WHAT_IT_DOES} />

            {/* Why Australia */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Why It Matters More in Australia Than Almost Anywhere Else</h2>
            <p style={BODY}>
              Australia's freight network has to cover vast distances between major ports and regional supply points, often with limited route redundancy. A delay on one key corridor can ripple through an entire delivery schedule. On top of that, freight operators need to work within heavy vehicle and safety regulations that vary depending on load, route, and vehicle type.
            </p>
            <p style={BODY}>
              A TMS helps businesses stay compliant while managing this complexity, particularly around mass and dimension limits, fatigue management, and route restrictions. The <ExternalLink href="https://www.nhvr.gov.au/">National Heavy Vehicle Regulator</ExternalLink> sets out the compliance standards that Australian freight operators need to meet, and a well-implemented TMS makes it far easier to stay on top of them.
            </p>

            {/* Business benefits */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>The Real Business Benefits</h2>
            <CheckList items={BENEFITS} />

            {/* Bivry approach */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>How Bivry Approaches Transport Management</h2>
            <p style={BODY}>
              At Bivry, we built our road freight and distribution services around exactly this kind of visibility. Every shipment is tracked in real time with 24/7 GPS monitoring, backed by a strong on-time delivery record — so businesses aren't just hoping their freight arrives, they can see it happening. Combining reliable warehousing with trackable, accountable transport means fewer surprises for the businesses that depend on us to move their goods.
            </p>
            <p style={BODY}>
              Want more visibility over your freight? <InlineLink to="/contact">Talk to the Bivry team</InlineLink> about road freight and distribution solutions built for reliability across Australia, with coverage spanning <InlineLink to="/freight-company-melbourne">Melbourne</InlineLink>, <InlineLink to="/freight-company-sydney">Sydney</InlineLink>, <InlineLink to="/freight-company-brisbane">Brisbane</InlineLink>, <InlineLink to="/freight-company-perth">Perth</InlineLink>, and <InlineLink to="/freight-company-adelaide">Adelaide</InlineLink>.
            </p>
          </div>
        </article>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="sd-pad" style={{ background: '#fff', padding: 'clamp(64px,8vw,110px) clamp(24px,5vw,80px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
              <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>FAQs</span>
            </div>
            <h2 style={{ fontSize: 'clamp(34px,4vw,56px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.98, margin: '0 0 48px', textTransform: 'uppercase' }}>
              Frequently Asked <span style={{ color: GREEN }}>Questions.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FAQS.map((f, i) => (
                <motion.div key={f.q}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  style={{ background: CREAM, borderRadius: 16, border: '1px solid rgba(8,33,60,0.06)', padding: 'clamp(22px,2.5vw,32px)' }}
                >
                  <h3 style={{ fontSize: 'clamp(17px,1.4vw,20px)', fontWeight: 800, color: NAVY, margin: '0 0 12px', letterSpacing: '-0.01em' }}>{f.q}</h3>
                  <p style={{ fontSize: 'clamp(14px,1.05vw,16px)', color: 'rgba(8,33,60,0.6)', lineHeight: 1.8, margin: 0 }}>{f.a}</p>
                </motion.div>
              ))}
            </div>

            {/* Back to all articles */}
            <a href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 48, fontSize: 14, fontWeight: 700, color: NAVY, textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = NAVY }}
            >
              <ArrowRight size={14} strokeWidth={2.5} /> Read more articles
            </a>
          </div>
        </section>

        <PageCTA line1="SHIP WITH" line2="CONFIDENCE." buttonLabel="Get a Quote" />
      </main>
      <Footer />

      <style>{`
        /* Tablet & down: tighten side gutters so content uses more of the width */
        @media (max-width: 768px) {
          .sd-pad   { padding-left: 24px !important; padding-right: 24px !important; }
          .sd-pad-x { padding-left: 24px !important; padding-right: 24px !important; }
        }
        /* Phones: near full-width gutters */
        @media (max-width: 600px) {
          .sd-pad   { padding-left: 18px !important; padding-right: 18px !important; }
          .sd-pad-x { padding-left: 18px !important; padding-right: 18px !important; }
          .sd-img-inner { transform: translateY(24px) !important; }
        }
        /* Small phones: edge-to-edge gutters */
        @media (max-width: 400px) {
          .sd-pad   { padding-left: 14px !important; padding-right: 14px !important; }
          .sd-pad-x { padding-left: 14px !important; padding-right: 14px !important; }
        }
      `}</style>
    </div>
  )
}
