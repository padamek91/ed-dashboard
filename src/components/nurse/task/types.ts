
export interface Task {
  id: string;
  patientId: string;
  patientName: string;
  patientMrn: string;
  task: string;
  status: string;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  completedAt: string | null;
  taskType: 'lab' | 'medication' | 'other';
  orderId?: string;
}

export const initialNurseTasks: Task[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Michael Johnson',
    patientMrn: 'MRN12345',
    task: 'Administer Aspirin 325mg',
    status: 'pending',
    dueTime: '2025-05-11T09:15:00',
    priority: 'high',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null,
    taskType: 'medication'
  },
  {
    id: '2',
    patientId: '1',
    patientName: 'Michael Johnson',
    patientMrn: 'MRN12345',
    task: 'Check vital signs',
    status: 'pending',
    dueTime: '2025-05-11T09:30:00',
    priority: 'medium',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null,
    taskType: 'other'
  },
  {
    id: '3',
    patientId: '2',
    patientName: 'Emily Rodriguez',
    patientMrn: 'MRN23456',
    task: 'Collect blood sample for labs',
    status: 'pending',
    dueTime: '2025-05-11T10:15:00',
    priority: 'medium',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null,
    taskType: 'lab'
  },
  {
    id: '4',
    patientId: '3',
    patientName: 'David Williams',
    patientMrn: 'MRN34567',
    task: 'Monitor oxygen saturation',
    status: 'pending',
    dueTime: '2025-05-11T08:00:00',
    priority: 'high',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null,
    taskType: 'other'
  },
  {
    id: '5',
    patientId: '3',
    patientName: 'David Williams',
    patientMrn: 'MRN34567',
    task: 'Administer nebulizer treatment',
    status: 'pending',
    dueTime: '2025-05-11T08:30:00',
    priority: 'high',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: null,
    taskType: 'medication'
  },
  {
    id: '6',
    patientId: '5',
    patientName: 'Robert Johnson',
    patientMrn: 'MRN56789',
    task: 'Administer antipyretic medication',
    status: 'completed',
    dueTime: '2025-05-11T09:00:00',
    priority: 'medium',
    assignedTo: 'Nurse Sarah Johnson',
    completedAt: '2025-05-11T09:05:00',
    taskType: 'medication'
  },
  {
    id: '7',
    patientId: '4',
    patientName: 'Sophia Lee',
    patientMrn: 'MRN45678',
    task: 'Clean and dress laceration',
    status: 'completed',
    dueTime: '2025-05-11T10:30:00',
    priority: 'medium',
    assignedTo: 'Nurse Thomas Jackson',
    completedAt: '2025-05-11T10:35:00',
    taskType: 'other'
  },
  {
    id: '8',
    patientId: '6',
    patientName: 'Lisa Martinez',
    patientMrn: 'MRN67890',
    task: 'Administer pain medication',
    status: 'pending',
    dueTime: '2025-05-11T10:00:00',
    priority: 'high',
    assignedTo: 'Nurse Robert Chen',
    completedAt: null,
    taskType: 'medication'
  }
];
