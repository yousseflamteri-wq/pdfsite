import Link from 'next/link';

/**
 * ToolSeoContent
 *
 * Generic SEO content block rendered below each tool's interactive UI.
 * Accepts optional `contextualLinks` prop — an array of { href, anchor, context }
 * objects that are injected as semantic in-content links within the How-To
 * section for contextual internal linking purposes.
 */
export default function ToolSeoContent({ theme, howTo, why, uses, faqs, related, contextualLinks = [] }) {
  return (
    <div className="mt-20 border-t border-gray-200 pt-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{howTo.title}</h2>
        <p className="text-gray-600">{howTo.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {howTo.steps.map((step, i) => (
          <div key={step.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-4 ${theme.badge}`}
            >
              {i + 1}
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.text}</p>
          </div>
        ))}
      </div>

      {/* Contextual internal links block */}
      {contextualLinks.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-16">
          <h3 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-3">Related Workflows</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {contextualLinks.map((cl) => (
              <li key={cl.href}>
                {cl.context}{' '}
                <Link href={cl.href} className="font-semibold text-blue-600 hover:underline">
                  {cl.anchor}
                </Link>
                .
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{why.title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {why.items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start space-x-3">
                <Icon className={`w-6 h-6 shrink-0 mt-0.5 ${item.iconClass}`} />
                <div>
                  <h4 className="font-bold text-gray-800 text-base">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{uses.title}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          {uses.items.map((u) => (
            <li key={u.title} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <strong>{u.title}:</strong> {u.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="max-w-3xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-white p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-10 text-center">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Related PDF Tools</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className={`px-4 py-2 bg-white rounded-xl border border-gray-200 text-sm font-medium text-gray-700 transition-colors ${theme.linkHover}`}
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}