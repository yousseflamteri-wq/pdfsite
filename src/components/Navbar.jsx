'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tools } from '../lib/toolsConfig';

// Look up icon / color / name from toolsConfig by tool id
const byId = Object.fromEntries(tools.map((t) => [t.id, t]));

// Shorter labels for the menus (optional overrides)
const labelOverrides = {
  'ocr-pdf': 'OCR PDF',
  'pdf-to-md': 'PDF to Markdown',
};

const allToolsGroups = [
  { title: 'Organize PDF', ids: ['merge-pdf', 'split-pdf', 'remove-pages', 'organize-pdf'] },
  { title: 'Optimize PDF', ids: ['compress-pdf', 'ocr-pdf'] },
  { title: 'Convert to PDF', ids: ['jpg-to-pdf', 'image-to-pdf'] },
  { title: 'Convert from PDF', ids: ['pdf-to-jpg', 'pdf-to-text', 'pdf-to-md'] },
  { title: 'Edit PDF', ids: ['rotate-pdf', 'add-page-numbers', 'add-watermark'] },
  { title: 'PDF Security', ids: ['protect-pdf', 'sign-pdf'] },
];

const convertGroups = [
  { title: 'Convert to PDF', ids: ['jpg-to-pdf', 'image-to-pdf'] },
  { title: 'Convert from PDF', ids: ['pdf-to-jpg', 'pdf-to-text', 'pdf-to-md', 'ocr-pdf'] },
];

function ToolLink({ id, className = '' }) {
  const tool = byId[id];
  if (!tool) return null;
  const Icon = tool.icon;
  const label = labelOverrides[id] || tool.name;

  return (
    <Link
      href={`/${tool.id}`}
      className={`flex items-center gap-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors ${className}`}
    >
      {Icon ? (
        <span className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${tool.bg || 'bg-blue-50'}`}>
          <Icon className={`w-4 h-4 ${tool.color || 'text-blue-600'}`} />
        </span>
      ) : null}
      <span>{label}</span>
    </Link>
  );
}

function Chevron({ open }) {
  return (
    <svg
      className={`w-3.5 h-3.5 ml-1 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null); // 'convert' | 'all' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();

  // Close everything when the page changes
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const linkClass =
    'px-3 py-2 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors';

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div
        ref={navRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <Link href="/" className="flex items-center space-x-2">
          <span className="bg-blue-600 text-white font-black px-2.5 py-1 rounded-lg text-lg">PDF</span>
          <span className="font-extrabold text-xl text-gray-900 tracking-tight">Lab</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center h-full text-sm font-semibold text-gray-600 uppercase tracking-wide">
          <Link href="/merge-pdf" className={linkClass}>Merge PDF</Link>
          <Link href="/split-pdf" className={linkClass}>Split PDF</Link>
          <Link href="/compress-pdf" className={linkClass}>Compress PDF</Link>

          {/* Convert dropdown */}
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() => setOpenMenu('convert')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'convert' ? null : 'convert')}
              className={`${linkClass} flex items-center uppercase`}
              aria-expanded={openMenu === 'convert'}
            >
              Convert PDF
              <Chevron open={openMenu === 'convert'} />
            </button>
            {openMenu === 'convert' && (
              <div className="absolute left-0 top-full w-64 bg-white border border-gray-100 rounded-xl shadow-lg p-4 normal-case tracking-normal">
                {convertGroups.map((group, i) => (
                  <div key={group.title} className={i > 0 ? 'mt-3' : ''}>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      {group.title}
                    </h4>
                    {group.ids.map((id) => (
                      <ToolLink key={id} id={id} />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* All tools mega menu (full width, positioned against the header) */}
          <div
            className="h-full flex items-center"
            onMouseEnter={() => setOpenMenu('all')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'all' ? null : 'all')}
              className={`${linkClass} flex items-center uppercase`}
              aria-expanded={openMenu === 'all'}
            >
              All PDF Tools
              <Chevron open={openMenu === 'all'} />
            </button>
            {openMenu === 'all' && (
              <div className="absolute left-0 right-0 top-full px-4 sm:px-6 lg:px-8 normal-case tracking-normal">
                <div className="max-w-7xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl p-8 grid grid-cols-6 gap-6">
                  {allToolsGroups.map((group) => (
                    <div key={group.title}>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        {group.title}
                      </h4>
                      <div className="flex flex-col">
                        {group.ids.map((id) => (
                          <ToolLink key={id} id={id} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/blog" className={linkClass}>Guides</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto px-4 py-4 space-y-5">
          {allToolsGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                {group.title}
              </h4>
              <div className="grid grid-cols-2 gap-x-2">
                {group.ids.map((id) => (
                  <ToolLink key={id} id={id} />
                ))}
              </div>
            </div>
          ))}
          <Link href="/blog" className="block text-sm font-semibold text-gray-700 hover:text-blue-600">
            Guides
          </Link>
        </div>
      )}
    </header>
  );
}