
import { useState, useEffect } from 'react';
import { availableLabTests } from '@/data/testHistoryTypes';
import { patientTestHistory } from '@/data/patientTestHistory';
import { hasRecentOrder } from '@/data/testHistoryTypes';
import { normalizeMrn } from '@/utils/orderUtils';

export interface SelectedPatient {
  id: string;
  name: string;
  mrn: string;
}

export const useTestSelection = (selectedPatient: SelectedPatient | null) => {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [testSearchQuery, setTestSearchQuery] = useState<string>('');
  const [testSearchResults, setTestSearchResults] = useState<string[]>([]);
  const [duplicateTestAlert, setDuplicateTestAlert] = useState<boolean>(false);
  const [duplicateTests, setDuplicateTests] = useState<string[]>([]);
  const [mostRecentDuplicateId, setMostRecentDuplicateId] = useState<string>('');
  const [retestReason, setRetestReason] = useState<string>('');

  // Effect to filter tests based on search
  useEffect(() => {
    if (testSearchQuery) {
      const filtered = availableLabTests.filter(test => 
        test.toLowerCase().includes(testSearchQuery.toLowerCase())
      );
      setTestSearchResults(filtered);
    } else {
      setTestSearchResults([]);
    }
  }, [testSearchQuery]);

  // Handle test selection
  const handleTestSelect = (test: string) => {
    if (!selectedTests.includes(test)) {
      setSelectedTests([...selectedTests, test]);
    }
    setTestSearchQuery('');
  };

  // Handle test removal
  const handleRemoveTest = (test: string) => {
    setSelectedTests(selectedTests.filter(t => t !== test));
  };

  // Check for duplicate tests ordered within the last 24 hours
  const checkForDuplicates = () => {
    if (!selectedPatient) {
      console.log("No patient selected, skipping duplicate check");
      return [];
    }
    
    const patientMrn = normalizeMrn(selectedPatient.mrn);
    console.log("Checking for duplicates with MRN:", patientMrn, "Original MRN:", selectedPatient.mrn);
    
    // Special tests with longer duplication window (e.g., 72 hours)
    const specialTests = ['Blood Culture (x2)', 'Hemoglobin A1c'];
    
    const duplicates: string[] = [];
    let mostRecent: string = '';
    let mostRecentTimestamp: Date = new Date(0);
    
    selectedTests.forEach(test => {
      const isSpecialTest = specialTests.some(specialTest => 
        test === specialTest // Use exact matching instead of includes
      );
      const hoursWindow = isSpecialTest ? 72 : 24;
      
      console.log(`Checking if test "${test}" has recent order for patient ${patientMrn}`);
      const hasRecent = hasRecentOrder(patientMrn, patientTestHistory, test, hoursWindow);
      console.log(`Test "${test}" has recent order: ${hasRecent}`);
      
      if (hasRecent) {
        duplicates.push(test);
        
        // Find the most recent timestamp for this test to generate an ID
        const patientTests = patientTestHistory[patientMrn] || [];
        console.log(`Found ${patientTests.length} tests for patient ${patientMrn}`);
        
        const matchingTests = patientTests.filter(t => t.testName === test);
        console.log(`Found ${matchingTests.length} matches for test "${test}"`);
        
        if (matchingTests.length > 0) {
          matchingTests.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          
          const latestTest = matchingTests[0];
          const testDate = new Date(latestTest.timestamp);
          console.log(`Most recent test timestamp: ${latestTest.timestamp}`);
          
          if (testDate > mostRecentTimestamp) {
            mostRecentTimestamp = testDate;
            mostRecent = `lab-${testDate.getTime()}`; // Generate a predictable ID format
            console.log(`Updated most recent ID to: ${mostRecent}`);
          }
        }
      }
    });
    
    if (duplicates.length > 0) {
      console.log(`Found duplicate tests: ${duplicates.join(', ')}`);
      setDuplicateTests(duplicates);
      setMostRecentDuplicateId(mostRecent);
      return duplicates;
    }
    
    return [];
  };

  const resetTestSelections = () => {
    setSelectedTests([]);
    setRetestReason('');
    setDuplicateTestAlert(false);
  };

  return {
    selectedTests,
    testSearchQuery,
    testSearchResults,
    duplicateTestAlert,
    duplicateTests,
    mostRecentDuplicateId,
    retestReason,
    setTestSearchQuery,
    setDuplicateTestAlert,
    setRetestReason,
    handleTestSelect,
    handleRemoveTest,
    checkForDuplicates,
    resetTestSelections
  };
};
