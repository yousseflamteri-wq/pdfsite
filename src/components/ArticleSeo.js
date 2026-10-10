import React from 'react';
import Link from 'next/link';

export default function ArticleSeo({ title, intro, sections, faqs, relatedTools }) {
  // توليد FAQ Schema أوتوماتيكياً لمحركات البحث
  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="max-w-4xl mx-auto px-4 text-gray-800">
      {/* حقن Schema فـ الصفحة */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* مقدمة المقال */}
      <header className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">{title}</h2>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">{intro}</p>
      </header>

      {/* فقرات المقال */}
      <div className="space-y-12 mb-16">
        {sections?.map((section, index) => (
          <section key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">{section.heading}</h3>
            
            {section.content && (
              <p className="text-slate-600 leading-loose mb-6">{section.content}</p>
            )}

            {section.list && (
              <ul className="space-y-4">
                {section.list.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mt-1 mr-3">
                      ✓
                    </span>
                    <div>
                      {item.title && <strong className="block text-slate-800 mb-1">{item.title}</strong>}
                      <span className="text-slate-600 leading-relaxed">{item.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* قسم الأسئلة الشائعة (FAQ) */}
      {faqs && faqs.length > 0 && (
        <section className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-16">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h4 className="text-lg font-semibold text-slate-800 mb-3">{faq.question}</h4>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* الروابط الداخلية للأدوات الأخرى (Related PDF Tools) */}
      {relatedTools && relatedTools.length > 0 && (
        <section className="border-t border-slate-200 pt-12 text-center">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            Explore More Free PDF Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedTools.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="px-5 py-2.5 bg-white rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                {tool.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}