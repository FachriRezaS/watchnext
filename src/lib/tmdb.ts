import { WatchmodeRelease, WatchmodeTitleDetails, WatchmodeSeasonEpisode } from '@/types/watchmode';

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

async function fetchFromTMDB(endpoint: string, queryParams: Record<string, string> = {}) {
  if (!API_KEY) {
    throw new Error('TMDB_API_KEY is not defined in environment variables');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ========================================
// MAPPERS: TMDB -> Watchmode Format
// ========================================

function mapTMDBToRelease(item: any, defaultType: string = 'movie'): WatchmodeRelease {
  const type = item.media_type || defaultType;
  return {
    id: item.id, // Using TMDB ID directly as our primary ID
    title: item.title || item.name || 'Unknown',
    type: type === 'tv' ? 'tv_series' : 'movie',
    imdb_id: '',
    tmdb_id: item.id,
    tmdb_type: type,
    season_number: 1,
    poster_url: item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : '',
    source_release_date: item.release_date || item.first_air_date || '',
    source_id: 0,
    source_name: '',
    is_original: 0,
  };
}

export async function tmdbGetTrending(): Promise<{ releases: WatchmodeRelease[] }> {
  const data = await fetchFromTMDB('/trending/all/day');
  return {
    releases: (data.results || []).map((item: any) => mapTMDBToRelease(item)),
  };
}

export async function tmdbGetNewReleases(): Promise<{ releases: WatchmodeRelease[] }> {
  const data = await fetchFromTMDB('/movie/now_playing');
  return {
    releases: (data.results || []).map((item: any) => mapTMDBToRelease(item, 'movie')),
  };
}

export async function tmdbGetMovies(query: Record<string, string> = {}): Promise<{ titles: WatchmodeRelease[] }> {
  const tmdbQuery: Record<string, string> = {
    page: query.page || '1',
  };
  if (query.genres) tmdbQuery.with_genres = query.genres;
  if (query.source_ids) tmdbQuery.with_watch_providers = query.source_ids; // Approximation
  if (query.source_ids) tmdbQuery.watch_region = 'US';

  const data = await fetchFromTMDB('/discover/movie', tmdbQuery);
  return {
    titles: (data.results || []).map((item: any) => mapTMDBToRelease(item, 'movie')),
  };
}

export async function tmdbGetSeries(query: Record<string, string> = {}): Promise<{ titles: WatchmodeRelease[] }> {
  const tmdbQuery: Record<string, string> = {
    page: query.page || '1',
  };
  if (query.genres) tmdbQuery.with_genres = query.genres;
  if (query.source_ids) tmdbQuery.with_watch_providers = query.source_ids;
  if (query.source_ids) tmdbQuery.watch_region = 'US';

  const data = await fetchFromTMDB('/discover/tv', tmdbQuery);
  return {
    titles: (data.results || []).map((item: any) => mapTMDBToRelease(item, 'tv')),
  };
}

export async function tmdbGetTitleDetails(id: string): Promise<WatchmodeTitleDetails> {
  // Try fetching as movie first, if fails (404), try as tv
  let isTv = false;
  let data;
  try {
    data = await fetchFromTMDB(`/movie/${id}`, { append_to_response: 'videos' });
  } catch (err) {
    isTv = true;
    data = await fetchFromTMDB(`/tv/${id}`, { append_to_response: 'videos' });
  }

  // Fetch similar
  let similarData;
  try {
    similarData = await fetchFromTMDB(`/${isTv ? 'tv' : 'movie'}/${id}/similar`);
  } catch (err) {
    similarData = { results: [] };
  }

  const type = isTv ? 'tv_series' : 'movie';
  const similar_titles = (similarData.results || []).map((item: any) => item.id);

  // Find trailer
  let trailer = '';
  if (data.videos && data.videos.results) {
    const trailerObj = data.videos.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
    if (trailerObj) {
      trailer = `https://www.youtube.com/watch?v=${trailerObj.key}`;
    }
  }

  return {
    id: data.id,
    title: data.title || data.name,
    original_title: data.original_title || data.original_name,
    plot_overview: data.overview,
    type,
    runtime_minutes: data.runtime || (data.episode_run_time && data.episode_run_time[0]) || 0,
    year: parseInt((data.release_date || data.first_air_date || '0').split('-')[0]) || 0,
    end_year: data.last_air_date ? parseInt(data.last_air_date.split('-')[0]) : null,
    release_date: data.release_date || data.first_air_date,
    imdb_id: data.imdb_id || '',
    tmdb_id: data.id,
    tmdb_type: isTv ? 'tv' : 'movie',
    genres: (data.genres || []).map((g: any) => g.id),
    genre_names: (data.genres || []).map((g: any) => g.name),
    user_rating: data.vote_average,
    poster: data.poster_path ? `${IMAGE_BASE_URL}${data.poster_path}` : '',
    backdrop: data.backdrop_path ? `${BACKDROP_BASE_URL}${data.backdrop_path}` : '',
    original_language: data.original_language,
    networks: [],
    network_names: (data.networks || []).map((n: any) => n.name),
    trailer,
    trailer_thumbnail: '',
    relevance_percentile: data.popularity,
    similar_titles,
    sources: [], // Skipping providers fetch for brevity, could use /watch/providers
  };
}

export async function tmdbGetGenres(): Promise<any[]> {
  const movies = await fetchFromTMDB('/genre/movie/list');
  const tv = await fetchFromTMDB('/genre/tv/list');
  // Combine and deduplicate
  const allGenres = [...movies.genres, ...tv.genres];
  const unique = Array.from(new Set(allGenres.map(a => a.id)))
    .map(id => {
      return allGenres.find(a => a.id === id)
    });
  return unique;
}

export async function tmdbSearch(query: string): Promise<{ results: WatchmodeRelease[] }> {
  const data = await fetchFromTMDB('/search/multi', { query });
  return {
    results: (data.results || []).map((item: any) => mapTMDBToRelease(item)),
  };
}

export async function tmdbGetEpisodes(id: string): Promise<WatchmodeSeasonEpisode[]> {
  const tvData = await fetchFromTMDB(`/tv/${id}`);
  const seasons = tvData.seasons || [];
  
  let allEpisodes: WatchmodeSeasonEpisode[] = [];
  
  // Just fetch the first season to save API calls
  if (seasons.length > 0) {
    const s = seasons.find((s:any) => s.season_number > 0) || seasons[0];
    const seasonData = await fetchFromTMDB(`/tv/${id}/season/${s.season_number}`);
    allEpisodes = (seasonData.episodes || []).map((ep: any) => ({
      id: ep.id,
      title: ep.name,
      episode_number: ep.episode_number,
      season_number: ep.season_number,
      release_date: ep.air_date,
      overview: ep.overview,
    }));
  }
  
  return allEpisodes;
}
