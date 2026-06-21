import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">Page Not Found</h2>
      <p className="text-neutral-400 max-w-md mb-8">
        The movie, series, or page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
