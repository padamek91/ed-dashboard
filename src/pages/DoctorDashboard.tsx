import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import PatientList from '@/components/doctor/PatientList';
import TrackBoard from '@/components/doctor/TrackBoard';
import OrdersTab from '@/components/doctor/OrdersTab';
import ResultsTab from '@/components/doctor/ResultsTab';
import NotesTab from '@/components/doctor/NotesTab';

const DoctorDashboardContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMainTab, setActiveMainTab] = useState('');
  let content;
  let activeTab;

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const resultId = queryParams.get('id');
  const patientId = queryParams.get('patient');
  const orderTab = queryParams.get('tab');

  switch (location.pathname) {
    case '/doctor-dashboard/track-board':
      content = <TrackBoard />;
      activeTab = 'track board';
      break;
    case '/doctor-dashboard/orders':
      content = <OrdersTab initialTab={orderTab || ''} patientId={patientId || ''} />;
      activeTab = 'orders';
      break;
    case '/doctor-dashboard/results':
      content = <ResultsTab />;
      activeTab = 'results';
      break;
    case '/doctor-dashboard/notes':
      content = <NotesTab />;
      activeTab = 'notes';
      break;
    default:
      content = <PatientList />;
      activeTab = 'patients';
  }

  useEffect(() => {
    // Log the active route for debugging
    console.log('Active route:', location.pathname);
    console.log('Active tab:', activeTab);
    
    // If we have a patient ID, log it
    if (patientId) {
      console.log('Selected patient ID:', patientId);
    }
    
    // If we have an order tab, log it and update state
    if (orderTab) {
      console.log('Selected order tab:', orderTab);
      setActiveMainTab(orderTab);
    }
    
    // If we have a result ID, we could handle special display logic here
    if (resultId) {
      console.log('Displaying result details for ID:', resultId);
      // ResultsTab component will handle the display of the specific result
    }
  }, [location.pathname, activeTab, resultId, patientId, orderTab]);

  return (
    <DashboardLayout activeTab={activeTab} role="doctor">
      {content}
    </DashboardLayout>
  );
};

const DoctorDashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DoctorDashboardContent />} />
      <Route path="/track-board" element={<DoctorDashboardContent />} />
      <Route path="/orders" element={<DoctorDashboardContent />} />
      <Route path="/results" element={<DoctorDashboardContent />} />
      <Route path="/notes" element={<DoctorDashboardContent />} />
      <Route path="*" element={<Navigate to="/doctor-dashboard" replace />} />
    </Routes>
  );
};

export default DoctorDashboard;
