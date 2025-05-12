
import { patients } from '@/data/mockData';

// Function to get patient name from ID
export const getPatientName = (patientId: string) => {
  const patient = patients.find(p => p.id === patientId);
  return patient ? patient.name : 'Unknown Patient';
};

// Function to format date
export const formatDateTime = (dateString: string) => {
  if (!dateString) return 'N/A';
  
  try {
    // Check if dateString is in ISO format or custom format
    let date;
    if (dateString.includes('T') || dateString.includes('Z')) {
      // ISO format (with T or Z)
      date = new Date(dateString);
    } else {
      // Custom format like '2025-05-12 12:34'
      const [datePart, timePart] = dateString.split(' ');
      const [year, month, day] = datePart.split('-');
      
      if (timePart && timePart.includes(':')) {
        const [hours, minutes] = timePart.split(':');
        date = new Date(
          parseInt(year), 
          parseInt(month) - 1, // month is 0-indexed in JS Date
          parseInt(day),
          parseInt(hours),
          parseInt(minutes)
        );
      } else {
        // If no time part, default to midnight
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      }
    }
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', dateString);
      return 'Invalid date';
    }
    
    return date.toLocaleString();
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date error';
  }
};

// Normalize MRN by removing prefix if present
export const normalizeMrn = (mrn: string): string => {
  return mrn.replace(/^MRN/i, '');
};

// Filter orders based on selected patient
export const filterOrdersByPatient = (orders: any[], patientInfo: {name: string, mrn: string} | null) => {
  if (!patientInfo) return orders;
  
  const normalizedMrn = normalizeMrn(patientInfo.mrn);
  
  return orders.filter(order => 
    order.patient === patientInfo.name || 
    normalizeMrn(order.mrn) === normalizedMrn
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
