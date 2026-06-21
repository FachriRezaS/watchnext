'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
        <Menu className="w-6 h-6 text-white" />
        <span className="sr-only">Open Menu</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex justify-between items-center mb-12">
            <span className="text-xl font-bold text-white tracking-tight">Menu</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6 text-white" />
              <span className="sr-only">Close Menu</span>
            </Button>
          </div>
          
          <nav className="flex flex-col gap-6 text-2xl font-semibold">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">Home</Link>
            <Link href="/movies" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">Movies</Link>
            <Link href="/series" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">Series</Link>
            <Link href="/genres" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">Genres</Link>
            <Link href="/search" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors mt-6 pt-6 border-t border-neutral-800">Search</Link>
            <Link href="/profile" onClick={() => setIsOpen(false)} className="hover:text-red-500 transition-colors">Profile</Link>
          </nav>
        </div>
      )}
    </div>
  );
}
