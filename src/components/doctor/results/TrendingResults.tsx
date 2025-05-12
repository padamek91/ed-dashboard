
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { TrendingDown, TrendingUp } from 'lucide-react';

// Simple implementation of trending results
const TrendingResults = () => {
  // Sample data structure for trending lab values
  const trendingData = [
    { 
      patient: "Samantha Chen", 
      test: "Hemoglobin", 
      values: [10.2, 10.4, 10.8, 11.2],
      trend: "up",
      refRange: "12.0-16.0 g/dL"
    },
    { 
      patient: "David Smith", 
      test: "Glucose", 
      values: [180, 172, 160, 142],
      trend: "down", 
      refRange: "70-99 mg/dL"
    },
    { 
      patient: "Michael Johnson", 
      test: "Sodium", 
      values: [132, 133, 134, 135],
      trend: "up",
      refRange: "135-145 mmol/L"
    },
    { 
      patient: "John Williams", 
      test: "White Blood Cells", 
      values: [15.2, 14.8, 13.5, 12.1],
      trend: "down",
      refRange: "4.5-11.0 10³/μL"
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Test</TableHead>
              <TableHead>Trending</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trendingData.map((item, index) => {
              const isAbnormal = (item.trend === "down" && item.values[item.values.length-1] < parseFloat(item.refRange.split('-')[0])) || 
                               (item.trend === "up" && item.values[item.values.length-1] > parseFloat(item.refRange.split('-')[1]));
              
              return (
                <TableRow key={index}>
                  <TableCell>{item.patient}</TableCell>
                  <TableCell>{item.test}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {item.trend === "up" ? (
                        <>
                          <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-sm">{item.values.join(' → ')}</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4 mr-1 text-amber-500" />
                          <span className="text-sm">{item.values.join(' → ')}</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={isAbnormal ? "font-medium text-amber-600" : ""}>
                    {item.values[item.values.length-1]}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.refRange}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TrendingResults;
