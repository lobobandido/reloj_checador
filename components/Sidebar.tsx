
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, CalendarIcon, ClockIcon, BeachIcon, LogoIcon } from './icons/NavIcons';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode; onClick: () => void }> = ({ to, icon, children, onClick }) => (
  <li>
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center p-3 my-1 rounded-lg text-base transition-colors duration-200 ${
          isActive
            ? 'bg-primary-500 text-white shadow-md'
            : 'text-primary-100 hover:bg-primary-700 hover:text-white'
        }`
      }
    >
      <span className="w-6 h-6">{icon}</span>
      <span className="ml-4 font-medium">{children}</span>
    </NavLink>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
      <aside className={`absolute top-0 left-0 w-64 h-full bg-primary-800 text-white flex flex-col z-20 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-center h-20 border-b border-primary-700">
          <LogoIcon />
          <h1 className="text-2xl font-bold ml-2">ZenithHR</h1>
        </div>
        <nav className="flex-1 px-4 py-4">
          <ul>
            <NavItem to="/" icon={<DashboardIcon />} onClick={handleLinkClick}>Dashboard</NavItem>
            <NavItem to="/fichaje" icon={<ClockIcon />} onClick={handleLinkClick}>Fichaje</NavItem>
            <NavItem to="/horarios" icon={<CalendarIcon />} onClick={handleLinkClick}>Horarios</NavItem>
            <NavItem to="/vacaciones" icon={<BeachIcon />} onClick={handleLinkClick}>Vacaciones</NavItem>
          </ul>
        </nav>
        <div className="px-4 py-4 border-t border-primary-700">
            <div className="flex items-center">
                <img className="h-10 w-10 rounded-full" src="https://picsum.photos/100" alt="Avatar de usuario" />
                <div className="ml-3">
                    <p className="text-sm font-medium text-white">Ana García</p>
                    <p className="text-xs text-primary-200">Ver Perfil</p>
                </div>
            </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
