import { useEffect, useState } from 'react';
import { DroppableContainer } from './DroppableContainer';
import { DraggableObject } from './DraggableObject';
import { ResponseException, Survey } from '../../types.d';
import { useQuestions } from '../../useQuestion';
import { useForm } from 'react-hook-form';
import { useCreateSurvey } from '../../useCreateSurvey';
import { TextInput } from '../inputs/TextInput';
import { DatePicker } from '../inputs/DatePicker';
import { TextArea } from '../inputs/TextArea';
import { Link, useNavigate, useParams } from 'react-router-dom';
import apiUrl from '../../apiConfig';
import { useAuth } from '../../useAuth';
import NotFound from '../NotFound';
import { LoadingOverlay } from '../../LoadingOverlay';

export function EditSurvey() {
  const { userInfo } = useAuth();
  const { questions } = useQuestions();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const { handle, isLoading, error } = useCreateSurvey({ isUpdate: true });
  const [response] = useState<ResponseException | null>(null);
  const { id } = useParams<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigation = useNavigate();

  /*if (survey?.__v! > 0) {
    navigation('/admin/encuestas', {
      state: { name: 'No puedes editar una encuesta con respuestas.' },
      replace: true,
    });
  }*/

  useEffect(() => {
    fetch(`${apiUrl}/surveys/${id}`, {
      headers: { Authorization: userInfo.token! },
    })
      .then(async response => {
        setSurvey(await response.json());
      })
      .catch(err => console.error(err));
  }, [id]);

  const onSubmit = handleSubmit(() => {
    setSurvey({ ...survey!, questions: Object.values(questions) });
    handle({ ...survey!, questions: Object.values(questions) }!);
  });

  function handleTitleChange(value: string): void {
    setSurvey({ ...survey!, title: value });
  }

  function handleDescriptionChange(value: string): void {
    setSurvey({ ...survey!, description: value });
  }

  function handleStartDate(dateString: string): void {
    setSurvey({ ...survey!, startDate: dateString });
  }

  function handleEndDate(dateString: string): void {
    setSurvey({ ...survey!, endDate: dateString });
  }

  return survey ? (
    <div key={survey?._id}>
      <div className="flex flex-row">
        <div className="basis-10/12 flex flex-col">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="flex flex-col rounded-lg shadow-lg p-4 bg-white m-6">
              <div className="mb-4 text-black">
                <Link to={'/admin/encuestas'}>
                  <i className="ri-arrow-left-line text-lg"></i> Volver
                </Link>
              </div>
              {isLoading && <LoadingOverlay loading={isLoading} />}
              <div className="flex justify-between mt-5">
                <div className='mb-10'>
                  <TextInput
                    register={register}
                    errors={errors}
                    label={'Titulo'}
                    handleChangeData={handleTitleChange}
                    value={survey?.title!}
                  />
                  <small className='text-gray-500'>
                    *La liga de la encuesta no cambiará pese al cambio del
                    titulo.
                  </small>
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <DatePicker
                      register={register}
                      label={'Fecha de Inicio'}
                      required={true}
                      onDateChange={handleStartDate}
                      value={survey.startDate}
                    />
                    <DatePicker
                      register={register}
                      label={'Fecha de Finalización'}
                      required={false}
                      onDateChange={handleEndDate}
                      value={survey.endDate ? survey.endDate : ''}
                    />
                  </div>
                  <div>
                    {errors['Fecha de Inicio'] && (
                      <span className="font-sans text-sm italic text-red-400 ">
                        Necesitas seleccionar una Fecha de Inicio
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <TextArea
                register={register}
                errors={errors}
                label={'Descripción'}
                handleChangeData={handleDescriptionChange}
                value={survey.description}
              />
            </div>
            {survey.__v! > 0 ? (
              <div className="flex flex-col rounded-lg shadow-lg p-4 bg-white m-6">
                No puedes editar las preguntas de una encuesta que ya fue
                respondida por lo menos una vez.
                <small className="text-gray-500">
                  *Esto evitará inconsistencia en los resultados gráficos
                </small>
              </div>
            ) : (
              <div className="flex flex-col rounded-lg shadow-lg p-4 bg-white m-6">
                <div className="mb-4">
                  <h1 className="">Pregutnas</h1>
                  <small>
                    *Arrastra y suelta el bloque de pregunta en la zona punteada
                  </small>
                  <span className="font-sans text-sm italic text-red-400 ">
                    {error && <p>{error.message}</p>}
                  </span>
                </div>
                <DroppableContainer
                  register={register}
                  errors={errors}
                  questionsEdit={survey.questions}
                />
              </div>
            )}

            <div className="flex flex-col rounded-lg shadow-lg p-4 bg-white m-6">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
        <div className="basis-1/2 m-6">
          {survey.__v! === 0 && (
            <div className="fixed p-4 rounded-lg">
              <DraggableObject />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <NotFound message={response?.message!} />
  );
}
