import { useState } from 'react';
import { DroppableContainer } from './DroppableContainer';
import { DraggableObject } from './DraggableObject';
import { Survey } from '../../types.d';
import { useQuestions } from '../../useQuestion';
import { useForm } from 'react-hook-form';
import { useCreateSurvey } from '../../useCreateSurvey';
import { TextInput } from '../inputs/TextInput';
import { DatePicker } from '../inputs/DatePicker';
import { TextArea } from '../inputs/TextArea';
import { Link } from 'react-router-dom';
import { LoadingOverlay } from '../../LoadingOverlay';

export function CreateSurvey() {
  const { questions } = useQuestions();
  const [survey, setSurvey] = useState<Survey>({
    title: '',
    description: '',
    status: false,
    slug: '',
    questions: [],
    startDate: new Date().toLocaleDateString('en-US'),
    endDate: '',
  });
  const { handle, isLoading, error } = useCreateSurvey({ isUpdate: false });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(() => {
    setSurvey({ ...survey, questions: Object.values(questions) });
    handle({ ...survey, questions: Object.values(questions) });
  });

  function handleTitleChange(value: string): void {
    setSurvey({ ...survey, title: value });
  }

  function handleDescriptionChange(value: string): void {
    setSurvey({ ...survey, description: value });
  }

  function handleStartDate(dateString: string): void {
    setSurvey({ ...survey, startDate: dateString });
  }

  function handleEndDate(dateString: string): void {
    setSurvey({ ...survey, endDate: dateString });
  }

  return (
    <div className="flex flex-row">
      <div className="basis-10/12 flex flex-col relative">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col rounded-lg shadow-lg p-4 bg-white m-6">
            <div className="mb-4 text-black">
              <Link to={'/admin'}>
                <i className="ri-arrow-left-line text-lg"></i> Volver
              </Link>
            </div>
            {isLoading && <LoadingOverlay loading={isLoading}/>}
            <div className="flex justify-between mt-5">
              <TextInput
                register={register}
                errors={errors}
                label={'Titulo'}
                handleChangeData={handleTitleChange}
                value={''}
              />
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
                    value={survey.endDate}
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
              value={''}
            />
          </div>
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
          <div className="flex flex-col rounded-lg shadow-lg p-4 bg-white m-6">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
      <div className="basis-1/2 m-6">
        {/* Barra flotante */}
        <div className="fixed top-30 right-50 p-4">
          {/* Cambiado a fixed */}
          <DraggableObject />
        </div>
      </div>
    </div>
  );
}
