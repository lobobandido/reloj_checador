
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/Card';
import Button from '../components/Button';
import { ClockIcon, CheckCircleIcon, CalendarIcon } from '../components/icons/ContentIcons';

const hoursData = [
  { name: 'Lun', hours: 4 },
  { name: 'Mar', hours: 8 },
  { name: 'Mié', hours: 7.5 },
  { name: 'Jue', hours: 8 },
  { name: 'Vie', hours: 5 },
  { name: 'Sáb', hours: 0 },
  { name: 'Dom', hours: 0 },
];

const upcomingVacations = [
    { id: 1, type: 'Vacaciones', period: '25 Dic, 2024 - 01 Ene, 2025' },
    { id: 2, type: 'Asuntos Propios', period: '12 Nov, 2024' },
];

const Dashboard: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    let interval: number;
    if (isClockedIn && clockInTime) {
      interval = window.setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - clockInTime.getTime();
        const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        setElapsedTime(`${h}:${m}:${s}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, clockInTime]);

  const handleClockToggle = () => {
    if (isClockedIn) {
        setIsClockedIn(false);
        setClockInTime(null);
        setElapsedTime('00:00:00');
    } else {
        setIsClockedIn(true);
        setClockInTime(new Date());
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Clock-in Card */}
      <Card title="Estado Actual" className="lg:col-span-1 md:col-span-2">
        <div className="flex flex-col items-center justify-center text-center h-full">
            {isClockedIn ? (
                <>
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mb-4" />
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">Jornada Iniciada</p>
                    <p className="text-3xl font-mono font-bold text-primary-600 dark:text-primary-400 my-2">{elapsedTime}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Desde las {clockInTime?.toLocaleTimeString()}</p>
                </>
            ) : (
                <>
                    <ClockIcon className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">Fuera de la oficina</p>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Pulsa para iniciar tu jornada</p>
                </>
            )}
             <Button 
                variant={isClockedIn ? 'danger' : 'primary'} 
                size="lg" 
                className="mt-6 w-full max-w-xs"
                onClick={handleClockToggle}
            >
                {isClockedIn ? 'Finalizar Jornada' : 'Iniciar Jornada'}
            </Button>
        </div>
      </Card>

      {/* Weekly Hours Chart Card */}
      <Card title="Resumen de Horas Semanales" className="lg:col-span-2">
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={hoursData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                    <XAxis dataKey="name" tick={{ fill: '#9ca3af' }} />
                    <YAxis tick={{ fill: '#9ca3af' }}/>
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#1f2937', 
                            borderColor: '#374151', 
                            color: '#e5e7eb' 
                        }} 
                        cursor={{fill: 'rgba(55, 65, 81, 0.3)'}}
                    />
                    <Legend />
                    <Bar dataKey="hours" name="Horas Trabajadas" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </Card>

      {/* Upcoming Vacations Card */}
      <Card title="Próximas Ausencias" className="lg:col-span-3">
        {upcomingVacations.length > 0 ? (
             <ul className="space-y-4">
                {upcomingVacations.map(vacation => (
                    <li key={vacation.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/50 p-2 rounded-full mr-4">
                            <CalendarIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-100">{vacation.type}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{vacation.period}</p>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">No tienes ausencias programadas.</p>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
