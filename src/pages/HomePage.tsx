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

export function HomePage() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <SplashScreen onComplete={() => setReady(true)} />
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
