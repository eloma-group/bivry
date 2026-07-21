import { useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Plus, Truck, Ship, Plane, FileCheck2,
  Warehouse, ShieldCheck, PhoneCall, Radar, Globe, MapPin,
} from 'lucide-react'
import { Header } from '../components/Header/Header'
import { Footer } from '../components/Footer'
import { InnerHero, PageCTA, NAVY, GREEN, CREAM, ease } from '../components/InnerHero'
import { usePageTitle } from '../hooks/usePageTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { useMetaKeywords } from '../hooks/useMetaKeywords'
import { CITIES } from '../data/cityData'

const SITE = 'https://bivry.com.au'

/* icon per service row (matches the order in cityData) */
const SERVICE_ICONS = [Truck, Ship, Plane, FileCheck2, Warehouse]

/* generic "one team" pillars - design content, identical across cities */
const PILLARS = [
  { Icon: ShieldCheck, title: 'In-house customs', text: 'Licensed brokers lodge entries through the ICS and answer to the ABF directly - no third-party handoff.' },
  { Icon: PhoneCall, title: 'One point of contact', text: 'A named person who can already see your file the moment something needs to change.' },
  { Icon: Radar, title: 'Real-time tracking', text: 'Every leg visible in one place, one invoice instead of five across the whole chain.' },
  { Icon: Globe, title: 'Road · sea · air', text: 'One team owns the shipment from pickup to delivery, across every mode it touches.' },
]

const BODY: React.CSSProperties = {
  fontSize: 'clamp(15px,1.15vw,18px)', color: 'rgba(8,33,60,0.66)',
  lineHeight: 1.9, margin: '0 0 22px',
}

/* ── Hero CTA button ── */
function HeroButton({ label, primary }: { label: string; primary?: boolean }) {
  return (
    <a
      href="/contact"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '15px 30px', borderRadius: 100, minHeight: 44,
        fontSize: 'clamp(13px,1vw,15px)', fontWeight: 700, textDecoration: 'none',
        color: primary ? '#fff' : NAVY,
        background: primary ? GREEN : 'transparent',
        border: `2px solid ${primary ? GREEN : 'rgba(8,33,60,0.18)'}`,
        transition: 'all 0.25s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        if (primary) { el.style.transform = 'translateY(-3px)'; el.style.boxShadow = `0 12px 28px ${GREEN}55` }
        else { el.style.background = NAVY; el.style.borderColor = NAVY; el.style.color = '#fff' }
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        if (primary) { el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }
        else { el.style.background = 'transparent'; el.style.borderColor = 'rgba(8,33,60,0.18)'; el.style.color = NAVY }
      }}
    >
      <ArrowRight size={15} strokeWidth={2.5} color={primary ? '#fff' : GREEN} />{label}
    </a>
  )
}

/* ── Premium service card ── */
function ServiceCard({ title, desc, index }: { title: string; desc: string; index: number }) {
  const [hov, setHov] = useState(false)
  const Icon = SERVICE_ICONS[index] ?? Truck
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.06, ease }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', overflow: 'hidden',
        background: hov ? `linear-gradient(150deg,#fff 50%,${GREEN}0B 100%)` : '#fff',
        border: `1.5px solid ${hov ? GREEN + '55' : 'rgba(8,33,60,0.08)'}`,
        borderRadius: 20, padding: 'clamp(26px,2.6vw,38px)',
        transform: hov ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hov ? `0 28px 56px rgba(60,185,140,0.16),0 8px 22px rgba(0,0,0,0.06)` : '0 2px 10px rgba(8,33,60,0.04)',
        transition: 'all 0.4s cubic-bezier(0.34,1.4,0.64,1)', cursor: 'default',
      }}
    >
      {/* left accent bar */}
      <div style={{
        position: 'absolute', left: 0, top: 0, height: '100%', width: hov ? 4 : 0,
        background: `linear-gradient(to bottom,${GREEN},${GREEN}30)`,
        borderRadius: '20px 0 0 20px', transition: 'width 0.32s ease',
      }} />
      {/* ghosted index */}
      <div style={{
        position: 'absolute', top: 'clamp(18px,2vw,28px)', right: 'clamp(20px,2.4vw,32px)',
        fontSize: 'clamp(38px,4vw,60px)', fontWeight: 900, lineHeight: 1,
        color: hov ? `${GREEN}1F` : 'rgba(8,33,60,0.05)', letterSpacing: '-0.05em',
        transition: 'color 0.35s ease', fontVariantNumeric: 'tabular-nums', pointerEvents: 'none',
      }}>{String(index + 1).padStart(2, '0')}</div>

      <div style={{
        width: 52, height: 52, borderRadius: 14, marginBottom: 22,
        background: hov ? `${GREEN}26` : `${GREEN}14`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transform: hov ? 'scale(1.12) rotate(-6deg)' : 'none',
        boxShadow: hov ? `0 8px 22px ${GREEN}40` : 'none',
        transition: 'all 0.4s cubic-bezier(0.34,1.4,0.64,1)',
      }}>
        <Icon size={24} strokeWidth={1.8} color={GREEN} />
      </div>

      <h3 style={{
        fontSize: 'clamp(18px,1.55vw,23px)', fontWeight: 800,
        color: hov ? GREEN : NAVY, letterSpacing: '-0.025em',
        margin: '0 0 12px', lineHeight: 1.18, transition: 'color 0.25s ease', maxWidth: '85%',
      }}>{title}</h3>
      <div style={{
        height: 2, borderRadius: 2, marginBottom: 16,
        width: hov ? 44 : 0, background: `linear-gradient(90deg,${GREEN},${GREEN}30)`,
        transition: 'width 0.4s cubic-bezier(0.34,1.4,0.64,1)',
      }} />
      <p style={{ fontSize: 'clamp(14px,1.05vw,16px)', color: 'rgba(8,33,60,0.55)', lineHeight: 1.78, margin: 0 }}>{desc}</p>
    </motion.div>
  )
}

