type PassageProps = {
  text: string;
  onRestart: () => void;
  hasStarted?: boolean;
};

export default function Passage({ text, onRestart, hasStarted }: PassageProps) {
  return (
    <div className="mt-8 relative">
      <div className="my-8 rounded-lg bg-neutral-800 p-6 leading-relaxed max-h-140 overflow-y-auto">
        <p className="text-3xl tracking-[0.4px] leading-[136%]">{text}</p>
      </div>

      {hasStarted ? (
        <div className="pt-6 flex justify-center border-t border-neutral-700">
          <button
            onClick={onRestart}
            className="px-4 py-2.5 bg-neutral-800 rounded-xl inline-flex items-center justify-center gap-2 text-lg font-semibold leading-[1.2]"
          >
            Restart Test{" "}
            <img src="/images/icon-restart.svg" alt="restart icon" />
          </button>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center backdrop-blur-sm">
          <button className="px-4 py-2.5 bg-blue-600 rounded-xl inline-flex items-center justify-center gap-2 text-lg font-semibold leading-[1.2]">
            Start Typing Test
          </button>
          <p className="text-lg tracking-[0.4px] leading-[136%]">
            Or click the text and start typing
          </p>
        </div>
      )}
    </div>
  );
}
