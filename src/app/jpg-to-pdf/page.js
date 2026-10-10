import JpgToPdfTool from './JpgToPdfTool';
import ArticleSeo from '@/components/ArticleSeo';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'Convert JPG to PDF Online Free – High Quality Image to PDF',
  description:
    'Convert JPG & JPEG images to PDF online for free. Combine multiple photos into one clean PDF document. 100% private, no file uploads, works directly in your browser.',
  alternates: {
    canonical: `${siteUrl || 'https://onlinepdflab.app'}/jpg-to-pdf`,
  },
  openGraph: {
    title: 'Convert JPG to PDF Online Free – High Quality Image to PDF',
    description:
      'Easily turn JPEG photos into high-resolution PDF documents. 100% private client-side processing with no file size limits.',
    url: `${siteUrl || 'https://onlinepdflab.app'}/jpg-to-pdf`,
    type: 'website',
  },
};

export default function Page() {
  const articleData = {
    title: 'How to Convert JPG to PDF Online for Free',
    intro:
      'Need to turn your pictures, receipts, or document photos into a PDF? Our free online JPG to PDF converter allows you to transform single or batch JPEG images into a clean, professional PDF file in seconds. With zero server uploads, your sensitive photos remain completely private on your device.',

    sections: [
      {
        heading: 'How to Convert JPG to PDF in 4 Easy Steps',
        content:
          'Converting your JPEG images to PDF requires no software installation or complicated settings. Follow these simple steps:',
        list: [
          {
            title: 'Step 1: Select or drop your JPGs.',
            text: 'Click the upload box above or drag and drop your JPG/JPEG files directly into the browser.',
          },
          {
            title: 'Step 2: Rearrange pages in order.',
            text: 'Use the up and down arrow buttons to reorder your photos exactly how you want them to appear in the PDF.',
          },
          {
            title: 'Step 3: Instant client-side conversion.',
            text: 'Click "Convert to PDF". Our browser engine embeds each photo into a new PDF page with preserved dimensions.',
          },
          {
            title: 'Step 4: Download your PDF.',
            text: 'Your consolidated PDF downloads instantly to your computer or phone with no watermarks.',
          },
        ],
      },
      {
        heading: 'Why Convert Photos to PDF? (Key Advantages)',
        content:
          'While JPG is great for sharing individual pictures, PDF is the worldwide standard for official documents, applications, and multi-page records.',
        list: [
          {
            title: 'Combine Multiple Images into One File:',
            text: 'Instead of attaching 10 separate images to an email, merge them all into a single, organized document.',
          },
          {
            title: 'Universal Compatibility:',
            text: 'PDFs open identically on every phone, tablet, and PC without format or orientation issues.',
          },
          {
            title: 'Perfect for Official Portals:',
            text: 'Government forms, universities, and banks almost universally require PDF submissions rather than raw image files.',
          },
        ],
      },
      {
        heading: '100% Private & Secure: Your Photos Never Leave Your Device',
        content:
          'Most online converters (including major brands like Adobe Acrobat) upload your files to external cloud servers to process them. That creates a privacy risk for personal IDs, contracts, or tax documents.',
        list: [
          {
            title: 'Local Browser Processing:',
            text: 'PDF Lab uses WebAssembly and client-side JavaScript. Your images are converted entirely in your device RAM.',
          },
          {
            title: 'Zero File Size Limits:',
            text: 'Because we do not incur server bandwidth costs, there is no arbitrary 100MB ceiling. Convert as many photos as your device can handle.',
          },
          {
            title: 'No Sign-Up or Paywalls:',
            text: 'No credit card, no email address, and no subscription traps. Unlimited free conversions forever.',
          },
        ],
      },
      {
        heading: 'Does Converting JPG to PDF Reduce Image Quality?',
        content:
          'No. Our converter maintains high visual fidelity (92%+ JPEG quality) and preserves the original pixel dimensions of each picture. Text on scanned documents, receipts, and book pages remains razor-sharp and legible for reading and printing.'
      },
    ],

    faqs: [
      {
        question: 'How do I convert a JPG to PDF with PDF Lab?',
        answer:
          'Simply drag and drop your JPG or JPEG photos into the tool area above, arrange their order if needed, and click "Convert to PDF". Your document is compiled and saved in seconds without leaving your browser.',
      },
      {
        question: 'Can I combine multiple JPG images into one PDF?',
        answer:
          'Yes! You can select multiple JPG images at once. Each image becomes its own page in the final PDF, and you can sort the order using the arrow buttons before generating the file.',
      },
      {
        question: 'Does converting JPG to PDF reduce image quality?',
        answer:
          'Our converter preserves the original resolution of your images. Text, contracts, and photo details remain crisp and clear for both screen viewing and high-resolution printing.',
      },
      {
        question: 'What is the maximum file size for JPG to PDF conversion?',
        answer:
          'Unlike Adobe which restricts free uploads to 100MB, PDF Lab processes files directly in your browser with no arbitrary server limits. You can convert large batches of photos as long as your device has sufficient memory.',
      },
      {
        question: 'Is this JPG to PDF converter completely free?',
        answer:
          'Yes, 100% free with no hidden fees, no credit card required, and no watermarks added to your documents.',
      },
      {
        question: 'Are my personal photos and documents kept private?',
        answer:
          'Yes. All conversions run locally on your computer or smartphone. Your images are never uploaded to any server or cloud database.',
      },
    ],

    relatedTools: [
      { label: 'Image to PDF (PNG, WebP)', href: '/image-to-pdf' },
      { label: 'Compress PDF', href: '/compress-pdf' },
      { label: 'Merge PDF', href: '/merge-pdf' },
      { label: 'PDF to JPG', href: '/pdf-to-jpg' },
      { label: 'Sign PDF', href: '/sign-pdf' },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <JpgToPdfTool />
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