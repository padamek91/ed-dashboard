export const labTests = [
  "Complete Blood Count (CBC) with Differential",
  "Basic Metabolic Panel (BMP)",
  "Comprehensive Metabolic Panel (CMP)",
  "Urinalysis (UA), Automated",
  "Urine Drug Screen (UDS), Qualitative",
  "Lipid Panel",
  "Liver Function Tests (LFTs)",
  "Cardiac Enzymes Panel (Troponin, CK-MB, etc.)",
  "Coagulation Panel (PT, PTT, INR)",
  "Sepsis Workup Panel (CBC, Lactate, Blood Cultures, Procalcitonin)",
  "Electrolyte Panel",
  "Iron Studies Panel",
  "Thyroid Panel (TSH, Free T4 ± T3)",
  "Hepatitis Panel (A, B, C Antibodies and Antigens)",
  "Respiratory Viral Panel (RVP) – PCR",
  "COVID-19 PCR Panel",
  "Inflammatory Markers Panel (CRP, ESR, Procalcitonin)",
  "Troponin I or T",
  "Lactate",
  "C-Reactive Protein (CRP)",
  "Erythrocyte Sedimentation Rate (ESR)",
  "Blood Culture (x2)",
  "Urine Culture",
  "HCG (Qualitative and Quantitative)",
  "Glucose (Serum)",
  "Hemoglobin A1c",
  "Magnesium",
  "Phosphate (PO4)",
  "Calcium (Total and Ionized)",
  "Albumin",
  "Ammonia",
  "Lipase",
  "Amylase",
  "B-type Natriuretic Peptide (BNP) or NT-proBNP",
  "Prothrombin Time (PT) / International Normalized Ratio (INR)",
  "Partial Thromboplastin Time (PTT)",
  "D-dimer",
  "Type and Screen / Crossmatch",
  "HIV Antibody/Antigen (4th Generation)",
  "Vitamin B12 and Folate"
];

