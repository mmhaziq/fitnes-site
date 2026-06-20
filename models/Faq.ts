import mongoose, { Schema, Document } from 'mongoose';

export interface IFaq extends Document {
  question: string;
  answer: string;
  active: boolean;
  order: number;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Faq || mongoose.model<IFaq>('Faq', FaqSchema);
