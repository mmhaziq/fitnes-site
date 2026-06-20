import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  text: string;
  rating: number;
  photo: string;
  active: boolean;
  order: number;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    role: { type: String, default: '' },
    text: { type: String, required: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    photo: { type: String, default: '' },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
