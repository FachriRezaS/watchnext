export interface WatchmodeTitle {
  id: number;
  title: string;
  original_title: string;
  plot_overview: string;
  type: "movie" | "tv_series" | "tv_special" | "tv_miniseries" | "short_film";
  runtime_minutes: number;
  year: number;
  end_year: number | null;
  release_date: string;
  imdb_id: string;
  tmdb_id: number;
  tmdb_type: "movie" | "tv";
  genres: number[];
  genre_names: string[];
  user_rating: number;
  poster: string;
  backdrop: string;
  original_language: string;
  networks: number[];
  network_names: string[];
  trailer: string;
  trailer_thumbnail: string;
  relevance_percentile: number;
}

export interface WatchmodeSource {
  source_id: number;
  name: string;
  type: "sub" | "rent" | "buy" | "free";
  region: string;
  ios_url: string;
  android_url: string;
  web_url: string;
  format: "SD" | "HD" | "4K";
  price: number | null;
  seasons: number;
  episodes: number;
}

export interface WatchmodeTitleDetails extends WatchmodeTitle {
  similar_titles: number[];
  sources: WatchmodeSource[];
}

export interface WatchmodeRelease {
  id: number;
  title: string;
  type: string;
  imdb_id: string;
  tmdb_id: number;
  tmdb_type: string;
  season_number: number;
  poster_url: string;
  source_release_date: string;
  source_id: number;
  source_name: string;
  is_original: number;
}

export interface WatchmodeSeasonEpisode {
  id: number;
  title: string;
  episode_number: number;
  season_number: number;
  release_date: string;
  overview: string;
}
