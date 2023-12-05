import jwtDecode from 'jwt-decode';
import { type Survey } from '../types.d';
import { useAuth } from '../useAuth';

interface User {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  hd: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
  jti: string;
}

interface Props {
  survey: Survey;
}

export function SurveyHeader({ survey }: Props) {
  const { userInfo } = useAuth();
  let user;
  try {
    user = jwtDecode<User>(userInfo.token!);
  } catch (_) {}

  return (
    <div className="shadow-lg p-5 rounded-md mb-10 bg-white">
      <div className="mb-4">
        <h1 className="text-xl">{survey?.title}</h1>
        <p className="text-md text-gray-400">{survey?.description}</p>
      </div>
      <hr />
      <small className="text-xs">Ingresaste como:</small>
      <div className="flex items-center gap-4 mt-4">
        <img
          className="w-10 h-10 rounded-full shadow-lg"
          src={user?.picture}
          alt={user?.name}
        />
        <div className="font-medium dark:text-white">
          <div>{user?.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </div>
        </div>
      </div>
    </div>
  );
}
