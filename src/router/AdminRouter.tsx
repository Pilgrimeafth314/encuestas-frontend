import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../components/admin/Dashboard';
import { useAuth } from '../useAuth';
import { HasRole } from '../roles/HasRoles';
import { ADMIN, STUDENT } from '../roles/roles';
import { MainSurvey } from '../components/admin/MainSurvey';
import { CreateSurvey } from '../components/admin/CreateSurvey';
import { QuestionsProvider } from '../useQuestion';
import { EditSurvey } from '../components/admin/EditSurvey';
import { TabSurveyInfo } from '../components/admin/TabSurveyInfo';
import SquareColors from '../components/admin/SquareColors';
export const AdminRouter = () => {
  const { userInfo } = useAuth();

  return (
    <HasRole arrRole={userInfo.roles} rol={STUDENT}>
      <main className="w-full bg-slate-100 dark:bg-slate-800 min-h-screen transition-all main">
        <div className="bg-white flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30 overflow-x-hidden">
          <SquareColors />
        </div>

        <div className="p-6">
          {
            <Routes>
              <Route index path="/" element={<Dashboard />} />
              <Route path="/encuestas" element={<MainSurvey />} />
              <Route
                path="/encuestas/crear"
                element={
                  <QuestionsProvider>
                    <CreateSurvey />
                  </QuestionsProvider>
                }
              />
              <Route path="/encuestas/:id">
                <Route
                  path="editar"
                  element={
                    <QuestionsProvider>
                      <EditSurvey />
                    </QuestionsProvider>
                  }
                />
                <Route path="info" element={<TabSurveyInfo />} />
              </Route>
            </Routes>
          }
        </div>
      </main>
    </HasRole>
  );
};
