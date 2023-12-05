import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { AuthProvider, useAuth } from '../useAuth';
import { GoogleSignIn } from '../components/GoogleSignIn';
import SurveyToAnswer from '../components/SurveyToAnswer';
import { AdminRouter } from './AdminRouter';
import { OnSuccess } from '../components/OnSuccess';

const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ location }} />;
  }

  return children;
};

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" Component={GoogleSignIn} />
          <Route path="/" element={<Navigate to={'/admin'}/>}/>
          <Route path="/encuesta/">
            <Route
              path=":slug"
              element={
                <ProtectedRoute>
                  <SurveyToAnswer />
                </ProtectedRoute>
              }
            />
            <Route
              path=":slug/success"
              element={
                <ProtectedRoute>
                  <OnSuccess />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route
            path={'/admin/*'}
            element={
              <ProtectedRoute>
                <AdminRouter />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
