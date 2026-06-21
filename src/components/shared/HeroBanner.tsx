import Link from 'next/link';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WatchmodeRelease } from '@/types/watchmode';

export function HeroBanner({ items }: { items: WatchmodeRelease[] }) {
  if (!items || items.length === 0) return null;
  const item = items[0]; // Display the top trending item
  const isMovie = item.type === 'movie' || item.type === 'tv_movie';
  const href = `/${isMovie ? 'movies' : 'series'}/${item.id}`;
  const displayType = typeof item.type === 'string' ? item.type.replace('_', ' ') : 'Unknown';
  
  // Using poster as backdrop if backdrop isn't available in this minimal release endpoint
  const backdropUrl = item.poster_url;

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-neutral-900 overflow-hidden">
      <div className="absolute inset-0">
        {backdropUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backdropUrl}
              alt={item.title || 'Trending Banner'}
              className="w-full h-full object-cover opacity-50 blur-sm scale-105"
              suppressHydrationWarning={true}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={backdropUrl}
              alt={item.title || 'Trending Banner'}
              className="w-full h-full object-contain absolute inset-0 z-0"
              suppressHydrationWarning={true}
            />
          </>
        ) : (
          <div className="w-full h-full bg-neutral-800 absolute inset-0 z-0 flex items-center justify-center">
            <span className="text-neutral-600 text-2xl font-bold opacity-30">{item.title || 'Trending'}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
      </div>

      <div className="relative z-20 container mx-auto h-full flex flex-col justify-end pb-16 md:pb-24 px-4">
        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded uppercase tracking-wider">
              Trending #{1}
            </span>
            <span className="text-neutral-300 text-sm capitalize">{displayType}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            {item.title || 'Untitled'}
          </h1>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full bg-white text-black hover:bg-neutral-200 font-semibold px-8">
              <Link href={href}>
                <Play className="w-5 h-5 mr-2 fill-black" />
                Play Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="rounded-full bg-neutral-800/80 backdrop-blur-md text-white hover:bg-neutral-700 px-8">
              <Link href={href}>
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
