
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle } from 'lucide-react';
import SearchableDropdown from '../SearchableDropdown';
import { labTests } from '@/data/ordersMockData';
import { useToast } from '@/hooks/use-toast';
import { generateOrderId, getCurrentTimestamp } from '@/utils/orderUtils';
import { patientTestHistory } from '@/data/patientTestHistory';
import { useNavigate } from 'react-router-dom';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

interface LabOrderEntryProps {
  selectedPatient: { id: string; name: string; mrn: string } | null;
  onOrderSubmit: (orders: any[]) => void;
  setActiveLabTab: (tab: string) => void;
}

const LabOrderEntry = ({ selectedPatient, onOrderSubmit, setActiveLabTab }: LabOrderEntryProps) => {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [testSearchQuery, setTestSearchQuery] = useState<string>('');
  const [testSearchResults, setTestSearchResults] = useState<string[]>([]);
  const [duplicateTestAlert, setDuplicateTestAlert] = useState<boolean>(false);
  const [duplicateTests, setDuplicateTests] = useState<string[]>([]);
  const [mostRecentDuplicateId, setMostRecentDuplicateId] = useState<string>('');
  const [retestReason, setRetestReason] = useState<string>('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
          historyItem.testName.includes(specialTest)
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

  // Handle order submission
  const handleSubmitOrders = () => {
    if (!selectedPatient || selectedTests.length === 0) {
      toast({
        title: "Error",
        description: "Please select a patient and at least one test",
        variant: "destructive",
      });
      return;
    }

    const duplicates = checkForDuplicates();
    if (duplicates.length > 0) {
      setDuplicateTestAlert(true);
      return;
    }

    submitOrders();
  };
  
  // Function to actually submit the orders
  const submitOrders = () => {
    const newOrders = selectedTests.map(test => ({
      id: generateOrderId(),
      patient: selectedPatient!.name,
      mrn: selectedPatient!.mrn,
      type: test,
      status: 'order placed',
      timestamp: getCurrentTimestamp(),
      retestReason: retestReason || undefined
    }));

    toast({
      title: "Orders Submitted",
      description: `${selectedTests.length} order(s) placed for ${selectedPatient!.name}`,
    });

    // Send new orders to parent component
    onOrderSubmit(newOrders);

    // Clear selected tests and reason after submission
    setSelectedTests([]);
    setRetestReason('');
    setActiveLabTab('status');
  };
  
  // Handle viewing the most recent result
  const handleGoToResult = () => {
    setDuplicateTestAlert(false);
    navigate(`/doctor-dashboard/results?id=${mostRecentDuplicateId}`);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Search Tests</label>
        <SearchableDropdown
          placeholder="Type to search lab tests..."
          searchQuery={testSearchQuery}
          onSearchChange={setTestSearchQuery}
          searchResults={testSearchResults}
          onItemSelect={handleTestSelect}
          commonItems={labTests}
          popoverTitle="Common Lab Tests"
        />
      </div>
      
      {selectedTests.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Selected Tests:</h4>
          <div className="space-y-2">
            {selectedTests.map((test, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                <span>{test}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveTest(test)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <Button 
        onClick={handleSubmitOrders} 
        disabled={!selectedPatient || selectedTests.length === 0}
        className="mt-4"
      >
        Submit Order(s)
      </Button>
      
      {/* Duplicate Test Alert Dialog */}
      <AlertDialog open={duplicateTestAlert} onOpenChange={setDuplicateTestAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Duplicate Test Warning
            </AlertDialogTitle>
            <AlertDialogDescription>
              {duplicateTests.length > 1 
                ? `The following tests have recently been performed for this patient: ${duplicateTests.join(', ')}`
                : `${duplicateTests[0]} has recently been performed for this patient.`
              }
              <br /><br />
              Would you like to order these tests again or view the most recent result?
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {/* Only show reason input when "Order Anyway" is about to be selected */}
          <div className="mb-4">
            <label htmlFor="retest-reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for retesting (required)
            </label>
            <Input
              id="retest-reason"
              value={retestReason}
              onChange={(e) => setRetestReason(e.target.value)}
              placeholder="Enter reason for reordering this test"
              className="w-full"
            />
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDuplicateTestAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleGoToResult}>
              Go to Result
            </AlertDialogAction>
            <AlertDialogAction 
              onClick={submitOrders}
              disabled={!retestReason.trim()}
              className={!retestReason.trim() ? "opacity-50 cursor-not-allowed" : ""}
            >
              Order Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LabOrderEntry;
