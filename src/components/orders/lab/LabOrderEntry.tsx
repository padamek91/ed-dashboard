
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchableDropdown from '../SearchableDropdown';
import SelectedTestsList from './SelectedTestsList';
import DuplicateTestAlert from './DuplicateTestAlert';
import { useTestSelection } from './useTestSelection';
import { useToast } from '@/hooks/use-toast';
import { generateOrderId, getCurrentTimestamp, normalizeMrn } from '@/utils/orderUtils';

interface LabOrderEntryProps {
  selectedPatient: { id: string; name: string; mrn: string } | null;
  onOrderSubmit: (orders: any[]) => void;
  setActiveLabTab: (tab: string) => void;
}

const LabOrderEntry = ({ selectedPatient, onOrderSubmit, setActiveLabTab }: LabOrderEntryProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
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
  } = useTestSelection(selectedPatient);

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

    console.log("Selected patient MRN:", selectedPatient.mrn, "Normalized:", normalizeMrn(selectedPatient.mrn));
    console.log("Selected tests:", selectedTests);
    
    // Check for duplicate tests before submitting
    const duplicates = checkForDuplicates();
    if (duplicates.length > 0) {
      console.log("Found duplicate tests:", duplicates);
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
      mrn: normalizeMrn(selectedPatient!.mrn),
      type: test,
      status: 'order placed',
      timestamp: getCurrentTimestamp(),
      retestReason: retestReason || undefined
    }));

    console.log("Submitting orders:", newOrders);
    
    toast({
      title: "Orders Submitted",
      description: `${selectedTests.length} order(s) placed for ${selectedPatient!.name}`,
    });

    // Send new orders to parent component
    onOrderSubmit(newOrders);

    // Clear selections and navigate to status tab
    resetTestSelections();
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
          commonItems={testSearchResults.length > 0 ? [] : undefined}
          popoverTitle="Common Lab Tests"
        />
      </div>
      
      <SelectedTestsList 
        selectedTests={selectedTests}
        onRemoveTest={handleRemoveTest}
      />
      
      <Button 
        onClick={handleSubmitOrders} 
        disabled={!selectedPatient || selectedTests.length === 0}
        className="mt-4"
      >
        Submit Order(s)
      </Button>
      
      <DuplicateTestAlert 
        open={duplicateTestAlert}
        setOpen={setDuplicateTestAlert}
        duplicateTests={duplicateTests}
        retestReason={retestReason}
        setRetestReason={setRetestReason}
        onGoToResult={handleGoToResult}
        onSubmitAnyway={submitOrders}
      />
    </div>
  );
};

export default LabOrderEntry;
