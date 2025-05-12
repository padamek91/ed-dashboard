
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

const TrendingResults = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 text-muted-foreground">
          Result trending graphs would be displayed here
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingResults;
