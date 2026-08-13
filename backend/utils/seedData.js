export const sampleProviders = [
  {
    name: 'SolarLife',
    role: 'Developer',
    address: 'Velez St, Cagayan de Oro',
    cityMunicipality: 'Cagayan de Oro',
    province: 'Misamis Oriental',
    region: 'Region X',
    contactNumber: '+63 917 888 1234',
    email: 'contact@solarlife.ph',
    rating: 4.9,
    avatarBg: '#EAB308',
  },
  {
    name: 'SunPower Mindanao',
    role: 'Installer',
    address: 'Macapagal Ave, Iligan City',
    cityMunicipality: 'Iligan City',
    province: 'Lanao del Norte',
    region: 'Region X',
    contactNumber: '+63 918 777 5678',
    email: 'info@sunpowermindanao.ph',
    rating: 4.8,
    avatarBg: '#1F8F2E',
  },
  {
    name: 'GridFree Solar Tech',
    role: 'EPC Contractor',
    address: 'Zone 3, Tagoloan',
    cityMunicipality: 'Tagoloan',
    province: 'Misamis Oriental',
    region: 'Region X',
    contactNumber: '+63 922 444 9900',
    email: 'sales@gridfreesolar.ph',
    rating: 4.7,
    avatarBg: '#3B82F6',
  },
];

