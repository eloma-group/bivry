import { useState } from 'react'
import { SplashScreen } from '../components/SplashScreen'
import { Header } from '../components/Header/Header'
import { Hero8 } from '../components/Hero8'
import { Introduction } from '../components/Introduction'
// import { Services } from '../components/Services'
import { Services2 } from '../components/Services2'
import { Industries } from '../components/Industries'
import { GlobalNetwork2 } from '../components/GlobalNetwork2'
import { Testimonials } from '../components/Testimonials'
import { Credentials3 } from '../components/Credentials3'
import { FooterCTA } from '../components/FooterCTA'
import { Footer } from '../components/Footer'
import { usePageTitle } from '../hooks/usePageTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { useCanonical } from '../hooks/useCanonical'
import { PAGE_SEO } from '../data/seo'

// Module-level flag: persists across SPA route changes but resets on a full page reload,
// so the splash plays once per fresh load and is skipped on internal navigation.
let splashShown = false

export function HomePage() {
  usePageTitle(PAGE_SEO['/'].title)
  useMetaDescription(PAGE_SEO['/'].description)
  useCanonical('/')
  const [ready, setReady] = useState(splashShown)

  return (
    <>
      {!splashShown && (
        <SplashScreen onComplete={() => { splashShown = true; setReady(true) }} />
      )}
      {ready && (
        <>
          <Header />
          <main>
            <Hero8 videos={['/hero-merged.mp4']} />
            {/* <Services /> */}
            <Services2 />
            <Industries />
            <Credentials3 />
            <Introduction />
            <GlobalNetwork2 />
            <Testimonials />
          </main>
          <FooterCTA />
          <Footer />
        </>
      )}
    </>
  )
}
