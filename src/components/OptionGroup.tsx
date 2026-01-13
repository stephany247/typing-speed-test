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
              transition-colors cursor-pointer focus:outline-1 focus:outline-offset-2 focus:outline-blue-400 hover:border-blue-400 hover:text-blue-400 duration-200 ease-in-out
              ${
                isActive
                  ? "border-blue-400 focus:border-blue-400 text-blue-400"
                  : "border-neutral-500 focus:border-neutral-0"
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
