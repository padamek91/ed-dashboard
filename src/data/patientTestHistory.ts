
import { TestHistory } from './testHistoryTypes';
import { availableLabTests } from './testHistoryTypes';

// Collection of test histories per patient - Using ONLY numeric MRNs here
// This is key for the duplicate order check to work properly
export const patientTestHistory: Record<string, TestHistory[]> = {
  // Michael Johnson's test history (Dr. Smith's patient) - MRN without prefix
  '10001': [
    // Recent results (within last 24 hours)
    {
      testName: "Complete Blood Count (CBC) with Differential",
      result: '10.8',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      timestamp: '2025-05-12 01:30', // Very recent (today)
      patientId: '10001',
      abnormal: false
    },
    {
      testName: "Basic Metabolic Panel (BMP)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 01:30', // Very recent (today)
      patientId: '10001',
      abnormal: false
    },
    {
      testName: "Cardiac Enzymes Panel (Troponin, CK-MB, etc.)",
      result: '0.9',
      units: 'ng/mL',
      referenceRange: '<0.04 ng/mL',
      timestamp: '2025-05-12 00:45', // Very recent (today)
      patientId: '10001',
      abnormal: true
    },
    {
      testName: "Comprehensive Metabolic Panel (CMP)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 22:10',
      patientId: '10001',
      abnormal: false
    },
    {
      testName: "Lipid Panel",
      result: '195',
      units: 'mg/dL',
      referenceRange: '<200 mg/dL',
      patientId: '10001',
      timestamp: '2025-05-11 21:45',
      abnormal: false
    },
    // Additional recent tests
    {
      testName: "C-Reactive Protein (CRP)",
      result: '2.8',
      units: 'mg/L',
      referenceRange: '<3.0 mg/L',
      patientId: '10001',
      timestamp: '2025-05-11 20:30',
      abnormal: false
    },
    {
      testName: "Coagulation Panel (PT, PTT, INR)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      patientId: '10001',
      timestamp: '2025-05-11 19:15',
      abnormal: false
    },
    {
      testName: "Urinalysis (UA), Automated",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      patientId: '10001',
      timestamp: '2025-05-11 18:00',
      abnormal: false
    },
    {
      testName: "Troponin I",
      result: '0.6',
      units: 'ng/mL',
      referenceRange: '<0.04 ng/mL',
      timestamp: '2025-05-01 10:15',
      patientId: '10001',
      abnormal: true
    },
    {
      testName: "Troponin I",
      result: '0.3',
      units: 'ng/mL',
      referenceRange: '<0.04 ng/mL',
      timestamp: '2025-04-30 08:00',
      patientId: '10001',
      abnormal: true
    },
    {
      testName: "Urine Culture",
      result: 'No Growth',
      units: '',
      referenceRange: 'No Growth',
      timestamp: '2025-05-12 02:15', // Very recent (today)
      patientId: '10001',
      abnormal: false
    },
    {
      testName: "Lactate",
      result: '1.8',
      units: 'mmol/L',
      referenceRange: '0.5-2.2 mmol/L',
      timestamp: '2025-05-12 01:55', // Very recent (today)
      patientId: '10001',
      abnormal: false
    },
    {
      testName: "Hemoglobin A1c",
      result: '5.9',
      units: '%',
      referenceRange: '4.0-5.6 %',
      patientId: '10001',
      timestamp: '2025-05-11 16:20', // Very recent (yesterday)
      abnormal: true
    },
    {
      testName: "Electrolyte Panel",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 14:35', // Very recent (yesterday)
      patientId: '10001',
      abnormal: false
    },
    {
      testName: "Blood Culture (x2)",
      result: 'No Growth',
      units: '',
      referenceRange: 'No Growth',
      timestamp: '2025-05-11 12:50', // Very recent (yesterday)
      patientId: '10001',
      abnormal: false
    }
  ],
  
  // Emily Rodriguez's test history (Dr. Smith's patient) - MRN without prefix
  '10002': [
    // Very recent results (from last 24 hours)
    {
      testName: "Complete Blood Count (CBC) with Differential",
      result: '12.1',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      timestamp: '2025-05-11 22:15', // Very recent (yesterday)
      patientId: '10002',
      abnormal: true
    },
    {
      testName: "Urinalysis (UA), Automated",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 23:00', // Very recent (yesterday)
      patientId: '10002',
      abnormal: false
    },
    {
      testName: "Lipid Panel",
      result: '210',
      units: 'mg/dL',
      referenceRange: '<200 mg/dL',
      timestamp: '2025-05-12 02:15', // Very recent (today)
      patientId: '10002',
      abnormal: true
    },
    {
      testName: "Basic Metabolic Panel (BMP)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 01:45',
      patientId: '10002',
      abnormal: false
    },
    {
      testName: "Liver Function Tests (LFTs)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 00:30',
      patientId: '10002',
      abnormal: false
    },
    {
      testName: "Coagulation Panel (PT, PTT, INR)",
      result: 'PT: 12.5s, INR: 1.1',
      units: 'Various',
      referenceRange: 'PT: 11.0-13.5s, INR: 0.8-1.2',
      timestamp: '2025-05-11 21:00',
      patientId: '10002',
      abnormal: false
    },
    {
      testName: "Glucose (Serum)",
      result: '105',
      units: 'mg/dL',
      referenceRange: '70-100 mg/dL',
      timestamp: '2025-05-11 20:15',
      patientId: '10002',
      abnormal: true
    },
    {
      testName: "C-Reactive Protein (CRP)",
      result: '1.8',
      units: 'mg/L',
      referenceRange: '<3.0 mg/L',
      patientId: '10002',
      timestamp: '2025-05-11 18:45',
      abnormal: false
    },
    {
      testName: "COVID-19 PCR Panel",
      result: 'Negative',
      units: '',
      referenceRange: 'Negative',
      timestamp: '2025-05-12 03:00', // Very recent (today)
      patientId: '10002',
      abnormal: false
    },
    {
      testName: "Iron Studies Panel",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 02:30', // Very recent (today)
      patientId: '10002',
      abnormal: false
    },
    {
      testName: "Thyroid Panel (TSH, Free T4 ± T3)",
      result: 'TSH: 2.8 mIU/L',
      units: 'Various',
      referenceRange: 'TSH: 0.4-4.0 mIU/L',
      timestamp: '2025-05-12 01:15', // Very recent (today)
      patientId: '10002',
      abnormal: false
    },
    {
      testName: "Urine Drug Screen (UDS), Qualitative",
      result: 'Negative for all substances',
      units: '',
      referenceRange: 'Negative',
      timestamp: '2025-05-11 19:30', // Very recent (yesterday)
      patientId: '10002',
      abnormal: false
    },
    {
      testName: "HCG (Qualitative and Quantitative)",
      result: 'Negative',
      units: '',
      referenceRange: 'Negative',
      timestamp: '2025-05-11 17:10', // Very recent (yesterday)
      patientId: '10002',
      abnormal: false
    },
    {
      testName: "Blood Culture (x2)",
      result: 'No Growth',
      units: '',
      referenceRange: 'No Growth',
      patientId: '10002',
      timestamp: '2025-05-10 09:30', // Very recent
      abnormal: false
    },
    {
      testName: "Hemoglobin A1c",
      result: '5.7',
      units: '%',
      referenceRange: '4.0-5.6 %',
      timestamp: '2025-05-11 11:20',
      patientId: '10002',
      abnormal: true
    }
  ],
  
  // David Williams's test history (Dr. Smith's patient) - MRN without prefix
  '10003': [
    {
      testName: "Comprehensive Metabolic Panel (CMP)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 23:45', // Very recent (yesterday)
      patientId: '10003',
      abnormal: false
    },
    {
      testName: "C-Reactive Protein (CRP)",
      result: '14.2',
      units: 'mg/L',
      referenceRange: '<3.0 mg/L',
      timestamp: '2025-05-12 00:30', // Very recent (today)
      patientId: '10003',
      abnormal: true
    },
    {
      testName: "Inflammatory Markers Panel (CRP, ESR, Procalcitonin)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 01:15', // Very recent (today)
      patientId: '10003',
      abnormal: true
    },
    {
      testName: "Complete Blood Count (CBC) with Differential",
      result: '15.8',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      timestamp: '2025-05-12 02:00',
      patientId: '10003',
      abnormal: true
    },
    {
      testName: "Coagulation Panel (PT, PTT, INR)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 22:30',
      patientId: '10003',
      abnormal: false
    },
    {
      testName: "Basic Metabolic Panel (BMP)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 21:15',
      patientId: '10003',
      abnormal: false
    },
    {
      testName: "Lactate",
      result: '2.8',
      units: 'mmol/L',
      referenceRange: '0.5-2.2 mmol/L',
      timestamp: '2025-05-11 20:00',
      patientId: '10003',
      abnormal: true
    },
    {
      testName: "Sepsis Workup Panel (CBC, Lactate, Blood Cultures, Procalcitonin)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 18:45',
      patientId: '10003',
      abnormal: true
    },
    {
      testName: "Respiratory Viral Panel (RVP) – PCR",
      result: 'Negative for all viruses',
      units: '',
      referenceRange: 'Negative',
      timestamp: '2025-05-12 03:30', // Very recent (today)
      patientId: '10003',
      abnormal: false
    },
    {
      testName: "Blood Culture (x2)",
      result: 'No Growth at 24 hours',
      units: '',
      referenceRange: 'No Growth',
      timestamp: '2025-05-12 02:45', // Very recent (today)
      patientId: '10003',
      abnormal: false
    },
    {
      testName: "Prothrombin Time (PT) / International Normalized Ratio (INR)",
      result: 'PT: 13.5s, INR: 1.2',
      units: 'Various',
      referenceRange: 'PT: 11.0-13.5s, INR: 0.8-1.2',
      timestamp: '2025-05-12 01:40', // Very recent (today)
      patientId: '10003',
      abnormal: false
    },
    {
      testName: "D-dimer",
      result: '0.7',
      units: 'mg/L FEU',
      referenceRange: '<0.5 mg/L FEU',
      timestamp: '2025-05-11 22:00', // Very recent (yesterday)
      patientId: '10003',
      abnormal: true
    },
    {
      testName: "B-type Natriuretic Peptide (BNP)",
      result: '2200',
      units: 'pg/mL',
      referenceRange: '<300 pg/mL',
      timestamp: '2025-05-11 19:25', // Very recent (yesterday)
      patientId: '10003',
      abnormal: true
    },
    {
      testName: "Hemoglobin A1c",
      result: '7.2',
      units: '%',
      referenceRange: '4.0-5.6 %',
      patientId: '10003',
      timestamp: '2025-05-10 08:15', // Very recent
      abnormal: true
    },
    {
      testName: "Urine Culture",
      result: 'E. coli >100,000 CFU/mL',
      units: 'CFU/mL',
      referenceRange: 'No Growth',
      timestamp: '2025-05-12 04:15',
      patientId: '10003',
      abnormal: true
    }
  ],
  
  // Sarah Thompson's test history (Dr. Jones's patient) - MRN without prefix
  '10004': [
    {
      testName: "Complete Blood Count (CBC) with Differential",
      result: '9.2',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      timestamp: '2025-05-12 02:15', // Today
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "Basic Metabolic Panel (BMP)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 02:30', // Today
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "Urinalysis (UA), Automated",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 03:00', // Today
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "Lipid Panel",
      result: '215',
      units: 'mg/dL',
      referenceRange: '<200 mg/dL',
      timestamp: '2025-05-12 02:45', // Today
      patientId: '10004',
      abnormal: true
    },
    {
      testName: "Thyroid Panel (TSH, Free T4 ± T3)",
      result: 'TSH: 5.2 mIU/L',
      units: 'Various',
      referenceRange: 'TSH: 0.4-4.0 mIU/L',
      timestamp: '2025-05-12 01:30', // Today
      patientId: '10004',
      abnormal: true
    },
    {
      testName: "Glucose (Serum)",
      result: '98',
      units: 'mg/dL',
      referenceRange: '70-100 mg/dL',
      timestamp: '2025-05-11 23:45', // Yesterday
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "Hemoglobin A1c",
      result: '5.5',
      units: '%',
      referenceRange: '4.0-5.6 %',
      timestamp: '2025-05-11 22:30', // Yesterday
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "Vitamin B12 and Folate",
      result: 'B12: 320 pg/mL, Folate: 12 ng/mL',
      units: 'Various',
      referenceRange: 'B12: 200-900 pg/mL, Folate: >3 ng/mL',
      timestamp: '2025-05-11 21:15', // Yesterday
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "Iron Studies Panel",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 20:00', // Yesterday
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "C-Reactive Protein (CRP)",
      result: '1.2',
      units: 'mg/L',
      referenceRange: '<3.0 mg/L',
      patientId: '10004',
      timestamp: '2025-05-11 18:45', // Yesterday
      abnormal: false
    },
    {
      testName: "Liver Function Tests (LFTs)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 17:30', // Yesterday
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "Electrolyte Panel",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 16:15', // Yesterday
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "COVID-19 PCR Panel",
      result: 'Negative',
      units: '',
      referenceRange: 'Negative',
      timestamp: '2025-05-10 15:00', // Two days ago
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "Calcium (Total and Ionized)",
      result: 'Total: 9.2 mg/dL, Ionized: 1.25 mmol/L',
      units: 'Various',
      referenceRange: 'Total: 8.6-10.2 mg/dL, Ionized: 1.15-1.29 mmol/L',
      timestamp: '2025-05-10 13:45', // Two days ago
      patientId: '10004',
      abnormal: false
    },
    {
      testName: "Magnesium",
      result: '2.1',
      units: 'mg/dL',
      referenceRange: '1.7-2.2 mg/dL',
      timestamp: '2025-05-10 12:30', // Two days ago
      patientId: '10004',
      abnormal: false
    }
  ],
  
  // James Wilson's test history (Dr. Johnson's patient) - MRN without prefix
  '10005': [
    {
      testName: "Complete Blood Count (CBC) with Differential",
      result: '16.5',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      timestamp: '2025-05-12 03:45', // Today
      patientId: '10005',
      abnormal: true
    },
    {
      testName: "Basic Metabolic Panel (BMP)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 04:00', // Today
      patientId: '10005',
      abnormal: false
    },
    {
      testName: "Sepsis Workup Panel (CBC, Lactate, Blood Cultures, Procalcitonin)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 04:15', // Today
      patientId: '10005',
      abnormal: true
    },
    {
      testName: "Blood Culture (x2)",
      result: 'Pending',
      units: '',
      referenceRange: 'No Growth',
      timestamp: '2025-05-12 04:30', // Today
      patientId: '10005',
      abnormal: false
    },
    {
      testName: "Lactate",
      result: '3.5',
      units: 'mmol/L',
      referenceRange: '0.5-2.2 mmol/L',
      timestamp: '2025-05-12 04:45', // Today
      patientId: '10005',
      abnormal: true
    },
    {
      testName: "C-Reactive Protein (CRP)",
      result: '8.5',
      units: 'mg/L',
      referenceRange: '<3.0 mg/L',
      timestamp: '2025-05-12 03:30', // Today
      patientId: '10005',
      abnormal: true
    },
    {
      testName: "Inflammatory Markers Panel (CRP, ESR, Procalcitonin)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 03:15', // Today
      patientId: '10005',
      abnormal: true
    },
    {
      testName: "Comprehensive Metabolic Panel (CMP)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 02:00', // Today
      patientId: '10005',
      abnormal: false
    },
    {
      testName: "Liver Function Tests (LFTs)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 01:15', // Today
      patientId: '10005',
      abnormal: false
    },
    {
      testName: "Urinalysis (UA), Automated",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 00:30', // Today
      patientId: '10005',
      abnormal: false
    },
    {
      testName: "Urine Culture",
      result: 'Pending',
      units: '',
      referenceRange: 'No Growth',
      timestamp: '2025-05-12 00:45', // Today
      patientId: '10005',
      abnormal: false
    },
    {
      testName: "Electrolyte Panel",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 23:30', // Yesterday
      patientId: '10005',
      abnormal: false
    },
    {
      testName: "Cardiac Enzymes Panel (Troponin, CK-MB, etc.)",
      result: 'Troponin: 0.02 ng/mL',
      units: 'ng/mL',
      referenceRange: '<0.04 ng/mL',
      timestamp: '2025-05-11 22:15', // Yesterday
      patientId: '10005',
      abnormal: false
    },
    {
      testName: "D-dimer",
      result: '0.45',
      units: 'mg/L FEU',
      referenceRange: '<0.5 mg/L FEU',
      timestamp: '2025-05-11 21:00', // Yesterday
      patientId: '10005',
      abnormal: false
    },
    {
      testName: "Respiratory Viral Panel (RVP) – PCR",
      result: 'Negative',
      units: '',
      referenceRange: 'Negative',
      timestamp: '2025-05-11 19:45', // Yesterday
      patientId: '10005',
      abnormal: false
    }
  ],
  
  // Lisa Brown's test history (Dr. Johnson's patient) - MRN without prefix
  '10006': [
    {
      testName: "Complete Blood Count (CBC) with Differential",
      result: '5.2',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      timestamp: '2025-05-12 02:30', // Today
      patientId: '10006',
      abnormal: false
    },
    {
      testName: "Basic Metabolic Panel (BMP)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 02:45', // Today
      patientId: '10006',
      abnormal: false
    },
    {
      testName: "Lipid Panel",
      result: '245',
      units: 'mg/dL',
      referenceRange: '<200 mg/dL',
      timestamp: '2025-05-12 03:00', // Today
      patientId: '10006',
      abnormal: true
    },
    {
      testName: "Liver Function Tests (LFTs)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 03:15', // Today
      patientId: '10006',
      abnormal: false
    },
    {
      testName: "Hemoglobin A1c",
      result: '7.8',
      units: '%',
      referenceRange: '4.0-5.6 %',
      timestamp: '2025-05-12 03:30', // Today
      patientId: '10006',
      abnormal: true
    },
    {
      testName: "Thyroid Panel (TSH, Free T4 ± T3)",
      result: 'TSH: 3.6 mIU/L',
      units: 'Various',
      referenceRange: 'TSH: 0.4-4.0 mIU/L',
      timestamp: '2025-05-12 01:15', // Today
      patientId: '10006',
      abnormal: false
    },
    {
      testName: "Urinalysis (UA), Automated",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-12 00:30', // Today
      patientId: '10006',
      abnormal: false
    },
    {
      testName: "Comprehensive Metabolic Panel (CMP)",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 23:45', // Yesterday
      patientId: '10006',
      abnormal: false
    },
    {
      testName: "Vitamin B12 and Folate",
      result: 'B12: 185 pg/mL',
      units: 'pg/mL',
      referenceRange: 'B12: 200-900 pg/mL',
      timestamp: '2025-05-11 22:30', // Yesterday
      patientId: '10006',
      abnormal: true
    },
    {
      testName: "Iron Studies Panel",
      result: 'Multiple values',
      units: 'Various',
      referenceRange: 'Various',
      timestamp: '2025-05-11 21:15', // Yesterday 
      patientId: '10006',
      abnormal: false
    }
  ]
};

// Function to find previous test results for a patient
export const findPreviousResult = (mrn: string, testName: string): TestHistory | null => {
  // Normalize MRN by removing 'MRN' prefix if present
  const normalizedMrn = mrn.replace(/^MRN/i, '');
  
  const patientHistory = patientTestHistory[normalizedMrn];
  if (!patientHistory) return null;
  
  // Get all tests with matching name
  const matchingTests = patientHistory.filter(test => test.testName === testName);
  
  // If less than 2 tests, there's no previous result
  if (matchingTests.length < 2) return null;
  
  // Sort by timestamp descending
  matchingTests.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  // Return the second most recent (the previous result)
  return matchingTests[1] || null;
};
