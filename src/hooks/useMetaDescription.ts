import { useEffect } from 'react'

/** Sets the <meta name="description"> content while the component is mounted, then restores it. */
export function useMetaDescription(description: string) {
  useEffect(() => {
    const tag = document.querySelector('meta[name="description"]')
    if (!tag) return
    const prev = tag.getAttribute('content')
    tag.setAttribute('content', description)
    return () => {
      if (prev !== null) tag.setAttribute('content', prev)
    }
  }, [description])
}
