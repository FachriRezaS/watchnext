import { fetchFromWatchmode } from './watchmode';
import * as tmdb from './tmdb';

const getProvider = () => {
  return process.env.ACTIVE_API_PROVIDER === 'tmdb' ? 'tmdb' : 'watchmode';
};

export const apiService = {
  getTrending: async () => {
    if (getProvider() === 'tmdb') {
      return tmdb.tmdbGetTrending();
    }
    return fetchFromWatchmode('/releases/', { limit: '10', type: 'movie,tv_series', sort_by: 'popularity_desc' });
  },

  getNewReleases: async () => {
    if (getProvider() === 'tmdb') {
      return tmdb.tmdbGetNewReleases();
    }
    return fetchFromWatchmode('/releases/', { limit: '12', type: 'movie', sort_by: 'release_date_desc' });
  },

  getMovies: async (query: Record<string, string>) => {
    if (getProvider() === 'tmdb') {
      return tmdb.tmdbGetMovies(query);
    }
    return fetchFromWatchmode('/list-titles/', { ...query, types: 'movie' });
  },

  getSeries: async (query: Record<string, string>) => {
    if (getProvider() === 'tmdb') {
      return tmdb.tmdbGetSeries(query);
    }
    return fetchFromWatchmode('/list-titles/', { ...query, types: 'tv' });
  },

  getTitleDetails: async (id: string) => {
    if (getProvider() === 'tmdb') {
      return tmdb.tmdbGetTitleDetails(id);
    }
    return fetchFromWatchmode(`/title/${id}/details/`, { append_to_response: 'sources' });
  },

  getGenres: async () => {
    if (getProvider() === 'tmdb') {
      return tmdb.tmdbGetGenres();
    }
    return fetchFromWatchmode('/genres/');
  },

  search: async (query: string) => {
    if (getProvider() === 'tmdb') {
      return tmdb.tmdbSearch(query);
    }
    return fetchFromWatchmode('/autocomplete-search/', { search_value: query, search_type: '1' });
  },

  getEpisodes: async (id: string) => {
    if (getProvider() === 'tmdb') {
      return tmdb.tmdbGetEpisodes(id);
    }
    return fetchFromWatchmode(`/title/${id}/episodes/`);
  }
};
