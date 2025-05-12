
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TrackBoard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">ED Track Board</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Track Board</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Track board content will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackBoard;
