type PassageProps = {
  text: string;
  onRestart: () => void;
};

export default function Passage({ text, onRestart }: PassageProps) {
  return (
    <div className="mt-8">
      <div className="my-8 rounded-lg bg-neutral-800 p-6 leading-relaxed">
        <p className="text-3xl tracking-[0.4px] leading-[136%]">{text}</p>
      </div>
      <div className="pt-6 flex justify-center border-t border-neutral-700">
        <button
          onClick={onRestart}
          className="px-4 py-2.5 bg-neutral-800 rounded-xl inline-flex items-center justify-center gap-2 text-lg font-semibold leading-[1.2]"
        >
          Restart Test <img src="/images/icon-restart.svg" alt="restart icon" />
        </button>
      </div>
    </div>
  );
}
