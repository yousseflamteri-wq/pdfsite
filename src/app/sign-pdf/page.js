import SignPdfTool from './SignPdfTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Sign PDF Online Free – Add Electronic Signature to PDF',
  description:
    'Draw and add an electronic signature to any PDF document online for free. No upload, no signup, 100% private. Endorse contracts, lease agreements, and forms in your browser.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/sign-pdf`,
  },
  openGraph: {
    title: 'Sign PDF Online Free – Add Electronic Signature to PDF',
    description:
      'Easily sign contracts and agreements directly in your browser. 100% private client-side e-signature with zero file uploads.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/sign-pdf`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Sign a PDF Online for Free (Add e-Signature)',
    intro:
      'Need to sign a freelance agreement, rental lease, or official application without printing, signing by hand, and scanning? Our free online PDF signer allows you to draw your signature and embed it into your document in seconds. With complete client-side processing, your contracts and personal signatures remain strictly private on your device.',

    sections: [
      {
        heading: 'How to Electronically Sign a PDF in 4 Easy Steps',
        content:
          'Endorsing your digital paperwork takes only moments without needing to install desktop software or create an account:',
        list: [
          {
            title: 'Step 1: Upload your PDF.',
            text: 'Drag and drop your PDF agreement or form into the secure drop zone above or browse your device files.',
          },
          {
            title: 'Step 2: Draw your signature.',
            text: 'Use your mouse, trackpad, finger, or stylus on touchscreens to draw a smooth signature on the canvas pad.',
          },
          {
            title: 'Step 3: Embed in browser memory.',
            text: 'Click "Download Signed PDF". Our in-browser engine renders the signature as a transparent overlay and binds it to the final page.',
          },
          {
            title: 'Step 4: Download your endorsed document.',
            text: 'Your signed PDF document is saved to your computer or phone immediately without watermarks.',
          },
        ],
      },
      {
        heading: 'Why Sign PDFs with PDF Lab? (Key Advantages)',
        content:
          'Unlike Adobe Acrobat and cloud e-sign platforms that upload your sensitive contracts to remote servers and demand account logins, PDF Lab offers an instant, zero-upload workflow:',
        list: [
          {
            title: 'Complete Document Privacy:',
            text: 'Your agreements, tax forms, and handwritten signature never leave your web browser. Nothing is uploaded to cloud servers or databases.',
          },
          {
            title: 'Touch & Stylus Optimized:',
            text: 'Sign effortlessly on iPhones, iPads, Android tablets, and touch-enabled laptops with high-accuracy vector strokes.',
          },
          {
            title: 'No Sign-In or Subscription Limits:',
            text: 'Adobe requires creating an account and paying for Acrobat Sign. PDF Lab gives you unlimited free signatures with zero fees.',
          },
          {
            title: 'Lossless Visual Quality:',
            text: 'Your signature is integrated smoothly without degrading existing document fonts, vector diagrams, or image sharpness.',
          },
        ],
      },
      {
        heading: 'Electronic Signature vs. Digital Signature: What is the Difference?',
        content:
          'Understanding document endorsement standards ensures you choose the right approach for your needs:',
        list: [
          {
            title: 'Electronic Signature (e-Signature):',
            text: 'An electronic symbol, drawn mark, or sound logically associated with a document, widely accepted under the ESIGN Act and eIDAS for standard commercial contracts, NDAs, invoices, and employment agreements.',
          },
          {
            title: 'Cryptographic Digital Signature:',
            text: 'A specialized type of e-signature backed by a cryptographic certificate issued by a Certificate Authority (CA) used for high-stakes government or regulatory compliance filings.',
          },
        ],
      },
      {
        heading: 'Common Documents You Can Sign Online',
        content:
          'Our lightweight signer is ideal for speeding up routine business, legal, and personal transactions:',
        list: [
          {
            title: 'Freelance & Service Contracts:',
            text: 'Endorse statements of work, consulting agreements, and project milestones quickly.',
          },
          {
            title: 'Non-Disclosure Agreements (NDAs):',
            text: 'Sign bilateral confidentiality terms prior to meetings without physical paper exchanges.',
          },
          {
            title: 'Employment & Onboarding Forms:',
            text: 'Sign offer letters, direct deposit confirmations, and employee handbooks remotely.',
          },
          {
            title: 'Real Estate & Rental Leases:',
            text: 'Endorse residential leases, rental inspection checklists, and deposit acknowledgments.',
          },
        ],
      },
    ],

    faqs: [
      {
        question: 'How do I sign a PDF online with PDF Lab?',
        answer:
          'Simply drag and drop your PDF into the tool above, draw your signature on the interactive pad using your mouse, trackpad, or finger, and click "Download Signed PDF". The signature is fused into the document locally within seconds.',
      },
      {
        question: 'What is the difference between an electronic signature and a digital signature?',
        answer:
          'An electronic signature is any electronic mark (such as your drawn signature) used to show agreement to a document, which is legally valid for most contracts and business forms. A digital signature is a certificate-backed cryptographic system with public key infrastructure (PKI) used primarily for strict regulatory filings.',
      },
      {
        question: 'Where will my signature appear on the PDF?',
        answer:
          'Your drawn signature is placed cleanly at the bottom right corner of the document\'s final page, which is the standard location for formal signatures and endorsements.',
      },
      {
        question: 'Can I sign a PDF on mobile (iPhone or Android)?',
        answer:
          'Yes! The signature pad is touch-enabled, allowing you to draw smooth, natural signatures with your finger or stylus directly in Safari, Chrome, or any mobile browser.',
      },
      {
        question: 'Are my signature and confidential documents safe?',
        answer:
          'Yes, 100%. Unlike Adobe Acrobat which uploads files to cloud servers, all processing in PDF Lab runs locally in your device RAM using client-side JavaScript. Your signature and document are never seen or stored by our servers.',
      },
      {
        question: 'Is this PDF signature tool free?',
        answer:
          'Yes, completely free with no usage limits, no watermark stamps, and no account registration required.',
      },
      {
        question: 'Does adding a signature alter the original document text or layout?',
        answer:
          'No. The signature is embedded as a transparent high-resolution layer. Original vector typography, images, and page layouts remain untouched and lossless.',
      },
    ],

    relatedTools: [
      { label: 'Protect PDF', href: '/protect-pdf' },
      { label: 'Watermark PDF', href: '/watermark-pdf' },
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'Split PDF', href: '/split-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <SignPdfTool />
        </div>

        {/* 2. مقال السيو والأسئلة الشائعة + الروابط الداخلية */}
        <ArticleSeo
          title={articleData.title}
          intro={articleData.intro}
          sections={articleData.sections}
          faqs={articleData.faqs}
          relatedTools={articleData.relatedTools}
        />
      </div>
    </main>
  );
}