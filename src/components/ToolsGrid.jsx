'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tools } from '../lib/toolsConfig';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'organize', label: 'Organize PDF' },
  { id: 'optimize', label: 'Optimize PDF' },
  { id: 'convert', label: 'Convert PDF' },
  { id: 'edit', label: 'Edit PDF' },
  { id: 'security', label: 'PDF Security' },
];

// tool id -> category
const toolCategory = {
  'merge-pdf': 'organize',
  'split-pdf': 'organize',
  'remove-pages': 'organize',
  'organize-pdf': 'organize',
  'compress-pdf': 'optimize',
  'ocr-pdf': 'optimize',
  'jpg-to-pdf': 'convert',
  'image-to-pdf': 'convert',
  'pdf-to-jpg': 'convert',
  'pdf-to-text': 'convert',
  'pdf-to-md': 'convert',
  'rotate-pdf': 'edit',
  'add-watermark': 'edit',
  'add-page-numbers': 'edit',
  'sign-pdf': 'security',
  'protect-pdf': 'security',
};

export default function ToolsGrid() {
  const [active, setActive] = useState('all');

  const visibleTools =
    active === 'all'
      ? tools
      : tools.filter((tool) => toolCategory[tool.id] === active);

  return (
    <section className="mb-20">
      {/* Category pills */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActive(cat.id)}
            aria-pressed={active === cat.id}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-colors ${
              active === cat.id
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.id}
              href={`/${tool.id}`}
              className="group p-6 bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105 ${
                    tool.bg || 'bg-blue-50'
                  } ${tool.color || 'text-blue-600'}`}
                >
                  {Icon ? <Icon className="w-6 h-6" /> : null}
                </div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {tool.name}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div
                className={`mt-5 text-sm font-semibold flex items-center ${
                  tool.color || 'text-blue-600'
                }`}
              >
                Open Tool{' '}
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}