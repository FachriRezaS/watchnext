import Link from 'next/link';
import { Film, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Film className="h-6 w-6 text-red-500" />
          <span className="text-lg font-bold tracking-tight text-white hidden sm:inline-block">
            WatchNext
          </span>
        </Link>
        <div className="flex gap-6 text-sm font-medium flex-1">
          <Link href="/movies" className="transition-colors hover:text-white text-neutral-400">Movies</Link>
          <Link href="/series" className="transition-colors hover:text-white text-neutral-400">Series</Link>
          <Link href="/genres" className="transition-colors hover:text-white text-neutral-400">Genres</Link>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <Button asChild variant="secondary" size="sm" className="rounded-full">
            <Link href="/profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
