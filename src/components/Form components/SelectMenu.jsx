const SelectMenu = ({ id, label, value, onChange, options, helperText }) => {
    return (
        <div className="space-y-2">
            <label
                htmlFor={id}
                className="block text-sm font-semibold text-lime-700"
            >
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
            w-full rounded-xl border-2 border-lime-200 
            py-3 px-4 text-lime-800 
            hover:border-lime-300 focus:border-lime-500
          "
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {helperText && (
                <p className="text-xs text-gray-500 mt-1">
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default SelectMenu