import { ChevronDown } from "lucide-react";

const SelectMenu = ({ id, label, value, onChange, options, helperText }) => (
    <div className="space-y-1">
        <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
            {label}
        </label>
        <div className="relative group">
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-0 py-2.5 pl-3 pr-10 
            text-gray-900 
            ring-1 ring-inset ring-gray-300 
            focus:ring-2 focus:ring-lime-500 
            sm:text-sm sm:leading-6 
            appearance-none 
            transition-all duration-300 
            hover:ring-gray-400 
            group-hover:ring-gray-400"
            >
                <option value="" className="text-gray-400">Select an option</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <ChevronDown
                    className="h-5 w-5 text-gray-400 transition-all duration-300 
              group-hover:text-gray-600 
              group-focus-within:text-lime-500"
                />
            </div>
            {!value && (
                <div className="absolute top-full right-0 mt-1 text-xs italic text-red-500">
                    Required
                </div>
            )}
            {helperText && (
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {helperText}
                </div>
            )}
        </div>
    </div>
);

export default SelectMenu;