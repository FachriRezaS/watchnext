'use client';

import { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { MovieCard } from '@/components/shared/MovieCard';
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/components/ui/ToastProvider';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { error } = useToast();
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        } else {
          error('Failed to search titles. Please try again.');
        }
      } catch (err) {
        error('A network error occurred while searching.');
        console.error('Search failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Search</h1>
      
      <div className="relative max-w-xl mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-neutral-400" />
        </div>
        <Input
          type="text"
          className="block w-full pl-10 bg-neutral-900 border-neutral-800 text-white focus-visible:ring-red-600"
          placeholder="Search for movies, series..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {isLoading && (
        <div className="text-center py-12 text-neutral-400">Searching...</div>
      )}

      {!isLoading && debouncedQuery && results.length === 0 && (
        <div className="text-center py-12 text-neutral-400">No results found for "{debouncedQuery}".</div>
      )}

      {!isLoading && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {results.map((item: any) => (
            <MovieCard key={item.id} item={{
              id: item.id,
              title: item.name,
              type: item.type,
              poster_url: item.image_url,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}
