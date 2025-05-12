
// Type definition for test history
export type TestHistory = {
  testName: string;
  result: string;
  units: string;
  referenceRange: string;
  timestamp: string;
  patientId: string;
  abnormal: boolean;
  critical?: boolean;
}

// Collection of test histories per patient
export const patientTestHistory: Record<string, TestHistory[]> = {
  // Initially empty - will be populated by OrdersContext
  '10001': [], // Michael Johnson
  '10002': [], // Emily Rodriguez
  '10003': [], // David Williams
  '10004': [], // Sophia Lee
  '10005': [], // Robert Johnson
  '10006': [], // Lisa Martinez
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
