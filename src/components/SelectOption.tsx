import { useState } from 'react';
import { type Question } from '../types.d';

interface Props {
  register: any;
  errors: any;
  question: Question;
}

export function SelectOption({ register, errors, question }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="mb-6 bg-white p-5 rounded-md shadow-md">
      <label className="block text-14 text-black-500 mb-2" htmlFor="occupation">
        <span>
          {question.required ? <span>*</span> : null} {question?.title}
        </span>
        {errors[`${question.id}`] && (
          <span className="font-sans text-sm italic text-red-400 ">
            {errors[`${question.id}`].message}
          </span>
        )}
      </label>

      <select
        {...register(`${question.id}`, {
          required: {
            value: question.required,
            message: 'Debes seleccionar una opción',
          },
        })}
        value={selectedOption || ''}
        onChange={handleSelectChange}
        className="w-full py-3 px-4 rounded border bg-white text-500 text-16 border-blue-200 focus:border-blue-200 focus:shadow-outline"
      >
        <option value="" disabled>
          Seleccione una opción
        </option>
        {question?.options?.map(option => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}
