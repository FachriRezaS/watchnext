import Link from 'next/link';
import { apiService } from '@/lib/api-service';

export default async function GenresPage() {
  const genres = await apiService.getGenres();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-white">Explore Genres</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {genres.map((genre: any) => (
          <Link
            key={genre.id}
            href={`/genres/${genre.id}?name=${encodeURIComponent(genre.name)}`}
            className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex items-center justify-center text-center transition-all hover:bg-neutral-800 hover:scale-105 hover:border-neutral-700"
          >
            <span className="font-semibold text-neutral-200">{genre.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
