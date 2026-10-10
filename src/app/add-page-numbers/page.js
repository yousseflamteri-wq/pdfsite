import PageNumbersTool from './PageNumbersTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Add Page Numbers to PDF Online Free – Insert Numbers in PDF',
  description:
    'Add page numbers to any PDF online for free. Choose header or footer placement (left, center, right), number format, and skip cover pages. 100% private, no signup.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/add-page-numbers`,
  },
  openGraph: {
    title: 'Add Page Numbers to PDF Online Free – Insert Numbers in PDF',
    description:
      'Insert customizable page numbers in header or footer positions directly in your browser. 100% private client-side processing.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/add-page-numbers`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Add Page Numbers to a PDF Online for Free',
    intro:
      'Need to paginate an academic thesis, format a legal bundle, or organize a business report? Our free online PDF page numbering tool lets you insert customizable page numbers into headers or footers in seconds. Everything runs 100% inside your web browser, keeping your documents confidential without uploading files to remote cloud servers.',

    sections: [
      {
        heading: 'How to Insert Page Numbers in a PDF in 4 Easy Steps',
        content:
          'Numbering your PDF pages is quick and requires no desktop software or account registration:',
        list: [
          {
            title: 'Step 1: Upload your PDF.',
            text: 'Drag and drop your document into the upload area above or select it from your device.',
          },
          {
            title: 'Step 2: Choose placement & numbering style.',
            text: 'Pick one of 6 positions (header or footer, left, center, right), and select your format (e.g., "1", "Page 1", or "Page 1 of N").',
          },
          {
            title: 'Step 3: Configure starting page & cover options.',
            text: 'Set which page to start numbering on (to leave cover pages blank) and choose the initial starting number.',
          },
          {
            title: 'Step 4: Download your numbered PDF.',
            text: 'Click "Add Page Numbers". The numbers are rendered natively as vector text in browser memory and saved immediately.',
          },
        ],
      },
      {
        heading: 'Flexible Header & Footer Positioning (6 Placement Zones)',
        content:
          'Control exactly where your page numbers appear to fit your organization or publishing guidelines:',
        list: [
          {
            title: 'Top Header Zones:',
            text: 'Place numbers at Top-Left, Top-Center, or Top-Right for formal reports, documentation, and manuscripts.',
          },
          {
            title: 'Bottom Footer Zones:',
            text: 'Center numbers at Bottom-Center (standard for academic papers) or align to Bottom-Right/Bottom-Left for dual-sided booklet printing.',
          },
          {
            title: 'Automatic Rotation Compensation:',
            text: 'Landscape slides and rotated pages are detected automatically, placing numbers upright and aligned with page orientation.',
          },
        ],
      },
      {
        heading: 'Why Add Page Numbers with PDF Lab? (Key Advantages)',
        content:
          'While Adobe Acrobat limits free files to 100MB and forces you to sign in with an account, PDF Lab provides an unrestricted, zero-friction experience:',
        list: [
          {
            title: 'Complete Document Privacy:',
            text: 'Your confidential agreements, research papers, and financial audits never leave your browser RAM. Zero server uploads.',
          },
          {
            title: 'No Sign-In or Subscription Required:',
            text: 'Adobe requires creating an account and logging in to save files. PDF Lab provides unlimited page numbering with zero paywalls.',
          },
          {
            title: 'Skip Cover Pages Effortlessly:',
            text: 'Easily start numbering from page 2, 3, or any introduction section while keeping title sheets completely clean.',
          },
          {
            title: 'Lossless Vector Typography:',
            text: 'Page numbers are stamped as native vector text layers. Existing fonts, imagery, and diagrams remain 100% untouched.',
          },
        ],
      },
      {
        heading: 'Common Use Cases for PDF Page Numbering',
        content:
          'Clear pagination is essential across professional, academic, and administrative document workflows:',
        list: [
          {
            title: 'Theses & Academic Dissertations:',
            text: 'Leave cover pages and abstracts unnumbered, starting formal page numbers on chapter one.',
          },
          {
            title: 'Legal Contracts & Court Bundles:',
            text: 'Format multi-page evidence, filings, and agreements using clear "Page X of Y" referencing.',
          },
          {
            title: 'Business Proposals & Annual Reports:',
            text: 'Give corporate presentations and financial reports a polished, publication-ready appearance.',
          },
          {
            title: 'Course Handouts & Training Manuals:',
            text: 'Ensure printed workshop booklets and guides follow an easy-to-follow sequential order.',
          },
        ],
      },
    ],

    faqs: [
      {
        question: 'Can I add page numbers to both header and footer positions?',
        answer:
          'Yes! You can choose from six distinct placement zones: Top-Left, Top-Center, Top-Right, Bottom-Left, Bottom-Center, or Bottom-Right. You can also adjust font size, edge margins, and text color.',
      },
      {
        question: 'How do I skip numbering the cover page?',
        answer:
          'Simply set the "Start on page" input to 2 (or any desired page). The cover page will remain unnumbered, and numbering will begin cleanly on the following sheet.',
      },
      {
        question: 'Which page number formats are supported?',
        answer:
          'We support plain numbers (1), prefixed labels (Page 1), total count formats (Page 1 of 10, 1 / 10), and decorative dash styles (- 1 -). The total count is automatically adjusted based on the numbered range.',
      },
      {
        question: 'Does this tool work on landscape or rotated pages?',
        answer:
          'Yes. Our engine inspects each page rotation dictionary and aligns numbers so they appear upright and correctly positioned, even on mixed-orientation documents.',
      },
      {
        question: 'Will adding page numbers alter existing document text or images?',
        answer:
          'No. Page numbers are added as an overlay on top of the existing canvas. Your original fonts, layouts, high-resolution scans, and vector paths remain completely lossless.',
      },
      {
        question: 'Are my confidential documents uploaded to any server?',
        answer:
          'No. All processing happens locally in your device browser memory via client-side JavaScript. Your files are never uploaded, stored, or viewed by our servers.',
      },
      {
        question: 'Is this PDF page numbering tool free to use?',
        answer:
          'Yes, 100% free with no registration, no subscription requirements, and no watermarks added to your documents.',
      },
    ],

    relatedTools: [
      { label: 'Organize Pages', href: '/organize-pdf' },
      { label: 'Watermark PDF', href: '/watermark-pdf' },
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Split PDF', href: '/split-pdf' },
      { label: 'Protect PDF', href: '/protect-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <PageNumbersTool />
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