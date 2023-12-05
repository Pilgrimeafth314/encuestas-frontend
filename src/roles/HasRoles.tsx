import { ReactNode } from 'react';
import { hasRole } from './role';
import NotFound from '../components/NotFound';

type Props = {
  children: ReactNode;
  arrRole: string[];
  rol: 'admin' | 'student';
};

export const HasRole = ({ children, arrRole, rol }: Props) => {
  return hasRole(arrRole, rol) ? (
    <>{children}</>
  ) : (
    <NotFound message={'No tienes permiso para acceder al panel de administración'}/>
  );
};
