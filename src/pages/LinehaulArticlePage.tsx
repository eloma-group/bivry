import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'
import { usePageTitle } from '../hooks/usePageTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { useCanonical } from '../hooks/useCanonical'

/* SEO settings pulled directly from the source brief */
const SEO_TITLE = 'Linehaul Transport Australia: Complete Guide for Businesses'
const META_DESCRIPTION =
  'Learn how linehaul transport works in Australia, its benefits, costs, and why businesses rely on interstate freight solutions for efficient logistics.'
const KEYWORDS =
  'Linehaul Transport Australia, Interstate Road Transport, Linehaul Freight, Interstate Freight Australia, Freight Transport Services, Long Distance Freight Transport, Supply Chain Logistics, Road Freight Solutions'

const CATEGORY = 'Logistics'
const DATE = 'June 2025'
const READ_TIME = '6 min'
const TAGS = ['Linehaul', 'Freight', 'Logistics']

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
const BODY: React.CSSProperties = {
  fontSize: 'clamp(15px,1.15vw,18px)', color: 'rgba(8,33,60,0.66)',
  lineHeight: 1.9, margin: '0 0 22px',
}

const BENEFITS = [
  'Reduced costs because of freight consolidation.',
  'Efficiency in supply chain management.',
  'Prompt delivery of goods.',
  'Proper inventory management.',
  'Opportunities for expansion into a nationwide market.',
]

const PROVIDER_CRITERIA = [
  'Real-time tracking.',
  'National coverage.',
  'Versatile freight solutions.',
  'Warehousing services.',
  'Good customer support.',
]

const FAQS = [
  {
    q: 'What is line haul transport?',
    a: 'Linehaul transport is the long-haul transport of cargo between major cities, transportation points, and distribution centers.',
  },
  {
    q: 'How is line haul transport different from local deliveries?',
    a: 'Line haul transport is concerned with long-distance and interstate freight transport, whereas local deliveries handle last mile deliveries.',
  },
  {
    q: 'What kinds of industries rely on line haul freight?',
    a: 'Line haul freight transport services are popular among retailers, eCommerce, manufacturing, health care, construction, and FMCG companies.',
  },
  {
    q: 'Is line haul transport cost-effective?',
    a: 'Yes. Freight consolidation and scheduled line haul transport routes make line haul transport cost-effective.',
  },
]

