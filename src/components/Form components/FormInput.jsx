import { Lock } from "lucide-react";

const FormInput = (
    { type = 'text', label, value, onChange, placeholder, error, disabled = false, icon: Icon, ...props }) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-lime-700">
                    {label}
                </label>
            )}
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`
              w-full rounded-xl border-2 py-3 px-4 
              transition-all duration-300
              ${disabled
                            ? 'border-lime-200 bg-lime-50/50 text-lime-800 cursor-not-allowed'
                            : 'border-lime-200 hover:border-lime-300 focus:border-lime-500'}
              ${error ? 'border-red-500' : ''}
            `}
                    {...props}
                />
                {Icon && !disabled && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Icon color='#84cc16' />
                    </div>
                )}
                {disabled && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Lock color='#84cc16' />
                    </div>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-xs mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormInput;