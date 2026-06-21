import { HeroBanner } from '@/components/shared/HeroBanner';
import { MovieCard } from '@/components/shared/MovieCard';
import { WatchmodeRelease } from '@/types/watchmode';
import { apiService } from '@/lib/api-service';

export default async function Home() {
  const trendingData = await apiService.getTrending();
  const trending: WatchmodeRelease[] = trendingData.releases || [];

  const newReleasesData = await apiService.getNewReleases();
  const newReleases: WatchmodeRelease[] = newReleasesData.releases || [];

  return (
    <div className="flex flex-col min-h-screen pb-12 gap-12">
      <HeroBanner items={trending} />
      
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Trending This Week</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {trending.slice(1, 11).map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">New Releases</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {newReleases.slice(0, 10).map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
