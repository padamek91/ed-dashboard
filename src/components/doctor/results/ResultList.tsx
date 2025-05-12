
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import ResultItem from './ResultItem';
import { LabOrder } from '@/contexts/OrdersContext';

interface ResultListProps {
  filteredResults: LabOrder[];
  formatLabResult: (resultText: string) => any[];
  isValueAbnormal: (value: string | number, refRange: string) => boolean;
  onViewDetails: (resultId: string) => void;
}

const ResultList = ({
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
            {filteredResults.map((result) => (
              <ResultItem 
                key={result.id}
                result={result}
                formatLabResult={formatLabResult}
                isValueAbnormal={isValueAbnormal}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No results match your filters
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultList;
