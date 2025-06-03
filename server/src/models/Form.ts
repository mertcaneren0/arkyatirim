import mongoose, { Document, Schema } from 'mongoose';

export interface IListingForm extends Document {
  fullName: string;
  phone: string;
  blockNo: string;
  parcelNo: string;
  createdAt: Date;
}

export interface ICareerForm extends Document {
  fullName: string;
  age: number;
  phone: string;
  gender: 'Erkek' | 'Kadın';
  city: string;
  district: string;
  createdAt: Date;
}

const listingFormSchema = new Schema<IListingForm>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    blockNo: {
      type: String,
      required: true,
      trim: true,
    },
    parcelNo: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const careerFormSchema = new Schema<ICareerForm>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Erkek', 'Kadın'],
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ListingForm = mongoose.model<IListingForm>('ListingForm', listingFormSchema);
export const CareerForm = mongoose.model<ICareerForm>('CareerForm', careerFormSchema); 