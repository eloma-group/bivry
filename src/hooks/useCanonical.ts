import { useEffect } from 'react'

const SITE = 'https://bivry.com.au'

/**
 * Sets the <link rel="canonical"> href while the component is mounted, then
 * restores it. Creates the tag if the document doesn't already have one.
 *
 * @param path Absolute-from-root path (e.g. "/contact") or a full URL. When a
 *   path is given it is resolved against the site origin. Trailing slashes are
 *   trimmed (except for the home page "/").
 */
export function useCanonical(path: string) {
  const href = path.startsWith('http')
    ? path
    : `${SITE}${path === '/' ? '' : path.replace(/\/+$/, '')}` || SITE

  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    const created = !link
    const prev = link?.getAttribute('href') ?? null
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', href)
    return () => {
      if (created) link?.remove()
      else if (prev !== null) link?.setAttribute('href', prev)
    }
  }, [href])
}
