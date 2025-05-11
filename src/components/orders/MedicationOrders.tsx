
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { medicationOrders, commonOrders } from '@/data/ordersMockData';
import PatientSelector from './PatientSelector';
import OrdersTable from './OrdersTable';
import { filterOrdersByPatient } from '@/utils/orderUtils';
import { Separator } from '@/components/ui/separator';

const MedicationOrders = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<{id: string; name: string; mrn: string} | null>(null);
  
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
          <h3 className="text-lg font-medium mb-4">Medication Order Status</h3>
          <OrdersTable 
            orders={selectedPatient 
              ? filterOrdersByPatient(medicationOrders, selectedPatient)
              : medicationOrders
            } 
            showPatient={true}
            emptyMessage="No medication orders found"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationOrders;
