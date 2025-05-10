
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { patients } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock vitals data
const patientVitals = [
  {
    patientId: '1',
    timestamp: '2023-05-10T08:35:00',
    temperature: 37.2,
    heartRate: 92,
    bloodPressure: '140/90',
    respiratoryRate: 18,
    oxygenSaturation: 97,
    pain: 7,
    recordedBy: 'Nurse Sarah Johnson'
  },
  {
    patientId: '1',
    timestamp: '2023-05-10T09:35:00',
    temperature: 37.0,
    heartRate: 88,
    bloodPressure: '138/88',
    respiratoryRate: 16,
    oxygenSaturation: 98,
    pain: 5,
    recordedBy: 'Nurse Sarah Johnson'
  },
  {
    patientId: '2',
    timestamp: '2023-05-10T09:50:00',
    temperature: 38.1,
    heartRate: 104,
    bloodPressure: '130/85',
    respiratoryRate: 20,
    oxygenSaturation: 96,
    pain: 6,
    recordedBy: 'Nurse Sarah Johnson'
  },
  {
    patientId: '3',
    timestamp: '2023-05-10T07:30:00',
    temperature: 38.5,
    heartRate: 110,
    bloodPressure: '160/95',
    respiratoryRate: 24,
    oxygenSaturation: 88,
    pain: 4,
    recordedBy: 'Nurse Sarah Johnson'
  },
  {
    patientId: '3',
    timestamp: '2023-05-10T08:30:00',
    temperature: 38.3,
    heartRate: 108,
    bloodPressure: '155/92',
    respiratoryRate: 22,
    oxygenSaturation: 90,
    pain: 3,
    recordedBy: 'Nurse Sarah Johnson'
  },
  {
    patientId: '3',
    timestamp: '2023-05-10T09:30:00',
    temperature: 38.0,
    heartRate: 102,
    bloodPressure: '150/90',
    respiratoryRate: 20,
    oxygenSaturation: 92,
    pain: 2,
    recordedBy: 'Nurse Sarah Johnson'
  }
];

const NurseVitals = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form state for new vitals
  const [newVitals, setNewVitals] = useState({
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    pain: ''
  });

  // Filter patients assigned to current nurse
  const myPatients = patients.filter(patient => 
    patient.nurseAssigned === user?.name
  );

  // Get vitals for selected patient
  const selectedPatientVitals = patientVitals.filter(v => 
    v.patientId === selectedPatient
  ).sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const handleInputChange = (field: string, value: string) => {
    setNewVitals({
      ...newVitals,
      [field]: value
    });
  };

  const handleRecordVitals = () => {
    // Basic validation
    if (!selectedPatient || 
        !newVitals.temperature || 
        !newVitals.heartRate || 
        !newVitals.bloodPressure || 
        !newVitals.respiratoryRate || 
        !newVitals.oxygenSaturation || 
        !newVitals.pain) {
      toast({
        title: "Error",
        description: "Please fill in all vital signs",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Vitals Recorded",
      description: `Vital signs recorded for ${patients.find(p => p.id === selectedPatient)?.name}`,
    });
    
    // Reset form and close dialog
    setNewVitals({
      temperature: '',
      heartRate: '',
      bloodPressure: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      pain: ''
    });
    setDialogOpen(false);
  };

  // Format timestamp to readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  // Function to determine if vital sign is in concerning range
  const isVitalConcerning = (vital: string, value: number | string) => {
    switch (vital) {
      case 'temperature':
        return (value as number) > 38.0 || (value as number) < 36.0;
      case 'heartRate':
        return (value as number) > 100 || (value as number) < 60;
      case 'respiratoryRate':
        return (value as number) > 20 || (value as number) < 12;
      case 'oxygenSaturation':
        return (value as number) < 93;
      case 'pain':
        return (value as number) >= 7;
      case 'bloodPressure':
        // Parse systolic from "120/80" format
        const systolic = parseInt((value as string).split('/')[0], 10);
        return systolic > 140 || systolic < 90;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Vitals Monitoring</h2>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Record Vitals</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Record Patient Vitals</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Patient</label>
                  <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {myPatients.map(patient => (
                        <SelectItem key={patient.id} value={patient.id}>
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Temperature (°C)</label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="37.0"
                      value={newVitals.temperature}
                      onChange={(e) => handleInputChange('temperature', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Heart Rate (BPM)</label>
                    <Input
                      type="number"
                      placeholder="80"
                      value={newVitals.heartRate}
                      onChange={(e) => handleInputChange('heartRate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Blood Pressure (mmHg)</label>
                    <Input
                      placeholder="120/80"
                      value={newVitals.bloodPressure}
                      onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Respiratory Rate</label>
                    <Input
                      type="number"
                      placeholder="16"
                      value={newVitals.respiratoryRate}
                      onChange={(e) => handleInputChange('respiratoryRate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">O2 Saturation (%)</label>
                    <Input
                      type="number"
                      placeholder="98"
                      value={newVitals.oxygenSaturation}
                      onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Pain (0-10)</label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      placeholder="0"
                      value={newVitals.pain}
                      onChange={(e) => handleInputChange('pain', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleRecordVitals}>
                    Save Vitals
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <label className="text-sm font-medium">Select Patient</label>
        <Select value={selectedPatient} onValueChange={setSelectedPatient}>
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Select Patient" />
          </SelectTrigger>
          <SelectContent>
            {myPatients.map(patient => (
              <SelectItem key={patient.id} value={patient.id}>
                {patient.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedPatient ? (
        <Card>
          <CardHeader>
            <CardTitle>
              Vitals for {patients.find(p => p.id === selectedPatient)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPatientVitals.length > 0 ? (
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="py-2 px-3">Time</th>
                        <th className="py-2 px-3">Temp (°C)</th>
                        <th className="py-2 px-3">HR (BPM)</th>
                        <th className="py-2 px-3">BP (mmHg)</th>
                        <th className="py-2 px-3">RR</th>
                        <th className="py-2 px-3">SpO2 (%)</th>
                        <th className="py-2 px-3">Pain</th>
                        <th className="py-2 px-3">Recorded By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPatientVitals.map((vital, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-3 px-3">{formatTime(vital.timestamp)}</td>
                          <td className={`py-3 px-3 ${isVitalConcerning('temperature', vital.temperature) ? 'text-medical-red font-medium' : ''}`}>
                            {vital.temperature}
                          </td>
                          <td className={`py-3 px-3 ${isVitalConcerning('heartRate', vital.heartRate) ? 'text-medical-red font-medium' : ''}`}>
                            {vital.heartRate}
                          </td>
                          <td className={`py-3 px-3 ${isVitalConcerning('bloodPressure', vital.bloodPressure) ? 'text-medical-red font-medium' : ''}`}>
                            {vital.bloodPressure}
                          </td>
                          <td className={`py-3 px-3 ${isVitalConcerning('respiratoryRate', vital.respiratoryRate) ? 'text-medical-red font-medium' : ''}`}>
                            {vital.respiratoryRate}
                          </td>
                          <td className={`py-3 px-3 ${isVitalConcerning('oxygenSaturation', vital.oxygenSaturation) ? 'text-medical-red font-medium' : ''}`}>
                            {vital.oxygenSaturation}
                          </td>
                          <td className={`py-3 px-3 ${isVitalConcerning('pain', vital.pain) ? 'text-medical-red font-medium' : ''}`}>
                            {vital.pain}/10
                          </td>
                          <td className="py-3 px-3">{vital.recordedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <Button variant="outline">View Trend Graph</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No vitals recorded for this patient
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-12 text-muted-foreground">
            Please select a patient to view their vital signs
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NurseVitals;
