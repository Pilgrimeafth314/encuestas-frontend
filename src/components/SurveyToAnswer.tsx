import { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import apiUrl from '../apiConfig';
import { ResponseException, type Survey } from '../types.d';
import { SurveyHeader } from './SurveyHeader';
import { RenderQuestion } from './RenderQuestion';
import NotFound from './NotFound';
import { useAuth } from '../useAuth';
import { useForm } from 'react-hook-form';
import { useSubmitSurvey } from '../useSubmitSurvey';
import { LoadingOverlay } from '../LoadingOverlay';
import SquareColors from './admin/SquareColors';

function SurveyToAnswer() {
  const { userInfo } = useAuth();
  const [response, setResponse] = useState<ResponseException | null>(null);
  const [survey, setSurvey] = useState<Survey | null>(null);
  const { slug } = useParams<string>();
  const location = useLocation();
  const { handle, isLoading, error } = useSubmitSurvey({
    apiUrl: apiUrl!,
    slug: slug!,
    userInfo: userInfo,
    survey: survey!,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`${apiUrl}/encuesta/${slug}`, {
      headers: { Authorization: userInfo.token! },
    })
      .then(async response => {
        const data = await response.json();
        if (response.ok) setSurvey(data);
        else setResponse(data);
      })
      .catch(err => console.error(err));
  }, [slug, userInfo.token]);

  const onSubmit = handleSubmit(data => handle(data));

  return survey !== null ? (
    <div className='overflow-x-hidden'>
      <SquareColors />
      <div className="container mx-auto">
        <SurveyHeader survey={survey!} />
        <form onSubmit={onSubmit}>
          <RenderQuestion
            register={register}
            errors={errors}
            questions={survey?.questions!}
          />
          <button>Enviar</button>
        </form>
        {isLoading && <LoadingOverlay loading={isLoading} />}
        {error && <p>{error.message}</p>}
      </div>
      {error?.message && (<Navigate to={`/${slug}/success`} state={{ location }}/>)}
    </div>
    
  ) : (
    <NotFound message={response?.message!} />
  );
}

export default SurveyToAnswer;
