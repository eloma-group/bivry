import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Radio, Clock } from 'lucide-react'
import { NAVY, GREEN, CREAM, ease } from './InnerHero'
import { externalNews, type ExternalNewsItem } from '../data/externalNews'

/* 7NEWS business feed — bundled snapshot renders instantly, then we try a
   live in-browser refresh via rss2json (CORS-friendly). If the live call
   fails (offline / rate-limited), the bundled snapshot stays on screen. */
const LIVE_FEED = 'https://7news.com.au/business/feed'
const LIVE_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(LIVE_FEED)}`

const stripHtml = (s = '') => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

function relativeTime(pubDate: string): string {
  const t = new Date(pubDate.replace(' ', 'T') + 'Z').getTime()
  if (Number.isNaN(t)) return ''
  const diff = Date.now() - t
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.round(hrs / 24)
  return `${days}d ago`
}

export function SevenNewsFeed() {
  const [items, setItems] = useState<ExternalNewsItem[]>(externalNews.items)
  const [updatedAt, setUpdatedAt] = useState<string>(externalNews.fetchedAt)
  const [live, setLive] = useState(false)

  useEffect(() => {
    let alive = true
    fetch(LIVE_URL)
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(data => {
        if (!alive || data.status !== 'ok' || !Array.isArray(data.items)) return
        const fresh: ExternalNewsItem[] = data.items.slice(0, 9).map((it: any) => ({
          title: stripHtml(it.title),
          link: it.link,
          pubDate: it.pubDate || '',
          excerpt: stripHtml(it.description).slice(0, 160),
          image: it.thumbnail || it.enclosure?.link || '',
        }))
        if (fresh.length) {
          setItems(fresh)
          setUpdatedAt(new Date().toISOString())
          setLive(true)
        }
      })
      .catch(() => { /* keep bundled snapshot */ })
    return () => { alive = false }
  }, [])

  const [feature, ...rest] = items
  if (!feature) return null

  return (
    <section style={{ background: CREAM, padding: 'clamp(64px,9vw,120px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -120, right: -120, width: 520, height: 520, borderRadius: '50%', background: `radial-gradient(circle, ${GREEN}12 0%, transparent 60%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1760, margin: '0 auto', position: 'relative', zIndex: 1 }} className="sevennews-inner">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 'clamp(32px,4vw,52px)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: live ? GREEN : 'rgba(8,33,60,0.08)', color: live ? '#fff' : NAVY, borderRadius: 100, padding: '5px 12px', fontSize: 11, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                <Radio size={12} strokeWidth={2.5} />
                {live ? 'Live' : 'Daily'} · via 7NEWS
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: 'rgba(8,33,60,0.4)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}80` }} />
                Updated {relativeTime(updatedAt) || 'today'}
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(52px,6vw,92px)', fontWeight: 900, color: NAVY, letterSpacing: '-0.04em', lineHeight: 0.92, margin: 0, textTransform: 'uppercase' }}>
              <span style={{ color: GREEN }}>HEADLINES.</span>
            </h2>
          </div>
          <p style={{ fontSize: 'clamp(14px,1.15vw,17px)', color: 'rgba(8,33,60,0.5)', lineHeight: 1.8, margin: 0, maxWidth: 380 }}>
            The latest Australian business &amp; logistics stories, pulled fresh each day from 7NEWS to keep our clients in the loop.
          </p>
        </div>

        {/* Featured + grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 'clamp(16px,2vw,24px)' }} className="sevennews-grid">
          {/* Featured card */}
          <motion.a
            href={feature.link} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease }}
            style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', minHeight: 420, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textDecoration: 'none', background: NAVY, color: '#fff' }}
            className="sevennews-feature"
          >
            {feature.image
              ? <img src={feature.image} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              : <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${NAVY}, #061828)` }} />}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,24,40,0.95) 0%, rgba(6,24,40,0.55) 45%, rgba(6,24,40,0.1) 100%)' }} />
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(28px,3vw,44px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ background: GREEN, color: '#fff', borderRadius: 100, padding: '5px 13px', fontSize: 10, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Top Story</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>
                  <Clock size={12} /> {relativeTime(feature.pubDate)}
                </span>
              </div>
              <h3 style={{ fontSize: 'clamp(26px,2.8vw,42px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.06, margin: '0 0 14px', textTransform: 'uppercase' }}>{feature.title}</h3>
              {feature.excerpt && <p style={{ fontSize: 'clamp(14px,1.05vw,16px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, margin: '0 0 20px', maxWidth: 560 }}>{feature.excerpt}</p>}
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: GREEN }}>
                Read on 7NEWS <ArrowUpRight size={16} strokeWidth={2.5} />
              </span>
            </div>
          </motion.a>

          {/* Side grid of headlines */}
          <div style={{ display: 'grid', gridTemplateRows: 'repeat(4, 1fr)', gap: 'clamp(12px,1.5vw,16px)' }} className="sevennews-side">
            {rest.slice(0, 4).map((it, i) => (
              <motion.a
                key={it.link} href={it.link} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06, ease }}
                style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#fff', border: '1px solid rgba(8,33,60,0.07)', borderRadius: 14, padding: 14, textDecoration: 'none', transition: 'all 0.2s ease' }}
                className="sevennews-side-card"
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = GREEN; el.style.transform = 'translateX(-4px)'; el.style.boxShadow = '0 12px 30px rgba(8,33,60,0.08)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(8,33,60,0.07)'; el.style.transform = 'translateX(0)'; el.style.boxShadow = 'none' }}
              >
                <div style={{ flexShrink: 0, width: 84, height: 84, borderRadius: 10, overflow: 'hidden', background: `linear-gradient(135deg, ${NAVY}, #0d2b48)`, position: 'relative' }}>
                  {it.image
                    ? <img src={it.image} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 22, fontWeight: 900 }}>7</span>}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: GREEN }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(8,33,60,0.4)' }}>{relativeTime(it.pubDate)}</span>
                  </div>
                  <h4 style={{ fontSize: 'clamp(14px,1.05vw,16px)', fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', lineHeight: 1.28, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{it.title}</h4>
                </div>
                <ArrowUpRight size={16} strokeWidth={2.2} color="rgba(8,33,60,0.3)" style={{ flexShrink: 0 }} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Footer row: source attribution + view all */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginTop: 'clamp(24px,3vw,36px)', paddingTop: 24, borderTop: '1px solid rgba(8,33,60,0.08)' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(8,33,60,0.4)' }}>
            Headlines aggregated from 7NEWS · refreshed daily · Bivry is not affiliated with the Seven Network.
          </span>
          <a href="https://7news.com.au/business" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, color: NAVY, textDecoration: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = NAVY }}
          >
            View all on 7NEWS <ArrowUpRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .sevennews-grid { grid-template-columns: 1fr !important; }
          .sevennews-feature { min-height: 320px !important; }
          .sevennews-side { grid-template-rows: none !important; }
        }
        @media (min-width: 1920px) {
          .sevennews-inner { max-width: 1900px !important; }
        }
        @media (min-width: 2560px) {
          .sevennews-inner { max-width: 2400px !important; }
        }
      `}</style>
    </section>
  )
}
