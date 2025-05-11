
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { labOrders as initialLabOrders, medicationOrders as initialMedicationOrders } from '@/data/ordersMockData';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/components/ui/sonner';
import { useAuth } from './AuthContext';

// Define interfaces for our orders
export interface LabOrder {
  id: string;
  type: string;
  patient: string;
  mrn: string;
  urgent: boolean;
  timestamp: string;
  status: string;
  result?: string;
  abnormal?: boolean;
  critical?: boolean;
  acknowledgements?: {
    by: string;
    role: string;
    timestamp: string;
    comment?: string;
  }[];
}

export interface MedicationOrder {
  id: string;
  type: string;
  patient: string;
  mrn: string;
  urgent: boolean;
  status: string;
  timestamp: string;
}

interface OrdersContextType {
  labOrders: LabOrder[];
  medicationOrders: MedicationOrder[];
  addLabOrder: (order: Omit<LabOrder, 'id' | 'timestamp'>) => void;
  addLabOrders: (orders: Omit<LabOrder, 'id' | 'timestamp'>[]) => void;
  updateLabOrder: (id: string, updates: Partial<LabOrder>) => void;
  addMedicationOrder: (order: Omit<MedicationOrder, 'id' | 'timestamp'>) => void;
  acknowledgeLabOrder: (id: string) => void;
  collectLabSpecimen: (id: string) => void;
  printLabels: (id: string) => void;
  hasCriticalResults: boolean;
  acknowledgeLabResult: (id: string, comment?: string) => void;
  clearCriticalNotification: (id: string) => void;
  criticalResults: LabOrder[];
}

const OrdersContext = createContext<OrdersContextType>({
  labOrders: [],
  medicationOrders: [],
  addLabOrder: () => {},
  addLabOrders: () => {},
  updateLabOrder: () => {},
  addMedicationOrder: () => {},
  acknowledgeLabOrder: () => {},
  collectLabSpecimen: () => {},
  printLabels: () => {},
  hasCriticalResults: false,
  acknowledgeLabResult: () => {},
  clearCriticalNotification: () => {},
  criticalResults: []
});

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [labOrders, setLabOrders] = useState<LabOrder[]>(initialLabOrders);
  const [medicationOrders, setMedicationOrders] = useState<MedicationOrder[]>(initialMedicationOrders);
  const [hasCriticalResults, setHasCriticalResults] = useState(false);
  const { toast: uiToast } = useToast();
  const { user } = useAuth();

  // Identify critical results that need attention
  const criticalResults = labOrders.filter(
    order => order.critical && 
    order.status === 'resulted' && 
    (!order.acknowledgements || !order.acknowledgements.some(ack => ack.role === 'doctor'))
  );

  useEffect(() => {
    // Check for unacknowledged critical results when orders change
    const unacknowledgedCritical = labOrders.some(
      order => order.critical && 
      order.status === 'resulted' && 
      (!order.acknowledgements || !order.acknowledgements.some(ack => ack.role === 'doctor'))
    );
    
    setHasCriticalResults(unacknowledgedCritical);
  }, [labOrders]);

  const addLabOrder = (order: Omit<LabOrder, 'id' | 'timestamp'>) => {
    const newOrder: LabOrder = {
      ...order,
      id: `lab-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      status: 'order placed'
    };
    
    setLabOrders(prev => [newOrder, ...prev]);
    toast.success("Lab order placed successfully");
  };

  const addLabOrders = (orders: Omit<LabOrder, 'id' | 'timestamp'>[]) => {
    const newOrders = orders.map(order => ({
      ...order,
      id: `lab-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      status: 'order placed'
    }));
    
    setLabOrders(prev => [...newOrders, ...prev]);
    toast.success(`${newOrders.length} lab orders placed successfully`);
  };

  const updateLabOrder = (id: string, updates: Partial<LabOrder>) => {
    setLabOrders(prev => 
      prev.map(order => 
        order.id === id 
          ? { ...order, ...updates } 
          : order
      )
    );
  };

  const addMedicationOrder = (order: Omit<MedicationOrder, 'id' | 'timestamp'>) => {
    const newOrder: MedicationOrder = {
      ...order,
      id: `med-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      status: 'ordered'
    };
    
    setMedicationOrders(prev => [newOrder, ...prev]);
    toast.success("Medication order placed successfully");
  };

  const acknowledgeLabOrder = (id: string) => {
    updateLabOrder(id, { 
      status: 'acknowledged by nurse',
      acknowledgements: [
        ...(labOrders.find(o => o.id === id)?.acknowledgements || []),
        {
          by: user?.name || 'Unknown User',
          role: user?.role || 'unknown',
          timestamp: new Date().toISOString()
        }
      ]
    });
    toast.success("Lab order acknowledged");
  };

  const printLabels = (id: string) => {
    // In a real app, this would trigger a print dialog
    toast.success("Labels sent to printer");
    
    // Update the order status
    updateLabOrder(id, { 
      status: 'labels printed',
    });
  };

  const collectLabSpecimen = (id: string) => {
    updateLabOrder(id, { 
      status: 'collected',
    });
    toast.success("Specimen collection documented");
  };

  const acknowledgeLabResult = (id: string, comment?: string) => {
    if (!user) return;

    const acknowledgement = {
      by: user.name,
      role: user.role,
      timestamp: new Date().toISOString(),
      comment: comment || `Result acknowledged by ${user.name}`
    };

    updateLabOrder(id, {
      acknowledgements: [
        ...(labOrders.find(o => o.id === id)?.acknowledgements || []),
        acknowledgement
      ]
    });

    // Show confirmation toast
    uiToast({
      title: "Critical Result Acknowledged",
      description: "Your acknowledgment has been recorded.",
    });
  };

  const clearCriticalNotification = (id: string) => {
    // This would typically mark the notification as viewed
    console.log(`Critical notification for order ${id} cleared`);
  };

  return (
    <OrdersContext.Provider value={{
      labOrders,
      medicationOrders,
      addLabOrder,
      addLabOrders,
      updateLabOrder,
      addMedicationOrder,
      acknowledgeLabOrder,
      collectLabSpecimen,
      printLabels,
      hasCriticalResults,
      acknowledgeLabResult,
      clearCriticalNotification,
      criticalResults
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
