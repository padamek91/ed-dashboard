
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LabOrders from '../orders/lab/LabOrders';
import MedicationOrders from '../orders/MedicationOrders';
import ImagingOrders from '../orders/ImagingOrders';
import ConsultOrders from '../orders/ConsultOrders';
import { patients } from '@/data/mockData';

interface OrdersTabProps {
  initialTab?: string;
  patientId?: string;
}

const OrdersTab = ({ initialTab = '', patientId = '' }: OrdersTabProps) => {
  const [mainTab, setMainTab] = useState<string>('Lab');
  
  // Set initial tab if provided
  useEffect(() => {
    if (initialTab) {
      // Capitalize first letter for consistency with tab values
      const formattedTab = initialTab.charAt(0).toUpperCase() + initialTab.slice(1).toLowerCase();
      setMainTab(formattedTab);
    }
  }, [initialTab]);
  
  // Find selected patient info if patientId is provided
  const selectedPatient = patientId ? 
    patients.find(patient => patient.id === patientId) : null;
  
  // Log the selected patient for debugging
  useEffect(() => {
    if (selectedPatient) {
      console.log('Selected patient for orders:', selectedPatient.name);
    }
  }, [selectedPatient]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders</h2>
        {selectedPatient && (
          <div className="bg-blue-50 px-4 py-2 rounded-md">
            <span className="text-sm text-gray-500">Selected Patient:</span>
            <span className="ml-2 font-medium">{selectedPatient.name} ({selectedPatient.mrn})</span>
          </div>
        )}
      </div>

      <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
        <TabsList className="w-full justify-start border-b mb-2">
          <TabsTrigger value="Lab">Lab</TabsTrigger>
          <TabsTrigger value="Medication">Medication</TabsTrigger>
          <TabsTrigger value="Imaging">Imaging</TabsTrigger>
          <TabsTrigger value="Consult">Consults</TabsTrigger>
        </TabsList>

        {/* Lab Tab Content */}
        <TabsContent value="Lab" className="mt-4">
          <LabOrders patientId={patientId || ''} />
        </TabsContent>

        {/* Medication Tab Content */}
        <TabsContent value="Medication" className="mt-4">
          <MedicationOrders patientId={patientId || ''} />
        </TabsContent>

        {/* Imaging Tab Content */}
        <TabsContent value="Imaging" className="mt-4">
          <ImagingOrders patientId={patientId || ''} />
        </TabsContent>

        {/* Consult Tab Content */}
        <TabsContent value="Consult" className="mt-4">
          <ConsultOrders patientId={patientId || ''} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersTab;
