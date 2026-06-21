# Technical Requirements Document (TRD)

## 1. Informasi Dokumen
* **Nama Proyek:** Web Streaming Application (Frontend Edition)
* **Platform:** Web Application (Next.js App Router)
* **State Management:** Zustand (dengan Local Storage Persistence)
* **Data Provider:** Watchmode API
* **Status Dokumen:** Final Draft (Frontend Scope)

## 2. Arsitektur Sistem (System Architecture)
Aplikasi ini beroperasi menggunakan pola **BFF (Backend-for-Frontend)** internal tanpa ketergantungan pada *database* eksternal.

* **Client (Browser):** Merender UI dengan *Client Components* dan *React Server Components* (RSC). Mengelola *state* personalisasi pengguna (Watchlist, History) secara lokal di memori *browser*.
* **Next.js Server (Route Handlers):** Berfungsi sebagai *Proxy Server* untuk menyembunyikan `WATCHMODE_API_KEY`. Server menerima permintaan dari *client*, mem- *fetch* data ke Watchmode, dan mengembalikan JSON ke *client*.
* **Watchmode API:** *Single Source of Truth* untuk seluruh *metadata* konten (film, seri, *streaming sources*).

## 3. Spesifikasi Teknologi (Tech Stack)
* **Framework:** Next.js (App Router)
* **Bahasa:** TypeScript (Strict Mode)
* **Styling:** Tailwind CSS
* **Global State:** Zustand (untuk mengelola *Watchlist* dan *Watch History* secara global antar komponen).
* **Data Fetching:** Native `fetch` (didukung fitur *caching* Next.js) atau SWR untuk *client-side fetching*.

## 4. Struktur Direktori (Next.js App Router)
Struktur disesuaikan untuk memfasilitasi *state management* lokal.

```text
src/
├── app/                  # Routing utama aplikasi
│   ├── movies/           # Halaman eksplorasi film
│   ├── series/           # Halaman eksplorasi series
│   ├── profile/          # Halaman profil (Membaca data dari localStorage)
│   ├── api/              # Route handlers (Proxy ke Watchmode)
│   │   ├── trending/route.ts
│   │   ├── new-releases/route.ts
│   │   └── title/[id]/route.ts
│   ├── layout.tsx        # Root layout (Navbar, Footer)
│   └── page.tsx          # Halaman Beranda (Home)
├── components/           # Reusable UI components
│   ├── ui/               # Base components (Button, Badge, Skeleton)
│   └── shared/           # Complex components (MovieCard, HeroBanner)
├── store/                # Zustand global state
│   └── useUserStore.ts   # State untuk Watchlist & History (Persisted)
├── lib/                  # Utility functions
│   └── utils.ts          # Fungsi helper (cn, format-date)
├── types/                # Definisi TypeScript Interfaces/Types
│   └── watchmode.d.ts    # Definisi response Watchmode
└── styles/               # Global CSS