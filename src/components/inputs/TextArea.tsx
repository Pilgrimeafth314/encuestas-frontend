import { useState } from 'react';

interface TextAreaProps {
  register: any;
  errors: any;
  label: string;
  value: string;
  handleChangeData: (value: string) => void;
}

export function TextArea({
  register,
  errors,
  label,
  value,
  handleChangeData,
}: TextAreaProps) {
  const [text, setInputValue] = useState<string>(value);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputValue(value);
    handleChangeData(value);
  };

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <textarea
          id={label}
          {...register(`${label}`, {
            required: {
              value: true,
              message: 'La descripción es obligatoria',
            },
          })}
          value={text}
          rows={4}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChange}
        />
        {errors[`${label}`] && (
          <span className="font-sans text-sm italic text-red-400 ">
            {errors[`${label}`].message}
          </span>
        )}
      </div>
    </div>
  );
}
