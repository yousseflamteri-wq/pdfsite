import WatermarkPdfTool from './WatermarkPdfTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Add Watermark to PDF Online Free – Stamp Text on Every Page',
  description:
    'Stamp custom text watermarks — CONFIDENTIAL, DRAFT, or custom branding — onto every PDF page online for free. 100% private in-browser watermarking with zero file uploads.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/watermark-pdf`,
  },
  openGraph: {
    title: 'Add Watermark to PDF Online Free – Stamp Text on Every Page',
    description:
      'Add custom watermark stamps to your PDF documents directly in your browser. 100% private, no signup, no file uploads.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/watermark-pdf`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Add a Watermark to a PDF Online for Free',
    intro:
      'Need to protect confidential contracts, mark draft documents, or prevent unauthorized distribution of your work? Our free online PDF watermarking tool lets you stamp custom text—such as CONFIDENTIAL, DRAFT, COPY, or your company name—across every page of your PDF in seconds. All processing takes place locally in your browser memory, ensuring your private paperwork never touches external servers.',

    sections: [
      {
        heading: 'How to Watermark PDF Files in 4 Simple Steps',
        content:
          'Stamping custom watermark text on your documents takes only moments without needing desktop software or an account:',
        list: [
          {
            title: 'Step 1: Upload your PDF.',
            text: 'Drag and drop your PDF file into the secure drop zone above or select it from your device.',
          },
          {
            title: 'Step 2: Customize your watermark text.',
            text: 'Type your desired stamp wording (e.g. CONFIDENTIAL, DRAFT, SAMPLE, or a company title).',
          },
          {
            title: 'Step 3: Adjust opacity and transparency.',
            text: 'Use the opacity slider to ensure the watermark is bold enough to protect your work without hiding underlying text.',
          },
          {
            title: 'Step 4: Download your watermarked PDF.',
            text: 'Click "Download Watermarked PDF". The vector stamp is fused into all pages in browser memory and saved immediately.',
          },
        ],
      },
      {
        heading: 'Why Add Watermarks with PDF Lab? (Key Advantages)',
        content:
          'Unlike traditional cloud editors that upload your sensitive documents to remote servers, PDF Lab operates on a private client-side engine:',
        list: [
          {
            title: 'Complete Document Privacy:',
            text: 'Your contracts, legal drafts, and creative portfolios never leave your web browser. Zero server transmission or data logging.',
          },
          {
            title: 'No Added Tool Watermarks:',
            text: 'Many free online services force their own logo watermark onto your files. PDF Lab stamps only what you specify—100% clean output.',
          },
          {
            title: 'Lossless Vector Overlay:',
            text: 'The watermark is rendered as a crisp vector text layer. Original fonts, illustrations, and scan quality are preserved without raster recompression.',
          },
          {
            title: 'Unlimited Free Use:',
            text: 'No subscription prompts, account creation, or document quotas. Watermark as many files as you need at zero cost.',
          },
        ],
      },
      {
        heading: 'Common Scenarios for Watermarking PDFs',
        content:
          'Adding a diagonal text watermark is standard practice across legal, creative, and business workflows:',
        list: [
          {
            title: 'Draft Agreements & Proposals:',
            text: 'Stamp "DRAFT" across contracts during negotiation phases to ensure unapproved terms are not executed.',
          },
          {
            title: 'Confidential Business Audits:',
            text: 'Mark financial summaries, board decks, and internal reports as "CONFIDENTIAL" before circulation.',
          },
          {
            title: 'Copyright & Intellectual Property:',
            text: 'Protect eBooks, whitepapers, design portfolios, and training decks from unauthorized distribution.',
          },
          {
            title: 'Sample Invoices & Receipts:',
            text: 'Stamp "SAMPLE", "SPECIMEN", or "PAID" on billing records to prevent double-processing or billing fraud.',
          },
        ],
      },
      {
        heading: 'Does Adding a Watermark Reduce Document Quality?',
        content:
          'No. Our watermarking engine embeds the stamp directly into the PDF coordinate system using vector typography. The existing page content streams, images, and embedded fonts remain untouched and 100% lossless, while the watermark is layered seamlessly over the canvas.'
      },
    ],

    faqs: [
      {
        question: 'How do I add a watermark to all pages of a PDF?',
        answer:
          'Drag and drop your PDF into the tool above, type your custom watermark text (like CONFIDENTIAL or DRAFT), choose your opacity level, and click "Download Watermarked PDF". The stamp will be automatically applied at a 45-degree diagonal across every page.',
      },
      {
        question: 'Can I adjust the opacity and transparency of the watermark?',
        answer:
          'Yes. Use the opacity slider to set transparency from 10% (subtle background watermark) up to 80% (prominent stamp). Around 30% is standard for keeping underlying text legible.',
      },
      {
        question: 'Does PDF Lab add its own branding or watermark to my files?',
        answer:
          'No, never. Unlike other online converters that stamp their service logo on your pages, PDF Lab applies strictly the text you wrote and leaves your documents professional and clean.',
      },
      {
        question: 'Does adding a watermark reduce document quality or resolution?',
        answer:
          'No. The watermark is applied as a native vector text overlay. Your document fonts, vector graphics, and high-resolution images retain their original quality without recompression.',
      },
      {
        question: 'Can I watermark password-protected PDFs?',
        answer:
          'If a PDF has an active open password, you must unlock it before applying watermarks so the page elements and structure can be accessed.',
      },
      {
        question: 'Are my sensitive documents uploaded to any server?',
        answer:
          'No. All processing runs locally inside your browser memory using client-side JavaScript. Your files are never uploaded, stored, or analyzed on remote servers.',
      },
      {
        question: 'Can I watermark PDFs on mobile (iPhone or Android)?',
        answer:
          'Yes. Our tool is fully responsive and runs smoothly in mobile web browsers such as Safari and Chrome without needing any external apps.',
      },
    ],

    relatedTools: [
      { label: 'Protect PDF', href: '/protect-pdf' },
      { label: 'Sign PDF', href: '/sign-pdf' },
      { label: 'Rotate PDF', href: '/rotate-pdf' },
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
          <WatermarkPdfTool />
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