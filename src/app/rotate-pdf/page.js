import RotatePdfTool from './RotatePdfTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Rotate PDF Online for Free – Easily Rotate PDF Pages Permanently',
  description:
    'Rotate PDF pages 90°, 180°, or 270° clockwise permanently in seconds. Fix sideways scans, flip pages, and switch between portrait and landscape. 100% private, no signup.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/rotate-pdf`,
  },
  openGraph: {
    title: 'Rotate PDF Online for Free – Easily Rotate PDF Pages Permanently',
    description:
      'Permanently fix sideways or inverted PDF pages in your browser. 100% lossless and private with zero file uploads.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/rotate-pdf`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Rotate PDF Pages Online for Free (Permanent Rotation)',
    intro:
      'Did a document scanner feed your pages upside-down or sideways? Our free online PDF rotator lets you permanently rotate PDF pages 90, 180, or 270 degrees clockwise in seconds. Using client-side technology, your document orientation is updated losslessly right in your browser without uploading files to remote servers.',

    sections: [
      {
        heading: 'How to Rotate a PDF in 4 Simple Steps',
        content:
          'Rotating and saving your PDF pages correctly requires no complicated software or accounts:',
        list: [
          {
            title: 'Step 1: Upload your PDF.',
            text: 'Drag and drop your inverted or sideways PDF into the drop zone above or select it from your device.',
          },
          {
            title: 'Step 2: Choose your rotation angle.',
            text: 'Select +90° (turn right), +180° (flip upside down), or +270° (turn left) depending on your needs.',
          },
          {
            title: 'Step 3: Apply permanent rotation.',
            text: 'Click "Rotate PDF". Our engine updates the internal page coordinate dictionary in browser memory instantly.',
          },
          {
            title: 'Step 4: Download your oriented PDF.',
            text: 'Download your newly oriented PDF file. The rotation is permanently baked in and displays correctly across all viewers.',
          },
        ],
      },
      {
        heading: 'Why Rotate PDFs with PDF Lab? (Key Advantages)',
        content:
          'While Adobe Acrobat limits free uploads to 100MB and forces you to sign in to save files, PDF Lab offers an unrestricted, zero-friction experience:',
        list: [
          {
            title: 'Permanent Orientation Changes:',
            text: 'Unlike temporary viewer rotate buttons that revert when you close the tab, our tool permanently saves the rotation flags directly into the PDF structure.',
          },
          {
            title: '100% Lossless Vector Quality:',
            text: 'Rotating modifies coordinate orientation metadata only. Embedded fonts, images, charts, and crisp typography lose zero resolution.',
          },
          {
            title: 'Complete Document Privacy:',
            text: 'Processing runs inside your browser sandbox. Your contracts, bank statements, and personal files never travel across the internet.',
          },
          {
            title: 'No Arbitrary Page or File Limits:',
            text: 'Rotate large books, blueprints, and multi-page presentations without arbitrary 100MB upload ceilings.',
          },
        ],
      },
      {
        heading: 'When Do You Need to Rotate PDF Documents?',
        content:
          'Incorrect page orientation is a common issue when handling paperwork across physical scanners and digital devices:',
        list: [
          {
            title: 'Sideways Scanned Documents:',
            text: 'Fix office scans where legal forms or receipts were fed horizontally through sheet feeders.',
          },
          {
            title: 'Landscape Spreadsheets & Presentations:',
            text: 'Switch wide financial statements, Gantt charts, and slides between portrait and landscape modes for easy reading.',
          },
          {
            title: 'Smartphone Camera Scans:',
            text: 'Correct orientation flags on PDF documents generated from phone cameras that saved with wrong gyro metadata.',
          },
          {
            title: 'Architectural Plans & Schematics:',
            text: 'Align oversized CAD drawings and blueprints before sending them for high-resolution printing.',
          },
        ],
      },
      {
        heading: 'Does Rotating a PDF Reduce Its Visual Quality?',
        content:
          'Not at all. In the PDF specification, page rotation is controlled by an internal transformation matrix flag (such as /Rotate 90). Our tool alters this structural degree parameter directly rather than re-rendering or recompressing the page content, ensuring 100% lossless output.'
      },
    ],

    faqs: [
      {
        question: 'How do I permanently flip a PDF that is upside down?',
        answer:
          'Upload your upside-down document into the tool above, select the "+180°" rotation option, and click "Rotate PDF". The pages will be flipped right-side up, and the new orientation will be permanently saved in the downloaded file.',
      },
      {
        question: 'Is the rotation permanent when opening in other PDF readers?',
        answer:
          'Yes. The orientation degree is written directly into the PDF file format specification. When you open the file in Adobe Acrobat Reader, Apple Preview, Google Chrome, or print it, it will stay correctly oriented.',
      },
      {
        question: 'Does rotating a PDF reduce image or text quality?',
        answer:
          'No. Rotating a PDF is completely lossless. It updates the internal page orientation headers without compressing or altering your images, text vectors, or embedded fonts.',
      },
      {
        question: 'What are the file size limits for rotating PDFs with PDF Lab?',
        answer:
          'Unlike Adobe Acrobat which caps free files at 100MB and 500 pages, PDF Lab processes files directly in your browser memory with no artificial size limits.',
      },
      {
        question: 'Can I rotate PDF pages on my phone (iPhone or Android)?',
        answer:
          'Yes. Our tool is fully responsive and runs smoothly in Safari, Chrome, and Edge on iOS, Android, and tablets without installing external apps.',
      },
      {
        question: 'Are my confidential files uploaded to any servers?',
        answer:
          'No. All processing happens locally on your device via client-side JavaScript. Your documents remain completely private and are never sent across the network.',
      },
      {
        question: 'Is this PDF rotator free to use?',
        answer:
          'Yes, 100% free with no registration, no subscription requirements, and no watermarks added to your documents.',
      },
    ],

    relatedTools: [
      { label: 'Split PDF', href: '/split-pdf' },
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'Remove Pages', href: '/remove-pages' },
      { label: 'Protect PDF', href: '/protect-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <RotatePdfTool />
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