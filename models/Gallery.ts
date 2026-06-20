import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  beforeImage: string;
  afterImage: string;
  clientName: string;
  duration: string;
  description: string;
  active: boolean;
  order: number;
}

const GallerySchema = new Schema<IGallery>(
  {
    beforeImage: { type: String, required: true },
    afterImage: { type: String, required: true },
    clientName: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
