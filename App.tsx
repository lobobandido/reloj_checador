
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import TimeClock from './pages/TimeClock';
import Vacations from './pages/Vacations';
import { MenuIcon, XIcon } from './components/icons/InterfaceIcons';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <HashRouter>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <div className="lg:hidden fixed top-4 left-4 z-30">
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 bg-primary-600 text-white rounded-md">
            {isSidebarOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
        
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/horarios" element={<Schedule />} />
              <Route path="/fichaje" element={<TimeClock />} />
              <Route path="/vacaciones" element={<Vacations />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
