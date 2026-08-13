import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: 'Developer' },
    address: { type: String },
    cityMunicipality: { type: String, default: 'Cagayan de Oro' },
    province: { type: String, default: 'Misamis Oriental' },
    region: { type: String, default: 'Region X' },
    contactNumber: { type: String, default: '+63 917 555 0192' },
    email: { type: String, default: 'info@solarlife.ph' },
    rating: { type: Number, default: 4.9 },
    avatarBg: { type: String, default: '#EAB308' },
  },
  { timestamps: true }
);

export default mongoose.model('Provider', providerSchema);
