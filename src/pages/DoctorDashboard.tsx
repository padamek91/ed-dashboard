
import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import PatientList from '@/components/doctor/PatientList';
import TrackBoard from '@/components/doctor/TrackBoard';
import OrdersTab from '@/components/doctor/OrdersTab';
import ResultsTab from '@/components/doctor/ResultsTab';
import NotesTab from '@/components/doctor/NotesTab';

const DoctorDashboardContent = ({ activeTab }: { activeTab: string }) => {
  const location = useLocation();
  let content;

  switch (location.pathname) {
    case '/doctor-dashboard/track-board':
      content = <TrackBoard />;
      break;
    case '/doctor-dashboard/orders':
      content = <OrdersTab />;
      break;
    case '/doctor-dashboard/results':
      content = <ResultsTab />;
      break;
    case '/doctor-dashboard/notes':
      content = <NotesTab />;
      break;
    default:
      content = <PatientList />;
  }

  return (
    <DashboardLayout activeTab={activeTab} role="doctor">
      {content}
    </DashboardLayout>
  );
};

const DoctorDashboard = () => {
  const location = useLocation();
  
  // Determine activeTab based on current path
  const getActiveTabFromPath = (path: string) => {
    if (path.includes('/track-board')) return 'track board';
    if (path.includes('/orders')) return 'orders';
    if (path.includes('/results')) return 'results';
    if (path.includes('/notes')) return 'notes';
    return 'patients';
  };
  
  const activeTab = getActiveTabFromPath(location.pathname);
  
  return (
    <Routes>
      <Route path="/" element={<DoctorDashboardContent activeTab="patients" />} />
      <Route path="/track-board" element={<DoctorDashboardContent activeTab="track board" />} />
      <Route path="/orders" element={<DoctorDashboardContent activeTab="orders" />} />
      <Route path="/results" element={<DoctorDashboardContent activeTab="results" />} />
      <Route path="/notes" element={<DoctorDashboardContent activeTab="notes" />} />
      <Route path="*" element={<Navigate to="/doctor-dashboard" replace />} />
    </Routes>
  );
};

export default DoctorDashboard;
