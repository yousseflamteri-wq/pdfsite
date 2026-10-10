import RemovePagesTool from './RemovePagesTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Delete PDF Pages Free Online – Remove Pages from PDF',
  description:
    'Delete unwanted or blank pages from any PDF online for free. Enter page numbers or ranges to remove pages in seconds. 100% private, no signup, in-browser tool.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/remove-pages`,
  },
  openGraph: {
    title: 'Delete PDF Pages Free Online – Remove Pages from PDF',
    description:
      'Remove unwanted pages from PDF files directly in your browser. 100% private with no file upload required.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/remove-pages`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Delete Pages from a PDF Online for Free',
    intro:
      'Need to remove duplicate sheets, blank pages, or sensitive sections from your PDF document? Our free online PDF page remover tool lets you delete specific pages or entire page ranges in seconds. Everything runs 100% inside your web browser, ensuring your private files are never uploaded to any server.',

    sections: [
      {
        heading: 'How to Delete a Page in a PDF in 4 Simple Steps',
        content:
          'Removing pages from your document is quick and requires no registration or software installation:',
        list: [
          {
            title: 'Step 1: Upload or drag your PDF.',
            text: 'Drop your PDF document into the upload zone above or select it from your device.',
          },
          {
            title: 'Step 2: Specify the pages to delete.',
            text: 'Enter single page numbers separated by commas (e.g. 1, 4) or page ranges with hyphens (e.g. 5-8).',
          },
          {
            title: 'Step 3: Click Remove Selected Pages.',
            text: 'Our in-browser engine rebuilds your document, keeping only your desired pages losslessly.',
          },
          {
            title: 'Step 4: Download your cleaned PDF.',
            text: 'Your updated document is compiled in memory and saved to your computer or phone immediately.',
          },
        ],
      },
      {
        heading: 'Why Remove PDF Pages with PDF Lab?',
        content:
          'While Adobe Acrobat requires uploading your files and signing in with an account, PDF Lab offers an instant, zero-upload workflow:',
        list: [
          {
            title: 'Complete Document Privacy:',
            text: 'Files are processed locally in your browser memory. Your contracts, bank statements, and private records never leave your device.',
          },
          {
            title: 'No Sign-In or Subscription Required:',
            text: 'Delete pages freely without paywalls, watermark stamps, or mandatory email registration.',
          },
          {
            title: 'Preserves Original Quality:',
            text: 'Retains original vector typography, image resolutions, bookmarks, and page dimensions losslessly.',
          },
          {
            title: 'Works on All Devices:',
            text: 'Fully responsive across Chrome, Safari, Edge, and mobile browsers on iOS and Android.',
          },
        ],
      },
      {
        heading: 'Common Reasons to Delete Pages from a PDF',
        content:
          'Trimming unneeded pages makes documents cleaner, easier to share, and more professional:',
        list: [
          {
            title: 'Eliminate Accidental Blank Pages:',
            text: 'Remove empty trailing pages generated during printer scans or document exports.',
          },
          {
            title: 'Remove Sensitive or Confidential Data:',
            text: 'Delete appendix pages containing internal notes, personal signatures, or proprietary figures before sharing.',
          },
          {
            title: 'Reduce File Size for Email:',
            text: 'Removing heavy image pages or unused slides directly shrinks the overall PDF file weight.',
          },
          {
            title: 'Tailor Portfolios & Resumes:',
            text: 'Extract only the relevant project pages or certifications required for a specific job application.',
          },
        ],
      },
      {
        heading: 'Does Deleting Pages Reduce the PDF File Size?',
        content:
          'Yes! Removing pages will directly reduce the overall file size of your PDF, especially if the deleted pages contain high-resolution images, full-page scans, or complex vector graphics. If your goal is to fit your document into an email attachment, removing extraneous pages is often faster than recompressing.'
      },
    ],

    faqs: [
      {
        question: 'How do I remove blank pages from a PDF?',
        answer:
          'Drop your PDF into the tool above, check which page numbers are blank, type them into the input box (e.g., 2, 5), and click "Remove Selected Pages". The tool will generate a new PDF with those blank pages removed.',
      },
      {
        question: 'Can I undo changes after deleting pages?',
        answer:
          'Yes. Our tool creates a brand new downloadable PDF file and never alters or overwrites the original file on your computer. Your original document remains completely intact.',
      },
      {
        question: 'Does deleting pages reduce the quality of the remaining pages?',
        answer:
          'No. The remaining pages are transferred losslessly without recompression, preserving all vector lines, crisp text, and full image quality.',
      },
      {
        question: 'Is it safe to delete pages from confidential PDFs here?',
        answer:
          'Yes, 100%. All processing runs locally inside your browser memory using client-side JavaScript. Your documents are never uploaded to any cloud server or database.',
      },
      {
        question: 'Can I remove pages from a password-protected PDF?',
        answer:
          'If the PDF has an active open password, it must first be unlocked before pages can be deleted so that the document structure can be read.',
      },
      {
        question: 'Can I delete PDF pages on my phone (iPhone or Android)?',
        answer:
          'Yes. PDF Lab is fully mobile-compatible and runs seamlessly in Safari, Chrome, and other mobile browsers without installing any apps.',
      },
      {
        question: 'Is this PDF page remover tool completely free?',
        answer:
          'Yes, 100% free with no hidden fees, no watermark additions, and no sign-up required.',
      },
    ],

    relatedTools: [
      { label: 'Split PDF', href: '/split-pdf' },
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Rotate PDF', href: '/rotate-pdf' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'Protect PDF', href: '/protect-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <RemovePagesTool />
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