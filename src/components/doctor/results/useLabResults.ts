
import { useMemo } from 'react';
import { useOrders } from '@/contexts/OrdersContext';
import { useAuth } from '@/contexts/AuthContext';
import { LabOrder } from '@/contexts/OrdersContext';
import { patients } from '@/data/mockData';

interface UseLabResultsParams {
  searchQuery: string;
  orderTypeFilter: string;
  timeFilter: string;
  myPatientsOnly: boolean;
}

export const useLabResults = ({
  searchQuery,
  orderTypeFilter,
  timeFilter,
  myPatientsOnly
}: UseLabResultsParams) => {
  const { labOrders } = useOrders();
  const { user } = useAuth();
  
  // Get completed orders with results - memoized
  const completedOrders = useMemo(() => {
    return labOrders.filter(order => order.status === 'resulted' && order.result);
  }, [labOrders]);
  
  // Filter results based on selections - memoized to prevent recalculation
  const filteredResults = useMemo(() => {
    return completedOrders.filter(order => {
      // Start with assuming the order matches our filters
      let matches = true;
      
      // Filter by "my patients only" if selected
      if (myPatientsOnly && user?.role === 'doctor') {
        const patientData = patients.find(p => p.mrn === order.mrn);
        if (!patientData || patientData.attendingPhysician !== user.name) {
          matches = false;
        }
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
      
      // Filter by search query - search patient names not test names
      if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const patientName = order.patient.toLowerCase();
        
        // Only search patient names
        if (!patientName.includes(lowerCaseQuery)) {
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
  }, [completedOrders, orderTypeFilter, searchQuery, timeFilter, myPatientsOnly, user]);

  return {
    completedOrders,
    filteredResults
  };
};
