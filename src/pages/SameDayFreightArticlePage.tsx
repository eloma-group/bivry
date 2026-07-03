import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Zap, Boxes } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'
import { usePageTitle } from '../hooks/usePageTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { useCanonical } from '../hooks/useCanonical'
import { PAGE_SEO } from '../data/seo'

/* SEO settings — title/description shared with the prerender via PAGE_SEO */
const SEO_TITLE = PAGE_SEO['/blog/same-day-delivery-vs-standard-freight'].title
const META_DESCRIPTION = PAGE_SEO['/blog/same-day-delivery-vs-standard-freight'].description
const KEYWORDS =
  'Same Day Delivery, Standard Freight, Interstate Freight Services, Logistics Solutions, Freight Services, Business Logistics'

const CATEGORY = 'Logistics'
const DATE = 'June 2025'
const READ_TIME = '5 min'
const TAGS = ['Same Day Delivery', 'Standard Freight', 'Logistics']

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

const SAMEDAY_USES = [
  'Emergency stock replenishment',
  'Medical supplies',
  'Urgent customer orders',
  'Critical replacement parts',
  'Time-sensitive business deliveries',
]

const STANDARD_USES = [
  'Bulk shipments',
  'Inventory transfers',
  'Regular business deliveries',
  'Interstate freight movement',
  'Planned logistics operations',
]

const DIFFERENCES = [
  { label: 'Delivery Speed', sameDay: 'Fastest option available — goods arrive within hours.', standard: 'Typically one or more days, depending on distance and destination.' },
  { label: 'Cost', sameDay: 'Generally costs more because dedicated resources are required.', standard: 'Often more affordable for routine, planned shipments.' },
  { label: 'Flexibility', sameDay: 'Greater flexibility for urgent requirements.', standard: 'Follows predetermined schedules and delivery routes.' },
  { label: 'Shipment Priority', sameDay: 'Urgent deliveries receive immediate attention.', standard: 'Efficient movement within planned logistics schedules.' },
]

const CHOOSE_SAMEDAY = [
  { title: 'Emergency Stock Replenishment', desc: 'Running out of stock can result in lost sales and operational disruptions. Same day delivery helps prevent costly downtime.' },
  { title: 'Healthcare and Medical Deliveries', desc: 'Medical supplies often require urgent transportation to support patient care and healthcare operations.' },
  { title: 'Manufacturing Operations', desc: 'Critical replacement parts can be delivered quickly to minimise production interruptions.' },
  { title: 'Premium Customer Service', desc: 'Businesses seeking a competitive advantage often use same day delivery to exceed customer expectations.' },
]

const CHOOSE_STANDARD = [
  { title: 'Bulk Freight Movement', desc: 'Large shipments can be transported more economically using scheduled freight services.' },
  { title: 'Regular Inventory Transfers', desc: 'Businesses moving stock between warehouses often benefit from predictable freight schedules.' },
  { title: 'Interstate Freight Operations', desc: 'Long-distance transportation typically works best through structured freight planning.' },
  { title: 'Cost Management', desc: 'Standard freight helps businesses maintain lower logistics costs while supporting operational efficiency.' },
]

const SAMEDAY_BENEFITS = [
  'Faster response times',
  'Improved customer satisfaction',
  'Reduced operational downtime',
  'Enhanced business reputation',
  'Greater logistics flexibility',
]

const STANDARD_BENEFITS = [
  'Lower transportation costs',
  'Scalable logistics operations',
  'Predictable delivery schedules',
  'Efficient bulk transportation',
  'Better long-term planning',
]

const FACTORS = ['Delivery Urgency', 'Budget Requirements', 'Customer Expectations', 'Freight Type']

