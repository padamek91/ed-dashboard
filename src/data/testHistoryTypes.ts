
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

// Function to find previous test results for a patient
export const findPreviousResult = (mrn: string, testHistory: Record<string, TestHistory[]>, testName: string): TestHistory | null => {
  const patientHistory = testHistory[mrn];
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

// Function to check if a test has been ordered within a specific time window
export const hasRecentOrder = (mrn: string, testHistory: Record<string, TestHistory[]>, testName: string, hoursWindow: number = 24): boolean => {
  const patientHistory = testHistory[mrn];
  if (!patientHistory) return false;
  
  const now = new Date();
  const timeThreshold = new Date(now.getTime() - hoursWindow * 60 * 60 * 1000);
  
  // Find if the test has been performed within the time window
  return patientHistory.some(test => {
    if (test.testName === testName) {
      const testDate = new Date(test.timestamp);
      return testDate >= timeThreshold;
    }
    return false;
  });
};

// List of all available lab tests that can be ordered
export const availableLabTests = [
  "Complete Blood Count (CBC) with Differential",
  "Basic Metabolic Panel (BMP)",
  "Comprehensive Metabolic Panel (CMP)",
  "Urinalysis (UA), Automated",
  "Urine Drug Screen (UDS), Qualitative",
  "Lipid Panel",
  "Liver Function Tests (LFTs)",
  "Cardiac Enzymes Panel (Troponin, CK-MB, etc.)",
  "Coagulation Panel (PT, PTT, INR)",
  "Sepsis Workup Panel (CBC, Lactate, Blood Cultures, Procalcitonin)",
  "Electrolyte Panel",
  "Iron Studies Panel",
  "Thyroid Panel (TSH, Free T4 ± T3)",
  "Hepatitis Panel (A, B, C Antibodies and Antigens)",
  "Respiratory Viral Panel (RVP) – PCR",
  "COVID-19 PCR Panel",
  "Inflammatory Markers Panel (CRP, ESR, Procalcitonin)",
  "Troponin I",
  "Lactate",
  "C-Reactive Protein (CRP)",
  "Erythrocyte Sedimentation Rate (ESR)",
  "Blood Culture (x2)",
  "Urine Culture",
  "HCG (Qualitative and Quantitative)",
  "Glucose (Serum)",
  "Hemoglobin A1c",
  "Magnesium",
  "Phosphate (PO4)",
  "Calcium (Total and Ionized)",
  "Albumin",
  "Ammonia",
  "Lipase",
  "Amylase",
  "B-type Natriuretic Peptide (BNP)",
  "NT-proBNP",
  "Prothrombin Time (PT) / International Normalized Ratio (INR)",
  "Partial Thromboplastin Time (PTT)",
  "D-dimer",
  "Type and Screen / Crossmatch",
  "HIV Antibody/Antigen (4th Generation)",
  "Vitamin B12 and Folate",
  "WBC",
  "RBC",
  "Hemoglobin",
  "Hematocrit",
  "Platelets",
  "Na",
  "K",
  "Cl",
  "CO2",
  "BUN",
  "Creatinine",
  "Troponin T",
  "CK-MB",
  "TSH",
  "Free T4",
  "Free T3"
];
