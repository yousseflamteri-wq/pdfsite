import SplitPdfTool from './SplitPdfTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Split PDF Files Online Free – Separate PDF Pages Privately',
  description:
    'Extract specific pages or page ranges from any PDF into a separate file for free. 100% private, no upload, no signup. Separate PDF pages right in your browser.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/split-pdf`,
  },
  openGraph: {
    title: 'Split PDF Files Online Free – Separate PDF Pages Privately',
    description:
      'Separate pages or custom ranges into a clean PDF directly in your browser. 100% private client-side processing.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/split-pdf`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Split a PDF Online for Free (Extract PDF Pages)',
    intro:
      'Need to extract a specific chapter from an eBook, isolate signature pages from a contract, or separate a multi-page statement into independent files? Our free online PDF splitter allows you to extract individual pages or custom page ranges in seconds. Because processing runs entirely in your browser, your documents remain 100% confidential without uploading to external servers.',

    sections: [
      {
        heading: 'How to Split PDF Pages in 4 Simple Steps',
        content:
          'Separating pages from your document is fast and requires no software installation or account creation:',
        list: [
          {
            title: 'Step 1: Upload or drop your PDF.',
            text: 'Drag and drop your PDF document into the tool area above or select it from your device storage.',
          },
          {
            title: 'Step 2: Enter your target page range.',
            text: 'Type the range of pages you want to extract (e.g. "1-3" or a single page like "5-5").',
          },
          {
            title: 'Step 3: Extract in browser memory.',
            text: 'Click "Split PDF". Our local WebAssembly engine copies the exact page indices into a brand-new PDF.',
          },
          {
            title: 'Step 4: Download your split PDF.',
            text: 'Your extracted PDF is saved immediately to your phone or computer without watermarks.',
          },
        ],
      },
      {
        heading: 'Why Split PDFs with PDF Lab? (Key Advantages)',
        content:
          'Unlike Adobe Acrobat and cloud converters that force you to upload documents and log into accounts, PDF Lab operates with zero friction:',
        list: [
          {
            title: 'Complete Document Privacy:',
            text: 'Your files never touch external servers or cloud databases. Page extraction happens locally in your device RAM.',
          },
          {
            title: 'No Sign-In or Subscription Traps:',
            text: 'Adobe requires signing in to download split files and limits free tools. PDF Lab provides unlimited, free extraction forever.',
          },
          {
            title: '100% Lossless Quality:',
            text: 'Vector typography, embedded fonts, high-resolution scans, and document metadata remain identical to the original file.',
          },
          {
            title: 'Instant Execution Speed:',
            text: 'Without network upload or download latencies, large documents are split and exported in milliseconds.',
          },
        ],
      },
      {
        heading: 'Common Scenarios for Splitting & Extracting PDF Pages',
        content:
          'Extracting specific sections helps keep files organized, lightweight, and focused:',
        list: [
          {
            title: 'Academic Papers & Textbooks:',
            text: 'Extract single chapters, assignments, or bibliographies from large multi-megabyte PDFs.',
          },
          {
            title: 'Contracts & Agreements:',
            text: 'Separate signed execution pages or specific schedules without sending unnecessary legal clauses.',
          },
          {
            title: 'Financial Statements & Invoices:',
            text: 'Share specific invoice pages or banking sheets without exposing your complete transaction history.',
          },
          {
            title: 'Optimizing Document Size:',
            text: 'Trim heavy presentation slides or appendix pages to ensure your file stays well under email size limits.',
          },
        ],
      },
      {
        heading: 'Will My Split PDF Retain the Original Quality?',
        content:
          'Yes! Splitting a PDF with our tool does not involve rasterizing or recompressing your content. The underlying page tree, vector paths, embedded imagery, and text structures are extracted directly into the new container, ensuring 100% original fidelity.'
      },
    ],

    faqs: [
      {
        question: 'How do I separate pages in a PDF file?',
        answer:
          'Drop your document into the tool above, type the page range you want to isolate (for example, "1-3" or "2-4"), and click "Split PDF". The tool will extract only those pages into a new PDF and download it instantly.',
      },
      {
        question: 'Will my split PDF retain original resolution and quality?',
        answer:
          'Yes. The extraction process is completely lossless. Original vector graphics, fonts, formatting, and high-resolution images are preserved without recompression.',
      },
      {
        question: 'How do I split a PDF on Mac, Windows, or iPhone?',
        answer:
          'PDF Lab works identically across all devices and web browsers (Chrome, Safari, Edge, Firefox). Simply open the page in your browser on desktop or mobile and split your file directly without installing extra apps.',
      },
      {
        question: 'What is the maximum file size limit for splitting PDFs?',
        answer:
          'Unlike Adobe Acrobat which imposes a 100MB ceiling for free online use, PDF Lab runs client-side in your browser memory, meaning there are no arbitrary server file size or page count restrictions.',
      },
      {
        question: 'Can I split password-protected PDFs?',
        answer:
          'If a PDF is locked with an open password, it must first be unlocked before splitting so that the internal page indexes can be accessed and copied.',
      },
      {
        question: 'Are my files uploaded to your servers when splitting?',
        answer:
          'No. All page extraction executes locally on your device via client-side JavaScript. Your files are never uploaded, stored, or viewed by our servers.',
      },
      {
        question: 'Is this PDF splitter free to use?',
        answer:
          'Yes, 100% free with no registration, no watermarks, and no subscription requirements.',
      },
    ],

    relatedTools: [
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'Remove Pages', href: '/remove-pages' },
      { label: 'Rotate PDF', href: '/rotate-pdf' },
      { label: 'PDF to JPG', href: '/pdf-to-jpg' },
      { label: 'Protect PDF', href: '/protect-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <SplitPdfTool />
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