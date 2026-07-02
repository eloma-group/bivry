import { useEffect } from 'react'

/**
 * Sets the <meta name="keywords"> content while the component is mounted, then
 * restores it. Creates the tag if the document doesn't already have one.
 */
export function useMetaKeywords(keywords: string[]) {
  const content = keywords.join(', ')
  useEffect(() => {
    if (!content) return
    let tag = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null
    const created = !tag
    const prev = tag?.getAttribute('content') ?? null
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'keywords')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', content)
    return () => {
      if (created) tag?.remove()
      else if (prev !== null) tag?.setAttribute('content', prev)
    }
  }, [content])
}
