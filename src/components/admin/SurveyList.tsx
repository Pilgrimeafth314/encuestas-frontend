import { Link } from 'react-router-dom'; // Asumiendo que estás usando React Router para la navegación
import { Survey } from '../../types.d';
import { useState } from 'react';

interface SurveyListProps {
  surveys: Survey[];
  onDeleteClick: (surveyId: string) => void;
}

const itemsPerPage = 35; // Cantidad de encuestas por página

export function SurveyList({ surveys, onDeleteClick }: SurveyListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastSurvey = currentPage * itemsPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - itemsPerPage;
  const currentSurveys = surveys.slice(indexOfFirstSurvey, indexOfLastSurvey);

  const totalPages = Math.ceil(surveys.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Titulo
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Inicio
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Finalización
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Respuestas
            </th>
            <th className="px-6 py-3 bg-gray-50 text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Acción
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentSurveys.length === 0 ? (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex justify-center items-center space-x-4">
                  <h1 style={{ textAlign: 'center' }}>
                    No se encontraron resultados
                  </h1>
                </div>
              </td>
            </tr>
          ) : (
            currentSurveys.map(survey => (
              <tr key={survey.title}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/${survey.slug}`} className="text-blue-500">
                    {survey.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(
                    survey.startDate.replace('Z', '-06:00'),
                  ).toLocaleDateString('es-MX', dateOptions)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {survey.endDate ? (
                    new Date(
                      survey.endDate.replace('Z', '-06:00'),
                    ).toLocaleDateString('es-MX', dateOptions)
                  ) : (
                    <span>Sin fecha de finalización</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {survey.__v! > 0 ? survey?.__v! : 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex justify-center items-center space-x-4">
                    <div
                      className="inline-flex rounded-md shadow-sm"
                      role="group"
                    >
                      <Link
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        to={`/admin/encuestas/${survey._id}/info`}
                      >
                        <i className="ri-bar-chart-fill text-md text-green-500"></i>
                      </Link>

                      {/*survey.__v! > 0 ? (
                        <span className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                          <i className="ri-prohibited-line text-md text-red-500"></i>
                        </span>
                      ) : */(
                        <Link
                          className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                          to={`/admin/encuestas/${survey._id}/editar`}
                        >
                          <i className="ri-edit-line text-md text-blue-500"></i>
                        </Link>
                      )}

                      <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={() => onDeleteClick(survey._id!)}
                      >
                        <i className="ri-delete-bin-line text-md text-red-500"></i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <hr className="py-2" />
      <div className="flex justify-between">
        <p>Total de encuestas: {surveys.length}</p>
        {totalPages > 0 && (
          <div className="bg-neutral-950 p-1 rounded-md">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500'
                } px-2 py-1 rounded-md mx-1`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