export const sampleLeads = [
  {
    customerName: 'Juan Dela Cruz',
    email: 'juan.delacruz@gmail.com',
    phone: '+63 917 555 0101',
    location: {
      barangay: 'Barangay Nazareth',
      cityOrMunicipality: 'Cagayan de Oro',
      province: 'Misamis Oriental',
      coordinates: { lat: 8.4772, lng: 124.6459 },
    },
    readinessScore: 85,
    leadTier: 'Hot',
    status: 'New',
    billDetails: { monthlyBill: 8500, kwhUsage: 739, ratePerKwh: 11.5, customerType: 'Residential' },
    solarEstimate: {
      recommendedSystemSizeKwp: 5.2,
      estimatedMonthlySavings: 2650,
      estimatedInstallCost: 195000,
      paybackYears: 4.2,
      pvoutDaily: 4.8,
      annualCo2ReductionTons: 3.5,
    },
    assessmentAnswers: {
      homeOwnership: 'Yes, I own it',
      sunlight: 'Mostly sunny',
      roofSpace: 'Large',
      paymentPreference: 'Cash',
      installationTimeline: 'As soon as possible',
    },
    submittedAt: new Date('2025-05-11T09:30:00Z'),
  },
  {
    customerName: 'Maria Santos',
    email: 'maria.santos@gmail.com',
    phone: '+63 918 555 0202',
    location: {
      barangay: 'Barangay Pala-o',
      cityOrMunicipality: 'Iligan City',
      province: 'Lanao del Norte',
      coordinates: { lat: 8.228, lng: 124.2452 },
    },
    readinessScore: 72,
    leadTier: 'Warm',
    status: 'New',
    billDetails: { monthlyBill: 6800, kwhUsage: 591, ratePerKwh: 11.5, customerType: 'Residential' },
    solarEstimate: {
      recommendedSystemSizeKwp: 4.0,
      estimatedMonthlySavings: 1980,
      estimatedInstallCost: 155000,
      paybackYears: 4.8,
      pvoutDaily: 4.6,
      annualCo2ReductionTons: 2.8,
    },
    assessmentAnswers: {
      homeOwnership: 'Family-owned',
      sunlight: 'Mostly sunny',
      roofSpace: 'Medium',
      paymentPreference: 'Installment or financing',
      installationTimeline: 'Within 3 months',
    },
    submittedAt: new Date('2025-05-10T14:15:00Z'),
  },
  {
    customerName: 'Rafael Lim',
    email: 'rafael.lim@gmail.com',
    phone: '+63 922 555 0303',
    location: {
      barangay: 'Poblacion',
      cityOrMunicipality: 'Tagoloan',
      province: 'Misamis Oriental',
      coordinates: { lat: 8.5414, lng: 124.7525 },
    },
    readinessScore: 68,
    leadTier: 'Warm',
    status: 'Contacted',
    billDetails: { monthlyBill: 6100, kwhUsage: 530, ratePerKwh: 11.5, customerType: 'Residential' },
    solarEstimate: {
      recommendedSystemSizeKwp: 3.8,
      estimatedMonthlySavings: 1750,
      estimatedInstallCost: 148000,
      paybackYears: 5.0,
      pvoutDaily: 4.5,
      annualCo2ReductionTons: 2.6,
    },
    assessmentAnswers: {
      homeOwnership: 'Yes, I own it',
      sunlight: 'Partially shaded',
      roofSpace: 'Medium',
      paymentPreference: 'Installment or financing',
      installationTimeline: 'Within 6 months',
    },
    submittedAt: new Date('2025-05-09T11:45:00Z'),
  },
  {
    customerName: 'Ana Reyes',
    email: 'ana.reyes@yahoo.com',
    phone: '+63 917 555 0404',
    location: {
      barangay: 'Barangay Carmen',
      cityOrMunicipality: 'Cagayan de Oro',
      province: 'Misamis Oriental',
      coordinates: { lat: 8.4812, lng: 124.6369 },
    },
    readinessScore: 45,
    leadTier: 'Education',
    status: 'New',
    billDetails: { monthlyBill: 4200, kwhUsage: 365, ratePerKwh: 11.5, customerType: 'Residential' },
    solarEstimate: {
      recommendedSystemSizeKwp: 2.8,
      estimatedMonthlySavings: 1280,
      estimatedInstallCost: 110000,
      paybackYears: 5.5,
      pvoutDaily: 4.4,
      annualCo2ReductionTons: 1.9,
    },
    assessmentAnswers: {
      homeOwnership: 'Renting',
      sunlight: 'Partially shaded',
      roofSpace: 'Small',
      paymentPreference: 'Not sure yet',
      installationTimeline: 'Just researching',
    },
    submittedAt: new Date('2025-05-08T16:20:00Z'),
  },
  {
    customerName: 'Mark Villanueva',
    email: 'markv@gmail.com',
    phone: '+63 918 555 0505',
    location: {
      barangay: 'Barangay Tubod',
      cityOrMunicipality: 'Iligan City',
      province: 'Lanao del Norte',
      coordinates: { lat: 8.2325, lng: 124.2501 },
    },
    readinessScore: 40,
    leadTier: 'Education',
    status: 'New',
    billDetails: { monthlyBill: 3900, kwhUsage: 339, ratePerKwh: 11.5, customerType: 'Residential' },
    solarEstimate: {
      recommendedSystemSizeKwp: 2.5,
      estimatedMonthlySavings: 1150,
      estimatedInstallCost: 98000,
      paybackYears: 5.8,
      pvoutDaily: 4.5,
      annualCo2ReductionTons: 1.7,
    },
    assessmentAnswers: {
      homeOwnership: 'Renting',
      sunlight: 'Partially shaded',
      roofSpace: 'Small',
      paymentPreference: 'Lease-to-own',
      installationTimeline: 'Just researching',
    },
    submittedAt: new Date('2025-05-07T10:10:00Z'),
  },
  {
    customerName: 'Jessica Tan',
    email: 'jessica.tan@yahoo.com',
    phone: '+63 922 555 0606',
    location: {
      barangay: 'Barangay Igpit',
      cityOrMunicipality: 'Opol',
      province: 'Misamis Oriental',
      coordinates: { lat: 8.5194, lng: 124.5714 },
    },
    readinessScore: 30,
    leadTier: 'Education',
    status: 'New',
    billDetails: { monthlyBill: 3200, kwhUsage: 278, ratePerKwh: 11.5, customerType: 'Residential' },
    solarEstimate: {
      recommendedSystemSizeKwp: 2.0,
      estimatedMonthlySavings: 920,
      estimatedInstallCost: 85000,
      paybackYears: 6.2,
      pvoutDaily: 4.3,
      annualCo2ReductionTons: 1.4,
    },
    assessmentAnswers: {
      homeOwnership: 'Not sure',
      sunlight: 'Heavily shaded',
      roofSpace: 'Small',
      paymentPreference: 'Not sure yet',
      installationTimeline: 'Just researching',
    },
    submittedAt: new Date('2025-05-06T13:00:00Z'),
  },
];

