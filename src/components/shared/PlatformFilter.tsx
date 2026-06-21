'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const PLATFORMS = [
  { id: '203', name: 'Netflix' },
  { id: '157', name: 'Hulu' },
  { id: '26', name: 'Prime Video' },
  { id: '387', name: 'HBO Max' },
  { id: '372', name: 'Disney+' },
];

export function PlatformFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSource = searchParams.get('source_ids') || '';

  const handleFilter = (sourceId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sourceId === currentSource) {
      params.delete('source_ids'); // toggle off
    } else {
      params.set('source_ids', sourceId);
    }
    // Update URL, triggering a server refetch
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {PLATFORMS.map((platform) => {
        const isActive = currentSource === platform.id;
        return (
          <button
            key={platform.id}
            onClick={() => handleFilter(platform.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              isActive 
                ? 'bg-red-600 text-white border-red-600' 
                : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:bg-neutral-800'
            }`}
          >
            {platform.name}
          </button>
        );
      })}
    </div>
  );
}
