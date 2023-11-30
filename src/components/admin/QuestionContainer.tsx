import React, { useEffect, useState } from 'react';

import { Question, QuestionType } from '../../types.d';
import { Checkbox } from '../inputs/Checkbox';
import { UseFormRegister } from 'react-hook-form';
import { useQuestions } from '../../useQuestion';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
  index: number;
  question: Question;
  onRemove: () => void;
  //onGetQuestion: (index: number, question: Question) => void;
}

export function QuestionContainer({
  register,
  errors,
  index,
  question,
  onRemove,
}: //onGetQuestion,
Props) {
  const [questionInfo, setQuestion] = useState<Question>(question);
  const { addQuestion } = useQuestions();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setQuestion({ ...questionInfo, title: newTitle });
    addQuestion(index, { ...questionInfo, title: newTitle });
    //onGetQuestion(index, { ...questionInfo, title: newTitle });
  };

  const handleRequired = (newIsChecked: boolean) => {
    setQuestion({ ...questionInfo, required: newIsChecked });
    addQuestion(index, { ...questionInfo, required: newIsChecked });
    //onGetQuestion(index, { ...questionInfo, required: newIsChecked });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType: QuestionType = Number(e.target.value) as QuestionType;
    setQuestion({ ...questionInfo, type: selectedType });
    addQuestion(index, { ...questionInfo, type: selectedType });
    //onGetQuestion(index, { ...questionInfo, type: selectedType });
  };

  const handleOptionAdd = () => {
    setQuestion({
      ...questionInfo,
      options: [...questionInfo.options, { title: '' }],
    });
    addQuestion(index, {
      ...questionInfo,
      options: [...questionInfo.options, { title: '' }],
    });

    /*onGetQuestion(index, {
      ...questionInfo,
      options: [...questionInfo.options, { title: '' }],
    });*/
  };

  const handleOptionRemove = (indexOption: number) => {
    const question = {
      ...questionInfo,
      options: questionInfo.options
        .slice(0, indexOption)
        .concat(questionInfo.options.slice(indexOption + 1)),
    };
    setQuestion({
      ...questionInfo,
      options: questionInfo.options
        .slice(0, indexOption)
        .concat(questionInfo.options.slice(indexOption + 1)),
    });
    addQuestion(index, {
      ...questionInfo,
      options: questionInfo.options
        .slice(0, indexOption)
        .concat(questionInfo.options.slice(indexOption + 1)),
    });
    //onGetQuestion(index, question);
    //onGetQuestion(index, { ...questionInfo, options: options, removedOption: options[indexOption] });
  };

  const handleOptionTitleChange = (e: any, indexOption: number) => {
    const { name, value } = e.target;
    const options = [...questionInfo.options];
    options[indexOption].title = value;
    setQuestion({ ...questionInfo, options: options });
    addQuestion(index, { ...questionInfo, options: options });
    ///onGetQuestion(index, { ...questionInfo, options: options });
    //onGetQuestion(index, { ...questionInfo, options: [...questionInfo.options, ...options] });
  };

  return (
    <div className="border p-4 m-4 rounded-md shadow-sm bg-white">
      <div className="flex justify-between mb-2">
        <div>
          <input
            type="text"
            {...register(`question${index}`, {
              required: {
                value: true,
                message: 'El titulo es obligatorio.',
              },
            })}
            id={`question${index}`}
            placeholder="Título *"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={questionInfo.title}
            onChange={handleTitleChange}
          />
        </div>

        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={questionInfo.type}
          onChange={handleSelectChange}
        >
          <option value={QuestionType.Checkbox}>Casilla de verificación</option>
          <option value={QuestionType.MultipleOptions}>
            Múltiples opciones
          </option>
          <option value={QuestionType.OptionsList}>Lista de opciones</option>
        </select>
      </div>
      <div className="flex flex-col mb-6 mt-6">
        <div>
          <Checkbox
            label={'Obligatoria'}
            isChecked={questionInfo.required}
            onToggle={handleRequired}
          />
        </div>
        <hr />
        Agrega opciones para la pregunta.
      </div>

      {questionInfo.options.map((option, i) => (
        <div key={i}>
          <div className="flex flex-col">
            <div className="flex justify-between m-1">
              <input
                type="text"
                className="mx-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={option.title}
                onChange={e => handleOptionTitleChange(e, i)}
                required
              />
              {questionInfo.options.length > 1 && (
                <button
                  type="button"
                  className=" text-white py-2 px-4 rounded"
                  onClick={() => handleOptionRemove(i)}
                >
                  <i className="ri-close-line text-lg text-black hover:text-red-500"></i>
                </button>
              )}
            </div>
            {questionInfo.options.length - 1 === i &&
              questionInfo.options.length < 10 && (
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded m-4"
                  onClick={handleOptionAdd}
                >
                  Agregar Opción
                </button>
              )}
          </div>
        </div>
      ))}
      <button
        type="button"
        className="bg-red-500 text-white py-2 px-4 rounded"
        onClick={onRemove}
      >
        Eliminar
      </button>
    </div>
  );
}
