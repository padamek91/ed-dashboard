
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrders } from '@/contexts/OrdersContext';
import { useAuth } from '@/contexts/AuthContext';

// Import refactored components
import ResultsFilters from './results/ResultsFilters';
import ResultList from './results/ResultList';
import CriticalResultList from './results/CriticalResultList';
import TrendingResults from './results/TrendingResults';
import ResultDetail from './results/ResultDetail';
import { useLabResults } from './results/useLabResults';
import { useResultFormatting } from './results/useResultFormatting';

const ResultsTab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { acknowledgeLabResult } = useOrders();
  
  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const resultId = queryParams.get('id');
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [orderTypeFilter, setOrderTypeFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('any');
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [myPatientsOnly, setMyPatientsOnly] = useState(false);

  // Custom hooks
  const { formatLabResult, isValueAbnormal } = useResultFormatting();
  const { filteredResults } = useLabResults({
    searchQuery,
    orderTypeFilter,
    timeFilter,
    myPatientsOnly
  });

  // Effect to find the specific result when ID is provided
  useEffect(() => {
    if (resultId) {
      const result = filteredResults.find(order => order.id === resultId);
      if (result) {
        setSelectedResult(result);
      }
    } else {
      setSelectedResult(null);
    }
  }, [resultId, filteredResults]);

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
        <ResultDetail 
          result={selectedResult}
          onBack={handleBackToList}
          formatLabResult={formatLabResult}
          isValueAbnormal={isValueAbnormal}
          onAcknowledge={handleAcknowledgeResult}
          isAcknowledged={isAcknowledged}
        />
      ) : (
        // Results list view
        <>
          <ResultsFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedPatient=""
            setSelectedPatient={() => {}}  // Not used anymore, but keeping for compatibility
            orderTypeFilter={orderTypeFilter}
            setOrderTypeFilter={setOrderTypeFilter}
            timeFilter={timeFilter}
            setTimeFilter={setTimeFilter}
            myPatientsOnly={myPatientsOnly}
            setMyPatientsOnly={setMyPatientsOnly}
          />

          <Tabs defaultValue="all-results" className="w-full">
            <TabsList>
              <TabsTrigger value="all-results">All Results</TabsTrigger>
              <TabsTrigger value="critical">Critical Results</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>

            <TabsContent value="all-results" className="mt-4">
              <ResultList 
                filteredResults={filteredResults}
                formatLabResult={formatLabResult}
                isValueAbnormal={isValueAbnormal}
                onViewDetails={viewDetailedResult}
              />
            </TabsContent>

            <TabsContent value="critical" className="mt-4">
              <CriticalResultList 
                filteredResults={filteredResults}
                formatLabResult={formatLabResult}
                isValueAbnormal={isValueAbnormal}
                onViewDetails={viewDetailedResult}
              />
            </TabsContent>

            <TabsContent value="trending" className="mt-4">
              <TrendingResults />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default ResultsTab;
