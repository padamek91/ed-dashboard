
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { imagingOrders } from '@/data/ordersMockData';
import PatientSelector from './PatientSelector';
import OrdersTable from './OrdersTable';
import { filterOrdersByPatient } from '@/utils/orderUtils';
import { Separator } from '@/components/ui/separator';

const ImagingOrders = () => {
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
          <h3 className="text-lg font-medium mb-4">Imaging Order Status</h3>
          <OrdersTable 
            orders={selectedPatient 
              ? filterOrdersByPatient(imagingOrders, selectedPatient)
              : imagingOrders
            } 
            showPatient={true}
            emptyMessage="No imaging orders found"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagingOrders;
