'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Something went wrong</h1>
      <p className="text-gray-600 max-w-md mb-6">
        An unexpected error occurred while executing the operation in memory.
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-2xl transition-all"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Try Again</span>
      </button>
    </main>
  );
}