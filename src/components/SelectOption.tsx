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
    <div className="m-5 p-5 bg-white shadow-xl rounded-lg">
      <h2 className="text-md font-medium text-black">
        {question.required ? <span>*</span> : null} {question?.title}
      </h2>
      {errors[`${question.id}`] && (
        <span className="font-sans text-sm italic text-red-400 ">
          {errors[`${question.id}`].message}
        </span>
      )}
      <div className="mt-5">
        <select
          {...register(`${question.id}`, {
            required: {
              value: question.required,
              message: 'Debes seleccionar una opción',
            },
          })}
          value={selectedOption || ''}
          onChange={handleSelectChange}
          className="m-2 border rounded-md px-3 py-2 outline-none"
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
    </div>
  );
}
