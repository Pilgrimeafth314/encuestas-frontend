import { createContext, useContext, useState } from 'react';
import { Question } from './types';

interface QuestionsContextType {
  questions: { [id: number]: Question };
  //questions: UseQuestionType[];
  setQuestions: (questions: { [id: number]: Question }) => void;
  addQuestion: (index: number, question: Question) => void;
  deleteQuestion: (index: number) => void;
  //updateQuestion: (index: number, question: Question) => void;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(
  undefined,
);

export function QuestionsProvider({ children }: any) {
  const [questions, setQuestion] = useState<{ [id: number]: Question }>({});
  //const [questions, setQuestion] = useState<UseQuestionType[]>([]);



  const setQuestions = (questions: { [id: number]: Question }) => {
    setQuestion(questions);
  };

  const addQuestion = (index: number, question: Question) => {
    setQuestion({ ...questions, [index]: question });
  };

  const deleteQuestion = (index: number) => {
    /*setQuestion(prevquestions => {
        const updatedQuestions = { ...prevquestions };
        delete updatedQuestions[index];
        return updatedQuestions;
      });*/
    delete questions[index];
    setQuestion(questions);
  };

  const updateQuestion = (index: number, question: Question) => {
    //setQuestion({ ...questions, [index]: question });
  };

  return (
    <QuestionsContext.Provider
      value={{ questions, addQuestion, setQuestions, deleteQuestion }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined)
    throw new Error(
      'useQuestions debe ser utilizado dentro de un AuthProvider',
    );

  return context;
}
