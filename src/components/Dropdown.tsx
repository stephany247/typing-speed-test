import { useState } from "react";

type DropdownProps = {
  value: string;
  options: string[];
  onSelect: (value: string) => void;
};

export default function Dropdown({ value, options, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative text-sm w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center gap-2.5 border border-neutral-500 px-3 py-2 rounded-lg text-neutral-0 w-full capitalize"
      >
        {value}
        <img src="/images/icon-down-arrow.svg" alt="" />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-full bg-neutral-800 rounded shadow-lg divide-y divide-neutral-700 z-10">
          {options.map((option) => {
            const isActive = option === value;

            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2 hover:bg-neutral-700 text-left capitalize"
                >
                  <span
                    className={`h-5 w-5 rounded-full border flex items-center justify-center
                  ${
                    isActive
                      ? "bg-blue-600 border-transparent"
                      : "border-neutral-0"
                  }`}
                  >
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-neutral-900" />
                    )}
                  </span>

                  <span>{option}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
