
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import StatusBadge from './StatusBadge';

interface Order {
  id: string;
  patient: string;
  mrn?: string;
  type: string;
  status: string;
  timestamp?: string;
}

interface OrdersTableProps {
  orders: Order[];
  showPatient?: boolean;
  emptyMessage?: string;
  onRowClick?: (orderId: string) => void;
}

const OrdersTable = ({ 
  orders, 
  showPatient = true, 
  emptyMessage = "No orders found",
  onRowClick
}: OrdersTableProps) => {
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showPatient && <TableHead>Patient</TableHead>}
          <TableHead>{showPatient ? 'Test/Order' : 'Test/Order'}</TableHead>
          <TableHead>Status</TableHead>
          {orders.some(o => o.timestamp) && <TableHead>Updated</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length > 0 ? (
          orders.map(order => (
            <TableRow 
              key={order.id} 
              className={onRowClick ? "cursor-pointer hover:bg-gray-100" : ""}
              onClick={() => onRowClick && onRowClick(order.id)}
            >
              {showPatient && <TableCell>{order.patient}</TableCell>}
              <TableCell>{order.type}</TableCell>
              <TableCell><StatusBadge status={order.status} /></TableCell>
              {orders.some(o => o.timestamp) && <TableCell>{order.timestamp || ''}</TableCell>}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={showPatient ? (orders.some(o => o.timestamp) ? 4 : 3) : (orders.some(o => o.timestamp) ? 3 : 2)} className="text-center py-4 text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
