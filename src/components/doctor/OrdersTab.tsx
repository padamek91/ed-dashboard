
import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Search, X, Plus, Check, ClipboardList } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import { patients, orders } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

// Updated list of lab tests
const labTests = [
  "Complete Blood Count (CBC) with Differential",
  "Basic Metabolic Panel (BMP)",
  "Comprehensive Metabolic Panel (CMP)",
  "Urinalysis (UA), Automated",
  "Urine Drug Screen (UDS), Qualitative",
  "Lipid Panel",
  "Liver Function Tests (LFTs)",
  "Cardiac Enzymes Panel (Troponin, CK-MB, etc.)",
  "Coagulation Panel (PT, PTT, INR)",
  "Sepsis Workup Panel (CBC, Lactate, Blood Cultures, Procalcitonin)",
  "Electrolyte Panel",
  "Iron Studies Panel",
  "Thyroid Panel (TSH, Free T4 ± T3)",
  "Hepatitis Panel (A, B, C Antibodies and Antigens)",
  "Respiratory Viral Panel (RVP) – PCR",
  "COVID-19 PCR Panel",
  "Inflammatory Markers Panel (CRP, ESR, Procalcitonin)",
  "Troponin I or T",
  "Lactate",
  "C-Reactive Protein (CRP)",
  "Erythrocyte Sedimentation Rate (ESR)",
  "Blood Culture (x2)",
  "Urine Culture",
  "HCG (Qualitative and Quantitative)",
  "Glucose (Serum)",
  "Hemoglobin A1c",
  "Magnesium",
  "Phosphate (PO4)",
  "Calcium (Total and Ionized)",
  "Albumin",
  "Ammonia",
  "Lipase",
  "Amylase",
  "B-type Natriuretic Peptide (BNP) or NT-proBNP",
  "Prothrombin Time (PT) / International Normalized Ratio (INR)",
  "Partial Thromboplastin Time (PTT)",
  "D-dimer",
  "Type and Screen / Crossmatch",
  "HIV Antibody/Antigen (4th Generation)",
  "Vitamin B12 and Folate"
];

// Mock orders data
const labOrders = [
  { id: '1', patient: 'John Smith', mrn: 'MRN12345', type: 'Complete Blood Count', status: 'on order', timestamp: '2023-05-11 08:30' },
  { id: '2', patient: 'Sarah Jones', mrn: 'MRN23456', type: 'Comprehensive Metabolic Panel', status: 'acknowledged by Dr. Johnson', timestamp: '2023-05-11 09:15' },
  { id: '3', patient: 'Mike Williams', mrn: 'MRN34567', type: 'Urinalysis', status: 'collected', timestamp: '2023-05-11 10:00' },
  { id: '4', patient: 'Lisa Brown', mrn: 'MRN45678', type: 'Troponin', status: 'in process', timestamp: '2023-05-11 07:45' },
  { id: '5', patient: 'David Miller', mrn: 'MRN56789', type: 'D-Dimer', status: 'resulted', timestamp: '2023-05-11 06:30' },
];

const medicationOrders = [
  { id: '1', patient: 'John Smith', mrn: 'MRN12345', type: 'Acetaminophen 500mg', status: 'ordered' },
  { id: '2', patient: 'Sarah Jones', mrn: 'MRN23456', type: 'Lorazepam 1mg', status: 'administered' },
  { id: '3', patient: 'Mike Williams', mrn: 'MRN34567', type: 'Ceftriaxone 1g', status: 'ordered' },
];

const imagingOrders = [
  { id: '1', patient: 'John Smith', mrn: 'MRN12345', type: 'Chest X-Ray', status: 'ordered' },
  { id: '2', patient: 'Sarah Jones', mrn: 'MRN23456', type: 'CT Head', status: 'in process' },
  { id: '3', patient: 'Lisa Brown', mrn: 'MRN45678', type: 'Ultrasound Abdomen', status: 'resulted' },
];

const consultOrders = [
  { id: '1', patient: 'John Smith', mrn: 'MRN12345', type: 'Cardiology', status: 'ordered' },
  { id: '2', patient: 'Mike Williams', mrn: 'MRN34567', type: 'Neurology', status: 'consult in progress' },
  { id: '3', patient: 'David Miller', mrn: 'MRN56789', type: 'Orthopedics', status: 'completed' },
];