/* ── FAQ accordion item ── */
function FaqItem({ q, a, open, onToggle, i }: { q: string; a: string; open: boolean; onToggle: () => void; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05, ease }}
      style={{
        background: open ? '#fff' : CREAM, borderRadius: 18,
        border: `1.5px solid ${open ? GREEN + '40' : 'rgba(8,33,60,0.07)'}`,
        boxShadow: open ? '0 18px 44px rgba(8,33,60,0.08)' : 'none',
        overflow: 'hidden', transition: 'all 0.3s ease',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 18,
          padding: 'clamp(22px,2.4vw,30px)', background: 'transparent', border: 'none',
          cursor: 'pointer', textAlign: 'left', minHeight: 44,
        }}
      >
        <span style={{
          fontSize: 'clamp(15px,1.4vw,20px)', fontWeight: 800, color: open ? GREEN : NAVY,
          letterSpacing: '-0.015em', lineHeight: 1.35, flex: 1, transition: 'color 0.25s ease',
        }}>{q}</span>
        <span style={{
          flexShrink: 0, width: 36, height: 36, borderRadius: '50%',
          background: open ? GREEN : `${GREEN}16`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: open ? 'rotate(135deg)' : 'rotate(0deg)', transition: 'all 0.32s cubic-bezier(0.34,1.4,0.64,1)',
        }}>
          <Plus size={17} strokeWidth={2.6} color={open ? '#fff' : GREEN} />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.38, ease }}
        style={{ overflow: 'hidden' }}
      >
        <p style={{
          fontSize: 'clamp(14px,1.05vw,16px)', color: 'rgba(8,33,60,0.62)', lineHeight: 1.85,
          margin: 0, padding: '0 clamp(22px,2.4vw,30px) clamp(24px,2.6vw,32px)',
          maxWidth: '92%',
        }}>{a}</p>
      </motion.div>
    </motion.div>
  )
}

