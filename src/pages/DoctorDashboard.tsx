
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import PatientList from '@/components/doctor/PatientList';
import TrackBoard from '@/components/doctor/TrackBoard';
import OrdersTab from '@/components/doctor/OrdersTab';
import ResultsTab from '@/components/doctor/ResultsTab';
import NotesTab from '@/components/doctor/NotesTab';

const DoctorDashboardContent = ({ activeTab }: { activeTab: string }) => {
  return (
    <DashboardLayout activeTab={activeTab} role="doctor">
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/track-board" element={<TrackBoard />} />
        <Route path="/orders" element={<OrdersTab />} />
        <Route path="/results" element={<ResultsTab />} />
        <Route path="/notes" element={<NotesTab />} />
      </Routes>
    </DashboardLayout>
  );
};

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('patients');
  
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
