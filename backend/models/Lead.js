import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '+63 917 123 4567' },
    location: {
      barangay: { type: String, default: 'Barangay 1' },
      cityOrMunicipality: { type: String, required: true }, // e.g. Cagayan de Oro, Iligan City, Tagoloan, Opol
      province: { type: String, required: true }, // e.g. Misamis Oriental, Lanao del Norte
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    readinessScore: { type: Number, required: true, min: 0, max: 100 },
    leadTier: { type: String, required: true, enum: ['Hot', 'Warm', 'Education'] },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Quote Sent', 'Contract Signed', 'Closed/Lost'],
      default: 'New',
    },
    billDetails: {
      monthlyBill: { type: Number, required: true },
      kwhUsage: { type: Number, required: true },
      ratePerKwh: { type: Number, default: 11.5 },
      customerType: { type: String, default: 'Residential' },
    },
    solarEstimate: {
      recommendedSystemSizeKwp: { type: Number, required: true }, // e.g. 5.2 kWp
      estimatedMonthlySavings: { type: Number, required: true }, // e.g. 2650
      estimatedInstallCost: { type: Number, required: true }, // Project cost
      paybackYears: { type: Number, default: 4.5 },
      pvoutDaily: { type: Number, default: 4.6 },
      annualCo2ReductionTons: { type: Number, default: 3.2 },
    },
    assessmentAnswers: {
      homeOwnership: { type: String, default: 'Yes, I own it' },
      sunlight: { type: String, default: 'Mostly sunny' },
      roofSpace: { type: String, default: 'Large' },
      paymentPreference: { type: String, default: 'Cash' },
      installationTimeline: { type: String, default: 'As soon as possible' },
    },
    notes: [
      {
        author: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
