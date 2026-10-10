import OcrTool from './OcrTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Free OCR for PDF – Recognize Text & Make PDF Searchable Online',
  description:
    'Apply free OCR to scanned PDFs and images online. Recognize text in English, Arabic, French, and 15+ languages. 100% private in-browser optical character recognition.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/ocr-pdf`,
  },
  openGraph: {
    title: 'Free OCR for PDF – Recognize Text & Make PDF Searchable',
    description:
      'Extract editable text from scanned PDFs and photos in 15+ languages. Private in-browser OCR with zero file uploads.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/ocr-pdf`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to OCR a PDF Online for Free (Recognize Scanned Text)',
    intro:
      'Need to extract text from a scanned document or convert a photographed page into editable content? Our free online PDF OCR tool applies high-accuracy Optical Character Recognition (OCR) directly in your browser. Transform non-selectable scanned PDFs and photos into searchable, editable text across 15+ languages without uploading files to remote servers.',

    sections: [
      {
        heading: 'How to Apply Online OCR to a PDF in 4 Simple Steps',
        content:
          'Recognizing and extracting text from scanned pages takes only moments without needing desktop software:',
        list: [
          {
            title: 'Step 1: Upload or drop your file.',
            text: 'Drop your scanned PDF document, or upload image files like JPG, PNG, or WebP.',
          },
          {
            title: 'Step 2: Choose the document language.',
            text: 'Select the language of your text (English, Arabic, French, or bilingual combinations like Arabic + English).',
          },
          {
            title: 'Step 3: Run local OCR recognition.',
            text: 'Click "Recognise Text". The in-browser WebAssembly engine processes each page image and detects characters.',
          },
          {
            title: 'Step 4: Copy or download the output.',
            text: 'Instantly view the extracted text, copy it to your clipboard, or save it as a clean .txt document.',
          },
        ],
      },
      {
        heading: 'Why Use Client-Side OCR with PDF Lab?',
        content:
          'Unlike Adobe Acrobat and conventional cloud OCR tools that upload entire contracts, receipts, and personal IDs to external servers, PDF Lab runs differently:',
        list: [
          {
            title: 'Complete Document Privacy:',
            text: 'Your sensitive files never leave your device. The OCR model executes in local WebAssembly memory on your computer or phone.',
          },
          {
            title: 'Multilingual & Bilingual Support:',
            text: 'Supports over 15 languages, including dedicated dual-language models for Arabic + English and French + English.',
          },
          {
            title: 'No Sign-In or Subscription Traps:',
            text: 'Adobe requires creating an account or paying for Acrobat Pro. PDF Lab provides free, unlimited character recognition with zero sign-ups.',
          },
          {
            title: 'Handles Scans & Photos Alike:',
            text: 'Works seamlessly on multi-page scanned PDF documents, book photocopies, receipts, and whiteboard images.',
          },
        ],
      },
      {
        heading: 'How Can You Tell if Your PDF Needs OCR?',
        content:
          'The simplest test is to open your PDF and try selecting any sentence with your cursor. If you can highlight individual words and copy them, your document already contains native digital text (in which case, our instant PDF to Text tool is faster). If dragging selects the whole page like a single giant photo, you are dealing with a scanned PDF that requires OCR to detect the embedded letters.',
      },
      {
        heading: 'Tips for Achieving the Highest OCR Accuracy',
        content:
          'OCR accuracy depends directly on the quality of the visual scan:',
        list: [
          {
            title: 'Ensure Adequate DPI Resolution:',
            text: 'Scans captured at 200 to 300 DPI produce the crispest characters for letter detection.',
          },
          {
            title: 'Straighten Tilted Pages:',
            text: 'Ensure the document is oriented right side up and not rotated sideways before processing.',
          },
          {
            title: 'Eliminate Heavy Shadows & Glare:',
            text: 'When taking photos with a smartphone camera, ensure even lighting across the page to avoid obscured characters.',
          },
        ],
      },
    ],

    faqs: [
      {
        question: 'What is OCR (Optical Character Recognition)?',
        answer:
          'OCR is technology that inspects scanned paper documents or photos of text, detects individual character shapes and patterns, and translates them into machine-readable digital text that you can search, copy, and edit.',
      },
      {
        question: 'Can I recognize text in files that are not PDF?',
        answer:
          'Yes! In addition to multi-page PDF documents, our OCR tool accepts image files including JPG, PNG, WebP, BMP, and GIF.',
      },
      {
        question: 'What languages does this OCR tool support?',
        answer:
          'We support over 15 major languages including English, Arabic, French, Spanish, German, Italian, Portuguese, Turkish, Russian, Hindi, Chinese, Japanese, and Korean. We also offer dual-language options such as Arabic + English and French + English.',
      },
      {
        question: 'Is my scanned document uploaded to your servers?',
        answer:
          'No. All text recognition runs directly inside your web browser using WebAssembly. Your documents and sensitive personal data remain strictly on your own device.',
      },
      {
        question: 'Why did OCR miss or misread some words?',
        answer:
          'OCR errors typically happen if the scan resolution is too low, the page is heavily skewed, or the original document has handwriting, smudges, or low contrast. For best results, use printed documents scanned at 300 DPI.',
      },
      {
        question: 'Can OCR work on multi-page PDFs?',
        answer:
          'Yes. You can process entire multi-page documents or specify a custom page range (e.g., 1-5, 8) to recognize only the specific pages you need.',
      },
      {
        question: 'Is this OCR tool free to use?',
        answer:
          'Yes, completely free with no usage limits, no watermark additions, and no registration required.',
      },
    ],

    relatedTools: [
      { label: 'PDF to Text', href: '/pdf-to-text' },
      { label: 'PDF to JPG', href: '/pdf-to-jpg' },
      { label: 'Image to PDF', href: '/image-to-pdf' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Sign PDF', href: '/sign-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <OcrTool />
        </div>

        {/* 2. مقال السيو والأسئلة الشائعة + Related Tools */}
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