// type PassageProps = {
//   text: string;
//   onRestart: () => void;
//   hasStarted?: boolean;
// };

import { useEffect, useRef, useState } from "react";

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
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
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

  return (
    <div className="mt-8 relative">
      <div
        className={`my-8 leading-relaxed max-h-140 overflow-y-auto transition-all duration-500 ease-in-out  ${
          !hasStarted ? "blur-sm opacity-40 scale-95" : ""
        }`}
      >
        <div className="relative inline-block">
          {/* highlight */}
          <span
            className="absolute top-0 transition-transform duration-200 ease-out bg-neutral-700 rounded-sm"
            style={{
              transform: `translate(${cursorStyle.x}px, ${cursorStyle.y}px)`,
              width: cursorStyle.width,
              height: cursorStyle.height,
            }}
          />

          {/* text */}
          <p className="relative text-3xl tracking-[0.4px] leading-[136%]">
            {text.split("").map((char, index) => (
              <span
                key={index}
                ref={(el) => {
                  charRefs.current[index] = el;
                }}
                className={
                  errors.includes(index)
                    ? "text-red-500"
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
