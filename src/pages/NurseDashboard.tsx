
import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import NursePatientList from '@/components/nurse/NursePatientList';
import NurseTrackBoard from '@/components/nurse/NurseTrackBoard';
import NurseTasks from '@/components/nurse/NurseTasks';
import NurseVitals from '@/components/nurse/NurseVitals';

const NurseDashboardContent = ({ activeTab }: { activeTab: string }) => {
  const location = useLocation();
  let content;

  switch (location.pathname) {
    case '/nurse-dashboard/track-board':
      content = <NurseTrackBoard />;
      break;
    case '/nurse-dashboard/tasks':
      content = <NurseTasks />;
      break;
    case '/nurse-dashboard/vitals':
      content = <NurseVitals />;
      break;
    default:
      content = <NursePatientList />;
  }

  return (
    <DashboardLayout activeTab={activeTab} role="nurse">
      {content}
    </DashboardLayout>
  );
};

const NurseDashboard = () => {
  const location = useLocation();
  
  // Determine activeTab based on current path
  const getActiveTabFromPath = (path: string) => {
    if (path.includes('/track-board')) return 'track board';
    if (path.includes('/tasks')) return 'tasks';
    if (path.includes('/vitals')) return 'vitals';
    return 'patients';
  };
  
  const activeTab = getActiveTabFromPath(location.pathname);
  
  return (
    <Routes>
      <Route path="/" element={<NurseDashboardContent activeTab="patients" />} />
      <Route path="/track-board" element={<NurseDashboardContent activeTab="track board" />} />
      <Route path="/tasks" element={<NurseDashboardContent activeTab="tasks" />} />
      <Route path="/vitals" element={<NurseDashboardContent activeTab="vitals" />} />
      <Route path="*" element={<Navigate to="/nurse-dashboard" replace />} />
    </Routes>
  );
};

export default NurseDashboard;
