'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlayTrailerButtonProps {
  url: string;
}

export function PlayTrailerButton({ url }: PlayTrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!url) return null;

  // Convert "https://www.youtube.com/watch?v=XYZ" to "https://www.youtube.com/embed/XYZ"
  // If it's already an embed link, this logic should handle it gracefully, but usually it's watch?v=
  let embedUrl = url;
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname.includes('youtube.com') && parsedUrl.pathname === '/watch') {
      const videoId = parsedUrl.searchParams.get('v');
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
    } else if (parsedUrl.hostname === 'youtu.be') {
      const videoId = parsedUrl.pathname.slice(1);
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  } catch (error) {
    // If URL parsing fails, stick to the original URL
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        className="bg-red-600 hover:bg-red-700 font-semibold gap-2"
      >
        <Play className="w-4 h-4 fill-current" />
        Play Trailer
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-5xl bg-black rounded-lg shadow-2xl overflow-hidden aspect-video z-10 border border-neutral-800 animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Video Player */}
            <iframe
              src={embedUrl}
              title="Trailer"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
