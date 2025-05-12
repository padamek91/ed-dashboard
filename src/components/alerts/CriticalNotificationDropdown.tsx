
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/contexts/OrdersContext';
import { Bell, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

export const CriticalNotificationDropdown = () => {
  const { criticalResults, clearCriticalNotification } = useOrders();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewResult = (id: string) => {
    navigate(`/doctor-dashboard/results?id=${id}`);
    setIsOpen(false);
  };

  // Format time difference
  const formatTimeDiff = (timestamp: string) => {
    const now = new Date();
    const resultTime = new Date(timestamp);
    const diffMs = now.getTime() - resultTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) {
        return `${diffHours} hr ago`;
      } else {
        return `${Math.floor(diffHours / 24)} days ago`;
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {criticalResults.length > 0 && (
            <span className="absolute top-1 right-1 w-3 h-3 bg-medical-red rounded-full flex items-center justify-center text-[10px] text-white">
              {criticalResults.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="bg-medical-red text-white p-3">
          <h3 className="font-semibold">Critical Results</h3>
        </div>
        {criticalResults.length > 0 ? (
          <ScrollArea className="h-[300px]">
            <div className="divide-y">
              {criticalResults.map((result) => (
                <div key={result.id} className="p-3 hover:bg-gray-50">
                  <div className="flex gap-2 items-start">
                    <AlertCircle className="h-4 w-4 text-medical-red mt-0.5" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{result.patient}</p>
                        <p className="text-xs text-gray-500">{formatTimeDiff(result.timestamp)}</p>
                      </div>
                      <p className="text-sm mt-1">{result.type}</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="mt-2 text-xs border-medical-red text-medical-red hover:bg-medical-red/10 w-full"
                        onClick={() => handleViewResult(result.id)}
                      >
                        View Critical Result
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No critical results requiring attention
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
