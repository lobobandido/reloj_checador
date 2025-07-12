
import React from 'react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  
  const getTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/horarios':
        return 'Mis Horarios';
      case '/fichaje':
        return 'Registro de Jornada';
      case '/vacaciones':
        return 'Gestión de Vacaciones';
      default:
        return 'ZenithHR';
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0 lg:justify-start">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-white ml-12 lg:ml-0">{getTitle()}</h1>
    </header>
  );
};

export default Header;
