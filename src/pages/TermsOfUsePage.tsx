import { LegalPage, type LegalSection } from '../components/LegalPage'
import { usePageTitle } from '../hooks/usePageTitle'

const SECTIONS: LegalSection[] = [
  {
    id: 'introduction',
    heading: 'Introduction',
    paragraphs: [
      'The Bivry website has been developed to provide information about our logistics, transportation, freight, warehousing, import-export, and related business services. These Terms of Use establish the rules and conditions under which users may access and interact with our website and services.',
      'We reserve the right to modify, update, or discontinue any part of the website or services at any time without prior notice.',
    ],
  },
  {
    id: 'acceptance-of-terms',
    heading: 'Acceptance of Terms',
    paragraphs: [
      'By accessing, browsing, or using this website, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use, as well as any applicable laws and regulations.',
      'Your continued use of the website after any updates or modifications constitutes acceptance of those changes.',
    ],
  },
  {
    id: 'use-of-the-website',
    heading: 'Use of the Website',
    paragraphs: [
      'The website is intended to provide information about Bivry’s services and facilitate communication with customers, partners, and businesses.',
      'You agree to use the website only for lawful purposes and in a manner that does not interfere with the operation, security, or accessibility of the website for other users.',
      'You must not attempt to gain unauthorized access to any part of the website, servers, databases, or systems connected to the website.',
    ],
  },
  {
    id: 'information-and-content',
    heading: 'Information and Content',
    paragraphs: [
      'While EG Transport Pty Ltd strives to ensure that all information presented on the website is accurate and up to date, we do not guarantee the completeness, accuracy, or reliability of all content at all times.',
      'Information on the website is provided for general informational purposes only and should not be considered professional, legal, financial, or business advice.',
      'Users are encouraged to contact our team directly for service-specific information and confirmations.',
    ],
  },
  {
    id: 'intellectual-property-rights',
    heading: 'Intellectual Property Rights',
    paragraphs: [
      'All content available on this website, including text, graphics, logos, icons, images, videos, designs, branding elements, and other materials, is the property of EG Transport Pty Ltd or its licensors unless otherwise stated.',
      'No content from this website may be copied, reproduced, modified, distributed, published, or used for commercial purposes without prior written permission from EG Transport Pty Ltd.',
      'Unauthorized use of website content may result in legal action.',
    ],
  },
  {
    id: 'user-responsibilities',
    heading: 'User Responsibilities',
    bulletsLead: 'By using this website, you agree that you will not:',
    bullets: [
      'Use the website for unlawful or fraudulent activities.',
      'Upload or transmit harmful software, viruses, or malicious code.',
      'Attempt to disrupt website functionality or security.',
      'Misrepresent your identity or provide false information.',
      'Use the website in a manner that may damage the reputation or operations of EG Transport Pty Ltd.',
    ],
    paragraphs: [
      'Users are responsible for ensuring that any information submitted through the website is accurate and current.',
    ],
  },
  {
    id: 'third-party-links',
    heading: 'Third-Party Links',
    paragraphs: [
      'The website may contain links to external websites operated by third parties. These links are provided solely for user convenience and informational purposes.',
      'EG Transport Pty Ltd does not control, endorse, or assume responsibility for the content, policies, products, or services offered by third-party websites. Accessing such websites is done at your own risk.',
    ],
  },
  {
    id: 'service-availability',
    heading: 'Service Availability',
    paragraphs: [
      'We make reasonable efforts to ensure that our website remains available and operational. However, we do not guarantee uninterrupted access at all times.',
      'The website may be temporarily unavailable due to maintenance, upgrades, technical issues, or circumstances beyond our control.',
      'EG Transport Pty Ltd shall not be liable for any loss resulting from website interruptions or downtime.',
    ],
  },
  {
    id: 'limitation-of-liability',
    heading: 'Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, EG Transport Pty Ltd shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of, or inability to use, this website.',
      'This includes, but is not limited to, damages related to loss of business, loss of profits, data loss, service interruptions, or reliance on website content.',
      'Users access and use the website at their own discretion and risk.',
    ],
  },
  {
    id: 'indemnification',
    heading: 'Indemnification',
    paragraphs: [
      'You agree to indemnify and hold harmless EG Transport Pty Ltd, its directors, employees, affiliates, partners, and representatives from any claims, liabilities, damages, costs, or expenses arising from your misuse of the website, violation of these Terms of Use, or infringement of any third-party rights.',
    ],
  },
  {
    id: 'privacy',
    heading: 'Privacy',
    paragraphs: [
      'Your use of this website is also governed by our Privacy Policy. By using the website, you acknowledge and agree to the collection and use of information as described in the Privacy Policy.',
      'We encourage users to review the Privacy Policy to understand how information is handled and protected.',
    ],
  },
  {
    id: 'termination-of-access',
    heading: 'Termination of Access',
    paragraphs: [
      'EG Transport Pty Ltd reserves the right to restrict, suspend, or terminate access to the website at any time, without notice, if we believe a user has violated these Terms of Use or engaged in activities that may harm the website, business operations, or other users.',
      'These Terms of Use shall be governed and interpreted in accordance with the laws applicable to the jurisdiction in which EG Transport Pty Ltd operates.',
      'Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the relevant courts.',
    ],
  },
  {
    id: 'changes-to-these-terms',
    heading: 'Changes to These Terms',
    paragraphs: [
      'We may revise these Terms of Use from time to time to reflect changes in our services, business operations, legal requirements, or industry standards.',
      'Updated versions will be posted on this page with the revised effective date. Continued use of the website after such changes constitutes acceptance of the updated terms.',
    ],
  },
]

export function TermsOfUsePage() {
  usePageTitle("Terms of Use — BIVRY")
  return (
    <LegalPage
      badge="Legal"
      titleLine1="TERMS OF"
      titleLine2="USE."
      lastUpdated="July 2026"
      intro="Welcome to Bivry, a brand operated by EG Transport Pty Ltd. These Terms of Use govern your access to and use of our website, services, content, and digital platforms. By accessing or using our website, you agree to comply with these Terms of Use. If you do not agree with any part of these terms, please discontinue use of the website and services."
      sections={SECTIONS}
    />
  )
}
