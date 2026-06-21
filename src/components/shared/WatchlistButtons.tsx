'use client';

import { useUserStore } from '@/store/useUserStore';
import { Button } from '@/components/ui/button';
import { Plus, Check, Clock } from 'lucide-react';
import { WatchmodeTitle } from '@/types/watchmode';

export function WatchlistButtons({ item }: { item: WatchmodeTitle }) {
  const { watchlist, watchHistory, addToWatchlist, removeFromWatchlist, addToHistory } = useUserStore();

  const inWatchlist = watchlist.some((w) => w.id === item.id);
  const inHistory = watchHistory.find((h) => h.id === item.id);

  return (
    <div className="flex gap-4">
      <Button 
        variant={inWatchlist ? "secondary" : "default"} 
        onClick={() => inWatchlist ? removeFromWatchlist(item.id) : addToWatchlist(item)}
      >
        {inWatchlist ? <Check className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
        {inWatchlist ? "In Watchlist" : "Add to Watchlist"}
      </Button>

      <Button 
        variant={inHistory?.progress_status === 'watching' ? "secondary" : "outline"}
        onClick={() => addToHistory(item, 'watching')}
      >
        <Clock className="w-4 h-4 mr-2" />
        {inHistory?.progress_status === 'watching' ? "Watching" : "Mark as Watching"}
      </Button>
    </div>
  );
}
