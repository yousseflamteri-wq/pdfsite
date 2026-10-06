import Link from 'next/link';
import { blogPosts } from '../../lib/blogPosts';
import { siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: 'PDF Guides & Knowledge Hub – Online PDF Lab',
  description:
    'Comprehensive guides and technical tutorials on PDF security, local browser tools, archive standards, and document optimization.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
          PDF Knowledge &amp; Guides
        </h1>
        <p className="text-lg text-gray-600">
          In-depth technical insights, archive best practices, and document privacy guides.
        </p>
      </div>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="p-8 bg-white rounded-3xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-3 text-xs font-semibold text-gray-400 mb-3">
                <time dateTime={post.date}>{post.date}</time>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {post.excerpt}
              </p>
            </div>
            <div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center"
              >
                Read Full Guide <span className="ml-1">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}