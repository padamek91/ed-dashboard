
import { departmentStats } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TrackBoard = () => {
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

  // Calculate acuity percentages
  const acuityPercentages = Object.entries(acuityCounts).map(([level, count]) => {
    return {
      level,
      count,
      percentage: Math.round((count / totalPatients) * 100)
    };
  });

  // Helper function to get color for acuity level
  const getAcuityColor = (level: string) => {
    const colors: Record<string, string> = {
      '1': 'bg-medical-red',
      '2': 'bg-medical-orange',
      '3': 'bg-medical-yellow',
      '4': 'bg-medical-green',
      '5': 'bg-medical-blue',
    };
    return colors[level] || 'bg-gray-400';
  };

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

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="waiting">Waiting Room</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Acuity Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.keys(acuityCounts).sort().map((level) => {
                  const count = acuityCounts[parseInt(level)];
                  const percentage = Math.round((count / totalPatients) * 100);
                  
                  return (
                    <div key={level} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-4 h-4 rounded-full ${getAcuityColor(level)} mr-2`}></div>
                          <span className="font-medium">ESI Level {level}</span>
                        </div>
                        <span>{count} patients ({percentage}%)</span>
                      </div>
                      <Progress 
                        value={percentage} 
                        className={`h-2 ${getAcuityColor(level)}`} 
                      />
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4">
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
        </TabsContent>

        <TabsContent value="locations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Location map view would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="waiting" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Waiting Room Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Waiting room metrics would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrackBoard;
