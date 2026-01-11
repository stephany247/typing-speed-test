type PassageProps = {
  text: string;
};

export default function Passage({ text }: PassageProps) {
  return (
    <div className="mt-8 rounded-lg bg-neutral-800 p-6 leading-relaxed">
      <p className="text-3xl tracking-[0.4px] leading-[136%]">{text}</p>
    </div>
  );
}
