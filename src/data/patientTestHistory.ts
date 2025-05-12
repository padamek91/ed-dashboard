
// Type definition for test history
export type TestHistory = {
  testName: string;
  result: string;
  units: string;
  referenceRange: string;
  timestamp: string;
  patientId: string;
  abnormal: boolean;
}

// Collection of test histories per patient
export const patientTestHistory: Record<string, TestHistory[]> = {
  // Michael Johnson's test history
  'MRN10001': [
    {
      testName: 'Troponin I',
      result: '0.6',
      units: 'ng/mL',
      referenceRange: '<0.04 ng/mL',
      timestamp: '2025-05-01 10:15',
      patientId: 'MRN10001',
      abnormal: true
    },
    {
      testName: 'WBC',
      result: '11.2',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      patientId: 'MRN10001',
      timestamp: '2025-05-01 10:15',
      abnormal: true
    },
    {
      testName: 'RBC',
      result: '4.3',
      units: 'x10^6/μL',
      referenceRange: '4.5-5.9 x10^6/μL',
      patientId: 'MRN10001',
      timestamp: '2025-05-01 10:15',
      abnormal: true
    },
    {
      testName: 'Hgb',
      result: '13.8',
      units: 'g/dL',
      referenceRange: '13.5-17.5 g/dL',
      patientId: 'MRN10001',
      timestamp: '2025-05-01 10:15',
      abnormal: false
    },
    {
      testName: 'Na',
      result: '139',
      units: 'mmol/L',
      referenceRange: '135-145 mmol/L',
      patientId: 'MRN10001',
      timestamp: '2025-05-02 14:30',
      abnormal: false
    },
    {
      testName: 'K',
      result: '4.1',
      units: 'mmol/L',
      referenceRange: '3.5-5.0 mmol/L',
      patientId: 'MRN10001',
      timestamp: '2025-05-02 14:30',
      abnormal: false
    },
    {
      testName: 'Cl',
      result: '103',
      units: 'mmol/L',
      referenceRange: '98-108 mmol/L',
      patientId: 'MRN10001',
      timestamp: '2025-05-02 14:30', 
      abnormal: false
    },
    {
      testName: 'CK-MB',
      result: '10.8',
      units: 'ng/mL',
      referenceRange: '0-3.6 ng/mL',
      patientId: 'MRN10001',
      timestamp: '2025-05-01 10:15',
      abnormal: true
    },
    {
      testName: 'D-Dimer',
      result: '0.3',
      units: 'mg/L FEU',
      referenceRange: '<0.5 mg/L FEU',
      patientId: 'MRN10001',
      timestamp: '2025-05-04 11:45',
      abnormal: false
    }
  ],
  
  // Emily Rodriguez's test history
  'MRN10002': [
    {
      testName: 'WBC',
      result: '11.8',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      patientId: 'MRN10002',
      timestamp: '2025-04-28 09:20',
      abnormal: true
    },
    {
      testName: 'RBC',
      result: '4.0',
      units: 'x10^6/μL',
      referenceRange: '4.5-5.9 x10^6/μL',
      patientId: 'MRN10002',
      timestamp: '2025-04-28 09:20',
      abnormal: true
    },
    {
      testName: 'ALT',
      result: '42',
      units: 'U/L',
      referenceRange: '7-55 U/L',
      patientId: 'MRN10002',
      timestamp: '2025-04-25 14:10',
      abnormal: false
    },
    {
      testName: 'AST',
      result: '38',
      units: 'U/L',
      referenceRange: '8-48 U/L',
      patientId: 'MRN10002',
      timestamp: '2025-04-25 14:10',
      abnormal: false
    },
    {
      testName: 'Total Cholesterol',
      result: '205',
      units: 'mg/dL',
      referenceRange: '<200 mg/dL',
      patientId: 'MRN10002',
      timestamp: '2025-04-20 11:30',
      abnormal: true
    },
    {
      testName: 'Triglycerides',
      result: '145',
      units: 'mg/dL',
      referenceRange: '<150 mg/dL',
      patientId: 'MRN10002',
      timestamp: '2025-04-20 11:30',
      abnormal: false
    }
  ],
  
  // David Williams's test history
  'MRN10003': [
    {
      testName: 'pH',
      result: '7.33',
      units: '',
      referenceRange: '7.35-7.45',
      patientId: 'MRN10003',
      timestamp: '2025-05-08 08:45',
      abnormal: true
    },
    {
      testName: 'PaCO2',
      result: '48',
      units: 'mmHg',
      referenceRange: '35-45 mmHg',
      patientId: 'MRN10003',
      timestamp: '2025-05-08 08:45',
      abnormal: true
    },
    {
      testName: 'WBC',
      result: '14.8',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      patientId: 'MRN10003',
      timestamp: '2025-05-09 15:30',
      abnormal: true
    },
    {
      testName: 'CRP',
      result: '12.8',
      units: 'mg/L',
      referenceRange: '<3.0 mg/L',
      patientId: 'MRN10003',
      timestamp: '2025-05-09 15:30',
      abnormal: true
    },
    {
      testName: 'NT-proBNP',
      result: '2200',
      units: 'pg/mL',
      referenceRange: '<300 pg/mL',
      patientId: 'MRN10003',
      timestamp: '2025-05-09 16:15',
      abnormal: true
    }
  ]
};

// Function to find previous test results for a patient
export const findPreviousResult = (mrn: string, testName: string): TestHistory | null => {
  const patientHistory = patientTestHistory[mrn];
  if (!patientHistory) return null;
  
  return patientHistory.find(test => test.testName === testName) || null;
};
