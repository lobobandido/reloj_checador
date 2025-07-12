
import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { VacationRequest, VacationStatus } from '../types';

const initialRequests: VacationRequest[] = [
  { id: 1, startDate: '2024-12-24', endDate: '2025-01-02', type: 'Vacaciones', status: VacationStatus.Approved, requestedOn: '2024-09-15' },
  { id: 2, startDate: '2024-11-04', endDate: '2024-11-04', type: 'Asuntos Propios', status: VacationStatus.Approved, requestedOn: '2024-09-10' },
  { id: 3, startDate: '2024-10-21', endDate: '2024-10-21', type: 'Asuntos Propios', status: VacationStatus.Pending, requestedOn: '2024-10-18' },
  { id: 4, startDate: '2024-08-05', endDate: '2024-08-09', type: 'Vacaciones', status: VacationStatus.Rejected, requestedOn: '2024-07-01' },
];

const StatusBadge: React.FC<{ status: VacationStatus }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
  const statusClasses = {
    [VacationStatus.Approved]: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    [VacationStatus.Pending]: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    [VacationStatus.Rejected]: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const Vacations: React.FC = () => {
  const [requests, setRequests] = useState<VacationRequest[]>(initialRequests);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRequest: VacationRequest = {
      id: Date.now(),
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      type: formData.get('type') as 'Vacaciones',
      status: VacationStatus.Pending,
      requestedOn: new Date().toISOString().split('T')[0],
    };
    setRequests(prev => [newRequest, ...prev]);
    setIsModalOpen(false);
  };
  
  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Mis Solicitudes</h2>
          <Button onClick={() => setIsModalOpen(true)}>Solicitar Ausencia</Button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Tipo</th>
                        <th scope="col" className="px-6 py-3">Periodo</th>
                        <th scope="col" className="px-6 py-3">Solicitado</th>
                        <th scope="col" className="px-6 py-3">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(req => (
                        <tr key={req.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{req.type}</td>
                            <td className="px-6 py-4">{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{new Date(req.requestedOn).toLocaleDateString()}</td>
                            <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
      
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Solicitar Ausencia">
        <form onSubmit={handleRequestSubmit} className="space-y-4">
          <div>
            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Ausencia</label>
            <select name="type" id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
              <option>Vacaciones</option>
              <option>Asuntos Propios</option>
              <option>Baja Médica</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Inicio</label>
              <input type="date" name="startDate" id="startDate" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
            </div>
            <div>
              <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha de Fin</label>
              <input type="date" name="endDate" id="endDate" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
            </div>
          </div>
          <div>
              <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notas (opcional)</label>
              <textarea id="notes" name="notes" rows={3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"></textarea>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="primary">Enviar Solicitud</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Vacations;
