# WatchNext - Web Streaming Application

WatchNext is a modern web application for discovering movies and TV series, tracking your watchlist, and watching cinematic trailers. Built with a sleek, cinematic design language using **Next.js (App Router)** and **Tailwind CSS**.

## ✨ Features

- **Dual API Provider (Adapter Pattern)**: Seamlessly toggle between **Watchmode API** and **TMDB API** with zero UI changes. Data is mapped automatically!
- **Cinematic In-App Trailer Player**: Watch YouTube trailers directly within the app via a sleek blur-backdrop modal, without being redirected.
- **Global Search & Filtering**: Fast debounce search functionality and platform-specific filters (Netflix, Hulu, Prime Video, etc.).
- **Genre Exploration**: Browse massive libraries categorized by genres (Action, Drama, Anime, etc.).
- **Recommendations**: "You Might Also Like" sections dynamically generated based on your current viewing context.
- **Local State Watchlist**: Save your favorite movies and series to your profile. Powered by **Zustand** with local storage persistence.
- **Backend-for-Frontend (BFF)**: Next.js API route handlers act as a proxy to keep API keys secure.

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn UI components
- **State Management:** Zustand (with Local Storage middleware)
- **Icons:** Lucide React

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2. Environment Setup
Rename `.env.example` to `.env` (or create a new `.env` file) and fill in your API keys:
```env
# Get this from https://api.watchmode.com/
WATCHMODE_API_KEY=your_watchmode_api_key_here

# Get this from https://developer.themoviedb.org/
TMDB_API_KEY=your_tmdb_api_key_here

# Choose which API to use: 'tmdb' or 'watchmode'
ACTIVE_API_PROVIDER=tmdb
```

### 3. Run Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📐 Architecture Note (Adapter Pattern)
This project uses an Adapter Pattern (`src/lib/api-service.ts`) to abstract the data layer. 
When `ACTIVE_API_PROVIDER` is set to `tmdb`, the application utilizes `src/lib/tmdb.ts` to map TMDB's raw JSON responses into the exact interface expected by the Watchmode-based frontend UI. This allows for seamless transitions between different data providers without breaking React components.