export function CityFreightPage({ slug }: { slug: string }) {
  const city = CITIES.find(c => c.slug === slug)
  const [openFaq, setOpenFaq] = useState(0)

  usePageTitle(city ? city.metaTitle : "BIVRY - Australia's Road Freight & Logistics Company")
  useMetaDescription(
    city?.metaDescription ??
      'Premium road freight, warehousing and distribution across Australia. 96.2% on-time delivery, 24/7 GPS tracking.'
  )
  useMetaKeywords(city?.keywords ?? [])

  // Canonical tag + WebPage/FAQPage JSON-LD, generated per city and cleaned up on unmount.
  useEffect(() => {
    if (!city) return
    const canonicalUrl = `${SITE}/${city.slug}`

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    const createdLink = !link
    const prevHref = link?.getAttribute('href') ?? null
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonicalUrl)

    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: city.metaTitle,
        description: city.metaDescription,
        url: canonicalUrl,
        about: { '@type': 'Service', serviceType: 'Freight forwarding', areaServed: `${city.name}, Australia` },
        publisher: { '@type': 'Organization', name: 'Bivry', url: SITE },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: city.faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ]
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-city-schema', city.slug)
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    window.scrollTo(0, 0)

    return () => {
      script.remove()
      if (createdLink) link?.remove()
      else if (prevHref !== null) link?.setAttribute('href', prevHref)
    }
  }, [city])

  if (!city) return <Navigate to="/" replace />

  return (
    <div style={{ background: CREAM, overflowX: 'hidden' }}>
      <Header />
      <main>
        {/* ── HERO ── */}
        <InnerHero
          badge={`Freight Company · ${city.name}`}
          line1="FREIGHT COMPANY"
          line2={`IN ${city.name.toUpperCase()}.`}
          titleSize="clamp(40px,8vw,108px)"
          description={city.heroSubline}
          meta={city.stats}
        />

        {/* ── INTRO / OVERVIEW ── */}
        <section className="cf-pad" style={{ background: CREAM, padding: 'clamp(72px,9vw,130px) clamp(24px,4vw,64px)', position: 'relative', overflow: 'hidden' }}>
          {/* city watermark */}
          <div style={{
            position: 'absolute', right: '-2%', bottom: '-4%', zIndex: 0,
            fontSize: 'clamp(120px,20vw,340px)', fontWeight: 900, lineHeight: 0.8,
            color: 'rgba(8,33,60,0.025)', letterSpacing: '-0.06em',
            userSelect: 'none', pointerEvents: 'none', textTransform: 'uppercase',
          }}>{city.name}</div>

          <div style={{ maxWidth: 1760, margin: '0 auto', position: 'relative', zIndex: 1 }} className="cf-inner">
            <div className="cf-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,96px)', alignItems: 'start' }}>
              {/* left - editorial heading */}
              <motion.div
                initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 22 }}>
                  <div style={{ width: 3, height: 16, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 'clamp(10px,0.75vw,12px)', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>
                    Road · Sea · Air · End to End
                  </span>
                </div>
                <h2 style={{
                  fontSize: 'clamp(34px,4.6vw,76px)', fontWeight: 900, color: NAVY,
                  letterSpacing: '-0.046em', lineHeight: 0.94, margin: 0, textTransform: 'uppercase',
                }}>
                  A freight company<br />in {city.name}<span style={{ color: GREEN }}>.</span>
                </h2>

                <div style={{ marginTop: 'clamp(28px,3vw,40px)', display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                  <HeroButton label="Request a quote" primary />
                  <HeroButton label={`Talk to our ${city.name} team`} />
                </div>
              </motion.div>

              {/* right - body */}
              <motion.div
                initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8, ease, delay: 0.12 }}
                style={{ paddingTop: 'clamp(0px,1.5vw,14px)' }}
              >
                <p style={{ ...BODY, fontSize: 'clamp(16px,1.3vw,20px)', color: 'rgba(8,33,60,0.8)', fontWeight: 500 }}>
                  {city.introPort}
                </p>
                <p style={{ ...BODY, marginBottom: 0 }}>{city.introBivry}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section className="cf-pad" style={{ background: '#fff', padding: 'clamp(72px,9vw,130px) clamp(24px,4vw,64px)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="cf-inner">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.65, ease }}
              style={{ marginBottom: 'clamp(40px,4.5vw,64px)', maxWidth: 820 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>
                  What we take off your plate
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(30px,4.2vw,64px)', fontWeight: 900, color: NAVY,
                letterSpacing: '-0.046em', lineHeight: 0.96, margin: '0 0 22px', textTransform: 'uppercase',
              }}>
                What our {city.name} freight<br /><span style={{ color: GREEN }}>company does for you.</span>
              </h2>
              <p style={{ ...BODY, margin: 0, maxWidth: 640 }}>{city.servicesIntro}</p>
            </motion.div>

            <div className="cf-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18 }}>
              {city.services.map((s, i) => (
                <ServiceCard key={s.title} title={s.title} desc={s.desc} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── NAVY "ONE TEAM" BAND ── */}
        <section style={{ background: NAVY, position: 'relative', overflow: 'hidden', padding: 'clamp(72px,9vw,130px) clamp(24px,4vw,64px)' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '-15%', left: '28%', width: '44%', height: '130%', background: `radial-gradient(ellipse,${GREEN}0E 0%,transparent 65%)`, pointerEvents: 'none' }} />

          <div style={{ maxWidth: 1760, margin: '0 auto', position: 'relative', zIndex: 1 }} className="cf-inner">
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, ease }}
              style={{ marginBottom: 'clamp(40px,5vw,68px)', maxWidth: 760 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
                <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: GREEN }}>
                  One job, not five bookings
                </span>
              </div>
              <h2 style={{
                fontSize: 'clamp(30px,4.2vw,64px)', fontWeight: 900, color: '#fff',
                letterSpacing: '-0.046em', lineHeight: 0.96, margin: 0, textTransform: 'uppercase',
              }}>
                Run as one team,<br /><span style={{ color: GREEN }}>from port to your door.</span>
              </h2>
            </motion.div>

            <div className="cf-pillars" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="cf-pillar-cell"
                  style={{
                    padding: 'clamp(28px,2.6vw,40px) clamp(24px,2.4vw,40px)',
                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  }}
                >
                  <div style={{
                    width: 50, height: 50, borderRadius: 14, marginBottom: 24,
                    background: `${GREEN}1A`, border: `1px solid ${GREEN}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <p.Icon size={23} strokeWidth={1.7} color={GREEN} />
                  </div>
                  <div style={{ fontSize: 'clamp(8.5px,0.62vw,10px)', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: GREEN, marginBottom: 12 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 style={{ fontSize: 'clamp(18px,1.6vw,24px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 14px', lineHeight: 1.15 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(255,255,255,0.46)', lineHeight: 1.78, margin: 0 }}>
                    {p.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDITORIAL SECTIONS ── */}
        <section className="cf-pad" style={{ background: CREAM, padding: 'clamp(64px,8vw,120px) clamp(24px,4vw,64px)' }}>
          <div style={{ maxWidth: 1500, margin: '0 auto' }} className="cf-ed-wrap">
            {city.sections.map((sec, i) => (
              <motion.div
                key={sec.heading}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, ease }}
                className="cf-ed-block"
                style={{
                  display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 'clamp(32px,5vw,80px)',
                  alignItems: 'start',
                  padding: 'clamp(40px,5vw,68px) 0',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(8,33,60,0.09)',
                }}
              >
                {/* left - index + heading (sticky on desktop) */}
                <div className="cf-ed-left">
                  <div style={{
                    fontSize: 'clamp(48px,6vw,104px)', fontWeight: 900, lineHeight: 0.85,
                    color: 'rgba(8,33,60,0.07)', letterSpacing: '-0.06em',
                    marginBottom: 'clamp(16px,2vw,26px)', fontVariantNumeric: 'tabular-nums',
                  }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 24, height: 2, background: GREEN, borderRadius: 2 }} />
                  </div>
                  <h2 style={{
                    fontSize: 'clamp(24px,2.6vw,40px)', fontWeight: 900, color: NAVY,
                    letterSpacing: '-0.035em', lineHeight: 1.06, margin: 0, textTransform: 'uppercase',
                  }}>{sec.heading}</h2>
                </div>

                {/* right - body */}
                <div style={{ paddingTop: 'clamp(0px,1vw,12px)' }}>
                  {sec.body.map((p, pi) => (
                    <p key={pi} style={{
                      ...BODY,
                      fontSize: pi === 0 ? 'clamp(16px,1.25vw,19px)' : 'clamp(15px,1.15vw,18px)',
                      color: pi === 0 ? 'rgba(8,33,60,0.78)' : 'rgba(8,33,60,0.62)',
                      marginBottom: pi === sec.body.length - 1 ? 0 : 22,
                    }}>{p}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="cf-pad" style={{ background: '#fff', padding: 'clamp(72px,9vw,120px) clamp(24px,4vw,64px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div className="cf-faq-head" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px,4vw,64px)', alignItems: 'end', marginBottom: 'clamp(40px,5vw,60px)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 16 }}>
                  <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.38)' }}>FAQs</span>
                </div>
                <h2 style={{ fontSize: 'clamp(30px,4.2vw,60px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.046em', lineHeight: 0.96, margin: 0, textTransform: 'uppercase' }}>
                  Frequently asked<br /><span style={{ color: GREEN }}>questions.</span>
                </h2>
              </div>
              <p style={{ fontSize: 'clamp(14px,1.1vw,16px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.8, margin: 0 }}>
                Straight answers on choosing a freight company in {city.name}, how forwarding works, and who's accountable at the border.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {city.faqs.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} i={i} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
              ))}
            </div>

            {/* closing line + inline quote link */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, ease }}
              style={{
                marginTop: 'clamp(36px,4vw,56px)', padding: 'clamp(28px,3vw,44px)',
                background: CREAM, borderRadius: 20, border: '1.5px solid rgba(8,33,60,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 24,
              }}
            >
              <p style={{ fontSize: 'clamp(16px,1.3vw,20px)', color: 'rgba(8,33,60,0.72)', lineHeight: 1.7, margin: 0, maxWidth: 620, fontWeight: 500 }}>
                {city.closing}
              </p>
              <a href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, flexShrink: 0,
                padding: '15px 30px', borderRadius: 100, minHeight: 44,
                background: NAVY, color: '#fff', textDecoration: 'none',
                fontSize: 'clamp(13px,1vw,15px)', fontWeight: 700, transition: 'all 0.25s ease',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = GREEN; el.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = NAVY; el.style.transform = 'translateY(0)' }}
              >
                Get a quote <ArrowUpRight size={16} strokeWidth={2.5} />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── OTHER CITIES (internal links for crawl + relevance) ── */}
        <section className="cf-pad" style={{ background: CREAM, padding: 'clamp(40px,5vw,72px) clamp(24px,4vw,64px)', borderTop: '1px solid rgba(8,33,60,0.07)' }}>
          <div style={{ maxWidth: 1760, margin: '0 auto' }} className="cf-inner">
            <div className="cf-cities" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'clamp(16px,2vw,28px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <div style={{ width: 3, height: 14, background: GREEN, borderRadius: 2 }} />
                <span style={{ fontSize: 'clamp(10px,0.78vw,12px)', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(8,33,60,0.42)' }}>
                  Freight in other cities
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {CITIES.filter(c => c.slug !== slug).map(c => (
                  <Link
                    key={c.slug}
                    to={`/${c.slug}`}
                    title={`Freight company in ${c.name}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 7,
                      padding: '10px 18px', borderRadius: 100, minHeight: 44,
                      fontSize: 'clamp(12px,0.95vw,14px)', fontWeight: 700,
                      color: 'rgba(8,33,60,0.62)', background: '#fff',
                      border: '1.5px solid rgba(8,33,60,0.1)', textDecoration: 'none',
                      transition: 'all 0.22s ease',
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${GREEN}10`; el.style.borderColor = `${GREEN}55`; el.style.color = NAVY; el.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#fff'; el.style.borderColor = 'rgba(8,33,60,0.1)'; el.style.color = 'rgba(8,33,60,0.62)'; el.style.transform = 'translateY(0)' }}
                  >
                    <MapPin size={13} strokeWidth={2.2} color={GREEN} />
                    Freight Company {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <PageCTA
          line1="GET A"
          line2="QUOTE."
          buttonLabel="Get a Quote"
          sub={`One team, one point of contact, from ${city.port} to your door. Tell us what you're moving and we'll come back with a clear price and a plan.`}
        />
      </main>
      <Footer />

      <style>{`
        .cf-cards { grid-template-columns: repeat(3,1fr); }
        .cf-pillars { grid-template-columns: repeat(4,1fr); }
        .cf-overview-grid { grid-template-columns: 1fr 1fr; }

        /* sticky editorial heading on wide screens */
        @media (min-width: 901px) {
          .cf-ed-left { position: sticky; top: 92px; }
        }

        @media (max-width: 1080px) {
          .cf-pillars { grid-template-columns: repeat(2,1fr) !important; }
          .cf-pillar-cell:nth-child(3) { border-left: none !important; }
          .cf-pillar-cell:nth-child(n+3) { border-top: 1px solid rgba(255,255,255,0.08) !important; }
        }
        @media (max-width: 980px) {
          .cf-cards { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 900px) {
          .cf-overview-grid { grid-template-columns: 1fr !important; }
          .cf-ed-block { grid-template-columns: 1fr !important; gap: 18px !important; }
          .cf-faq-head { grid-template-columns: 1fr !important; align-items: start !important; }
          .cf-cities { flex-direction: column !important; align-items: flex-start !important; }
        }
        @media (max-width: 768px) {
          .cf-pad { padding-left: 24px !important; padding-right: 24px !important; }
        }
        @media (max-width: 640px) {
          .cf-cards { grid-template-columns: 1fr !important; }
          .cf-pillars { grid-template-columns: 1fr !important; }
          .cf-pillar-cell { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.08) !important; }
          .cf-pillar-cell:first-child { border-top: none !important; }
        }
        @media (max-width: 400px) {
          .cf-pad { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (min-width: 1920px) {
          .cf-inner { max-width: 1900px !important; }
        }
        @media (min-width: 2560px) {
          .cf-inner { max-width: 2400px !important; }
        }
      `}</style>
    </div>
  )
}
