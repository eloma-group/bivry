import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ContactPage } from './pages/ContactPage'
import { AboutPage } from './pages/AboutPage'
import { ValuesPage } from './pages/ValuesPage'
import { NetworksPage } from './pages/NetworksPage'
import { FAQPage } from './pages/FAQPage'
import { CaseStudiesPage } from './pages/CaseStudiesPage'
import { BlogsPage } from './pages/BlogsPage'
import { LinehaulArticlePage } from './pages/LinehaulArticlePage'
import { SameDayFreightArticlePage } from './pages/SameDayFreightArticlePage'
import { NewsPage } from './pages/NewsPage'
import { CareersPage } from './pages/CareersPage'
import { IndustryPage } from './pages/IndustryPage'
import { TermsOfUsePage } from './pages/TermsOfUsePage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/values" element={<ValuesPage />} />
        <Route path="/networks" element={<NetworksPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/blog/linehaul-transport-australia" element={<LinehaulArticlePage />} />
        <Route path="/blog/same-day-delivery-vs-standard-freight" element={<SameDayFreightArticlePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/industries/:slug" element={<IndustryPage />} />
        <Route path="/terms-of-use" element={<TermsOfUsePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
