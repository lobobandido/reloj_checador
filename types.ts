
export enum VacationStatus {
  Pending = 'Pendiente',
  Approved = 'Aprobado',
  Rejected = 'Rechazado',
}

export interface VacationRequest {
  id: number;
  startDate: string;
  endDate: string;
  type: 'Vacaciones' | 'Asuntos Propios' | 'Baja Médica';
  status: VacationStatus;
  requestedOn: string;
}

export interface TimeEntry {
  id: number;
  type: 'Entrada' | 'Salida';
  timestamp: Date;
}

export interface ScheduleEvent {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  title: string;
}
