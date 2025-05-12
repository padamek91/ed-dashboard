
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface ResultsFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedPatient: string;
  setSelectedPatient: (value: string) => void;
  orderTypeFilter: string;
  setOrderTypeFilter: (value: string) => void;
  timeFilter: string;
  setTimeFilter: (value: string) => void;
  myPatientsOnly: boolean;
  setMyPatientsOnly: (value: boolean) => void;
}

const ResultsFilters = ({
  searchQuery,
  setSearchQuery,
  orderTypeFilter,
  setOrderTypeFilter,
  timeFilter,
  setTimeFilter,
  myPatientsOnly,
  setMyPatientsOnly
}: ResultsFiltersProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <Label htmlFor="patient-search" className="mb-2">Search Patient</Label>
        <Input
          id="patient-search"
          placeholder="Search by patient name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="order-type" className="mb-2">Order Type</Label>
        <Select value={orderTypeFilter} onValueChange={setOrderTypeFilter}>
          <SelectTrigger id="order-type">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="lab">Lab</SelectItem>
            <SelectItem value="imaging">Imaging</SelectItem>
            <SelectItem value="procedure">Procedure</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="time-filter" className="mb-2">Time Period</Label>
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger id="time-filter">
            <SelectValue placeholder="Any Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Time</SelectItem>
            <SelectItem value="4h">Last 4 Hours</SelectItem>
            <SelectItem value="12h">Last 12 Hours</SelectItem>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="48h">Last 48 Hours</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-end">
        <div className="flex items-center space-x-2">
          <Switch 
            id="my-patients" 
            checked={myPatientsOnly} 
            onCheckedChange={setMyPatientsOnly}
          />
          <Label htmlFor="my-patients">My Patients Only</Label>
        </div>
      </div>
    </div>
  );
};

export default ResultsFilters;
