import { useEffect, useRef, useState } from "react";

type DropdownProps = {
  value: string;
  options: string[];
  onSelect: (value: string) => void;
  disabled?: boolean;
};

export default function Dropdown({
  value,
  options,
  onSelect,
  disabled,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative text-sm w-full">
      <button
        type="button"
        disabled={disabled}
        aria-describedby={disabled ? "controls-disabled-hint" : undefined}
        aria-expanded={open ? "true" : "false"}
        aria-haspopup="listbox"
        onClick={() => {
          if (disabled) return;
          setOpen((prev) => !prev);
        }}
        className={`flex items-center justify-center gap-2.5 border border-neutral-500 px-3 py-2 rounded-lg text-neutral-0 text-sm md:text-base w-full capitalize 
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {value}
        <img
          src="/images/icon-down-arrow.svg"
          alt="indicator arrow"
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && !disabled && (
        <ul className="absolute right-0 mt-2 w-full bg-neutral-800 rounded-lg shadow-lg divide-y divide-neutral-700 z-10">
          {options.map((option) => {
            const isActive = option === value;

            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    if (disabled) return;
                    onSelect(option);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-2 py-2 hover:bg-neutral-700 text-left capitalize"
                >
                  <span
                    className={`h-5 w-5 rounded-full border flex items-center justify-center
                  ${
                    isActive
                      ? "bg-blue-400 border-transparent"
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
