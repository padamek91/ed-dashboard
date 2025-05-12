import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { labOrders as initialLabOrders, medicationOrders as initialMedicationOrders, labTests } from '@/data/ordersMockData';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/components/ui/sonner';
import { useAuth } from './AuthContext';
import { patientTestHistory, TestHistory } from '@/data/patientTestHistory';
import { patients } from '@/data/mockData';

// Define interfaces for our orders
export interface LabOrder {
  id: string;
  type: string;
  patient: string;
  mrn: string;
  urgent: boolean;
  timestamp: string;
  status: string;
  result?: string;
  abnormal?: boolean;
  critical?: boolean;
  taskType?: string;
  acknowledgements?: {
    by: string;
    role: string;
    timestamp: string;
    comment?: string;
  }[];
}

export interface MedicationOrder {
  id: string;
  type: string;
  patient: string;
  mrn: string;
  urgent: boolean;
  status: string;
  timestamp: string;
  taskType?: string;
}

interface OrdersContextType {
  labOrders: LabOrder[];
  medicationOrders: MedicationOrder[];
  addLabOrder: (order: Omit<LabOrder, 'id' | 'timestamp'>) => void;
  addLabOrders: (orders: Omit<LabOrder, 'id' | 'timestamp'>[]) => void;
  updateLabOrder: (id: string, updates: Partial<LabOrder>) => void;
  addMedicationOrder: (order: Omit<MedicationOrder, 'id' | 'timestamp'>) => void;
  acknowledgeLabOrder: (id: string) => void;
  collectLabSpecimen: (id: string) => void;
  printLabels: (id: string) => void;
  hasCriticalResults: boolean;
  acknowledgeLabResult: (id: string, comment?: string) => void;
  clearCriticalNotification: (id: string) => void;
  criticalResults: LabOrder[];
}

const OrdersContext = createContext<OrdersContextType>({
  labOrders: [],
  medicationOrders: [],
  addLabOrder: () => {},
  addLabOrders: () => {},
  updateLabOrder: () => {},
  addMedicationOrder: () => {},
  acknowledgeLabOrder: () => {},
  collectLabSpecimen: () => {},
  printLabels: () => {},
  hasCriticalResults: false,
  acknowledgeLabResult: () => {},
  clearCriticalNotification: () => {},
  criticalResults: []
});

