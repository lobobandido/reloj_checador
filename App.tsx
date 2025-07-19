
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import TimeClock from './pages/TimeClock';
import Vacations from './pages/Vacations';
import { Layout } from './components/Layout';

function App() {
  
  return (
    <HashRouter>
      <Layout>
         <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/horarios" element={<Schedule />} />
              <Route path="/fichaje" element={<TimeClock />} />
              <Route path="/vacaciones" element={<Vacations />} />
            </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
