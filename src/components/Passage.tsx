// type PassageProps = {
//   text: string;
//   onRestart: () => void;
//   hasStarted?: boolean;
// };

type PassageProps = {
  text: string;
  hasStarted: boolean;
  typed: string;
  errors: number[];
  onStart: () => void;
  onRestart: () => void;
};

export default function Passage({
  text,
  onRestart,
  hasStarted,
  typed,
  errors,
  onStart,
}: PassageProps) {
  return (
    <div className="mt-8 relative">
      <div className="my-8 rounded-lg bg-neutral-800 p-6 leading-relaxed max-h-140 overflow-y-auto">
        <p className="text-3xl tracking-[0.4px] leading-[136%] text-wrap">
          {text.split("").map((char, index) => {
            const typedChar = typed[index];
            const isError = errors.includes(index);
            const isActive = hasStarted && index === typed.length;

            let className = "text-neutral-400";

            if (typedChar) {
              className = isError ? "text-red-500 underline underline-offset-8" : "text-green-500";
            } else if (isActive) {
              className = "bg-neutral-700 text-neutral-400 rounded-sm px-px";
            }

            return (
              <span key={index} className={className}>
                {char === " " ? " " : char}
              </span>
            );
          })}
        </p>
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
          <button
            onClick={onStart}
            className="px-4 py-2.5 bg-blue-600 transition-colors duration-200 ease-in-out rounded-xl inline-flex items-center justify-center gap-2 text-lg font-semibold leading-[1.2] cursor-pointer focus:outline-1 focus:outline-offset-2 focus:outline-blue-400 hover:border-blue-400"
          >
            Start Typing Test
          </button>
          <p
            onClick={onStart}
            className="text-lg tracking-[0.4px] leading-[136%]"
          >
            Or click the text and start typing
          </p>
        </div>
      )}
    </div>
  );
}
