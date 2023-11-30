import { Link } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

export function Dashboard() {
  return (
    <div className="flex flex-col bg-white w-auto h-full rounded-lg shadow-lg p-6 mx-auto">
      <div className="flex flex-wrap justify-center">
        <Link
          to={'/admin/encuestas/crear'}
          className="bg-green-300 transition-all hover:bg-green-500 text-white p-6 m-5 rounded-md flex flex-col items-center w-56 h-auto"
        >
          <i className="ri-survey-fill text-4xl mb-2"></i>
          <span className="text-lg">Crear Encuesta</span>
        </Link>

        <Link
          to={'/admin/encuestas'}
          className="bg-blue-300 transition-all hover:bg-blue-500 text-white p-6 m-5 rounded-md flex flex-col items-center w-56 h-auto"
        >
          <i className="ri-file-list-2-fill text-4xl mb-2"></i>
          <span className="text-lg">Listado de encuestas</span>
        </Link>
      </div>
    </div>
  );
}
