import { useState } from 'react';
import { type Question } from '../types.d';

interface Props {
  register: any;
  errors: any;
  question: Question;
}

export function CheckboxGroup({ register, errors, question }: Props) {
  const [selectedValues, setSelectedValues] = useState<Set<string>>(new Set());

  const handleCheckboxChange = (value: string) => {
    const updatedSelectedOptions = new Set(selectedValues);
    if (updatedSelectedOptions.has(value)) {
      updatedSelectedOptions.delete(value);
    } else {
      updatedSelectedOptions.add(value);
    }

    setSelectedValues(updatedSelectedOptions);
  };

  return (
    <div className="mb-6 bg-white p-5 rounded-md shadow-md">
      <label htmlFor="ans" className="block text-14 text-black-500 mb-2">
        {question.required ? <span>*</span> : null} {question?.title}
      </label>
      {errors[`${question.id}`] && (
        <span className="font-sans text-sm italic text-red-400 ">
          {errors[`${question.id}`].message}
        </span>
      )}
      <div className="flex flex-col gap-2">
        {question?.options?.map(option => (
          <label
            key={option.id}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            <input
              type="checkbox"
              {...register(`${question.id}`, {
                required: {
                  value: question.required,
                  message: 'Debes seleccionar al menos una opción',
                },
              })}
              name={question.id}
              value={option.id}
              id={option.id}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={() => handleCheckboxChange(option.id!)}
            />
            <span className="ml-2">{option.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
