type HeaderProps = {
  bestWPM: number | null;
  onOpenHistory: () => void;
};

export default function Header({ bestWPM, onOpenHistory }: HeaderProps) {
  return (
    <header className="flex items-center justify-between pb-4">
      <img src="/images/logo-small.svg" alt="App Logo" className="md:hidden" />
      <img
        src="/images/logo-large.svg"
        alt="App Logo"
        className="hidden md:block"
      />

      <div className="inline-flex gap-2 items-center">
        <button
          onClick={onOpenHistory}
          className="px-4 py-2.5 bg-neutral-800 rounded-xl inline-flex items-center justify-center gap-2 leading-[1.2]"
        >
          History
          <img
            src="/images/icon-history.svg"
            alt="History icon"
            className="size-6"
          />
        </button>
        <div className="flex gap-2.5 items-center">
          <img src="/images/icon-personal-best.svg" alt="Personal best icon" />
          <p>
            <span className="text-neutral-400">Best: </span>
            {bestWPM ?? "—"} WPM
          </p>
        </div>
      </div>
    </header>
  );
}
