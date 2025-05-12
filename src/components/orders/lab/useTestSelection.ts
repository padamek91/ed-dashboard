
import { useState, useEffect } from 'react';
import { labTests } from '@/data/ordersMockData';
import { patientTestHistory } from '@/data/patientTestHistory';

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
      const filtered = labTests.filter(test => 
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
    if (!selectedPatient) return [];
    
    const patientMrn = selectedPatient.mrn;
    const patientHistory = patientTestHistory[patientMrn] || [];
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    
    // Special tests with longer duplication window (e.g., 72 hours for blood cultures)
    const specialTests = ['Blood Culture (x2)', 'Hemoglobin A1c'];
    const specialTestWindow = new Date(now.getTime() - 72 * 60 * 60 * 1000); // 72 hours ago
    
    const duplicates: string[] = [];
    let mostRecent: string = '';
    let mostRecentTimestamp: Date = new Date(0);
    
    selectedTests.forEach(test => {
      const matchingTests = patientHistory.filter(historyItem => {
        const testDate = new Date(historyItem.timestamp);
        const isSpecialTest = specialTests.some(specialTest => 
          test.includes(specialTest)
        );
        const timeWindow = isSpecialTest ? specialTestWindow : oneDayAgo;
        
        return historyItem.testName === test && testDate > timeWindow;
      });
      
      if (matchingTests.length > 0) {
        duplicates.push(test);
        
        // Find the most recently resulted test among all duplicates
        matchingTests.forEach(match => {
          const matchDate = new Date(match.timestamp);
          if (matchDate > mostRecentTimestamp) {
            mostRecentTimestamp = matchDate;
            mostRecent = `lab-${matchDate.getTime()}`; // Generate a predictable ID format
          }
        });
      }
    });
    
    if (duplicates.length > 0) {
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
