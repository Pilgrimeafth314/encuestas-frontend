import React, { useEffect, useState } from 'react';
import { QuestionContainer } from './QuestionContainer';
import { Question, QuestionType } from '../../types.d';
import { useQuestions } from '../../useQuestion';
import { UseFormRegister } from 'react-hook-form/dist/types';
interface QC {
  id: number;
  component: JSX.Element;
}

interface Props {
  register: UseFormRegister<any>;
  errors: any;
  questionsEdit?: Question[];
}

export function DroppableContainer({ register, errors, questionsEdit }: Props) {
  const { questions, addQuestion, setQuestions, /*deleteQuestion, updateQuestion*/} = useQuestions();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [questionContainers, setQuestionContainers] = useState<QC[]>([]);
  const [nextId, setNextId] = useState<number>(0);

  useEffect(() => {
    //const newQuestions: { [id: number]: Question } = {};
    let currentId = nextId;
    questionsEdit?.forEach((question, index) => {
      const newId = currentId;
      currentId++;

      const newQuestionContainer = {
        id: newId,
        component: (
          <QuestionContainer
            key={index}
            index={newId}
            question={question}
            onRemove={() => handleRemove(newId)}
            //onGetQuestion={handleGetQuestion}
            register={register}
            errors={errors}
          />
        ),
      };

      //setQuestions({ ...questions, [newId]: question });
      const newQuestions = questions[newId] = question;
      setQuestions({...questions, [newId]: question});
      setQuestionContainers((prevQuestionContainers) => {
        return {
          ...prevQuestionContainers,
          [newId]: newQuestionContainer,
        };
      });
      
      //if (!questionContainers.some(container => container.id === newId)) {
        //setQuestionContainers(prevContainers => [...prevContainers, newQuestionContainer]);
      //}
      //setQuestionContainers([...questionContainers, newQuestionContainer]);
    });
    //setQuestions(newQuestions);
    setNextId(currentId);

  }, []);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const data = event.dataTransfer.getData('text/plain');
    if (data === 'draggable-object') {
      let currentId = nextId;
      const newId = currentId;
      currentId++;
      setNextId(currentId);

      const questionInt: Question = {
        title: '',
        type: QuestionType.Checkbox,
        required: false,
        options: [{ title: 'Opción 1' }],
      };

      const newQuestionContainer: QC = {
        id: newId,
        component: (
          <QuestionContainer
            key={newId}
            index={newId}
            question={questionInt}
            onRemove={() => handleRemove(newId)}
            //onGetQuestion={handleGetQuestion}
            register={register}
            errors={errors}
          />
        ),
      };

      //setQuestions({ ...questions, [newId]: questionInt });
      //addQuestion(newId, questionInt);
      setQuestionContainers((prevQuestionContainers) => {
        return {
          ...prevQuestionContainers,
          [newId]: newQuestionContainer,
        };
      });
    }
  };

  /*const handleGetQuestion = (index: number, question: Question) => {
    //setQuestions({ ...questions, [index]: question });
    addQuestion(index, question);
    updateQuestion(index, question);
  };*/

  const handleRemove = (index: number) => {
    /*setQuestionContainers(prevContainers => {
      const updatedContainers = prevContainers?.filter(
        container => container.id !== index,
      );
      console.log(updatedContainers)
      return updatedContainers;
    });*/
    setQuestionContainers(prevContainers => {
      const updatedContainers = prevContainers.slice();
      updatedContainers.splice(index, 1);
      return updatedContainers;
    });

    //setQuestions();
    //setNextId(nextId - 1)
  };

  const classNames = `border-dashed border-2 border-blue-300 p-4 rounded-lg 
  ${isDragging ? 'bg-blue-400' : 'bg-white'}`;

  return (
    <div
      className={classNames}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {Object.values(questionContainers).length === 0 ? 'Arrastra y suelta aquí' : ''}
      {Object.values(questionContainers).map((container, index) => (
        <div key={index}>{container.component}</div>
      ))}
    </div>
  );
}