export function LinehaulArticlePage() {
  usePageTitle(SEO_TITLE)
  useMetaDescription(META_DESCRIPTION)
  useCanonical('/blog/linehaul-transport-australia')

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
        <section className="lh-pad" style={{ background: NAVY, padding: 'clamp(96px,12vw,160px) clamp(24px,5vw,80px) clamp(48px,6vw,80px)', position: 'relative', overflow: 'hidden' }}>
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
              style={{ fontSize: 'clamp(34px,5vw,64px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1.04, margin: '0 0 24px', textTransform: 'uppercase' }}
            >
              Understanding Linehaul Transport: A Guide for <span style={{ color: GREEN }}>Australian Enterprises</span>
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
        <div className="lh-pad-x" style={{ background: NAVY, padding: '0 clamp(24px,5vw,80px)' }}>
          <div className="lh-img-inner" style={{ maxWidth: 980, margin: '0 auto', transform: 'translateY(40px)' }}>
            <motion.img
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease }}
              src="/images/linehaul-hero.jpg"
              alt="Linehaul freight truck travelling an Australian interstate highway"
              style={{ width: '100%', height: 'clamp(240px,38vw,460px)', objectFit: 'cover', borderRadius: 20, boxShadow: '0 30px 80px rgba(0,0,0,0.35)', display: 'block' }}
            />
          </div>
        </div>

        {/* ── ARTICLE BODY ─────────────────────────────────────────── */}
        <article className="lh-pad" style={{ background: CREAM, padding: 'clamp(80px,9vw,130px) clamp(24px,5vw,80px) clamp(56px,7vw,90px)' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            {/* Lead */}
            <p style={{ ...BODY, fontSize: 'clamp(17px,1.4vw,21px)', color: 'rgba(8,33,60,0.78)', fontWeight: 500 }}>
              With today&rsquo;s rapidly evolving world of doing business, efficient cargo handling becomes the key to achieving high levels of customer satisfaction and overall supply chain performance. This makes the concept of linehaul transport very important for businesses functioning throughout the country.
            </p>
            <p style={BODY}>
              Regardless of whether your enterprise belongs to the retail, manufacturing, wholesale, or eCommerce sectors, comprehending the principles of linehaul freight will bring many benefits to your logistics operation, helping cut costs and increase delivery efficiency.
            </p>

            {/* What is */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>What is Linehaul Transport?</h2>
            <p style={BODY}>
              Linehaul transport is the transfer of freight over long distances between different freight hubs, warehouses, distribution centers, and cities. The linehaul transport system is the basis of Australia&rsquo;s freight infrastructure, connecting important locations all over the states.
            </p>
            <p style={BODY}>
              Freight transfers from Sydney to Melbourne, Brisbane to Adelaide, or Perth to Melbourne are examples of linehaul freight.
            </p>
            <p style={BODY}>
              Unlike local delivery services which are primarily responsible for the last leg of delivery, <InlineServiceLink serviceId="interstate">Interstate Road Transport</InlineServiceLink> provides the initial transportation of freight from one location to another.
            </p>

            {/* Working principle */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Working Principle of Linehaul Transport</h2>
            <p style={BODY}>
              Freight is collected from suppliers, warehouses, or manufacturers. Freight is combined with other cargo moving in the same direction, moved from one major hub to another, and then delivered on a local level upon reaching the destination city.
            </p>
            <p style={BODY}>
              This allows for lower costs and efficient transportation while making sure that freight moves reliably.
            </p>

            {/* Importance */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Importance of Linehaul Transport in Australia</h2>
            <p style={BODY}>
              The large geographical size of the country gives rise to some logistical peculiarities. Companies may be required to deliver freight over large distances to reach their customers and distribution centres. Interstate road transport allows for flexibility, accessibility, and cost-efficient transport options.
            </p>

            {/* Inline image */}
            <img
              src="/images/linehaul-highway.jpg"
              alt="Long distance freight transport on an open Australian highway"
              style={{ width: '100%', height: 'clamp(200px,30vw,360px)', objectFit: 'cover', borderRadius: 16, margin: '8px 0 40px' }}
            />

            {/* Benefits */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 16 }}>Benefits of Linehaul Freight Transportation</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
              {BENEFITS.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: `${GREEN}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    <Check size={14} strokeWidth={3} color={GREEN} />
                  </span>
                  <span style={{ fontSize: 'clamp(15px,1.1vw,17px)', color: 'rgba(8,33,60,0.7)', lineHeight: 1.6, fontWeight: 500 }}>{b}</span>
                </li>
              ))}
            </ul>

            {/* Industries */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Industries Using Linehaul Transportation</h2>
            <p style={BODY}>
              Retailers, online commerce companies, manufacturing industries, health care facilities, construction firms, and FMCG companies need freight transportation services for their operations.
            </p>

            {/* Comparison */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Linehaul Transport and Local Delivery Comparison</h2>
            <p style={BODY}>
              The first one is concerned about transferring the cargo from one city to another, while local delivery involves transporting goods to business customers. For time-critical city-to-city runs, many businesses pair linehaul with <InlineServiceLink serviceId="sameday">Same Day Delivery Services</InlineServiceLink> to cover the final leg.
            </p>

            {/* Selecting a provider */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>How to Select a Suitable Linehaul Transport Service Provider?</h2>
            <p style={BODY}>Consider service providers that have:</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
              {PROVIDER_CRITERIA.map(c => (
                <li key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                  <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: '50%', background: `${GREEN}1A`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    <Check size={14} strokeWidth={3} color={GREEN} />
                  </span>
                  <span style={{ fontSize: 'clamp(15px,1.1vw,17px)', color: 'rgba(8,33,60,0.7)', lineHeight: 1.6, fontWeight: 500 }}>{c}</span>
                </li>
              ))}
            </ul>
            <p style={BODY}>
              A complete partner also offers <InlineServiceLink serviceId="warehousing">Warehousing Solutions</InlineServiceLink> so storage and linehaul work together seamlessly across your supply chain.
            </p>

            {/* How BIVRY serves */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>How BIVRY Serves Australian Businesses</h2>
            <p style={BODY}>
              BIVRY delivers effective freight and logistics services to assist Australian businesses. With an efficient transport network, effective logistics processes and state-of-the-art tracking technology, BIVRY can assist businesses in enhancing their freight process and supply chain efficiency.
            </p>

            {/* Conclusion */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Conclusion</h2>
            <p style={BODY}>
              Linehaul transport plays a crucial role in the logistics industry in Australia. Linehaul transport assists business in moving freight effectively between cities, lowers the cost of transportation, and enhances the efficiency of the supply chain. As businesses continue expanding across Australia, reliable linehaul freight services will remain essential for achieving operational efficiency and long-term growth.
            </p>
          </div>
        </article>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="lh-pad" style={{ background: '#fff', padding: 'clamp(64px,8vw,110px) clamp(24px,5vw,80px)' }}>
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
          .lh-pad   { padding-left: 24px !important; padding-right: 24px !important; }
          .lh-pad-x { padding-left: 24px !important; padding-right: 24px !important; }
        }
        /* Phones: near full-width with a comfortable reading gutter */
        @media (max-width: 600px) {
          .lh-pad   { padding-left: 18px !important; padding-right: 18px !important; }
          .lh-pad-x { padding-left: 18px !important; padding-right: 18px !important; }
          .lh-img-inner { transform: translateY(24px) !important; }
        }
        /* Small phones: edge-to-edge gutters */
        @media (max-width: 400px) {
          .lh-pad   { padding-left: 14px !important; padding-right: 14px !important; }
          .lh-pad-x { padding-left: 14px !important; padding-right: 14px !important; }
        }
      `}</style>
    </div>
  )
}
