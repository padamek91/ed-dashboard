export type User = {
  id: string;
  name: string;
  role: 'doctor' | 'nurse';
  username: string;
  password: string; // In a real app, we would never store passwords like this
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  dateOfBirth: string;
  sex: 'Male' | 'Female' | 'Other';
  mrn: string;
  chiefComplaint: string;
  arrivalTime: string;
  timeInED: string;
  triageLevel: 1 | 2 | 3 | 4 | 5;
  location: string;
  attendingPhysician: string;
  nurseAssigned: string;
};

export type Order = {
  id: string;
  patientId: string;
  type: 'Lab' | 'Imaging' | 'Medication' | 'Consult';
  name: string;
  status: 'Ordered' | 'In Progress' | 'Completed' | 'Canceled';
  orderedBy: string;
  orderedAt: string;
  completedAt?: string;
  result?: string;
  critical?: boolean;
  abnormal?: boolean;
};

export type Note = {
  id: string;
  patientId: string;
  type: 'H&P' | 'MDM' | 'Progress' | 'Procedure' | 'Discharge';
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type DepartmentStats = {
  totalPatients: number;
  acuityCounts: Record<number, number>;
  bedsOccupied: number;
  totalBeds: number;
  averageWaitTime: number;
  patientsWaiting: number;
  admittedWaiting: number;
};

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    role: 'doctor',
    username: 'doctor',
    password: 'password',
  },
  {
    id: '2',
    name: 'Nurse Sarah Johnson',
    role: 'nurse',
    username: 'nurse',
    password: 'password',
  },
];

