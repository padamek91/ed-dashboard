
import OrdersTable from '../OrdersTable';
import { filterOrdersByPatient } from '@/utils/orderUtils';

interface LabOrderStatusProps {
  orders: any[];
  selectedPatient: { id: string; name: string; mrn: string } | null;
}

const LabOrderStatus = ({ orders, selectedPatient }: LabOrderStatusProps) => {
  // Filter out orders that are not completed
  const inProgressOrders = orders.filter(o => !o.status.includes('resulted'));
  
  // Filter by patient if selected
  const filteredOrders = selectedPatient 
    ? filterOrdersByPatient(inProgressOrders, selectedPatient)
    : inProgressOrders;
  
  return (
    <OrdersTable 
      orders={filteredOrders} 
      showPatient={true}
      emptyMessage="No orders in progress"
    />
  );
};

export default LabOrderStatus;
