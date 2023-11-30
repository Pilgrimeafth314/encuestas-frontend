import { useState } from 'react';
import { type Question } from '../types.d';

interface Props {
  register: any;
  errors: any;
  question: Question;
}

export function MultipleOptions({ register, errors, question }: Props) {
  const [select, setSelect] = useState<string | null>(null);

  const handleRadioChange = (value: string) => {
    const updateValue = null;
    if (updateValue === value) setSelect(null);

    setSelect(value);
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
          <label key={option.id}>
            <input
              type="radio"
              {...register(`${question.id}`, {
                required: {
                  value: question.required,
                  message: 'Debes seleccionar una opción',
                },
              })}
              name={question.id}
              value={option.id}
              id={option.id}
              className="m-2 outline-none"
              checked={select === option.id}
              onChange={() => handleRadioChange(option.id!)}
            />
            {option.title}
          </label>
        ))}
      </div>
    </div>
  );
}
