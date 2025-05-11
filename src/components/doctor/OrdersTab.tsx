
import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { patients } from '@/data/mockData';

// Mock orders data
const labOrders = [
  { id: '1', patient: 'John Smith', type: 'Complete Blood Count', status: 'on order', timestamp: '2023-05-11 08:30' },
  { id: '2', patient: 'Sarah Jones', type: 'Comprehensive Metabolic Panel', status: 'acknowledged by Dr. Johnson', timestamp: '2023-05-11 09:15' },
  { id: '3', patient: 'Mike Williams', type: 'Urinalysis', status: 'collected', timestamp: '2023-05-11 10:00' },
  { id: '4', patient: 'Lisa Brown', type: 'Troponin', status: 'in process', timestamp: '2023-05-11 07:45' },
  { id: '5', patient: 'David Miller', type: 'D-Dimer', status: 'resulted', timestamp: '2023-05-11 06:30' },
];

const medicationOrders = [
  { id: '1', patient: 'John Smith', type: 'Acetaminophen 500mg', status: 'ordered' },
  { id: '2', patient: 'Sarah Jones', type: 'Lorazepam 1mg', status: 'administered' },
  { id: '3', patient: 'Mike Williams', type: 'Ceftriaxone 1g', status: 'ordered' },
];

const imagingOrders = [
  { id: '1', patient: 'John Smith', type: 'Chest X-Ray', status: 'ordered' },
  { id: '2', patient: 'Sarah Jones', type: 'CT Head', status: 'in process' },
  { id: '3', patient: 'Lisa Brown', type: 'Ultrasound Abdomen', status: 'resulted' },
];

const consultOrders = [
  { id: '1', patient: 'John Smith', type: 'Cardiology', status: 'ordered' },
  { id: '2', patient: 'Mike Williams', type: 'Neurology', status: 'consult in progress' },
  { id: '3', patient: 'David Miller', type: 'Orthopedics', status: 'completed' },
];

// Common orders by category
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

