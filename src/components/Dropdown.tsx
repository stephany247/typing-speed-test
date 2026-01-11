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
        <ul className="absolute right-0 mt-2 w-full bg-neutral-900 rounded shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              className="px-3 py-2 hover:bg-neutral-700 cursor-pointer"
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
