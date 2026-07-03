import { LegalPage, type LegalSection } from '../components/LegalPage'
import { usePageTitle } from '../hooks/usePageTitle'
import { useMetaDescription } from '../hooks/useMetaDescription'
import { useCanonical } from '../hooks/useCanonical'
import { PAGE_SEO } from '../data/seo'

const SECTIONS: LegalSection[] = [
  {
    id: 'introduction',
    heading: 'Introduction',
    paragraphs: [
      'EG Transport Pty Ltd operates under the brand name Bivry, providing transportation, logistics, warehousing, freight, and related business solutions across multiple regions. As part of delivering these services, we may collect information necessary to support operations, improve customer experience, and comply with legal obligations.',
      'We are committed to ensuring that your information is managed with care and used only for legitimate business purposes.',
    ],
  },
  {
    id: 'information-we-collect',
    heading: 'Information We Collect',
    paragraphs: [
      'When you interact with Bivry, we may collect information directly from you or through your use of our website and services.',
      'The information we collect may include your name, company name, email address, telephone number, billing details, shipping information, delivery addresses, business information, and any other details you voluntarily provide when contacting us or requesting services.',
      'In addition, certain technical information may be collected automatically when you visit our website. This may include your IP address, browser type, device information, operating system, pages visited, and website usage patterns. Such information helps us understand how visitors use our website and allows us to improve performance and user experience.',
    ],
  },
  {
    id: 'how-we-use-your-information',
    heading: 'How We Use Your Information',
    paragraphs: [
      'The information we collect is used to provide and improve our services, manage customer relationships, process shipments, coordinate deliveries, and respond to inquiries.',
      'We may also use your information to communicate service updates, provide customer support, improve website functionality, enhance operational efficiency, prevent fraudulent activities, maintain security, and comply with applicable laws and regulations.',
      'Our goal is to use information in ways that support a better, safer, and more efficient experience for our customers and business partners.',
    ],
  },
  {
    id: 'sharing-of-information',
    heading: 'Sharing of Information',
    paragraphs: [
      'EG Transport Pty Ltd does not sell, rent, or trade personal information to third parties.',
      'However, in the course of operating our business, we may share information with trusted service providers, logistics partners, warehousing partners, payment processors, technology providers, and professional advisors when such sharing is necessary to deliver our services.',
      'Information may also be disclosed when required by law, court order, government authority, or regulatory obligation.',
      'All third parties engaged by us are expected to maintain appropriate confidentiality and security measures when handling information on our behalf.',
    ],
  },
  {
    id: 'data-security',
    heading: 'Data Security',
    paragraphs: [
      'Protecting information is important to us. We maintain reasonable administrative, technical, and organizational safeguards designed to protect personal and business information against unauthorized access, misuse, loss, alteration, or disclosure.',
      'While we strive to implement industry-standard security measures, no system can guarantee complete security. Therefore, users should also take reasonable precautions when sharing information online.',
    ],
  },
  {
    id: 'cookies-and-website-analytics',
    heading: 'Cookies and Website Analytics',
    paragraphs: [
      'Our website may use cookies and similar technologies to improve functionality, analyze website traffic, remember user preferences, and enhance the overall browsing experience.',
      'Cookies help us understand how visitors interact with our website so that we can continuously improve our services and digital experience.',
      'Users may choose to disable cookies through their browser settings. However, certain features of the website may not function properly if cookies are disabled.',
    ],
  },
  {
    id: 'data-retention',
    heading: 'Data Retention',
    paragraphs: [
      'We retain information only for as long as it is necessary to fulfill the purposes for which it was collected, including providing services, maintaining business records, complying with legal obligations, resolving disputes, and enforcing agreements.',
      'When information is no longer required, we take reasonable steps to securely delete, anonymize, or archive it in accordance with applicable regulations and business requirements.',
    ],
  },
  {
    id: 'international-operations',
    heading: 'International Operations',
    paragraphs: [
      'As a logistics and transportation company operating across different regions, information may be processed, stored, or transferred between countries where we or our service partners conduct business.',
      'Whenever such transfers occur, we take reasonable measures to ensure that information remains protected and handled in accordance with applicable privacy standards.',
    ],
  },
  {
    id: 'third-party-websites',
    heading: 'Third-Party Websites',
    paragraphs: [
      'Our website may contain links to third-party websites, applications, or services. These external platforms operate independently and have their own privacy policies.',
      'EG Transport Pty Ltd is not responsible for the privacy practices, content, or security of third-party websites. We encourage users to review the privacy policies of any external sites they visit.',
    ],
  },
  {
    id: 'your-rights',
    heading: 'Your Rights',
    paragraphs: [
      'Depending on applicable laws and regulations, you may have the right to request access to the personal information we hold about you, request corrections to inaccurate information, request deletion of information where legally permitted, or object to certain processing activities.',
      'We will make reasonable efforts to respond to such requests in accordance with applicable legal requirements.',
    ],
  },
  {
    id: 'childrens-privacy',
    heading: 'Children’s Privacy',
    paragraphs: [
      'Our services are intended for businesses, organizations, and individuals who are legally permitted to enter into commercial agreements. We do not knowingly collect personal information from children.',
      'If we become aware that information has been collected from a child without appropriate authorization, we will take steps to remove such information where required.',
    ],
  },
  {
    id: 'changes-to-this-privacy-policy',
    heading: 'Changes to This Privacy Policy',
    paragraphs: [
      'EG Transport Pty Ltd may update this Privacy Policy from time to time to reflect changes in business operations, legal requirements, industry practices, or service offerings.',
      'Any updates will be posted on this page, and the revised version will become effective upon publication. We encourage users to review this page periodically to stay informed about how information is handled.',
    ],
  },
]

export function PrivacyPolicyPage() {
  usePageTitle(PAGE_SEO['/privacy-policy'].title)
  useMetaDescription(PAGE_SEO['/privacy-policy'].description)
  useCanonical('/privacy-policy')
  return (
    <LegalPage
      badge="Legal"
      titleLine1="PRIVACY"
      titleLine2="POLICY."
      lastUpdated="July 2026"
      intro="At EG Transport Pty Ltd (“Bivry”), protecting your privacy is one of our priorities. We understand the importance of personal and business information shared with us and are committed to handling it responsibly, securely, and transparently. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website, use our logistics and transportation services, communicate with our team, or interact with our business in any way. By accessing our website or using our services, you agree to the practices outlined in this Privacy Policy."
      sections={SECTIONS}
    />
  )
}
