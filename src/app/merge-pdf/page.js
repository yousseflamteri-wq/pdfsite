import MergeTool from './MergeTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Merge PDF Files Online Free – Combine PDFs Instantly',
  description:
    'Combine multiple PDF files into one single document in seconds. No file upload, no watermarks, no registration. 100% private in-browser PDF merger.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/merge-pdf`,
  },
  openGraph: {
    title: 'Merge PDF Files Online Free – Combine PDFs Instantly',
    description:
      'Combine multiple PDF documents directly in your browser with zero file uploads. Free, fast, and no watermark.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/merge-pdf`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Merge PDF Files Online for Free',
    intro:
      'Need to combine multiple PDF documents into a single file? Whether organizing work reports, compiling invoices, or bundling university assignments, our free online PDF merger lets you join separate documents into one cohesive file in seconds. All processing occurs locally in your browser, guaranteeing total confidentiality.',

    sections: [
      {
        heading: 'How to Merge PDF Files in 5 Simple Steps',
        content:
          'Combining your documents takes only a few clicks with no desktop software or account needed:',
        list: [
          {
            title: 'Step 1: Select your files.',
            text: 'Click the upload box or drag and drop multiple PDF files into the drop zone above.',
          },
          {
            title: 'Step 2: Check your document list.',
            text: 'View all added files along with their individual sizes and titles.',
          },
          {
            title: 'Step 3: Reorder pages and files.',
            text: 'Use the up/down arrows or drag and drop files to place them in your preferred reading order.',
          },
          {
            title: 'Step 4: Click Merge PDFs.',
            text: 'Our client-side engine copies and links all pages losslessly into a single PDF document in memory.',
          },
          {
            title: 'Step 5: Instant download.',
            text: 'Save your combined PDF file right to your computer or phone without watermarks.',
          },
        ],
      },
      {
        heading: 'Why Merge PDFs with PDF Lab? (Key Benefits)',
        content:
          'Unlike traditional cloud compressors and mergers that upload your sensitive documents to remote servers, PDF Lab is built on modern client-side standards:',
        list: [
          {
            title: 'Complete Document Privacy:',
            text: 'Your contracts, medical forms, and bank statements are processed entirely in browser RAM and never uploaded to any cloud server.',
          },
          {
            title: 'Zero Latency & Fast Execution:',
            text: 'Merge dozens of files without waiting for upload or download transfers across slow internet connections.',
          },
          {
            title: 'No Artificial Limits or Paywalls:',
            text: 'Combine as many files and pages as your device hardware can handle. No 100MB caps, subscription traps, or page counts.',
          },
          {
            title: '100% Clean Output:',
            text: 'Your generated PDF is completely free of watermarks, header stamps, or third-party ads.',
          },
        ],
      },
      {
        heading: 'Common Use Cases for Merging PDF Files',
        content:
          'Joining separate documents into one orderly record is essential across various everyday situations:',
        list: [
          {
            title: 'Job Applications:',
            text: 'Bundle your resume, cover letter, recommendation letters, and certificates into a single neat submission.',
          },
          {
            title: 'Accounting & Invoicing:',
            text: 'Consolidate monthly expense receipts, statements, and bills for effortless tax preparation.',
          },
          {
            title: 'Academic Projects:',
            text: 'Merge different chapters, title pages, graphs, and bibliographies into one uniform dissertation or paper.',
          },
          {
            title: 'Legal Contracts:',
            text: 'Assemble main contract pages, addendums, identification records, and exhibits in strict sequential order.',
          },
        ],
      },
      {
        heading: 'Preserve Full Formatting & Quality',
        content:
          'Our merger copies embedded vector data, high-resolution graphics, custom fonts, and annotations directly from the source pages without recompression. Every element looks as sharp in the merged file as in the original.',
      },
    ],

    faqs: [
      {
        question: 'In what order will my merged PDF files appear?',
        answer:
          'Files will be merged in the exact sequence shown in the list above. You can easily adjust the order before merging using the up/down arrow buttons or by dragging files into position.',
      },
      {
        question: 'How many pages or files can I include in a merged PDF?',
        answer:
          'Because PDF Lab processes files directly in your browser memory, there are no artificial limits on the number of files or pages you can combine.',
      },
      {
        question: 'Does merging PDFs reduce document quality?',
        answer:
          'No. The merging process performs a direct page transfer without lossy recompression, preserving all vectors, text sharpness, and high-resolution images.',
      },
      {
        question: 'Can I merge password-protected PDFs?',
        answer:
          'If a PDF is password-encrypted, it must first be unlocked before merging. Encrypted files cannot be accessed or combined for security reasons.',
      },
      {
        question: 'Is it safe to merge confidential PDFs here?',
        answer:
          'Yes, 100%. Unlike conventional tools that upload your files to remote servers, PDF Lab operates entirely on your device. Your data never leaves your computer or phone.',
      },
      {
        question: 'Can I merge PDF files on mobile (iPhone / Android)?',
        answer:
          'Yes. PDF Lab is fully responsive and runs smoothly in mobile web browsers such as Safari and Chrome without installing any apps.',
      },
      {
        question: 'Do you add watermarks or require an account?',
        answer:
          'No. PDF Lab is completely free with no registration, no subscriptions, and zero watermarks on your downloaded documents.',
      },
    ],

    relatedTools: [
      { label: 'Split PDF', href: '/split-pdf' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'Rotate PDF', href: '/rotate-pdf' },
      { label: 'Protect PDF', href: '/protect-pdf' },
      { label: 'JPG to PDF', href: '/jpg-to-pdf' },
      { label: 'Sign PDF', href: '/sign-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <MergeTool />
        </div>

        {/* 2. مقال السيو والأسئلة الشائعة وروابط الأدوات */}
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