// Mock patients - expanded list
export const patients: Patient[] = [
  {
    id: '1',
    name: 'Michael Johnson',
    age: 45,
    dateOfBirth: '1978-05-15',
    sex: 'Male',
    mrn: 'MRN12345',
    chiefComplaint: 'Chest Pain',
    arrivalTime: '2023-05-10T08:30:00',
    timeInED: '2h 15m',
    triageLevel: 2,
    location: 'Room 3',
    attendingPhysician: 'Dr. John Smith',
    nurseAssigned: 'Nurse Sarah Johnson',
  },
  {
    id: '2',
    name: 'Emily Rodriguez',
    age: 32,
    dateOfBirth: '1991-08-23',
    sex: 'Female',
    mrn: 'MRN23456',
    chiefComplaint: 'Abdominal Pain',
    arrivalTime: '2023-05-10T09:45:00',
    timeInED: '1h 0m',
    triageLevel: 3,
    location: 'Room 7',
    attendingPhysician: 'Dr. John Smith',
    nurseAssigned: 'Nurse Robert Chen',
  },
  {
    id: '3',
    name: 'David Williams',
    age: 68,
    dateOfBirth: '1955-02-10',
    sex: 'Male',
    mrn: 'MRN34567',
    chiefComplaint: 'Shortness of Breath',
    arrivalTime: '2023-05-10T07:15:00',
    timeInED: '3h 30m',
    triageLevel: 1,
    location: 'Room 1',
    attendingPhysician: 'Dr. Maria Gonzalez',
    nurseAssigned: 'Nurse Sarah Johnson',
  },
  {
    id: '4',
    name: 'Sophia Lee',
    age: 25,
    dateOfBirth: '1998-11-29',
    sex: 'Female',
    mrn: 'MRN45678',
    chiefComplaint: 'Laceration - Right Hand',
    arrivalTime: '2023-05-10T10:20:00',
    timeInED: '0h 25m',
    triageLevel: 4,
    location: 'Room 12',
    attendingPhysician: 'Dr. John Smith',
    nurseAssigned: 'Nurse Thomas Jackson',
  },
  {
    id: '5',
    name: 'Robert Johnson',
    age: 52,
    dateOfBirth: '1971-07-02',
    sex: 'Male',
    mrn: 'MRN56789',
    chiefComplaint: 'Fever, Cough',
    arrivalTime: '2023-05-10T08:50:00',
    timeInED: '1h 55m',
    triageLevel: 3,
    location: 'Room 8',
    attendingPhysician: 'Dr. Maria Gonzalez',
    nurseAssigned: 'Nurse Sarah Johnson',
  },
  {
    id: '6',
    name: 'Lisa Martinez',
    age: 41,
    dateOfBirth: '1982-12-17',
    sex: 'Female',
    mrn: 'MRN67890',
    chiefComplaint: 'Migraine',
    arrivalTime: '2023-05-10T09:30:00',
    timeInED: '1h 15m',
    triageLevel: 3,
    location: 'Room 5',
    attendingPhysician: 'Dr. John Smith',
    nurseAssigned: 'Nurse Robert Chen',
  },
  {
    id: '7',
    name: 'James Wilson',
    age: 75,
    dateOfBirth: '1948-03-05',
    sex: 'Male',
    mrn: 'MRN78901',
    chiefComplaint: 'Fall, Hip Pain',
    arrivalTime: '2023-05-10T07:45:00',
    timeInED: '3h 0m',
    triageLevel: 2,
    location: 'Room 2',
    attendingPhysician: 'Dr. Maria Gonzalez',
    nurseAssigned: 'Nurse Thomas Jackson',
  },
  {
    id: '8',
    name: 'Emma Thompson',
    age: 29,
    dateOfBirth: '1994-09-08',
    sex: 'Female',
    mrn: 'MRN89012',
    chiefComplaint: 'Allergic Reaction',
    arrivalTime: '2023-05-10T10:05:00',
    timeInED: '0h 40m',
    triageLevel: 2,
    location: 'Room 4',
    attendingPhysician: 'Dr. John Smith',
    nurseAssigned: 'Nurse Sarah Johnson',
  },
  
  // Additional patients
  {
    id: '9',
    name: 'Alexander Kim',
    age: 34,
    dateOfBirth: '1991-02-15',
    sex: 'Male',
    mrn: 'MRN90123',
    chiefComplaint: 'Lower back pain',
    arrivalTime: '2023-05-10T08:15:00',
    timeInED: '2h 40m',
    triageLevel: 3,
    location: 'Room 9',
    attendingPhysician: 'Dr. John Smith',
    nurseAssigned: 'Nurse Sarah Johnson',
  },
  {
    id: '10',
    name: 'Olivia Parker',
    age: 27,
    dateOfBirth: '1998-07-22',
    sex: 'Female',
    mrn: 'MRN01234',
    chiefComplaint: 'Severe headache',
    arrivalTime: '2023-05-10T09:10:00',
    timeInED: '1h 40m',
    triageLevel: 2,
    location: 'Room 11',
    attendingPhysician: 'Dr. John Smith',
    nurseAssigned: 'Nurse Sarah Johnson',
  },
  {
    id: '11',
    name: 'William Chen',
    age: 62,
    dateOfBirth: '1963-04-03',
    sex: 'Male',
    mrn: 'MRN12345',
    chiefComplaint: 'Dizziness, nausea',
    arrivalTime: '2023-05-10T10:30:00',
    timeInED: '0h 15m',
    triageLevel: 3,
    location: 'Room 14',
    attendingPhysician: 'Dr. Maria Gonzalez',
    nurseAssigned: 'Nurse Thomas Jackson',
  },
  {
    id: '12',
    name: 'Isabella Rodriguez',
    age: 5,
    dateOfBirth: '2020-01-12',
    sex: 'Female',
    mrn: 'MRN23456',
    chiefComplaint: 'High fever, rash',
    arrivalTime: '2023-05-10T07:50:00',
    timeInED: '2h 55m',
    triageLevel: 2,
    location: 'Peds Room 2',
    attendingPhysician: 'Dr. Maria Gonzalez',
    nurseAssigned: 'Nurse Sarah Johnson',
  },
  {
    id: '13',
    name: 'George Washington',
    age: 78,
    dateOfBirth: '1947-11-28',
    sex: 'Male',
    mrn: 'MRN34567',
    chiefComplaint: 'Chest pain, arm numbness',
    arrivalTime: '2023-05-10T08:25:00',
    timeInED: '2h 30m',
    triageLevel: 1,
    location: 'Room 1',
    attendingPhysician: 'Dr. John Smith',
    nurseAssigned: 'Nurse Robert Chen',
  },
  {
    id: '14',
    name: 'Sophia Patel',
    age: 42,
    dateOfBirth: '1983-08-05',
    sex: 'Female',
    mrn: 'MRN45678',
    chiefComplaint: 'Abdominal pain, vomiting',
    arrivalTime: '2023-05-10T09:40:00',
    timeInED: '1h 15m',
    triageLevel: 3,
    location: 'Room 6',
    attendingPhysician: 'Dr. Maria Gonzalez',
    nurseAssigned: 'Nurse Robert Chen',
  }
];

