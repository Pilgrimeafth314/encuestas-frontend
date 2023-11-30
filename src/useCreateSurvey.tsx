import { useState } from 'react';
import { Question, ResponseException, ServerResponse, Survey } from './types.d';
import { useAuth } from './useAuth';
import apiUrl from './apiConfig';
import { useNavigate } from 'react-router-dom';

interface Props {
  isUpdate: boolean;
}

export const useCreateSurvey = ({ isUpdate }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ResponseException | null>(null);
  const [serverResponse, setResponse] = useState<ServerResponse | null>(null);
  const navigation = useNavigate();
  const { userInfo } = useAuth();

  const handle = async (survey: Survey) => {
    setIsLoading(true);

    try {
      if (survey.questions.length === 0 && survey?.__v! === 0) {
        setError({
          message: 'Debes colocar por lo menos una pregunta.',
          error: 'Bad Request',
          statusCode: 400,
        });
        return;
      }

      const body = {
        title: survey.title,
        description: survey.description,
        ...(survey && survey.__v === 0 ? { questions: survey.questions } : {questions: survey.questions}),
        startDate: survey.startDate,
        ...(survey.endDate !== '' && { endDate: survey.endDate }),
      };

      let url = 'surveys';
      let method = 'POST';
      if (isUpdate) {
        url = `surveys/${survey._id}`;
        method = 'PUT';
      }

      await fetch(`${apiUrl}/${url}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userInfo.token!,
        },
        method: method,
        body: JSON.stringify(body),
      })
        .then(async response => {
          if (!response.ok) setError(await response.json());
          //Sucess
          setResponse(await response.json());

          navigation('/admin/encuestas', {
            state: { name: serverResponse?.message },
            replace: true,
          });
        })
        .catch(() => {
          setError({
            statusCode: 400,
            error: 'true',
            message:
              'No se puede establecer conexión con el servidor, intentalo más tarde.',
          });
        });
    } catch (_) {
      //Can handle error
    } finally {
      setIsLoading(false);
    }
  };

  return { handle, isLoading, error, serverResponse };
};
