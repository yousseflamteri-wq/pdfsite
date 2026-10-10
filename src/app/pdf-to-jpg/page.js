import PdfToJpgTool from './PdfToJpgTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Convert PDF to JPG Online Free – Extract PDF Pages as High-Res Images',
  description:
    'Convert every PDF page to high-resolution JPG images online for free. 100% private in-browser conversion with 2× resolution scaling. No upload, no signup required.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/pdf-to-jpg`,
  },
  openGraph: {
    title: 'Convert PDF to JPG Online Free – Extract PDF Pages as High-Res Images',
    description:
      'Turn PDF documents into high-quality JPG pictures directly in your browser. 100% private client-side processing with zero file uploads.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/pdf-to-jpg`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Convert PDF to JPG Online for Free (High-Resolution)',
    intro:
      'Need to extract images from a PDF, turn presentation slides into pictures for social media, or embed document pages into PowerPoint and Word? Our free online PDF to JPG converter transforms each page of your PDF into a crisp, high-resolution JPEG image in seconds. With complete client-side processing, your documents never touch external servers or cloud storage.',

    sections: [
      {
        heading: 'How to Convert PDF to JPG in 3 Simple Steps',
        content:
          'Converting your document pages into clean image files takes only moments without installing desktop software:',
        list: [
          {
            title: 'Step 1: Upload or drop your PDF.',
            text: 'Drag and drop your PDF into the upload area above or select it from your computer or phone.',
          },
          {
            title: 'Step 2: Instant in-browser 2× rendering.',
            text: 'Click "Extract JPG Pages". Our WebAssembly engine renders each page at double resolution to preserve fine print and diagrams.',
          },
          {
            title: 'Step 3: Download your JPG images.',
            text: 'Each converted page is exported as a clean JPG file directly into your device downloads folder without watermarks.',
          },
        ],
      },
      {
        heading: 'Why Convert PDF to JPG with PDF Lab? (Key Advantages)',
        content:
          'While Adobe Acrobat and other cloud services upload your confidential files to remote servers and enforce strict limits, PDF Lab operates locally on your device:',
        list: [
          {
            title: 'Complete Document Privacy:',
            text: 'Your confidential contracts, tax papers, and personal records are processed strictly in browser memory. Nothing travels across the internet.',
          },
          {
            title: 'High-DPI Clarity (2× Canvas Scaling):',
            text: 'Pages are rendered at 2× pixel density with 92% JPEG compression, ensuring razor-sharp typography, clear charts, and readable annotations.',
          },
          {
            title: 'No Sign-In or Subscription Traps:',
            text: 'Adobe requires creating accounts and pushes paid Acrobat trials. PDF Lab provides unlimited, completely free image conversion with zero logins.',
          },
          {
            title: 'Instant Execution Speed:',
            text: 'Without network upload queues or cloud processing bottlenecks, pages are rendered and saved at local hardware speed.',
          },
        ],
      },
      {
        heading: 'Common Use Cases for Converting PDF Pages to JPG',
        content:
          'Transforming static PDF pages into standard picture files unlocks broad usability across modern digital workflows:',
        list: [
          {
            title: 'Social Media & Marketing Content:',
            text: 'Share infographic pages, reports, and visual announcements directly on LinkedIn, Twitter/X, and Instagram.',
          },
          {
            title: 'Embedding in Presentations & Word Processors:',
            text: 'Insert document excerpts, certificates, or diagrams into PowerPoint, Google Slides, or Microsoft Word without layout errors.',
          },
          {
            title: 'Web Design & Portfolio Previews:',
            text: 'Generate sharp thumbnail previews of eBooks, case studies, and research publications for websites and client galleries.',
          },
          {
            title: 'Image-Only Submission Portals:',
            text: 'Quickly fulfill upload requirements on job boards or governmental portals that accept only JPEG image attachments.',
          },
        ],
      },
      {
        heading: 'High-Resolution 2× Scaling: Crisp Text and Clear Graphics',
        content:
          'Standard PDF to image converters often produce blurry, low-DPI photos where fine text and signatures become unreadable. Our converter uses double-resolution HTML5 canvas rendering (2.0× scale factor), capturing every typographic curve and vector line sharply so your extracted JPGs are suitable for both screen viewing and high-resolution printing.'
      },
    ],

    faqs: [
      {
        question: 'How do I convert a multi-page PDF to JPG images?',
        answer:
          'Drag and drop your PDF into the converter above and click "Extract JPG Pages". The tool will automatically render each page in sequence and download individual high-resolution JPG files named with your document title and page numbers.',
      },
      {
        question: 'Will the extracted JPG images maintain high resolution and sharpness?',
        answer:
          'Yes! We render pages using 2× canvas scaling and 92% JPEG quality compression, ensuring that small text, fine lines, signatures, and detailed diagrams remain razor-sharp.',
      },
      {
        question: 'Are my confidential documents uploaded to any server?',
        answer:
          'No. All rendering and conversion occurs strictly inside your web browser using client-side WebAssembly and JavaScript. Your files never leave your computer or phone and are never stored on any cloud database.',
      },
      {
        question: 'What is the maximum file size limit for converting PDF to JPG?',
        answer:
          'Unlike Adobe Acrobat which caps free online uploads at 100MB, PDF Lab processes files directly in local device RAM with no artificial server limits.',
      },
      {
        question: 'Can I convert PDF to JPG on iPhone, Android, or Mac?',
        answer:
          'Yes. PDF Lab is fully responsive and functions reliably in Safari, Chrome, Edge, and Firefox across iOS, Android, macOS, Windows, and Linux without installing third-party apps.',
      },
      {
        question: 'Can I convert password-protected PDFs to JPG?',
        answer:
          'If your PDF is encrypted with an open password, you must unlock it first so that the browser rendering engine can access and draw the page contents.',
      },
      {
        question: 'Is this PDF to JPG converter completely free?',
        answer:
          'Yes, 100% free with no registration, no subscription fees, and no watermark stamps added to your images.',
      },
    ],

    relatedTools: [
      { label: 'JPG to PDF', href: '/jpg-to-pdf' },
      { label: 'Image to PDF', href: '/image-to-pdf' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Split PDF', href: '/split-pdf' },
      { label: 'OCR PDF', href: '/ocr-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <PdfToJpgTool />
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