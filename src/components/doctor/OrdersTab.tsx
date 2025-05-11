
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LabOrders from '../orders/lab/LabOrders';
import MedicationOrders from '../orders/MedicationOrders';
import ImagingOrders from '../orders/ImagingOrders';
import ConsultOrders from '../orders/ConsultOrders';

const OrdersTab = () => {
  const [mainTab, setMainTab] = useState<string>('Lab');

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>

      <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
        <TabsList className="w-full justify-start border-b mb-2">
          <TabsTrigger value="Lab">Lab</TabsTrigger>
          <TabsTrigger value="Medication">Medication</TabsTrigger>
          <TabsTrigger value="Imaging">Imaging</TabsTrigger>
          <TabsTrigger value="Consult">Consults</TabsTrigger>
        </TabsList>

        {/* Lab Tab Content */}
        <TabsContent value="Lab" className="mt-4">
          <LabOrders />
        </TabsContent>

        {/* Medication Tab Content */}
        <TabsContent value="Medication" className="mt-4">
          <MedicationOrders />
        </TabsContent>

        {/* Imaging Tab Content */}
        <TabsContent value="Imaging" className="mt-4">
          <ImagingOrders />
        </TabsContent>

        {/* Consult Tab Content */}
        <TabsContent value="Consult" className="mt-4">
          <ConsultOrders />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersTab;