// Helper function to generate random test results
const generateRandomLabResult = (testName: string, isAbnormal: boolean = Math.random() > 0.7, isCritical: boolean = Math.random() > 0.9): string => {
  // Define common reference ranges and units based on test type
  const testData: Record<string, { value: () => string | number, units: string, range: string }> = {
    "Complete Blood Count (CBC) with Differential": {
      value: () => {
        const baseValue = 7.5;
        const wbc = isAbnormal ? (Math.random() > 0.5 ? baseValue + 5 + Math.random() * 3 : baseValue - 3 - Math.random() * 2).toFixed(1) : (baseValue + Math.random() * 3).toFixed(1);
        const rbc = isAbnormal ? (Math.random() > 0.5 ? 6.0 + Math.random() : 3.5 - Math.random()).toFixed(1) : (4.7 + Math.random()).toFixed(1);
        const hgb = isAbnormal ? (Math.random() > 0.5 ? 17.5 + Math.random() * 2 : 12 - Math.random() * 3).toFixed(1) : (14.5 + Math.random() * 2).toFixed(1);
        const plt = isAbnormal ? (Math.random() > 0.5 ? 450 + Math.floor(Math.random() * 100) : 100 - Math.floor(Math.random() * 50)) : (200 + Math.floor(Math.random() * 150));
        
        return `WBC: ${wbc} x10^3/μL\nRBC: ${rbc} x10^6/μL\nHgb: ${hgb} g/dL\nPlt: ${plt} x10^3/μL`;
      },
      units: "various",
      range: "WBC: 4.5-11.0 x10^3/μL\nRBC: 4.5-5.9 x10^6/μL\nHgb: 13.5-17.5 g/dL\nPlt: 150-450 x10^3/μL"
    },
    "Basic Metabolic Panel (BMP)": {
      value: () => {
        const na = isAbnormal ? (Math.random() > 0.5 ? 147 + Math.floor(Math.random() * 8) : 132 - Math.floor(Math.random() * 5)) : (137 + Math.floor(Math.random() * 7));
        const k = isAbnormal ? (Math.random() > 0.5 ? 5.2 + Math.random() : 3.0 - Math.random() * 0.5).toFixed(1) : (4.0 + Math.random()).toFixed(1);
        const cl = isAbnormal ? (Math.random() > 0.5 ? 110 + Math.floor(Math.random() * 5) : 95 - Math.floor(Math.random() * 5)) : (100 + Math.floor(Math.random() * 7));
        const co2 = isAbnormal ? (Math.random() > 0.5 ? 32 + Math.floor(Math.random() * 3) : 20 - Math.floor(Math.random() * 5)) : (24 + Math.floor(Math.random() * 4));
        const bun = isAbnormal ? (Math.random() > 0.5 ? 26 + Math.floor(Math.random() * 20) : 5 - Math.floor(Math.random() * 2)) : (10 + Math.floor(Math.random() * 10));
        const cr = isAbnormal ? (Math.random() > 0.5 ? 1.5 + Math.random() : 0.5 - Math.random() * 0.3).toFixed(2) : (0.8 + Math.random() * 0.4).toFixed(2);
        const glu = isAbnormal ? (Math.random() > 0.5 ? 126 + Math.floor(Math.random() * 100) : 65 - Math.floor(Math.random() * 20)) : (85 + Math.floor(Math.random() * 15));
        
        return `Na: ${na} mmol/L\nK: ${k} mmol/L\nCl: ${cl} mmol/L\nCO2: ${co2} mmol/L\nBUN: ${bun} mg/dL\nCr: ${cr} mg/dL\nGlucose: ${glu} mg/dL`;
      },
      units: "various",
      range: "Na: 135-145 mmol/L\nK: 3.5-5.0 mmol/L\nCl: 98-108 mmol/L\nCO2: 22-29 mmol/L\nBUN: 7-25 mg/dL\nCr: 0.6-1.3 mg/dL\nGlucose: 70-100 mg/dL"
    },
    "Comprehensive Metabolic Panel (CMP)": {
      value: () => {
        // Include BMP values plus liver enzymes and proteins
        const bmp = testData["Basic Metabolic Panel (BMP)"].value();
        const alt = isAbnormal ? (Math.random() > 0.5 ? 56 + Math.floor(Math.random() * 100) : 3 - Math.floor(Math.random() * 2)) : (20 + Math.floor(Math.random() * 30));
        const ast = isAbnormal ? (Math.random() > 0.5 ? 49 + Math.floor(Math.random() * 100) : 4 - Math.floor(Math.random() * 3)) : (20 + Math.floor(Math.random() * 25));
        const alp = isAbnormal ? (Math.random() > 0.5 ? 130 + Math.floor(Math.random() * 50) : 30 - Math.floor(Math.random() * 10)) : (70 + Math.floor(Math.random() * 40));
        const tbil = isAbnormal ? (Math.random() > 0.5 ? 1.3 + Math.random() * 2 : 0.1).toFixed(1) : (0.5 + Math.random() * 0.5).toFixed(1);
        const tp = isAbnormal ? (Math.random() > 0.5 ? 8.5 + Math.random() : 5.5 - Math.random()).toFixed(1) : (6.5 + Math.random()).toFixed(1);
        const alb = isAbnormal ? (Math.random() > 0.5 ? 5.5 + Math.random() * 0.5 : 2.5 - Math.random() * 0.5).toFixed(1) : (4.0 + Math.random() * 0.8).toFixed(1);
        
        return `${bmp}\nALT: ${alt} U/L\nAST: ${ast} U/L\nAlk Phos: ${alp} U/L\nT. Bili: ${tbil} mg/dL\nTotal Protein: ${tp} g/dL\nAlbumin: ${alb} g/dL`;
      },
      units: "various",
      range: "Na: 135-145 mmol/L\nK: 3.5-5.0 mmol/L\nCl: 98-108 mmol/L\nCO2: 22-29 mmol/L\nBUN: 7-25 mg/dL\nCr: 0.6-1.3 mg/dL\nGlucose: 70-100 mg/dL\nALT: 7-55 U/L\nAST: 8-48 U/L\nAlk Phos: 40-129 U/L\nT. Bili: 0.1-1.2 mg/dL\nTotal Protein: 6.0-8.3 g/dL\nAlbumin: 3.5-5.0 g/dL"
    },
    "Troponin I": {
      value: () => {
        const value = isCritical ? (0.5 + Math.random() * 10).toFixed(2) : 
                      isAbnormal ? (0.05 + Math.random() * 0.45).toFixed(2) : 
                      (Math.random() * 0.03).toFixed(3);
        return value;
      },
      units: "ng/mL",
      range: "<0.04 ng/mL"
    },
    "Troponin T": {
      value: () => {
        const value = isCritical ? (0.1 + Math.random() * 2).toFixed(2) : 
                      isAbnormal ? (0.02 + Math.random() * 0.08).toFixed(3) : 
                      (Math.random() * 0.015).toFixed(3);
        return value;
      },
      units: "ng/mL",
      range: "<0.01 ng/mL"
    },
    "Lactate": {
      value: () => {
        const value = isCritical ? (4 + Math.random() * 6).toFixed(1) : 
                      isAbnormal ? (2.1 + Math.random() * 1.9).toFixed(1) : 
                      (0.5 + Math.random() * 1.5).toFixed(1);
        return value;
      },
      units: "mmol/L",
      range: "0.5-2.0 mmol/L"
    },
    "C-Reactive Protein (CRP)": {
      value: () => {
        const value = isCritical ? (10 + Math.random() * 190).toFixed(1) : 
                      isAbnormal ? (3 + Math.random() * 7).toFixed(1) : 
                      (Math.random() * 2.5).toFixed(1);
        return value;
      },
      units: "mg/L",
      range: "<3.0 mg/L"
    },
    "Lipid Panel": {
      value: () => {
        const chol = isAbnormal ? (200 + Math.floor(Math.random() * 100)) : (150 + Math.floor(Math.random() * 40));
        const trig = isAbnormal ? (150 + Math.floor(Math.random() * 150)) : (50 + Math.floor(Math.random() * 90));
        const hdl = isAbnormal ? (Math.random() > 0.5 ? 30 - Math.floor(Math.random() * 10) : 80 + Math.floor(Math.random() * 20)) : (40 + Math.floor(Math.random() * 20));
        const ldl = isAbnormal ? (130 + Math.floor(Math.random() * 70)) : (70 + Math.floor(Math.random() * 50));
        
        return `Total Cholesterol: ${chol} mg/dL\nTriglycerides: ${trig} mg/dL\nHDL: ${hdl} mg/dL\nLDL: ${ldl} mg/dL`;
      },
      units: "mg/dL",
      range: "Total Cholesterol: <200 mg/dL\nTriglycerides: <150 mg/dL\nHDL: >40 mg/dL (men), >50 mg/dL (women)\nLDL: <130 mg/dL"
    },
    "Liver Function Tests (LFTs)": {
      value: () => {
        const alt = isAbnormal ? (Math.random() > 0.5 ? 56 + Math.floor(Math.random() * 100) : 3 - Math.floor(Math.random() * 2)) : (20 + Math.floor(Math.random() * 30));
        const ast = isAbnormal ? (Math.random() > 0.5 ? 49 + Math.floor(Math.random() * 100) : 4 - Math.floor(Math.random() * 3)) : (20 + Math.floor(Math.random() * 25));
        const alp = isAbnormal ? (Math.random() > 0.5 ? 130 + Math.floor(Math.random() * 50) : 30 - Math.floor(Math.random() * 10)) : (70 + Math.floor(Math.random() * 40));
        const tbil = isAbnormal ? (Math.random() > 0.5 ? 1.3 + Math.random() * 2 : 0.1).toFixed(1) : (0.5 + Math.random() * 0.5).toFixed(1);
        const dbil = isAbnormal ? (Math.random() > 0.5 ? 0.3 + Math.random() : 0).toFixed(1) : (0.1 + Math.random() * 0.1).toFixed(1);
        const ggt = isAbnormal ? (Math.random() > 0.5 ? 61 + Math.floor(Math.random() * 50) : 5 - Math.floor(Math.random() * 4)) : (15 + Math.floor(Math.random() * 35));
        
        return `ALT: ${alt} U/L\nAST: ${ast} U/L\nAlk Phos: ${alp} U/L\nTotal Bilirubin: ${tbil} mg/dL\nDirect Bilirubin: ${dbil} mg/dL\nGGT: ${ggt} U/L`;
      },
      units: "various",
      range: "ALT: 7-55 U/L\nAST: 8-48 U/L\nAlk Phos: 40-129 U/L\nTotal Bilirubin: 0.1-1.2 mg/dL\nDirect Bilirubin: 0.0-0.3 mg/dL\nGGT: 8-61 U/L"
    },
    "Hemoglobin A1c": {
      value: () => {
        const value = isAbnormal ? (Math.random() > 0.5 ? 5.7 + Math.random() * 4 : 4 - Math.random()).toFixed(1) : (5.2 + Math.random() * 0.4).toFixed(1);
        return value;
      },
      units: "%",
      range: "4.0-5.6%"
    },
    // Add default for other test types
    "default": {
      value: () => isAbnormal ? "Abnormal result" : "Normal result",
      units: "",
      range: "Normal"
    }
  };

  // Special cases for some tests
  if (testName === "Blood Culture (x2)") {
    return isAbnormal ? 
      "Growth detected: " + (Math.random() > 0.5 ? "Gram positive cocci" : "Gram negative rods") + " in " + (Math.random() > 0.5 ? "both" : "one") + " bottles" :
      "No Growth after 5 days";
  }
  
  if (testName === "Urine Culture") {
    return isAbnormal ?
      `Growth: ${Math.floor(Math.random() * 100000) + 10000} CFU/mL ${Math.random() > 0.5 ? "E. coli" : "Klebsiella"}\nSensitivity pending` :
      "No significant growth after 48 hours";
  }

  if (testName === "HCG (Qualitative and Quantitative)") {
    const qualitative = Math.random() > 0.7 ? "Positive" : "Negative";
    const quantitative = qualitative === "Positive" ? 
      (Math.floor(Math.random() * 15000) + 25) + " mIU/mL" : 
      "< 5 mIU/mL";
    return `Qualitative: ${qualitative}\nQuantitative: ${quantitative}`;
  }

  // Get test data or use default
  const test = testData[testName] || testData["default"];
  
  // Format the result
  const value = test.value();
  
  // Convert number to string to ensure we return only strings (fix TypeScript error)
  const valueString = typeof value === 'number' ? value.toString() : value;
  
  // For simple single-value tests, format as "value: units (Reference Range: range)"
  if (!valueString.includes('\n')) {
    return `${valueString} ${test.units} (Reference Range: ${test.range})`;
  }
  
  // For multi-line results, return as is
  return valueString;
};