const FAQS = [
  {
    q: 'Is same day delivery more expensive than standard freight?',
    a: 'Yes. Same day delivery typically costs more because it prioritises speed and dedicated transport resources.',
  },
  {
    q: 'When should businesses use standard freight?',
    a: 'Standard freight is ideal for bulk shipments, inventory transfers, and planned logistics operations.',
  },
  {
    q: 'Can businesses use both freight options?',
    a: 'Yes. Many businesses combine same day delivery and standard freight to balance cost and speed.',
  },
  {
    q: 'Which option is better for interstate deliveries?',
    a: 'Standard freight is generally more cost-effective for long-distance interstate freight movement.',
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

export function SameDayFreightArticlePage() {
  usePageTitle(SEO_TITLE)
  useMetaDescription(META_DESCRIPTION)
  useCanonical('/blog/same-day-delivery-vs-standard-freight')

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

          <div style={{ maxWidth: 980, margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
              Same Day Delivery vs Standard Freight: <span style={{ color: GREEN }}>Which One Does Your Business Need?</span>
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
              src="/images/sameday-hero.jpg"
              alt="Courier preparing a same day delivery parcel for dispatch"
              style={{ width: '100%', height: 'clamp(240px,38vw,460px)', objectFit: 'cover', borderRadius: 20, boxShadow: '0 30px 80px rgba(0,0,0,0.35)', display: 'block' }}
            />
          </div>
        </div>

        {/* ── ARTICLE BODY ─────────────────────────────────────────── */}
        <article className="sd-pad" style={{ background: CREAM, padding: 'clamp(80px,9vw,130px) clamp(24px,5vw,80px) clamp(56px,7vw,90px)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {/* Lead */}
            <p style={{ ...BODY, fontSize: 'clamp(17px,1.4vw,21px)', color: 'rgba(8,33,60,0.78)', fontWeight: 500 }}>
              Modern businesses operate in an environment where speed, reliability, and customer satisfaction directly impact success. As customer expectations continue to rise, choosing the right freight solution has become more important than ever.
            </p>
            <p style={BODY}>
              Two of the most common logistics options available are same day delivery and standard freight services. While both play essential roles in supply chain management, understanding their differences can help businesses make smarter logistics decisions.
            </p>

            {/* What is same day */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>What Is Same Day Delivery?</h2>
            <p style={BODY}>
              Same day delivery is a transport service where goods are collected and delivered within the same day. This service is commonly used when speed is critical and delays could negatively impact operations or customer satisfaction.
            </p>
            <p style={{ ...BODY, marginBottom: 12, fontWeight: 600, color: 'rgba(8,33,60,0.78)' }}>Businesses often use same day delivery for:</p>
            <CheckList items={SAMEDAY_USES} />

            {/* What is standard freight */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>What Is Standard Freight?</h2>
            <p style={BODY}>
              Standard freight refers to scheduled transportation services that operate according to planned delivery timelines. Unlike same day services, standard freight focuses on cost-effective transportation rather than urgency.
            </p>
            <p style={{ ...BODY, marginBottom: 12, fontWeight: 600, color: 'rgba(8,33,60,0.78)' }}>Standard freight is commonly used for:</p>
            <CheckList items={STANDARD_USES} />

            {/* Inline image */}
            <img
              src="/images/sameday-van.jpg"
              alt="Delivery van on the road handling urgent same day freight"
              style={{ width: '100%', height: 'clamp(200px,30vw,360px)', objectFit: 'cover', borderRadius: 16, margin: '12px 0 44px' }}
            />

            {/* Key differences — comparison table */}
            <h2 style={{ ...SECTION_TITLE }}>Key Differences</h2>
            <p style={BODY}>A side-by-side look at how the two services compare across the factors that matter most:</p>
            <div className="sd-compare" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '8px 0 28px' }}>
              {/* Same day column */}
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(8,33,60,0.07)', overflow: 'hidden' }}>
                <div style={{ background: GREEN, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Zap size={18} strokeWidth={2.5} color="#fff" />
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>Same Day Delivery</span>
                </div>
                <div style={{ padding: '8px 20px 16px' }}>
                  {DIFFERENCES.map(d => (
                    <div key={d.label} style={{ padding: '14px 0', borderBottom: '1px solid rgba(8,33,60,0.06)' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: GREEN, marginBottom: 6 }}>{d.label}</div>
                      <div style={{ fontSize: 14, color: 'rgba(8,33,60,0.68)', lineHeight: 1.6 }}>{d.sameDay}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Standard column */}
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(8,33,60,0.07)', overflow: 'hidden' }}>
                <div style={{ background: NAVY, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Boxes size={18} strokeWidth={2.5} color="#fff" />
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>Standard Freight</span>
                </div>
                <div style={{ padding: '8px 20px 16px' }}>
                  {DIFFERENCES.map(d => (
                    <div key={d.label} style={{ padding: '14px 0', borderBottom: '1px solid rgba(8,33,60,0.06)' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: NAVY, marginBottom: 6 }}>{d.label}</div>
                      <div style={{ fontSize: 14, color: 'rgba(8,33,60,0.68)', lineHeight: 1.6 }}>{d.standard}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* When to choose same day */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>When Businesses Should Choose Same Day Delivery</h2>
            {CHOOSE_SAMEDAY.map(item => (
              <div key={item.title}>
                <h3 style={SUB_TITLE}>{item.title}</h3>
                <p style={BODY}>{item.desc}</p>
              </div>
            ))}

            {/* When to choose standard */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>When Standard Freight Is the Better Choice</h2>
            {CHOOSE_STANDARD.map(item => (
              <div key={item.title}>
                <h3 style={SUB_TITLE}>{item.title}</h3>
                <p style={BODY}>{item.desc}</p>
              </div>
            ))}

            {/* Benefits, two columns */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Benefits at a Glance</h2>
            <div className="sd-compare" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, margin: '8px 0 28px' }}>
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(8,33,60,0.07)', padding: 'clamp(20px,2.4vw,28px)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: GREEN, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Same Day Delivery</h3>
                <CheckList items={SAMEDAY_BENEFITS} />
              </div>
              <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(8,33,60,0.07)', padding: 'clamp(20px,2.4vw,28px)' }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: NAVY, margin: '0 0 16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Standard Freight</h3>
                <CheckList items={STANDARD_BENEFITS} />
              </div>
            </div>

            {/* Factors to consider */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Factors to Consider Before Choosing</h2>
            <p style={{ ...BODY, marginBottom: 12 }}>When selecting between same day delivery and standard freight, consider:</p>
            <CheckList items={FACTORS} />
            <p style={BODY}>
              Many businesses achieve the best results by combining both services within their supply chain strategy.
            </p>

            {/* How BIVRY supports */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>How BIVRY Supports Both Freight Models</h2>
            <p style={BODY}>
              BIVRY provides flexible logistics solutions that support both urgent and scheduled freight requirements.
            </p>
            <p style={BODY}>
              Businesses can access logistics solutions, <InlineServiceLink serviceId="sameday">same day delivery services</InlineServiceLink>, <InlineServiceLink serviceId="interstate">interstate transport</InlineServiceLink>, and <InlineServiceLink serviceId="warehousing">warehousing support</InlineServiceLink> through a single logistics partner.
            </p>

            {/* Conclusion */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Conclusion</h2>
            <p style={BODY}>
              Choosing between same day delivery and standard freight depends on your business objectives, budget, and delivery requirements. While same day delivery focuses on speed and responsiveness, standard freight offers cost-effective transportation for routine logistics operations.
            </p>
            <p style={BODY}>
              By understanding the strengths of each service, businesses can create a more efficient supply chain and improve customer satisfaction.
            </p>
          </div>
        </article>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="sd-pad" style={{ background: '#fff', padding: 'clamp(64px,8vw,110px) clamp(24px,5vw,80px)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
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
