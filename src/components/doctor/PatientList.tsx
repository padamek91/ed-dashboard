
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patients, Patient } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PatientList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyMyPatients, setShowOnlyMyPatients] = useState(false);
  
  // Filter patients based on search and toggle
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      patient.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (showOnlyMyPatients) {
      return matchesSearch && patient.attendingPhysician === user?.name;
    }
    
    return matchesSearch;
  });

  // Function to determine if patient is assigned to current user
  const isPatientAssignedToMe = (patient: Patient) => {
    return patient.attendingPhysician === user?.name;
  };

  // Function to format arrival time to a readable string
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  // Helper function to render acuity level with appropriate styling
  const renderAcuityLevel = (level: number) => {
    let bgColor = '';
    switch(level) {
      case 1: bgColor = 'bg-red-500'; break;
      case 2: bgColor = 'bg-orange-500'; break;
      case 3: bgColor = 'bg-yellow-500'; break;
      case 4: bgColor = 'bg-green-500'; break;
      case 5: bgColor = 'bg-blue-500'; break;
    }
    return (
      <div className={`${bgColor} text-white text-center py-1 px-2 rounded-md w-16`}>
        ESI {level}
      </div>
    );
  };

  // Function to handle navigation to orders tab with selected patient
  const handleOrdersNavigation = (patientId: string, orderType: string) => {
    navigate(`/doctor-dashboard/orders?patient=${patientId}&tab=${orderType.toLowerCase()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold">Patient List</h2>
          <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
            {filteredPatients.length} Patients
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="myPatients"
              checked={showOnlyMyPatients}
              onCheckedChange={setShowOnlyMyPatients}
            />
            <Label htmlFor="myPatients">My patients only</Label>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]">Act</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[180px]">Patient Name</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">Age / DOB</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[60px]">Sex</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">MRN</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px]">Chief Complaint</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]">Arrival</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">Time in ED</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]">Acuity</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]">Location</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">MD</th>
                  <th className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">RN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.map((patient, idx) => (
                  <tr 
                    key={patient.id}
                    className={`
                      ${isPatientAssignedToMe(patient) ? 'bg-blue-50' : idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      hover:bg-blue-50 transition-colors duration-150
                    `}
                  >
                    <td className="px-3 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="sm" variant="outline" className="h-7 px-2 py-0">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleOrdersNavigation(patient.id, 'Lab')}>
                            Labs
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOrdersNavigation(patient.id, 'Medication')}>
                            Medications
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOrdersNavigation(patient.id, 'Imaging')}>
                            Imaging
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOrdersNavigation(patient.id, 'Consult')}>
                            Consults
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="px-3 py-4 font-medium text-base whitespace-nowrap">{patient.name}</td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap">{patient.age} / {patient.dateOfBirth}</td>
                    <td className="px-3 py-4 text-sm">{patient.sex}</td>
                    <td className="px-3 py-4 text-sm">{patient.mrn}</td>
                    <td className="px-3 py-4 text-sm">{patient.chiefComplaint}</td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap">{formatTime(patient.arrivalTime)}</td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap">{patient.timeInED}</td>
                    <td className="px-3 py-4 text-sm">{renderAcuityLevel(patient.triageLevel)}</td>
                    <td className="px-3 py-4 text-sm">{patient.location}</td>
                    <td className="px-3 py-4 text-sm">
                      {patient.attendingPhysician === user?.name ? (
                        <span className="font-medium">{patient.attendingPhysician}</span>
                      ) : (
                        patient.attendingPhysician
                      )}
                    </td>
                    <td className="px-3 py-4 text-sm">{patient.nurseAssigned}</td>
                  </tr>
                ))}
                
                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan={12} className="text-center py-8 text-muted-foreground">
                      No patients found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientList;
