
import { formatDateTime } from '@/utils/orderUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  return (
    <Card key={result.id} className={`border-l-4 ${
      result.critical 
        ? 'border-l-red-500' 
        : result.abnormal 
        ? 'border-l-amber-500' 
        : 'border-l-gray-200'
    }`}>
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
          <div className="mt-3 md:mt-0 md:text-right">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onViewDetails(result.id)}
            >
              View Details
            </Button>
          </div>
        </div>
        
        <div className={`mt-4 p-3 rounded-md ${
          result.critical 
            ? 'bg-red-50' 
            : result.abnormal 
            ? 'bg-amber-50' 
            : 'bg-gray-50'
        }`}>
          <div className="font-medium mb-2">Result Preview:</div>
          <table className="w-full text-sm">
            <tbody>
              {formatLabResult(result.result)
                .slice(0, 3) // Show only first 3 results in preview
                .map((item: any, index: number) => {
                  if (item.text) {
                    return (
                      <tr key={index}>
                        <td colSpan={4} className="py-1">{item.text}</td>
                      </tr>
                    );
                  }
                  
                  const isAbnormal = isValueAbnormal(item.value, item.referenceRange);
                  const valueClass = result.critical 
                    ? "text-red-600 font-bold" 
                    : isAbnormal 
                    ? "text-amber-600 font-semibold" 
                    : "";
                  
                  return (
                    <tr key={index}>
                      <td className="py-1 pr-4 w-1/3 font-medium">{item.test}</td>
                      <td className={`py-1 pr-4 w-1/4 ${valueClass}`}>{item.value}</td>
                      <td className="py-1 pr-4 w-1/6">{item.units}</td>
                      <td className="py-1 w-1/4">{item.referenceRange}</td>
                    </tr>
                  );
              })}
              {formatLabResult(result.result).length > 3 && (
                <tr>
                  <td colSpan={4} className="py-1 text-center text-gray-500 italic">
                    {formatLabResult(result.result).length - 3} more items...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultItem;
