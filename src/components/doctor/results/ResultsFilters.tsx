
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { patients } from '@/data/mockData';

interface ResultsFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPatient: string;
  setSelectedPatient: (patient: string) => void;
  orderTypeFilter: string;
  setOrderTypeFilter: (type: string) => void;
  timeFilter: string;
  setTimeFilter: (time: string) => void;
}

const ResultsFilters = ({
  searchQuery,
  setSearchQuery,
  selectedPatient,
  setSelectedPatient,
  orderTypeFilter,
  setOrderTypeFilter,
  timeFilter,
  setTimeFilter
}: ResultsFiltersProps) => {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search results..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Select value={selectedPatient} onValueChange={setSelectedPatient}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="All Patients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              {patients.map(patient => (
                <SelectItem key={patient.id} value={patient.mrn}>
                  {patient.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={orderTypeFilter} onValueChange={setOrderTypeFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Lab">Labs</SelectItem>
              <SelectItem value="Imaging">Imaging</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-full md:w-[120px]">
              <SelectValue placeholder="Any Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Time</SelectItem>
              <SelectItem value="4h">Last 4 hours</SelectItem>
              <SelectItem value="12h">Last 12 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="48h">Last 48 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsFilters;
