import { useState } from 'react';

interface TextInputProps {
  register: any;
  errors: any;
  label: string;
  value: string;
  handleChangeData: (value: string) => void;
}

export function TextInput({
  register,
  errors,
  label,
  value,
  handleChangeData,
}: TextInputProps) {
  const [title, setTitle] = useState<string>(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
    handleChangeData(value);
  };

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          {...register(`${label}`, {
            required: {
              value: true,
              message: 'El titulo es obligatorio.',
            },
          })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name={label}
          id={label}
          placeholder=" "
          value={title}
          onChange={handleChange}
          autoComplete="false"
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
