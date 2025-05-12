
import { useNavigate } from 'react-router-dom';
import OrdersTable from '../OrdersTable';
import { filterOrdersByPatient } from '@/utils/orderUtils';

interface LabResultsProps {
  orders: any[];
  selectedPatient: { id: string; name: string; mrn: string } | null;
}

const LabResults = ({ orders, selectedPatient }: LabResultsProps) => {
  const navigate = useNavigate();
  
  // Filter only completed orders with results
  const completedOrders = orders.filter(o => o.status.includes('resulted'));
  
  // Filter by patient if selected
  const filteredOrders = selectedPatient 
    ? filterOrdersByPatient(completedOrders, selectedPatient)
    : completedOrders;
  
  // Handle row click to navigate to detailed result view
  const handleRowClick = (orderId: string) => {
    navigate(`/doctor-dashboard/results?id=${orderId}`);
  };
  
  return (
    <div className="overflow-x-auto">
      <OrdersTable 
        orders={filteredOrders} 
        showPatient={true}
        emptyMessage="No results found"
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default LabResults;
