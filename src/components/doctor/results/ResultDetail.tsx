
import { useAuth } from '@/contexts/AuthContext';
import { LabOrder } from '@/contexts/OrdersContext';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDateTime } from '@/utils/orderUtils';

interface ResultDetailProps {
  result: LabOrder;
  onBack: () => void;
  formatLabResult: (resultText: string) => any[];
  isValueAbnormal: (value: string | number, refRange: string) => boolean;
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

const ResultDetail = ({
  result,
  onBack,
  formatLabResult,
  isValueAbnormal,
  onAcknowledge,
  isAcknowledged
}: ResultDetailProps) => {
  const { user } = useAuth();
  
  // Check if the result exists
  if (!result) {
    return (
      <Card>
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Result not found</p>
            <Button onClick={onBack} className="mt-4">Back to Results</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>{result.type}</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Patient: {result.patient} • Ordered: {formatDateTime(result.timestamp)}
          </p>
        </div>
        <Button variant="outline" onClick={onBack}>
          Back to All Results
        </Button>
      </CardHeader>
      <CardContent>
        <div className={`p-4 rounded-md ${
          result.critical 
            ? 'bg-red-50 border border-red-200' 
            : result.abnormal 
            ? 'bg-amber-50 border border-amber-200' 
            : 'bg-gray-50 border border-gray-200'
        }`}>
          {result.critical && (
            <div className="mb-4 text-red-600 font-semibold flex items-center">
              <span className="mr-2 px-2 py-0.5 bg-red-600 text-white rounded-full text-xs">CRITICAL RESULT</span>
              Immediate attention required
            </div>
          )}
          {result.abnormal && !result.critical && (
            <div className="mb-4 text-amber-600 font-semibold">
              <span className="mr-2 px-2 py-0.5 bg-amber-600 text-white rounded-full text-xs">ABNORMAL RESULT</span>
              Values outside normal range
            </div>
          )}
          
          <h3 className="font-medium mb-2">Result:</h3>
          <div className="bg-white p-4 rounded border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-2 px-2 w-1/3">Test</th>
                  <th className="text-left py-2 px-2 w-1/4">Value</th>
                  <th className="text-left py-2 px-2 w-1/6">Units</th>
                  <th className="text-left py-2 px-2 w-1/4">Reference Range</th>
                </tr>
              </thead>
              <tbody>
                {result.result && formatLabResult(result.result).map((item: any, index: number) => {
                  if (item.text) {
                    // For lines that didn't match our pattern
                    return (
                      <tr key={index}>
                        <td className="py-2 px-2" colSpan={4}>{item.text}</td>
                      </tr>
                    );
                  }
                  
                  const isAbnormalValue = isValueAbnormal(item.value, item.referenceRange);
                  const valueClass = result.critical 
                    ? "text-red-600 font-bold" 
                    : isAbnormalValue 
                    ? "text-amber-600 font-semibold" 
                    : "";
                  
                  return (
                    <tr key={index} className="border-b">
                      <td className="py-2 px-2 font-medium">{item.test}</td>
                      <td className={`py-2 px-2 ${valueClass}`}>{item.value}</td>
                      <td className="py-2 px-2">{item.units}</td>
                      <td className="py-2 px-2">{item.referenceRange}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Specimen Collected:</p>
              <p>{formatDateTime(result.timestamp)}</p>
            </div>
            <div>
              <p className="text-gray-500">Result Reported:</p>
              <p>{formatDateTime(result.timestamp)}</p>
            </div>
          </div>
          
          {/* Acknowledgment section */}
          {result.critical && (
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="font-medium mb-2">Acknowledgment:</h3>
              
              {isAcknowledged ? (
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  {result.acknowledgements?.map((ack: any, i: number) => (
                    ack.role === 'doctor' && (
                      <div key={i} className="text-green-800">
                        {ack.comment}
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="flex flex-col">
                  <p className="text-red-600 mb-2">This critical result requires your acknowledgment</p>
                  <Button 
                    onClick={onAcknowledge}
                    className="bg-medical-red hover:bg-red-700 text-white"
                  >
                    Acknowledge Critical Result
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultDetail;
