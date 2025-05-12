
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Placeholder data for trending chart
const mockData = [
  { date: 'Jan 1', value: 4.2 },
  { date: 'Jan 15', value: 4.3 },
  { date: 'Feb 1', value: 4.5 },
  { date: 'Feb 15', value: 4.1 },
  { date: 'Mar 1', value: 4.2 },
];

const TrendingResults = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Results</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Display placeholder chart if data is available, otherwise show message */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingResults;
