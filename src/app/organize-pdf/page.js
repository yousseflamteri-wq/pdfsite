import OrganizePdfTool from './OrganizePdfTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Organize PDF Pages Free Online – Reorder, Rotate & Delete Pages',
  description:
    'Rearrange, rotate, and delete PDF pages visually online for free. Drag and drop thumbnails to reorder pages. 100% private, no signup, in-browser PDF organizer.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/organize-pdf`,
  },
  openGraph: {
    title: 'Organize PDF Pages Free Online – Reorder, Rotate & Delete Pages',
    description:
      'Organize PDF pages with an interactive visual page view. Reorder, rotate, or delete pages directly in your browser. 100% private client-side processing.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/organize-pdf`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Organize PDF Pages Online for Free (Reorder, Rotate & Delete)',
    intro:
      'Need to fix out-of-order document scans, rotate upside-down pages, or delete unneeded sheets before sharing? Our free online PDF organizer provides an interactive visual page grid where you can drag and drop pages into your desired order, rotate individual sheets, and delete duplicates in seconds. Because everything executes locally in your browser, your files remain completely private and never touch remote servers.',

    sections: [
      {
        heading: 'How to Organize PDF Pages in 4 Simple Steps',
        content:
          'Rearranging, rotating, and managing your PDF document pages is simple and requires no software installation or registration:',
        list: [
          {
            title: 'Step 1: Upload your PDF.',
            text: 'Drag and drop your PDF into the upload area above to generate high-resolution visual thumbnails for every page.',
          },
          {
            title: 'Step 2: Drag and drop to reorder.',
            text: 'Click and drag any page thumbnail to move it to a new position, or use the left/right arrow buttons on mobile screens.',
          },
          {
            title: 'Step 3: Rotate or delete specific pages.',
            text: 'Use the rotate buttons to turn individual pages 90° clockwise or counter-clockwise, or click the trash icon to remove unwanted sheets.',
          },
          {
            title: 'Step 4: Save your organized PDF.',
            text: 'Click "Save Organized PDF". The new document structure is assembled in browser memory and downloaded immediately without watermarks.',
          },
        ],
      },
      {
        heading: 'Why Organize PDFs with PDF Lab? (Key Advantages)',
        content:
          'Unlike Adobe Acrobat and cloud document organizers that upload your sensitive documents to remote servers and enforce paywalls, PDF Lab provides a seamless client-side experience:',
        list: [
          {
            title: 'Interactive Visual Thumbnail View:',
            text: 'See clear previews of every page in your document, making it effortless to identify the exact pages you need to move, rotate, or delete.',
          },
          {
            title: 'Complete Document Privacy:',
            text: 'Your contracts, medical records, and financial statements never leave your device. All restructuring happens locally in browser RAM.',
          },
          {
            title: '100% Lossless Quality:',
            text: 'Pages are copied directly as vector object streams. Existing text sharpness, embedded fonts, and image resolutions remain completely untouched.',
          },
          {
            title: 'Touch & Mobile Friendly:',
            text: 'Organize files smoothly on iPads, iPhones, and Android devices using intuitive arrow buttons and responsive touch gestures.',
          },
        ],
      },
      {
        heading: 'When Do You Need to Organize PDF Pages?',
        content:
          'A visual page organizer is indispensable across many everyday document tasks:',
        list: [
          {
            title: 'Fixing Scrambled Scans:',
            text: 'Quickly restore chronological order when an automatic document feeder shuffles double-sided paperwork.',
          },
          {
            title: 'Removing Extra or Blank Pages:',
            text: 'Purge accidental blank sheets, cover pages, or confidential appendix entries prior to client presentations.',
          },
          {
            title: 'Straightening Mixed Orientations:',
            text: 'Rotate individual landscape spreadsheets or upside-down receipts without altering the rest of your portrait pages.',
          },
          {
            title: 'Restructuring Reports & Proposals:',
            text: 'Move executive summaries, testimonials, or pricing tables to optimal positions in your pitch deck.',
          },
        ],
      },
      {
        heading: 'Does Organizing Pages Alter File Content or Formatting?',
        content:
          'No. Our organizer operates strictly at the structural page-tree level of the PDF format. It rearranges page pointers and applies rotation flags without re-rendering or recompressing the contents of the pages. Text vectors, font definitions, form fields, and embedded pictures retain their original digital fidelity.'
      },
    ],

    faqs: [
      {
        question: 'How do I rearrange the order of pages in a PDF?',
        answer:
          'Upload your PDF to the tool above, click and drag any page thumbnail to its new position, and click "Save Organized PDF". You can also use the left/right arrow buttons below each thumbnail to move pages sequentially.',
      },
      {
        question: 'Can I rotate individual pages without rotating the whole document?',
        answer:
          'Yes! Each page thumbnail has its own rotate clockwise and counter-clockwise buttons, allowing you to fix individual sideways or upside-down pages while leaving all other pages untouched.',
      },
      {
        question: 'Can I delete unwanted pages while organizing?',
        answer:
          'Yes. Click the red trash icon on any page thumbnail to remove it from the final document. If you make a mistake, simply click "Reset" to restore all original pages.',
      },
      {
        question: 'Does organizing pages reduce document quality or resolution?',
        answer:
          'No. The organization engine rearranges the page tree references losslessly. Your fonts, high-resolution scans, images, and text formatting remain 100% identical to the original.',
      },
      {
        question: 'Are my confidential documents uploaded to any server?',
        answer:
          'No. All page previews, reordering, and file saving execute locally in your web browser memory using client-side JavaScript. Your files are never uploaded or stored on any server.',
      },
      {
        question: 'Can I organize PDF pages on my phone or tablet?',
        answer:
          'Yes. PDF Lab is fully mobile-optimized. You can use the dedicated arrow buttons under each page thumbnail to reorder pages easily on touchscreens without installing apps.',
      },
      {
        question: 'Is this PDF organizer completely free to use?',
        answer:
          'Yes, 100% free with no registration, no subscription fees, and no watermark stamps added to your documents.',
      },
    ],

    relatedTools: [
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Split PDF', href: '/split-pdf' },
      { label: 'Remove Pages', href: '/remove-pages' },
      { label: 'Rotate PDF', href: '/rotate-pdf' },
      { label: 'Add Page Numbers', href: '/add-page-numbers' },
      { label: 'Compress PDF', href: '/compress-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <OrganizePdfTool />
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