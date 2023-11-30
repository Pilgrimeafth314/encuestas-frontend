import { HasRole } from '../roles/HasRoles';
import { ADMIN, STUDENT } from '../roles/roles';
import { useAuth } from '../useAuth';

export const DashboardRouter = () => {
  const { userInfo } = useAuth();
  return (
    <div>
      <HasRole rol={ADMIN} arrRole={userInfo.roles}>
        <div>administrador</div>
      </HasRole>

      <HasRole rol={STUDENT} arrRole={userInfo.roles}>
        <div>alumnos</div>
      </HasRole>
    </div>
  );
};
