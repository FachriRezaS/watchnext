export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black py-8 md:py-12 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-white">WatchNext</span>
        </div>
        <p className="text-sm text-neutral-400 text-center md:text-left">
          &copy; {new Date().getFullYear()} WatchNext. Data provided by Watchmode API.
        </p>
      </div>
    </footer>
  );
}
