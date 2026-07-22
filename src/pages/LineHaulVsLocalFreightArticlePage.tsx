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

/* SEO settings - title/description shared with the prerender via PAGE_SEO */
const SEO_TITLE = PAGE_SEO['/blog/line-haul-vs-local-freight'].title
const META_DESCRIPTION = PAGE_SEO['/blog/line-haul-vs-local-freight'].description
const KEYWORDS =
  'line haul delivery, local freight Australia, interstate freight, last mile delivery, road freight and distribution'

const CATEGORY = 'Logistics'
const DATE = '23 July 2026'
const READ_TIME = '4 min'
const TAGS = ['Line Haul', 'Local Freight', 'Distribution']

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

/* External link - opens in a new tab (e.g. the BITRE) */
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
  'Line haul is the long-distance movement of freight between major hubs - the backbone of interstate freight in Australia.',
  'Local freight covers the final leg, getting goods from a regional hub or depot to the actual customer.',
  'Line haul runs on fixed, consolidated schedules; local freight is far more flexible for same-day and time-critical requests.',
  'Most Australian businesses use both - goods move via line haul between hubs, then transfer to local freight for final delivery.',
  'The real question is whether your freight partner can manage that handover smoothly, without visibility gaps.',
]

const KEY_DIFFERENCES = [
  'Distance - line haul covers interstate and regional distances; local freight handles short trips within a city or local area.',
  'Purpose - line haul moves bulk stock between hubs; local freight completes the final delivery to the customer.',
  'Scheduling - line haul runs on fixed, consolidated schedules; local freight is far more flexible for same-day and time-critical requests.',
]

const FAQS = [
  {
    q: "What's the main difference between line haul and local freight?",
    a: 'Line haul covers long-distance transport between hubs, usually interstate. Local freight covers the shorter final delivery to the customer.',
  },
  {
    q: 'Can one provider handle both?',
    a: "Yes, and it's usually the better option - it avoids the visibility gaps that happen when freight changes hands between separate providers.",
  },
  {
    q: 'How do I know which service I need?',
    a: 'Moving bulk stock between hubs is line haul. Delivering directly to a customer nearby, especially with tight timing, is local freight. Most businesses use both.',
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

export function LineHaulVsLocalFreightArticlePage() {
  usePageTitle(SEO_TITLE)
  useMetaDescription(META_DESCRIPTION)
  useCanonical('/blog/line-haul-vs-local-freight')

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
              Line Haul or Local Freight? How to Choose the <span style={{ color: GREEN }}>Right Delivery Option</span>
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
              src="/images/bivry-truck-highway.jpg"
              alt="A Bivry line haul truck on an Australian highway, moving bulk freight between distribution hubs"
              style={{ width: '100%', height: 'clamp(240px,38vw,460px)', objectFit: 'cover', borderRadius: 20, boxShadow: '0 30px 80px rgba(0,0,0,0.35)', display: 'block' }}
            />
          </div>
        </div>

        {/* ── ARTICLE BODY ─────────────────────────────────────────── */}
        <article className="sd-pad" style={{ background: CREAM, padding: 'clamp(80px,9vw,130px) clamp(24px,5vw,80px) clamp(56px,7vw,90px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }}>
            {/* Lead */}
            <p style={{ ...BODY, fontSize: 'clamp(17px,1.4vw,21px)', color: 'rgba(8,33,60,0.78)', fontWeight: 500 }}>
              Ask most business owners how their goods get from a warehouse to a customer's door, and you'll usually get a vague answer - "a truck picks it up and it arrives." In reality, that journey is almost always made up of two very different types of freight movement: line haul delivery and local freight. Knowing when to use each is one of the simplest ways to keep freight costs under control.
            </p>

            {/* TL;DR key facts */}
            <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(8,33,60,0.07)', padding: 'clamp(24px,3vw,36px)', margin: '8px 0 44px' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: GREEN, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '1px' }}>Key Facts</h2>
              <CheckList items={KEY_FACTS} />
            </div>

            {/* What is line haul */}
            <h2 style={SECTION_TITLE}>What Is Line Haul Delivery?</h2>
            <p style={BODY}>
              Line haul is the long-distance movement of freight between major hubs - capital cities, regional distribution centres, or warehouses hundreds of kilometres apart. It's the backbone of interstate freight in Australia, built around fixed schedules and consolidated loads, best suited to bulk stock transfers rather than one-off, time-sensitive deliveries.
            </p>

            {/* What is local freight */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>What Is Local Freight?</h2>
            <p style={BODY}>
              Local freight covers the final leg - getting goods from a regional hub or depot to the actual customer, usually within the same city or region. This is where same-day delivery, last-minute orders, and tighter delivery windows come into play.
            </p>

            {/* Key differences */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>The Key Differences</h2>
            <p style={BODY}>
              Both legs move your freight, but they solve different problems. Three differences matter most when you're deciding which service a shipment actually needs:
            </p>
            <CheckList items={KEY_DIFFERENCES} />

            {/* Which option */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>So Which Option Does Your Business Need?</h2>
            <p style={BODY}>
              For most Australian businesses, the honest answer is both. Goods typically move via line haul between hubs, then transfer to local freight for final delivery. The real question is whether your freight partner can manage that handover smoothly - a reality reflected in national freight data published by the <ExternalLink href="https://www.bitre.gov.au/">Bureau of Infrastructure and Transport Research Economics</ExternalLink>.
            </p>

            {/* How Bivry bridges the gap */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>How Bivry Bridges the Gap</h2>
            <p style={BODY}>
              At <InlineLink to="/">Bivry</InlineLink>, we manage road freight and distribution as one connected service rather than two handoffs. With 24/7 GPS tracking and a 96.2% on-time delivery record, businesses get full visibility whether goods are travelling interstate or making the final trip across town.
            </p>
            <p style={BODY}>
              Need freight that's reliable from the first leg to the last? <InlineLink to="/contact">Talk to the Bivry team</InlineLink> about road freight and distribution solutions built for full visibility, start to finish - with coverage spanning <InlineLink to="/freight-company-melbourne">Melbourne</InlineLink>, <InlineLink to="/freight-company-sydney">Sydney</InlineLink>, <InlineLink to="/freight-company-brisbane">Brisbane</InlineLink>, <InlineLink to="/freight-company-perth">Perth</InlineLink>, and <InlineLink to="/freight-company-adelaide">Adelaide</InlineLink>.
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
