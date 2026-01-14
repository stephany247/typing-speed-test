import type React from "react";

type ResultsProps = {
  wpm: number;
  accuracy: number;
  totalTyped: number;
  errorCount: number;
  isFirstTest: boolean;
  isNewHighScore: boolean;
  onRestart: () => void;
};

export default function Results({
  wpm,
  accuracy,
  totalTyped,
  errorCount,
  isFirstTest,
  isNewHighScore,
  onRestart,
}: ResultsProps) {
  let heading = "Test Complete!";
  let message = "Solid run. Keep pushing to beat your high score.";

  if (isFirstTest) {
    heading = "Baseline Established!";
    message =
      "You’ve set the bar. Now the real challenge begins—time to beat it.";
  } else if (isNewHighScore) {
    heading = "High Score Smashed!";
    message = "You’re getting faster. That was incredible typing.";
  }

  return (
    <section className="flex flex-col items-center text-center gap-6 mt-12">
      <div className="w-full flex flex-col items-center justify-center">
        {isNewHighScore ? (
          <img
            src="/images/icon-new-pb.svg"
            alt="icon completed"
            className="w-fit"
          />
        ) : (
          <img
            src="/images/icon-completed.svg"
            alt="icon completed"
            className="w-fit"
          />
        )}

        <img
          src="/images/pattern-star-2.svg"
          alt=""
          className="self-start size-5"
        />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold">{heading}</h2>

      {/* Message */}
      <p className="text-neutral-400">{message}</p>

      {/* Main result */}
      <div className="flex flex-col gap-4 mt-4 w-full">
        <ResultStat label="WPM:" value={wpm} />

        <ResultStat
          label="Accuracy:"
          value={`${accuracy}%`}
          isError={accuracy < 100}
        />

        <ResultStat
          label="Characters:"
          value={
            <span className="flex items-center gap-1">
              <span className="text-green-500">{totalTyped}</span>
              <span className="text-neutral-500">/</span>
              <span className="text-red-500">{errorCount}</span>
            </span>
          }
        />
      </div>

      {/* Action */}
      <button
        onClick={onRestart}
        className="mt-4 px-6 py-2 rounded-xl bg-neutral-0 text-neutral-900 font-semibold hover:bg-blue-500 transition"
      >
        Go again
      </button>

      <img
        src="/images/pattern-star-1.svg"
        alt=""
        className="self-end size-10"
      />
    </section>
  );
}

type ResultStatProps = {
  label: string;
  value: string | number | React.ReactNode;
  isError?: boolean;
};

function ResultStat({ label, value, isError = false }: ResultStatProps) {
  return (
    <div className="flex flex-col gap-3 border border-neutral-700 w-full p-4 rounded-lg text-left">
      <p className="text-neutral-400 text-lg">{label}</p>
      <p
        className={`text-2xl font-bold ${
          isError ? "text-red-500" : "text-neutral-0"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
