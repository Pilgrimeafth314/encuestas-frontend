import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  href: string;
  active: boolean
}

export function SidebarOption({ title, href, active }: Props) {
  return (
    <li className={`mb-1 group ${active ? 'active' : ''}`}>
      <Link
        to={href}
        className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
      >
        <i className="ri-home-2-line mr-3 text-lg"></i>
        <span className="text-sm">{title}</span>
      </Link>
    </li>
  );
}
