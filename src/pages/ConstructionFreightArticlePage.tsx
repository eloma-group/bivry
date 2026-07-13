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
const SEO_TITLE = PAGE_SEO['/blog/construction-materials-delivery-freight-company-australia'].title
const META_DESCRIPTION = PAGE_SEO['/blog/construction-materials-delivery-freight-company-australia'].description
const KEYWORDS =
  'Construction Materials Delivery, Freight Company Australia, Construction Freight, Oversized Load Transport, Heavy Haulage, National Freight Network'

const CATEGORY = 'Logistics'
const DATE = '14 July 2026'
const READ_TIME = '7 min'
const TAGS = ['Construction Freight', 'Materials Delivery', 'Logistics']

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
  'Materials delays are one of the most common causes of construction schedule overruns in Australia, according to industry freight reporting.',
  'Bulk and oversized loads (steel, precast panels, timber packs) need different handling and vehicle types than standard freight.',
  'A national freight network matters more in construction than in most industries, since multi-state builds need consistent delivery windows across every site.',
  "Damage in transit doesn't just cost the material. It costs the labour hours a crew sits idle waiting for a replacement.",
  'Site access constraints (narrow laneways, limited unloading hours, restricted-tonnage roads) require freight partners who plan routes around them in advance, not on the day.',
]

const STRUCTURAL_DIFFERENCES = [
  'Load type — steel beams, precast concrete, glass panels, and bulk aggregate need specialised vehicles and load-securing methods that standard parcel freight doesn’t touch.',
  'Delivery windows — construction sites often have narrow access hours set by council permits or site logistics plans, unlike retail deliveries with flexible timing.',
  'Sequencing — materials frequently need to arrive in a specific build order, so a delayed shipment can stall an entire trade, not just one delivery.',
  'Site conditions — unsealed access roads, height restrictions, and limited unloading equipment all affect what kind of vehicle and crew a job needs.',
]

const FAILURE_POINTS = [
  'A carrier without construction experience underestimating unloading time, pushing later deliveries back for the whole day.',
  'Bulk materials damaged in transit due to inadequate load securing, requiring a reorder and a fresh delivery slot.',
  "A single carrier used across multiple states without consistent service levels, so one region performs well and another doesn't.",
  'Poor communication between the freight provider and site management, leaving a crew unaware a delivery is running late until the truck doesn’t show.',
]

const SERVICES_NEEDED = [
  'Bulk and palletised freight for aggregate, bagged product, and packaged materials.',
  'Oversized and heavy haulage for steel, precast panels, and large equipment.',
  'Scheduled multi-site delivery for builders running several active sites across a city or state.',
  "Time-critical delivery for materials tied to a specific trade's start date, where a delay cascades through the schedule.",
  'Reverse logistics for returning pallets, packaging, and unused materials off site.',
]

const EVALUATION_CHECKLIST = [
  'Ask for construction case studies, not general freight testimonials, and look for evidence of on-time delivery to active sites.',
  'Confirm fleet capability for your specific material types (flatbeds, cranes, specialised securing equipment).',
  'Check their network coverage against every state your project touches.',
  'Test their communication process during the quoting stage, since a slow, vague response now previews how they’ll handle a delivery issue later.',
  'Review their damage and claims process in writing before you need to use it.',
]

const COST_COMPOUNDS = [
  'Idle labour hours while a crew waits on materials that should already be on site.',
  'Reordering and re-freighting costs for anything damaged in transit.',
  'Contractual penalties for missed milestones tied to the overall project timeline.',
  'Reputational cost with clients when a delay becomes visible on a public-facing project.',
]

const NATIONAL_NETWORK = [
  'Builders running simultaneous projects across multiple cities, who need synchronised delivery windows without juggling multiple vendor relationships.',
  'Projects sourcing materials from one state and delivering to a build site in another.',
  'Companies wanting a single reporting and invoicing structure across every active site.',
]

const OVERSIZED_CHECKS = [
  'The carrier holds current permits for over-dimensional loads in every state the delivery crosses.',
  'Their fleet includes flatbeds, cranes, or specialised trailers matched to your material type.',
  'They have a documented load-securing process, since inadequate securing is the leading cause of in-transit damage on bulk loads.',
  'Their drivers have specific experience navigating construction site access, not just highway transport.',
]

