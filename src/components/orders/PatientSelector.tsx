
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Search } from 'lucide-react';
import { patients } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

interface Patient {
  id: string;
  name: string;
  mrn: string;
}

interface PatientSelectorProps {
  selectedPatient: Patient | null;
  onPatientSelect: (patient: Patient | null) => void;
  selectedPatientId: string;
  onPatientIdChange: (id: string) => void;
  myPatients?: Patient[];
}

const PatientSelector = ({ 
  selectedPatient, 
  onPatientSelect, 
  selectedPatientId, 
  onPatientIdChange,
  myPatients = []
}: PatientSelectorProps) => {
  const [patientSearchQuery, setPatientSearchQuery] = useState<string>('');
  const [patientSearchResults, setPatientSearchResults] = useState<typeof patients>([]);
  const { user } = useAuth();
  
  // Get patients assigned to the logged in user if myPatients not provided
  const assignedPatients = myPatients.length > 0 ? myPatients : 
    user?.role === 'doctor' 
      ? patients.filter(p => p.attendingPhysician === user?.name).map(p => ({
          id: p.id,
          name: p.name,
          mrn: p.mrn
        }))
      : patients.filter(p => p.nurseAssigned === user?.name).map(p => ({
          id: p.id,
          name: p.name,
          mrn: p.mrn
        }));
  
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
  
  // Effect to update selected patient when dropdown changes
  useEffect(() => {
    if (selectedPatientId) {
      const patient = patients.find(p => p.id === selectedPatientId);
      if (patient) {
        onPatientSelect({
          id: patient.id,
          name: patient.name,
          mrn: patient.mrn
        });
        // Clear search when selecting from dropdown
        setPatientSearchQuery('');
      }
    }
  }, [selectedPatientId, onPatientSelect]);

  // Handle patient selection from search
  const handlePatientSelect = (patient: typeof patients[0]) => {
    onPatientSelect({
      id: patient.id,
      name: patient.name,
      mrn: patient.mrn
    });
    onPatientIdChange(patient.id);
    setPatientSearchQuery('');
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">My Patients</label>
          <Select value={selectedPatientId} onValueChange={onPatientIdChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              {assignedPatients.length > 0 ? (
                assignedPatients.map(patient => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name} ({patient.mrn})
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="no-patients" disabled>
                  No assigned patients found
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
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
        <div className="bg-blue-50 p-3 rounded-md flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Patient Selected:</span>
            <h3 className="font-medium">{selectedPatient.name} ({selectedPatient.mrn})</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              onPatientSelect(null);
              onPatientIdChange('');
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PatientSelector;
