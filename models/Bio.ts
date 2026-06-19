import mongoose, { Schema, Document } from 'mongoose';

export interface IBio extends Document {
  name: string;
  title: string;
  tagline: string;
  about: string;
  profileImage: string;
  heroImage: string;
  location: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  whatsapp: string;
  certifications: { title: string; issuer: string; year: string }[];
  stats: { label: string; value: string }[];
  updatedAt: Date;
}

const BioSchema = new Schema<IBio>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    about: { type: String, required: true },
    profileImage: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    location: { type: String, default: 'Karachi, Pakistan' },
    phone: { type: String, default: '' },
    email: { type: String, default: '' },
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    certifications: [
      {
        title: { type: String },
        issuer: { type: String },
        year: { type: String },
      },
    ],
    stats: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Bio || mongoose.model<IBio>('Bio', BioSchema);
