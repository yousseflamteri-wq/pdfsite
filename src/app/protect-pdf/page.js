import ProtectPdfTool from './ProtectPdfTool';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Protect PDF with Password Free – Encrypt PDF Online',
  description:
    'Encrypt and password-protect PDF files in seconds. No upload, no signup — free in-browser PDF encryption with permission restrictions. 100% private.',
  alternates: {
    canonical: `${siteUrl}/protect-pdf`,
  },
  openGraph: {
    title: 'Protect PDF with Password Free – 100% Private Encryption',
    description: 'Add password protection and restrict permissions locally in your browser. No upload required.',
    url: `${siteUrl}/protect-pdf`,
  },
  twitter: {
    card: 'summary',
    title: 'Protect PDF Free – Password Encrypt Without Upload',
    description: 'Add strong password protection to any PDF in your browser. Free & private.',
  },
};

const faqs = [
  {
    q: 'How does client-side PDF encryption work?',
    a: 'Our tool applies standard RC4 128-bit encryption directly inside your web browser using WebAssembly. The password hashes and security handlers are embedded locally into the PDF binary stream before downloading, ensuring your files are never transmitted across the network.',
  },
  {
    q: 'Can anyone open my protected PDF without the password?',
    a: 'No. The document is protected with standard PDF user encryption. Standard PDF viewers (such as Adobe Acrobat Reader, Apple Preview, and modern web browsers) will require entering the correct password before granting access to view the pages.',
  },
  {
    q: 'Does PDF Lab keep or store my password?',
    a: 'Never. Because the entire encryption operation executes locally in your device memory (RAM), your password and document are completely invisible to our servers and any third party.',
  },
  {
    q: 'Can I set restrictions like preventing editing or copying?',
    a: 'Yes. In addition to locking document access with your user password, the encrypted document restricts unauthorized editing, copying of text, and modifying pages.',
  },
  {
    q: 'What happens if I forget the password I set?',
    a: 'Because our system is strictly zero-knowledge and operates purely client-side, we do not store recovery keys or passwords. If you lose the password, there is no way to retrieve it, so be sure to keep a copy of your original file.',
  },
  {
    q: 'Can I protect PDFs on mobile devices?',
    a: 'Yes. You can encrypt documents directly on iPhone, iPad, and Android smartphones using Safari, Chrome, or any modern mobile browser without downloading any apps.',
  },
];

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Protect PDF with Password',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${siteUrl}/protect-pdf`,
    featureList: [
      'RC4 128-bit PDF encryption',
      'User password protection',
      'Copy and edit permission restrictions',
      'Zero-knowledge — password never leaves your device',
      'Client-side only — no file upload',
    ],
    description: 'Free client-side tool to encrypt and password protect sensitive PDF documents.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProtectPdfTool faqs={faqs} />
    </>
  );
}