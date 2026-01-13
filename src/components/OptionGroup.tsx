type OptionGroupProps = {
  value: string;
  options: string[];
  onSelect: (value: string) => void;
};

export default function OptionGroup({
  value,
  options,
  onSelect,
}: OptionGroupProps) {
  return (
    <div className="flex gap-2 text-sm">
      {options.map((option) => {
        const isActive = option === value;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border capitalize
              transition-colors
              ${
                isActive
                  ? "border-blue-400 text-blue-400"
                  : "border-neutral-500 hover:bg-neutral-700"
              }
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
