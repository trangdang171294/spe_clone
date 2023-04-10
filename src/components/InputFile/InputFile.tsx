import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
    onChange?: (file?: File) => void;
}

function InputFile({ onChange }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = () => {
        fileInputRef.current?.click();
    };

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileSelected = event.target.files?.[0];
        if (fileSelected && (fileSelected?.size >= 1048576 || !fileSelected.type.includes('image'))) {
            toast.error('file không đúng định dạng');
        } else {
            onChange && onChange(fileSelected);
        }
    };

    return (
        <>
            <input
                ref={fileInputRef}
                onChange={onFileChange}
                onClick={(event) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (event.target as any).value = null;
                }}
                className="hidden"
                type="file"
                accept=".jpg,.jpeg,.png"
            />
            <button
                type="button"
                onClick={handleUpload}
                className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
            >
                Chọn ảnh
            </button>
        </>
    );
}

export default InputFile;
