import React, { useEffect, useState } from 'react';
import apiUrl from '../../apiConfig';
import { useAuth } from '../../useAuth';
import { useParams } from 'react-router-dom';
import { UserInfoAnswers } from '../../types';
import { Accordion, AccordionItem } from './Acordion';

export const AnswersPerSurvey = () => {
  const [userAnswers, setUserAnswers] = useState<UserInfoAnswers[]>([]);
  const { userInfo } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${apiUrl}/info/answers/${id}`, {
      headers: { Authorization: userInfo.token! },
    })
      .then(async response => {
        setUserAnswers(await response.json());
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h4 className="text-xl my-2">Respuestas individuales</h4>
      {userAnswers.length > 0 ? (
        <div className="flex flex-wrap flex-col gap-4 w-auto">
          <Accordion>
            {userAnswers.map((answer, ansIndex) => (
              <AccordionItem title={answer.name}>
                <div key={ansIndex}>
                  <div>
                    <a href={`mailto:${answer.email}`}>{answer.email}</a>
                    {/*Preguntas*/}
                    {answer.answers.map((res, resIndex) => (
                      <div key={resIndex} className="my-5">
                        <h4 className="text-lg text-blue-700">{res.title}</h4>
                        <div>
                          <ol>
                            {res.options.map((opt, optIndex) => (
                              <li key={optIndex}>{opt}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : (
        <div>Aun no hay respuestas</div>
      )}
    </div>
  );
};
