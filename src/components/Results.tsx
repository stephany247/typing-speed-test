import type React from "react";
import Confetti from "./Confetti";

type ResultsProps = {
  wpm: number;
  accuracy: number;
  totalTyped: number;
  errorCount: number;
  isFirstTest: boolean;
  isNewHighScore: boolean;
  onRestart: () => void;
  onShare: () => void;
};

export default function Results({
  wpm,
  accuracy,
  totalTyped,
  errorCount,
  isFirstTest,
  isNewHighScore,
  onRestart,
  onShare,
}: ResultsProps) {
  let heading = "Test Complete!";
  let message = "Solid run. Keep pushing to beat your high score.";
  let buttonText = "Go Again";

  if (isFirstTest) {
    heading = "Baseline Established!";
    message =
      "You’ve set the bar. Now the real challenge begins—time to beat it.";
    buttonText = "Beat this scrore";
  } else if (isNewHighScore) {
    heading = "High Score Smashed!";
    message = "You’re getting faster. That was incredible typing.";
    buttonText = "Beat this scrore";
  }

  return (
    <section
      role="region"
      aria-labelledby="results-heading"
      aria-live="polite"
      className={`flex flex-col items-center text-center gap-6  ${
        isNewHighScore ? "my-12 md:my-20 lg:my-16" : "mt-12 md:mt-20 lg:mt-16"
      }`}
    >
      {isNewHighScore && <Confetti fire />}
      <div className="relative w-full flex flex-col items-center justify-center">
        {isNewHighScore ? (
          <img
            src="/images/icon-new-pb.svg"
            alt="New personal best achieved"
            aria-hidden="true"
            className="w-fit"
          />
        ) : (
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center -z-20">
              <span className="ring-element ring-a" />
              <span className="ring-element ring-b" />
            </div>

            <img
              src="/images/icon-completed.svg"
              alt="icon completed"
              aria-hidden="true"
              className="relative z-10 w-fit"
            />
          </div>
        )}
        {!isNewHighScore && (
          <img
            src="/images/pattern-star-2.svg"
            alt=""
            aria-hidden="true"
            className="absolute bottom-1/4 left-4 size-5"
          />
        )}
      </div>
      <div className="space-y-2.5 mt-8">
        {/* Heading */}
        <h2
          id="results-heading"
          className="text-2xl font-semibold md:text-4xl md:font-bold"
        >
          {heading}
        </h2>

        {/* Message */}
        <p className="text-neutral-400 md:text-lg">{message}</p>
      </div>
      {/* Main result */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-5 md:mt-4 w-full max-w-xl md:mb-8">
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
      <div className="inline-grid md:grid-cols-2 gap-x-4 max-w-lg gap-y-2 justify-center w-full pb-12 md:pb-20 lg:pb-16">
        <button
          type="button"
          onClick={onRestart}
          className="mt-4 px-4 py-2.5 rounded-xl bg-neutral-0 text-neutral-900 font-semibold hover:bg-neutral-0/90 focus:outline-2 focus:outline-offset-2 focus:outline-blue-400 transition-colors duration-200 ease-in-out flex-1 inline-flex gap-2 items-center justify-center cursor-pointer"
        >
          {buttonText}
          <img src="/images/icon-undo.svg" alt="Undo icon" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={onShare}
          className="mt-4 px-4 py-2.5 rounded-xl bg-blue-500 text-neutral-0 font-semibold hover:bg-blue-400/90 focus:outline-2 focus:outline-offset-2 focus:outline-blue-400 transition-colors duration-200 ease-in-out flex-1 inline-flex gap-2 items-center justify-center cursor-pointer"
        >
          Share Result
          <img
            src="/images/icon-share.svg"
            alt="Share icon"
            aria-hidden="true"
            className="size-5"
          />
        </button>
      </div>
      {!isNewHighScore && (
        <img
          src="/images/pattern-star-1.svg"
          alt=""
          aria-hidden="true"
          className="self-end size-10"
        />
      )}
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