// Helper function to generate a random timestamp within the past 20 days
const generateRandomTimestamp = (withinHours: number = 480) => { // 480 hours = 20 days
  const now = new Date();
  const pastTime = now.getTime() - (Math.random() * withinHours * 60 * 60 * 1000);
  const pastDate = new Date(pastTime);
  
  // Format as YYYY-MM-DD HH:MM
  const year = pastDate.getFullYear();
  const month = String(pastDate.getMonth() + 1).padStart(2, '0');
  const day = String(pastDate.getDate()).padStart(2, '0');
  const hours = String(pastDate.getHours()).padStart(2, '0');
  const minutes = String(pastDate.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const OrdersProvider = ({ children }: { children: ReactNode }) => {
  const [labOrders, setLabOrders] = useState<LabOrder[]>([]);
  const [medicationOrders, setMedicationOrders] = useState<MedicationOrder[]>(initialMedicationOrders.map(order => ({
    ...order,
    urgent: order.urgent || false // Ensure urgent is never undefined
  })));
  const [hasCriticalResults, setHasCriticalResults] = useState(false);
  const { toast: uiToast } = useToast();
  const { user } = useAuth();
  
  // Function to generate test history for each patient
  const generateTestHistory = () => {
    const patientIds = Object.keys(patientTestHistory);
    const generatedOrders: LabOrder[] = [];
    
    // For each patient
    patientIds.forEach(patientId => {
      const patient = patients.find(p => p.id === patientId);
      if (!patient) return;
      
      // Generate 15-20 test results per patient (increased from 10-15)
      const numTests = Math.floor(Math.random() * 6) + 15; // 15-20 tests
      const testsToGenerate = [];
      
      // Make sure at least 2 tests are within the last 24 hours
      testsToGenerate.push({
        timestamp: generateRandomTimestamp(24), // Within last 24 hours
        isRecent: true
      });
      
      testsToGenerate.push({
        timestamp: generateRandomTimestamp(24), // Within last 24 hours
        isRecent: true
      });
      
      // Generate the remaining tests within the past 20 days
      for (let i = 0; i < numTests - 2; i++) {
        testsToGenerate.push({
          timestamp: generateRandomTimestamp(), // Within last 20 days
          isRecent: false
        });
      }
      
      // Sort by time (newest first)
      testsToGenerate.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      // Now select test types and generate results
      testsToGenerate.forEach((test) => {
        // Select a test type - ensure some variety
        const testType = labTests[Math.floor(Math.random() * labTests.length)];
        
        // Determine if abnormal or critical
        // More likely to be abnormal/critical in recent tests for storytelling
        const isAbnormal = test.isRecent ? Math.random() > 0.3 : Math.random() > 0.7;
        const isCritical = test.isRecent && isAbnormal ? Math.random() > 0.7 : Math.random() > 0.95;
        
        // Generate result
        const resultText = generateRandomLabResult(testType, isAbnormal, isCritical);
        
        // Create test order
        const newOrder: LabOrder = {
          id: `lab-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          type: testType,
          patient: patient.name,
          mrn: patient.mrn,
          urgent: isCritical,
          timestamp: test.timestamp,
          status: 'resulted',
          result: resultText,
          abnormal: isAbnormal,
          critical: isCritical,
          taskType: 'lab'
        };
        
        // Add to orders
        generatedOrders.push(newOrder);
      });
    });
    
    // Set the lab orders state
    setLabOrders(generatedOrders);
    
    // Check for critical results
    const hasCritical = generatedOrders.some(
      order => order.critical && 
      order.status === 'resulted' && 
      (!order.acknowledgements || !order.acknowledgements.some(ack => ack.role === 'doctor'))
    );
    
    setHasCriticalResults(hasCritical);
    
    return generatedOrders;
  };
  
  // Generate test history on first render
  useEffect(() => {
    const orders = generateTestHistory();
    console.log(`Generated ${orders.length} lab orders across ${Object.keys(patientTestHistory).length} patients`);
  }, []);

  // Identify critical results that need attention
  const criticalResults = labOrders.filter(
    order => order.critical && 
    order.status === 'resulted' && 
    (!order.acknowledgements || !order.acknowledgements.some(ack => ack.role === 'doctor'))
  );

  useEffect(() => {
    // Check for unacknowledged critical results when orders change
    const unacknowledgedCritical = labOrders.some(
      order => order.critical && 
      order.status === 'resulted' && 
      (!order.acknowledgements || !order.acknowledgements.some(ack => ack.role === 'doctor'))
    );
    
    setHasCriticalResults(unacknowledgedCritical);
  }, [labOrders]);

  const addLabOrder = (order: Omit<LabOrder, 'id' | 'timestamp'>) => {
    const newOrder: LabOrder = {
      ...order,
      id: `lab-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      status: 'order placed'
    };
    
    setLabOrders(prev => [newOrder, ...prev]);
    toast.success("Lab order placed successfully");
  };

  const addLabOrders = (orders: Omit<LabOrder, 'id' | 'timestamp'>[]) => {
    const newOrders = orders.map(order => ({
      ...order,
      id: `lab-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      status: 'order placed'
    }));
    
    setLabOrders(prev => [...newOrders, ...prev]);
    toast.success(`${newOrders.length} lab orders placed successfully`);
  };

  const updateLabOrder = (id: string, updates: Partial<LabOrder>) => {
    setLabOrders(prev => 
      prev.map(order => 
        order.id === id 
          ? { ...order, ...updates } 
          : order
      )
    );
  };

  const addMedicationOrder = (order: Omit<MedicationOrder, 'id' | 'timestamp'>) => {
    const newOrder: MedicationOrder = {
      ...order,
      id: `med-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      status: 'ordered'
    };
    
    setMedicationOrders(prev => [newOrder, ...prev]);
    toast.success("Medication order placed successfully");
  };

  const acknowledgeLabOrder = (id: string) => {
    updateLabOrder(id, { 
      status: 'acknowledged by nurse',
      acknowledgements: [
        ...(labOrders.find(o => o.id === id)?.acknowledgements || []),
        {
          by: user?.name || 'Unknown User',
          role: user?.role || 'unknown',
          timestamp: new Date().toISOString()
        }
      ]
    });
    toast.success("Lab order acknowledged");
  };

  const printLabels = (id: string) => {
    // In a real app, this would trigger a print dialog
    toast.success("Labels sent to printer");
    
    // Update the order status
    updateLabOrder(id, { 
      status: 'labels printed',
    });
  };

  const collectLabSpecimen = (id: string) => {
    updateLabOrder(id, { 
      status: 'collected',
    });
    toast.success("Specimen collection documented");
  };

  const acknowledgeLabResult = (id: string, comment?: string) => {
    if (!user) return;

    const acknowledgement = {
      by: user.name,
      role: user.role,
      timestamp: new Date().toISOString(),
      comment: comment || `Result acknowledged by ${user.name}`
    };

    updateLabOrder(id, {
      acknowledgements: [
        ...(labOrders.find(o => o.id === id)?.acknowledgements || []),
        acknowledgement
      ]
    });

    // Show confirmation toast
    uiToast({
      title: "Critical Result Acknowledged",
      description: "Your acknowledgment has been recorded.",
    });
  };

  const clearCriticalNotification = (id: string) => {
    // This would typically mark the notification as viewed
    console.log(`Critical notification for order ${id} cleared`);
  };

  return (
    <OrdersContext.Provider value={{
      labOrders,
      medicationOrders,
      addLabOrder,
      addLabOrders,
      updateLabOrder,
      addMedicationOrder,
      acknowledgeLabOrder,
      collectLabSpecimen,
      printLabels,
      hasCriticalResults,
      acknowledgeLabResult,
      clearCriticalNotification,
      criticalResults
    }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
