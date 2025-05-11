
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PatientSelector from "@/components/orders/PatientSelector";

interface TasksFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  selectedPatient: {id: string; name: string; mrn: string} | null;
  setSelectedPatient: (patient: {id: string; name: string; mrn: string} | null) => void;
  selectedPatientId: string;
  setSelectedPatientId: (id: string) => void;
}

const TasksFilter = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  selectedPatient,
  setSelectedPatient,
  selectedPatientId,
  setSelectedPatientId
}: TasksFilterProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="col-span-1">
        <PatientSelector 
          selectedPatient={selectedPatient}
          onPatientSelect={setSelectedPatient}
          selectedPatientId={selectedPatientId}
          onPatientIdChange={setSelectedPatientId}
        />
      </div>
      <div className="col-span-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients or tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="col-span-1">
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
