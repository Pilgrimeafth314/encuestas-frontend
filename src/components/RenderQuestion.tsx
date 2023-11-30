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
    <div className="flex flex-col">
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
            return <div>Not found</div>;
        }
      })}
    </div>
  );
}
