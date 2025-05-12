
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PatientSelector from "@/components/orders/PatientSelector";
import { useAuth } from "@/contexts/AuthContext";
import { patients } from "@/data/mockData";

interface TasksFilterProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  selectedPatient: {id: string; name: string; mrn: string} | null;
  setSelectedPatient: (patient: {id: string; name: string; mrn: string} | null) => void;
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
}

const TasksFilter = ({
  statusFilter,
  setStatusFilter,
  selectedPatient,
  setSelectedPatient,
  selectedPatientId,
  setSelectedPatientId
}: TasksFilterProps) => {
  const { user } = useAuth();
  
  // Get list of patients assigned to the current nurse
  const myPatients = patients.filter(p => p.nurseAssigned === user?.name).map(p => ({
    id: p.id,
    name: p.name,
    mrn: p.mrn
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 items-center">
      <div className="w-full">
        <PatientSelector 
          selectedPatient={selectedPatient}
          onPatientSelect={setSelectedPatient}
          selectedPatientId={selectedPatientId}
          onPatientIdChange={setSelectedPatientId}
          myPatients={myPatients}
        />
      </div>
      
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TasksFilter;
