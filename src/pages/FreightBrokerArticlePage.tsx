import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Network, Truck } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'
import { usePageTitle } from '../hooks/usePageTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { useCanonical } from '../hooks/useCanonical'
import { PAGE_SEO } from '../data/seo'

/* SEO settings - title/description shared with the prerender via PAGE_SEO */
const SEO_TITLE = PAGE_SEO['/blog/freight-broker-vs-direct-carrier-melbourne'].title
const META_DESCRIPTION = PAGE_SEO['/blog/freight-broker-vs-direct-carrier-melbourne'].description
const KEYWORDS =
  'Freight Broker, Direct Carrier, Freight Broker Melbourne, Freight Management, Logistics Service Provider, Interstate Freight'

const CATEGORY = 'Logistics'
const DATE = '8 July 2026'
const READ_TIME = '7 min'
const TAGS = ['Freight Broker', 'Direct Carrier', 'Freight Management']

/* Navigate to a service row on the home page (mirrors the Footer/Header mechanism) */
function useServiceLink() {
  const navigate = useNavigate()
  return (serviceId: string) => {
    if (window.location.pathname !== '/') {
      sessionStorage.setItem('pendingService', serviceId)
      navigate('/')
    } else {
      window.dispatchEvent(new CustomEvent('bivry:service', { detail: { serviceId } }))
    }
  }
}

