import { forwardRef, InputHTMLAttributes, useState } from 'react';

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    classNameInput?: string;
    classNameError?: string;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function InputNumberInner(
    {
        errorMessage,
        className,
        classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
        classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
        onChange,
        value = '',
        ...rest
    },
    ref,
) {
    const [localValue, setLocalValue] = useState<string>(value as string);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (/^\d+$/.test(value) || value === '') {
            // onChange callback tu ben ngoai truyen vao props
            onChange && onChange(event);
            // update localValue state
            setLocalValue(value);
        }
    };
    return (
        <div className={className}>
            <input
                {...rest}
                className={classNameInput}
                value={value || localValue}
                onChange={(e) => handleChange(e)}
                ref={ref}
            />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    );
});

export default InputNumber;
