import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from '@react-oauth/google';
import { AuthResponse, useAuth } from '../useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import apiUrl from '../apiConfig';
import SquareColors from './admin/SquareColors';

export function GoogleSignIn() {
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const setAuthData = (authData: CredentialResponse) => {
    //Send request to API
    //login();
    const requestData = { token: authData.credential };
    fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    })
      .then(async response => {
        const data: AuthResponse = await response.json();
        login(data);
        navigate(state?.location?.pathname ?? '/');
      })
      .catch(response => {
        console.log(response);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative bg-slate-100">
      <div className="bg-blue-500 h-8 w-full fixed top-0">
        <SquareColors />
      </div>
      <div className="p-8 rounded-md z-10">
        <GoogleOAuthProvider
          clientId={
            '1072254120477-fjlc1tvvbthfnsop8aph2hu4cs58d976.apps.googleusercontent.com'
          }
        >
          <div className="p-12 bg-blue-600 rounded-lg shadow-lg shadow-blue-600">
            <GoogleLogin
              onSuccess={(credentialResponse: CredentialResponse) =>
                setAuthData(credentialResponse)
              }
              onError={() => logout()}
              useOneTap
              auto_select
              theme="filled_black"
              size="large"
              text="continue_with"
              shape="pill"
              logo_alignment="center"
            />
          </div>
        </GoogleOAuthProvider>
      </div>

      <div className="bg-blue-500 w-full fixed bottom-0">
        <SquareColors />
      </div>
    </div>
  );
}
