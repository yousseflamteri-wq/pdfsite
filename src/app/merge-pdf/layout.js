export const metadata = {
  title: 'Merge PDF Files Online Free – Combine PDFs Without Upload',
  description:
    'Combine multiple PDF files into one single document in seconds. 100% free, no signup, no watermark, and your files never leave your browser.',
  alternates: {
    canonical: 'https://pdfLab.com/merge-pdf',
  },
  openGraph: {
    title: 'Merge PDF Files Online Free - No File Upload Required',
    description: 'Join multiple PDFs locally in your browser. Fast, free, and completely confidential.',
    url: 'https://pdfLab.com/merge-pdf',
  },
};

export default function Layout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Merge PDF - PDF Lab',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free client-side tool to merge and combine multiple PDF files in custom order.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is it safe to merge PDF files with this tool?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100%. All PDF processing runs locally inside your browser using client-side JavaScript. Your files are never uploaded to any remote server or stored anywhere.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I reorder the PDF files before merging?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can easily use the up/down arrows or drag and drop each file to arrange them in the exact order you want before clicking Merge.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a limit on the number of PDFs I can combine?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no artificial limit. Because merging happens using your device memory, you can merge as many documents as your browser and RAM can handle.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}