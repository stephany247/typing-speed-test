export default function Header() {
  const bestWPM = 92;
  return (
    <header className="flex items-center justify-between pb-4">
      <img src="/images/logo-small.svg" alt="App Logo" />
      <div className="flex gap-2.5 items-center">
        <img src="/images/icon-personal-best.svg" alt="Personal best icon" />
        <p>
          <span className="text-neutral-400">Best: </span> {bestWPM} WPM
        </p>
      </div>
    </header>
  );
}
