const API_KEY = process.env.WATCHMODE_API_KEY;
const BASE_URL = 'https://api.watchmode.com/v1';

export async function fetchFromWatchmode(endpoint: string, queryParams: Record<string, string> = {}) {
  if (!API_KEY) {
    throw new Error('WATCHMODE_API_KEY is not defined in environment variables');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('apiKey', API_KEY);
  
  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour by default
  });

  if (!response.ok) {
    throw new Error(`Watchmode API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
