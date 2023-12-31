import { useState } from "react";
import Styles from "./dropdown.module.scss";
import Image from "next/image";

interface DropDownProps {
  title: string;
  options: string[];
  onChange: (title: string, option: string) => void;
}

export default function DropDown({ title, options, onChange }: DropDownProps) {
  const [selectedOption, setSelectedOption] = useState<string>("Todos");

  function handleSelectOption(event: any) {
    const option: string = event.target.dataset.value;
    setSelectedOption(option);
    onChange(title, option);
  }

  return (
    <div className="hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-with-icons"
        type="button"
        className="hs-dropdown-toggle py-3 px-4 inline-flex
                    justify-center items-center gap-2 rounded-md border
                    font-light bg-secondary text-white shadow-sm align-middle
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-offset-white focus:white transition-all text-sm whitespace-nowrap">
        {selectedOption === "Todos" ? title : selectedOption}
        <Image src="/icons/arrow-down.svg" alt="arrow-down" width={16} height={16} />
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] 
                            duration cursor-pointer
                            hs-dropdown-open:opacity-100 opacity-0 hidden
                            min-w-[15rem] bg-white shadow-md rounded-lg
                            p-2 mt-2 divide-y divide-gray-200 z-10">
        <div className="py-2 first:pt-0 last:pb-0 w-full">
          {options.map((option, index) => (
            <button
              key={option + index}
              data-value={option}
              onClick={handleSelectOption}
              className={Styles.dropdownOption}>
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