// Generator function to produce the full 128 leads dataset matching KPI metrics
export function generateFullDataset(providerId) {
  const dataset = [];
  
  // First, push our exact detailed sample leads (6 rows shown in table)
  sampleLeads.forEach((lead) => {
    dataset.push({ ...lead, providerId });
  });

  const namesFirst = ['Gabriel', 'Sophia', 'Carlos', 'Elena', 'Michael', 'Bea', 'Paolo', 'Rhea', 'Joshua', 'Camille', 'Diego', 'Patricia', 'Jose', 'Angela', 'Anthony', 'Kristine', 'Jerome', 'Nathalie'];
  const namesLast = ['Aquino', 'Bautista', 'Castillo', 'Dizon', 'Enriquez', 'Flores', 'Gonzales', 'Hernandez', 'Imperial', 'Joaquin', 'Lim', 'Mercado', 'Navarro', 'Ong', 'Pascual', 'Quizon', 'Ramos', 'Sy'];
  const cities = [
    { city: 'Cagayan de Oro', prov: 'Misamis Oriental', lat: 8.4772, lng: 124.6459, brgys: ['Carmen', 'Nazareth', 'Kauswagan', 'Lapasan', 'Bulua', 'Camaman-an'] },
    { city: 'Iligan City', prov: 'Lanao del Norte', lat: 8.228, lng: 124.2452, brgys: ['Pala-o', 'Tubod', 'Tibanga', 'Hinaplanon', 'Suarez'] },
    { city: 'Tagoloan', prov: 'Misamis Oriental', lat: 8.5414, lng: 124.7525, brgys: ['Poblacion', 'Zone 1', 'Zone 4', 'Mohon'] },
    { city: 'Opol', prov: 'Misamis Oriental', lat: 8.5194, lng: 124.5714, brgys: ['Igpit', 'Barra', 'Poblacion'] },
  ];

  // Target counts to reach exact total: 128 total (32 Hot, 58 Warm, 38 Education)
  // Already added: 1 Hot, 2 Warm, 3 Education.
  // Remaining to generate: 31 Hot, 56 Warm, 35 Education.
  const remainingTiers = [
    ...Array(31).fill('Hot'),
    ...Array(56).fill('Warm'),
    ...Array(35).fill('Education'),
  ];

  remainingTiers.forEach((tier, index) => {
    const fn = namesFirst[index % namesFirst.length];
    const ln = namesLast[Math.floor(index / namesFirst.length) % namesLast.length];
    const cObj = cities[index % cities.length];
    const brgy = cObj.brgys[index % cObj.brgys.length];
    
    // Add minor lat/lng variance for map clustering
    const lat = cObj.lat + (Math.random() - 0.5) * 0.05;
    const lng = cObj.lng + (Math.random() - 0.5) * 0.05;

    let score = 50;
    let kWp = 3.5;
    let savings = 1600;
    let bill = 5500;
    let home = 'Yes, I own it';
    let timeline = 'Within 3 months';

    if (tier === 'Hot') {
      score = 75 + Math.floor(Math.random() * 20);
      kWp = parseFloat((4.5 + Math.random() * 3.5).toFixed(1));
      savings = Math.round(2200 + Math.random() * 2500);
      bill = Math.round(7500 + Math.random() * 8000);
      timeline = Math.random() > 0.3 ? 'As soon as possible' : 'Within 3 months';
    } else if (tier === 'Warm') {
      score = 55 + Math.floor(Math.random() * 19);
      kWp = parseFloat((3.0 + Math.random() * 1.8).toFixed(1));
      savings = Math.round(1400 + Math.random() * 700);
      bill = Math.round(5000 + Math.random() * 2400);
      home = Math.random() > 0.4 ? 'Yes, I own it' : 'Family-owned';
      timeline = 'Within 6 months';
    } else {
      score = 25 + Math.floor(Math.random() * 24);
      kWp = parseFloat((1.5 + Math.random() * 1.4).toFixed(1));
      savings = Math.round(700 + Math.random() * 600);
      bill = Math.round(2800 + Math.random() * 2000);
      home = Math.random() > 0.5 ? 'Renting' : 'Not sure';
      timeline = 'Just researching';
    }

    const dateOffsetDays = Math.floor(Math.random() * 20);
    const date = new Date(Date.now() - dateOffsetDays * 86400000);

    dataset.push({
      providerId,
      customerName: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
      phone: `+63 9${Math.floor(10 + Math.random() * 89)} ${Math.floor(100 + Math.random() * 899)} ${Math.floor(1000 + Math.random() * 8999)}`,
      location: {
        barangay: brgy,
        cityOrMunicipality: cObj.city,
        province: cObj.prov,
        coordinates: { lat, lng },
      },
      readinessScore: score,
      leadTier: tier,
      status: Math.random() > 0.8 ? 'Contacted' : 'New',
      billDetails: {
        monthlyBill: bill,
        kwhUsage: Math.round(bill / 11.5),
        ratePerKwh: 11.5,
        customerType: 'Residential',
      },
      solarEstimate: {
        recommendedSystemSizeKwp: kWp,
        estimatedMonthlySavings: savings,
        estimatedInstallCost: Math.round(kWp * 38000),
        paybackYears: parseFloat((4.0 + Math.random() * 2.0).toFixed(1)),
        pvoutDaily: 4.6,
        annualCo2ReductionTons: parseFloat((kWp * 0.7).toFixed(1)),
      },
      assessmentAnswers: {
        homeOwnership: home,
        sunlight: tier === 'Hot' ? 'Mostly sunny' : 'Partially shaded',
        roofSpace: tier === 'Hot' ? 'Large' : 'Medium',
        paymentPreference: tier === 'Hot' ? 'Cash' : 'Installment or financing',
        installationTimeline: timeline,
      },
      submittedAt: date,
    });
  });

  return dataset;
}
