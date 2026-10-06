import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '../../../lib/blogPosts';
import { siteUrl, siteName } from '../../../lib/siteConfig';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} – ${siteName}`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <Link
          href="/blog"
          className="text-sm font-semibold text-blue-600 hover:underline inline-flex items-center mb-8"
        >
          ← Back to Guides
        </Link>

        <header className="mb-10">
          <div className="flex items-center space-x-3 text-xs font-semibold text-gray-400 mb-3">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {post.title}
          </h1>
        </header>

        <div
          className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900">Need to execute a PDF task now?</h3>
              <p className="text-xs text-gray-500">Free, fast, and completely in-browser.</p>
            </div>
            <Link
              href="/"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shrink-0"
            >
              Explore Free Tools
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}