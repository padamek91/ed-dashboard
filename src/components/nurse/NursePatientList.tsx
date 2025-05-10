
import { useState } from 'react';
import { patients, Patient } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Search, User } from 'lucide-react';

const NursePatientList = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyMyPatients, setShowOnlyMyPatients] = useState(false);
  
  // Filter patients based on search and toggle
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      patient.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (showOnlyMyPatients) {
      return matchesSearch && patient.nurseAssigned === user?.name;
    }
    
    return matchesSearch;
  });

  // Function to determine if patient is assigned to current user
  const isPatientAssignedToMe = (patient: Patient) => {
    return patient.nurseAssigned === user?.name;
  };

  // Function to format arrival time to a readable string
  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  // Helper function to render acuity level with appropriate styling
  const renderAcuityLevel = (level: number) => {
    return <div className={`acuity-${level}`}>ESI {level}</div>;
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
            <table className="ehr-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Age / DOB</th>
                  <th>Sex</th>
                  <th>MRN</th>
                  <th>Chief Complaint</th>
                  <th>Arrival Time</th>
                  <th>Time in ED</th>
                  <th>Acuity</th>
                  <th>Location</th>
                  <th>Physician</th>
                  <th>Nurse</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr 
                    key={patient.id}
                    className={isPatientAssignedToMe(patient) ? 'assigned' : ''}
                  >
                    <td className="font-medium">{patient.name}</td>
                    <td>{patient.age} / {patient.dateOfBirth}</td>
                    <td>{patient.sex}</td>
                    <td>{patient.mrn}</td>
                    <td>{patient.chiefComplaint}</td>
                    <td>{formatTime(patient.arrivalTime)}</td>
                    <td>{patient.timeInED}</td>
                    <td>{renderAcuityLevel(patient.triageLevel)}</td>
                    <td>{patient.location}</td>
                    <td>{patient.attendingPhysician}</td>
                    <td>
                      {patient.nurseAssigned === user?.name ? (
                        <span className="font-medium">{patient.nurseAssigned}</span>
                      ) : (
                        patient.nurseAssigned
                      )}
                    </td>
                    <td>
                      <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                        <User className="h-4 w-4" />
                        <span className="sr-only">Patient Details</span>
                      </Button>
                    </td>
                  </tr>
                ))}
                
                {filteredPatients.length === 0 && (
                  <tr>
                    <td colSpan={12} className="text-center py-6 text-muted-foreground">
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

export default NursePatientList;
