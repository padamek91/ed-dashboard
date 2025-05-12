
import { availableLabTests } from './testHistoryTypes';

// Mock data for orders display
export const labOrders = [
  {
    id: "lab1",
    patient: "Michael Johnson",
    mrn: "10001",
    urgent: true,
    type: "Complete Blood Count (CBC) with Differential",
    timestamp: "2025-05-11 08:30",
    status: "order placed"
  },
  {
    id: "lab2",
    patient: "Emily Rodriguez",
    mrn: "10002",
    urgent: false,
    type: "Basic Metabolic Panel (BMP)",
    timestamp: "2025-05-11 09:15",
    status: "acknowledged by nurse",
  },
  {
    id: "lab3",
    patient: "David Williams",
    mrn: "10003",
    urgent: true,
    type: "Blood Culture (x2)",
    timestamp: "2025-05-11 10:00",
    status: "collected",
  },
  {
    id: "lab4",
    patient: "Michael Johnson",
    mrn: "10001",
    urgent: false,
    type: "Lipid Panel",
    timestamp: "2025-05-11 11:30",
    status: "processing",
  },
  {
    id: "lab5",
    patient: "Emily Rodriguez",
    mrn: "10002",
    urgent: true,
    type: "Comprehensive Metabolic Panel (CMP)",
    timestamp: "2025-05-10 14:45",
    status: "resulted",
    result: "Multiple values, see report",
    abnormal: true,
    critical: true
  },
  {
    id: "lab6",
    patient: "Sarah Thompson",
    mrn: "10004",
    urgent: false,
    type: "Hemoglobin A1c",
    timestamp: "2025-05-10 15:30",
    status: "resulted",
    result: "5.7%",
    abnormal: true,
    critical: false
  }
];

// List of lab tests that can be ordered
export const labTests = availableLabTests;

// Mock data for medication orders
export const medicationOrders = [
  {
    id: "med1",
    patient: "Michael Johnson",
    mrn: "10001",
    urgent: true,
    type: "Aspirin 81mg daily",
    timestamp: "2025-05-11 08:45",
    status: "ordered"
  },
  {
    id: "med2",
    patient: "Emily Rodriguez",
    mrn: "10002",
    urgent: false,
    type: "Lisinopril 10mg daily",
    timestamp: "2025-05-11 09:30",
    status: "processing"
  },
  {
    id: "med3",
    patient: "David Williams",
    mrn: "10003",
    urgent: true,
    type: "Ceftriaxone 1g IV q12h",
    timestamp: "2025-05-11 10:15",
    status: "administered"
  }
];

// Mock data for imaging orders
export const imagingOrders = [
  {
    id: "img1",
    patient: "Michael Johnson",
    mrn: "10001",
    urgent: false,
    type: "Chest X-ray, 2 views",
    timestamp: "2025-05-11 09:00",
    status: "ordered"
  },
  {
    id: "img2",
    patient: "Emily Rodriguez",
    mrn: "10002",
    urgent: true,
    type: "CT Abdomen with contrast",
    timestamp: "2025-05-11 10:30",
    status: "scheduled"
  }
];

// Mock data for consult orders
export const consultOrders = [
  {
    id: "con1",
    patient: "David Williams",
    mrn: "10003",
    urgent: true,
    type: "Infectious Disease Consult",
    timestamp: "2025-05-11 11:00",
    status: "ordered"
  },
  {
    id: "con2",
    patient: "Sarah Thompson",
    mrn: "10004",
    urgent: false,
    type: "Endocrinology Consult",
    timestamp: "2025-05-11 12:15",
    status: "scheduled"
  }
];
