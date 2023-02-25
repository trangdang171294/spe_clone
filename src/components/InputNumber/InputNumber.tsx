import { forwardRef, InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    errorMessage?: string;
    classNameInput?: string;
    classNameError?: string;
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
    {
        errorMessage,
        className,
        classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
        classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
        onChange,
        ...rest
    },
    ref,
) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (/^\d+$/.test(value) || value === '') {
            // onChange callback tu ben ngoai truyen vao props
            onChange && onChange(event);
            // update localValue state
            // setLocalValue(value);
        }
    };
    return (
        <div className={className}>
            <input {...rest} className={classNameInput} onChange={(e) => handleChange(e)} ref={ref} />
            <div className={classNameError}>{errorMessage}</div>
        </div>
    );
});

export default InputNumber;
