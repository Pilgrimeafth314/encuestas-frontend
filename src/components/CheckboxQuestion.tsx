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
    <div className="m-5 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-md font-medium text-black">
        {question.required ? <span>*</span> : null} {question?.title}
      </h2>
      {errors[`${question.id}`] && (
        <span className="font-sans text-sm italic text-red-400 ">
          {errors[`${question.id}`].message}
        </span>
      )}
      <div className="mt-5 grid">
        {question?.options?.map(option => (
          <label key={option.id} className="text-sm">
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
              className="m-2 outline-none"
              //checked={selectedValues.has(option.id)}
              onChange={() => handleCheckboxChange(option.id!)}
            />
            {option.title}
          </label>
        ))}
      </div>
    </div>
  );
}