// Mock orders
export const orders: Order[] = [
  {
    id: '1',
    patientId: '1',
    type: 'Lab',
    name: 'CBC',
    status: 'Completed',
    orderedBy: 'Dr. John Smith',
    orderedAt: '2023-05-10T08:45:00',
    completedAt: '2023-05-10T09:15:00',
    result: 'WBC: 12.5, RBC: 4.2, Hgb: 13.5, Hct: 40.2, Plt: 250',
    abnormal: true,
  },
  {
    id: '2',
    patientId: '1',
    type: 'Lab',
    name: 'Cardiac Enzymes',
    status: 'Completed',
    orderedBy: 'Dr. John Smith',
    orderedAt: '2023-05-10T08:45:00',
    completedAt: '2023-05-10T09:30:00',
    result: 'Troponin: 0.8 ng/mL',
    critical: true,
  },
  {
    id: '3',
    patientId: '1',
    type: 'Imaging',
    name: 'Chest X-ray',
    status: 'Completed',
    orderedBy: 'Dr. John Smith',
    orderedAt: '2023-05-10T08:50:00',
    completedAt: '2023-05-10T09:20:00',
    result: 'No acute cardiopulmonary process. No pneumothorax or effusion.',
  },
  {
    id: '4',
    patientId: '1',
    type: 'Medication',
    name: 'Aspirin 325mg',
    status: 'Ordered',
    orderedBy: 'Dr. John Smith',
    orderedAt: '2023-05-10T08:55:00',
  },
  {
    id: '5',
    patientId: '2',
    type: 'Lab',
    name: 'CBC',
    status: 'Completed',
    orderedBy: 'Dr. John Smith',
    orderedAt: '2023-05-10T09:50:00',
    completedAt: '2023-05-10T10:20:00',
    result: 'WBC: 8.2, RBC: 4.5, Hgb: 12.8, Hct: 38.5, Plt: 320',
  },
  {
    id: '6',
    patientId: '2',
    type: 'Lab',
    name: 'Comprehensive Metabolic Panel',
    status: 'In Progress',
    orderedBy: 'Dr. John Smith',
    orderedAt: '2023-05-10T09:50:00',
  },
  {
    id: '7',
    patientId: '2',
    type: 'Imaging',
    name: 'Abdominal CT',
    status: 'Ordered',
    orderedBy: 'Dr. John Smith',
    orderedAt: '2023-05-10T10:00:00',
  },
  {
    id: '8',
    patientId: '3',
    type: 'Lab',
    name: 'ABG',
    status: 'Completed',
    orderedBy: 'Dr. Maria Gonzalez',
    orderedAt: '2023-05-10T07:20:00',
    completedAt: '2023-05-10T07:45:00',
    result: 'pH: 7.32, PaCO2: 50, PaO2: 60, HCO3: 24',
    critical: true,
  },
  {
    id: '9',
    patientId: '3',
    type: 'Imaging',
    name: 'Chest X-ray',
    status: 'Completed',
    orderedBy: 'Dr. Maria Gonzalez',
    orderedAt: '2023-05-10T07:25:00',
    completedAt: '2023-05-10T08:00:00',
    result: 'Bilateral infiltrates consistent with pneumonia.',
    abnormal: true,
  },
  {
    id: '10',
    patientId: '3',
    type: 'Medication',
    name: 'Albuterol Nebulizer',
    status: 'Completed',
    orderedBy: 'Dr. Maria Gonzalez',
    orderedAt: '2023-05-10T07:30:00',
    completedAt: '2023-05-10T07:50:00',
  },
];

// Mock notes
export const notes: Note[] = [
  {
    id: '1',
    patientId: '1',
    type: 'H&P',
    title: 'Initial Assessment',
    content: '45-year-old male presenting with severe chest pain radiating to left arm. Pain began approximately 2 hours ago while at rest. Patient reports history of hypertension and high cholesterol. Family history significant for MI in father at age 50.',
    createdBy: 'Dr. John Smith',
    createdAt: '2023-05-10T08:40:00',
    updatedAt: '2023-05-10T08:40:00',
  },
  {
    id: '2',
    patientId: '1',
    type: 'MDM',
    title: 'Medical Decision Making',
    content: 'Given presentation of chest pain, elevated troponin, and patient risk factors, acute coronary syndrome is suspected. Will administer aspirin, obtain cardiology consult, and admit for further monitoring and management.',
    createdBy: 'Dr. John Smith',
    createdAt: '2023-05-10T09:40:00',
    updatedAt: '2023-05-10T09:40:00',
  },
  {
    id: '3',
    patientId: '2',
    type: 'H&P',
    title: 'Initial Assessment',
    content: '32-year-old female with acute onset of lower right quadrant abdominal pain beginning this morning. Pain is sharp and non-radiating. Patient reports nausea but no vomiting. Last menstrual period was 2 weeks ago. No significant past medical history.',
    createdBy: 'Dr. John Smith',
    createdAt: '2023-05-10T09:55:00',
    updatedAt: '2023-05-10T09:55:00',
  },
  {
    id: '4',
    patientId: '3',
    type: 'H&P',
    title: 'Initial Assessment',
    content: '68-year-old male with history of COPD presenting with acute shortness of breath and productive cough for past 3 days. Patient reports increased sputum production, fever, and decreased exercise tolerance. Currently on home oxygen at 2L.',
    createdBy: 'Dr. Maria Gonzalez',
    createdAt: '2023-05-10T07:30:00',
    updatedAt: '2023-05-10T07:30:00',
  },
  {
    id: '5',
    patientId: '3',
    type: 'Progress',
    title: 'Response to Treatment',
    content: 'Patient showing improvement after bronchodilator therapy. Oxygen saturation increased from 88% to 93% on 4L. Admitted to medicine for IV antibiotics and continued respiratory support.',
    createdBy: 'Dr. Maria Gonzalez',
    createdAt: '2023-05-10T10:00:00',
    updatedAt: '2023-05-10T10:00:00',
  },
];

// Department stats
export const departmentStats: DepartmentStats = {
  totalPatients: 24,
  acuityCounts: {
    1: 3,
    2: 7,
    3: 10,
    4: 3,
    5: 1,
  },
  bedsOccupied: 18,
  totalBeds: 25,
  averageWaitTime: 45, // minutes
  patientsWaiting: 6,
  admittedWaiting: 4,
};
