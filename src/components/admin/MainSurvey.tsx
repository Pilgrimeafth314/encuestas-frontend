import { Link, Navigate } from 'react-router-dom';
import { SurveyList } from './SurveyList';
import { ResponseException, Survey } from '../../types.d';
import { useEffect, useState } from 'react';
import apiUrl from '../../apiConfig';
import { useAuth } from '../../useAuth';
import Modal from '../Modal';

export function MainSurvey() {
  const [open, setOpen] = useState<boolean>(false);
  const { userInfo } = useAuth();
  const [surveys, setSurvey] = useState<Survey[]>([]);
  const [response, setResponse] = useState<ResponseException | null>(null);
  const [remove, setRemove] = useState<string>();

  const handleGetSurveys = () => {};

  useEffect(() => {
    fetch(`${apiUrl}/surveys`, {
      headers: { Authorization: userInfo.token! },
    })
      .then(async response => {
        const data = await response.json();
        if (response.ok) setSurvey(data);
        else setResponse(data);
      })
      .catch(err => console.error(err));
  }, [userInfo.token]);

  const handleRemoveSurvey = (id: string) => {
    setOpen(true);
    setRemove(id);
  };

  const confirmRemoveSurvey = () => {
    fetch(`${apiUrl}/surveys/${remove}`, {
      headers: { Authorization: userInfo.token! },
      method: 'DELETE',
    })
      .then(async response => {
        
        const data = await response.json();
        if (response.ok) setSurvey(data);
        else setResponse(data);
        setRemove('');
        setOpen(false);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 overflow-x-hidden">
      <div className="mb-4 text-black">
        <Link to={'/admin'}>
          <i className="ri-arrow-left-line text-lg"></i> Volver
        </Link>
      </div>
        <SurveyList surveys={surveys!} onDeleteClick={handleRemoveSurvey} />
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <i className="ri-delete-bin-line text-5xl text-red-500"></i>
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirmar</h3>
            <p className="text-sm text-gray-500">
              ¿Estás seguro que deseas borrar esta encuesta?
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={confirmRemoveSurvey}
              className="bg-red-500 shadow-md shadow-red-200 rounded-md text-white py-1 w-full"
            >
              Borrar
            </button>
            <button
              className="bg-gray-50 shadow-md shadow-black-200 rounded-md text-black py-1 w-full"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
