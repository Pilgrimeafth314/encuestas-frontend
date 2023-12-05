import { QuestionType, type Question } from '../types.d';
import { CheckboxGroup } from './CheckboxQuestion';
import { MultipleOptions } from './MultipleOptions';
import { SelectOption } from './SelectOption';

interface Props {
  register: any;
  errors: any;
  questions: Question[];
}

export function RenderQuestion({ register, errors, questions }: Props) {
  return (
    <>
      {questions?.map(question => {
        switch (question.type) {
          case QuestionType.Checkbox:
            return (
              <CheckboxGroup
                key={question.id}
                register={register}
                errors={errors}
                question={question}
              />
            );
          case QuestionType.MultipleOptions:
            return (
              <MultipleOptions
                key={question.id}
                register={register}
                errors={errors}
                question={question}
              />
            );
          case QuestionType.OptionsList:
            return (
              <SelectOption
                key={question.id}
                register={register}
                errors={errors}
                question={question}
              />
            );
          default:
            return (
              <div className="mb-6 bg-white p-5 rounded-md shadow-md">
                No se encontró el tipo de pregunta
              </div>
            );
        }
      })}
    </>
  );
}
