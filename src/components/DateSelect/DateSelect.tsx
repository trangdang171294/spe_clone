import { range } from 'lodash';
import { useEffect, useState } from 'react';

interface Props {
    onChange?: (value: Date) => void;
    value?: Date;
    errorMessage?: string;
}

function DateSelect({ value, onChange, errorMessage }: Props) {
    const [date, setDate] = useState({
        date: value?.getDate() || 1,
        month: value?.getMonth() || 0,
        year: value?.getFullYear() || 1990,
    });

    const handleChage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value: valueSelect, name } = event.target;
        const newDate = {
            date: value?.getDate() || date.date,
            month: value?.getMonth() || date.month,
            year: value?.getFullYear() || date.year,
            [name]: Number(valueSelect),
        };
        setDate(newDate);
        onChange && onChange(new Date(newDate.year, newDate.month, newDate.date));
    };

    useEffect(() => {
        if (value) {
            setDate({
                date: value?.getDate(),
                month: value?.getMonth(),
                year: value?.getFullYear(),
            });
        }
    }, [value]);

    return (
        <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">Ngày sinh</div>
            <div className="sm:w-[80%] sm:pl-5">
                <div className="flex justify-between">
                    <select
                        onChange={handleChage}
                        name="date"
                        value={value?.getDate() || date.date}
                        className="h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange"
                    >
                        <option disabled>Ngày</option>
                        {range(1, 32).map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={handleChage}
                        name="month"
                        value={value?.getMonth() || date.month}
                        className="h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange"
                    >
                        <option disabled>Tháng</option>
                        {range(1, 13).map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={handleChage}
                        name="year"
                        value={value?.getFullYear() || date.year}
                        className="h-10 w-[32%] cursor-pointer rounded-sm border border-black/10 px-3 hover:border-orange"
                    >
                        <option disabled>Năm</option>
                        {range(1990, Number(new Date().getFullYear()) + 1).map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-1 min-h-[1.25rem] text-sm text-red-600">{errorMessage}</div>
            </div>
        </div>
    );
}

export default DateSelect;
