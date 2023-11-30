import { useState } from 'react';
import { Answer, ResponseException, Survey } from './types';
import { FieldValues } from 'react-hook-form';
import { AuthResponse } from './useAuth';
import { Navigate, useNavigate } from 'react-router-dom';

export interface SubmitProps {
  apiUrl: string;
  slug: string;
  userInfo: AuthResponse;
  survey: Survey;
}

export const useSubmitSurvey = ({
  apiUrl,
  slug,
  userInfo,
  survey,
}: SubmitProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ResponseException | null>(null);
  const navigation = useNavigate();

  const handle = async (data: any) => {
    setIsLoading(true);
    try {
      const newData: Answer[] = Object.entries(data).map(
        (item: FieldValues, _: any) => ({
          id_question: item[0],
          response: Array.isArray(item[1])
            ? item[1]
            : item[1].trim().length === 0
            ? []
            : [item[1]],
        }),
      );

      const matchingQuestions = newData.filter(question => {
        const questionId = question.id_question;
        const matchingQuestion = survey?.questions.find(
          (otherQuestion: { id?: string }) => otherQuestion.id === questionId,
        );
        return matchingQuestion !== undefined;
      });

      const validResponses: boolean[] = matchingQuestions.map(question => {
        const response = question.response;
        const matchingQuestion = survey?.questions.find(
          (otherQuestion: { id?: string }) =>
            otherQuestion.id === question.id_question,
        );
        const matchingResponse = matchingQuestion?.options.find(
          (option: { id?: string }) => option.id === response[0],
        );
        return (
          matchingResponse !== undefined ||
          (matchingQuestion?.required === false && response.length === 0)
        );
      });

      if (validResponses.includes(false)) {
        setError({
          message: 'La encuesta fue alterada, por favor recarga la página.',
          error: 'Bad Request',
          statusCode: 400,
        });
        return;
      }

      const body = { answers: newData };

      await fetch(`${apiUrl}/encuesta/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userInfo.token!,
        },
        method: 'PUT',
        body: JSON.stringify(body),
      }).then(async response => {
        setError(await response.json());
      });
    } catch (_) {
      //Can handle error
    } finally {
      setIsLoading(false);
    }
  };

  return { handle, isLoading, error };
};
