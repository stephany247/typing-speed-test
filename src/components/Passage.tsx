import { useEffect, useRef, useState } from "react";

type PassageProps = {
  text: string;
  hasStarted: boolean;
  typed: string;
  errors: number[];
  onStart: () => void;
  onRestart: () => void;
  onCharInput: (char: string) => void;
};

export default function Passage({
  text,
  onRestart,
  hasStarted,
  typed,
  errors,
  onStart,
  onCharInput,
}: PassageProps) {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef("");

  const [cursorStyle, setCursorStyle] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const el = charRefs.current[typed.length];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const parentRect = el.parentElement!.getBoundingClientRect();

    setCursorStyle({
      x: rect.left - parentRect.left,
      y: rect.top - parentRect.top,
      width: rect.width,
      height: rect.height,
    });
  }, [typed.length]);

  const handleMobileInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (!hasStarted) return;

    const value = e.currentTarget.value;
    const prev = prevValueRef.current;
    const lastChar = value[value.length - 1];

    // BACKSPACE
    if (value.length < prev.length) {
      onCharInput("BACKSPACE");
      prevValueRef.current = value;
      return;
    }

    if (lastChar) {
      onCharInput(lastChar);
    }

    prevValueRef.current = value;
  };

  return (
    <div className="pt-2 mt-4 relative">
      <div className="absolute top-0 left-0 h-px w-full bg-neutral-800">
        <div
          className="h-full bg-blue-500 transition-all duration-150"
          style={{ width: `${(typed.length / text.length) * 100}%` }}
        />
      </div>

      <input
        ref={inputRef}
        inputMode="text"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Typing input"
        className="fixed top-0 left-0 opacity-0"
        onInput={handleMobileInput}
      />
      <div
        className={`passage-scroll my-8 leading-relaxed max-h-140 overflow-y-auto transition-all duration-500 ease-in-out  ${
          !hasStarted ? "blur-sm opacity-40 scale-95" : ""
        }`}
      >
        <div
          className="relative inline-block"
          onClick={() => inputRef.current?.focus()}
        >
          {/* highlight */}
          <span
            className="absolute top-0 transition-transform duration-150 ease-linear bg-neutral-700 rounded-sm"
            style={{
              transform: `translate(${cursorStyle.x}px, ${cursorStyle.y}px)`,
              width: cursorStyle.width,
              height: cursorStyle.height,
            }}
          />

          {/* text */}
          <p className="relative text-[2rem] tracking-[0.4px] leading-[150%] md:text-[2.5rem]">
            {text.split("").map((char, index) => (
              <span
                key={index}
                ref={(el) => {
                  charRefs.current[index] = el;
                }}
                className={
                  errors.includes(index)
                    ? "text-red-500 underline underline-offset-10"
                    : typed[index]
                    ? "text-green-500"
                    : "text-neutral-400"
                }
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </p>
        </div>
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
        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center backdrop-blur-s">
          <button
            onClick={() => {
              onStart();
              inputRef.current?.focus();
            }}
            className="px-4 py-2.5 bg-blue-600 transition-colors duration-200 ease-in-out rounded-xl inline-flex items-center justify-center gap-2 text-lg font-semibold leading-[1.2] cursor-pointer focus:outline-2 focus:outline-offset-2 focus:outline-blue-600 hover:border-blue-400 hover:bg-blue-400"
          >
            Start Typing Test
          </button>
          <p
            onClick={() => {
              onStart();
              inputRef.current?.focus();
            }}
            className="text-lg tracking-[0.4px] leading-[136%]"
          >
            Or click the text and start typing
          </p>
        </div>
      )}
    </div>
  );
}
