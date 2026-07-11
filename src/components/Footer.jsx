export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 26 26">
            <circle cx="13" cy="13" r="10.5" className="ink-stroke" strokeWidth="1.8" />
            <path d="M13 6 L13 13 L18 16" className="ink-stroke" strokeWidth="1.8" />
          </svg>
          <span className="font-display font-semibold">Inkwell</span>
          <span className="text-ink-faint text-sm">— coffee, drawn by hand</span>
        </div>
        <p className="text-ink-faint text-xs">
          Open 7am – 6pm daily · No two cups sketched the same
        </p>
      </div>
    </footer>
  );
}