const OrdersTab = () => {
  // State
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [orderType, setOrderType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mainTab, setMainTab] = useState<string>('Lab');
  const [labTab, setLabTab] = useState<string>('entry');
  const { toast } = useToast();

  // Handle order placement
  const handlePlaceOrder = () => {
    if (!selectedPatient || !orderType) {
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

    setOrderType('');
  };

  // Filter orders based on search query
  const filterOrders = useCallback((orders: any[], query: string) => {
    if (!query) return orders;
    return orders.filter(order => 
      order.patient.toLowerCase().includes(query.toLowerCase()) || 
      order.type.toLowerCase().includes(query.toLowerCase())
    );
  }, []);

  // Render order status badges with appropriate colors
  const renderStatusBadge = (status: string) => {
    let bgColor = 'bg-gray-200 text-gray-800';
    
    if (status.includes('on order')) bgColor = 'bg-blue-100 text-blue-800';
    else if (status.includes('acknowledged')) bgColor = 'bg-purple-100 text-purple-800';
    else if (status.includes('collected')) bgColor = 'bg-yellow-100 text-yellow-800';
    else if (status.includes('in process')) bgColor = 'bg-orange-100 text-orange-800';
    else if (status.includes('resulted')) bgColor = 'bg-green-100 text-green-800';
    else if (status.includes('administered')) bgColor = 'bg-green-100 text-green-800';
    else if (status.includes('progress')) bgColor = 'bg-yellow-100 text-yellow-800';
    else if (status.includes('completed')) bgColor = 'bg-green-100 text-green-800';
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
        {status}
      </span>
    );
  };

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
          <Card>
            <CardHeader>
              <CardTitle>Lab Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
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
                <div className="flex-[2] relative">
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96" align="end">
                      <div className="space-y-4">
                        <h4 className="font-medium">Common Lab Orders</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {commonOrders.Lab.map((order, i) => (
                            <Button 
                              key={i} 
                              variant="outline" 
                              className="justify-start h-auto py-2 px-3 text-left"
                              onClick={() => setOrderType(order)}
                            >
                              {order}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Tabs value={labTab} onValueChange={setLabTab} className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="entry">Order Entry</TabsTrigger>
                  <TabsTrigger value="status">Order Status</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>

                <TabsContent value="entry" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order Details</label>
                      <Select value={orderType} onValueChange={setOrderType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select lab test" />
                        </SelectTrigger>
                        <SelectContent>
                          {commonOrders.Lab.map((test) => (
                            <SelectItem key={test} value={test}>
                              {test}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handlePlaceOrder} disabled={!selectedPatient || !orderType}>
                      Place Order
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="status" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Test</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterOrders(labOrders.filter(o => !o.status.includes('resulted')), searchQuery).map(order => (
                        <TableRow key={order.id}>
                          <TableCell>{order.patient}</TableCell>
                          <TableCell>{order.type}</TableCell>
                          <TableCell>{renderStatusBadge(order.status)}</TableCell>
                          <TableCell>{order.timestamp}</TableCell>
                        </TableRow>
                      ))}
                      {filterOrders(labOrders.filter(o => !o.status.includes('resulted')), searchQuery).length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                            No matching orders found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="results" className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Test</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterOrders(labOrders.filter(o => o.status.includes('resulted')), searchQuery).map(order => (
                        <TableRow key={order.id}>
                          <TableCell>{order.patient}</TableCell>
                          <TableCell>{order.type}</TableCell>
                          <TableCell>{renderStatusBadge(order.status)}</TableCell>
                          <TableCell>{order.timestamp}</TableCell>
                        </TableRow>
                      ))}
                      {filterOrders(labOrders.filter(o => o.status.includes('resulted')), searchQuery).length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                            No results found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Medication Tab Content */}
        <TabsContent value="Medication" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Medication Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
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
                <div className="flex-[2] relative">
                  <Input
                    placeholder="Search medication orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96" align="end">
                      <div className="space-y-4">
                        <h4 className="font-medium">Common Medication Orders</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {commonOrders.Medication.map((med, i) => (
                            <Button 
                              key={i} 
                              variant="outline" 
                              className="justify-start h-auto py-2 px-3 text-left"
                              onClick={() => setOrderType(med)}
                            >
                              {med}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Medication</label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select medication" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonOrders.Medication.map((med) => (
                        <SelectItem key={med} value={med}>
                          {med}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handlePlaceOrder} disabled={!selectedPatient || !orderType}>
                  Place Order
                </Button>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-4">Medication Order Status</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Medication</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterOrders(medicationOrders, searchQuery).map(order => (
                      <TableRow key={order.id}>
                        <TableCell>{order.patient}</TableCell>
                        <TableCell>{order.type}</TableCell>
                        <TableCell>{renderStatusBadge(order.status)}</TableCell>
                      </TableRow>
                    ))}
                    {filterOrders(medicationOrders, searchQuery).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                          No medication orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Imaging Tab Content */}
        <TabsContent value="Imaging" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Imaging Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
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
                <div className="flex-[2] relative">
                  <Input
                    placeholder="Search imaging orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96" align="end">
                      <div className="space-y-4">
                        <h4 className="font-medium">Common Imaging Orders</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {commonOrders.Imaging.map((img, i) => (
                            <Button 
                              key={i} 
                              variant="outline" 
                              className="justify-start h-auto py-2 px-3 text-left"
                              onClick={() => setOrderType(img)}
                            >
                              {img}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Imaging Study</label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select imaging study" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonOrders.Imaging.map((img) => (
                        <SelectItem key={img} value={img}>
                          {img}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handlePlaceOrder} disabled={!selectedPatient || !orderType}>
                  Place Order
                </Button>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-4">Imaging Order Status</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Study</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterOrders(imagingOrders, searchQuery).map(order => (
                      <TableRow key={order.id}>
                        <TableCell>{order.patient}</TableCell>
                        <TableCell>{order.type}</TableCell>
                        <TableCell>{renderStatusBadge(order.status)}</TableCell>
                      </TableRow>
                    ))}
                    {filterOrders(imagingOrders, searchQuery).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                          No imaging orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Consult Tab Content */}
        <TabsContent value="Consult" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1">
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
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
                <div className="flex-[2] relative">
                  <Input
                    placeholder="Search consult orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-0 top-0 h-full"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96" align="end">
                      <div className="space-y-4">
                        <h4 className="font-medium">Common Consults</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {commonOrders.Consult.map((consult, i) => (
                            <Button 
                              key={i} 
                              variant="outline" 
                              className="justify-start h-auto py-2 px-3 text-left"
                              onClick={() => setOrderType(consult)}
                            >
                              {consult}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Consultation</label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonOrders.Consult.map((consult) => (
                        <SelectItem key={consult} value={consult}>
                          {consult}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handlePlaceOrder} disabled={!selectedPatient || !orderType}>
                  Place Order
                </Button>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="text-lg font-medium mb-4">Consultation Status</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filterOrders(consultOrders, searchQuery).map(order => (
                      <TableRow key={order.id}>
                        <TableCell>{order.patient}</TableCell>
                        <TableCell>{order.type}</TableCell>
                        <TableCell>{renderStatusBadge(order.status)}</TableCell>
                      </TableRow>
                    ))}
                    {filterOrders(consultOrders, searchQuery).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                          No consult orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersTab;
