
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import ResultItem from './ResultItem';
import { LabOrder } from '@/contexts/OrdersContext';
import { memo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatDateTime } from '@/utils/orderUtils';

interface ResultListProps {
  filteredResults: LabOrder[];
  formatLabResult: (resultText: string) => any[];
  isValueAbnormal: (value: string | number, refRange: string) => boolean;
  onViewDetails: (resultId: string) => void;
}

// Use memo to prevent unnecessary re-renders
const ResultList = memo(({
  filteredResults,
  formatLabResult,
  isValueAbnormal,
  onViewDetails
}: ResultListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Results ({filteredResults.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredResults.length > 0 ? (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Type</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResults.map((result) => (
                  <TableRow 
                    key={result.id} 
                    className={`cursor-pointer ${
                      result.critical ? 'bg-red-50 hover:bg-red-100' : 
                      result.abnormal ? 'bg-amber-50 hover:bg-amber-100' : 
                      'hover:bg-gray-100'
                    }`}
                    onClick={() => onViewDetails(result.id)}
                  >
                    <TableCell className="font-medium flex items-center">
                      {result.type}
                      {result.critical && (
                        <span className="ml-2 text-xs font-semibold text-white bg-red-600 px-2 py-0.5 rounded-full">
                          CRITICAL
                        </span>
                      )}
                      {!result.critical && result.abnormal && (
                        <span className="ml-2 text-xs font-semibold text-white bg-amber-600 px-2 py-0.5 rounded-full">
                          ABNORMAL
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{result.patient}</TableCell>
                    <TableCell>{formatDateTime(result.timestamp)}</TableCell>
                    <TableCell>
                      {result.critical ? (
                        <span className="text-red-600 font-semibold">Urgent Review</span>
                      ) : (
                        result.abnormal ? (
                          <span className="text-amber-600 font-semibold">Review</span>
                        ) : (
                          <span className="text-green-600">Completed</span>
                        )
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No results match your filters
          </div>
        )}
      </CardContent>
    </Card>
  );
});

ResultList.displayName = "ResultList";

export default ResultList;
