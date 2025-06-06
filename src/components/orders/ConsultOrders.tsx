
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { consultOrders } from '@/data/ordersMockData';
import PatientSelector from './PatientSelector';
import OrdersTable from './OrdersTable';
import { filterOrdersByPatient } from '@/utils/orderUtils';
import { Separator } from '@/components/ui/separator';

interface ConsultOrdersProps {
  patientId?: string;
}

const ConsultOrders = ({ patientId }: ConsultOrdersProps) => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patientId || '');
  const [selectedPatient, setSelectedPatient] = useState<{id: string; name: string; mrn: string} | null>(null);
  
  // Update selected patient if patientId prop changes
  useEffect(() => {
    if (patientId) {
      setSelectedPatientId(patientId);
    }
  }, [patientId]);
  
  return (
    <Card>
      <CardContent className="p-6">
        <PatientSelector 
          selectedPatient={selectedPatient}
          onPatientSelect={setSelectedPatient}
          selectedPatientId={selectedPatientId}
          onPatientIdChange={setSelectedPatientId}
        />

        <Separator className="my-6" />

        <div>
          <h3 className="text-lg font-medium mb-4">Consultation Status</h3>
          <OrdersTable 
            orders={selectedPatient 
              ? filterOrdersByPatient(consultOrders, selectedPatient)
              : consultOrders
            } 
            showPatient={true}
            emptyMessage="No consult orders found"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultOrders;
