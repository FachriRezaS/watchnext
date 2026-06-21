import { MovieCard } from '@/components/shared/MovieCard';
import { PlatformFilter } from '@/components/shared/PlatformFilter';
import { apiService } from '@/lib/api-service';

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { source_ids?: string };
}) {
  const { source_ids } = await searchParams;
  const query: Record<string, string> = {};
  if (source_ids) query.source_ids = source_ids;
  const data = await apiService.getMovies(query);
  const movies = data.titles || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">All Movies</h1>
      <PlatformFilter />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((item: any) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
