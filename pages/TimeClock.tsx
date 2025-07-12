
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { TimeEntry } from '../types';
import { LoginIcon, LogoutIcon } from '../components/icons/ContentIcons';


const TimeClock: React.FC = () => {
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleClock = () => {
        const newEntry: TimeEntry = {
            id: Date.now(),
            type: isClockedIn ? 'Salida' : 'Entrada',
            timestamp: new Date(),
        };
        setTimeEntries(prev => [newEntry, ...prev]);
        setIsClockedIn(!isClockedIn);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center p-6 border-r-0 md:border-r border-gray-200 dark:border-gray-700">
                        <h2 className="text-5xl font-bold font-mono text-primary-600 dark:text-primary-400">{currentTime.toLocaleTimeString('es-ES')}</h2>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">{currentTime.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <Button 
                            size="lg"
                            variant={isClockedIn ? 'danger' : 'primary'}
                            onClick={handleClock}
                            className="mt-8 w-full"
                        >
                           {isClockedIn ? 'Registrar Salida' : 'Registrar Entrada'}
                        </Button>
                        {isClockedIn && <p className="mt-4 text-sm text-green-600 dark:text-green-400 animate-pulse">Jornada en curso...</p>}
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 px-2">Registros de Hoy</h3>
                        <div className="max-h-64 overflow-y-auto pr-2">
                             {timeEntries.length > 0 ? (
                                <ul className="space-y-3">
                                    {timeEntries.map(entry => (
                                        <li key={entry.id} className={`flex items-center p-3 rounded-lg ${entry.type === 'Entrada' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-red-100 dark:bg-red-900/50'}`}>
                                            <span className="mr-4">
                                                {entry.type === 'Entrada' ? <LoginIcon className="w-6 h-6 text-green-500" /> : <LogoutIcon className="w-6 h-6 text-red-500" />}
                                            </span>
                                            <span className="font-medium text-gray-700 dark:text-gray-200">{entry.type}</span>
                                            <span className="ml-auto text-sm text-gray-600 dark:text-gray-400 font-mono">{entry.timestamp.toLocaleTimeString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 dark:text-gray-400 py-8">Aún no hay registros hoy.</p>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default TimeClock;
