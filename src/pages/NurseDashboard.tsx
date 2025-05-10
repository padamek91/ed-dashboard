
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import NursePatientList from '@/components/nurse/NursePatientList';
import NurseTrackBoard from '@/components/nurse/NurseTrackBoard';
import NurseTasks from '@/components/nurse/NurseTasks';
import NurseVitals from '@/components/nurse/NurseVitals';

const NurseDashboardContent = ({ activeTab }: { activeTab: string }) => {
  return (
    <DashboardLayout activeTab={activeTab} role="nurse">
      <Routes>
        <Route path="/" element={<NursePatientList />} />
        <Route path="/track-board" element={<NurseTrackBoard />} />
        <Route path="/tasks" element={<NurseTasks />} />
        <Route path="/vitals" element={<NurseVitals />} />
      </Routes>
    </DashboardLayout>
  );
};

const NurseDashboard = () => {
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
