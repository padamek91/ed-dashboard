import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/contexts/OrdersContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CriticalResultAlert = () => {
  const { criticalResults, clearCriticalNotification } = useOrders();
  const [isVisible, setIsVisible] = useState(false);
  const [currentResultIndex, setCurrentResultIndex] = useState(0);
  const navigate = useNavigate();
  
  // Reset visibility when critical results change
  useEffect(() => {
    if (criticalResults.length > 0) {
      setIsVisible(true);
      setCurrentResultIndex(0);
    } else {
      setIsVisible(false);
    }
  }, [criticalResults]);

  // No critical results, don't render anything
  if (criticalResults.length === 0 || !isVisible) {
    return null;
  }

  const currentResult = criticalResults[currentResultIndex];

  const handleDismiss = () => {
    clearCriticalNotification(currentResult.id);
    
    // If there are more critical results, show the next one
    if (currentResultIndex < criticalResults.length - 1) {
      setCurrentResultIndex(prev => prev + 1);
    } else {
      // Otherwise hide the alert
      setIsVisible(false);
    }
  };

  const handleViewResult = () => {
    navigate(`/doctor-dashboard/results?id=${currentResult.id}`);
    setIsVisible(false);
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md animate-in fade-in slide-in-from-top duration-300">
      <Alert className="border-medical-red border-2 bg-white shadow-lg">
        <AlertCircle className="h-5 w-5 text-medical-red" />
        <div className="w-full pr-8">
          <AlertTitle className="text-medical-red font-bold flex items-center gap-2">
            CRITICAL RESULT
          </AlertTitle>
          <AlertDescription className="mt-1">
            <p className="font-medium">{currentResult.patient}: {currentResult.type}</p>
            <p className="text-sm text-gray-600 mt-1 mb-2">Requires urgent review</p>
            <Button 
              size="sm" 
              className="bg-medical-red hover:bg-red-700 text-white w-full mt-1" 
              onClick={handleViewResult}
            >
              View Critical Result
            </Button>
          </AlertDescription>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2" 
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </Alert>
    </div>
  );
};
