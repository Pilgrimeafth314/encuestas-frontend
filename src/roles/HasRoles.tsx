import { ReactNode } from 'react';
import { hasRole } from './role';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  children: ReactNode;
  arrRole: string[];
  rol: 'admin' | 'student';
};

export const HasRole = ({ children, arrRole, rol }: Props) => {
  const location = useLocation();
  return hasRole(arrRole, rol) ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ location }} />
  );
};
