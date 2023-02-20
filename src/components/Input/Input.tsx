import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps {
    type: React.HTMLInputTypeAttribute;
    errorMessage?: string;
    placeholder?: string;
    className?: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    rules?: RegisterOptions;
    autoComplete?: string;
}

function Input(props: InputProps) {
    const { type, errorMessage, placeholder, className, name, register, rules, autoComplete } = props;
    return (
        <div className={className}>
            <input
                type={type}
                className="w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm"
                placeholder={placeholder}
                autoComplete={autoComplete?.toString()}
                {...register(name, rules)}
            />
            <div className="mt-1 min-h-[1rem] text-sm text-red-600">{errorMessage}</div>
        </div>
    );
}

export default Input;
