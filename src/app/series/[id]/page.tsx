import { WatchlistButtons } from '@/components/shared/WatchlistButtons';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { MovieCard } from '@/components/shared/MovieCard';
import { PlayTrailerButton } from '@/components/shared/PlayTrailerButton';
import { apiService } from '@/lib/api-service';
import { notFound } from 'next/navigation';

export default async function SeriesDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let data;
  let episodes = [];
  try {
    data = await apiService.getTitleDetails(id);
    episodes = await apiService.getEpisodes(id);
  } catch (err) {
    data = { error: true };
  }

  if (!data || data.error) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-12">
      <div className="relative min-h-[60vh] md:h-[60vh] w-full flex flex-col justify-end">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.backdrop || data.poster} alt={data.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-4 flex items-end pb-12 pt-24 md:pt-0">
          <div className="flex flex-col items-center text-center md:flex-row md:items-end md:text-left gap-6 md:gap-8 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.poster} alt={data.title} className="w-40 sm:w-48 md:w-64 rounded-lg shadow-2xl shrink-0" />
            <div className="space-y-4 max-w-3xl flex-1 flex flex-col items-center md:items-start">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{data.title}</h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 md:gap-4 text-sm text-neutral-300">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> {data.user_rating}</span>
                <span>{data.year}</span>
                <span>{data.runtime_minutes} min</span>
                <div className="flex gap-2">
                  {data.genre_names?.map((g: string) => <Badge key={g} variant="secondary">{g}</Badge>)}
                </div>
              </div>
              <p className="text-neutral-300 line-clamp-4 md:line-clamp-none">{data.plot_overview}</p>
              <div className="pt-4 flex flex-wrap justify-center md:justify-start gap-4">
                <WatchlistButtons item={data} />
                <PlayTrailerButton url={data.trailer} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-6">Episodes ({episodes.length})</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {episodes.slice(0, 20).map((ep: any) => (
            <div key={ep.id} className="bg-neutral-900 p-4 rounded-lg border border-neutral-800 flex gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-white">S{ep.season_number} E{ep.episode_number} - {ep.title}</h3>
                <p className="text-sm text-neutral-400 mt-2 line-clamp-2">{ep.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {data.similar_titles && data.similar_titles.length > 0 && (
        <div className="container mx-auto px-4 mt-12">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.similar_titles.slice(0, 5).map((simId: number) => (
              <SimilarTitleCard key={simId} id={simId} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

async function SimilarTitleCard({ id }: { id: number }) {
  let item;
  try {
    item = await apiService.getTitleDetails(id.toString());
  } catch (err) {
    return null;
  }
  
  if (!item || item.error) return null;
  
  const releaseItem = {
    id: item.id,
    title: item.title,
    type: item.type,
    poster_url: item.poster,
  };

  return <MovieCard item={releaseItem} />;
}
