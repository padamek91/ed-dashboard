
import { formatDateTime } from '@/utils/orderUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LabOrder } from '@/contexts/OrdersContext';

interface CriticalResultItemProps {
  result: LabOrder;
  formatLabResult: (resultText: string) => any[];
  isValueAbnormal: (value: string | number, refRange: string) => boolean;
  onViewDetails: (resultId: string) => void;
}

const CriticalResultItem = ({
  result,
  formatLabResult,
  isValueAbnormal,
  onViewDetails
}: CriticalResultItemProps) => {
  return (
    <Card key={result.id} className="border-l-4 border-l-red-500">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div>
            <div className="font-medium">
              {result.type}
              <span className="ml-2 text-xs font-semibold text-white bg-red-600 px-2 py-1 rounded-full">
                CRITICAL
              </span>
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
        
        <div className="mt-4 p-3 bg-red-50 rounded-md">
          <div className="font-medium mb-2">Critical Values:</div>
          <table className="w-full text-sm">
            <tbody>
              {formatLabResult(result.result)
                .filter((item: any) => !item.text && isValueAbnormal(item.value, item.referenceRange))
                .map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="py-1 pr-4 w-1/3 font-medium">{item.test}</td>
                    <td className="py-1 pr-4 w-1/4 text-red-600 font-bold">{item.value}</td>
                    <td className="py-1 pr-4 w-1/6">{item.units}</td>
                    <td className="py-1 w-1/4">{item.referenceRange}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CriticalResultItem;
