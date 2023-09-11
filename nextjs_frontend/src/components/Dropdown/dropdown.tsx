import { useState } from 'react';
import Styles from './dropdown.module.scss';

interface DropDownProps {
    title: string;
    options: string[];
    onChange: (title: string, option: string) => void;
}

export default function DropDown({
    title, options, onChange
}: DropDownProps) {
    const [selectedOption, setSelectedOption] = useState<string>("");

    function handleSelectOption(event: any) {
        const option: string = event.target.dataset.value;
        setSelectedOption(option);
        onChange(title, option);
    }

    return (
        <div className="hs-dropdown relative inline-flex">
            <button id="hs-dropdown-with-icons" type="button"
                    className="hs-dropdown-toggle py-3 px-4 inline-flex
                    justify-center items-center gap-2 rounded-md border
                    font-medium bg-secondary text-white shadow-sm align-middle
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    focus:ring-offset-white focus:white transition-all text-sm">
                {selectedOption === "" ? title : selectedOption}
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10.5L0.937822 -1.88258e-07L13.0622 8.71687e-07L7 10.5Z"
                    fill="white"/>
                </svg>
            </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] 
                            duration cursor-pointer
                            hs-dropdown-open:opacity-100 opacity-0 hidden
                            min-w-[15rem] bg-white shadow-md rounded-lg
                            p-2 mt-2 divide-y divide-gray-200 z-10">
                <div className="py-2 first:pt-0 last:pb-0 w-full">
                    {options.map((option) => (
                        <button key={option}
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