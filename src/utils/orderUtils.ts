
import { patients } from '@/data/mockData';

// Function to get patient name from ID
export const getPatientName = (patientId: string) => {
  const patient = patients.find(p => p.id === patientId);
  return patient ? patient.name : 'Unknown Patient';
};

// Function to format date
export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// Filter orders based on selected patient
export const filterOrdersByPatient = (orders: any[], patientInfo: {name: string, mrn: string} | null) => {
  if (!patientInfo) return orders;
  
  return orders.filter(order => 
    order.patient === patientInfo.name || 
    order.mrn === patientInfo.mrn
  );
};

// Generate a unique ID for new orders
export const generateOrderId = () => {
  return `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// Convert date to timestamp string
export const getCurrentTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