// Mock orders with enhanced data for lab orders - with varied timestamps
export const labOrders = [
  // Michael Johnson (Patient 1)
  { id: 'lab1', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'Complete Blood Count', status: 'order placed', timestamp: '2025-05-11 08:30', taskType: 'lab' },
  { id: 'lab2', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'Troponin I', status: 'needs to be collected', timestamp: '2025-05-11 07:15', taskType: 'lab' },
  { id: 'lab3', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'Basic Metabolic Panel', status: 'acknowledged by nurse', timestamp: '2025-05-11 06:45', taskType: 'lab' },
  
  // Resulted orders - older timestamps since they're completed
  { id: 'lab4', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'D-Dimer', status: 'resulted', timestamp: '2025-05-09 14:30', 
    result: 'D-Dimer: 0.4 mg/L FEU (Reference Range: <0.5 mg/L FEU)', abnormal: false, taskType: 'lab' },
  { id: 'lab5', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'Cardiac Enzymes', status: 'resulted', timestamp: '2025-05-08 15:45', 
    result: 'Troponin I: 0.8 ng/mL (Reference Range: <0.04 ng/mL)\nCK-MB: 12.5 ng/mL (Reference Range: 0-3.6 ng/mL)', critical: true, taskType: 'lab' },
  { id: 'lab6', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'Electrolytes', status: 'resulted', timestamp: '2025-05-07 13:20', 
    result: 'Na: 138 mmol/L (Reference Range: 135-145 mmol/L)\nK: 4.2 mmol/L (Reference Range: 3.5-5.0 mmol/L)\nCl: 102 mmol/L (Reference Range: 98-108 mmol/L)\nCO2: 24 mmol/L (Reference Range: 22-29 mmol/L)', abnormal: false, taskType: 'lab' },
  
  // Emily Rodriguez (Patient 2) - varied timestamps
  { id: 'lab7', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Comprehensive Metabolic Panel', status: 'collected', timestamp: '2025-05-11 02:15', taskType: 'lab' },
  { id: 'lab8', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Lipase', status: 'in process', timestamp: '2025-05-10 23:00', taskType: 'lab' },
  { id: 'lab9', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Amylase', status: 'order placed', timestamp: '2025-05-10 22:30', taskType: 'lab' },
  
  // Resulted orders - Emily
  { id: 'lab10', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Complete Blood Count', status: 'resulted', timestamp: '2025-05-05 16:45', 
    result: 'WBC: 12.5 x10^3/μL (Reference Range: 4.5-11.0 x10^3/μL)\nRBC: 4.2 x10^6/μL (Reference Range: 4.5-5.9 x10^6/μL)\nHgb: 13.5 g/dL (Reference Range: 13.5-17.5 g/dL)\nHct: 40.2% (Reference Range: 41.0-53.0%)\nPlt: 250 x10^3/μL (Reference Range: 150-450 x10^3/μL)', abnormal: true, taskType: 'lab' },
  { id: 'lab11', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Liver Function Tests', status: 'resulted', timestamp: '2025-05-04 17:30', 
    result: 'ALT: 45 U/L (Reference Range: 7-55 U/L)\nAST: 40 U/L (Reference Range: 8-48 U/L)\nAlk Phos: 115 U/L (Reference Range: 40-129 U/L)\nTotal Bilirubin: 0.8 mg/dL (Reference Range: 0.1-1.2 mg/dL)', abnormal: false, taskType: 'lab' },
  { id: 'lab12', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Urinalysis', status: 'resulted', timestamp: '2025-05-04 15:15', 
    result: 'Color: Yellow\nClarity: Clear\npH: 6.0\nSpecific Gravity: 1.015\nGlucose: Negative\nBilirubin: Negative\nKetones: Negative\nBlood: Trace\nProtein: Negative\nNitrite: Negative\nLeukocyte Esterase: Trace\nWBC: 2-5/HPF\nRBC: 1-3/HPF', abnormal: true, taskType: 'lab' },
  { id: 'lab13', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Lipid Panel', status: 'resulted', timestamp: '2025-04-30 12:45', 
    result: 'Total Cholesterol: 210 mg/dL (Reference Range: <200 mg/dL)\nTriglycerides: 150 mg/dL (Reference Range: <150 mg/dL)\nHDL: 45 mg/dL (Reference Range: >40 mg/dL)\nLDL: 135 mg/dL (Reference Range: <130 mg/dL)', abnormal: true, taskType: 'lab' },
  { id: 'lab14', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Hemoglobin A1c', status: 'resulted', timestamp: '2025-04-25 14:20', 
    result: 'HbA1c: 5.8% (Reference Range: <5.7%)', abnormal: true, taskType: 'lab' },
  
  // David Williams (Patient 3) - more recent urgent orders
  { id: 'lab15', patient: 'David Williams', mrn: 'MRN34567', type: 'Arterial Blood Gas', status: 'collected', timestamp: '2025-05-11 06:30', taskType: 'lab', urgent: true },
  { id: 'lab16', patient: 'David Williams', mrn: 'MRN34567', type: 'Blood Culture x2', status: 'in process', timestamp: '2025-05-11 05:00', taskType: 'lab', urgent: true },
  { id: 'lab17', patient: 'David Williams', mrn: 'MRN34567', type: 'Respiratory Viral Panel', status: 'needs to be collected', timestamp: '2025-05-11 04:15', taskType: 'lab' },
  
  // Resulted orders - David (more recent since they're critical)
  { id: 'lab18', patient: 'David Williams', mrn: 'MRN34567', type: 'Arterial Blood Gas', status: 'resulted', timestamp: '2025-05-11 00:15', 
    result: 'pH: 7.32 (Reference Range: 7.35-7.45)\nPaCO2: 50 mmHg (Reference Range: 35-45 mmHg)\nPaO2: 60 mmHg (Reference Range: 80-100 mmHg)\nHCO3: 24 mEq/L (Reference Range: 22-26 mEq/L)\nBase Excess: -2 mEq/L (Reference Range: -2 to +2 mEq/L)', critical: true, taskType: 'lab' },
  { id: 'lab19', patient: 'David Williams', mrn: 'MRN34567', type: 'Complete Blood Count', status: 'resulted', timestamp: '2025-05-10 22:30', 
    result: 'WBC: 15.2 x10^3/μL (Reference Range: 4.5-11.0 x10^3/μL)\nRBC: 4.8 x10^6/μL (Reference Range: 4.5-5.9 x10^6/μL)\nHgb: 14.2 g/dL (Reference Range: 13.5-17.5 g/dL)\nHct: 42.5% (Reference Range: 41.0-53.0%)\nPlt: 280 x10^3/μL (Reference Range: 150-450 x10^3/μL)', abnormal: true, taskType: 'lab' },
  { id: 'lab20', patient: 'David Williams', mrn: 'MRN34567', type: 'C-Reactive Protein', status: 'resulted', timestamp: '2025-05-10 20:45', 
    result: 'CRP: 15.5 mg/L (Reference Range: <3.0 mg/L)', abnormal: true, taskType: 'lab' },
  { id: 'lab21', patient: 'David Williams', mrn: 'MRN34567', type: 'Procalcitonin', status: 'resulted', timestamp: '2025-05-10 19:20', 
    result: 'Procalcitonin: 0.8 ng/mL (Reference Range: <0.5 ng/mL)', abnormal: true, taskType: 'lab' },
  { id: 'lab22', patient: 'David Williams', mrn: 'MRN34567', type: 'NT-proBNP', status: 'resulted', timestamp: '2025-05-10 18:10', 
    result: 'NT-proBNP: 2500 pg/mL (Reference Range: <300 pg/mL)', critical: true, taskType: 'lab' },
];

// Add taskType to medication orders and vary timestamps
export const medicationOrders = [
  { id: 'med1', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'Acetaminophen 650mg PO Q6H PRN pain', status: 'ordered', timestamp: '2025-05-11 08:15', taskType: 'medication' },
  { id: 'med2', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'Aspirin 325mg PO once', status: 'administered', timestamp: '2025-05-11 07:20', taskType: 'medication' },
  { id: 'med3', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'Metoprolol 25mg PO BID', status: 'ordered', timestamp: '2025-05-11 06:30', taskType: 'medication' },
  { id: 'med4', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Ondansetron 4mg IV Q6H PRN nausea', status: 'ordered', timestamp: '2025-05-11 05:45', taskType: 'medication' },
  { id: 'med5', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Ketorolac 15mg IV Q6H PRN pain', status: 'administered', timestamp: '2025-05-11 02:30', taskType: 'medication' },
  { id: 'med6', patient: 'David Williams', mrn: 'MRN34567', type: 'Albuterol Nebulizer Q4H', status: 'administered', timestamp: '2025-05-10 23:45', taskType: 'medication', urgent: true },
  { id: 'med7', patient: 'David Williams', mrn: 'MRN34567', type: 'Methylprednisolone 125mg IV Q6H', status: 'ordered', timestamp: '2025-05-10 22:10', taskType: 'medication', urgent: true },
  { id: 'med8', patient: 'David Williams', mrn: 'MRN34567', type: 'Piperacillin/Tazobactam 4.5g IV Q6H', status: 'ordered', timestamp: '2025-05-10 21:30', taskType: 'medication', urgent: true },
  { id: 'med9', patient: 'Sophia Lee', mrn: 'MRN45678', type: 'Lidocaine 2% for infiltration', status: 'ordered', timestamp: '2025-05-11 09:10', taskType: 'medication' },
  { id: 'med10', patient: 'Robert Johnson', mrn: 'MRN56789', type: 'Ceftriaxone 1g IV daily', status: 'ordered', timestamp: '2025-05-11 04:20', taskType: 'medication' },
  { id: 'med11', patient: 'Lisa Martinez', mrn: 'MRN67890', type: 'Sumatriptan 6mg SC once', status: 'ordered', timestamp: '2025-05-11 03:40', taskType: 'medication' },
];

export const imagingOrders = [
  { id: 'img1', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'Chest X-Ray', status: 'ordered' },
  { id: 'img2', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'ECG', status: 'completed' },
  { id: 'img3', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'CT Abdomen with contrast', status: 'in process' },
  { id: 'img4', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'Right Upper Quadrant Ultrasound', status: 'ordered' },
  { id: 'img5', patient: 'David Williams', mrn: 'MRN34567', type: 'Chest X-Ray', status: 'completed' },
  { id: 'img6', patient: 'David Williams', mrn: 'MRN34567', type: 'CT Chest with contrast', status: 'ordered' },
];

export const consultOrders = [
  { id: 'con1', patient: 'Michael Johnson', mrn: 'MRN12345', type: 'Cardiology', status: 'ordered' },
  { id: 'con2', patient: 'Emily Rodriguez', mrn: 'MRN23456', type: 'General Surgery', status: 'consult in progress' },
  { id: 'con3', patient: 'David Williams', mrn: 'MRN34567', type: 'Pulmonology', status: 'completed' },
];

// Common orders by category
export const commonOrders = {
  Lab: labTests,
  Medication: [
    'Acetaminophen 650mg PO Q6H PRN pain',
    'Ibuprofen 600mg PO Q6H PRN pain',
    'Ketorolac 15mg IV Q6H PRN pain',
    'Morphine 4mg IV Q4H PRN severe pain',
    'Ondansetron 4mg IV Q6H PRN nausea',
    'Lorazepam 1mg IV Q6H PRN anxiety',
    'Ceftriaxone 1g IV Q24H',
    'Albuterol Nebulizer Q4H PRN wheezing',
    'Aspirin 325mg PO once',
    'Normal Saline 1L IV at 100mL/hr'
  ],
  Imaging: [
    'Chest X-ray',
    'Abdominal X-ray',
    'Head CT without contrast',
    'Chest CT with contrast',
    'Abdominal CT with contrast',
    'CT Angiogram of Chest',
    'Extremity X-ray',
    'RUQ Ultrasound',
    'MRI Brain',
    'FAST Ultrasound'
  ],
  Consult: [
    'Cardiology Consultation',
    'Neurology Consultation',
    'General Surgery Consultation',
    'Orthopedics Consultation',
    'Psychiatry Consultation',
    'OB/GYN Consultation',
    'Pulmonology Consultation',
    'ENT Consultation',
    'Infectious Disease Consultation',
    'Gastroenterology Consultation'
  ]
};
