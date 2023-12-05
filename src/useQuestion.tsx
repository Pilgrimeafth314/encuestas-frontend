import { createContext, useContext, useState } from 'react';
import { Question } from './types';

interface QuestionsContextType {
  questions: QuestionsContainer[];
  addQuestion: (index: number, question: Question) => void;
  deleteQuestion: (index: number) => void;
  updateQuestion: (index: number, question: Question) => void;
}

interface QuestionsContainer {
  id: number;
  question: Question;
}

const QuestionsContext = createContext<QuestionsContextType | undefined>(
  undefined,
);

export function QuestionsProvider({ children }: any) {
  const [questions, setQuestion] = useState<QuestionsContainer[]>([]);
  const addQuestion = (index: number, question: Question) => {
    const newQuestion = {
      id: index,
      question: question,
    };
    setQuestion(prevQuestions => [...prevQuestions, newQuestion]);
  };

  const deleteQuestion = (index: number) => {
    setQuestion(prevQuestions =>
      prevQuestions.filter(question => question.id !== index),
    );
  };

  const updateQuestion = (index: number, question: Question) => {
    const updatedQuestion = {
      id: index,
      question: question,
    };
    setQuestion(prevQuestions =>
      prevQuestions.map(question =>
        question.id === index ? updatedQuestion : question,
      ),
    );
  };

  return (
    <QuestionsContext.Provider
      value={{ questions, addQuestion, deleteQuestion, updateQuestion }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined)
    throw new Error(
      'useQuestions debe ser utilizado dentro de un QuestionsContext',
    );

  return context;
}
