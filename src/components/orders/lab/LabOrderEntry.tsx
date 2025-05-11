
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import SearchableDropdown from '../SearchableDropdown';
import { labTests } from '@/data/ordersMockData';
import { useToast } from '@/hooks/use-toast';
import { generateOrderId, getCurrentTimestamp } from '@/utils/orderUtils';

interface LabOrderEntryProps {
  selectedPatient: { id: string; name: string; mrn: string } | null;
  onOrderSubmit: (orders: any[]) => void;
  setActiveLabTab: (tab: string) => void;
}

const LabOrderEntry = ({ selectedPatient, onOrderSubmit, setActiveLabTab }: LabOrderEntryProps) => {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [testSearchQuery, setTestSearchQuery] = useState<string>('');
  const [testSearchResults, setTestSearchResults] = useState<string[]>([]);
  const { toast } = useToast();
  
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

    const newOrders = selectedTests.map(test => ({
      id: generateOrderId(),
      patient: selectedPatient.name,
      mrn: selectedPatient.mrn,
      type: test,
      status: 'order placed',
      timestamp: getCurrentTimestamp()
    }));

    toast({
      title: "Orders Submitted",
      description: `${selectedTests.length} order(s) placed for ${selectedPatient.name}`,
    });

    // Send new orders to parent component
    onOrderSubmit(newOrders);

    // Clear selected tests after submission
    setSelectedTests([]);
    setActiveLabTab('status');
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
    </div>
  );
};

export default LabOrderEntry;
