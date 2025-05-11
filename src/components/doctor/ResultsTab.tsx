
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { orders, patients } from '@/data/mockData';
import { Search } from 'lucide-react';

const ResultsTab = () => {
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('any');

  // Get completed orders with results
  const completedOrders = orders.filter(order => order.status === 'Completed' && order.result);

  // Filter results based on selections
  const filteredResults = completedOrders.filter(order => {
    let matches = true;
    
    // Filter by patient if selected
    if (selectedPatient !== 'all' && order.patientId !== selectedPatient) {
      matches = false;
    }
    
    // Filter by order type if selected
    if (orderTypeFilter !== 'all' && order.type !== orderTypeFilter) {
      matches = false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const result = order.result?.toLowerCase() || '';
      const name = order.name.toLowerCase();
      const patientName = patients.find(p => p.id === order.patientId)?.name.toLowerCase() || '';
      
      if (!result.includes(lowerCaseQuery) && 
          !name.includes(lowerCaseQuery) && 
          !patientName.includes(lowerCaseQuery)) {
        matches = false;
      }
    }
    
    // Filter by time if selected
    if (timeFilter !== 'any') {
      const orderDate = new Date(order.completedAt || order.orderedAt);
      const now = new Date();
      const hoursDiff = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
      
      switch (timeFilter) {
        case '4h':
          if (hoursDiff > 4) matches = false;
          break;
        case '12h':
          if (hoursDiff > 12) matches = false;
          break;
        case '24h':
          if (hoursDiff > 24) matches = false;
          break;
        case '48h':
          if (hoursDiff > 48) matches = false;
          break;
      }
    }
    
    return matches;
  });

  // Function to get patient name from ID
  const getPatientName = (patientId: string) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? patient.name : 'Unknown Patient';
  };

  // Function to format date
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Function to navigate to detailed view
  const viewDetailedResult = (resultId: string) => {
    // Navigate to the main results tab with the specific result ID
    window.location.href = `/doctor-dashboard/results?id=${resultId}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Results Review</h2>

      <Card className="border-0 shadow-none bg-transparent">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search results..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="All Patients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Patients</SelectItem>
                {patients.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={orderTypeFilter} onValueChange={setOrderTypeFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Lab">Labs</SelectItem>
                <SelectItem value="Imaging">Imaging</SelectItem>
                <SelectItem value="Medication">Medications</SelectItem>
                <SelectItem value="Consult">Consults</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full md:w-[120px]">
                <SelectValue placeholder="Any Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Time</SelectItem>
                <SelectItem value="4h">Last 4 hours</SelectItem>
                <SelectItem value="12h">Last 12 hours</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="48h">Last 48 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all-results" className="w-full">
        <TabsList>
          <TabsTrigger value="all-results">All Results</TabsTrigger>
          <TabsTrigger value="critical">Critical Results</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="all-results" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Results ({filteredResults.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredResults.length > 0 ? (
                <div className="space-y-4">
                  {filteredResults.map((result) => (
                    <Card key={result.id} className={`border-l-4 ${
                      result.critical 
                        ? 'border-l-medical-red' 
                        : result.abnormal 
                        ? 'border-l-medical-orange' 
                        : 'border-l-gray-200'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <div className="font-medium">
                              {result.name}
                              {result.critical && (
                                <span className="ml-2 text-xs font-semibold text-white bg-medical-red px-2 py-1 rounded-full">
                                  CRITICAL
                                </span>
                              )}
                              {!result.critical && result.abnormal && (
                                <span className="ml-2 text-xs font-semibold text-white bg-medical-orange px-2 py-1 rounded-full">
                                  ABNORMAL
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Patient: {getPatientName(result.patientId)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Ordered: {formatDateTime(result.orderedAt)} by {result.orderedBy}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Completed: {result.completedAt && formatDateTime(result.completedAt)}
                            </div>
                          </div>
                          <div className="mt-3 md:mt-0 md:text-right">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => viewDetailedResult(result.id)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                        
                        <div className={`mt-4 p-3 bg-gray-50 rounded-md ${
                          result.critical 
                            ? 'text-medical-red' 
                            : result.abnormal 
                            ? 'text-medical-orange' 
                            : ''
                        }`}>
                          <div className="font-medium">Result:</div>
                          <div className="whitespace-pre-wrap">{result.result}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No results match your filters
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="critical" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Critical Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Critical results view would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="mt-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsTab;
