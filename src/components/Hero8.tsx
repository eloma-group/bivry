import { motion } from 'framer-motion'
import { ArrowUpRight, Truck, Building2, Briefcase } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useIntersection } from '../hooks/useIntersection'

const GREEN = '#3CB98C'

// Same content as the primary hero — unchanged.
const BADGES = [
  { icon: Truck,      label: 'Interstate Road Transport',  sub: 'All Australian States'   },
  { icon: Building2,  label: 'Warehousing',               sub: 'Multi Location'          },
  { icon: Briefcase,  label: 'Contract Logistics',        sub: 'Tailored to Your KPIs'   },
]

const HEADLINE_LINES = [
  { text: 'Road Freight,',     color: '#ffffff' },
  { text: 'Warehousing &',     color: GREEN     },
  { text: 'Distribution',      color: GREEN     },
  { text: 'Across Australia',  color: '#ffffff' },
]

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]
const page = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } } }
const slideLeft = {
  hidden:  { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}
const blurUp = {
  hidden:  { opacity: 0, y: 42, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.95, ease: EASE } },
}
const headGroup = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }
const fadeUp = {
  hidden:  { opacity: 0, y: 22, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.85, ease: EASE } },
}
const cardIn = {
  hidden:  { opacity: 0, y: 26, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE } },
}
const cardGroup = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.28 } } }

export function Hero8({ videos = ['/hero-merged.mp4'] }: { videos?: string[] }) {
  const { ref, isVisible } = useIntersection(0.2)

  const videoRef = useRef<HTMLVideoElement>(null)
  const [clip, setClip] = useState(0)
  const isSequence = videos.length > 1
  useEffect(() => {
    if (!isSequence) return
    const v = videoRef.current
    if (!v) return
    v.load(); v.play().catch(() => {})
  }, [clip, isSequence])

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="hero8"
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#04101d' }}
    >
      <style>{`
        @keyframes hero8-pulse { 0%,100% { transform: scale(1); opacity: 1 } 50% { transform: scale(1.7); opacity: .35 } }
        .hero8-card { transition: transform .35s cubic-bezier(0.16,1,0.3,1), background .35s ease, border-color .35s ease; }
        .hero8-card:hover { transform: translateY(-5px); background: rgba(60,185,140,0.10); border-color: rgba(60,185,140,0.40); }
        .hero8-card:hover .hero8-card-ico { background: ${GREEN}; }
        .hero8-card-ico { transition: background .35s ease; }
        @media (max-width: 760px) {
          .hero8-cards { flex-direction: column; }
          .hero8-card { width: 100%; }
        }
      `}</style>

      {/* Full-bleed cinematic video */}
      <video
        ref={videoRef}
        key={isSequence ? videos[clip] : 'single'}
        autoPlay muted playsInline
        aria-label="BIVRY freight trucks on Australian highway showing road transport from container to warehouse to last-mile delivery"
        loop={!isSequence}
        onEnded={isSequence ? () => setClip((c) => (c + 1) % videos.length) : undefined}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
      >
        <source src={isSequence ? videos[clip] : videos[0]} type="video/mp4" />
      </video>

      {/* Filmic gradients — left-heavy so content stays readable, image visible on the right */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `linear-gradient(100deg, rgba(4,16,29,0.94) 0%, rgba(4,16,29,0.82) 30%, rgba(4,16,29,0.45) 55%, rgba(4,16,29,0.12) 78%, transparent 100%),
                     linear-gradient(to bottom, rgba(4,16,29,0.55) 0%, transparent 22%, transparent 70%, rgba(4,16,29,0.6) 100%)`,
      }} />
      {/* Brand glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `radial-gradient(700px 460px at 12% 45%, rgba(60,185,140,0.16), transparent 62%)`,
      }} />

      {/* Left-aligned content layout */}
      <div style={{
        position: 'relative', zIndex: 3, minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(110px, 13vh, 160px) clamp(24px, 4vw, 64px) clamp(56px, 9vh, 92px) clamp(20px, 3vw, 48px)',
        maxWidth: '1600px', margin: '0',
      }}>
        <motion.div variants={page} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} style={{ marginTop: 'clamp(40px, 8vh, 100px)' }}>
          {/* Eyebrow */}
          <motion.div variants={slideLeft} style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
            <span style={{ width: '40px', height: '2px', background: GREEN }} />
            <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '3.5px', textTransform: 'uppercase', color: GREEN }}>
              Australia's Premier Freight Partner
            </span>
          </motion.div>

          {/* Editorial headline */}
          <motion.h1 variants={headGroup} style={{ margin: '0 0 30px', fontWeight: 800 }}>
            {HEADLINE_LINES.map(({ text, color }) => (
              <motion.span key={text} variants={blurUp} style={{
                display: 'block',
                fontSize: 'clamp(39px, 5.7vw, 84px)', fontWeight: 800, color,
                lineHeight: 0.97, letterSpacing: '-1.7px',
              }}>
                {text}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={fadeUp} style={{
            fontSize: 'clamp(15px, 1.4vw, 18px)', color: 'rgba(255,255,255,0.68)',
            lineHeight: 1.75, maxWidth: '520px', margin: '0 0 38px', fontWeight: 400,
          }}>
            BIVRY is Australia's trusted freight company — delivering premium
            road freight, warehousing, and logistics services across every state.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: 'clamp(44px, 6vh, 72px)' }}>
            <motion.a
              href="/contact#contact-form"
              whileHover={{ y: -2, boxShadow: '0 22px 52px rgba(60,185,140,0.5)' }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '16px 32px', fontSize: '14px', fontWeight: 700,
                color: '#06182b', background: `linear-gradient(100deg, ${GREEN}, #5FD9AE)`,
                borderRadius: '50px', cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(60,185,140,0.4)',
              }}
            >
              Get a Free Quote <ArrowUpRight size={16} strokeWidth={2.5} />
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.12)' }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '16px 32px', fontSize: '14px', fontWeight: 600,
                color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.08)',
                borderRadius: '50px', border: '1.5px solid rgba(255,255,255,0.24)',
                cursor: 'pointer', letterSpacing: '0.3px', textDecoration: 'none',
              }}
            >
              Our Services
            </motion.a>
          </motion.div>

          {/* Badge cards — left aligned row */}
          <motion.div
            className="hero8-cards"
            variants={cardGroup}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', maxWidth: '740px' }}
          >
            {BADGES.map(({ icon: Icon, label, sub }) => (
              <motion.div
                key={label}
                className="hero8-card"
                variants={cardIn}
                style={{
                  flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '14px',
                  padding: 'clamp(14px, 1.8vh, 18px) clamp(16px, 1.6vw, 20px)',
                  borderRadius: '16px', border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(4,16,29,0.45)', backdropFilter: 'blur(12px)',
                }}
              >
                <div className="hero8-card-ico" style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: 'rgba(60,185,140,0.16)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={20} color="#fff" strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', lineHeight: 1.25 }}>{label}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '3px' }}>{sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
