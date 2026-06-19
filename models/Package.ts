import mongoose, { Schema, Document } from 'mongoose';

export interface IPackage extends Document {
  name: string;
  tagline: string;
  price: number;
  currency: string;
  duration: string;
  features: string[];
  highlighted: boolean;
  active: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PackageSchema = new Schema<IPackage>(
  {
    name: { type: String, required: true, trim: true },
    tagline: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'PKR' },
    duration: { type: String, required: true, default: '/month' },
    features: [{ type: String, trim: true }],
    highlighted: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Package || mongoose.model<IPackage>('Package', PackageSchema);
