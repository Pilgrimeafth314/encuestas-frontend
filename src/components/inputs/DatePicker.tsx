import { useEffect, useState } from 'react';

interface DatePickerProps {
  register: any;
  label: string;
  value: string;
  required: boolean;
  onDateChange: (date: string) => void;
}

export function DatePicker({
  register,
  required,
  label,
  value,
  onDateChange,
}: DatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    value ? new Date(value).toISOString().split('T')[0].toString() : '',
  );

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedDate(value);
    onDateChange(value);
  };

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="date"
          {...register(`${label}`, {
            required: {
              value: required,
              message: 'Necesitas seleccionar una ' + label,
            },
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name={label}
          id={label}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
}
