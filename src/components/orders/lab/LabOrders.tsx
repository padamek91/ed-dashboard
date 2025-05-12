
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PatientSelector from '../PatientSelector';
import LabOrderEntry from './LabOrderEntry';
import LabOrderStatus from './LabOrderStatus';
import LabResults from './LabResults';
import { useOrders } from '@/contexts/OrdersContext';

interface LabOrdersProps {
  patientId?: string;
}

const LabOrders = ({ patientId }: LabOrdersProps) => {
  const { labOrders, addLabOrders } = useOrders();
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patientId || '');
  const [selectedPatient, setSelectedPatient] = useState<{id: string; name: string; mrn: string} | null>(null);
  const [labTab, setLabTab] = useState<string>('entry');
  
  // Update selected patient id when the prop changes
  useEffect(() => {
    if (patientId) {
      setSelectedPatientId(patientId);
    }
  }, [patientId]);

  // Handle new order submission
  const handleOrderSubmit = (newOrders: any[]) => {
    addLabOrders(newOrders);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lab Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <PatientSelector 
          selectedPatient={selectedPatient}
          onPatientSelect={setSelectedPatient}
          selectedPatientId={selectedPatientId}
          onPatientIdChange={setSelectedPatientId}
        />

        <Tabs value={labTab} onValueChange={setLabTab} className="w-full mt-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="entry">Order Entry</TabsTrigger>
            <TabsTrigger value="status">Order Status</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="entry" className="mt-4">
            <LabOrderEntry 
              selectedPatient={selectedPatient}
              onOrderSubmit={handleOrderSubmit}
              setActiveLabTab={setLabTab}
            />
          </TabsContent>

          <TabsContent value="status" className="mt-4">
            <LabOrderStatus
              orders={labOrders}
              selectedPatient={selectedPatient}
            />
          </TabsContent>

          <TabsContent value="results" className="mt-4">
            <LabResults
              orders={labOrders}
              selectedPatient={selectedPatient}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LabOrders;
