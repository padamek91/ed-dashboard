
import { departmentStats } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const NurseTrackBoard = () => {
  const { 
    totalPatients, 
    acuityCounts, 
    bedsOccupied, 
    totalBeds, 
    averageWaitTime,
    patientsWaiting,
    admittedWaiting
  } = departmentStats;

  // Calculate occupancy percentage
  const occupancyPercentage = Math.round((bedsOccupied / totalBeds) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">ED Track Board</h2>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalPatients}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {patientsWaiting} in waiting room
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bed Occupancy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-1">
              <span className="text-3xl font-bold">
                {bedsOccupied}/{totalBeds}
              </span>
              <span className="text-lg font-medium">{occupancyPercentage}%</span>
            </div>
            <Progress value={occupancyPercentage} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Wait Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageWaitTime} min</div>
            <div className="text-xs text-muted-foreground mt-1">
              From check-in to provider
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Admitted Waiting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{admittedWaiting}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Patients waiting for beds
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Acuity Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.keys(acuityCounts).sort().map((level) => {
              const count = acuityCounts[parseInt(level)];
              
              return (
                <Card key={level} className="border-t-4" style={{ borderTopColor: level === '1' ? '#FF6B6B' : 
                  level === '2' ? '#FF9800' : 
                  level === '3' ? '#FFC107' : 
                  level === '4' ? '#4CAF50' : '#0A6EBD' }}>
                  <CardContent className="pt-4 text-center">
                    <div className="text-lg font-medium">Level {level}</div>
                    <div className="text-3xl font-bold mt-1">{count}</div>
                    <div className="text-xs text-muted-foreground mt-1">patients</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NurseTrackBoard;