// Common orders by category
const commonOrders = {
  Lab: labTests,
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
  // Current user context
  const { user } = useAuth();
  
  // Get patients assigned to the logged in doctor
  const myPatients = patients.filter(p => p.attendingPhysician === user?.name);
  
  // State
  const [mainTab, setMainTab] = useState<string>('Lab');
  const [labTab, setLabTab] = useState<string>('entry');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedPatient, setSelectedPatient] = useState<{id: string; name: string; mrn: string} | null>(null);
  const [patientSearchQuery, setPatientSearchQuery] = useState<string>('');
  const [patientSearchResults, setPatientSearchResults] = useState<typeof patients>([]);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [testSearchQuery, setTestSearchQuery] = useState<string>('');
  const [testSearchResults, setTestSearchResults] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Effect to filter patients based on search
  useEffect(() => {
    if (patientSearchQuery) {
      const filtered = patients.filter(p => 
        p.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) || 
        p.mrn.toLowerCase().includes(patientSearchQuery.toLowerCase())
      );
      setPatientSearchResults(filtered);
    } else {
      setPatientSearchResults([]);
    }
  }, [patientSearchQuery]);
  
  // Effect to filter tests based on search
  useEffect(() => {
    if (testSearchQuery) {
      const filtered = labTests.filter(test => 
        test.toLowerCase().includes(testSearchQuery.toLowerCase())
      );
      setTestSearchResults(filtered);
    } else {
      setTestSearchResults([]);
    }
  }, [testSearchQuery]);
  
  // Effect to update selected patient when dropdown changes
  useEffect(() => {
    if (selectedPatientId) {
      const patient = patients.find(p => p.id === selectedPatientId);
      if (patient) {
        setSelectedPatient({
          id: patient.id,
          name: patient.name,
          mrn: patient.mrn
        });
        // Clear search when selecting from dropdown
        setPatientSearchQuery('');
      }
    }
  }, [selectedPatientId]);

  // Handle patient selection from search
  const handlePatientSelect = (patient: typeof patients[0]) => {
    setSelectedPatient({
      id: patient.id,
      name: patient.name,
      mrn: patient.mrn
    });
    setSelectedPatientId(patient.id);
    setPatientSearchQuery('');
  };

  // Handle test selection
  const handleTestSelect = (test: string) => {
    if (!selectedTests.includes(test)) {
      setSelectedTests([...selectedTests, test]);
    }
    setTestSearchQuery('');
  };

  // Handle test removal
  const handleRemoveTest = (test: string) => {
    setSelectedTests(selectedTests.filter(t => t !== test));
  };

  // Handle order submission
  const handleSubmitOrders = () => {
    if (!selectedPatient || selectedTests.length === 0) {
      toast({
        title: "Error",
        description: "Please select a patient and at least one test",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Orders Submitted",
      description: `${selectedTests.length} order(s) placed for ${selectedPatient.name}`,
    });

    // In a real app, we would save these to the database
    console.log("Orders submitted:", {
      patient: selectedPatient,
      tests: selectedTests,
      timestamp: new Date().toISOString()
    });

    // Clear selected tests after submission
    setSelectedTests([]);
    setLabTab('status');
  };

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

  // Filter orders based on selected patient
  const filterOrdersByPatient = (orders: any[], patientInfo: {name: string, mrn: string} | null) => {
    if (!patientInfo) return [];
    
    return orders.filter(order => 
      order.patient === patientInfo.name || 
      order.mrn === patientInfo.mrn
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">My Patients</label>
                  <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {myPatients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} ({patient.mrn})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-[2] relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Search</label>
                  <div className="relative">
                    <Input
                      placeholder="Search patients by name or MRN..."
                      value={patientSearchQuery}
                      onChange={(e) => setPatientSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    
                    {patientSearchResults.length > 0 && patientSearchQuery && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                        {patientSearchResults.map(patient => (
                          <div 
                            key={patient.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handlePatientSelect(patient)}
                          >
                            {patient.name} ({patient.mrn})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedPatient && (
                <div className="bg-blue-50 p-3 rounded-md mb-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Patient Selected:</span>
                    <h3 className="font-medium">{selectedPatient.name} ({selectedPatient.mrn})</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedPatient(null);
                      setSelectedPatientId('');
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <Tabs value={labTab} onValueChange={setLabTab} className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="entry">Order Entry</TabsTrigger>
                  <TabsTrigger value="status">Order Status</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>

                <TabsContent value="entry" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Search Tests</label>
                      <div className="relative">
                        <Input
                          placeholder="Type to search lab tests..."
                          value={testSearchQuery}
                          onChange={(e) => setTestSearchQuery(e.target.value)}
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
                              <h4 className="font-medium">Common Lab Tests</h4>
                              <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                                {labTests.slice(0, 10).map((test, i) => (
                                  <Button 
                                    key={i} 
                                    variant="outline" 
                                    className="justify-start h-auto py-2 px-3 text-left"
                                    onClick={() => handleTestSelect(test)}
                                  >
                                    {test}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                        
                        {testSearchResults.length > 0 && testSearchQuery && (
                          <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                            {testSearchResults.map((test, index) => (
                              <div 
                                key={index}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleTestSelect(test)}
                              >
                                {test}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {selectedTests.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Selected Tests:</h4>
                        <div className="space-y-2">
                          {selectedTests.map((test, index) => (
                            <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                              <span>{test}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleRemoveTest(test)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleSubmitOrders} 
                      disabled={!selectedPatient || selectedTests.length === 0}
                      className="mt-4"
                    >
                      Submit Order(s)
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
                      {selectedPatient
                        ? filterOrdersByPatient(labOrders.filter(o => !o.status.includes('resulted')), selectedPatient).map(order => (
                          <TableRow key={order.id}>
                            <TableCell>{order.patient}</TableCell>
                            <TableCell>{order.type}</TableCell>
                            <TableCell>{renderStatusBadge(order.status)}</TableCell>
                            <TableCell>{order.timestamp}</TableCell>
                          </TableRow>
                        ))
                        : labOrders.filter(o => !o.status.includes('resulted')).map(order => (
                          <TableRow key={order.id}>
                            <TableCell>{order.patient}</TableCell>
                            <TableCell>{order.type}</TableCell>
                            <TableCell>{renderStatusBadge(order.status)}</TableCell>
                            <TableCell>{order.timestamp}</TableCell>
                          </TableRow>
                        ))
                      }
                      {(selectedPatient 
                        ? filterOrdersByPatient(labOrders.filter(o => !o.status.includes('resulted')), selectedPatient).length === 0
                        : labOrders.filter(o => !o.status.includes('resulted')).length === 0
                      ) && (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                            No orders in progress
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
                      {selectedPatient
                        ? filterOrdersByPatient(labOrders.filter(o => o.status.includes('resulted')), selectedPatient).map(order => (
                          <TableRow key={order.id}>
                            <TableCell>{order.patient}</TableCell>
                            <TableCell>{order.type}</TableCell>
                            <TableCell>{renderStatusBadge(order.status)}</TableCell>
                            <TableCell>{order.timestamp}</TableCell>
                          </TableRow>
                        ))
                        : labOrders.filter(o => o.status.includes('resulted')).map(order => (
                          <TableRow key={order.id}>
                            <TableCell>{order.patient}</TableCell>
                            <TableCell>{order.type}</TableCell>
                            <TableCell>{renderStatusBadge(order.status)}</TableCell>
                            <TableCell>{order.timestamp}</TableCell>
                          </TableRow>
                        ))
                      }
                      {(selectedPatient 
                        ? filterOrdersByPatient(labOrders.filter(o => o.status.includes('resulted')), selectedPatient).length === 0
                        : labOrders.filter(o => o.status.includes('resulted')).length === 0
                      ) && (
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">My Patients</label>
                  <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {myPatients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} ({patient.mrn})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-[2] relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Search</label>
                  <div className="relative">
                    <Input
                      placeholder="Search patients by name or MRN..."
                      value={patientSearchQuery}
                      onChange={(e) => setPatientSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    
                    {patientSearchResults.length > 0 && patientSearchQuery && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                        {patientSearchResults.map(patient => (
                          <div 
                            key={patient.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handlePatientSelect(patient)}
                          >
                            {patient.name} ({patient.mrn})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedPatient && (
                <div className="bg-blue-50 p-3 rounded-md mb-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Patient Selected:</span>
                    <h3 className="font-medium">{selectedPatient.name} ({selectedPatient.mrn})</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedPatient(null);
                      setSelectedPatientId('');
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

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
                    {selectedPatient 
                      ? filterOrdersByPatient(medicationOrders, selectedPatient).map(order => (
                        <TableRow key={order.id}>
                          <TableCell>{order.patient}</TableCell>
                          <TableCell>{order.type}</TableCell>
                          <TableCell>{renderStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))
                      : medicationOrders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell>{order.patient}</TableCell>
                          <TableCell>{order.type}</TableCell>
                          <TableCell>{renderStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))
                    }
                    {(selectedPatient 
                      ? filterOrdersByPatient(medicationOrders, selectedPatient).length === 0
                      : medicationOrders.length === 0
                    ) && (
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">My Patients</label>
                  <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {myPatients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} ({patient.mrn})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-[2] relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Search</label>
                  <div className="relative">
                    <Input
                      placeholder="Search patients by name or MRN..."
                      value={patientSearchQuery}
                      onChange={(e) => setPatientSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    
                    {patientSearchResults.length > 0 && patientSearchQuery && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                        {patientSearchResults.map(patient => (
                          <div 
                            key={patient.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handlePatientSelect(patient)}
                          >
                            {patient.name} ({patient.mrn})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedPatient && (
                <div className="bg-blue-50 p-3 rounded-md mb-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Patient Selected:</span>
                    <h3 className="font-medium">{selectedPatient.name} ({selectedPatient.mrn})</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedPatient(null);
                      setSelectedPatientId('');
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

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
                    {selectedPatient 
                      ? filterOrdersByPatient(imagingOrders, selectedPatient).map(order => (
                        <TableRow key={order.id}>
                          <TableCell>{order.patient}</TableCell>
                          <TableCell>{order.type}</TableCell>
                          <TableCell>{renderStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))
                      : imagingOrders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell>{order.patient}</TableCell>
                          <TableCell>{order.type}</TableCell>
                          <TableCell>{renderStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))
                    }
                    {(selectedPatient 
                      ? filterOrdersByPatient(imagingOrders, selectedPatient).length === 0
                      : imagingOrders.length === 0
                    ) && (
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">My Patients</label>
                  <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {myPatients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name} ({patient.mrn})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-[2] relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Search</label>
                  <div className="relative">
                    <Input
                      placeholder="Search patients by name or MRN..."
                      value={patientSearchQuery}
                      onChange={(e) => setPatientSearchQuery(e.target.value)}
                      className="pr-10"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-0 top-0 h-full"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    
                    {patientSearchResults.length > 0 && patientSearchQuery && (
                      <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                        {patientSearchResults.map(patient => (
                          <div 
                            key={patient.id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handlePatientSelect(patient)}
                          >
                            {patient.name} ({patient.mrn})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {selectedPatient && (
                <div className="bg-blue-50 p-3 rounded-md mb-4 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-500">Patient Selected:</span>
                    <h3 className="font-medium">{selectedPatient.name} ({selectedPatient.mrn})</h3>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedPatient(null);
                      setSelectedPatientId('');
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

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
                    {selectedPatient 
                      ? filterOrdersByPatient(consultOrders, selectedPatient).map(order => (
                        <TableRow key={order.id}>
                          <TableCell>{order.patient}</TableCell>
                          <TableCell>{order.type}</TableCell>
                          <TableCell>{renderStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))
                      : consultOrders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell>{order.patient}</TableCell>
                          <TableCell>{order.type}</TableCell>
                          <TableCell>{renderStatusBadge(order.status)}</TableCell>
                        </TableRow>
                      ))
                    }
                    {(selectedPatient 
                      ? filterOrdersByPatient(consultOrders, selectedPatient).length === 0
                      : consultOrders.length === 0
                    ) && (
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
