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
  // Michael Johnson's test history (Dr. Smith's patient)
  '10001': [
    // Very recent results (from last 24 hours)
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
    // NEW RECENT TESTS - Michael Johnson
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
    // Current result
    {
      testName: "Troponin I",
      result: '0.6',
      units: 'ng/mL',
      referenceRange: '<0.04 ng/mL',
      timestamp: '2025-05-01 10:15',
      patientId: '10001',
      abnormal: true
    },
    // Previous result
    {
      testName: "Troponin I",
      result: '0.3',
      units: 'ng/mL',
      referenceRange: '<0.04 ng/mL',
      timestamp: '2025-04-30 08:00',
      patientId: '10001',
      abnormal: true
    },
    // Five additional recent tests for Michael Johnson
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
    },
    // Keep other existing test results
    // Remaining test results for Michael Johnson
    {
      testName: 'WBC',
      result: '11.2',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      patientId: '10001',
      timestamp: '2025-05-01 10:15',
      abnormal: true
    },
    // Previous result
    {
      testName: 'WBC',
      result: '9.8',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      patientId: '10001',
      timestamp: '2025-04-15 14:30',
      abnormal: false
    },
    // Current result
    {
      testName: 'RBC',
      result: '4.3',
      units: 'x10^6/μL',
      referenceRange: '4.5-5.9 x10^6/μL',
      patientId: '10001',
      timestamp: '2025-05-01 10:15',
      abnormal: true
    },
    // Previous result
    {
      testName: 'RBC',
      result: '4.4',
      units: 'x10^6/μL',
      referenceRange: '4.5-5.9 x10^6/μL',
      patientId: '10001',
      timestamp: '2025-04-15 14:30',
      abnormal: true
    },
    // Previous result
    {
      testName: 'Na',
      result: '139',
      units: 'mmol/L',
      referenceRange: '135-145 mmol/L',
      patientId: '10001',
      timestamp: '2025-05-02 14:30',
      abnormal: false
    },
    // Previous result
    {
      testName: 'Na',
      result: '140',
      units: 'mmol/L',
      referenceRange: '135-145 mmol/L',
      patientId: '10001',
      timestamp: '2025-04-20 09:15',
      abnormal: false
    },
    // Current result
    {
      testName: 'K',
      result: '4.1',
      units: 'mmol/L',
      referenceRange: '3.5-5.0 mmol/L',
      patientId: '10001',
      timestamp: '2025-05-02 14:30',
      abnormal: false
    },
    // Previous result
    {
      testName: 'K',
      result: '4.3',
      units: 'mmol/L',
      referenceRange: '3.5-5.0 mmol/L',
      patientId: '10001',
      timestamp: '2025-04-20 09:15',
      abnormal: false
    },
    // Current result
    {
      testName: 'Cl',
      result: '103',
      units: 'mmol/L',
      referenceRange: '98-108 mmol/L',
      patientId: '10001',
      timestamp: '2025-05-02 14:30', 
      abnormal: false
    },
    // Previous result
    {
      testName: 'Cl',
      result: '102',
      units: 'mmol/L',
      referenceRange: '98-108 mmol/L',
      patientId: '10001',
      timestamp: '2025-04-20 09:15',
      abnormal: false
    },
    // Current result
    {
      testName: 'CK-MB',
      result: '10.8',
      units: 'ng/mL',
      referenceRange: '0-3.6 ng/mL',
      patientId: '10001',
      timestamp: '2025-05-01 10:15',
      abnormal: true
    },
    // Previous result
    {
      testName: 'CK-MB',
      result: '6.2',
      units: 'ng/mL',
      referenceRange: '0-3.6 ng/mL',
      patientId: '10001',
      timestamp: '2025-04-30 08:00',
      abnormal: true
    },
    // Current result
    {
      testName: 'D-dimer',
      result: '0.3',
      units: 'mg/L FEU',
      referenceRange: '<0.5 mg/L FEU',
      patientId: '10001',
      timestamp: '2025-05-04 11:45',
      abnormal: false
    },
  ],
  
  // Emily Rodriguez's test history (Dr. Smith's patient)
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
    // NEW RECENT TESTS - Emily Rodriguez
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
    // Five additional recent tests for Emily Rodriguez
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
    // Keep other existing test results
    // Remaining test results for Emily Rodriguez
    // Current result
    {
      testName: 'WBC',
      result: '11.8',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      patientId: '10002',
      timestamp: '2025-04-28 09:20',
      abnormal: true
    },
    // Previous result
    {
      testName: 'WBC',
      result: '10.7',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      patientId: '10002',
      timestamp: '2025-04-15 15:45',
      abnormal: false
    },
    // Current result
    {
      testName: 'RBC',
      result: '4.0',
      units: 'x10^6/μL',
      referenceRange: '4.5-5.9 x10^6/μL',
      patientId: '10002',
      timestamp: '2025-04-28 09:20',
      abnormal: true
    },
    // Previous result
    {
      testName: 'RBC',
      result: '4.3',
      units: 'x10^6/μL',
      referenceRange: '4.5-5.9 x10^6/μL',
      patientId: '10002',
      timestamp: '2025-04-15 15:45',
      abnormal: true
    },
    // Current result
    {
      testName: 'ALT',
      result: '42',
      units: 'U/L',
      referenceRange: '7-55 U/L',
      patientId: '10002',
      timestamp: '2025-04-25 14:10',
      abnormal: false
    },
    // Previous result
    {
      testName: 'ALT',
      result: '38',
      units: 'U/L',
      referenceRange: '7-55 U/L',
      patientId: '10002',
      timestamp: '2025-03-10 11:30',
      abnormal: false
    },
    // Current result
    {
      testName: 'AST',
      result: '38',
      units: 'U/L',
      referenceRange: '8-48 U/L',
      patientId: '10002',
      timestamp: '2025-04-25 14:10',
      abnormal: false
    },
    // Previous result
    {
      testName: 'AST',
      result: '35',
      units: 'U/L',
      referenceRange: '8-48 U/L',
      patientId: '10002',
      timestamp: '2025-03-10 11:30',
      abnormal: false
    },
    // Current result
    {
      testName: 'Total Cholesterol',
      result: '205',
      units: 'mg/dL',
      referenceRange: '<200 mg/dL',
      patientId: '10002',
      timestamp: '2025-04-20 11:30',
      abnormal: true
    },
    // Previous result
    {
      testName: 'Total Cholesterol',
      result: '198',
      units: 'mg/dL',
      referenceRange: '<200 mg/dL',
      patientId: '10002',
      timestamp: '2024-10-15 14:00',
      abnormal: false
    },
    // Current result
    {
      testName: 'Triglycerides',
      result: '145',
      units: 'mg/dL',
      referenceRange: '<150 mg/dL',
      patientId: '10002',
      timestamp: '2025-04-20 11:30',
      abnormal: false
    },
    // Previous result
    {
      testName: 'Triglycerides',
      result: '155',
      units: 'mg/dL',
      referenceRange: '<150 mg/dL',
      patientId: '10002',
      timestamp: '2024-10-15 14:00',
      abnormal: true
    },
    // Add blood culture test as a special test with longer duplication window
    {
      testName: 'Blood Culture (x2)',
      result: 'No Growth',
      units: '',
      referenceRange: 'No Growth',
      patientId: '10002',
      timestamp: '2025-05-10 09:30', // Very recent
      abnormal: false
    },
    // Previous blood culture
    {
      testName: 'Blood Culture (x2)',
      result: 'No Growth',
      units: '',
      referenceRange: 'No Growth',
      patientId: '10002',
      timestamp: '2025-05-01 10:15',
      abnormal: false
    }
  ],
  
  // David Williams's test history (Dr. Smith's patient)
  '10003': [
    // Very recent results (from last 24 hours)
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
    // NEW RECENT TESTS - David Williams
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
    // Five additional recent tests for David Williams
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
      testName: "B-type Natriuretic Peptide (BNP) or NT-proBNP",
      result: '2200',
      units: 'pg/mL',
      referenceRange: '<300 pg/mL',
      timestamp: '2025-05-11 19:25', // Very recent (yesterday)
      patientId: '10003',
      abnormal: true
    },
    // Keep other existing test results
    // Remaining test results for David Williams
    // Current result
    {
      testName: 'pH',
      result: '7.33',
      units: '',
      referenceRange: '7.35-7.45',
      patientId: '10003',
      timestamp: '2025-05-08 08:45',
      abnormal: true
    },
    // Previous result
    {
      testName: 'pH',
      result: '7.31',
      units: '',
      referenceRange: '7.35-7.45',
      patientId: '10003',
      timestamp: '2025-05-07 14:30',
      abnormal: true
    },
    // Current result
    {
      testName: 'PaCO2',
      result: '48',
      units: 'mmHg',
      referenceRange: '35-45 mmHg',
      patientId: '10003',
      timestamp: '2025-05-08 08:45',
      abnormal: true
    },
    // Previous result
    {
      testName: 'PaCO2',
      result: '52',
      units: 'mmHg',
      referenceRange: '35-45 mmHg',
      patientId: '10003',
      timestamp: '2025-05-07 14:30',
      abnormal: true
    },
    // Current result
    {
      testName: 'WBC',
      result: '14.8',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      patientId: '10003',
      timestamp: '2025-05-09 15:30',
      abnormal: true
    },
    // Previous result
    {
      testName: 'WBC',
      result: '13.2',
      units: 'x10^3/μL',
      referenceRange: '4.5-11.0 x10^3/μL',
      patientId: '10003',
      timestamp: '2025-05-07 14:30',
      abnormal: true
    },
    // Current result
    {
      testName: 'CRP',
      result: '12.8',
      units: 'mg/L',
      referenceRange: '<3.0 mg/L',
      patientId: '10003',
      timestamp: '2025-05-09 15:30',
      abnormal: true
    },
    // Previous result
    {
      testName: 'CRP',
      result: '9.5',
      units: 'mg/L',
      referenceRange: '<3.0 mg/L',
      patientId: '10003',
      timestamp: '2025-05-07 14:30',
      abnormal: true
    },
    // Current result
    {
      testName: 'NT-proBNP',
      result: '2200',
      units: 'pg/mL',
      referenceRange: '<300 pg/mL',
      patientId: '10003',
      timestamp: '2025-05-09 16:15',
      abnormal: true
    },
    // Previous result
    {
      testName: 'NT-proBNP',
      result: '1850',
      units: 'pg/mL',
      referenceRange: '<300 pg/mL',
      patientId: '10003',
      timestamp: '2025-05-07 14:30',
      abnormal: true
    },
    // Add Hemoglobin A1C as another special test with longer duplication window
    {
      testName: 'Hemoglobin A1c',
      result: '7.2',
      units: '%',
      referenceRange: '4.0-5.6 %',
      patientId: '10003',
      timestamp: '2025-05-10 08:15', // Very recent
      abnormal: true
    },
    // Previous hemoglobin A1C (from 3 months ago, which would be normal for this test)
    {
      testName: 'Hemoglobin A1c',
      result: '7.0',
      units: '%',
      referenceRange: '4.0-5.6 %',
      patientId: '10003',
      timestamp: '2025-02-10 11:30',
      abnormal: true
    }
  ]
};

// Function to find previous test results for a patient
export const findPreviousResult = (mrn: string, testName: string): TestHistory | null => {
  const patientHistory = patientTestHistory[mrn];
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
