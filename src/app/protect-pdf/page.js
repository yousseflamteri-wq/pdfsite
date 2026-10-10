import ProtectPdfTool from './ProtectPdfTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Password Protect PDF Online Free – Encrypt PDF with Password',
  description:
    'Protect and encrypt PDF files with a password online for free. Prevent unauthorized viewing, editing, and copying. 100% private in-browser encryption with zero uploads.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/protect-pdf`,
  },
  openGraph: {
    title: 'Password Protect PDF Online Free – Encrypt PDF with Password',
    description:
      'Add secure password protection to any PDF document. 100% client-side zero-knowledge encryption.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/protect-pdf`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Password Protect a PDF File Online for Free',
    intro:
      'Need to secure confidential agreements, tax records, or personal identity documents? Our free online PDF protector lets you encrypt any PDF with a password in seconds. Using client-side security algorithms, your files and passwords never leave your device or touch external cloud servers.',

    sections: [
      {
        heading: 'How to Password-Protect a PDF in 4 Easy Steps',
        content:
          'Locking your PDF document requires no account creation or paid software. Follow these straightforward steps:',
        list: [
          {
            title: 'Step 1: Select your PDF.',
            text: 'Click the upload box or drag and drop your PDF into the secure area above.',
          },
          {
            title: 'Step 2: Enter your secret password.',
            text: 'Type a strong password and toggle visibility to verify that it is entered accurately.',
          },
          {
            title: 'Step 3: Encrypt locally.',
            text: 'Click "Protect PDF with Password". Standard 128-bit encryption headers and permission locks are applied in local memory.',
          },
          {
            title: 'Step 4: Download your protected PDF.',
            text: 'Save the encrypted file immediately. Any reader opening the document will require the exact password.',
          },
        ],
      },
      {
        heading: 'Password Protection vs. Encryption: What is the Difference?',
        content:
          'While many online tools merely flag a document with a visual lock, true security requires mathematical encryption:',
        list: [
          {
            title: 'Standard Password Lock:',
            text: 'Some basic tools only ask for a password prompt without altering the underlying data stream, making it easy for utilities to bypass.',
          },
          {
            title: 'True Cryptographic PDF Encryption:',
            text: 'PDF Lab applies standard 128-bit RC4 encryption directly to the PDF binary stream. The actual pages, embedded images, and text strings are scrambled with your password key.',
          },
          {
            title: 'Automatic Permission Restrictions:',
            text: 'In addition to viewing locks, our tool disables unauthorized editing, page modifications, and content copying.',
          },
        ],
      },
      {
        heading: 'Why Use PDF Lab? (Zero-Knowledge Privacy Guarantee)',
        content:
          'Most online PDF services (including Adobe Acrobat and other major portals) upload your file and password to remote cloud servers to encrypt them. That exposes your sensitive data to network interception and server logging.',
        list: [
          {
            title: '100% Client-Side Processing:',
            text: 'Your document never leaves your browser. All encryption routines run locally via WebAssembly on your device hardware.',
          },
          {
            title: 'Zero Password Storage:',
            text: 'We never store, log, or transmit your password. Our servers have zero knowledge of your encryption keys.',
          },
          {
            title: 'Universal Reader Compatibility:',
            text: 'Encrypted files open seamlessly on Adobe Acrobat Reader, Apple Preview, Google Chrome, Microsoft Edge, and mobile viewers.',
          },
          {
            title: 'Completely Free & Unlimited:',
            text: 'No paywalls, subscriptions, or file quantity restrictions. Protect as many documents as you need at zero cost.',
          },
        ],
      },
      {
        heading: 'Best Practices for Creating a Strong PDF Password',
        content:
          'To ensure maximum security against brute-force guessing attacks, follow these password guidelines:',
        list: [
          {
            title: 'Use at Least 10–12 Characters:',
            text: 'Longer passphrases provide exponentially greater cryptographic protection against dictionary tools.',
          },
          {
            title: 'Mix Characters Types:',
            text: 'Combine uppercase letters, lowercase letters, numbers, and symbols (such as #, $, %, !).',
          },
          {
            title: 'Avoid Common Words and Names:',
            text: 'Never use predictable personal details like your birthday, company name, or simple dictionary words.',
          },
        ],
      },
    ],

    faqs: [
      {
        question: 'How do I choose a strong password for my PDF?',
        answer:
          'To create a resilient password, aim for at least 10 to 12 characters combining uppercase and lowercase letters, numbers, and special symbols. Avoid predictable sequences, common dictionary words, or personal information like birthdays.',
      },
      {
        question: 'How do recipients open a password-protected PDF?',
        answer:
          'When any user opens the protected file in Adobe Acrobat Reader, Apple Preview, or a web browser, a prompt will automatically appear requesting the document password. Once entered, the content decrypts and displays normally.',
      },
      {
        question: 'What is the difference between password protection and encryption?',
        answer:
          'Simple protection might only restrict basic actions, whereas encryption mathematically scrambles the file binary data using security algorithms. PDF Lab applies true standard 128-bit encryption so the file cannot be viewed without the key.',
      },
      {
        question: 'Does PDF Lab store my password or keep a copy of my file?',
        answer:
          'Never. All encryption executes locally inside your web browser using client-side JavaScript and WebAssembly. Your files and passwords never leave your computer or phone and are never sent to any server.',
      },
      {
        question: 'What happens if I forget the password I set?',
        answer:
          'Because our tool is completely zero-knowledge and runs client-side, there is no master recovery key or backdoor. If you forget your password, the file cannot be recovered, so always keep an unencrypted backup in a safe place.',
      },
      {
        question: 'Can I password-protect PDFs on my phone (iOS or Android)?',
        answer:
          'Yes. Our encryption tool is fully compatible with mobile browsers such as Safari and Chrome, allowing you to encrypt documents directly on your phone without installing extra apps.',
      },
      {
        question: 'Is this PDF protection tool free?',
        answer:
          'Yes, 100% free with no registration, no subscriptions, and no watermarks added to your documents.',
      },
    ],

    relatedTools: [
      { label: 'Sign PDF', href: '/sign-pdf' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Split PDF', href: '/split-pdf' },
      { label: 'Watermark PDF', href: '/watermark-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <ProtectPdfTool />
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