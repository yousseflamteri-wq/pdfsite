import CompressPdfTool from './CompressTool';
import ArticleSeo from '@/components/ArticleSeo';

// 1. الميتاداتا (Metadata) القوية لجوجل
export const metadata = {
  title: 'Compress PDF Online Free | Reduce PDF File Size to 100KB',
  description: 'Learn how to compress a PDF online for free. Reduce PDF file size for email uploads, hit 100KB to 2MB limits, and keep your files 100% private in your browser.',
  alternates: {
    canonical: 'https://onlinepdflab.app/compress-pdf',
  }
};

export default function CompressPdfPage() {
  // 2. محتوى المقال والروابط الداخلية
  const articleData = {
    title: "How to Compress a PDF Online for Free (Reduce PDF File Size)",
    intro: "Need to compress a PDF that is too big to email or upload? This guide shows you how to reduce PDF file size online for free, what actually makes PDFs large, how to reach targets like 100KB, 200KB or 1MB, and how to protect your quality and privacy while you do it.",
    
    sections: [
      {
        heading: "How to compress a PDF online for free in 4 steps",
        content: "The fastest way to reduce your PDF file size is to use our browser-based tool. There is nothing to install, and no account required:",
        list: [
          { title: "Step 1: Add your file.", text: "Drag your PDF into the box above, or click to choose it from your device." },
          { title: "Step 2: Start compression.", text: "Our smart engine will automatically compress images and optimize the document structure." },
          { title: "Step 3: 100% Local Processing.", text: "Unlike other tools, your file is processed right in your browser. It never uploads to any server." },
          { title: "Step 4: Check and download.", text: "Compare the new file size with the original and download your compressed PDF instantly." }
        ]
      },
      {
        heading: "Why is my PDF file so large?",
        content: "Before you reduce PDF file size, it helps to know what is taking up the space. A PDF is a container, and a few things inside it account for most of the weight:",
        list: [
          { title: "High-resolution images:", text: "Photos, screenshots, and scans are usually the biggest cause. A single full-page scan can be several megabytes." },
          { title: "Embedded fonts:", text: "Documents can include complete font files so they look the same on every device." },
          { title: "Leftover data:", text: "Edited PDFs can keep old content, metadata, and unused objects." }
        ]
      },
      {
        heading: "How to compress a PDF to 100KB, 200KB or 1MB",
        content: "Many application forms, portals, and school systems set a maximum size, often somewhere between 100KB and 5MB. Text-based documents have a much better chance of reaching 100KB or 200KB than scans or photo-heavy files do. Here is a practical way to get there:",
        list: [
          { title: "Compress the PDF first:", text: "Use the tool above and check the new size." },
          { title: "Remove pages you do not need:", text: "Cover pages, blank pages, and duplicates add weight. You can use a Split PDF tool to extract just the pages you need." },
          { title: "Lower the quality of the source:", text: "If you are creating the PDF from a scan, use a lower scan resolution (150 to 200 DPI is enough) before converting to PDF." }
        ]
      },
      {
        heading: "Is it safe to compress a PDF online? (Our Privacy Guarantee)",
        content: "It depends on the tool you use. Many online compressors (even the biggest brands) upload your file to a server. That means a contract, ID scan, or medical record leaves your device. That is a real privacy risk, even if the site says it deletes files afterwards.",
        list: [
          { title: "PDF Lab works differently:", text: "Compression runs INSIDE your browser. Your file is processed on your own device and is NEVER uploaded to a server." },
          { title: "Verify it yourself:", text: "Turn off your Wi-Fi after the page loads and compress a file. It will still work perfectly because everything happens locally!" }
        ]
      },
      {
        heading: "Compress a PDF on Windows, Mac, iPhone or Android",
        content: "Because our tool runs directly in your web browser using modern JavaScript (WebAssembly), the steps are exactly the same on every device. Open this page in Chrome, Edge, Safari, or Firefox, choose your PDF, compress it, and download the result. No apps to download, no extensions to install."
      }
    ],

    faqs: [
      {
        question: "Is it free to compress a PDF with PDF Lab?",
        answer: "Yes. The Compress PDF tool is 100% free to use. There are no hidden fees, no subscriptions, and no watermarks added to your documents."
      },
      {
        question: "Does compressing a PDF reduce quality?",
        answer: "It can, but we optimize it smartly. Text stays perfectly sharp, but images may lose some fine detail to save space. For most documents read on a screen, the difference is barely noticeable."
      },
      {
        question: "What is a good PDF size for email attachments?",
        answer: "You should keep your PDF well under 20 MB when emailing, as most major providers (like Gmail and Outlook) cap attachments at 20-25 MB."
      },
      {
        question: "Why is my PDF still large after compression?",
        answer: "Usually, this happens if the PDF was already optimized previously, or if it contains extremely detailed, uncompressable elements. If it's a scan, trying a black-and-white scan instead of color often helps."
      }
    ],

    // الروابط الداخلية للأدوات
    relatedTools: [
      { label: "Merge PDF", href: "/merge-pdf" },
      { label: "Split PDF", href: "/split-pdf" },
      { label: "PDF to JPG", href: "/pdf-to-jpg" },
      { label: "JPG to PDF", href: "/jpg-to-pdf" },
      { label: "Protect PDF", href: "/protect-pdf" },
      { label: "Sign PDF", href: "/sign-pdf" }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="pt-24 pb-16">
        {/* 1. الأداة الفوق */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <CompressPdfTool />
        </div>
        
        {/* 2. المقال + الأسئلة الشائعة + روابط الأدوات الأخرى */}
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