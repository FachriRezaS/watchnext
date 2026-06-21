'use client';

import { useUserStore } from '@/store/useUserStore';
import { MovieCard } from '@/components/shared/MovieCard';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const { watchlist, watchHistory } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-3xl font-bold text-white">
          U
        </div>
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-neutral-400">Manage your watchlist and history</p>
        </div>
      </div>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-neutral-800 pb-2">My Watchlist ({watchlist.length})</h2>
          {watchlist.length === 0 ? (
            <p className="text-neutral-400">Your watchlist is empty. Add some movies or series!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {watchlist.map((item: any) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 border-b border-neutral-800 pb-2">Watch History ({watchHistory.length})</h2>
          {watchHistory.length === 0 ? (
            <p className="text-neutral-400">Your history is empty.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {watchHistory.map((item: any) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
