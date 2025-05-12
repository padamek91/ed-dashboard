
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
  "Troponin I",
  "Troponin T",
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
  // Empty initially - we'll generate these dynamically in the context
];

// Add taskType to medication orders and vary timestamps
export const medicationOrders = [
  { id: 'med1', patient: 'Michael Johnson', mrn: 'MRN10001', type: 'Acetaminophen 650mg PO Q6H PRN pain', status: 'ordered', timestamp: '2025-05-11 08:15', taskType: 'medication', urgent: false },
  { id: 'med2', patient: 'Michael Johnson', mrn: 'MRN10001', type: 'Aspirin 325mg PO once', status: 'administered', timestamp: '2025-05-11 07:20', taskType: 'medication', urgent: false },
  { id: 'med3', patient: 'Michael Johnson', mrn: 'MRN10001', type: 'Metoprolol 25mg PO BID', status: 'ordered', timestamp: '2025-05-11 06:30', taskType: 'medication', urgent: false },
  { id: 'med4', patient: 'Emily Rodriguez', mrn: 'MRN10002', type: 'Ondansetron 4mg IV Q6H PRN nausea', status: 'ordered', timestamp: '2025-05-11 05:45', taskType: 'medication', urgent: false },
  { id: 'med5', patient: 'Emily Rodriguez', mrn: 'MRN10002', type: 'Ketorolac 15mg IV Q6H PRN pain', status: 'administered', timestamp: '2025-05-11 02:30', taskType: 'medication', urgent: false },
  { id: 'med6', patient: 'David Williams', mrn: 'MRN10003', type: 'Albuterol Nebulizer Q4H', status: 'administered', timestamp: '2025-05-10 23:45', taskType: 'medication', urgent: true },
  { id: 'med7', patient: 'David Williams', mrn: 'MRN10003', type: 'Methylprednisolone 125mg IV Q6H', status: 'ordered', timestamp: '2025-05-10 22:10', taskType: 'medication', urgent: true },
  { id: 'med8', patient: 'David Williams', mrn: 'MRN10003', type: 'Piperacillin/Tazobactam 4.5g IV Q6H', status: 'ordered', timestamp: '2025-05-10 21:30', taskType: 'medication', urgent: true },
  { id: 'med9', patient: 'Sophia Lee', mrn: 'MRN10004', type: 'Lidocaine 2% for infiltration', status: 'ordered', timestamp: '2025-05-11 09:10', taskType: 'medication', urgent: false },
  { id: 'med10', patient: 'Robert Johnson', mrn: 'MRN10005', type: 'Ceftriaxone 1g IV daily', status: 'ordered', timestamp: '2025-05-11 04:20', taskType: 'medication', urgent: false },
  { id: 'med11', patient: 'Lisa Martinez', mrn: 'MRN10006', type: 'Sumatriptan 6mg SC once', status: 'ordered', timestamp: '2025-05-11 03:40', taskType: 'medication', urgent: false },
];

export const imagingOrders = [
  { id: 'img1', patient: 'Michael Johnson', mrn: 'MRN10001', type: 'Chest X-Ray', status: 'ordered' },
  { id: 'img2', patient: 'Michael Johnson', mrn: 'MRN10001', type: 'ECG', status: 'completed' },
  { id: 'img3', patient: 'Emily Rodriguez', mrn: 'MRN10002', type: 'CT Abdomen with contrast', status: 'in process' },
  { id: 'img4', patient: 'Emily Rodriguez', mrn: 'MRN10002', type: 'Right Upper Quadrant Ultrasound', status: 'ordered' },
  { id: 'img5', patient: 'David Williams', mrn: 'MRN10003', type: 'Chest X-Ray', status: 'completed' },
  { id: 'img6', patient: 'David Williams', mrn: 'MRN10003', type: 'CT Chest with contrast', status: 'ordered' },
];

export const consultOrders = [
  { id: 'con1', patient: 'Michael Johnson', mrn: 'MRN10001', type: 'Cardiology', status: 'ordered' },
  { id: 'con2', patient: 'Emily Rodriguez', mrn: 'MRN10002', type: 'General Surgery', status: 'consult in progress' },
  { id: 'con3', patient: 'David Williams', mrn: 'MRN10003', type: 'Pulmonology', status: 'completed' },
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