const TAKEAWAYS = [
  'Construction materials delivery carries different risks than standard freight: oversized loads, tight delivery windows, and schedule-critical sequencing.',
  'Freight delays and damage are a leading, avoidable cause of construction schedule overruns.',
  'Evaluate freight partners on construction-specific case studies and fleet capability, not price alone.',
  'A national network matters most for builders running multi-state or multi-site projects.',
  'Confirm permits, load-securing processes, and communication practices before your first large order.',
]

const FAQS = [
  {
    q: 'How far in advance should I book freight for a construction project?',
    a: "Book bulk or oversized freight at least two to three weeks ahead where possible, since specialised vehicles and permits for over-dimensional loads often need lead time. Time-critical materials tied to a specific trade's start date should be locked in as soon as the build schedule is confirmed.",
  },
  {
    q: 'Can one freight company handle deliveries across multiple states for the same project?',
    a: 'Yes, a freight provider with a national network can manage multi-state deliveries under one account, giving consistent service levels and a single point of contact across every site rather than coordinating separate regional carriers.',
  },
  {
    q: 'What happens if construction materials are damaged in transit?',
    a: 'A reliable freight partner will have a documented claims process, including replacement timelines and liability terms, agreed before the delivery, not negotiated after the damage occurs. Ask to see this process in writing before your first order.',
  },
  {
    q: 'Do construction sites need a different freight service than a distribution warehouse?',
    a: 'Yes, construction sites typically require more flexible unloading windows, oversized load handling, and delivery sequencing tied to the build schedule, while warehouse freight is generally standardised pallet or bulk delivery on a fixed schedule.',
  },
  {
    q: 'How do I know if a freight company has genuine construction industry experience?',
    a: 'Ask for case studies specific to construction projects, not general freight testimonials, and check whether their fleet includes vehicles suited to oversized or bulk materials. A provider with real experience will answer these questions with specifics, not general reassurance.',
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

export function ConstructionFreightArticlePage() {
  usePageTitle(SEO_TITLE)
  useMetaDescription(META_DESCRIPTION)
  useCanonical('/blog/construction-materials-delivery-freight-company-australia')

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
              How Do You Choose a Freight Company for <span style={{ color: GREEN }}>Construction Materials Delivery in Australia?</span>
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
              alt="Bivry branded freight truck hauling construction materials on an Australian highway"
              style={{ width: '100%', height: 'clamp(240px,38vw,460px)', objectFit: 'cover', borderRadius: 20, boxShadow: '0 30px 80px rgba(0,0,0,0.35)', display: 'block' }}
            />
          </div>
        </div>

        {/* ── ARTICLE BODY ─────────────────────────────────────────── */}
        <article className="sd-pad" style={{ background: CREAM, padding: 'clamp(80px,9vw,130px) clamp(24px,5vw,80px) clamp(56px,7vw,90px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }}>
            {/* Lead */}
            <p style={{ ...BODY, fontSize: 'clamp(17px,1.4vw,21px)', color: 'rgba(8,33,60,0.78)', fontWeight: 500 }}>
              You choose a freight company for construction materials delivery in Australia by checking their experience with oversized and bulk loads, confirming they operate across the states your project touches, and reviewing their track record for on-time, damage-free delivery to active job sites. Construction freight carries different risks than standard parcel or pallet freight, and a mismatch here shows up fast — as delayed pours, idle crews, and blown timelines.
            </p>

            {/* TL;DR key facts */}
            <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(8,33,60,0.07)', padding: 'clamp(24px,3vw,36px)', margin: '8px 0 44px' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: GREEN, margin: '0 0 18px', textTransform: 'uppercase', letterSpacing: '1px' }}>Key Facts</h2>
              <CheckList items={KEY_FACTS} />
            </div>

            {/* Different from standard freight */}
            <h2 style={SECTION_TITLE}>What Makes Construction Materials Delivery Different from Standard Freight?</h2>
            <p style={BODY}>
              Construction materials delivery differs from standard freight because it deals with oversized, heavy, and often fragile loads that need to arrive at a specific site, at a specific time, in a sequence that matches the build schedule rather than a general delivery window.
            </p>
            <p style={BODY}>A few structural differences stand out:</p>
            <CheckList items={STRUCTURAL_DIFFERENCES} />
            <p style={BODY}>
              Freight partners who specialise in <InlineLink to="/industries/construction">construction industry logistics</InlineLink> understand these constraints going in, rather than learning them through a missed delivery window on your project.
            </p>

            {/* Delays */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>How Do Construction Delays Get Caused by Freight and Logistics Issues?</h2>
            <p style={BODY}>
              Freight and logistics issues cause construction delays when materials arrive late, arrive damaged, or arrive out of sequence with the build schedule, forcing crews to sit idle or rework the day’s plan around what’s actually on site rather than what was scheduled.
            </p>
            <p style={BODY}>Common failure points include:</p>
            <CheckList items={FAILURE_POINTS} />
            <p style={BODY}>
              Each of these traces back to the same root cause: a freight partner selected on price alone, without checking construction-specific delivery capability first.
            </p>

            {/* Services needed */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Which Freight Services Do Construction Sites Actually Need?</h2>
            <p style={BODY}>
              Construction sites need a mix of bulk and palletised freight, oversized load transport, scheduled multi-drop delivery, and route planning that accounts for site access restrictions, rather than a single generic freight service applied across every material type.
            </p>
            <CheckList items={SERVICES_NEEDED} />
            <p style={BODY}>
              A freight partner covering all of these under one account reduces the coordination overhead of managing multiple carriers for different material types.
            </p>

            {/* Choosing a reliable company */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>How Do You Choose a Reliable Freight Company for Construction Projects?</h2>
            <p style={BODY}>
              You choose a reliable freight company by checking their construction-specific case studies, confirming their fleet can handle your material types, and testing their communication process before your first large order, not after a delivery has already gone wrong.
            </p>
            <h3 style={SUB_TITLE}>A practical evaluation checklist</h3>
            <CheckList items={EVALUATION_CHECKLIST} />

            {/* On-time delivery */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Why Does On-Time, Damage-Free Delivery Matter for Construction Timelines?</h2>
            <p style={BODY}>
              On-time, damage-free delivery matters because a construction schedule is a chain of dependent tasks, and a single late or damaged shipment doesn’t just delay that one delivery, it pushes every downstream trade back as well.
            </p>
            <h3 style={SUB_TITLE}>The cost compounds quickly</h3>
            <CheckList items={COST_COMPOUNDS} />
            <p style={BODY}>
              A freight partner who treats reliability as core to the service, not an add-on, reduces this risk at the source. Understanding a provider’s <InlineLink to="/values">operating values</InlineLink> around reliability and accountability is a useful signal before committing to a long-term freight contract.
            </p>

            {/* National network */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>How Does a National Freight Network Benefit Multi-State Construction Projects?</h2>
            <p style={BODY}>
              A national freight network benefits multi-state construction projects by giving builders one consistent point of contact and one service standard across every site, instead of managing separate regional carriers with different capabilities, pricing, and communication practices.
            </p>
            <p style={BODY}>This matters most for:</p>
            <CheckList items={NATIONAL_NETWORK} />
            <p style={BODY}>
              Freight coverage across major markets including <InlineLink to="/freight-company-melbourne">Melbourne</InlineLink>, <InlineLink to="/freight-company-sydney">Sydney</InlineLink>, <InlineLink to="/freight-company-brisbane">Brisbane</InlineLink>, <InlineLink to="/freight-company-perth">Perth</InlineLink>, and <InlineLink to="/freight-company-adelaide">Adelaide</InlineLink> means a construction business can standardise its freight relationship regardless of where the next project sits.
            </p>

            {/* Oversized loads */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Can Freight Companies Handle Oversized or Bulk Construction Materials?</h2>
            <p style={BODY}>
              Yes, freight companies with construction industry experience can handle oversized and bulk materials, provided they have the right fleet, load-securing equipment, and permits for wide, heavy, or long loads that standard freight vehicles can’t carry.
            </p>
            <h3 style={SUB_TITLE}>What to confirm before booking oversized freight</h3>
            <CheckList items={OVERSIZED_CHECKS} />
            <p style={BODY}>
              A generalist freight company can sometimes handle a one-off oversized load. A construction-focused freight partner builds this capability into every quote from the start.
            </p>

            {/* Key takeaways */}
            <h2 style={{ ...SECTION_TITLE, marginTop: 48 }}>Key Takeaways</h2>
            <CheckList items={TAKEAWAYS} />
            <p style={BODY}>
              If you’re planning freight for an active or upcoming build, <InlineLink to="/contact">get in touch with Bivry</InlineLink> to talk through your project’s delivery requirements.
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
