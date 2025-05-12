
import { formatDateTime } from '@/utils/orderUtils';
import { Card, CardContent } from '@/components/ui/card';
import { LabOrder } from '@/contexts/OrdersContext';

interface ResultItemProps {
  result: LabOrder;
  formatLabResult: (resultText: string) => any[];
  isValueAbnormal: (value: string | number, refRange: string) => boolean;
  onViewDetails: (resultId: string) => void;
}

const ResultItem = ({ 
  result, 
  formatLabResult, 
  isValueAbnormal,
  onViewDetails 
}: ResultItemProps) => {
  // Make entire card clickable
  const handleClick = () => {
    onViewDetails(result.id);
  };

  return (
    <Card 
      key={result.id} 
      className={`border-l-4 cursor-pointer hover:shadow-md transition-shadow ${
        result.critical 
          ? 'border-l-red-500' 
          : result.abnormal 
          ? 'border-l-amber-500' 
          : 'border-l-gray-200'
      }`}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="font-medium">
              {result.type}
              {result.critical && (
                <span className="ml-2 text-xs font-semibold text-white bg-red-600 px-2 py-1 rounded-full">
                  CRITICAL
                </span>
              )}
              {!result.critical && result.abnormal && (
                <span className="ml-2 text-xs font-semibold text-white bg-amber-600 px-2 py-1 rounded-full">
                  ABNORMAL
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              Patient: {result.patient}
            </div>
            <div className="text-sm text-muted-foreground">
              Completed: {formatDateTime(result.timestamp)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultItem;
