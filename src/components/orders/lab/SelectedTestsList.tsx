
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SelectedTestsListProps {
  selectedTests: string[];
  onRemoveTest: (test: string) => void;
}

const SelectedTestsList = ({ selectedTests, onRemoveTest }: SelectedTestsListProps) => {
  if (selectedTests.length === 0) return null;
  
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Selected Tests:</h4>
      <div className="space-y-2">
        {selectedTests.map((test, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
            <span>{test}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onRemoveTest(test)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedTestsList;
