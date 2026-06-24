import { useEffect } from 'react'

/** Sets the browser tab title while the component is mounted, then restores it. */
export function usePageTitle(title: string) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    return () => { document.title = prev }
  }, [title])
}
