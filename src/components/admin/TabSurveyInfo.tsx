import { AnswersPerSurvey } from './AnswersPerSurvey';
import { SurveyInfo } from './SurveyInfo';

export const TabSurveyInfo = () => {
  return (
    <div className='bg-white rounded-lg mx-auto'>
      <div className="p-4">
      <SurveyInfo/>
      
      </div>
      <div className="p-4">
      <AnswersPerSurvey/>
      
      </div>
      
    </div>
  );
};
