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
  { text: 'Built to Move', color: '#ffffff' },
  { text: 'Every Tonne,',  color: GREEN     },
  { text: 'Every Time.',   color: '#ffffff' },
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
const stripIn = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

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
        @keyframes hero8-scroll { 0% { transform: translateY(-100%) } 100% { transform: translateY(280%) } }
        @keyframes hero8-pulse { 0%,100% { transform: scale(1); opacity: 1 } 50% { transform: scale(1.7); opacity: .35 } }
        .hero8-strip-cell { transition: background .3s ease; }
        .hero8-strip-cell:hover { background: rgba(60,185,140,0.08); }
        .hero8-strip-cell:hover .hero8-strip-ico { background: ${GREEN}; }
        .hero8-strip-ico { transition: background .3s ease; }
        @media (max-width: 860px) {
          .hero8-strip { flex-direction: column; }
          .hero8-strip-cell { border-left: none !important; border-top: 1px solid rgba(255,255,255,0.10); }
          .hero8-strip-cell:first-child { border-top: none; }
        }
      `}</style>

      {/* Full-bleed cinematic video */}
      <video
        ref={videoRef}
        key={isSequence ? videos[clip] : 'single'}
        autoPlay muted playsInline
        loop={!isSequence}
        onEnded={isSequence ? () => setClip((c) => (c + 1) % videos.length) : undefined}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
      >
        <source src={isSequence ? videos[clip] : videos[0]} type="video/mp4" />
      </video>

      {/* Filmic gradients */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `linear-gradient(to top, rgba(4,16,29,0.96) 0%, rgba(4,16,29,0.55) 28%, rgba(4,16,29,0.12) 52%, transparent 70%),
                     linear-gradient(105deg, rgba(4,16,29,0.85) 0%, rgba(4,16,29,0.35) 38%, transparent 62%)`,
      }} />
      {/* Brand glow + top nav blend */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `radial-gradient(700px 420px at 8% 92%, rgba(60,185,140,0.18), transparent 60%),
                     linear-gradient(to bottom, rgba(4,16,29,0.5) 0%, transparent 14%)`,
      }} />

      {/* Scroll cue (decorative) */}
      <div style={{
        position: 'absolute', right: 'clamp(28px, 4vw, 56px)', top: '50%', zIndex: 3,
        width: '1px', height: '60px', background: 'rgba(255,255,255,0.18)', overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '40%', background: GREEN, animation: 'hero8-scroll 2.4s ease-in-out infinite' }} />
      </div>

      {/* Content layout */}
      <div style={{
        position: 'relative', zIndex: 3, minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: 'clamp(96px, 12vh, 150px) clamp(40px, 6vw, 96px) 0',
        maxWidth: '1500px', margin: '0 auto',
      }}>
        <motion.div variants={page} initial="hidden" animate={isVisible ? 'visible' : 'hidden'} style={{ paddingBottom: 'clamp(40px, 6vh, 72px)' }}>
          {/* Eyebrow */}
          <motion.div variants={slideLeft} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '26px' }}>
            <span style={{ position: 'relative', width: '8px', height: '8px' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: GREEN, animation: 'hero8-pulse 2.4s ease-in-out infinite' }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: GREEN }} />
            </span>
            <span style={{ width: '36px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)' }}>
              Australia's Premier Freight Partner
            </span>
          </motion.div>

          {/* Editorial headline */}
          <motion.div variants={headGroup} style={{ marginBottom: '28px' }}>
            {HEADLINE_LINES.map(({ text, color }) => (
              <motion.div key={text} variants={blurUp} style={{
                fontSize: 'clamp(46px, 7.2vw, 104px)', fontWeight: 800, color,
                lineHeight: 0.98, letterSpacing: '-2.5px',
              }}>
                {text}
              </motion.div>
            ))}
          </motion.div>

          {/* Subtitle + CTAs in a row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: 'clamp(24px, 4vw, 64px)' }}>
            <motion.p variants={fadeUp} style={{
              fontSize: 'clamp(15px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.66)',
              lineHeight: 1.8, maxWidth: '440px', margin: 0, fontWeight: 400,
            }}>
              BIVRY delivers premium road freight, warehousing, and last-mile
              distribution across Australia - reliable, trackable, and engineered
              around your supply chain.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
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
          </div>
        </motion.div>

        {/* Bottom data strip — badges separated by dividers */}
        <motion.div
          className="hero8-strip"
          variants={stripIn} initial="hidden" animate={isVisible ? 'visible' : 'hidden'}
          style={{
            display: 'flex', borderTop: '1px solid rgba(255,255,255,0.14)',
            background: 'rgba(4,16,29,0.35)', backdropFilter: 'blur(8px)',
          }}
        >
          {BADGES.map(({ icon: Icon, label, sub }, i) => (
            <div
              key={label}
              className="hero8-strip-cell"
              style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: '16px',
                padding: 'clamp(18px, 2.4vh, 26px) clamp(20px, 2.4vw, 34px)',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.12)',
              }}
            >
              <div className="hero8-strip-ico" style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(60,185,140,0.16)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={20} color="#fff" strokeWidth={2} />
              </div>
              <div>
                <div style={{ fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 700, color: '#fff', lineHeight: 1.25 }}>{label}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '3px' }}>{sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
