'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Something went wrong!</h2>
      <p className="text-neutral-400 mb-8 max-w-md">
        An error occurred while trying to load this page. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
