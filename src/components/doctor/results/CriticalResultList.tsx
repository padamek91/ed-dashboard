
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import CriticalResultItem from './CriticalResultItem';
import { LabOrder } from '@/contexts/OrdersContext';
import { memo } from 'react';

interface CriticalResultListProps {
  filteredResults: LabOrder[];
  formatLabResult: (resultText: string) => any[];
  isValueAbnormal: (value: string | number, refRange: string) => boolean;
  onViewDetails: (resultId: string) => void;
}

const CriticalResultList = memo(({
  filteredResults,
  formatLabResult,
  isValueAbnormal,
  onViewDetails
}: CriticalResultListProps) => {
  const criticalResults = filteredResults.filter(r => r.critical);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Critical Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {criticalResults.length > 0 ? (
            criticalResults.map((result) => (
              <CriticalResultItem
                key={result.id}
                result={result}
                formatLabResult={formatLabResult}
                isValueAbnormal={isValueAbnormal}
                onViewDetails={onViewDetails}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No critical results found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});

CriticalResultList.displayName = 'CriticalResultList';

export default CriticalResultList;
