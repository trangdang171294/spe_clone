import { InputHTMLAttributes } from 'react';
import type { UseFormRegister, RegisterOptions } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    classNameInput?: string;
    classNameError?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register?: UseFormRegister<any>;
    rules?: RegisterOptions;
}

export default function Input({
    errorMessage,
    className,
    name,
    register,
    rules,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    ...rest
}: Props) {
    const registerResult = register && name ? register(name, rules) : {};
    return (
        <div className={className}>
            <input {...rest} className={classNameInput} {...registerResult} />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    );
}
