
import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import NursePatientList from '@/components/nurse/NursePatientList';
import NurseTrackBoard from '@/components/nurse/NurseTrackBoard';
import NurseTasks from '@/components/nurse/NurseTasks';
import NurseVitals from '@/components/nurse/NurseVitals';
import { patients } from '@/data/mockData';

const NurseDashboardContent = () => {
  const location = useLocation();
  let content;
  let activeTab;

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const patientId = queryParams.get('patientId');

  switch (location.pathname) {
    case '/nurse-dashboard/track-board':
      content = <NurseTrackBoard />;
      activeTab = 'track board';
      break;
    case '/nurse-dashboard/tasks':
      content = <NurseTasks initialPatientId={patientId || ''} />;
      activeTab = 'tasks';
      break;
    case '/nurse-dashboard/vitals':
      content = <NurseVitals />;
      activeTab = 'vitals';
      break;
    default:
      content = <NursePatientList />;
      activeTab = 'patients';
  }
  
  useEffect(() => {
    // Log the active route for debugging
    console.log('Nurse active route:', location.pathname);
    console.log('Nurse active tab:', activeTab);
    
    if (patientId) {
      const selectedPatient = patients.find(p => p.id === patientId);
      if (selectedPatient) {
        console.log('Displaying details for patient:', selectedPatient.name);
      } else {
        console.log('Patient not found for ID:', patientId);
      }
    }
  }, [location.pathname, activeTab, patientId]);
  
  return (
    <DashboardLayout activeTab={activeTab} role="nurse">
      {content}
    </DashboardLayout>
  );
};

const NurseDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<NurseDashboardContent />} />
      <Route path="/track-board" element={<NurseDashboardContent />} />
      <Route path="/tasks" element={<NurseDashboardContent />} />
      <Route path="/vitals" element={<NurseDashboardContent />} />
      <Route path="*" element={<Navigate to="/nurse-dashboard" replace />} />
    </Routes>
  );
};

export default NurseDashboard;
