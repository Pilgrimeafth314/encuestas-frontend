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
    <div className="grid grid-rows-3 grid-flow-col gap-auto p-6 max-w-6xl mx-auto items-center space-x-4">
      <div className="row-span-3 bg-white rounded-xl shadow-md p-6">
        <div className="min-w-sm max-w-lg mx-auto py-10">
          <img
            className="w-16 h-16 rounded-full mx-auto"
            src={user?.picture}
            alt={user?.name}
          />
          <h4 className="text-center text-black font-medium">{user?.name}</h4>
          <p className="text-slate-500 text-center">{user?.email}</p>
        </div>
      </div>
      <div className="col-span-2 bg-white rounded-xl shadow-md py-6">
        <h2 className="text-xl font-medium text-black text-center">
          {survey?.title}
        </h2>
      </div>
      <div className="row-span-2 col-span-2 bg-white rounded-xl shadow-md py-6 ">
        <p className="text-slate-500 text-center">{survey?.description}</p>
      </div>
    </div>
  );
}
