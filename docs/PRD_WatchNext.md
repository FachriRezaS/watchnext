# Product Requirements Document (PRD)

## 1. Informasi Dokumen
*   **Nama Proyek:** Web Streaming Application
*   **Platform:** Web Application (Responsive Desktop & Mobile)
*   **Model Arsitektur:** Serverless Frontend (Next.js) + BaaS (Supabase) + 3rd Party API (Watchmode)
*   **Status Dokumen:** Draft / Perencanaan Awal

## 2. Ringkasan Produk (Product Overview)
### 2.1 Tujuan Produk
Membangun aplikasi web *streaming/content discovery* yang memungkinkan pengguna mencari film dan *series*, melihat ketersediaan *platform streaming* resmi, serta menyimpan riwayat tontonan dan daftar simpanan (*watchlist*) dalam profil yang terpersonalisasi.

### 2.2 Target Pengguna
Pengguna internet yang mencari informasi terpusat mengenai film dan *series* terbaru, *trending*, serta ingin melacak daftar tontonan mereka lintas *platform* (Netflix, Disney+, dll).

## 3. Spesifikasi Teknologi
*   **Frontend Framework:** Next.js (*App Router*).
*   **Bahasa Pemrograman:** TypeScript.
*   **Styling:** Tailwind CSS.
*   **Authentication & Database:** Supabase (PostgreSQL, Supabase Auth).
*   **Content Provider:** Watchmode API.
*   **Version Control:** Git.

## 4. Struktur Navigasi & Sitemap
*   `/` (Beranda)
*   `/movies` (Eksplorasi Film)
*   `/movies/[id]` (Detail Film)
*   `/series` (Eksplorasi Series)
*   `/series/[id]` (Detail Series, mencakup *Seasons* & *Episodes*)
*   `/genres` (Daftar Kategori Genre)
*   `/profile` (Informasi User, Watchlist, Riwayat)
*   `/login` & `/register` (Autentikasi)

## 5. Kebutuhan Fungsional (Functional Requirements)

### 5.1 Modul Autentikasi (Supabase Auth)
*   **Pengguna Baru:** Dapat mendaftar menggunakan email dan *password*.
*   **Pengguna Lama:** Dapat *login* dan *logout*.
*   **Sesi:** Aplikasi harus mempertahankan sesi pengguna (*persistent login*) menggunakan token dari Supabase.
*   **Akses Kontrol:** Halaman `/profile` dan fitur penambahan *watchlist* hanya bisa diakses oleh *user* yang sudah *login*.

### 5.2 Modul Beranda (Home)
*   **Hero Banner:** Menampilkan 1-3 konten paling *trending* minggu ini, lengkap dengan poster besar, judul, dan sinopsis singkat.
*   **Lanjutkan Menonton:** Menampilkan *carousel* atau baris konten berdasarkan data dari tabel `watch_history` milik *user* yang sedang *login*. (Disembunyikan jika belum *login* atau riwayat kosong).
*   **Rilis Terbaru:** Menampilkan baris film/series terbaru berdasarkan tanggal rilis.
*   **Paling Banyak Ditonton:** Menampilkan baris konten terpopuler.

### 5.3 Modul Eksplorasi Konten (Movies & Series)
*   **Pemisahan Halaman:** Film dan Series memiliki halaman terpisah.
*   **Tampilan Grid:** Menampilkan daftar konten dalam bentuk *grid* poster.
*   **Detail Konten:** Saat diklik, masuk ke halaman detail yang menampilkan:
    *   Judul, Poster, Sinopsis, Rating, dan Tahun Rilis.
    *   Daftar *platform streaming* resmi (data *sources* dari Watchmode).
    *   **Khusus Series:** Terdapat navigasi untuk melihat daftar episode per *season*.
*   **Tombol Aksi:** Tombol "Tambahkan ke Watchlist" dan "Tandai Sedang Ditonton".

### 5.4 Modul Kategori (Genre)
*   Menampilkan daftar genre.
*   Saat salah satu genre diklik, sistem memuat campuran film dan *series* yang memiliki label genre tersebut.

### 5.5 Modul Profil Pengguna
*   Menampilkan informasi dasar *user* (Email/Nama).
*   **Watchlist:** Menampilkan *grid* film/series yang disimpan untuk ditonton nanti.
*   **Riwayat Tontonan:** Daftar *item* yang sudah ditandai.

## 6. Kebutuhan Non-Fungsional (Non-Functional Requirements)
*   **Keamanan API:** Watchmode API Key **tidak boleh** diletakkan di sisi *client*. Semua pemanggilan data dari Watchmode harus dirutekan melalui internal API Next.js.
*   **Performa:** Penggunaan gambar (*thumbnail/poster*) harus dioptimasi (menggunakan komponen `<Image/>` bawaan Next.js).
*   **Responsivitas:** UI harus beradaptasi secara mulus mulai dari layar ponsel hingga monitor *desktop*.

## 7. Arsitektur Database (High-Level Schema Supabase)

| Nama Tabel | Deskripsi | Kolom Utama |
| :--- | :--- | :--- |
| `users` | Dikelola otomatis oleh Supabase Auth. | `id` (UUID), `email`, `created_at` |
| `profiles` | Data tambahan user. | `id` (FK ke users.id), `display_name`, `avatar_url` |
| `watchlist` | Menyimpan daftar tontonan user. | `id`, `user_id` (FK), `watchmode_title_id` (Integer), `title_type` (movie/tv), `added_at` |
| `watch_history`| Mencatat apa yang sedang/sudah ditonton. | `id`, `user_id` (FK), `watchmode_title_id`, `progress_status` (watching/completed), `updated_at` |

## 8. Integrasi Watchmode API Proxy (Next.js API Routes)

| Internal Next.js Route | Tujuan Watchmode API Endpoint | Parameter Penting |
| :--- | :--- | :--- |
| `GET /api/trending` | `/releases/` | `sort_by=popularity_desc` |
| `GET /api/new-releases` | `/releases/` | `sort_by=release_date_desc` |
| `GET /api/movies` | `/list-titles/` | `types=movie` |
| `GET /api/series` | `/list-titles/` | `types=tv` |
| `GET /api/title/[id]` | `/title/[id]/details/` | `append_to_response=sources` |
| `GET /api/title/[id]/episodes`| `/title/[id]/episodes/` | - |

## 9. Fase Rilis MVP (Minimum Viable Product)
*   **Tahap 1:** Konfigurasi proyek Next.js + Tailwind, *setup* Supabase Auth, dan desain *database schema*.
*   **Tahap 2:** Pembuatan *Route Handlers* Next.js untuk memanggil Watchmode API dengan aman.
*   **Tahap 3:** Pembuatan antarmuka UI utama (Home, Movies, Series, Detail Page).
*   **Tahap 4:** Penyatuan fitur (Integrasi tombol "Add to Watchlist" yang menembak data ke Supabase).