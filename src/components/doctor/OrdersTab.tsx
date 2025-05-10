
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { patients } from '@/data/mockData';

const OrdersTab = () => {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [orderType, setOrderType] = useState('');
  const [orderDetails, setOrderDetails] = useState('');
  const { toast } = useToast();

  const handlePlaceOrder = () => {
    if (!selectedPatient || !orderType || !orderDetails) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Placed",
      description: `${orderType} order placed successfully for ${patients.find(p => p.id === selectedPatient)?.name}`,
    });

    // Reset form
    setOrderDetails('');
  };

  // Mock duplications and contraindications
  const checkForAlerts = (patient: string, orderType: string, details: string) => {
    // This would connect to a real system to check for actual alerts
    if (patient === '1' && orderType === 'Medication' && details.toLowerCase().includes('aspirin')) {
      return {
        type: 'duplicate',
        message: 'Duplicate order warning: Patient already has an active Aspirin order'
      };
    }
    if (patient === '3' && orderType === 'Medication' && details.toLowerCase().includes('albuterol')) {
      return {
        type: 'contraindication',
        message: 'Contraindication warning: Potential interaction with current medications'
      };
    }
    return null;
  };

  const alert = selectedPatient && orderType && orderDetails ? 
    checkForAlerts(selectedPatient, orderType, orderDetails) : null;

  const commonOrders = {
    Lab: [
      'Complete Blood Count (CBC)',
      'Basic Metabolic Panel (BMP)',
      'Comprehensive Metabolic Panel (CMP)',
      'Cardiac Enzymes',
      'Coagulation Studies',
      'Arterial Blood Gas (ABG)',
      'Urinalysis',
      'Blood Cultures',
      'Lactate',
      'D-Dimer'
    ],
    Imaging: [
      'Chest X-ray',
      'Abdominal X-ray',
      'Head CT',
      'Chest CT',
      'Abdominal CT',
      'CT Angiogram',
      'Extremity X-ray',
      'Ultrasound',
      'MRI',
      'FAST Ultrasound'
    ],
    Medication: [
      'Acetaminophen 650mg PO',
      'Ibuprofen 600mg PO',
      'Ketorolac 15mg IV',
      'Morphine 4mg IV',
      'Ondansetron 4mg IV',
      'Lorazepam 1mg IV',
      'Ceftriaxone 1g IV',
      'Albuterol Nebulizer',
      'Aspirin 325mg PO',
      'Normal Saline 1L IV'
    ],
    Consult: [
      'Cardiology Consultation',
      'Neurology Consultation',
      'General Surgery Consultation',
      'Orthopedics Consultation',
      'Psychiatry Consultation',
      'OB/GYN Consultation',
      'Pulmonology Consultation',
      'ENT Consultation',
      'Infectious Disease Consultation',
      'Gastroenterology Consultation'
    ]
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Orders</h2>

      <Tabs defaultValue="new-order" className="w-full">
        <TabsList>
          <TabsTrigger value="new-order">New Order</TabsTrigger>
          <TabsTrigger value="active-orders">Active Orders</TabsTrigger>
          <TabsTrigger value="order-history">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="new-order" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Place New Order</CardTitle>
              <CardDescription>
                Create new orders for labs, imaging, medications, or consults
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="patient">Patient</Label>
                    <Select 
                      value={selectedPatient} 
                      onValueChange={setSelectedPatient}
                    >
                      <SelectTrigger id="patient">
                        <SelectValue placeholder="Select a patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients.map(patient => (
                          <SelectItem key={patient.id} value={patient.id}>
                            {patient.name} ({patient.mrn})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="orderType">Order Type</Label>
                    <Select 
                      value={orderType} 
                      onValueChange={setOrderType}
                    >
                      <SelectTrigger id="orderType">
                        <SelectValue placeholder="Select order type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lab">Lab</SelectItem>
                        <SelectItem value="Imaging">Imaging</SelectItem>
                        <SelectItem value="Medication">Medication</SelectItem>
                        <SelectItem value="Consult">Consult</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {orderType && (
                    <div>
                      <Label>Common {orderType} Orders</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {(commonOrders[orderType as keyof typeof commonOrders] || []).map((order, index) => (
                          <Button 
                            key={index} 
                            variant="outline" 
                            className="text-left justify-start h-auto py-2 px-3"
                            onClick={() => setOrderDetails(order)}
                            type="button"
                          >
                            {order}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="details">Order Details</Label>
                    <Input
                      id="details"
                      placeholder="Enter order details"
                      value={orderDetails}
                      onChange={(e) => setOrderDetails(e.target.value)}
                    />
                  </div>
                </div>

                {alert && (
                  <div className={`p-3 rounded-md text-sm ${
                    alert.type === 'duplicate' 
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' 
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    <strong className="font-medium">{alert.type === 'duplicate' ? 'Warning: ' : 'Alert: '}</strong>
                    {alert.message}
                  </div>
                )}

                <div>
                  <Button onClick={handlePlaceOrder} type="button">
                    Place Order
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active-orders" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Active orders would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="order-history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Order history would be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersTab;
