
import React from 'react';
import Card from '../components/Card';
import { ScheduleEvent } from '../types';

const scheduleData: ScheduleEvent[] = [
    { id: 1, day: 'Lunes', startTime: '09:00', endTime: '17:00', title: 'Turno de Mañana' },
    { id: 2, day: 'Martes', startTime: '09:00', endTime: '17:00', title: 'Turno de Mañana' },
    { id: 3, day: 'Miércoles', startTime: '09:00', endTime: '13:00', title: 'Media Jornada' },
    { id: 4, day: 'Jueves', startTime: '09:00', endTime: '17:00', title: 'Turno de Mañana' },
    { id: 5, day: 'Viernes', startTime: '09:00', endTime: '17:00', title: 'Turno de Mañana' },
];

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const Schedule: React.FC = () => {

    const getEventsForDay = (day: string) => {
        return scheduleData.filter(event => event.day === day);
    };

    return (
        <Card title="Mi Horario Semanal">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {daysOfWeek.map(day => (
                    <div key={day} className="bg-white dark:bg-gray-800 min-h-[150px]">
                        <div className="p-2 border-b border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-center text-gray-700 dark:text-gray-300">{day}</h4>
                        </div>
                        <div className="p-2 space-y-2">
                            {getEventsForDay(day).length > 0 ? (
                                getEventsForDay(day).map(event => (
                                    <div key={event.id} className="bg-primary-100 dark:bg-primary-900/50 p-2 rounded-md text-center">
                                        <p className="text-sm font-semibold text-primary-800 dark:text-primary-200">{event.title}</p>
                                        <p className="text-xs text-primary-600 dark:text-primary-400">{event.startTime} - {event.endTime}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-center text-gray-400 dark:text-gray-500 pt-8">Libre</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default Schedule;
