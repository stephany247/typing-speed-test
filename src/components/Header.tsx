type HeaderProps = {
  bestWPM: number | null;
  onOpenHistory: () => void;
};

export default function Header({ bestWPM, onOpenHistory }: HeaderProps) {
  return (
    <header className="flex items-center justify-between pb-4">
      <img
        src="/images/logo-small.svg"
        alt="Typing Speed Test logo"
        aria-hidden="true"
        className="md:hidden"
      />
      <img
        src="/images/logo-large.svg"
        alt="Typing Speed Test logo"
        aria-hidden="true"
        className="hidden md:block"
      />
      <h1 className="sr-only">Typing Speed Test</h1>

      <div className="inline-flex items-center divide-x divide-neutral-700">
        {/* History button */}
        <div className="pr-3 md:pr-4">
          <button
            type="button"
            onClick={onOpenHistory}
            className="
        p-2 bg-neutral-800 rounded-full
        inline-flex items-center justify-center
        hover:bg-neutral-700 transition
        md:rounded-xl md:px-4 md:py-2.5 cursor-pointer
      "
            aria-label="Open history"
          >
            <img src="/images/icon-history.svg" alt="" className="size-6" />
            <span className="hidden md:block ml-2">History</span>
          </button>
        </div>

        {/* Personal best */}
        <div className="pl-3 md:pl-4 flex gap-2.5 items-center">
          <img src="/images/icon-personal-best.svg" alt="Personal best icon" />
          <p
            aria-live="polite"
            className="inline-flex gap-1 text-sm md:text-base"
          >
            <span className="text-neutral-400 md:hidden">Best:</span>
            <span className="hidden md:block text-neutral-400">
              Personal best:
            </span>
            <span>{bestWPM ?? "—"} WPM</span>
          </p>
        </div>
      </div>
    </header>
  );
}