/* Shared inline-link style for internal links */
function InlineServiceLink({ serviceId, children }: { serviceId: string; children: React.ReactNode }) {
  const openService = useServiceLink()
  return (
    <a
      href="/#services"
      onClick={e => { e.preventDefault(); openService(serviceId) }}
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
const SUB_TITLE: React.CSSProperties = {
  fontSize: 'clamp(18px,1.6vw,23px)', fontWeight: 800, color: NAVY,
  letterSpacing: '-0.01em', lineHeight: 1.25, margin: '28px 0 10px',
}
const BODY: React.CSSProperties = {
  fontSize: 'clamp(15px,1.15vw,18px)', color: 'rgba(8,33,60,0.66)',
  lineHeight: 1.9, margin: '0 0 22px',
}

const KEY_FACTS = [
  'A freight broker arranges shipments through a network of third-party carriers; a direct carrier owns the trucks and moves your freight itself.',
  'Brokers typically win on network flexibility and rate comparison; direct carriers typically win on accountability, tracking accuracy, and consistency.',
  "Businesses shipping irregular volumes or niche routes often prefer a broker's network access; businesses needing reliable freight management and predictable service levels often prefer working directly.",
  'A logistics service provider that operates its own fleet and freight management systems like Bivry can offer broker-style flexibility with carrier-level accountability.',
  '96.2% on-time delivery and 24/7 GPS tracking are the kind of measurable service standards worth comparing before you choose either model.',
]

const BROKER_TRAITS = [
  'Acts as the middle party between shipper and carrier',
  'Sources capacity across multiple trucking companies',
  "Negotiates rates on the shipper's behalf",
  "Charges a margin on top of the carrier's base rate",
  "Doesn't control the actual vehicle, driver, or delivery execution",
]

const CARRIER_TRAITS = [
  'Owns and operates its own trucks and drivers',
  'Manages the shipment from pickup to delivery in-house',
  'Provides direct visibility into tracking, delays, and issue resolution',
  "Sets its own rates rather than marking up another company's service",
  'Typically offers more consistent service levels across repeat freight',
]

const COMPARISON = [
  { factor: 'Owns the trucks', broker: 'No - outsources to carrier network', carrier: 'Yes - operates its own fleet' },
  { factor: 'Pricing', broker: 'Carrier rate + broker margin', carrier: 'Direct carrier rate' },
  { factor: 'Accountability for delays', broker: 'Shared between broker and carrier', carrier: 'Sits directly with the carrier' },
  { factor: 'Network reach', broker: 'Broad - access to many carriers', carrier: "Limited to the carrier's own routes/fleet" },
  { factor: 'Tracking accuracy', broker: 'Depends on the carrier they book', carrier: 'Direct, real-time visibility' },
  { factor: 'Best for', broker: 'Irregular, niche, or overflow freight', carrier: 'Regular freight needing consistency' },
]

const BROKER_STEPS = [
  'You submit shipment details (weight, dimensions, origin, destination, timeline)',
  'The broker requests quotes from carriers in its network',
  'The broker selects a carrier and books the load',
  'The carrier executes the pickup and delivery',
  'The broker acts as the point of contact if issues arise mid-transit',
]

const DIRECT_MAKES_SENSE = [
  'You ship regularly on the same or similar lanes',
  'You need guaranteed, measurable service levels (e.g. on-time delivery rate)',
  'You want real-time GPS tracking rather than second-hand status updates',
  'You need one point of accountability if something goes wrong',
  'You’re consolidating freight management with warehousing and distribution',
]

const BROKER_MAKES_SENSE = [
  'Your freight volume is irregular or seasonal',
  "You occasionally need routes or freight types outside your usual carrier's network",
  'You want to compare multiple carrier rates without managing each relationship',
  'You’re overflow-booking during peak periods',
]

const TAKEAWAYS = [
  'Freight brokers arrange transport through third-party carrier networks; direct carriers own and operate the delivery themselves.',
  'Brokers offer broader network access; direct carriers offer tighter accountability and tracking accuracy.',
  "Regular, predictable freight is usually better served by a direct carrier; irregular or overflow freight often benefits from a broker's network.",
  'A logistics service provider that owns its fleet and freight management systems can deliver broker-level flexibility with carrier-level accountability.',
  'Always compare measurable service standards - on-time delivery rate and tracking visibility - before choosing either model.',
]

const FAQS = [
  {
    q: 'Is a freight broker cheaper than a direct carrier?',
    a: "Not always. A broker's quote includes the carrier's base rate plus their margin, so a direct carrier can be cheaper for regular lanes. Brokers can still win on price for niche or one-off freight where they can shop multiple carriers at once.",
  },
  {
    q: 'Can a freight broker guarantee delivery times?',
    a: 'No, a broker can only pass along the delivery estimate given by the carrier it books, and isn’t directly responsible for meeting it. A direct carrier that owns its fleet can commit to and be held accountable for a specific service level.',
  },
  {
    q: 'Do I need a freight broker for interstate freight in Australia?',
    a: 'Not necessarily. Many direct carriers, including Bivry, run established interstate networks and can handle Melbourne-to-capital-city freight without a broker as the middle party.',
  },
  {
    q: "What's the main risk of using a freight broker?",
    a: 'The main risk is inconsistent service, since the broker isn’t the one executing delivery - quality depends entirely on which carrier they book for that shipment, and it can change load to load.',
  },
  {
    q: 'Should a growing business use a broker or a direct carrier for freight management?',
    a: 'A growing business with increasingly regular freight volume is usually better served by a direct carrier, since consistent freight management, accountability, and tracking matter more as shipping frequency increases.',
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

export function FreightBrokerArticlePage() {
  usePageTitle(SEO_TITLE)
  useMetaDescription(META_DESCRIPTION)
  useCanonical('/blog/freight-broker-vs-direct-carrier-melbourne')

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
              Freight Broker vs Direct Carrier: <span style={{ color: GREEN }}>Which Is Right for You?</span>
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
              alt="Bivry branded freight truck and trailers on an Australian highway representing direct carrier transport"
              style={{ width: '100%', height: 'clamp(240px,38vw,460px)', objectFit: 'cover', borderRadius: 20, boxShadow: '0 30px 80px rgba(0,0,0,0.35)', display: 'block' }}
            />
          </div>
        </div>

        {/* ── ARTICLE BODY ─────────────────────────────────────────── */}
        <article className="sd-pad" style={{ background: CREAM, padding: 'clamp(80px,9vw,130px) clamp(24px,5vw,80px) clamp(56px,7vw,90px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }}>
            {/* Lead */}
            <p style={{ ...BODY, fontSize: 'clamp(17px,1.4vw,21px)', color: 'rgba(8,33,60,0.78)', fontWeight: 500 }}>
              Choosing how your freight actually moves - through a broker's network or a carrier's own trucks - shapes your costs, your visibility, and who is accountable when something goes wrong. Here's how the two models really compare, and how to match the right one to your business.
            </p>

            {/* TL;DR key facts */}
            <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(8,33,60,0.07)', padding: 'clamp(24px,3vw,36px)', margin: '8px 0 44px' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: GREEN, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '1px' }}>TL;DR - Key Facts</h2>
              <CheckList items={KEY_FACTS} />
            </div>

            {/* What is a freight broker */}
            <h2 style={SECTION_TITLE}>What Is a Freight Broker?</h2>
            <p style={BODY}>
              A freight broker is a licensed intermediary who arranges transport on your behalf by booking space with third-party carriers rather than operating their own trucks. Brokers don't own equipment; their value is in their carrier network, rate negotiation, and ability to find capacity quickly, especially on lanes or freight types outside a shipper's usual patterns.
            </p>
            <CheckList items={BROKER_TRAITS} />

            {/* What is a direct carrier */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>What Is a Direct Carrier?</h2>
            <p style={BODY}>
              A direct carrier is a transport company that owns and operates its own fleet, drivers, and delivery infrastructure to move your freight itself. Because the carrier controls every stage of the shipment, there's no third party between the booking and the truck - which is why direct carriers are often chosen for freight management that depends on consistency and direct accountability. Bivry's <InlineServiceLink serviceId="interstate">road freight and logistics services</InlineServiceLink> are a working example of this model.
            </p>
            <CheckList items={CARRIER_TRAITS} />

            {/* Difference / comparison table */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>What's the Difference Between a Freight Broker and a Direct Carrier?</h2>
            <p style={BODY}>
              The core difference is ownership and control: a broker arranges freight through other companies' trucks, while a direct carrier moves your freight with its own. That distinction shapes pricing, accountability, and how quickly problems get resolved.
            </p>
            <div className="sd-compare" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '8px 0 28px' }}>
              {/* Broker column */}
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(8,33,60,0.07)', overflow: 'hidden' }}>
                <div style={{ background: NAVY, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Network size={18} strokeWidth={2.5} color="#fff" />
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>Freight Broker</span>
                </div>
                <div style={{ padding: '8px 20px 16px' }}>
                  {COMPARISON.map(d => (
                    <div key={d.factor} style={{ padding: '14px 0', borderBottom: '1px solid rgba(8,33,60,0.06)' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: NAVY, marginBottom: 6 }}>{d.factor}</div>
                      <div style={{ fontSize: 14, color: 'rgba(8,33,60,0.68)', lineHeight: 1.6 }}>{d.broker}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Direct carrier column */}
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(8,33,60,0.07)', overflow: 'hidden' }}>
                <div style={{ background: GREEN, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Truck size={18} strokeWidth={2.5} color="#fff" />
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>Direct Carrier</span>
                </div>
                <div style={{ padding: '8px 20px 16px' }}>
                  {COMPARISON.map(d => (
                    <div key={d.factor} style={{ padding: '14px 0', borderBottom: '1px solid rgba(8,33,60,0.06)' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: GREEN, marginBottom: 6 }}>{d.factor}</div>
                      <div style={{ fontSize: 14, color: 'rgba(8,33,60,0.68)', lineHeight: 1.6 }}>{d.carrier}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How a broker manages freight */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>How Does a Freight Broker Manage Freight for Your Business?</h2>
            <p style={BODY}>
              A freight broker manages your freight by collecting your shipment details, sourcing quotes from its carrier network, booking the best-fit option, and coordinating pickup and delivery on your behalf. This makes brokers useful when a business needs flexible freight management without maintaining direct relationships with dozens of individual carriers.
            </p>
            <CheckList items={BROKER_STEPS} />
            <p style={BODY}>
              The trade-off: because the broker isn't the one driving the truck, resolution speed on delays or damage claims depends on how responsive their carrier partner is.
            </p>

            {/* Melbourne businesses */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Why Do Melbourne Businesses Use a Freight Broker Instead of a Direct Carrier?</h2>
            <p style={BODY}>
              Melbourne businesses often turn to a freight broker when they need access to capacity or routes outside a single carrier's network - particularly for one-off interstate runs, seasonal spikes, or specialised freight types. Melbourne's position as one of Australia's busiest freight corridors (heavy Melbourne–Sydney and Melbourne–Brisbane lanes) means capacity can tighten quickly during peak periods, and a broker's multi-carrier network can absorb that volume when a single carrier can't.
            </p>
            <p style={BODY}>
              The trade-off is that service quality varies by which carrier the broker books on any given day - so a freight broker Melbourne shippers use for overflow capacity isn't always the right fit for freight that needs consistent, measurable service standards like on-time percentage and live GPS tracking.
            </p>

            {/* Which is better */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Which Is Better for Your Business - a Freight Broker or a Direct Carrier?</h2>
            <p style={BODY}>
              Neither option is universally better; the right choice depends on how predictable your freight volume is and how much direct control you need over delivery outcomes. Use the breakdown below to match the model to your shipping pattern.
            </p>
            <h3 style={SUB_TITLE}>When a Direct Carrier Makes Sense</h3>
            <CheckList items={DIRECT_MAKES_SENSE} />
            <h3 style={SUB_TITLE}>When a Freight Broker Makes Sense</h3>
            <CheckList items={BROKER_MAKES_SENSE} />

            {/* Combining both */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>How Does a Logistics Service Provider Combine Both Advantages?</h2>
            <p style={BODY}>
              A full-service logistics service provider closes the gap between the two models by owning its fleet and freight management systems while still offering the route coverage and service flexibility businesses usually go to a broker for. This is the model Bivry operates on: rather than outsourcing your freight to a rotating pool of third-party carriers, Bivry moves it directly through its own <InlineServiceLink serviceId="interstate">road freight services</InlineServiceLink> - with 96.2% on-time delivery and 24/7 GPS tracking as measurable proof of service consistency, not a marketing claim you have to take on faith.
            </p>
            <p style={BODY}>
              For businesses that have relied on brokers mainly for reliability concerns with a previous direct carrier, a provider that combines its own fleet with dependable freight management - backed by <InlineServiceLink serviceId="warehousing">warehousing and distribution</InlineServiceLink> under one roof - can offer the best of both: direct accountability without sacrificing service coverage.
            </p>

            {/* Key takeaways */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Key Takeaways</h2>
            <CheckList items={TAKEAWAYS} />
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
        /* Phones: stack the comparison columns, near full-width gutters */
        @media (max-width: 600px) {
          .sd-pad   { padding-left: 18px !important; padding-right: 18px !important; }
          .sd-pad-x { padding-left: 18px !important; padding-right: 18px !important; }
          .sd-img-inner { transform: translateY(24px) !important; }
          .sd-compare { grid-template-columns: 1fr !important; }
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
