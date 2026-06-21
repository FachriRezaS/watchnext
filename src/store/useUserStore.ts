import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WatchmodeTitle } from '@/types/watchmode';

export interface WatchlistItem extends WatchmodeTitle {
  added_at: string;
}

export interface WatchHistoryItem extends WatchmodeTitle {
  progress_status: 'watching' | 'completed';
  updated_at: string;
}

interface UserState {
  watchlist: WatchlistItem[];
  watchHistory: WatchHistoryItem[];
  addToWatchlist: (item: WatchmodeTitle) => void;
  removeFromWatchlist: (id: number) => void;
  addToHistory: (item: WatchmodeTitle, status: 'watching' | 'completed') => void;
  removeFromHistory: (id: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      watchlist: [],
      watchHistory: [],
      addToWatchlist: (item) => set((state) => {
        if (state.watchlist.some((w) => w.id === item.id)) return state;
        return {
          watchlist: [...state.watchlist, { ...item, added_at: new Date().toISOString() }],
        };
      }),
      removeFromWatchlist: (id) => set((state) => ({
        watchlist: state.watchlist.filter((w) => w.id !== id),
      })),
      addToHistory: (item, status) => set((state) => {
        const existingIndex = state.watchHistory.findIndex((h) => h.id === item.id);
        const newItem = { ...item, progress_status: status, updated_at: new Date().toISOString() };
        if (existingIndex >= 0) {
          const newHistory = [...state.watchHistory];
          newHistory[existingIndex] = newItem;
          return { watchHistory: newHistory };
        }
        return {
          watchHistory: [...state.watchHistory, newItem],
        };
      }),
      removeFromHistory: (id) => set((state) => ({
        watchHistory: state.watchHistory.filter((h) => h.id !== id),
      })),
    }),
    {
      name: 'watch-movies-user-store',
    }
  )
);
