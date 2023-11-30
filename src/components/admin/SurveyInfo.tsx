import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartData, ResponseException } from '../../types';
import apiUrl from '../../apiConfig';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../useAuth';

ChartJS.register(ArcElement, Tooltip, Legend);

export function SurveyInfo() {
  const [chartDatas, setChartDatas] = useState<ChartData[]>([]);
  const [response, setResponse] = useState<ResponseException | null>(null);
  const { userInfo } = useAuth();
  const { id } = useParams<string>();

  useEffect(() => {
    fetch(`${apiUrl}/info/chartdata/${id}`, {
      headers: { Authorization: userInfo.token! },
    })
      .then(async response => {
        const result = await response.json();
        if (!response.ok) setResponse(result);
        return result;
      })
      .then(response => {
        setChartDatas(response);
      });
  }, []);

  return (
    <div>
      <div className="mb-4 text-black">
        <Link to={'/admin/encuestas'}>
          <i className="ri-arrow-left-line text-lg"></i> Volver
        </Link>
      </div>
      <div className="flex m-6">
        {chartDatas.length > 0 ? (
          chartDatas.map((info, index) => (
            <div key={index} className="w-3/10 p-5 m-auto">
              <div className="text-center text-lg mb-10">
                <h2>{info.datasets[0].label}</h2>
              </div>
              <Pie data={info} />
              <h4 className="text-red text-purple-600">Total de respuestas:</h4>
              <div className="flex flex-col text-xs">
                {info.labels.map((label, labelindex) => (
                  <div key={labelindex} className="basis-1/2">
                    [{label}]: <span>{info.datasets[0].data[labelindex]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>Aun no hay respuestas</div>
        )}
      </div>
    </div>
  );
}
