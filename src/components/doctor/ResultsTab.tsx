
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { patients } from '@/data/mockData';
import { Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatDateTime } from '@/utils/orderUtils';
import { useOrders } from '@/contexts/OrdersContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

const ResultsTab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { labOrders, acknowledgeLabResult } = useOrders();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const resultId = queryParams.get('id');
  
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('any');
  const [selectedResult, setSelectedResult] = useState<any>(null);

  // Effect to find the specific result when ID is provided
  useEffect(() => {
    if (resultId) {
      const result = labOrders.find(order => order.id === resultId);
      if (result) {
        setSelectedResult(result);
      }
    } else {
      setSelectedResult(null);
    }
  }, [resultId, labOrders]);

  // Get completed orders with results
  const completedOrders = labOrders.filter(order => order.status === 'resulted' && order.result);

  // Filter results based on selections
  const filteredResults = completedOrders.filter(order => {
    let matches = true;
    
    // Filter by patient if selected
    if (selectedPatient !== 'all' && order.mrn !== selectedPatient) {
      matches = false;
    }
    
    // Filter by order type if selected
    if (orderTypeFilter !== 'all') {
      // Example logic - adjust based on actual order types
      if (orderTypeFilter === 'Lab' && !order.type.includes('Panel') && !order.type.includes('CBC')) {
        matches = false;
      } else if (orderTypeFilter === 'Imaging' && !order.type.includes('X-ray') && !order.type.includes('CT') && !order.type.includes('MRI')) {
        matches = false;
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const result = order.result?.toLowerCase() || '';
      const type = order.type.toLowerCase();
      const patientName = order.patient.toLowerCase();
      
      if (!result.includes(lowerCaseQuery) && 
          !type.includes(lowerCaseQuery) && 
          !patientName.includes(lowerCaseQuery)) {
        matches = false;
      }
    }
    
    // Filter by time if selected
    if (timeFilter !== 'any') {
      const orderDate = new Date(order.timestamp);
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

  // Function to view detailed result
  const viewDetailedResult = (resultId: string) => {
    // Navigate to the main results tab with the specific result ID
    navigate(`/doctor-dashboard/results?id=${resultId}`);
  };

  // Clear the selected result and return to the list view
  const handleBackToList = () => {
    navigate('/doctor-dashboard/results');
  };

  // Handle acknowledging the critical result
  const handleAcknowledgeResult = () => {
    if (selectedResult && user) {
      const timestamp = new Date().toLocaleString();
      const comment = `Result acknowledged by ${user.name} at ${timestamp}`;
      acknowledgeLabResult(selectedResult.id, comment);
    }
  };
  
  // Check if this result has already been acknowledged
  const isAcknowledged = selectedResult?.acknowledgements?.some(
    (ack: any) => ack.role === 'doctor'
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Results Review</h2>

      {selectedResult ? (
        // Detailed result view
        <Card>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>{selectedResult.type}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Patient: {selectedResult.patient} • Ordered: {formatDateTime(selectedResult.timestamp)}
              </p>
            </div>
            <Button variant="outline" onClick={handleBackToList}>
              Back to All Results
            </Button>
          </CardHeader>
          <CardContent>
            <div className={`p-4 rounded-md ${
              selectedResult.critical 
                ? 'bg-red-50 border border-red-200' 
                : selectedResult.abnormal 
                ? 'bg-amber-50 border border-amber-200' 
                : 'bg-gray-50 border border-gray-200'
            }`}>
              {selectedResult.critical && (
                <div className="mb-4 text-red-600 font-semibold flex items-center">
                  <span className="mr-2 px-2 py-0.5 bg-red-600 text-white rounded-full text-xs">CRITICAL RESULT</span>
                  Immediate attention required
                </div>
              )}
              {selectedResult.abnormal && !selectedResult.critical && (
                <div className="mb-4 text-amber-600 font-semibold">
                  <span className="mr-2 px-2 py-0.5 bg-amber-600 text-white rounded-full text-xs">ABNORMAL RESULT</span>
                  Values outside normal range
                </div>
              )}
              
              <h3 className="font-medium mb-2">Result:</h3>
              <pre className="whitespace-pre-wrap font-mono text-sm bg-white p-4 rounded border">{selectedResult.result}</pre>
              
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Specimen Collected:</p>
                  <p>{formatDateTime(selectedResult.timestamp)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Result Reported:</p>
                  <p>{formatDateTime(selectedResult.timestamp)}</p>
                </div>
              </div>
              
              {/* Acknowledgment section */}
              {selectedResult.critical && (
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h3 className="font-medium mb-2">Acknowledgment:</h3>
                  
                  {isAcknowledged ? (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      {selectedResult.acknowledgements?.map((ack: any, i: number) => (
                        ack.role === 'doctor' && (
                          <div key={i} className="text-green-800">
                            {ack.comment}
                          </div>
                        )
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <p className="text-red-600 mb-2">This critical result requires your acknowledgment</p>
                      <Button 
                        onClick={handleAcknowledgeResult}
                        className="bg-medical-red hover:bg-red-700 text-white"
                      >
                        Acknowledge Critical Result
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        // Results list view
        <>
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
                      <SelectItem key={patient.id} value={patient.mrn}>
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
                    <SelectItem value="Other">Other</SelectItem>
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
                            ? 'border-l-red-500' 
                            : result.abnormal 
                            ? 'border-l-amber-500' 
                            : 'border-l-gray-200'
                        }`}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <div className="font-medium">
                                  {result.type}
                                  {result.critical && (
                                    <span className="ml-2 text-xs font-semibold text-white bg-red-600 px-2 py-1 rounded-full">
                                      CRITICAL
                                    </span>
                                  )}
                                  {!result.critical && result.abnormal && (
                                    <span className="ml-2 text-xs font-semibold text-white bg-amber-600 px-2 py-1 rounded-full">
                                      ABNORMAL
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Patient: {result.patient}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Completed: {formatDateTime(result.timestamp)}
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
                                ? 'text-red-600' 
                                : result.abnormal 
                                ? 'text-amber-700' 
                                : ''
                            }`}>
                              <div className="font-medium">Result Preview:</div>
                              <div className="whitespace-pre-wrap line-clamp-2 text-sm">
                                {result.result}
                              </div>
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
                  <div className="space-y-4">
                    {filteredResults.filter(r => r.critical).length > 0 ? (
                      filteredResults.filter(r => r.critical).map((result) => (
                        <Card key={result.id} className="border-l-4 border-l-red-500">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row justify-between">
                              <div>
                                <div className="font-medium">
                                  {result.type}
                                  <span className="ml-2 text-xs font-semibold text-white bg-red-600 px-2 py-1 rounded-full">
                                    CRITICAL
                                  </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Patient: {result.patient}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Completed: {formatDateTime(result.timestamp)}
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
                            
                            <div className="mt-4 p-3 bg-red-50 rounded-md text-red-600">
                              <div className="font-medium">Result Preview:</div>
                              <div className="whitespace-pre-wrap line-clamp-2 text-sm">
                                {result.result}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        No critical results found
                      </div>
                    )}
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
        </>
      )}
    </div>
  );
};

export default ResultsTab;
