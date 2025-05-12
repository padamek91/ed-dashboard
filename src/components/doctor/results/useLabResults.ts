
import { useMemo } from 'react';
import { useOrders } from '@/contexts/OrdersContext';
import { LabOrder } from '@/contexts/OrdersContext';

interface UseLabResultsParams {
  selectedPatient: string;
  searchQuery: string;
  orderTypeFilter: string;
  timeFilter: string;
}

export const useLabResults = ({
  selectedPatient,
  searchQuery,
  orderTypeFilter,
  timeFilter
}: UseLabResultsParams) => {
  const { labOrders } = useOrders();
  
  // Get completed orders with results - memoized
  const completedOrders = useMemo(() => {
    return labOrders.filter(order => order.status === 'resulted' && order.result);
  }, [labOrders]);
  
  // Filter results based on selections - memoized to prevent recalculation
  const filteredResults = useMemo(() => {
    return completedOrders.filter(order => {
      // Start with assuming the order matches our filters
      let matches = true;
      
      // Filter by patient if selected
      if (selectedPatient !== 'all' && order.mrn !== selectedPatient) {
        matches = false;
      }
      
      // Filter by order type if selected
      if (orderTypeFilter !== 'all') {
        // Example logic - adjust based on actual order types
        if (orderTypeFilter === 'Lab' && !order.type.includes('Panel') && !order.type.includes('CBC')) {
          matches = false;
        } else if (orderTypeFilter === 'Imaging' && !order.type.includes('X-ray') && !order.type.includes('CT') && !order.type.includes('MRI')) {
          matches = false;
        }
      }
      
      // Filter by search query
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const result = order.result?.toLowerCase() || '';
        const type = order.type.toLowerCase();
        const patientName = order.patient.toLowerCase();
        
        if (!result.includes(lowerCaseQuery) && 
            !type.includes(lowerCaseQuery) && 
            !patientName.includes(lowerCaseQuery)) {
          matches = false;
        }
      }
      
      // Filter by time if selected
      if (timeFilter !== 'any') {
        const orderDate = new Date(order.timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);
        
        switch (timeFilter) {
          case '4h':
            if (hoursDiff > 4) matches = false;
            break;
          case '12h':
            if (hoursDiff > 12) matches = false;
            break;
          case '24h':
            if (hoursDiff > 24) matches = false;
            break;
          case '48h':
            if (hoursDiff > 48) matches = false;
            break;
        }
      }
      
      return matches;
    });
  }, [completedOrders, selectedPatient, orderTypeFilter, searchQuery, timeFilter]);

  return {
    completedOrders,
    filteredResults
  };
};
