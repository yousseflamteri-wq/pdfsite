import PdfToTextTool from './PdfToTextTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'PDF to Text Converter – Extract Text from PDF Online Free',
  description:
    'Extract selectable text from PDF documents instantly. Copy text or download as a .txt file. 100% private, client-side processing with zero file uploads.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/pdf-to-text`,
  },
  openGraph: {
    title: 'PDF to Text Converter – Extract Text from PDF Online Free',
    description:
      'Extract editable text from any PDF document in seconds. 100% in-browser, secure, and private.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/pdf-to-text`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Extract Text from PDF Online for Free',
    intro:
      'Need to extract content from an eBook, research paper, contract, or report without retyping? Our free online PDF to Text converter reads selectable characters inside your PDF and extracts them into clean, editable plain text. With instant in-browser execution, your files are never uploaded to any cloud server.',

    sections: [
      {
        heading: 'How to Convert PDF to Text in 3 Simple Steps',
        content:
          'Extracting text from any digital PDF document is fast and requires no third-party software installation:',
        list: [
          {
            title: 'Step 1: Select your PDF.',
            text: 'Drag and drop your PDF file into the drop zone above, or tap to choose it from your phone or PC.',
          },
          {
            title: 'Step 2: Instant local parsing.',
            text: 'Our browser-based PDF engine parses every page instantly, rebuilding text lines and paragraphs in local memory.',
          },
          {
            title: 'Step 3: Copy or download as TXT.',
            text: 'Review the text in the preview area, copy it directly to your clipboard, or download it as an organized .txt file.',
          },
        ],
      },
      {
        heading: 'PDF to Text vs. OCR: Which Tool Do You Need?',
        content:
          'Understanding the structure of your PDF file ensures you get the fastest and most accurate output:',
        list: [
          {
            title: 'Use PDF to Text for Native PDFs:',
            text: 'If your document was exported directly from Microsoft Word, Google Docs, or an online editor, it contains selectable characters. This tool extracts that text instantly without any delay.',
          },
          {
            title: 'Use OCR for Scanned Documents & Photos:',
            text: 'If your PDF is a flat scan or photograph of paper, there are no digital character codes to extract. Our tool will automatically detect this and guide you to our OCR PDF tool to perform character recognition.',
          },
        ],
      },
      {
        heading: 'Why Extract Text with PDF Lab? (Key Benefits)',
        content:
          'Traditional online converters upload your confidential files to remote servers. PDF Lab protects your workflow with client-side engineering:',
        list: [
          {
            title: 'Complete Document Privacy:',
            text: 'Extraction executes locally in your browser memory. Your contracts, financial summaries, and private notes never leave your device.',
          },
          {
            title: 'Zero Latency & Queue Times:',
            text: 'Because processing does not depend on server bandwidth, large multi-page documents are parsed at hardware speed.',
          },
          {
            title: 'Full Multilingual Support:',
            text: 'Extracts unicode text across English, Arabic (RTL), French, Spanish, German, and many other languages cleanly.',
          },
          {
            title: 'No Sign-ups or Restrictions:',
            text: 'Enjoy unrestricted text extraction without accounts, watermarks, paywalls, or daily document quotas.',
          },
        ],
      },
      {
        heading: 'Common Use Cases for PDF Text Extraction',
        content:
          'Converting PDF to text streamlines productivity across everyday professional and academic tasks:',
        list: [
          {
            title: 'Academic Research & Citations:',
            text: 'Copy quotes and references from research articles and dissertations without frustrating line break formatting.',
          },
          {
            title: 'Content Translation:',
            text: 'Quickly export paragraphs into translation tools and document editors that do not accept PDF files.',
          },
          {
            title: 'Data Analysis & Word Counts:',
            text: 'Clean raw textual data for keyword frequency analysis, coding scripts, or natural language processing.',
          },
          {
            title: 'Accessibility & Screen Readers:',
            text: 'Generate lightweight plain text documents compatible with basic text editors and assistive reading devices.',
          },
        ],
      },
    ],

    faqs: [
      {
        question: 'How do I extract text from a PDF file?',
        answer:
          'Simply drag and drop your PDF into the upload area above. The text will be extracted automatically page-by-page. You can then copy it with one click or download it as a .txt file.',
      },
      {
        question: 'Does this tool work on scanned PDFs or images?',
        answer:
          'This tool extracts native selectable text. If your PDF is a photo scan, it will detect this and recommend using our OCR PDF tool instead, which is designed specifically to recognize text from scanned images.',
      },
      {
        question: 'Will formatting, fonts, and tables be preserved?',
        answer:
          'The output is clean plain text (.txt). Line breaks and paragraphs are preserved as closely as possible, but decorative fonts, images, and complex table borders are stripped away.',
      },
      {
        question: 'Does this tool support Arabic and right-to-left text?',
        answer:
          'Yes! The extractor supports UTF-8 characters including Arabic, Hebrew, French accents, and other multilingual scripts, provided the original PDF stored them as selectable digital characters.',
      },
      {
        question: 'Is my PDF uploaded to a server?',
        answer:
          'No. All text parsing happens directly inside your web browser using client-side JavaScript. Your documents never touch external servers or cloud databases.',
      },
      {
        question: 'Is there a limit on file size or page count?',
        answer:
          'No artificial limits are imposed. You can extract text from large multi-page PDFs as long as your device RAM has sufficient capacity to read the file.',
      },
      {
        question: 'Is this PDF to Text converter free?',
        answer:
          'Yes, 100% free with no registration, no subscriptions, and no hidden limitations.',
      },
    ],

    relatedTools: [
      { label: 'OCR PDF (Scanned to Text)', href: '/ocr-pdf' },
      { label: 'PDF to JPG', href: '/pdf-to-jpg' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Split PDF', href: '/split-pdf' },
      { label: 'Sign PDF', href: '/sign-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <PdfToTextTool />
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