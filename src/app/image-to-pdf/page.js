import ImageToPdfTool from './ImageToPdfTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Image to PDF Converter – PNG, WebP, GIF & BMP with Layout Control',
  description:
    'Convert multi-format images (PNG, WebP, GIF, BMP, AVIF, JPG) to PDF with custom A4/Letter page size, margins & orientation. 100% private in-browser conversion, free and without upload.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/image-to-pdf`,
  },
  openGraph: {
    title: 'Image to PDF Converter – PNG, WebP & BMP with Layout Control',
    description:
      'Combine multiple image formats into a single PDF document with custom page sizes (A4, Letter), margins, and orientation. 100% client-side privacy.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/image-to-pdf`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Convert Images to PDF Online (With Layout & Margin Controls)',
    intro:
      'Need to compile multiple screenshots, scans, or mixed photo formats into an organized PDF? Our free online Image to PDF converter supports PNG, WebP, GIF, BMP, AVIF, and JPG images with complete layout control. Customize page sizes (A4, US Letter, or Fit to Image), adjust margins, and set orientation in seconds—all executed privately in your browser without uploading files.',

    sections: [
      {
        heading: 'How to Convert Images to PDF in 4 Simple Steps',
        content:
          'Combining mixed images into a professional, uniform document takes only a few clicks:',
        list: [
          {
            title: 'Step 1: Upload or drag your images.',
            text: 'Drop PNG, WebP, JPG, GIF, or BMP files into the tool area above or browse them from your device.',
          },
          {
            title: 'Step 2: Reorder image thumbnails.',
            text: 'Drag and drop image tiles or use the arrow controls to set the precise reading sequence for your PDF pages.',
          },
          {
            title: 'Step 3: Customize page layout and margins.',
            text: 'Choose your desired page dimensions (A4, Letter, or Fit to Image), set orientation (Auto, Portrait, Landscape), and pick margin padding.',
          },
          {
            title: 'Step 4: Download your compiled PDF.',
            text: 'Click "Convert to PDF". Your document is assembled in browser memory and downloaded immediately without watermarks.',
          },
        ],
      },
      {
        heading: 'Image to PDF vs. JPG to PDF: Which Tool Should You Use?',
        content:
          'While both tools produce clean PDF files, they are tailored for different source media and layout requirements:',
        list: [
          {
            title: 'Use Image to PDF for Mixed Formats & Layouts:',
            text: 'Choose this tool when working with transparent PNGs, modern WebP graphics, screenshots, or when you need strict A4/Letter margins for printing.',
          },
          {
            title: 'Use JPG to PDF for Quick Camera Photo Batches:',
            text: 'If you only have standard JPEG photographs from a camera or smartphone and want an instant, zero-configuration conversion, our dedicated JPG to PDF tool provides a streamlined workflow.',
          },
        ],
      },
      {
        heading: 'Why Convert Images with PDF Lab? (Key Advantages)',
        content:
          'Unlike traditional cloud converters that upload your personal pictures to third-party servers, PDF Lab runs entirely client-side:',
        list: [
          {
            title: 'Complete Document Privacy:',
            text: 'Your sensitive ID scans, expense receipts, and personal photos are converted inside your browser RAM and never leave your device.',
          },
          {
            title: 'Smart EXIF Orientation Correction:',
            text: 'Mobile phone photos often contain embedded gyro orientation metadata. Our engine auto-corrects rotation so vertical photos never appear sideways.',
          },
          {
            title: 'Lossless Visual Quality:',
            text: 'PNG graphics retain their pixel-perfect crispness, while photo compression is tuned to preserve ultra-sharp text layers for printing.',
          },
          {
            title: 'No Size Caps or Subscription Gates:',
            text: 'Convert dozens of images in a single batch without artificial 100MB file limits, account logins, or paywalls.',
          },
        ],
      },
      {
        heading: 'Common Use Cases for Multi-Format Image to PDF',
        content:
          'Bundling images into an orderly PDF is essential across common daily routines:',
        list: [
          {
            title: 'Official Document Portals:',
            text: 'Combine scans of identity cards, passports, certificates, and diplomas into a single submission document.',
          },
          {
            title: 'Expense & Receipt Bundles:',
            text: 'Group multiple photographed receipts into one standardized A4 document for tax preparation and expense reimbursement.',
          },
          {
            title: 'Design & Presentation Portfolios:',
            text: 'Compile graphic mockups, illustrations, and UI screenshots into a neat, easily shareable lookbook.',
          },
          {
            title: 'Uniform Document Printing:',
            text: 'Apply consistent margins to various photo sizes so they print predictably without clipping on desktop printers.',
          },
        ],
      },
    ],

    faqs: [
      {
        question: 'How is Image to PDF different from JPG to PDF?',
        answer:
          'Image to PDF supports diverse graphic formats (PNG, WebP, GIF, BMP, AVIF, JPG) and provides full page layout controls including A4/Letter sizing, auto or fixed orientation, and margin settings. JPG to PDF is optimized specifically for rapid conversion of standard JPEG camera pictures.',
      },
      {
        question: 'Which image formats can I convert?',
        answer:
          'You can upload JPG, JPEG, PNG, WebP, GIF, BMP, and AVIF files. Please note that Apple HEIC/HEIF photos are not supported natively by most web browsers and should be exported as JPG prior to uploading.',
      },
      {
        question: 'Can I set A4 or Letter page size with custom margins?',
        answer:
          'Yes! You can choose A4 or US Letter page sizing and configure margins as None, Small, or Big. Alternatively, you can select "Fit image" to create pages that match each image’s exact natural aspect ratio.',
      },
      {
        question: 'Will converting images to PDF reduce their sharpness or quality?',
        answer:
          'No. PNG graphics are preserved losslessly. Other formats are re-encoded at maximum photographic quality to ensure that small typography, receipts, and contract text remain razor-sharp.',
      },
      {
        question: 'Why do smartphone camera photos sometimes display sideways?',
        answer:
          'Smartphones store orientation information in EXIF metadata. Our in-browser converter automatically reads and corrects this orientation so that portrait photos always appear upright in the final PDF.',
      },
      {
        question: 'Are my photos uploaded to a server?',
        answer:
          'No. All processing happens locally in your web browser memory using client-side JavaScript. Your photos are never sent to external servers or stored in any database.',
      },
      {
        question: 'Is this Image to PDF converter free to use?',
        answer:
          'Yes, 100% free with no watermark overlays, no daily document limits, and no account registration required.',
      },
    ],

    relatedTools: [
      { label: 'JPG to PDF', href: '/jpg-to-pdf' },
      { label: 'PDF to JPG', href: '/pdf-to-jpg' },
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'OCR PDF', href: '/ocr-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة التفاعلية الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <ImageToPdfTool />
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