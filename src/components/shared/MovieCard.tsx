import Link from 'next/link';
import { Star } from 'lucide-react';
import { WatchmodeRelease } from '@/types/watchmode';

export function MovieCard({ item }: { item: any }) {
  const isMovie = item.type === 'movie' || item.type === 'tv_movie';
  const href = `/${isMovie ? 'movies' : 'series'}/${item.id}`;
  const posterUrl = item.poster_url || item.poster;
  const displayType = typeof item.type === 'string' ? item.type.replace('_', ' ') : 'Unknown';

  return (
    <Link href={href} className="group relative flex flex-col gap-2 transition-transform hover:scale-105">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
        {posterUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={posterUrl}
            alt={item.title || 'Movie Poster'}
            className="object-cover w-full h-full transition-all group-hover:brightness-75"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center p-4 transition-all group-hover:brightness-75">
            <span className="text-neutral-500 font-medium text-center text-sm">{item.title || 'No Poster'}</span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-semibold text-white flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span>New</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white font-medium text-sm">View Details</span>
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-neutral-100 line-clamp-1 group-hover:text-white transition-colors">
          {item.title}
        </h3>
        <p className="text-xs text-neutral-400 capitalize">
          {displayType}
        </p>
      </div>
    </Link>
  );
}
