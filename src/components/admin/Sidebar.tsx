import 'remixicon/fonts/remixicon.css';
import { Link } from 'react-router-dom';
import { SidebarOption } from './SidebarOption';

export function Sidebar() {
  return (
    <>
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 z-50 sidebar-menu transition-transform">
        <Link
          to={'/Hijo de perra/'}
          className="flex items-center pb-4 border-b border-b-gray-800"
        >
          <img
            src="https://placehold.co/32x32"
            alt=""
            className="w-8 h-8 rounded object-cover"
          />
          <span className="text-lg font-bold text-white ml-3">
            Encuestas Admin
          </span>
        </Link>
        <ul className="mt-4">
          <SidebarOption
            title="Dashboard"
            href="#"
            active={false}
          ></SidebarOption>
          <SidebarOption
            title="Encuestas"
            href="/admin/encuestas"
            active={false}
          ></SidebarOption>
        </ul>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay" />
    </>
  );
}
