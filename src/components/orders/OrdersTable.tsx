
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from '@/components/ui/table';
import StatusBadge from './StatusBadge';
import { formatDateTime } from '@/utils/orderUtils';

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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {showPatient && <TableHead className="whitespace-nowrap min-w-[150px]">Patient</TableHead>}
            <TableHead className="whitespace-nowrap min-w-[200px]">{showPatient ? 'Test/Order' : 'Test/Order'}</TableHead>
            <TableHead className="whitespace-nowrap min-w-[100px]">Status</TableHead>
            {orders.some(o => o.timestamp) && <TableHead className="whitespace-nowrap min-w-[150px]">Updated</TableHead>}
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
                {showPatient && <TableCell className="whitespace-nowrap">{order.patient}</TableCell>}
                <TableCell className="whitespace-nowrap">{order.type}</TableCell>
                <TableCell><StatusBadge status={order.status} /></TableCell>
                {orders.some(o => o.timestamp) && (
                  <TableCell className="whitespace-nowrap">
                    {order.timestamp ? formatDateTime(order.timestamp) : ''}
                  </TableCell>
                )}
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
    </div>
  );
};

export default OrdersTable;
