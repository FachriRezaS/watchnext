import { MovieCard } from '@/components/shared/MovieCard';
import { apiService } from '@/lib/api-service';

export default async function GenreDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ name?: string }>;
}) {
  const { id } = await params;
  const { name } = await searchParams;
  const data = await apiService.getMovies({ genres: id });
  const titles = data.titles || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-white">Genre: {name || 'Unknown'}</h1>
      {titles.length === 0 ? (
        <p className="text-neutral-400">No titles found for this genre.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {titles.map((item: any) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
